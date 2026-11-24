"use client"

import { useLanguage } from "@/hooks/use-language"

export function SkipLink() {
  const { language } = useLanguage()
  const label = language === "en" ? "Skip to main content" : "Aller au contenu principal"

  return (
    <a
      href="#main-content"
      className="no-print sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-primary focus:text-primary-foreground focus:font-semibold focus:text-sm focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      {label}
    </a>
  )
}
