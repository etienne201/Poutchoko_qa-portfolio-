"use client"
import { useLanguage } from "@/hooks/use-language"
import {
  GraduationCap,
  Languages,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Building,
} from "lucide-react"

export function EducationSection() {
  const { t } = useLanguage()

  const softSkills = [
    t("edu.soft.1"),
    t("edu.soft.2"),
    t("edu.soft.3"),
    t("edu.soft.4"),
    t("edu.soft.5"),
  ]

  return (
    <section id="education" className="py-20 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider shadow-sm dark:shadow-subtle">
            <GraduationCap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{t("edu.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("edu.title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("edu.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 text-left">
          {/* Card 1: Formation */}
          <div className="rounded-2xl p-5 sm:p-7 glass-panel border border-slate-200/80 dark:border-white/[0.07] shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3.5 mb-5 pb-4 border-b border-slate-200/80 dark:border-white/[0.07]">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-primary flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {t("edu.training.title")}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl inner-card space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                      {t("edu.training.degree")}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 flex-shrink-0">
                      {t("edu.training.status")}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center text-xs text-slate-500 dark:text-slate-400 gap-x-2 gap-y-1">
                    <span className="flex items-center text-slate-700 dark:text-slate-300 font-medium">
                      <Building className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                      {t("edu.training.school")}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                      {t("edu.training.years")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                    {t("edu.training.desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("edu.training.footer")}
            </div>
          </div>

          {/* Card 2: Langues */}
          <div className="rounded-2xl p-5 sm:p-7 glass-panel border border-slate-200/80 dark:border-white/[0.07] shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3.5 mb-5 pb-4 border-b border-slate-200/80 dark:border-white/[0.07]">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-sky-500 flex-shrink-0">
                  <Languages className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {t("edu.lang.title")}
                </h3>
              </div>

              <div className="space-y-3.5 sm:space-y-4">
                <div className="p-3.5 sm:p-4 rounded-xl inner-card space-y-1.5">
                  <div className="flex items-center space-x-2 font-bold text-sm text-slate-900 dark:text-white">
                    <span aria-hidden="true">🇫🇷</span>
                    <span>{t("edu.lang.frTitle")}</span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 ml-auto">
                      {t("edu.lang.frLevel")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t("edu.lang.frDesc")}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl inner-card space-y-1.5">
                  <div className="flex items-center space-x-2 font-bold text-sm text-slate-900 dark:text-white">
                    <span aria-hidden="true">🇬🇧</span>
                    <span>{t("edu.lang.enTitle")}</span>
                    <span className="text-xs font-semibold text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/25 ml-auto">
                      {t("edu.lang.enLevel")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t("edu.lang.enDesc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("edu.lang.footer")}
            </div>
          </div>

          {/* Card 3: Soft Skills */}
          <div className="rounded-2xl p-5 sm:p-7 glass-panel border border-slate-200/80 dark:border-white/[0.07] shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3.5 mb-5 pb-4 border-b border-slate-200/80 dark:border-white/[0.07]">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-emerald-500 flex-shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {t("edu.soft.title")}
                </h3>
              </div>

              <div className="space-y-2 sm:space-y-2.5">
                {softSkills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-start space-x-2.5 p-2.5 rounded-xl inner-card text-xs text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("edu.soft.footer")}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
