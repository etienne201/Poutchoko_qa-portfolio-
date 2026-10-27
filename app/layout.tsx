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
    { name: "Poutchoko Emako Étienne", url: "https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184/" },
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
      { url: "/images/logo-badge.png", sizes: "512x512", type: "image/png" },
      { url: "/images/logo.jpg", sizes: "800x800", type: "image/jpeg" },
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
        url: "https://poutchoko-qa-portfolio.vercel.app/images/homepage.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Poutchoko Emako Étienne - Senior QA Automation Engineer Portfolio",
      },
      {
        url: "https://poutchoko-qa-portfolio.vercel.app/images/hero-background.jpg",
        width: 1920,
        height: 1080,
        type: "image/jpeg",
        alt: "Poutchoko Emako Étienne - QA Automation Workspace & Test Infrastructure",
      },
      {
        url: "https://poutchoko-qa-portfolio.vercel.app/images/logo.jpg",
        width: 800,
        height: 800,
        type: "image/jpeg",
        alt: "Poutchoko Emako Étienne - Portrait Senior QA Engineer",
      },
      {
        url: "https://poutchoko-qa-portfolio.vercel.app/images/logo-badge.png",
        width: 512,
        height: 512,
        type: "image/png",
        alt: "Poutchoko Emako Étienne - QA Automation Certification Badge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poutchoko Emako Étienne | Senior QA Automation Engineer",
    description:
      "Senior QA Automation Engineer specializing in FinTech, RegTech, SaaS, Cypress, Playwright, and CI/CD quality gates.",
    images: [
      "https://poutchoko-qa-portfolio.vercel.app/images/homepage.jpg",
      "https://poutchoko-qa-portfolio.vercel.app/images/hero-background.jpg",
      "https://poutchoko-qa-portfolio.vercel.app/images/logo.jpg",
      "https://poutchoko-qa-portfolio.vercel.app/images/logo-badge.png",
    ],
  },
  verification: {
    google: [
      "7u6CYEZ9JAgTR4wGuxQ8qyN7TUgAP-KlEvun_bWEu2o",
      "_UBrYv8mIyNi0-_Y_ZnkzXYzxL74EdLYnbVO_oRxXc4",
    ],
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
        givenName: "Étienne",
        familyName: "Poutchoko Emako",
        additionalName: "Etienne",
        alternateName: [
          "Étienne Poutchoko Emako",
          "Etienne Poutchoko",
          "etienne201",
          "Poutchoko Etienne",
          "Poutchoko QA",
          "Poutchoko QA Automation",
        ],
        jobTitle: "Senior QA Automation Engineer",
        gender: "https://schema.org/Male",
        nationality: {
          "@type": "Country",
          name: "Cameroon",
          alternateName: "Cameroun",
        },
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Quality Assurance Analyst and Tester",
          occupationalCategory: "15-1253.00",
        },
        description:
          "Senior QA Automation Engineer with 6+ years of experience delivering high-quality digital products in FinTech, SaaS, RegTech, and Payment platforms. Expert in Cypress, Playwright, API testing, and CI/CD quality gates.",
        url: "https://poutchoko-qa-portfolio.vercel.app",
        image: [
          "https://poutchoko-qa-portfolio.vercel.app/images/logo.jpg",
          "https://poutchoko-qa-portfolio.vercel.app/images/logo-badge.png",
          "https://poutchoko-qa-portfolio.vercel.app/images/homepage.jpg",
          "https://poutchoko-qa-portfolio.vercel.app/images/hero-background.jpg",
        ],
        email: "mailto:poutchokoetienne@gmail.com",
        telephone: "+237657268355",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Douala",
          addressLocality: "Douala",
          addressRegion: "Littoral",
          postalCode: "00237",
          addressCountry: {
            "@type": "Country",
            name: "Cameroon",
            alternateName: "Cameroun",
          },
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 4.0511,
          longitude: 9.7679,
        },
        hasMap: "https://maps.google.com/?q=Douala,+Cameroon",
        homeLocation: {
          "@type": "Place",
          name: "Douala, Littoral, Cameroun",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Douala",
            addressRegion: "Littoral",
            addressCountry: "Cameroon",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 4.0511,
            longitude: 9.7679,
          },
        },
        workLocation: {
          "@type": "Place",
          name: "Douala, Cameroun & Remote International (Europe, Amérique du Nord, Afrique)",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Douala",
            addressRegion: "Littoral",
            addressCountry: "Cameroon",
          },
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "Professional & Contract Inquiries",
            telephone: "+237657268355",
            email: "poutchokoetienne@gmail.com",
            availableLanguage: ["French", "English"],
            areaServed: [
              "Worldwide",
              "Europe",
              "CEMAC",
              "Cameroon",
              "France",
              "Canada",
            ],
          },
        ],
        sameAs: [
          "https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184/",
          "https://github.com/etienne201",
          "https://collective.work",
        ],
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
        "@type": "ProfessionalService",
        "@id": "https://poutchoko-qa-portfolio.vercel.app/#service",
        name: "Poutchoko Emako Étienne - Senior QA Consulting & Automation Services",
        founder: {
          "@id": "https://poutchoko-qa-portfolio.vercel.app/#person",
        },
        url: "https://poutchoko-qa-portfolio.vercel.app",
        logo: "https://poutchoko-qa-portfolio.vercel.app/images/logo.jpg",
        image: [
          "https://poutchoko-qa-portfolio.vercel.app/images/homepage.jpg",
          "https://poutchoko-qa-portfolio.vercel.app/images/hero-background.jpg",
          "https://poutchoko-qa-portfolio.vercel.app/images/logo.jpg",
          "https://poutchoko-qa-portfolio.vercel.app/images/logo-badge.png",
        ],
        telephone: "+237657268355",
        email: "poutchokoetienne@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Douala",
          addressLocality: "Douala",
          addressRegion: "Littoral",
          postalCode: "00237",
          addressCountry: "Cameroon",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 4.0511,
          longitude: 9.7679,
        },
        hasMap: "https://maps.google.com/?q=Douala,+Cameroon",
        areaServed: [
          "Worldwide",
          "Remote",
          "Europe",
          "CEMAC",
          "Cameroon",
          "France",
        ],
        priceRange: "$$",
      },
      {
        "@type": "WebSite",
        "@id": "https://poutchoko-qa-portfolio.vercel.app/#website",
        url: "https://poutchoko-qa-portfolio.vercel.app",
        name: "Poutchoko Emako Étienne - Senior QA Automation Engineer Portfolio",
        image: "https://poutchoko-qa-portfolio.vercel.app/images/homepage.jpg",
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
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://poutchoko-qa-portfolio.vercel.app/images/homepage.jpg",
        },
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
