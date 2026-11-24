"use client"

import { useEffect, useState } from "react"

/**
 * Scroll-spy basé sur IntersectionObserver (zéro layout thrashing / offsetTop).
 * Retourne "" en haut de page (#hero) et l'ID de la section dominante en cours de lecture.
 */
export function useScrollSpy(sectionIds: readonly string[], enabled = true): string {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (!enabled || sectionIds.length === 0 || typeof window === "undefined") {
      setActiveId("")
      return
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        if (window.scrollY < 140) {
          setActiveId("")
          return
        }

        let bestId = ""
        let bestRatio = 0
        for (const id of sectionIds) {
          const ratio = ratios.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        if (bestId) {
          setActiveId(bestId)
        }
      },
      {
        rootMargin: "-22% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      },
    )

    elements.forEach((el) => observer.observe(el))

    let rafId = 0
    const handleScrollBounds = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (window.scrollY < 140) {
          setActiveId("")
          return
        }
        const nearBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
        if (nearBottom) {
          setActiveId(sectionIds[sectionIds.length - 1] ?? "")
        }
      })
    }

    handleScrollBounds()
    window.addEventListener("scroll", handleScrollBounds, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener("scroll", handleScrollBounds)
    }
  }, [sectionIds, enabled])

  return activeId
}
