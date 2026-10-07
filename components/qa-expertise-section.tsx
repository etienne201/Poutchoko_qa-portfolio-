"use client"
import { useLanguage } from "@/hooks/use-language"
import {
  FileCheck2,
  Terminal,
  Network,
  GitMerge,
  Gauge,
  Bug,
  Layers,
} from "lucide-react"
import { TechIcon } from "@/components/tech-icon"

export function QAExpertiseSection() {
  const { t } = useLanguage()

  const methodologySteps = [
    {
      num: "01",
      icon: FileCheck2,
      title: t("expertise.card1.title"),
      desc: t("expertise.card1.desc"),
      tags: ["Risk-based Testing", "Traceability Matrix", "Acceptance Criteria"],
      color: "text-primary",
      border: "border-primary/30",
    },
    {
      num: "02",
      icon: Terminal,
      title: t("expertise.card2.title"),
      desc: t("expertise.card2.desc"),
      tags: ["Cypress", "Playwright", "Robot Framework", "Page Object Model"],
      color: "text-emerald-500 dark:text-emerald-400",
      border: "border-emerald-500/30",
    },
    {
      num: "03",
      icon: Network,
      title: t("expertise.card3.title"),
      desc: t("expertise.card3.desc"),
      tags: ["Postman", "REST APIs", "Payload Validation", "Status Codes"],
      color: "text-sky-500 dark:text-sky-400",
      border: "border-sky-500/30",
    },
    {
      num: "04",
      icon: GitMerge,
      title: t("expertise.card4.title"),
      desc: t("expertise.card4.desc"),
      tags: ["GitLab CI", "Jenkins", "Docker", "Quality Gates", "Automated Triggers"],
      color: "text-indigo-500 dark:text-indigo-400",
      border: "border-indigo-500/30",
    },
    {
      num: "05",
      icon: Gauge,
      title: t("expertise.card5.title"),
      desc: t("expertise.card5.desc"),
      tags: ["Gatling", "Concurrency", "Stress Testing", "Bottleneck Isolation"],
      color: "text-amber-500 dark:text-amber-400",
      border: "border-amber-500/30",
    },
    {
      num: "06",
      icon: Bug,
      title: t("expertise.card6.title"),
      desc: t("expertise.card6.desc"),
      tags: ["Xray (JIRA)", "ClickUp", "Defect Lifecycle", "Confirmation Tests"],
      color: "text-rose-500 dark:text-rose-400",
      border: "border-rose-500/30",
    },
  ]

  return (
    <section id="expertise" className="py-20 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider shadow-sm dark:shadow-subtle">
            <Layers className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{t("expertise.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("expertise.title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("expertise.subtitle")}
          </p>
        </div>

        {/* 6-Card Methodology Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {methodologySteps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={idx}
                className="relative rounded-2xl p-5 sm:p-6 glass-panel border border-slate-200/80 dark:border-white/[0.07] hover:border-primary/40 dark:hover:border-white/[0.18] shadow-card transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] ${step.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                      {t("expertise.step")} {step.num}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap gap-1.5">
                  {step.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="chip-subtle inline-flex items-center space-x-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md"
                    >
                      <TechIcon name={tag} size={12} className="w-3 h-3 flex-shrink-0" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
