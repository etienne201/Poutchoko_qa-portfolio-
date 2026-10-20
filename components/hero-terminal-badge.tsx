"use client"

import React, { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { TypewriterText } from "@/components/ui/typewriter-text"
import { Terminal, ChevronRight } from "lucide-react"

export function HeroTerminalBadge() {
  const { t, language } = useLanguage()

  // 7 Core QA Commitments directly specified by the user, localized
  const commitments = [
    {
      label: language === "fr" ? "Philosophie QA" : "QA Philosophy",
      command: "test:philosophy",
      text: t("about.subtitle"),
    },
    {
      label: language === "fr" ? "Maturité Cycle de Vie" : "E2E Lifecycle",
      command: "test:methodology",
      text: t("expertise.subtitle"),
    },
    {
      label: language === "fr" ? "Track Record Éprouvé" : "Proven Track Record",
      command: "test:track-record",
      text: t("exp.subtitle"),
    },
    {
      label: language === "fr" ? "Stack Moderne" : "Modern Stack",
      command: "test:tooling-stack",
      text: t("skills.subtitle"),
    },
    {
      label: language === "fr" ? "Cas Concrets & ROI" : "Case Studies ROI",
      command: "test:implementations",
      text: t("projects.subtitle"),
    },
    {
      label: language === "fr" ? "Excellence d'Ingénierie" : "Engineering Standards",
      command: "test:foundations",
      text: t("edu.subtitle"),
    },
    {
      label: language === "fr" ? "Engagement Partenaire" : "Partnership Ready",
      command: "contact:discuss-project",
      text: t("contact.subtitle"),
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const current = commitments[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % commitments.length)
  }

  return (
    <div className="w-full rounded-xl bg-slate-900/90 dark:bg-slate-950/80 border border-slate-700/60 dark:border-white/[0.1] p-3 sm:p-4 backdrop-blur-xl shadow-lg relative overflow-hidden group">
      {/* Subtle glowing ambient gradient */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-700/50 dark:border-white/[0.08] text-[11px] font-mono text-slate-400">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="hidden sm:inline text-slate-400 pl-1">qa-engine :: quality-commitments.spec.ts</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            PASS
          </span>
          <span className="text-slate-500 text-[10px]">
            {currentIndex + 1} / {commitments.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            title={language === "fr" ? "Afficher le point suivant" : "Next statement"}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-0.5 text-[10px]"
          >
            <span>Next</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Typing Body */}
      <div className="space-y-1.5 font-mono text-left">
        <div className="flex items-center space-x-2 text-xs text-sky-400">
          <Terminal className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-slate-500">$</span>
          <span className="text-slate-300 font-semibold">{current.command}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-800/80">
            {current.label}
          </span>
        </div>

        <div className="pl-5 text-xs sm:text-sm text-slate-200 dark:text-slate-200 font-sans leading-relaxed min-h-[44px] flex items-center">
          <div className="relative w-full">
            <TypewriterText
              key={`${current.command}-${language}`}
              text={current.text}
              speed={20}
              delay={80}
              cursorChar="▋"
              cursorClassName="text-sky-400 ml-1 text-xs"
              hideCursorOnComplete={false}
              className="text-slate-200 font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
