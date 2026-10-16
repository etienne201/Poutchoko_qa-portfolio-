"use client"
import { useLanguage, type Language } from "@/hooks/use-language"

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
      aria-label="Sélecteur de langue / Language switcher"
      className="inline-flex items-center h-9 p-0.5 rounded-xl bg-slate-100/90 dark:bg-[#0c1722] border border-slate-200/80 dark:border-white/10 shadow-xs select-none shrink-0"
    >
      <div className="flex items-center h-full">
        <button
          type="button"
          onClick={() => handleSelect("fr")}
          aria-pressed={language === "fr"}
          title={t("nav.langSwitchFr")}
          className={`h-full px-2.5 rounded-lg text-xs transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            language === "fr"
              ? "bg-white dark:bg-sky-500/20 text-primary dark:text-sky-300 dark:border dark:border-sky-400/30 shadow-xs font-bold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
          }`}
        >
          FR
        </button>
        <button
          type="button"
          onClick={() => handleSelect("en")}
          aria-pressed={language === "en"}
          title={t("nav.langSwitchEn")}
          className={`h-full px-2.5 rounded-lg text-xs transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            language === "en"
              ? "bg-white dark:bg-sky-500/20 text-primary dark:text-sky-300 dark:border dark:border-sky-400/30 shadow-xs font-bold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
          }`}
        >
          EN
        </button>
      </div>
    </div>
  )
}
