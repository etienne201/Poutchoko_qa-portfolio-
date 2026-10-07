import { Resend } from "resend"
import { z } from "zod"

// -------------------------------------------------------------
// 1. Sliding Window In-Memory Rate Limiting (5 requests / 10 min)
// -------------------------------------------------------------
interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000 // 10 minutes
  const maxRequests = 5

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 500) {
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  const record = rateLimitMap.get(ip)
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count += 1
  return true
}

export function resetRateLimits(): void {
  rateLimitMap.clear()
}

// -------------------------------------------------------------
// 2. Input Sanitization & HTML Escaping
// -------------------------------------------------------------
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim()
}

// -------------------------------------------------------------
// 3. Schema Validation with Zod
// -------------------------------------------------------------
export const ContactSchema = z.object({
  name: z
    .string({ required_error: "Veuillez indiquer votre nom complet." })
    .trim()
    .min(2, "Le nom doit comporter au moins 2 caractères.")
    .max(100, "Le nom ne doit pas dépasser 100 caractères."),
  email: z
    .string({ required_error: "Veuillez fournir une adresse email." })
    .trim()
    .email("Veuillez fournir une adresse email valide.")
    .max(254, "L'email ne doit pas dépasser 254 caractères."),
  company: z
    .string()
    .trim()
    .max(100, "Le nom d'entreprise ne doit pas dépasser 100 caractères.")
    .optional()
    .default(""),
  requestType: z
    .string()
    .trim()
    .max(100)
    .optional()
    .default("Recruitment (Full-time / Contract)"),
  subject: z
    .string()
    .trim()
    .max(200, "Le sujet ne doit pas dépasser 200 caractères.")
    .optional()
    .default(""),
  message: z
    .string({ required_error: "Veuillez saisir votre message." })
    .trim()
    .min(15, "Votre message doit comporter au moins 15 caractères.")
    .max(5000, "Votre message ne doit pas dépasser 5000 caractères."),
  honeypot: z.string().optional().default(""),
  locale: z.enum(["fr", "en"]).optional().default("fr"),
})

export type ContactInput = z.infer<typeof ContactSchema>

export interface ContactProcessResult {
  status: number
  data: {
    success: boolean
    emailSent?: boolean
    message: string
    whatsappLink?: string
    mailtoLink?: string
    gmailLink?: string
    debug?: string
  }
}

