"use client"
import { useLanguage } from "@/hooks/use-language"
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
  const { t } = useLanguage()

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
    <section id="experience" className="py-20 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden">
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
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("exp.subtitle")}
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 sm:space-y-8 relative">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative rounded-2xl p-5 sm:p-7 lg:p-8 glass-panel border border-slate-200/80 dark:border-white/[0.07] hover:border-primary/40 dark:hover:border-white/[0.18] shadow-card transition-all duration-300 text-left"
            >
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
