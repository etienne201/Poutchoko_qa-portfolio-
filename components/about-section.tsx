"use client"
import { useLanguage } from "@/hooks/use-language"
import {
  User,
  Workflow,
  Layers,
  Award,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react"

export function AboutSection() {
  const { t } = useLanguage()

  const pillars = [
    {
      icon: User,
      title: t("about.q1.title"),
      text: t("about.q1.text"),
      iconColor: "text-primary",
      accentBorder: "hover:border-primary/50",
    },
    {
      icon: Workflow,
      title: t("about.q2.title"),
      text: t("about.q2.text"),
      iconColor: "text-sky-500",
      accentBorder: "hover:border-sky-500/50",
    },
    {
      icon: Layers,
      title: t("about.q3.title"),
      text: t("about.q3.text"),
      iconColor: "text-indigo-500 dark:text-indigo-400",
      accentBorder: "hover:border-indigo-500/50",
    },
    {
      icon: Award,
      title: t("about.q4.title"),
      text: t("about.q4.text"),
      iconColor: "text-emerald-500 dark:text-emerald-400",
      accentBorder: "hover:border-emerald-500/50",
    },
  ]

  const benefits = [
    {
      title: t("about.benefit1.title"),
      desc: t("about.benefit1.desc"),
    },
    {
      title: t("about.benefit2.title"),
      desc: t("about.benefit2.desc"),
    },
    {
      title: t("about.benefit3.title"),
      desc: t("about.benefit3.desc"),
    },
  ]

  return (
    <section id="about" className="py-20 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider shadow-sm dark:shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{t("about.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("about.title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("about.subtitle")}
          </p>
        </div>

        {/* 4 Storytelling Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-5 sm:p-7 lg:p-8 glass-panel border border-slate-200/80 dark:border-white/[0.07] ${pillar.accentBorder} shadow-card transition-all duration-300 hover:scale-[1.01] text-left group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center space-x-3.5 mb-3.5 sm:mb-4">
                    <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] ${pillar.iconColor} group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Why Work With Me Highlight Box */}
        <div className="rounded-2xl p-5 sm:p-8 lg:p-10 glass-panel-elevated shadow-card">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-7 xl:col-span-8 space-y-3 sm:space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 text-primary text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>{t("about.differentiator")}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {t("about.q5.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {t("about.q5.text")}
              </p>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 space-y-2.5 sm:space-y-3">
              {benefits.map((b, idx) => (
                <div key={idx} className="p-3.5 sm:p-4 rounded-xl inner-card flex items-start space-x-3 text-left">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">{b.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 pt-0.5 leading-relaxed">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
