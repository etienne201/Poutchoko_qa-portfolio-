import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL("https://poutchoko-qa-portfolio.vercel.app"),
  title: {
    default: "Poutchoko Emako Étienne | Senior QA Automation Engineer | FinTech & RegTech",
    template: "%s | Poutchoko Emako Étienne",
  },
  description:
    "Senior QA Automation Engineer (6+ yrs) specialized in FinTech, RegTech, SaaS, and Payment platforms. Expert in Cypress, Playwright, API Testing, Gatling, and CI/CD Quality Gates. Open to international remote missions & freelance contracts.",
  keywords: [
    "Poutchoko Emako Étienne",
    "Étienne Poutchoko Emako",
    "Etienne Poutchoko",
    "etienne201",
    "Poutchoko QA",
    "Senior QA Automation Engineer",
    "QA Automation Engineer",
    "Lead QA Engineer",
    "Software Test Engineer",
    "Cypress Automation Specialist",
    "Playwright E2E Testing",
    "API Testing Postman Newman",
    "FinTech QA Engineer",
    "RegTech QA",
    "CEMAC Regulatory Testing",
    "Remote QA Engineer Europe",
    "Freelance QA Automation",
    "QA Contractor B2B",
    "Performance Testing Gatling",
    "CI/CD Quality Gates",
    "GitLab CI/CD",
    "Software Quality Assurance Douala",
    "ISTQB Certified Tester",
  ],
  authors: [
    { name: "Poutchoko Emako Étienne", url: "https://linkedin.com/in/etienne-poutchoko-emako" },
    { name: "etienne201", url: "https://github.com/etienne201" },
  ],
  creator: "Poutchoko Emako Étienne",
  publisher: "Poutchoko Emako Étienne",
  alternates: {
    canonical: "https://poutchoko-qa-portfolio.vercel.app",
    languages: {
      "fr-FR": "https://poutchoko-qa-portfolio.vercel.app",
      "en-US": "https://poutchoko-qa-portfolio.vercel.app",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo-badge.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/logo-badge.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "https://poutchoko-qa-portfolio.vercel.app",
    title: "Poutchoko Emako Étienne | Senior QA Automation Engineer",
    description:
      "Senior QA Automation Engineer with 6+ years of experience delivering high-stability software in FinTech, RegTech, SaaS, and Payment systems (Cypress, Playwright, CI/CD).",
    siteName: "Poutchoko Emako Étienne - Portfolio QA",
    images: [
      {
        url: "/images/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Poutchoko Emako Étienne - Senior QA Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poutchoko Emako Étienne | Senior QA Automation Engineer",
    description:
      "Senior QA Automation Engineer specializing in FinTech, RegTech, SaaS, Cypress, Playwright, and CI/CD quality gates.",
    images: ["/images/homepage.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://poutchoko-qa-portfolio.vercel.app/#person",
        name: "Poutchoko Emako Étienne",
        alternateName: [
          "Étienne Poutchoko Emako",
          "Etienne Poutchoko",
          "etienne201",
          "Poutchoko Etienne",
        ],
        jobTitle: "Senior QA Automation Engineer",
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Quality Assurance Analyst and Tester",
          occupationalCategory: "15-1253.00",
        },
        description:
          "Senior QA Automation Engineer with 6+ years of experience delivering high-quality digital products in FinTech, SaaS, RegTech, and Payment platforms. Expert in Cypress, Playwright, API testing, and CI/CD quality gates.",
        url: "https://poutchoko-qa-portfolio.vercel.app",
        image: "https://poutchoko-qa-portfolio.vercel.app/images/logo.jpg",
        email: "mailto:poutchokoetienne@gmail.com",
        telephone: "+237657268355",
        sameAs: [
          "https://linkedin.com/in/etienne-poutchoko-emako",
          "https://github.com/etienne201",
          "https://collective.work",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Douala",
          addressCountry: "Cameroon",
        },
        worksFor: {
          "@type": "Organization",
          name: "Seven Common Factors (Seven GPS)",
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Seven Advanced Academy",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "ISTQB Certified Tester Foundation Level (CTFL)",
            credentialCategory: "Professional Certification",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Cypress End-to-End Automation Specialist",
            credentialCategory: "Professional Certification",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "GitLab CI/CD Fundamentals & Pipeline Automation",
            credentialCategory: "Professional Certification",
          },
        ],
        knowsAbout: [
          "Quality Assurance",
          "Test Automation",
          "Cypress",
          "Playwright",
          "Robot Framework",
          "Postman",
          "Newman",
          "Gatling Load Testing",
          "GitLab CI/CD Quality Gates",
          "Jenkins",
          "FinTech Payment Systems",
          "Mobile Money Integrations",
          "CEMAC RegTech Compliance",
          "JIRA Xray",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://poutchoko-qa-portfolio.vercel.app/#website",
        url: "https://poutchoko-qa-portfolio.vercel.app",
        name: "Poutchoko Emako Étienne - Senior QA Automation Engineer Portfolio",
        publisher: {
          "@id": "https://poutchoko-qa-portfolio.vercel.app/#person",
        },
        inLanguage: ["fr-FR", "en-US"],
      },
      {
        "@type": "ProfilePage",
        "@id": "https://poutchoko-qa-portfolio.vercel.app/#profilepage",
        url: "https://poutchoko-qa-portfolio.vercel.app",
        name: "Profil Professionnel & Portfolio QA - Poutchoko Emako Étienne",
        mainEntity: {
          "@id": "https://poutchoko-qa-portfolio.vercel.app/#person",
        },
      },
    ],
  }

  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary min-h-screen" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="poutchoko-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
