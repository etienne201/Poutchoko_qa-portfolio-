import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialisation sécurisée de Resend avec la clé depuis .env
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Gestion de timeout pour éviter les longues attentes
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 10000))

    const dataPromise = request.json()
    const { firstName, lastName, email, projectType, message } = (await Promise.race([
      dataPromise,
      timeoutPromise,
    ])) as {
      firstName: string
      lastName: string
      email: string
      projectType?: string
      message: string
    }

    // Validation des champs essentiels
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 },
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Format d'email invalide." }, { status: 400 })
    }

    // Contenu de l'e-mail HTML professionnel
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouveau Contact Portfolio</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; text-align: center; font-size: 24px;">
              📬 Nouveau Contact Portfolio QA
            </h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #667eea;">
            <h2 style="color: #333; margin-top: 0; font-size: 20px;">Informations du Contact</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">👤 Nom complet:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">📧 Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">🎯 Type de projet:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <span style="background: #667eea; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                    ${projectType || "Non spécifié"}
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid #eee; margin-top: 20px;">
            <h3 style="color: #333; margin-top: 0; font-size: 18px;">💬 Message:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 3px solid #28a745;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              📱 <strong>Actions rapides:</strong>
            </p>
            <div style="margin-top: 15px;">
              <a href="mailto:${email}?subject=Re: Votre demande de contact&body=Bonjour ${firstName},%0A%0AMerci pour votre message..." 
                 style="display: inline-block; background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">
                📧 Répondre par Email
              </a>
              <a href="https://wa.me/237657268355?text=Bonjour%20${firstName},%20j'ai%20bien%20reçu%20votre%20message%20depuis%20mon%20portfolio..." 
                 style="display: inline-block; background: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">
                💬 WhatsApp
              </a>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <div style="text-align: center; color: #888; font-size: 12px;">
            <p>🚀 Envoyé automatiquement depuis le portfolio d'Étienne Poutchoko</p>
            <p>⏰ ${new Date().toLocaleString("fr-FR", {
              timeZone: "Africa/Douala",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</p>
          </div>
        </body>
      </html>
    `.trim()

    // Envoi d'email avec Resend
    const emailResponse = await resend.emails.send({
      from: "Portfolio QA <onboarding@resend.dev>",
      to: "poutchokoetienne@gmail.com",
      subject: `🎯 Nouveau Contact Portfolio - ${firstName} ${lastName} (${projectType || "Projet non spécifié"})`,
      html: htmlContent,
      // Ajout d'une version texte pour la compatibilité
      text: `
Nouveau contact depuis le portfolio QA

Nom: ${firstName} ${lastName}
Email: ${email}
Type de projet: ${projectType || "Non spécifié"}

Message:
${message}

---
Envoyé le ${new Date().toLocaleString("fr-FR")}
      `.trim(),
    })

    // Vérifie si Resend a renvoyé une erreur
    if (emailResponse.error) {
      console.error("Erreur Resend:", emailResponse.error)
      throw new Error(emailResponse.error.message)
    }

    // Génère un lien WhatsApp prêt à l'emploi
    const whatsappText = encodeURIComponent(
      `Bonjour Étienne,

Je vous contacte depuis votre portfolio QA.

👤 Nom: ${firstName} ${lastName}
📧 Email: ${email}
🎯 Projet: ${projectType || "Non précisé"}

💬 Message:
${message}

Cordialement,
${firstName}`,
    )

    const whatsappLink = `https://wa.me/237657268355?text=${whatsappText}`

    return NextResponse.json({
      success: true,
      message: "📧 Message envoyé avec succès dans votre boîte Gmail !",
      whatsappLink,
      emailId: emailResponse.data?.id,
    })
  } catch (error: any) {
    console.error("Erreur /api/contact:", error)

    if (error.message === "Request timeout") {
      return NextResponse.json(
        { success: false, message: "⏱️ Délai d'attente dépassé. Veuillez réessayer." },
        { status: 408 },
      )
    }

    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { success: false, message: "🔑 Erreur de configuration. Contactez l'administrateur." },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { success: false, message: "❌ Erreur lors de l'envoi. Veuillez réessayer dans quelques instants." },
      { status: 500 },
    )
  }
}
