"use client"

import { useEffect, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

let isRegistered = false

export function ensureGsapPlugins() {
  if (!isRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
    isRegistered = true
  }
}

/**
 * Exécute une orchestration GSAP (`to`, `from`, `timeline`, `ScrollTrigger`, `MotionPathPlugin`)
 * dans un `gsap.context` scoped, automatiquement désactivée sous `prefers-reduced-motion: reduce`.
 */
export function useGsapScroll(
  scopeRef: RefObject<HTMLElement | null>,
  setup: (gsapInstance: typeof gsap, scrollTrigger: typeof ScrollTrigger) => void,
) {
  useEffect(() => {
    if (typeof window === "undefined" || !scopeRef.current) return

    ensureGsapPlugins()

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        setup(gsap, ScrollTrigger)
      }, scopeRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [scopeRef, setup])
}
