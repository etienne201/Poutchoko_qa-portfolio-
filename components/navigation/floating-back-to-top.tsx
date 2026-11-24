"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function FloatingBackToTop() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("footer.backToTop")}
      title={t("footer.backToTop")}
      className={`no-print 2xl:hidden fixed right-4 bottom-[4.75rem] md:bottom-6 z-40 h-11 w-11 rounded-2xl bg-white/90 dark:bg-[#0c1722]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-sky-400 shadow-elevated flex items-center justify-center transition-all duration-250 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  )
}