// -------------------------------------------------------------
// 4. Core Contact Processor
// -------------------------------------------------------------
export async function processContactSubmission(
  rawBody: unknown,
  ip = "127.0.0.1",
  envOverrides?: { resendApiKey?: string; toEmail?: string; fromEmail?: string },
): Promise<ContactProcessResult> {
  // Rate limiting check
  if (!checkRateLimit(ip)) {
    return {
      status: 429,
      data: {
        success: false,
        message:
          "Trop de requêtes. Veuillez patienter quelques minutes avant de renvoyer un message, ou contactez-moi directement via WhatsApp ou LinkedIn.",
      },
    }
  }

  // Schema validation
  const validationResult = ContactSchema.safeParse(rawBody)
  if (!validationResult.success) {
    const firstError = validationResult.error.errors[0]?.message || "Données du formulaire invalides."
    return {
      status: 400,
      data: {
        success: false,
        message: firstError,
      },
    }
  }

  const { name, email, company, requestType, subject, message, honeypot, locale } =
    validationResult.data
  const isFr = locale === "fr"

  // Honeypot check: trap bots silently
  if (honeypot && honeypot.trim() !== "") {
    return {
      status: 200,
      data: {
        success: true,
        emailSent: false,
        message: isFr ? "Message reçu." : "Message received.",
      },
    }
  }

  // Sanitize fields
  const cleanName = sanitizeHeader(name)
  const cleanEmail = sanitizeHeader(email)
  const cleanCompany = sanitizeHeader(company)
  const cleanRequestType = sanitizeHeader(requestType)
  const fallbackSubject = `Portfolio Contact — ${cleanRequestType} — ${cleanCompany || cleanName}`
  const cleanSubject = subject ? sanitizeHeader(subject) : fallbackSubject

  const currentDate = new Date().toLocaleString(isFr ? "fr-FR" : "en-US", {
    timeZone: "Africa/Douala",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  // Prefilled WhatsApp text
  const whatsappText = encodeURIComponent(
    isFr
      ? `Bonjour Étienne,\n\nJe vous contacte via votre portfolio QA.\n\n👤 Nom : ${cleanName}\n🏢 Entreprise : ${cleanCompany || "Non précisée"}\n🎯 Type : ${cleanRequestType}\n📧 Email : ${cleanEmail}\n\n💬 Message :\n${message}`
      : `Hello Étienne,\n\nI am contacting you from your QA portfolio.\n\n👤 Name: ${cleanName}\n🏢 Company: ${cleanCompany || "Not specified"}\n🎯 Type: ${cleanRequestType}\n📧 Email: ${cleanEmail}\n\n💬 Message:\n${message}`,
  )
  const whatsappLink = `https://wa.me/237657268355?text=${whatsappText}`

  // Prefilled Mailto link & Webmail Gmail Link
  const mailtoBody = encodeURIComponent(
    `Name: ${cleanName}\nEmail: ${cleanEmail}\nCompany: ${cleanCompany || "N/A"}\nType: ${cleanRequestType}\n\nMessage:\n${message}`,
  )
  const mailtoLink = `mailto:poutchokoetienne@gmail.com?subject=${encodeURIComponent(cleanSubject)}&body=${mailtoBody}`
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=poutchokoetienne@gmail.com&su=${encodeURIComponent(cleanSubject)}&body=${mailtoBody}`

  // Resend email dispatch
  let emailSent = false
  let dispatchReason: string | undefined

  const apiKey = envOverrides?.resendApiKey ?? process.env.RESEND_API_KEY
  const toEmail = envOverrides?.toEmail ?? process.env.CONTACT_EMAIL_TO ?? "poutchokoetienne@gmail.com"
  const fromEmail = envOverrides?.fromEmail ?? process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>"

  if (apiKey && apiKey.startsWith("re_")) {
    try {
      const resend = new Resend(apiKey)

      const safeName = escapeHtml(cleanName)
      const safeEmail = escapeHtml(cleanEmail)
      const safeCompany = escapeHtml(cleanCompany)
      const safeRequestType = escapeHtml(cleanRequestType)
      const safeSubject = escapeHtml(cleanSubject)
      const safeMessage = escapeHtml(message)

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${safeSubject}</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 28px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 22px; font-weight: 700;">
                🎯 Nouveau Contact Portfolio QA
              </h1>
              <p style="color: #93c5fd; margin: 0; font-size: 14px;">
                Poutchoko Emako Étienne — Senior QA Automation Engineer
              </p>
            </div>

            <div style="background: #ffffff; padding: 24px; border-radius: 10px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <h2 style="color: #0f172a; margin-top: 0; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Coordonnées du Contact
              </h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 35%;">Nom complet :</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email :</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Entreprise :</td>
                  <td style="padding: 8px 0; color: #0f172a;">${safeCompany || "Non précisée"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Type de demande :</td>
                  <td style="padding: 8px 0;">
                    <span style="background: #eff6ff; color: #1d4ed8; padding: 3px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; border: 1px solid #bfdbfe;">
                      ${safeRequestType}
                    </span>
                  </td>
                </tr>
              </table>

              <h3 style="color: #0f172a; margin: 20px 0 10px 0; font-size: 15px;">Message :</h3>
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; color: #334155; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${safeMessage}</p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 24px; padding: 16px; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 12px 0; color: #475569; font-size: 13px; font-weight: 600;">
                Actions rapides :
              </p>
              <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(cleanSubject)}" 
                 style="display: inline-block; background: #2563eb; color: #ffffff; padding: 9px 18px; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600; margin: 4px;">
                Répondre par Email
              </a>
              <a href="${whatsappLink}" 
                 style="display: inline-block; background: #16a34a; color: #ffffff; padding: 9px 18px; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600; margin: 4px;">
                Ouvrir WhatsApp
              </a>
            </div>

            <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 24px;">
              <p style="margin: 2px 0;">Envoyé depuis le portfolio de Poutchoko Emako Étienne</p>
              <p style="margin: 2px 0;">Date : ${currentDate}</p>
            </div>
          </body>
        </html>
      `.trim()

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout d'envoi d'email")), 8000),
      )

      const sendPromise = resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: cleanEmail,
        subject: `[Portfolio] ${cleanSubject}`,
        html: htmlContent,
        text: `Nouveau message de ${cleanName} (${cleanEmail}, Entreprise: ${cleanCompany || "N/A"}):\n\nType: ${cleanRequestType}\n\n${message}`,
      })

      const resendResult = await Promise.race([sendPromise, timeoutPromise])

      if (resendResult && "error" in resendResult && resendResult.error) {
        console.error("Resend API rejected transmission:", resendResult.error)
        emailSent = false
        dispatchReason = resendResult.error.message || "Email provider error"
      } else {
        emailSent = true
      }
    } catch (err: unknown) {
      console.error("Resend send failed:", err)
      emailSent = false
      dispatchReason = err instanceof Error ? err.message : "Erreur de transmission"
    }
  } else {
    dispatchReason = "Clé API Resend non configurée"
  }

  const successMessage = isFr
    ? (emailSent
        ? "Merci pour votre message ! Votre demande a été reçue avec succès. Je vous répondrai dans les plus brefs délais."
        : "Votre message a été validé ! Le service d'envoi automatique direct n'étant pas configuré ou disponible, veuillez confirmer l'envoi en 1 clic via WhatsApp ou par Email ci-dessous.")
    : (emailSent
        ? "Thank you! Your message has been received successfully. I will get back to you shortly."
        : "Your message has been validated! Direct email service is currently unavailable, please confirm sending in 1 click via WhatsApp or Email below.")

  return {
    status: 200,
    data: {
      success: true,
      emailSent,
      message: successMessage,
      whatsappLink,
      mailtoLink,
      gmailLink,
      ...(process.env.NODE_ENV === "development" && dispatchReason ? { debug: dispatchReason } : {}),
    },
  }
}
