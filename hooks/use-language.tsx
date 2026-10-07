"use client"
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import frTranslations from "@/locales/fr/common.json"
import enTranslations from "@/locales/en/common.json"

export type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  fr: frTranslations as Record<string, string>,
  en: enTranslations as Record<string, string>,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    // 1. Check saved user preference in localStorage
    try {
      const saved = localStorage.getItem("portfolio_lang") as Language | null
      if (saved === "fr" || saved === "en") {
        setLanguageState(saved)
        document.documentElement.lang = saved
        return
      }
    } catch {
      // Ignore localStorage access errors (e.g. strict privacy mode)
    }

    // 2. Fallback to browser language
    try {
      const browserLang = navigator.language?.toLowerCase() || ""
      const detected = browserLang.startsWith("en") ? "en" : "fr"
      setLanguageState(detected)
      document.documentElement.lang = detected
    } catch {
      setLanguageState("fr")
      document.documentElement.lang = "fr"
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("portfolio_lang", lang)
    } catch {
      // Ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }

  const t = (key: string): string => {
    const currentDict = translations[language]
    if (currentDict && key in currentDict) {
      return currentDict[key]
    }
    // Fallback to English, then French, then key itself
    if (translations.en && key in translations.en) {
      return translations.en[key]
    }
    if (translations.fr && key in translations.fr) {
      return translations.fr[key]
    }
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
