import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Générateur & Aperçu de CV QA | Poutchoko Emako Étienne",
  description:
    "Générez, personnalisez et prévisualisez le CV professionnel de Poutchoko Emako Étienne, Senior QA Automation Engineer.",
  alternates: {
    canonical: "https://poutchoko-qa-portfolio.vercel.app/cv-builder",
  },
}

export default function CVBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
