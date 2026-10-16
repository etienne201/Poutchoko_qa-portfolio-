import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Curriculum Vitae | Poutchoko Emako Étienne — Senior QA Automation Engineer",
  description:
    "Consultez et téléchargez le CV complet d'Étienne Poutchoko Emako. 6+ ans d'expérience en assurance qualité logicielle, automatisation E2E (Cypress, Playwright), FinTech et CI/CD.",
  alternates: {
    canonical: "https://poutchoko-qa-portfolio.vercel.app/cv",
  },
  openGraph: {
    title: "CV — Poutchoko Emako Étienne | Senior QA Automation Engineer",
    description:
      "Profil détaillé et réalisations : 6+ ans d'expérience en QA Automation (Cypress, Playwright, API Testing, FinTech, RegTech).",
    url: "https://poutchoko-qa-portfolio.vercel.app/cv",
  },
}

export default function CVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
