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
    setTheme(isDark ? "light" : "dark")
  }

  // Rendu stable pendant le SSR / avant hydratation pour éviter tout Layout Shift
  if (!mounted) {
    return (
      <div
        className="h-9 w-9 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-100/60 dark:bg-[#0c1722] animate-pulse"
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
      className="group relative h-9 w-9 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-slate-100/90 dark:bg-[#0c1722] hover:bg-slate-200/90 dark:hover:bg-[#132230] border border-slate-200/80 dark:border-white/10 dark:hover:border-amber-400/40 text-slate-700 dark:text-amber-400 shadow-xs dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_0_14px_rgba(251,191,36,0.22)] transition-all duration-200 hover:scale-[1.04] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background shrink-0"
    >
      {/* En DARK MODE : on affiche le Soleil chaleureux pour inviter à éclairer (toLight) */}
      {isDark ? (
        <Sun
          className="h-4 w-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300 animate-in zoom-in-75"
          aria-hidden="true"
        />
      ) : (
        /* En LIGHT MODE : on affiche la Lune pour inviter au mode nuit (toDark) */
        <Moon
          className="h-4 w-4 text-slate-700 group-hover:-rotate-12 transition-transform duration-300 animate-in zoom-in-75"
          aria-hidden="true"
        />
      )}

      <span className="sr-only">
        {isDark ? t("theme.srDark") : t("theme.srLight")}
      </span>
    </button>
  )
}

