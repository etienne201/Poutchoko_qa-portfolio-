"use client"

import React, { useCallback, useRef } from "react"
import { useLanguage } from "@/hooks/use-language"
import { useGsapScroll } from "@/hooks/use-gsap-scroll"
import { TypewriterText } from "@/components/ui/typewriter-text"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import {
  User,
  Workflow,
  Layers,
  Award,
  Sparkles,
  ShieldCheck,
  Globe2,
} from "lucide-react"

interface PillarMetric {
  prefix: string
  value: number
  suffix: string
  label: string
  barWidth: number
  colorClass: string
  barClass: string
}

export function AboutSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const setupAbout = useCallback(
    (
      gsapInstance: typeof import("gsap").default,
      ScrollTriggerInstance: typeof import("gsap/ScrollTrigger").ScrollTrigger,
    ) => {
      const root = sectionRef.current
      if (!root) return

      // 1. Header entrance choreography
      const headerTl = gsapInstance.timeline({
        scrollTrigger: {
          trigger: "[data-about-header]",
          start: "top 86%",
          once: true,
        },
      })

      headerTl
        .from("[data-about-eyebrow]", {
          opacity: 0,
          y: 14,
          duration: 0.45,
          ease: "power3.out",
          clearProps: "transform,opacity",
        })
        .from(
          "[data-about-title]",
          {
            opacity: 0,
            y: 20,
            duration: 0.55,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.28",
        )
        .from(
          "[data-about-divider]",
          {
            scaleX: 0,
            transformOrigin: "center center",
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform",
          },
          "-=0.35",
        )

      // 2. Scrubbed SVG Quality Circuit connecting the 4 pillars
      const circuitPath = root.querySelector<SVGPathElement>("[data-about-circuit-path]")
      const circuitPulse = root.querySelector<SVGGElement>("[data-about-circuit-pulse]")

      if (circuitPath) {
        const length = circuitPath.getTotalLength()
        gsapInstance.set(circuitPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsapInstance.to(circuitPath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-about-grid]",
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.7,
          },
        })

        if (circuitPulse) {
          gsapInstance.to(circuitPulse, {
            motionPath: {
              path: circuitPath,
              align: circuitPath,
              alignOrigin: [0.5, 0.5],
            },
            duration: 6.5,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 0.6,
          })
        }
      }

      // 3. 4 Storytelling Pillars staggered entrance + top accent hairlines + inner micro-widgets
      const gridTl = gsapInstance.timeline({
        scrollTrigger: {
          trigger: "[data-about-grid]",
          start: "top 82%",
          once: true,
        },
      })

      gridTl
        .from("[data-about-card]", {
          opacity: 0,
          y: 28,
          scale: 0.97,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
        })
        .from(
          "[data-about-card-bar]",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "transform",
          },
          0.18,
        )
        .from(
          "[data-shift-stage]",
          {
            opacity: 0,
            y: 8,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          0.35,
        )
        .from(
          "[data-env-chip]",
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.32,
            stagger: 0.06,
            ease: "back.out(1.8)",
            clearProps: "transform,opacity",
          },
          0.42,
        )

      // 4. Real GSAP numeric counters & KPI bars (Pillar 01 & Pillar 04)
      const counterEls = gsapInstance.utils.toArray<HTMLElement>("[data-about-counter]")
      counterEls.forEach((el) => {
        const target = Number(el.dataset.target || "0")
        const prefix = el.dataset.prefix || ""
        const suffix = el.dataset.suffix || ""
        const proxy = { val: 0 }

        gsapInstance.to(proxy, {
          val: target,
          duration: 1.25,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(proxy.val)}${suffix}`
          },
        })
      })

      const kpiBars = gsapInstance.utils.toArray<HTMLElement>("[data-kpi-bar]")
      kpiBars.forEach((bar) => {
        gsapInstance.from(bar, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.95,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: bar,
            start: "top 88%",
            once: true,
          },
        })
      })

      // 5. "Why Work With Me" Highlight Box + SVG Checkmark Draw-In Choreography
      const highlightTl = gsapInstance.timeline({
        scrollTrigger: {
          trigger: "[data-about-highlight]",
          start: "top 84%",
          once: true,
        },
      })

      const checkPaths = gsapInstance.utils.toArray<SVGPathElement>("[data-benefit-check]")
      checkPaths.forEach((path) => {
        const len = path.getTotalLength()
        gsapInstance.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
        })
      })

      highlightTl
        .from("[data-about-highlight]", {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "transform,opacity",
        })
        .from(
          "[data-about-shield]",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.45,
            ease: "back.out(2.2)",
            clearProps: "transform,opacity",
          },
          0.18,
        )
        .from(
          "[data-benefit-item]",
          {
            opacity: 0,
            x: 24,
            duration: 0.48,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.22,
        )
        .to(
          checkPaths,
          {
            strokeDashoffset: 0,
            duration: 0.42,
            stagger: 0.14,
            ease: "power2.out",
          },
          0.42,
        )

      // 6. Tactile 3D Micro-Tilt on pillar cards (desktop fine pointers only)
      const isFinePointer = window.matchMedia("(pointer: fine)").matches
      const cleanupHandlers: Array<() => void> = []

      if (isFinePointer) {
        const cards = gsapInstance.utils.toArray<HTMLElement>("[data-about-card]")
        cards.forEach((card) => {
          const rxTo = gsapInstance.quickTo(card, "rotationX", {
            duration: 0.35,
            ease: "power3.out",
          })
          const ryTo = gsapInstance.quickTo(card, "rotationY", {
            duration: 0.35,
            ease: "power3.out",
          })
          const yTo = gsapInstance.quickTo(card, "y", {
            duration: 0.35,
            ease: "power3.out",
          })

          const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect()
            const relX = (e.clientX - rect.left) / rect.width - 0.5
            const relY = (e.clientY - rect.top) / rect.height - 0.5
            rxTo(-relY * 5)
            ryTo(relX * 5)
            yTo(-3)
          }

          const onLeave = () => {
            rxTo(0)
            ryTo(0)
            yTo(0)
          }

          gsapInstance.set(card, { transformPerspective: 900 })
          card.addEventListener("mousemove", onMove)
          card.addEventListener("mouseleave", onLeave)
          cleanupHandlers.push(() => {
            card.removeEventListener("mousemove", onMove)
            card.removeEventListener("mouseleave", onLeave)
          })
        })
      }

      ScrollTriggerInstance.refresh()

      return () => {
        cleanupHandlers.forEach((fn) => fn())
      }
    },
    [],
  )

  useGsapScroll(sectionRef, setupAbout)

  const shiftLeftStages = ["Specs", "UI & API", "Perf", "CI/CD"]

  const ecosystems =
    language === "fr"
      ? ["RegTech CEMAC", "FinTech & Paiements", "Assurance", "SaaS Européen"]
      : ["CEMAC RegTech", "FinTech & Payments", "Insurance", "European SaaS"]

  const impactMetrics: PillarMetric[] = [
    {
      prefix: "-",
      value: 40,
      suffix: "%",
      label: language === "fr" ? "Régression" : "Regression",
      barWidth: 78,
      colorClass: "text-emerald-600 dark:text-emerald-400",
      barClass: "bg-emerald-500",
    },
    {
      prefix: "-",
      value: 35,
      suffix: "%",
      label: language === "fr" ? "Bugs prod" : "Prod bugs",
      barWidth: 70,
      colorClass: "text-sky-600 dark:text-sky-400",
      barClass: "bg-sky-500",
    },
    {
      prefix: "+",
      value: 60,
      suffix: "%",
      label: language === "fr" ? "Couverture" : "Coverage",
      barWidth: 90,
      colorClass: "text-indigo-600 dark:text-indigo-400",
      barClass: "bg-indigo-500",
    },
  ]

  const pillars = [
    {
      step: "01",
      tag: language === "fr" ? "IDENTITÉ" : "IDENTITY",
      icon: User,
      title: t("about.q1.title"),
      text: t("about.q1.text"),
      iconColor: "text-primary",
      accentBorder: "hover:border-primary/50",
      barGradient: "from-sky-500 to-cyan-400",
      widget: (
        <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Globe2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>Douala</span>
            <span className="text-primary">↔</span>
            <span>{language === "fr" ? "Europe & International" : "Europe & Global"}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary font-semibold text-[11px]">
            <span
              data-about-counter
              data-target="6"
              data-prefix=""
              data-suffix="+ yrs"
              className="tabular-nums"
            >
              6+ yrs
            </span>
          </span>
        </div>
      ),
    },
    {
      step: "02",
      tag: "SHIFT-LEFT",
      icon: Workflow,
      title: t("about.q2.title"),
      text: t("about.q2.text"),
      iconColor: "text-sky-500",
      accentBorder: "hover:border-sky-500/50",
      barGradient: "from-sky-500 to-blue-500",
      widget: (
        <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-white/[0.07]">
          <div className="grid grid-cols-4 gap-1.5">
            {shiftLeftStages.map((stage, i) => (
              <div
                key={stage}
                data-shift-stage
                className="flex flex-col items-center justify-center rounded-lg px-1.5 py-1.5 bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.07] text-[10px] font-mono"
              >
                <span className="text-[9px] text-sky-600 dark:text-sky-400 font-bold">
                  0{i + 1}
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium truncate max-w-full">
                  {stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      step: "03",
      tag: language === "fr" ? "ÉCOSYSTÈMES" : "ECOSYSTEMS",
      icon: Layers,
      title: t("about.q3.title"),
      text: t("about.q3.text"),
      iconColor: "text-indigo-500 dark:text-indigo-400",
      accentBorder: "hover:border-indigo-500/50",
      barGradient: "from-indigo-500 to-violet-400",
      widget: (
        <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-white/[0.07] flex flex-wrap gap-1.5">
          {ecosystems.map((env) => (
            <span
              key={env}
              data-env-chip
              className="chip-subtle inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>{env}</span>
            </span>
          ))}
        </div>
      ),
    },
    {
      step: "04",
      tag: "IMPACT ROI",
      icon: Award,
      title: t("about.q4.title"),
      text: t("about.q4.text"),
      iconColor: "text-emerald-500 dark:text-emerald-400",
      accentBorder: "hover:border-emerald-500/50",
      barGradient: "from-emerald-500 to-teal-400",
      widget: (
        <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-white/[0.07] grid grid-cols-3 gap-2.5">
          {impactMetrics.map((m) => (
            <div key={m.label} className="space-y-1 text-left">
              <div className={`text-sm sm:text-base font-extrabold font-mono tabular-nums ${m.colorClass}`}>
                <span
                  data-about-counter
                  data-target={m.value}
                  data-prefix={m.prefix}
                  data-suffix={m.suffix}
                >
                  {m.prefix}
                  {m.value}
                  {m.suffix}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200/80 dark:bg-white/[0.08] overflow-hidden">
                <div
                  data-kpi-bar
                  className={`h-full rounded-full ${m.barClass}`}
                  style={{ width: `${m.barWidth}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const benefits = [
    {
      code: "QA-01",
      title: t("about.benefit1.title"),
      desc: t("about.benefit1.desc"),
    },
    {
      code: "QA-02",
      title: t("about.benefit2.title"),
      desc: t("about.benefit2.desc"),
    },
    {
      code: "QA-03",
      title: t("about.benefit3.title"),
      desc: t("about.benefit3.desc"),
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-24 py-20 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div data-about-header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div
            data-about-eyebrow
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider shadow-sm dark:shadow-subtle"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{t("about.badge")}</span>
          </div>
          <h2
            data-about-title
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            {t("about.title")}
          </h2>
          <div
            data-about-divider
            aria-hidden="true"
            className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed min-h-[2.5rem]">
            <TypewriterText
              key={`about-sub-${language}`}
              text={t("about.subtitle")}
              triggerOnView={true}
              speed={20}
              delay={150}
              cursorChar="|"
              cursorClassName="text-primary"
              hideCursorOnComplete={true}
            />
          </p>
        </div>

        {/* 4 Storytelling Pillars Grid with Scrubbed SVG Quality Circuit */}
        <div data-about-grid className="relative mb-10 sm:mb-12">
          {/* Desktop SVG Quality Backbone */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
            className="hidden md:block pointer-events-none absolute inset-0 w-full h-full z-0"
          >
            <defs>
              <linearGradient id="about-circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.45" />
              </linearGradient>
            </defs>
            <path
              d="M 250 120 L 750 120 Q 790 120 790 160 L 790 220 Q 790 260 750 260 L 250 260 Q 210 260 210 300 L 210 360 Q 210 400 250 400 L 750 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-slate-300/40 dark:text-white/[0.05]"
            />
            <path
              data-about-circuit-path
              d="M 250 120 L 750 120 Q 790 120 790 160 L 790 220 Q 790 260 750 260 L 250 260 Q 210 260 210 300 L 210 360 Q 210 400 250 400 L 750 400"
              fill="none"
              stroke="url(#about-circuit-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <g data-about-circuit-pulse>
              <circle r="7" fill="#38bdf8" fillOpacity="0.22" />
              <circle r="3.5" fill="#38bdf8" />
            </g>
          </svg>

          <div className="relative z-10 grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div key={pillar.step} data-about-card className="h-full will-change-transform">
                  <SpotlightCard
                    className={`h-full relative rounded-2xl p-5 sm:p-7 lg:p-8 glass-panel border border-slate-200/80 dark:border-white/[0.07] ${pillar.accentBorder} shadow-card transition-colors duration-300 text-left group overflow-hidden flex flex-col justify-between`}
                  >
                    {/* Top animated accent hairline */}
                    <div
                      data-about-card-bar
                      aria-hidden="true"
                      className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${pillar.barGradient} opacity-80`}
                    />

                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-4">
                        <div className="flex items-center space-x-3.5 min-w-0">
                          <div
                            className={`p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] ${pillar.iconColor} group-hover:scale-110 transition-transform flex-shrink-0`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {pillar.title}
                          </h3>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0">
                          <span className={pillar.iconColor}>{pillar.step}</span>
                          <span className="hidden sm:inline">/ {pillar.tag}</span>
                        </span>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        {pillar.text}
                      </p>
                    </div>

                    {pillar.widget}
                  </SpotlightCard>
                </div>
              )
            })}
          </div>
        </div>

        {/* Why Work With Me Highlight Box */}
        <div data-about-highlight>
          <SpotlightCard className="rounded-2xl p-5 sm:p-8 lg:p-10 glass-panel-elevated shadow-card relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-7 xl:col-span-8 space-y-3 sm:space-y-4 text-left">
                <div
                  data-about-shield
                  className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider"
                >
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>{t("about.differentiator")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {t("about.q5.title")}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t("about.q5.text")}
                </p>

                {/* Live Quality Commitment Telemetry Strip */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{language === "fr" ? "Culture Résultat" : "Outcome Driven"}</span>
                  </span>
                  <span className="chip-subtle px-2.5 py-1 rounded-lg">
                    Agile / Scrum
                  </span>
                  <span className="chip-subtle px-2.5 py-1 rounded-lg">
                    {language === "fr" ? "Fuseaux Europe & Global" : "EU & Global Time Zones"}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 xl:col-span-4 space-y-2.5 sm:space-y-3">
                {benefits.map((b) => (
                  <div
                    key={b.code}
                    data-benefit-item
                    className="p-3.5 sm:p-4 rounded-xl inner-card flex items-start space-x-3 text-left transition-colors duration-200 hover:border-emerald-500/40"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeOpacity="0.28"
                        strokeWidth="1.75"
                      />
                      <path
                        data-benefit-check
                        d="M8 12.5L10.8 15.2L16.5 9.2"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          {b.code}
                        </span>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                          {b.title}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 pt-0.5 leading-relaxed">
                        {b.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
