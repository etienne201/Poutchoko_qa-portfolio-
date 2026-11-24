"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { useLanguage } from "@/hooks/use-language"
import { TechIcon } from "@/components/tech-icon"
import {
  Terminal,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  ArrowUpRight,
  Code2,
} from "lucide-react"

let isTerminalGsapRegistered = false

function ensureTerminalGsapPlugins() {
  if (!isTerminalGsapRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(TextPlugin, ScrambleTextPlugin)
    isTerminalGsapRegistered = true
  }
}

type TestStatus = "pending" | "running" | "passed"
type TokenType = "kw" | "fn" | "str" | "num" | "prop" | "plain"

interface CodeToken {
  text: string
  type: TokenType
}

interface CommitmentSpec {
  id: string
  sectionId: string
  tool: string
  specFile: string
  langTag: string
  label: string
  command: string
  codeLines: CodeToken[][]
  assertion: string
  durationMs: number
  text: string
}

const TOKEN_CLASSES: Record<TokenType, string> = {
  kw: "text-violet-400",
  fn: "text-sky-300",
  str: "text-emerald-300",
  num: "text-amber-300",
  prop: "text-cyan-300",
  plain: "text-slate-300",
}

export function HeroTerminalBadge() {
  const { t, language } = useLanguage()

  const commitments: CommitmentSpec[] = useMemo(
    () => [
      {
        id: "01",
        sectionId: "about",
        tool: "Cypress",
        specFile: "philosophy.cy.ts",
        langTag: "TS",
        label: language === "fr" ? "Philosophie QA" : "QA Philosophy",
        command: "npx cypress run --spec philosophy.cy.ts",
        codeLines: [
          [
            { text: "cy", type: "prop" },
            { text: ".", type: "plain" },
            { text: "visit", type: "fn" },
            { text: "(", type: "plain" },
            { text: "'/quality-strategy'", type: "str" },
            { text: ")", type: "plain" },
          ],
          [
            { text: "cy", type: "prop" },
            { text: ".", type: "plain" },
            { text: "get", type: "fn" },
            { text: "(", type: "plain" },
            { text: "'[data-qa=risk-matrix]'", type: "str" },
            { text: ").", type: "plain" },
            { text: "should", type: "fn" },
            { text: "(", type: "plain" },
            { text: "'be.visible'", type: "str" },
            { text: ")", type: "plain" },
          ],
          [
            { text: "cy", type: "prop" },
            { text: ".", type: "plain" },
            { text: "verifyImpact", type: "fn" },
            { text: "({ ", type: "plain" },
            { text: "zeroCriticalBugs", type: "prop" },
            { text: ": ", type: "plain" },
            { text: "true", type: "kw" },
            { text: " })", type: "plain" },
          ],
        ],
        assertion:
          language === "fr"
            ? 'expect(qa.philosophy).toAlignWith("impact-métier")'
            : 'expect(qa.philosophy).toAlignWith("business-impact")',
        durationMs: 142,
        text: t("about.subtitle"),
      },
      {
        id: "02",
        sectionId: "expertise",
        tool: "Playwright",
        specFile: "lifecycle.spec.ts",
        langTag: "TS",
        label: language === "fr" ? "Maturité Cycle de Vie" : "E2E Lifecycle",
        command: "npx playwright test lifecycle.spec.ts",
        codeLines: [
          [
            { text: "const ", type: "kw" },
            { text: "flow ", type: "plain" },
            { text: "= ", type: "plain" },
            { text: "page", type: "prop" },
            { text: ".", type: "plain" },
            { text: "getByTestId", type: "fn" },
            { text: "(", type: "plain" },
            { text: "'e2e-lifecycle'", type: "str" },
            { text: ")", type: "plain" },
          ],
          [
            { text: "await ", type: "kw" },
            { text: "expect", type: "fn" },
            { text: "(flow).", type: "plain" },
            { text: "toCover", type: "fn" },
            { text: "([", type: "plain" },
            { text: "'spec'", type: "str" },
            { text: ", ", type: "plain" },
            { text: "'ci'", type: "str" },
            { text: ", ", type: "plain" },
            { text: "'prod'", type: "str" },
            { text: "])", type: "plain" },
          ],
          [
            { text: "await ", type: "kw" },
            { text: "expect", type: "fn" },
            { text: "(", type: "plain" },
            { text: "page", type: "prop" },
            { text: ".", type: "plain" },
            { text: "gate", type: "fn" },
            { text: "()).", type: "plain" },
            { text: "toBePassed", type: "fn" },
            { text: "()", type: "plain" },
          ],
        ],
        assertion:
          language === "fr"
            ? 'expect(lifecycle.scope).toCover("conception → prod")'
            : 'expect(lifecycle.scope).toCover("spec → monitoring")',
        durationMs: 186,
        text: t("expertise.subtitle"),
      },
      {
        id: "03",
        sectionId: "experience",
        tool: "Robot Framework",
        specFile: "track_record.robot",
        langTag: "ROBOT",
        label: language === "fr" ? "Track Record Éprouvé" : "Proven Track Record",
        command: "robot --suite track_record.robot",
        codeLines: [
          [
            { text: "Verify Platforms", type: "fn" },
            { text: "    ", type: "plain" },
            { text: "ARSy", type: "str" },
            { text: "    ", type: "plain" },
            { text: "URBANY", type: "str" },
            { text: "    ", type: "plain" },
            { text: "D4Lean", type: "str" },
          ],
          [
            { text: "Should Cover Regions", type: "fn" },
            { text: "    ", type: "plain" },
            { text: "CEMAC", type: "str" },
            { text: "    ", type: "plain" },
            { text: "Europe", type: "str" },
          ],
          [
            { text: "Regression Delta Should Be", type: "fn" },
            { text: "    ", type: "plain" },
            { text: "-40%", type: "num" },
          ],
        ],
        assertion: 'expect(delivery.regions).toInclude(["CEMAC", "Europe"])',
        durationMs: 214,
        text: t("exp.subtitle"),
      },
      {
        id: "04",
        sectionId: "skills",
        tool: "Postman",
        specFile: "api-stack.postman.json",
        langTag: "JS",
        label: language === "fr" ? "Stack Moderne" : "Modern Stack",
        command: "newman run api-stack.postman.json",
        codeLines: [
          [
            { text: "pm", type: "prop" },
            { text: ".", type: "plain" },
            { text: "test", type: "fn" },
            { text: "(", type: "plain" },
            { text: "'API & Contract 200 OK'", type: "str" },
            { text: ", () => {", type: "plain" },
          ],
          [
            { text: "  pm", type: "prop" },
            { text: ".", type: "plain" },
            { text: "response", type: "prop" },
            { text: ".to.have.", type: "plain" },
            { text: "status", type: "fn" },
            { text: "(", type: "plain" },
            { text: "200", type: "num" },
            { text: ");", type: "plain" },
          ],
          [
            { text: "  pm", type: "prop" },
            { text: ".", type: "plain" },
            { text: "expect", type: "fn" },
            { text: "(", type: "plain" },
            { text: "stack", type: "prop" },
            { text: ").to.", type: "plain" },
            { text: "include", type: "fn" },
            { text: "(", type: "plain" },
            { text: "'CI/CD'", type: "str" },
            { text: "); });", type: "plain" },
          ],
        ],
        assertion: 'expect(stack).toContainAll(["Cypress", "Playwright", "CI/CD"])',
        durationMs: 168,
        text: t("skills.subtitle"),
      },
      {
        id: "05",
        sectionId: "projects",
        tool: "Gatling",
        specFile: "LoadRoiSimulation.scala",
        langTag: "SCALA",
        label: language === "fr" ? "Cas Concrets & ROI" : "Case Studies ROI",
        command: "mvn gatling:test -Dsim=LoadRoiSimulation",
        codeLines: [
          [
            { text: "setUp", type: "fn" },
            { text: "(scn.", type: "plain" },
            { text: "inject", type: "fn" },
            { text: "(", type: "plain" },
            { text: "rampUsers", type: "fn" },
            { text: "(", type: "plain" },
            { text: "500", type: "num" },
            { text: ").", type: "plain" },
            { text: "during", type: "fn" },
            { text: "(", type: "plain" },
            { text: "30.seconds", type: "num" },
            { text: ")))", type: "plain" },
          ],
          [
            { text: "  .", type: "plain" },
            { text: "assertions", type: "fn" },
            { text: "(", type: "plain" },
            { text: "global", type: "prop" },
            { text: ".responseTime.", type: "plain" },
            { text: "percentile", type: "fn" },
            { text: "(", type: "plain" },
            { text: "95", type: "num" },
            { text: ").", type: "plain" },
            { text: "lt", type: "fn" },
            { text: "(", type: "plain" },
            { text: "200", type: "num" },
            { text: "),", type: "plain" },
          ],
          [
            { text: "    ", type: "plain" },
            { text: "global", type: "prop" },
            { text: ".successfulRequests.", type: "plain" },
            { text: "percent.is", type: "fn" },
            { text: "(", type: "plain" },
            { text: "100", type: "num" },
            { text: "))", type: "plain" },
          ],
        ],
        assertion: 'expect(roi.regressionTime).toReduceBy("40%")',
        durationMs: 231,
        text: t("projects.subtitle"),
      },
      {
        id: "06",
        sectionId: "education",
        tool: "Xray (JIRA)",
        specFile: "istqb-standards.feature",
        langTag: "BDD",
        label: language === "fr" ? "Excellence d'Ingénierie" : "Engineering Standards",
        command: "xray-cli import --feature istqb-standards.feature",
        codeLines: [
          [
            { text: "Given ", type: "kw" },
            { text: "ISTQB risk-based plan is linked in ", type: "plain" },
            { text: "Xray", type: "str" },
          ],
          [
            { text: "When ", type: "kw" },
            { text: "automated suite runs on ", type: "plain" },
            { text: "Merge Request", type: "str" },
          ],
          [
            { text: "Then ", type: "kw" },
            { text: "100%", type: "num" },
            { text: " requirements traced with ", type: "plain" },
            { text: "0", type: "num" },
            { text: " escaped bugs", type: "plain" },
          ],
        ],
        assertion: 'expect(standards).toSatisfy("ISTQB & Clean QA")',
        durationMs: 154,
        text: t("edu.subtitle"),
      },
      {
        id: "07",
        sectionId: "contact",
        tool: "GitLab CI",
        specFile: ".gitlab-ci.yml",
        langTag: "YAML",
        label: language === "fr" ? "Engagement Partenaire" : "Partnership Ready",
        command: "gitlab-runner exec docker quality-gate",
        codeLines: [
          [
            { text: "quality_gate", type: "prop" },
            { text: ":", type: "plain" },
          ],
          [
            { text: "  image", type: "kw" },
            { text: ": ", type: "plain" },
            { text: "cypress/included:latest", type: "str" },
          ],
          [
            { text: "  script", type: "kw" },
            { text: ": [", type: "plain" },
            { text: '"pnpm test:e2e"', type: "str" },
            { text: ", ", type: "plain" },
            { text: '"pnpm deploy:ready"', type: "str" },
            { text: "]", type: "plain" },
          ],
        ],
        assertion:
          language === "fr"
            ? 'expect(availability).toBe("Remote & Missions")'
            : 'expect(availability).toBe("Remote & Contract")',
        durationMs: 129,
        text: t("contact.subtitle"),
      },
    ],
    [language, t],
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [phase, setPhase] = useState<"running" | "passed">("running")
  const [activeLineIdx, setActiveLineIdx] = useState<number>(0)
  const [statuses, setStatuses] = useState<TestStatus[]>(() =>
    Array.from({ length: 7 }, (_, i) => (i === 0 ? "running" : "pending")),
  )
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showCode, setShowCode] = useState(true)
  const [runSeed, setRunSeed] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Refs synced for GSAP callbacks without triggering effect restarts
  const isPausedRef = useRef(isPaused)
  const isHoveredRef = useRef(isHovered)
  isPausedRef.current = isPaused
  isHoveredRef.current = isHovered

  // DOM refs animated directly by GSAP (zero frame-by-frame React state)
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const commandRef = useRef<HTMLSpanElement>(null)
  const outputTextRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const assertionRowRef = useRef<HTMLDivElement>(null)
  const checkPathRef = useRef<SVGPathElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const durationRef = useRef<HTMLSpanElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const holdBarRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)
  const ambientGlowRef = useRef<HTMLDivElement>(null)

  const current = commitments[activeIndex]
  const passedCount = statuses.filter((s) => s === "passed").length
  const totalDurationSec = useMemo(
    () => (commitments.reduce((acc, item) => acc + item.durationMs, 0) / 1000).toFixed(2),
    [commitments],
  )

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const selectTest = useCallback((index: number, resetAll = false) => {
    const normalized = ((index % 7) + 7) % 7
    setActiveIndex(normalized)
    setStatuses((prev) => {
      if (resetAll) {
        return Array.from({ length: 7 }, (_, i) => (i === normalized ? "running" : "pending"))
      }
      return prev.map((st, i) => (i === normalized ? "running" : st))
    })
    setRunSeed((s) => s + 1)
  }, [])

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % commitments.length
    selectTest(nextIdx, nextIdx === 0 && passedCount === commitments.length)
  }, [activeIndex, commitments.length, passedCount, selectTest])

  const handlePrev = useCallback(() => {
    selectTest(activeIndex - 1)
  }, [activeIndex, selectTest])

  const handleReplaySuite = useCallback(() => {
    setIsPaused(false)
    selectTest(0, true)
  }, [selectTest])

  const handleTogglePause = useCallback(() => {
    setIsPaused((prev) => !prev)
  }, [])

  const handleJumpToSection = useCallback(() => {
    const el = document.getElementById(current.sectionId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [current.sectionId])

  // Master GSAP choreography for each tool-specific test execution
  useEffect(() => {
    if (!containerRef.current) return

    if (prefersReducedMotion) {
      setPhase("passed")
      setActiveLineIdx(current.codeLines.length)
      setStatuses((prev) => prev.map((st, i) => (i === activeIndex ? "passed" : st)))
      if (commandRef.current) commandRef.current.textContent = current.command
      if (outputTextRef.current) outputTextRef.current.textContent = current.text
      if (durationRef.current) durationRef.current.textContent = `${current.durationMs}ms`
      return
    }

    ensureTerminalGsapPlugins()

    const ctx = gsap.context(() => {
      const cmdEl = commandRef.current
      const textEl = outputTextRef.current
      const cursorEl = cursorRef.current
      const assertionEl = assertionRowRef.current
      const checkPath = checkPathRef.current
      const badgeEl = badgeRef.current
      const durEl = durationRef.current
      const progEl = progressBarRef.current
      const holdEl = holdBarRef.current
      const scanEl = scanlineRef.current
      const glowEl = ambientGlowRef.current
      const codeLineEls = gsap.utils.toArray<HTMLElement>("[data-code-line]")

      // Reset visual states atomically before test boot
      setPhase("running")
      setActiveLineIdx(0)
      setStatuses((prev) => prev.map((st, i) => (i === activeIndex ? "running" : st)))

      if (textEl) textEl.textContent = ""
      if (durEl) durEl.textContent = "0ms"
      if (progEl) gsap.set(progEl, { scaleX: 0, transformOrigin: "left center", opacity: 1 })
      if (holdEl) gsap.set(holdEl, { scaleX: 0, transformOrigin: "left center", opacity: 0 })
      if (assertionEl) gsap.set(assertionEl, { opacity: 0, y: 6 })
      if (scanEl) gsap.set(scanEl, { xPercent: -120, opacity: 0 })
      if (glowEl) gsap.set(glowEl, { opacity: 0.14, scale: 0.92 })

      if (codeLineEls.length > 0) {
        gsap.set(codeLineEls, { opacity: 0.25, x: -6 })
      }

      if (checkPath) {
        const len = checkPath.getTotalLength()
        gsap.set(checkPath, { strokeDasharray: len, strokeDashoffset: len })
      }

      // Independent blinking terminal cursor
      if (cursorEl) {
        gsap.killTweensOf(cursorEl)
        gsap.set(cursorEl, { opacity: 1 })
        gsap.to(cursorEl, {
          opacity: 0,
          duration: 0.45,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
        })
      }

      const timerProxy = { ms: 0 }
      const typingDuration = Math.min(1.4, Math.max(0.95, current.text.length * 0.013))
      const holdDuration = activeIndex === commitments.length - 1 ? 4.4 : 3.6

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      })

      timelineRef.current = tl

      // Phase 1: Real CLI command scramble + telemetry scanline + progress bar + live ms counter
      if (cmdEl) {
        tl.to(
          cmdEl,
          {
            duration: 0.45,
            scrambleText: {
              text: current.command,
              chars: "01_:/-$>*",
              speed: 0.65,
              revealDelay: 0.04,
            },
            ease: "none",
          },
          0,
        )
      }

      if (scanEl) {
        tl.to(
          scanEl,
          {
            xPercent: 220,
            keyframes: [{ opacity: 0.55, duration: 0.25 }, { opacity: 0, duration: 0.8 }],
            duration: 1.05,
            ease: "power1.inOut",
          },
          0.05,
        )
      }

      if (progEl) {
        tl.to(
          progEl,
          {
            scaleX: 1,
            duration: typingDuration + 0.35,
            ease: "power1.inOut",
          },
          0.05,
        )
      }

      if (durEl) {
        tl.to(
          timerProxy,
          {
            ms: current.durationMs,
            duration: typingDuration + 0.35,
            ease: "power2.out",
            snap: { ms: 1 },
            onUpdate: () => {
              if (durEl) durEl.textContent = `${Math.round(timerProxy.ms)}ms`
            },
          },
          0.05,
        )
      }

      // Phase 2: Line-by-line test code execution choreography
      codeLineEls.forEach((lineEl, idx) => {
        const lineStart = 0.22 + idx * 0.32
        tl.call(() => setActiveLineIdx(idx), [], lineStart)
        tl.to(
          lineEl,
          {
            opacity: 1,
            x: 0,
            duration: 0.26,
            ease: "power3.out",
            clearProps: "transform",
          },
          lineStart,
        )
      })

      // Phase 3: 60fps GSAP TextPlugin typing of the commitment statement
      if (textEl) {
        tl.to(
          textEl,
          {
            duration: typingDuration,
            text: {
              value: current.text,
              delimiter: "",
            },
            ease: "none",
          },
          0.2,
        )
      }

      // Phase 4: Assertion line reveal
      if (assertionEl) {
        tl.to(
          assertionEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: "power3.out",
          },
          typingDuration + 0.1,
        )
      }

      // Phase 5: Quality Gate PASS resolution
      tl.addLabel("passed", typingDuration + 0.4)

      tl.call(
        () => {
          setPhase("passed")
          setActiveLineIdx(current.codeLines.length)
          setStatuses((prev) => prev.map((st, i) => (i === activeIndex ? "passed" : st)))
        },
        [],
        "passed",
      )

      if (checkPath) {
        tl.to(
          checkPath,
          {
            strokeDashoffset: 0,
            duration: 0.32,
            ease: "power2.out",
          },
          "passed",
        )
      }

      if (badgeEl) {
        tl.fromTo(
          badgeEl,
          { scale: 0.85 },
          { scale: 1, duration: 0.36, ease: "back.out(2.4)", clearProps: "transform" },
          "passed",
        )
      }

      if (glowEl) {
        tl.to(
          glowEl,
          {
            opacity: 0.36,
            scale: 1.08,
            duration: 0.45,
            ease: "power2.out",
          },
          "passed",
        ).to(
          glowEl,
          {
            opacity: 0.16,
            scale: 1,
            duration: 0.7,
            ease: "sine.inOut",
          },
          "passed+=0.45",
        )
      }

      // Pause cleanly after PASS if hovered or manually paused so the user can inspect code & text
      tl.call(
        () => {
          if (isPausedRef.current || isHoveredRef.current) {
            tl.pause()
          }
        },
        [],
        "passed+=0.38",
      )

      // Phase 6: Auto-advance countdown bar
      if (holdEl) {
        tl.set(holdEl, { opacity: 1 }, "passed+=0.4")
        tl.to(
          holdEl,
          {
            scaleX: 1,
            duration: holdDuration,
            ease: "none",
          },
          "passed+=0.4",
        )
      } else {
        tl.to({}, { duration: holdDuration }, "passed+=0.4")
      }

      // Advance to the next spec in the 7-test suite
      tl.call(() => {
        const nextIdx = (activeIndex + 1) % commitments.length
        setActiveIndex(nextIdx)
        setStatuses((prev) => {
          if (nextIdx === 0) {
            return Array.from({ length: 7 }, (_, i) => (i === 0 ? "running" : "pending"))
          }
          return prev.map((st, i) => (i === nextIdx ? "running" : st))
        })
      })
    }, containerRef)

    return () => {
      timelineRef.current = null
      ctx.revert()
    }
  }, [activeIndex, current, commitments.length, prefersReducedMotion, runSeed, showCode])

  // Sync Pause / Hover state with the live GSAP timeline
  useEffect(() => {
    const tl = timelineRef.current
    if (!tl || prefersReducedMotion) return

    const passedTime = tl.labels?.passed ?? 0
    if (isPaused || isHovered) {
      if (tl.time() >= passedTime + 0.38) {
        tl.pause()
      }
    } else if (tl.paused()) {
      tl.play()
    }
  }, [isPaused, isHovered, prefersReducedMotion])

  const allPassed = passedCount === commitments.length

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full rounded-xl bg-slate-900/95 dark:bg-slate-950/85 border border-slate-700/70 dark:border-white/[0.1] p-3 sm:p-4 backdrop-blur-xl shadow-lg relative overflow-hidden group"
    >
      {/* Ambient GSAP-driven glows */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />
      <div
        ref={ambientGlowRef}
        className="absolute -bottom-14 -left-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none opacity-15"
      />

      {/* Telemetry scanline sweep */}
      <div
        ref={scanlineRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky-400/12 to-transparent opacity-0 will-change-transform"
      />

      {/* Top execution progress hairline */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-slate-800/80 overflow-hidden">
        <div
          ref={progressBarRef}
          className={`h-full w-full origin-left will-change-transform transition-colors duration-300 ${
            phase === "passed"
              ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300"
              : "bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-300"
          }`}
          style={{ transform: prefersReducedMotion ? "scaleX(1)" : "scaleX(0)" }}
        />
      </div>

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-700/50 dark:border-white/[0.08] text-[11px] font-mono text-slate-400 relative z-10">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="flex space-x-1.5 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="hidden sm:inline text-slate-400 pl-1 truncate">
            qa-engine :: <span className="text-slate-200">{current.specFile}</span>
          </span>
          <span className="sm:hidden text-slate-300 pl-0.5 truncate text-[10px]">
            {current.specFile}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
          {/* Dynamic RUN / PASS status badge */}
          <span
            ref={badgeRef}
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border transition-colors duration-200 ${
              phase === "passed"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/35"
                : "bg-amber-500/15 text-amber-300 border-amber-500/35"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                phase === "passed" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
              }`}
            />
            {phase === "passed" ? "PASS" : "RUN"}
          </span>

          {/* Live ms counter */}
          <span
            ref={durationRef}
            className="text-[10px] text-slate-400 tabular-nums min-w-[36px] text-right"
          >
            {prefersReducedMotion ? `${current.durationMs}ms` : "0ms"}
          </span>

          {/* Controls: Code toggle / Prev / Pause / Next / Replay */}
          <div className="flex items-center border-l border-slate-700/60 pl-1.5 space-x-0.5">
            <button
              type="button"
              onClick={() => setShowCode((v) => !v)}
              title={
                showCode
                  ? language === "fr"
                    ? "Masquer le code de test"
                    : "Hide test code"
                  : language === "fr"
                    ? "Afficher le code de test"
                    : "Show test code"
              }
              aria-label={
                showCode
                  ? language === "fr"
                    ? "Masquer le code de test"
                    : "Hide test code"
                  : language === "fr"
                    ? "Afficher le code de test"
                    : "Show test code"
              }
              className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                showCode ? "text-sky-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Code2 className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handlePrev}
              title={language === "fr" ? "Test précédent" : "Previous test"}
              aria-label={language === "fr" ? "Test précédent" : "Previous test"}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handleTogglePause}
              title={
                isPaused
                  ? language === "fr"
                    ? "Reprendre la suite"
                    : "Resume suite"
                  : language === "fr"
                    ? "Mettre en pause"
                    : "Pause suite"
              }
              aria-label={
                isPaused
                  ? language === "fr"
                    ? "Reprendre la suite"
                    : "Resume suite"
                  : language === "fr"
                    ? "Mettre en pause"
                    : "Pause suite"
              }
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              {isPaused ? <Play className="w-3 h-3 text-sky-400" /> : <Pause className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={handleNext}
              title={language === "fr" ? "Test suivant" : "Next test"}
              aria-label={language === "fr" ? "Test suivant" : "Next test"}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handleReplaySuite}
              title={language === "fr" ? "Relancer les 7 tests" : "Replay all 7 tests"}
              aria-label={language === "fr" ? "Relancer les 7 tests" : "Replay all 7 tests"}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Execution Body */}
      <div className="space-y-2 font-mono text-left relative z-10">
        {/* CLI Command & Tool Badge Row */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-sky-400 min-w-0">
            <Terminal className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-500">$</span>
            <span ref={commandRef} className="text-slate-200 font-semibold truncate">
              {current.command}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="inline-flex items-center gap-1 text-[10px] text-slate-200 font-medium px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700/70">
              <TechIcon name={current.tool} className="w-3 h-3" size={12} />
              <span className="hidden xs:inline">{current.tool}</span>
            </span>
            <button
              type="button"
              onClick={handleJumpToSection}
              title={
                language === "fr"
                  ? `Aller à la section : ${current.label}`
                  : `Jump to section: ${current.label}`
              }
              className="inline-flex items-center gap-0.5 text-[10px] text-slate-400 hover:text-sky-400 transition-colors"
            >
              <span>#{current.sectionId}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Live Tool-Specific Test Code Block (GSAP line-by-line execution) */}
        {showCode && (
          <div className="rounded-lg bg-slate-950/90 border border-slate-800/90 px-2.5 py-2 text-[11px] leading-[1.45] overflow-x-auto">
            <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-500 pb-1 mb-1 border-b border-slate-800/80">
              <span className="truncate">{current.label}</span>
              <span className="text-sky-400/80 font-semibold">{current.langTag}</span>
            </div>
            <div className="space-y-0.5">
              {current.codeLines.map((tokens, lineIdx) => {
                const isLineDone = phase === "passed" || lineIdx < activeLineIdx
                const isLineRunning = phase === "running" && lineIdx === activeLineIdx
                return (
                  <div
                    key={`${current.id}-line-${lineIdx}`}
                    data-code-line
                    className={`flex items-center gap-2 rounded px-1 py-0.5 transition-colors duration-200 ${
                      isLineRunning
                        ? "bg-sky-500/12 border-l-2 border-sky-400"
                        : "border-l-2 border-transparent"
                    }`}
                  >
                    <span className="w-3.5 text-[9px] text-slate-600 select-none text-right flex-shrink-0 tabular-nums">
                      {lineIdx + 1}
                    </span>
                    <span
                      className={`w-2.5 text-[9px] select-none flex-shrink-0 ${
                        isLineDone
                          ? "text-emerald-400"
                          : isLineRunning
                            ? "text-sky-400"
                            : "text-slate-700"
                      }`}
                      aria-hidden="true"
                    >
                      {isLineDone ? "✓" : isLineRunning ? "▸" : "·"}
                    </span>
                    <code className="whitespace-pre font-mono">
                      {tokens.map((tok, tIdx) => (
                        <span key={tIdx} className={TOKEN_CLASSES[tok.type]}>
                          {tok.text}
                        </span>
                      ))}
                    </code>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Typed Commitment Output */}
        <div className="pl-1 text-xs sm:text-[13px] text-slate-200 font-sans leading-relaxed min-h-[38px] flex items-center">
          <p className="relative w-full m-0">
            <span className="sr-only" aria-live="polite">
              {`${current.tool} — ${current.label}: ${current.text}`}
            </span>
            <span ref={outputTextRef} aria-hidden="true" className="text-slate-100 font-medium">
              {prefersReducedMotion ? current.text : ""}
            </span>
            {!prefersReducedMotion && (
              <span
                ref={cursorRef}
                aria-hidden="true"
                className="inline-block font-mono text-sky-400 ml-1 text-xs select-none"
              >
                ▋
              </span>
            )}
          </p>
        </div>

        {/* Live QA Assertion Line with GSAP SVG Checkmark Draw */}
        <div
          ref={assertionRowRef}
          className="pl-1 flex items-center gap-2 text-[11px] font-mono text-slate-400"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            className="flex-shrink-0 text-emerald-400"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="1.25"
            />
            <path
              ref={checkPathRef}
              d="M4.8 8.3L7.0 10.5L11.4 5.8"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="truncate text-emerald-300/90">{current.assertion}</span>
        </div>
      </div>

      {/* 7-Tool Interactive Matrix Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-700/50 dark:border-white/[0.07] flex items-center justify-between gap-2 relative z-10">
        {/* 7 interactive tool test pills */}
        <div
          className="flex items-center gap-1.5 flex-1"
          role="tablist"
          aria-label={language === "fr" ? "Suite de 7 tests multi-outils QA" : "7 multi-tool QA test suite"}
        >
          {commitments.map((spec, idx) => {
            const st = statuses[idx]
            const isActive = idx === activeIndex
            return (
              <button
                key={spec.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectTest(idx)}
                title={`${spec.id} • ${spec.tool} — ${spec.label} (${spec.specFile})`}
                className={`group/pill relative flex items-center justify-center rounded-md px-1.5 py-1 transition-all duration-200 border focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                  isActive
                    ? st === "passed"
                      ? "bg-emerald-500/20 border-emerald-400/60 shadow-[0_0_10px_rgba(52,211,153,0.3)] scale-105"
                      : "bg-sky-500/20 border-sky-400/60 shadow-[0_0_10px_rgba(56,189,248,0.3)] scale-105"
                    : st === "passed"
                      ? "bg-emerald-500/10 border-emerald-500/25 opacity-90 hover:opacity-100"
                      : "bg-slate-800/70 border-slate-700/60 opacity-60 hover:opacity-100"
                }`}
              >
                <TechIcon name={spec.tool} className="w-3 h-3" size={12} />
                <span className="sr-only">
                  {`${spec.id} ${spec.tool} ${spec.label} - ${st}`}
                </span>
              </button>
            )
          })}
        </div>

        {/* Suite telemetry summary */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 flex-shrink-0">
          {allPassed ? (
            <span className="text-emerald-400 font-semibold">
              {language === "fr"
                ? `7/7 validés • ${totalDurationSec}s`
                : `7/7 passed • ${totalDurationSec}s`}
            </span>
          ) : (
            <span className="tabular-nums">
              <span className="text-emerald-400 font-semibold">{passedCount}</span>
              <span className="text-slate-500">/{commitments.length}</span>
              <span className="hidden sm:inline text-slate-500 ml-1">
                {language === "fr" ? "validés" : "passed"}
              </span>
            </span>
          )}
          {isHovered && !isPaused && phase === "passed" && (
            <span className="hidden md:inline text-[9px] uppercase tracking-wider text-sky-400/80">
              {language === "fr" ? "pause" : "paused"}
            </span>
          )}
        </div>
      </div>

      {/* Bottom auto-advance countdown hairline */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-transparent overflow-hidden pointer-events-none">
        <div
          ref={holdBarRef}
          className="h-full w-full bg-sky-400/45 origin-left will-change-transform opacity-0"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  )
}
