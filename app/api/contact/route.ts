import { type NextRequest, NextResponse } from "next/server"
import { processContactSubmission, getClientIp, MAX_BODY_BYTES } from "@/lib/contact-service"

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers)

    const contentLength = Number(request.headers.get("content-length") || 0)
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "Requête trop volumineuse." },
        { status: 413 },
      )
    }

    let body: unknown
    try {
      const raw = await request.text()
      if (raw.length > MAX_BODY_BYTES) {
        return NextResponse.json(
          { success: false, message: "Requête trop volumineuse." },
          { status: 413 },
        )
      }
      body = JSON.parse(raw)
    } catch {
      return NextResponse.json(
        { success: false, message: "Requête invalide (JSON mal formé)." },
        { status: 400 },
      )
    }

    const startTime = Date.now()
    const result = await processContactSubmission(body, ip)
    const durationMs = Date.now() - startTime

    console.log(
      `[Contact Route] POST /api/contact from ${ip} - status=${result.status} emailSent=${result.data.emailSent ?? false} duration=${durationMs}ms`,
    )

    return NextResponse.json(result.data, { status: result.status })
  } catch (error) {
    console.error("[Contact Route] Fatal error handling contact POST:", error)
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