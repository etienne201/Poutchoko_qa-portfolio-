import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Ajouter un timeout pour éviter les requêtes qui traînent
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 10000))

    const dataPromise = request.json()

    const { firstName, lastName, email, projectType, message } = (await Promise.race([
      dataPromise,
      timeoutPromise,
    ])) as any

    // Validation des données
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ success: false, message: "Tous les champs sont requis" }, { status: 400 })
    }

    // Créer le contenu de l'email
    const emailContent = `
Nouveau message depuis le portfolio QA

Nom: ${firstName} ${lastName}
Email: ${email}
Type de projet: ${projectType}

Message:
${message}

---
Envoyé depuis le portfolio d'Étienne Poutchoko
    `.trim()

    // Créer le lien mailto
    const subject = encodeURIComponent(`Nouveau contact portfolio - ${firstName} ${lastName}`)
    const body = encodeURIComponent(emailContent)
    const mailtoLink = `mailto:poutchokoetienne@gmail.com?subject=${subject}&body=${body}`

    // Créer le message WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Bonjour Étienne,

Je vous contacte depuis votre portfolio QA.

Nom: ${firstName} ${lastName}
Email: ${email}
Type de projet: ${projectType}

Message: ${message}`.trim(),
    )

    const whatsappLink = `https://wa.me/237657268355?text=${whatsappMessage}`

    // Réponse rapide
    return NextResponse.json({
      success: true,
      mailtoLink,
      whatsappLink,
      message: "Liens générés avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de la génération des liens:", error)

    // Réponse d'erreur appropriée
    if (error instanceof Error && error.message === "Request timeout") {
      return NextResponse.json({ success: false, message: "Délai d'attente dépassé" }, { status: 408 })
    }

    return NextResponse.json({ success: false, message: "Erreur lors de la génération des liens" }, { status: 500 })
  }
}
