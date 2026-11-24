"use client"

import { useEffect, useState } from "react"

/**
 * Barre de progression de lecture GPU-only.
 * Utilise CSS Scroll-Driven Animations (`animation-timeline: scroll(root block)`) en priorité
 * lorsque supporté par le navigateur, avec fallback automatique `requestAnimationFrame`.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(false)

  useEffect(() => {
    const nativeSupport =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline", "scroll()")

    setSupportsScrollTimeline(nativeSupport)
    if (nativeSupport) return

    let rafId = 0

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0
      setProgress(ratio)
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

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-3 bottom-0 h-[2px] overflow-hidden rounded-full bg-slate-200/50 dark:bg-white/[0.06]"
    >
      <div
        className={`h-full origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 will-change-transform ${
          supportsScrollTimeline
            ? "scroll-driven-progress"
            : "transition-transform duration-75 ease-out"
        }`}
        style={supportsScrollTimeline ? undefined : { transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
