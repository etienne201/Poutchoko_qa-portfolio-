"use client"

import type { ReactNode } from "react"
import { m } from "motion/react"

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Révélation fluide et sobre à l'entrée dans le viewport.
 * Respecte strictement prefers-reduced-motion via MotionProvider racine et n'impacte jamais le LCP.
 */
export function RevealOnScroll({ children, delay = 0, className }: RevealOnScrollProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.42,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
