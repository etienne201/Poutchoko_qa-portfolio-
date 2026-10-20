import { Resend } from "resend"
import nodemailer from "nodemailer"
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

/** Taille maximale acceptée pour le corps JSON (octets). */
export const MAX_BODY_BYTES = 16 * 1024

/**
 * Résout l'IP client à partir d'en-têtes fixés par la plateforme.
 * - `x-real-ip` est écrasé par Vercel/reverse-proxy (non falsifiable côté client).
 * - Sinon on prend le DERNIER élément de `x-forwarded-for` (ajouté par le proxy),
 *   jamais le premier, qui est contrôlé par le client.
 */
export function getClientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim()
  if (realIp) return realIp
  const xff = headers.get("x-forwarded-for")
  if (xff) {
    const hops = xff.split(",").map((h) => h.trim()).filter(Boolean)
    if (hops.length) return hops[hops.length - 1]
  }
  return "127.0.0.1"
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

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "QA"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function getCategoryMeta(requestType: string): {
  bg: string
  color: string
  border: string
  label: string
  icon: string
  priorityText: string
} {
  const lower = (requestType || "").toLowerCase()
  if (
    lower.includes("recruit") ||
    lower.includes("recrutement") ||
    lower.includes("full-time") ||
    lower.includes("contract") ||
    lower.includes("cdi")
  ) {
    return {
      bg: "#ecfdf5",
      color: "#047857",
      border: "#a7f3d0",
      label: "Opportunité Recrutement • CDI / Contrat",
      icon: "💼",
      priorityText: "Priorité Haute • Recrutement",
    }
  }
  if (
    lower.includes("automation") ||
    lower.includes("projet") ||
    lower.includes("test") ||
    lower.includes("audit")
  ) {
    return {
      bg: "#eff6ff",
      color: "#1d4ed8",
      border: "#bfdbfe",
      label: "Mission Automatisation QA • Tests",
      icon: "⚡",
      priorityText: "Priorité Haute • Automatisation",
    }
  }
  if (lower.includes("freelance") || lower.includes("consult")) {
    return {
      bg: "#faf5ff",
      color: "#7e22ce",
      border: "#e9d5ff",
      label: "Consulting & Audit Freelance",
      icon: "🚀",
      priorityText: "Mission Freelance / Conseil",
    }
  }
  return {
    bg: "#f8fafc",
    color: "#334155",
    border: "#cbd5e1",
    label: "Échange Professionnel / Networking",
    icon: "🤝",
    priorityText: "Prise de Contact Directe",
  }
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

export interface LeadSummary {
  name: string
  email: string
  company: string
  requestType: string
  subject: string
  message: string
  referenceId: string
  date: string
}

export interface ContactProcessResult {
  status: number
  data: {
    success: boolean
    emailSent?: boolean
    emailId?: string
    message: string
    whatsappLink?: string
    mailtoLink?: string
    gmailLink?: string
    leadSummary?: LeadSummary
    debug?: string
  }
}

export interface ContactEnvOverrides {
  resendApiKey?: string
  toEmail?: string
  fromEmail?: string
  whatsappNumber?: string
  gmailAppPassword?: string
  gmailUser?: string
}

// -------------------------------------------------------------
// 4. Core Contact Processor
// -------------------------------------------------------------
export async function processContactSubmission(
  rawBody: unknown,
  ip = "127.0.0.1",
  envOverrides?: ContactEnvOverrides,
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

  // Generate unique lead reference ID (e.g. QA-2026-X8K1)
  const referenceId = `QA-${Date.now().toString(36).toUpperCase()}`

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

  const waNumber = envOverrides?.whatsappNumber ?? process.env.WHATSAPP_NUMBER ?? "237657268355"

  // Prefilled WhatsApp text: direct, natural and immediate
  const whatsappText = encodeURIComponent(
    isFr
      ? `Bonjour Étienne,\n\nJe suis ${cleanName}${cleanCompany ? ` de ${cleanCompany}` : ""}.\nMon email : ${cleanEmail}\n\n${message}`
      : `Hello Étienne,\n\nI am ${cleanName}${cleanCompany ? ` from ${cleanCompany}` : ""}.\nMy email: ${cleanEmail}\n\n${message}`,
  )
  const whatsappLink = `https://wa.me/${waNumber}?text=${whatsappText}`

  // Prefilled Mailto link & Webmail Gmail Link
  const mailtoBody = encodeURIComponent(
    `Référence : ${referenceId}\nNom : ${cleanName}\nEmail : ${cleanEmail}\nEntreprise : ${cleanCompany || "N/A"}\nType : ${cleanRequestType}\n\nMessage :\n${message}`,
  )
  const mailtoLink = `mailto:poutchokoetienne@gmail.com?subject=${encodeURIComponent(`[${referenceId}] ${cleanSubject}`)}&body=${mailtoBody}`
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=poutchokoetienne@gmail.com&su=${encodeURIComponent(`[${referenceId}] ${cleanSubject}`)}&body=${mailtoBody}`

  const leadSummary: LeadSummary = {
    name: cleanName,
    email: cleanEmail,
    company: cleanCompany,
    requestType: cleanRequestType,
    subject: cleanSubject,
    message,
    referenceId,
    date: currentDate,
  }

  // Resend / SMTP email dispatch
  let emailSent = false
  let emailId: string | undefined
  let dispatchReason: string | undefined

  const apiKey = envOverrides?.resendApiKey ?? process.env.RESEND_API_KEY
  const toEmail = envOverrides?.toEmail ?? process.env.CONTACT_EMAIL_TO ?? "poutchokoetienne@gmail.com"
  const fromEmail = envOverrides?.fromEmail ?? process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>"
  const gmailAppPassword = envOverrides?.gmailAppPassword ?? process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "")
  const gmailUser = envOverrides?.gmailUser ?? process.env.GMAIL_USER ?? "poutchokoetienne@gmail.com"

  const safeName = escapeHtml(cleanName)
  const safeEmail = escapeHtml(cleanEmail)
  const safeCompany = escapeHtml(cleanCompany)
  const safeRequestType = escapeHtml(cleanRequestType)
  const safeSubject = escapeHtml(cleanSubject)
  const safeMessage = escapeHtml(message)

  const initials = getInitials(cleanName)
  const categoryMeta = getCategoryMeta(cleanRequestType)

  // Masterpiece Executive Email Template with Logo & Bulletproof Cross-Client Layout
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>${safeSubject}</title>
      </head>
      <body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1.6; color: #0f172a;">
        
        <!-- Outer Wrapper -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center" style="max-width: 620px; margin: 0 auto;">
          <tr>
            <td>

              <!-- Header Brand Banner with Official Logo -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e3a8a 100%); border-radius: 16px; margin-bottom: 20px; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);">
                <tr>
                  <td align="center" style="padding: 30px 20px 26px 20px;">
                    
                    <!-- Official Portfolio Logo Badge -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 14px auto;">
                      <tr>
                        <td align="center" style="background: rgba(255, 255, 255, 0.12); padding: 4px; border-radius: 50%; border: 1.5px solid rgba(147, 197, 253, 0.4);">
                          <img src="https://poutchoko-qa-portfolio.vercel.app/images/logo-badge.png"
                               alt="Poutchoko Emako Étienne" 
                               width="60" 
                               height="60" 
                               style="display: block; width: 60px; height: 60px; border-radius: 50%; border: 0; object-fit: contain; margin: 0 auto;" />
                        </td>
                      </tr>
                    </table>

                    <!-- Top Eyebrow Badge -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 10px auto;">
                      <tr>
                        <td style="background: rgba(30, 58, 138, 0.5); border: 1px solid rgba(147, 197, 253, 0.35); border-radius: 9999px; padding: 4px 14px; color: #93c5fd; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                          ⚡ PORTFOLIO QA • NOUVEAU LEAD QUALIFIÉ
                        </td>
                      </tr>
                    </table>

                    <!-- Title & Subtitle -->
                    <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.3;">
                      Nouvelle Prise de Contact Professionnelle
                    </h1>
                    <p style="color: #cbd5e1; margin: 0; font-size: 13.5px; font-weight: 500;">
                      Poutchoko Emako Étienne — <span style="color: #60a5fa; font-weight: 600;">Senior QA Automation Engineer</span>
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Main Content Container -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);">
                <tr>
                  <td style="padding: 24px 22px 28px 22px;">

                    <!-- Lead Status & Category Badge (Table layout prevents Gmail overlapping) -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 2px solid #f1f5f9; padding-bottom: 14px; margin-bottom: 20px;">
                      <tr>
                        <td align="left" style="vertical-align: middle;">
                          <span style="display: inline-block; background: ${categoryMeta.bg}; color: ${categoryMeta.color}; border: 1px solid ${categoryMeta.border}; padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 700;">
                            ${categoryMeta.icon} ${categoryMeta.label}
                          </span>
                        </td>
                        <td align="right" style="vertical-align: middle;">
                          <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; color: #475569; font-weight: 700; background: #f8fafc; padding: 4px 10px; border-radius: 6px; border: 1px solid #e2e8f0; white-space: nowrap;">
                            Réf : ${referenceId}
                          </span>
                        </td>
                      </tr>
                    </table>

                    <!-- Intelligent Sender Profile Header -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 22px; padding: 14px 16px;">
                      <tr>
                        <td width="48" style="vertical-align: middle; padding-right: 14px;">
                          <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: #ffffff; font-weight: 800; font-size: 17px; line-height: 44px; text-align: center; box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);">
                            ${initials}
                          </div>
                        </td>
                        <td style="vertical-align: middle;">
                          <div style="font-size: 16px; font-weight: 800; color: #0f172a; line-height: 1.3;">
                            ${safeName}
                          </div>
                          <div style="font-size: 13px; color: #64748b; font-weight: 500; margin-top: 1px;">
                            ${safeCompany ? `🏢 Entreprise : <strong style="color: #1e293b;">${safeCompany}</strong>` : `<span style="color: #94a3b8; font-style: italic;">Entreprise non spécifiée (Indépendant)</span>`}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Coordonnées Client Grid -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13.5px; margin-bottom: 22px;">
                      <tr>
                        <td width="32%" style="padding: 8px 0; color: #64748b; font-weight: 600; vertical-align: top;">
                          Adresse Email :
                        </td>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: underline; font-weight: 700; word-break: break-all;">
                            ${safeEmail}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600; vertical-align: top;">
                          Type de besoin :
                        </td>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <span style="display: inline-block; background: ${categoryMeta.bg}; color: ${categoryMeta.color}; border: 1px solid ${categoryMeta.border}; padding: 3px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700;">
                            ${safeRequestType}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600; vertical-align: top;">
                          Objet indiqué :
                        </td>
                        <td style="padding: 8px 0; color: #0f172a; font-weight: 700; vertical-align: top;">
                          ${safeSubject}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600; vertical-align: top;">
                          Horodatage :
                        </td>
                        <td style="padding: 8px 0; color: #475569; vertical-align: top; font-size: 13px;">
                          ${currentDate} (Heure locale Douala / GMT+1)
                        </td>
                      </tr>
                    </table>

                    <!-- Corps du Message Box -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <span style="font-size: 12px; font-weight: 800; color: #0f172a; letter-spacing: 0.05em; text-transform: uppercase;">
                            💬 Message Transmis :
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="background: #f8fafc; border-left: 4px solid #2563eb; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px;">
                          <div style="font-size: 14.5px; line-height: 1.7; color: #1e293b; white-space: pre-wrap; word-break: break-word; font-weight: 400;">${safeMessage}</div>
                        </td>
                      </tr>
                    </table>

                    <!-- Quick Response Action Buttons inside Email -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 2px dashed #e2e8f0; padding-top: 20px; text-align: center;">
                      <tr>
                        <td align="center" style="padding-bottom: 14px;">
                          <span style="font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">
                            ⚡ Actions directes en 1 clic :
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                            <tr>
                              <td align="center" style="padding: 4px 6px;">
                                <a href="mailto:${safeEmail}?subject=Re: [Portfolio QA] ${encodeURIComponent(cleanSubject)}" 
                                   style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 13.5px; font-weight: 700; box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);">
                                  ✉️ Répondre par Email
                                </a>
                              </td>
                              <td align="center" style="padding: 4px 6px;">
                                <a href="${whatsappLink}" 
                                   style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 13.5px; font-weight: 700; box-shadow: 0 2px 6px rgba(22, 163, 74, 0.25);">
                                  💬 Ouvrir sur WhatsApp
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Audit & Security Footer -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="text-align: center; margin-top: 24px;">
                <tr>
                  <td align="center" style="font-size: 12px; color: #64748b; line-height: 1.6;">
                    <p style="margin: 0 0 3px 0; font-weight: 700; color: #475569;">
                      Poutchoko Emako Étienne — Senior QA Automation Engineer
                    </p>
                    <p style="margin: 0 0 3px 0; color: #94a3b8; font-size: 11.5px;">
                      Spécialiste Automatisation Tests Web, Mobile & API • Playwright, Cypress, Maestro, Appium
                    </p>
                    <p style="margin: 0 0 4px 0; color: #94a3b8; font-size: 11px;">
                      Sécurité : Validation Zod • Honeypot Anti-Spam • IP filtrée • Réf: ${referenceId}
                    </p>
                    <p style="margin: 4px 0 0 0; font-size: 11.5px;">
                      <a href="https://poutchoko-qa-portfolio.vercel.app" style="color: #2563eb; text-decoration: underline; font-weight: 600;">
                        Consulter le Portfolio en ligne
                      </a>
                      &nbsp;•&nbsp;
                      <a href="https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184/" style="color: #2563eb; text-decoration: underline; font-weight: 600;">
                        Profil LinkedIn
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim()

  const textContent = `🎯 NOUVEAU CONTACT PORTFOLIO QA (Réf: ${referenceId})\n\nExpéditeur : ${cleanName}\nEmail : ${cleanEmail}\nEntreprise : ${cleanCompany || "Non précisée"}\nType de demande : ${cleanRequestType}\nDate : ${currentDate}\n\nMessage :\n${message}\n\n---\nRépondre : mailto:${cleanEmail}\nWhatsApp : ${whatsappLink}`

  const isRealResendKey = Boolean(
    apiKey &&
      apiKey.startsWith("re_") &&
      apiKey !== "re_your_api_key_here" &&
      !apiKey.includes("your_api_key"),
  )

  if (isRealResendKey) {
    try {
      const resend = new Resend(apiKey)
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout d'envoi d'email")), 8000),
      )

      const sendPromise = resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: cleanEmail,
        subject: `[Portfolio QA] ${cleanSubject}`,
        html: htmlContent,
        text: textContent,
      })

      const resendResult = await Promise.race([sendPromise, timeoutPromise])

      if (resendResult && "error" in resendResult && resendResult.error) {
        console.error("[Contact API] Resend API rejected transmission:", resendResult.error)
        emailSent = false
        dispatchReason = resendResult.error.message || "Email provider error"
      } else {
        emailSent = true
        emailId = (resendResult as { data?: { id?: string } })?.data?.id
        console.log(`[Contact API] Email successfully queued by Resend! ID: ${emailId} -> Recipient: ${toEmail}`)
      }
    } catch (err: unknown) {
      console.error("[Contact API] Resend send failed:", err)
      emailSent = false
      dispatchReason = err instanceof Error ? err.message : "Erreur de transmission"
    }
  } else if (gmailAppPassword) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      })

      const info = await transporter.sendMail({
        from: `"${cleanName}" <${gmailUser}>`,
        to: toEmail,
        replyTo: cleanEmail,
        subject: `[Portfolio QA] ${cleanSubject}`,
        html: htmlContent,
        text: textContent,
      })

      emailSent = true
      emailId = info.messageId
      console.log(`[Contact API] Email successfully sent via Gmail SMTP! ID: ${emailId} -> Recipient: ${toEmail}`)
    } catch (smtpErr: unknown) {
      console.error("[Contact API] Gmail SMTP send failed:", smtpErr)
      emailSent = false
      dispatchReason = smtpErr instanceof Error ? smtpErr.message : "Erreur SMTP Gmail"
    }
  } else {
    dispatchReason = "Clé API Resend ou Mot de passe d'application Gmail non configuré"
    console.warn(
      "[Contact API] Notice: Aucune clé RESEND_API_KEY réelle ni GMAIL_APP_PASSWORD configurée dans .env.local. L'email direct est suspendu en attente d'une clé.",
    )
  }

  const successMessage = isFr
    ? (emailSent
        ? "Merci pour votre message ! Votre demande a été reçue avec succès. Je vous répondrai dans les plus brefs délais."
        : "Votre message a été validé ! Le service d'envoi automatique direct n'étant pas configuré ou disponible, veuillez confirmer l'envoi en 1 clic via WhatsApp ci-dessous.")
    : (emailSent
        ? "Thank you! Your message has been received successfully. I will get back to you shortly."
        : "Your message has been validated! Direct email service is currently unavailable, please confirm sending in 1 click via WhatsApp below.")

  return {
    status: 200,
    data: {
      success: true,
      emailSent,
      ...(emailId ? { emailId } : {}),
      message: successMessage,
      whatsappLink,
      mailtoLink,
      gmailLink,
      leadSummary,
      ...(process.env.NODE_ENV === "development" && dispatchReason ? { debug: dispatchReason } : {}),
    },
  }
}
