import { type NextRequest, NextResponse } from "next/server"
import { processContactSubmission } from "@/lib/contact-service"

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : request.headers.get("x-real-ip") || "127.0.0.1"

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, message: "Requête invalide (JSON mal formé)." },
        { status: 400 },
      )
    }

    const result = await processContactSubmission(body, ip)
    return NextResponse.json(result.data, { status: result.status })
  } catch (error) {
    console.error("Contact API fatal error:", error)
    return NextResponse.json(
      {
        success: false,
        message:
          "Une erreur inattendue est survenue lors de l'envoi. Vous pouvez également me contacter directement par WhatsApp, LinkedIn ou email.",
      },
      { status: 500 },
    )
  }
}