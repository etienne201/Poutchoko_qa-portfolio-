import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL("https://poutchoko-qa-portfolio.vercel.app"),
  title: {
    default: "Poutchoko Emako Étienne | Senior QA Automation Engineer",
    template: "%s | Poutchoko Emako Étienne",
  },
  description:
    "Senior QA Automation Engineer with 6+ years of experience delivering high-quality digital products in FinTech, RegTech, SaaS, and Payment platforms. Expert in Cypress, Playwright, API testing, and CI/CD quality gates.",
  keywords: [
    "Poutchoko Emako Étienne",
    "Etienne Poutchoko",
    "Senior QA Automation Engineer",
    "QA Engineer Douala",
    "QA Remote Europe",
    "FinTech QA",
    "RegTech QA",
    "CEMAC Regulatory Testing",
    "Cypress Automation",
    "Playwright",
    "API Testing Postman",
    "Performance Testing Gatling",
    "CI/CD Quality Gates",
    "GitLab CI",
    "Software Quality Assurance",
  ],
  authors: [{ name: "Poutchoko Emako Étienne", url: "https://linkedin.com/in/etienne-poutchoko-emako" }],
  creator: "Poutchoko Emako Étienne",
  publisher: "Poutchoko Emako Étienne",
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
      "Senior QA Automation Engineer specializing in FinTech, RegTech, SaaS, Cypress, Playwright, and CI/CD quality gates. 6+ years of proven impact.",
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
        alternateName: "Etienne Poutchoko",
        jobTitle: "Senior QA Automation Engineer",
        description:
          "Senior QA Automation Engineer with 6+ years of experience delivering high-quality digital products in FinTech, SaaS, RegTech, and Payment platforms.",
        url: "https://poutchoko-qa-portfolio.vercel.app",
        image: "https://poutchoko-qa-portfolio.vercel.app/images/logo.jpg",
        email: "mailto:poutchokoetienne@gmail.com",
        telephone: "+237657268355",
        sameAs: [
          "https://linkedin.com/in/etienne-poutchoko-emako",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Douala",
          addressCountry: "Cameroon",
        },
        knowsAbout: [
          "Quality Assurance",
          "Test Automation",
          "Cypress",
          "Playwright",
          "Robot Framework",
          "Postman",
          "Gatling",
          "GitLab CI/CD",
          "Jenkins",
          "FinTech QA",
          "RegTech",
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
