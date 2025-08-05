"use client"
import { useTypewriter } from "@/hooks/use-typewriter"

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypewriterText({ text, speed = 50, className = "" }: TypewriterTextProps) {
  const displayText = useTypewriter(text, speed)

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
