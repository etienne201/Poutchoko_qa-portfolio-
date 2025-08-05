import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Étienne Poutchoko - QA Engineer Portfolio",
  description: "Experienced QA Engineer specializing in test automation, performance testing, and CI/CD integration.",
  keywords: "QA Engineer, Test Automation, Quality Assurance, Software Testing, Cypress, Playwright, Étienne Poutchoko",
  authors: [{ name: "Étienne Poutchoko" }],
  creator: "Étienne Poutchoko",
  publisher: "Étienne Poutchoko",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    apple: [{ url: "/images/logo.jpg", sizes: "180x180", type: "image/jpeg" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.vercel.app",
    title: "Étienne Poutchoko - QA Engineer Portfolio",
    description: "Experienced QA Engineer specializing in test automation, performance testing, and CI/CD integration.",
    siteName: "Étienne Poutchoko Portfolio",
    images: [
      {
        url: "/images/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Étienne Poutchoko - QA Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Étienne Poutchoko - QA Engineer Portfolio",
    description: "Experienced QA Engineer specializing in test automation, performance testing, and CI/CD integration.",
    images: ["/images/homepage.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e293b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
