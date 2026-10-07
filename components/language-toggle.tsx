"use client"
import { useLanguage, type Language } from "@/hooks/use-language"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  const handleSelect = (lang: Language) => {
    if (language !== lang) {
      setLanguage(lang)
    }
  }

  return (
    <div
      role="group"
      aria-label="Sélecteur de langue / Language selector"
      className="inline-flex items-center p-1 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] shadow-sm"
    >
      <Globe className="h-3.5 w-3.5 text-primary ml-1.5 mr-1 hidden sm:inline-block flex-shrink-0" aria-hidden="true" />
      <div className="flex items-center text-xs font-bold tracking-wider">
        <button
          type="button"
          onClick={() => handleSelect("fr")}
          aria-pressed={language === "fr"}
          title={t("nav.langSwitchFr")}
          className={`px-2 py-1 rounded-lg transition-all duration-200 min-h-[32px] min-w-[32px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            language === "fr"
              ? "bg-white dark:bg-primary text-primary dark:text-slate-950 shadow-sm font-extrabold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          FR
        </button>
        <span className="text-slate-300 dark:text-white/20 select-none px-0.5" aria-hidden="true">
          |
        </span>
        <button
          type="button"
          onClick={() => handleSelect("en")}
          aria-pressed={language === "en"}
          title={t("nav.langSwitchEn")}
          className={`px-2 py-1 rounded-lg transition-all duration-200 min-h-[32px] min-w-[32px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            language === "en"
              ? "bg-white dark:bg-primary text-primary dark:text-slate-950 shadow-sm font-extrabold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          EN
        </button>
      </div>
    </div>
  )
}
