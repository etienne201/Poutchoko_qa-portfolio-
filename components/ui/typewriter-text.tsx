"use client"

import React, { useEffect, useState, useMemo } from "react"
import { cn } from "@/lib/utils"

export interface TypewriterTextProps {
  /** Single text string to type out */
  text?: string
  /** Multiple text strings to loop through (Typed.js style) */
  words?: string[]
  /** Typing speed in ms per character (default: 45ms) */
  speed?: number
  /** Deletion speed in ms per character (default: 25ms) */
  deleteSpeed?: number
  /** Delay in ms before typing begins (default: 150ms) */
  delay?: number
  /** Pause time in ms when a word/phrase is completely typed (default: 2400ms) */
  pauseDuration?: number
  /** Whether to loop through words continuously (default: true if words is provided) */
  loop?: boolean
  /** Whether to show a blinking cursor (default: true) */
  cursor?: boolean
  /** Character or symbol used for cursor (default: "|") */
  cursorChar?: string
  /** Custom class for the cursor element */
  cursorClassName?: string
  /** Trigger typing only when visible in viewport (default: false) */
  triggerOnView?: boolean
  /** Hide cursor after completion in single text mode (default: false) */
  hideCursorOnComplete?: boolean
  /** Prevent layout shift by pre-reserving dimensions using invisible full text (default: false) */
  preserveLayout?: boolean
  /** Custom wrapper HTML tag (default: "span") */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div"
  className?: string
  /** Callback fired when typing of current text is complete */
  onComplete?: () => void
}

export function TypewriterText({
  text,
  words,
  speed = 45,
  deleteSpeed = 25,
  delay = 150,
  pauseDuration = 2400,
  loop = true,
  cursor = true,
  cursorChar = "|",
  cursorClassName,
  triggerOnView = false,
  hideCursorOnComplete = false,
  preserveLayout = false,
  as: Component = "span",
  className,
  onComplete,
}: TypewriterTextProps) {
  const [containerNode, setContainerNode] = useState<HTMLElement | null>(null)
  const [displayedText, setDisplayedText] = useState<string>("")
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isStarted, setIsStarted] = useState<boolean>(!triggerOnView)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

  // Normalize candidate list of strings
  const stringList = useMemo(() => {
    if (words && words.length > 0) return words
    if (text) return [text]
    return [""]
  }, [words, text])

  const targetText = stringList[currentWordIndex] || ""

  // Detect accessibility prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Viewport intersection trigger
  useEffect(() => {
    if (!triggerOnView || isStarted) return
    const el = containerNode
    if (!el || typeof IntersectionObserver === "undefined") {
      if (!triggerOnView) setIsStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsStarted(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [triggerOnView, isStarted, containerNode])

  // Reset when text / words change (e.g. language toggle)
  useEffect(() => {
    setDisplayedText("")
    setIsDeleting(false)
    setIsComplete(false)
    setCurrentWordIndex(0)
  }, [text, words])

  // Typing engine
  useEffect(() => {
    if (!isStarted) return

    // If reduced motion is requested, render target text directly
    if (prefersReducedMotion) {
      setDisplayedText(targetText)
      setIsComplete(true)
      onComplete?.()
      return
    }

    let timeoutId: NodeJS.Timeout

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < targetText.length) {
        // Natural human typing jitter for high realism
        const jitter = Math.floor(Math.random() * 20) - 10
        const currentSpeed = Math.max(15, speed + jitter)

        timeoutId = setTimeout(() => {
          setDisplayedText(targetText.slice(0, displayedText.length + 1))
        }, displayedText.length === 0 ? delay : currentSpeed)
      } else {
        // Word is fully typed
        setIsComplete(true)
        onComplete?.()

        // If multiple words or loop is enabled, pause then start deleting
        if (stringList.length > 1 && loop) {
          timeoutId = setTimeout(() => {
            setIsDeleting(true)
            setIsComplete(false)
          }, pauseDuration)
        }
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(targetText.slice(0, displayedText.length - 1))
        }, deleteSpeed)
      } else {
        // Word completely cleared, advance to next word
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % stringList.length)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [
    displayedText,
    isDeleting,
    targetText,
    isStarted,
    prefersReducedMotion,
    speed,
    deleteSpeed,
    delay,
    pauseDuration,
    stringList,
    loop,
    onComplete,
  ])

  // Screen reader accessible text
  const fullAccessibleText = stringList.length === 1 ? stringList[0] : targetText

  const showCursor = cursor && (!hideCursorOnComplete || !isComplete || (stringList.length > 1 && loop))

  // Preserved layout mode: renders invisible target text behind to prevent layout jumps
  if (preserveLayout) {
    return (
      <Component
        ref={setContainerNode}
        className={cn("relative inline-block text-left", className)}
      >
        <span className="sr-only">{fullAccessibleText}</span>
        {/* Invisible placeholder reserving exact physical bounding box */}
        <span className="invisible select-none pointer-events-none" aria-hidden="true">
          {targetText || fullAccessibleText || "\u00A0"}
          {cursor && <span className="opacity-0">{cursorChar}</span>}
        </span>
        {/* Visible animated typed text */}
        <span className="absolute inset-0 block truncate sm:overflow-visible" aria-hidden="true">
          {displayedText}
          {showCursor && (
            <span
              className={cn(
                "inline-block font-mono font-bold text-primary ml-0.5 animate-pulse",
                cursorClassName,
              )}
            >
              {cursorChar}
            </span>
          )}
        </span>
      </Component>
    )
  }

  return (
    <Component ref={setContainerNode} className={cn("inline-block", className)}>
      <span className="sr-only">{fullAccessibleText}</span>
      <span aria-hidden="true">
        {displayedText}
        {showCursor && (
          <span
            className={cn(
              "inline-block font-mono font-bold text-primary ml-0.5 animate-pulse select-none",
              cursorClassName,
            )}
          >
            {cursorChar}
          </span>
        )}
      </span>
    </Component>
  )
}
