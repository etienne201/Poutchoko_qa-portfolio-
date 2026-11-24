"use client"
import { useCallback, useRef } from "react"
import { useLanguage } from "@/hooks/use-language"
import { useGsapScroll } from "@/hooks/use-gsap-scroll"
import { TypewriterText } from "@/components/ui/typewriter-text"
import {
  Briefcase,
  Calendar,
  MapPin,
  Target,
  Zap,
  CheckCircle2,
  Building2,
} from "lucide-react"
import { TechBadge } from "@/components/tech-icon"

export function ExperienceSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const setupTimeline = useCallback((gsapInstance: typeof import("gsap").default) => {
    const progressPath = sectionRef.current?.querySelector<SVGPathElement>("[data-timeline-progress]")
    const traveler = sectionRef.current?.querySelector<SVGGElement>("[data-timeline-traveler]")

    if (progressPath) {
      const length = progressPath.getTotalLength()
      gsapInstance.set(progressPath, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      const scrubTl = gsapInstance.timeline({
        scrollTrigger: {
          trigger: "[data-timeline-container]",
          start: "top 72%",
          end: "bottom 75%",
          scrub: 0.6,
        },
      })

      scrubTl.to(
        progressPath,
        {
          strokeDashoffset: 0,
          ease: "none",
          duration: 1,
        },
        0,
      )

      if (traveler) {
        scrubTl.to(
          traveler,
          {
            motionPath: {
              path: progressPath,
              align: progressPath,
              alignOrigin: [0.5, 0.5],
            },
            ease: "none",
            duration: 1,
          },
          0,
        )
      }
    }

    gsapInstance.from("[data-timeline-card]", {
      opacity: 0,
      y: 24,
      duration: 0.55,
      stagger: 0.12,
      ease: "power3.out",
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: "[data-timeline-container]",
        start: "top 80%",
        once: true,
      },
    })
  }, [])

  useGsapScroll(sectionRef, setupTimeline)

  const experiences = [
    {
      id: "job1",
      role: t("exp.job1.role"),
      company: t("exp.job1.company"),
      period: t("exp.job1.period"),
      location: t("exp.job1.location"),
      sector: t("exp.job1.sector"),
      context: t("exp.job1.context"),
      challenge: t("exp.job1.challenge"),
      action: t("exp.job1.action"),
      result: t("exp.job1.result"),
      metric: t("exp.job1.metric"),
      metricLabel: t("exp.job1.metricLabel"),
      technologies: ["Cypress", "Postman", "Gatling", "GitLab CI/CD", "Xray (JIRA)", "ClickUp", "Agile/Scrum"],
      current: true,
    },
    {
      id: "job2",
      role: t("exp.job2.role"),
      company: t("exp.job2.company"),
      period: t("exp.job2.period"),
      location: t("exp.job2.location"),
      sector: t("exp.job2.sector"),
      context: t("exp.job2.context"),
      challenge: t("exp.job2.challenge"),
      action: t("exp.job2.action"),
      result: t("exp.job2.result"),
      metric: t("exp.job2.metric"),
      metricLabel: t("exp.job2.metricLabel"),
      technologies: ["Cypress", "Playwright", "Robot Framework", "SonarQube", "JIRA / Xray", "GitLab CI"],
      current: false,
    },
    {
      id: "job3",
      role: t("exp.job3.role"),
      company: t("exp.job3.company"),
      period: t("exp.job3.period"),
      location: t("exp.job3.location"),
      sector: t("exp.job3.sector"),
      context: t("exp.job3.context"),
      challenge: t("exp.job3.challenge"),
      action: t("exp.job3.action"),
      result: t("exp.job3.result"),
      metric: t("exp.job3.metric"),
      metricLabel: t("exp.job3.metricLabel"),
      technologies: ["Cypress", "Postman", "Jenkins CI", "Docker", "Git", "Mobile Money", "Visa / PayPal"],
      current: false,
    },
    {
      id: "job4",
      role: t("exp.job4.role"),
      company: t("exp.job4.company"),
      period: t("exp.job4.period"),
      location: t("exp.job4.location"),
      sector: t("exp.job4.sector"),
      context: t("exp.job4.context"),
      challenge: t("exp.job4.challenge"),
      action: t("exp.job4.action"),
      result: t("exp.job4.result"),
      metric: t("exp.job4.metric"),
      metricLabel: t("exp.job4.metricLabel"),
      technologies: ["Manual Testing", "Test Cases", "JIRA", "Scrum Ceremonies", "Bug Lifecycle"],
      current: false,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="scroll-mt-24 py-20 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider shadow-sm dark:shadow-subtle">
            <Briefcase className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{t("exp.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("exp.title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed min-h-[2.5rem]">
            <TypewriterText
              key={`exp-sub-${language}`}
              text={t("exp.subtitle")}
              triggerOnView={true}
              speed={20}
              delay={150}
              cursorChar="|"
              cursorClassName="text-primary"
              hideCursorOnComplete={true}
            />
          </p>
        </div>

        {/* Timeline List avec trajectoire SVG animée au scroll (GSAP ScrollTrigger) */}
        <div data-timeline-container className="space-y-6 sm:space-y-8 relative lg:pl-10">
          {/* Ligne & trajectoire SVG verticale sur Desktop */}
          <svg
            aria-hidden="true"
            viewBox="0 0 20 1000"
            preserveAspectRatio="none"
            className="hidden lg:block pointer-events-none absolute left-2 top-6 bottom-6 w-5 h-[calc(100%-48px)] overflow-visible"
          >
            <defs>
              <linearGradient id="exp-timeline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <path
              d="M 10 0 L 10 1000"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-200 dark:text-white/10"
            />
            <path
              data-timeline-progress
              d="M 10 0 L 10 1000"
              fill="none"
              stroke="url(#exp-timeline-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Signal lumineux guidé par MotionPathPlugin le long de la frise SVG */}
            <g data-timeline-traveler>
              <circle cx="10" cy="0" r="6" fill="#38bdf8" opacity="0.28" />
              <circle cx="10" cy="0" r="3" fill="#38bdf8" />
            </g>
          </svg>

          {experiences.map((exp) => (
            <div
              key={exp.id}
              data-timeline-card
              className="relative rounded-2xl p-5 sm:p-7 lg:p-8 glass-panel border border-slate-200/80 dark:border-white/[0.07] hover:border-primary/40 dark:hover:border-white/[0.18] shadow-card transition-all duration-300 text-left"
            >
              {/* Marqueur de jalon sur la trajectoire SVG */}
              <span
                aria-hidden="true"
                className={`hidden lg:flex absolute -left-[34px] top-9 h-3.5 w-3.5 rounded-full ring-4 ring-background ${
                  exp.current
                    ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                    : "bg-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                }`}
              />
              {/* Header: Role, Company, Period, Location, Sector */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-slate-200/80 dark:border-white/[0.07]">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 whitespace-nowrap">
                        {t("exp.currentRole")}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-primary flex items-center">
                      <Building2 className="w-4 h-4 mr-1.5 text-primary flex-shrink-0" />
                      {exp.company}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">•</span>
                    <span className="flex items-center text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4 mr-1.5 text-slate-400 flex-shrink-0" />
                      {exp.period}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">•</span>
                    <span className="flex items-center text-slate-500 dark:text-slate-400">
                      <MapPin className="w-4 h-4 mr-1.5 text-slate-400 flex-shrink-0" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Key Metric Badge */}
                <div className="flex-shrink-0 flex items-center space-x-3 self-start lg:self-center px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl inner-card">
                  <div className="text-xl sm:text-2xl font-extrabold text-primary">
                    {exp.metric}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 max-w-[140px] leading-tight">
                    {exp.metricLabel}
                  </div>
                </div>
              </div>

              {/* Context Summary */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-normal my-4 sm:my-5 leading-relaxed">
                {exp.context}
              </p>

              {/* Challenge -> Action -> Result Structured Cards */}
              <div className="grid md:grid-cols-3 gap-3.5 sm:gap-4 mb-5 sm:mb-6">
                <div className="p-3.5 sm:p-4 rounded-xl inner-card space-y-1.5">
                  <div className="flex items-center space-x-2 text-amber-500 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t("exp.challengeLabel")}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.challenge}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl inner-card space-y-1.5">
                  <div className="flex items-center space-x-2 text-sky-500 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t("exp.actionLabel")}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.action}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl inner-card space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-500 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t("exp.resultLabel")}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.result}
                  </p>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-3.5 sm:pt-4 border-t border-slate-200/80 dark:border-white/[0.06]">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2">
                  {t("exp.stackLabel")}
                </span>
                {exp.technologies.map((tech, tIdx) => (
                  <TechBadge key={tIdx} name={tech} size="sm" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
