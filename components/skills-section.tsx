"use client"
import { useLanguage } from "@/hooks/use-language"
import {
  Terminal,
  Network,
  GitBranch,
  FolderGit2,
  CheckCircle2,
  Wrench,
} from "lucide-react"
import { TechIcon } from "@/components/tech-icon"

export function SkillsSection() {
  const { t } = useLanguage()

  const skillGroups = [
    {
      category: t("skills.cat.automation"),
      icon: Terminal,
      color: "text-primary",
      skills: [
        { name: "Cypress", level: t("skills.level.expert"), desc: t("skills.cypress.desc") },
        { name: "Playwright", level: t("skills.level.advanced"), desc: t("skills.playwright.desc") },
        { name: "Robot Framework", level: t("skills.level.advanced"), desc: t("skills.robot.desc") },
        { name: "UI & Regression Automation", level: t("skills.level.expert"), desc: t("skills.regression.desc") },
      ],
    },
    {
      category: t("skills.cat.api"),
      icon: Network,
      color: "text-sky-500 dark:text-sky-400",
      skills: [
        { name: "Postman", level: t("skills.level.expert"), desc: t("skills.postman.desc") },
        { name: "REST API Testing", level: t("skills.level.expert"), desc: t("skills.restApi.desc") },
        { name: "Gatling", level: t("skills.level.advanced"), desc: t("skills.gatling.desc") },
        { name: "Payment API Flows", level: t("skills.level.specialist"), desc: t("skills.paymentFlows.desc") },
      ],
    },
    {
      category: t("skills.cat.cicd"),
      icon: GitBranch,
      color: "text-indigo-500 dark:text-indigo-400",
      skills: [
        { name: "GitLab CI/CD", level: t("skills.level.advanced"), desc: t("skills.gitlab.desc") },
        { name: "Jenkins", level: t("skills.level.advanced"), desc: t("skills.jenkins.desc") },
        { name: "Docker", level: t("skills.level.operational"), desc: t("skills.docker.desc") },
        { name: "Git", level: t("skills.level.advanced"), desc: t("skills.git.desc") },
      ],
    },
    {
      category: t("skills.cat.management"),
      icon: FolderGit2,
      color: "text-emerald-500 dark:text-emerald-400",
      skills: [
        { name: "Xray (JIRA)", level: t("skills.level.expert"), desc: t("skills.xray.desc") },
        { name: "ClickUp", level: t("skills.level.advanced"), desc: t("skills.clickup.desc") },
        { name: "Agile / Scrum", level: t("skills.level.advanced"), desc: t("skills.agile.desc") },
        { name: "Risk-based Testing", level: t("skills.level.expert"), desc: t("skills.riskTesting.desc") },
      ],
    },
  ]

  const coreCompetenciesList = [
    t("skills.core.1"),
    t("skills.core.2"),
    t("skills.core.3"),
    t("skills.core.4"),
    t("skills.core.5"),
    t("skills.core.6"),
    t("skills.core.7"),
    t("skills.core.8"),
    t("skills.core.9"),
    t("skills.core.10"),
  ]

  return (
    <section id="skills" className="py-20 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider shadow-sm dark:shadow-subtle">
            <Wrench className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{t("skills.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("skills.title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* 4 Skill Categories */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-12">
          {skillGroups.map((group, gIdx) => {
            const Icon = group.icon
            return (
              <div
                key={gIdx}
                className="rounded-2xl p-5 sm:p-7 glass-panel border border-slate-200/80 dark:border-white/[0.07] shadow-card text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-3.5 mb-5 pb-4 border-b border-slate-200/80 dark:border-white/[0.07]">
                    <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] ${group.color} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      {group.category}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl inner-card flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-primary/40 dark:hover:border-white/[0.15] transition-colors"
                      >
                        <div className="w-full">
                          <div className="flex items-center justify-between sm:justify-start sm:space-x-2.5">
                            <div className="flex items-center space-x-2">
                              <TechIcon name={skill.name} size={18} className="w-4 h-4 flex-shrink-0" />
                              <span className="font-bold text-sm text-slate-900 dark:text-white">{skill.name}</span>
                            </div>
                            <span className="chip-subtle text-[11px] font-medium px-2 py-0.5 rounded-md flex-shrink-0">
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-6 leading-relaxed">{skill.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Core Competencies Matrix */}
        <div className="rounded-2xl p-5 sm:p-7 lg:p-8 glass-panel-elevated shadow-card text-left">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-5 flex items-center text-primary">
            <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{t("skills.coreTitle")}</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {coreCompetenciesList.map((comp, cIdx) => (
              <div
                key={cIdx}
                className="flex items-center space-x-2.5 p-3 rounded-xl inner-card text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium hover:border-primary/40 transition-colors"
              >
                <TechIcon name={comp} size={15} className="w-4 h-4 flex-shrink-0 text-primary" />
                <span className="leading-snug">{comp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
