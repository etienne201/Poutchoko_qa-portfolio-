"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { OBSERVED_SECTION_IDS, PORTFOLIO_SECTIONS } from "@/config/navigation"

/**
 * Micro-rail latéral discret (2xl+) avec trajectoire SVG animée au scroll
 * (lignes, marqueurs de passage 01–07 et progression continue).
 */
export function SectionRail() {
  const { t, language } = useLanguage()
  const activeSection = useScrollSpy(OBSERVED_SECTION_IDS, true)
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let rafId = 0

    const update = () => {
      const y = window.scrollY
      setVisible(y > 260)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Longueur de la trajectoire SVG reliant les 7 marqueurs
  const trackLength = 192
  const dashOffset = trackLength * (1 - scrollProgress)

  return (
    <aside
      aria-label={language === "en" ? "Section quick navigation" : "Navigation rapide des sections"}
      className={`no-print hidden 2xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2 transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-col items-center gap-2 p-2 rounded-2xl bg-white/85 dark:bg-[#0c1722]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-card">
        {/* Trajectoire SVG verticale animée reliant les points de passage */}
        <div className="relative flex flex-col items-center gap-2">
          <svg
            aria-hidden="true"
            viewBox="0 0 12 200"
            className="pointer-events-none absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-3 h-[calc(100%-24px)] overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="rail-progress-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="55%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            {/* Ligne de fond */}
            <path
              d="M 6 4 L 6 196"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-slate-200 dark:text-white/10"
            />
            {/* Trajectoire active animée */}
            <path
              d="M 6 4 L 6 196"
              fill="none"
              stroke="url(#rail-progress-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={trackLength}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 80ms linear" }}
            />
          </svg>

          {PORTFOLIO_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id
            return (
              <Link
                key={sec.id}
                href={sec.href}
                aria-current={isActive ? "location" : undefined}
                aria-label={`${sec.num} ${t(sec.labelKey)}`}
                className="group relative z-10 flex items-center justify-center w-6 h-6 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* Tooltip au survol */}
                <span className="pointer-events-none absolute right-8 px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-[11px] font-semibold whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-150 shadow-md">
                  <span className="font-mono opacity-60 mr-1.5">{sec.num}</span>
                  {t(sec.labelKey)}
                </span>

                {/* Marqueur de passage */}
                <span
                  className={`block rounded-full transition-all duration-200 ring-2 ring-white dark:ring-[#0c1722] ${
                    isActive
                      ? "w-2.5 h-2.5 bg-primary dark:bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.75)] scale-110"
                      : "w-1.5 h-1.5 bg-slate-400/80 dark:bg-slate-500 group-hover:bg-primary dark:group-hover:bg-sky-300 group-hover:scale-125"
                  }`}
                />
              </Link>
            )
          })}
        </div>

        <div className="w-3.5 h-px bg-slate-200 dark:bg-white/10 my-0.5" />

        <button
          type="button"
          onClick={scrollToTop}
          aria-label={t("footer.backToTop")}
          title={t("footer.backToTop")}
          className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  )
}
