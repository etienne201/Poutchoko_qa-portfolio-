"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/hooks/use-language"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    const root = document.documentElement
    // Déclenche une transition fluide sur l'ensemble de la page sans impacter les perfs au chargement
    root.classList.add("theme-transition")
    setTheme(isDark ? "light" : "dark")
    window.setTimeout(() => {
      root.classList.remove("theme-transition")
    }, 350)
  }

  // Rendu stable pendant le SSR / avant hydratation pour éviter tout Layout Shift
  if (!mounted) {
    return (
      <div
        className="h-9 w-9 rounded-xl border border-slate-200/60 dark:border-white/[0.08] bg-slate-100/60 dark:bg-white/[0.03] animate-pulse"
        aria-hidden="true"
      />
    )
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? t("theme.toLight") : t("theme.toDark")}
      title={isDark ? t("theme.toLight") : t("theme.toDark")}
      className="relative h-9 w-9 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-slate-100/80 dark:bg-white/[0.04] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.08] text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 hover:scale-[1.04] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Icône Soleil (Visible en Light Mode) */}
      <Sun
        className={`h-4 w-4 text-amber-500 transition-all duration-300 ease-out ${
          isDark ? "scale-0 -rotate-90 opacity-0 absolute" : "scale-100 rotate-0 opacity-100"
        }`}
        aria-hidden="true"
      />

      {/* Icône Lune (Visible en Dark Mode) */}
      <Moon
        className={`h-4 w-4 text-sky-400 transition-all duration-300 ease-out ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0 absolute"
        }`}
        aria-hidden="true"
      />

      <span className="sr-only">
        {isDark ? t("theme.srDark") : t("theme.srLight")}
      </span>
    </button>
  )
}
