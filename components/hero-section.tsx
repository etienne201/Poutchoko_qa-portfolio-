"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CVDownload } from "@/components/cv-download"
import { useLanguage } from "@/hooks/use-language"
import {
  ArrowRight,
  Mail,
  Linkedin,
  Phone,
  MessageSquare,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react"
import { TechBadge } from "@/components/tech-icon"

export function HeroSection() {
  const { t, language } = useLanguage()

  const heroWaText = encodeURIComponent(
    language === "fr"
      ? "Bonjour Étienne, je consulte votre portfolio QA et souhaiterais échanger avec vous."
      : "Hello Étienne, I visited your QA portfolio and would like to connect with you.",
  )
  const heroMailSubject = encodeURIComponent(
    language === "fr"
      ? "Contact Portfolio - Opportunité QA Automation"
      : "Portfolio Contact - QA Automation Opportunity",
  )

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-left">
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 sm:px-3.5 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-sm dark:shadow-subtle max-w-full">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-800 dark:text-slate-200 truncate">{t("hero.badge")}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                <span className="block text-gradient-silver">{t("hero.name")}</span>
                <span className="block text-gradient-accent mt-1.5 font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl">
                  {t("hero.title")}
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase pt-1">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Professional Summary */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
              {t("hero.description")}
            </p>

            {/* Location & Status Bar */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 sm:gap-x-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{t("hero.location")}</span>
              </div>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-600" aria-hidden="true">•</span>
              <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 flex-shrink-0"></span>
                <span>{t("hero.status")}</span>
              </div>
            </div>

            {/* Core Tooling Strip with Dedicated Icons */}
            <div className="pt-1">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                {t("hero.toolsLabel")}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Cypress", "Playwright", "Robot Framework", "Postman", "Gatling", "GitLab CI", "Jenkins", "Docker", "Xray (JIRA)"].map((tool, idx) => (
                  <TechBadge key={idx} name={tool} size="sm" />
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-2">
              <Button
                size="lg"
                onClick={() => scrollToSection("experience")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 sm:px-6 py-3 rounded-xl shadow-accent hover:shadow-accent transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center group min-h-[44px]"
              >
                <span>{t("hero.cta.journey")}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-slate-300/90 dark:border-white/[0.12] hover:border-slate-400 dark:hover:border-white/[0.25] bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-slate-800 dark:text-white font-semibold px-5 sm:px-6 py-3 rounded-xl backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm min-h-[44px]"
              >
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <span>{t("hero.cta.contact")}</span>
              </Button>

              <CVDownload size="lg" />
            </div>

            {/* Instant Direct Contact Channels */}
            <div className="pt-2 flex items-center space-x-2.5 sm:space-x-3 text-slate-500 dark:text-slate-400">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-medium mr-1">
                {t("hero.direct")}
              </span>
              <a
                href="https://linkedin.com/in/etienne-poutchoko-emako"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-blue-500 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-white/[0.08] transition-all shadow-sm dark:shadow-subtle min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/237657268355?text=${heroWaText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-emerald-500 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200/80 dark:hover:bg-white/[0.08] transition-all shadow-sm dark:shadow-subtle min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="WhatsApp"
                aria-label="WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`mailto:poutchokoetienne@gmail.com?subject=${heroMailSubject}`}
                className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-sky-500 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-200/80 dark:hover:bg-white/[0.08] transition-all shadow-sm dark:shadow-subtle min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Email"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+237657268355"
                className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-indigo-500 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/80 dark:hover:bg-white/[0.08] transition-all shadow-sm dark:shadow-subtle min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Call"
                aria-label="Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Impact QA Command Deck */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl p-5 sm:p-7 glass-panel-elevated shadow-card">
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-5 border-b border-slate-200/80 dark:border-white/[0.08]">
                <div className="flex items-center space-x-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {t("hero.deckTitle")}
                  </span>
                </div>
                <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
                  {t("hero.qualityGate")}
                </Badge>
              </div>

              {/* 2x2 Quantified Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 py-4 sm:py-5">
                <div className="p-3.5 sm:p-4 rounded-xl inner-card space-y-1 text-left">
                  <div className="flex items-center text-primary text-xs font-medium space-x-1.5">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t("hero.stat.yearsTag")}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {t("hero.stat.years")}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {t("hero.stat.yearsLabel")}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl inner-card space-y-1 text-left">
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-medium space-x-1.5">
                    <TrendingDown className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t("hero.stat.regressionTag")}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {t("hero.stat.regression")}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {t("hero.stat.regressionLabel")}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl inner-card space-y-1 text-left">
                  <div className="flex items-center text-sky-600 dark:text-sky-400 text-xs font-medium space-x-1.5">
                    <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t("hero.stat.coverageTag")}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {t("hero.stat.coverage")}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {t("hero.stat.coverageLabel")}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl inner-card space-y-1 text-left">
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-xs font-medium space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t("hero.stat.defectsTag")}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {t("hero.stat.defects")}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {t("hero.stat.defectsLabel")}
                  </div>
                </div>
              </div>

              {/* Core Quality Pillars */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.08] space-y-2.5 text-left">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t("hero.validatedTitle")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="chip-subtle inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium">
                    <TechBadge name="Cypress" size="sm" className="bg-transparent border-0 p-0 shadow-none" />
                    <span>{t("hero.env.regtech")}</span>
                  </span>
                  <span className="chip-subtle inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium">
                    <TechBadge name="Mobile Money" size="sm" className="bg-transparent border-0 p-0 shadow-none" />
                    <span>{t("hero.env.fintech")}</span>
                  </span>
                  <span className="chip-subtle inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium">
                    <TechBadge name="Playwright" size="sm" className="bg-transparent border-0 p-0 shadow-none" />
                    <span>{t("hero.env.saas")}</span>
                  </span>
                  <span className="chip-subtle inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium">
                    <TechBadge name="GitLab CI" size="sm" className="bg-transparent border-0 p-0 shadow-none" />
                    <span>{t("hero.env.cicd")}</span>
                  </span>
                </div>
              </div>

              {/* Micro Status Terminal Footer */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 font-semibold">
                  <span>✓</span>
                  <span>{t("hero.pipelineVerified")}</span>
                </span>
                <span className="text-slate-500">{t("hero.zeroBugs")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
