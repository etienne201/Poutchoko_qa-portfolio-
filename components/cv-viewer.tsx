"use client"
import React from "react"
import { useLanguage } from "@/hooks/use-language"
import { defaultEtienneCV_FR, defaultEtienneCV_EN } from "@/lib/cv-data"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  ShieldCheck,
  TrendingUp,
  Gauge,
  Zap,
} from "lucide-react"

interface CVViewerProps {
  className?: string
  variant?: "paper" | "embedded"
  lang?: "fr" | "en"
}

export function CVViewer({ className = "", variant = "paper", lang }: CVViewerProps) {
  const { language: contextLang } = useLanguage()
  const language = lang || contextLang
  const cv = language === "en" ? defaultEtienneCV_EN : defaultEtienneCV_FR
  const isEn = language === "en"

  // Chiffres d'impact stratégiques du profil Senior QA
  const impactMetrics = isEn
    ? [
        { label: "QA & Automation", value: "6+ Years", icon: TrendingUp },
        { label: "Regression Speedup", value: "-40%", icon: Zap },
        { label: "Test Coverage Boost", value: "+60%", icon: Gauge },
        { label: "Compliance & UAT", value: "100%", icon: ShieldCheck },
      ]
    : [
        { label: "QA & Industrialisation", value: "6+ Années", icon: TrendingUp },
        { label: "Gain non-régression", value: "-40%", icon: Zap },
        { label: "Hausse couverture", value: "+60%", icon: Gauge },
        { label: "Conformité & UAT", value: "100%", icon: ShieldCheck },
      ]

  return (
    <article
      aria-label={isEn ? "Etienne Poutchoko Resume" : "CV Etienne Poutchoko"}
      className={`cv-viewer-paper w-full max-w-4xl mx-auto transition-all ${
        variant === "paper"
          ? "bg-white dark:bg-[#0b121a] text-slate-900 dark:text-slate-100 shadow-2xl rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-5 sm:p-8 md:p-10 print:p-0 print:shadow-none print:border-none print:bg-white print:text-slate-900"
          : "text-slate-900 dark:text-slate-100"
      } ${className}`}
    >
      {/* =========================================================
          EN-TÊTE PRINCIPAL / EXECUTIVE RESUME HEADER
          ========================================================= */}
      <header className="cv-profile-header border-b border-slate-200 dark:border-white/[0.1] pb-4 mb-4 print:pb-2.5 print:mb-2.5">
        {/* Barre supérieure : Badges officiels d'autorité et disponibilité */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 print:mb-1.5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
            <Sparkles className="w-3 h-3 text-sky-500 flex-shrink-0" />
            <span className="tracking-wide">
              {isEn ? "Official Certified Resume" : "Curriculum Vitae Certifié"}
            </span>
          </div>

          <div className="inline-flex items-center space-x-1.5 text-[10.5px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 print:hidden"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              {isEn
                ? "Available for Senior / Lead Roles • Remote Worldwide"
                : "Disponible • Rôles Senior / Lead • Remote & International"}
            </span>
          </div>
        </div>

        {/* Nom, Titre et Coordonnées */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 print:gap-2">
          <div className="space-y-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-[30px] print:text-[25px] font-black tracking-tight text-slate-950 dark:text-white uppercase leading-tight">
              {cv.personalInfo.fullName}
            </h1>
            <p className="text-xs sm:text-[13px] print:text-[11.5px] font-bold text-sky-600 dark:text-sky-400 tracking-wide">
              {cv.personalInfo.jobTitle}
            </p>
          </div>

          {/* Coordonnées compactes et cliquables */}
          <div className="flex flex-col gap-1 text-[11px] print:text-[10px] text-slate-600 dark:text-slate-300 md:text-right flex-shrink-0">
            <div className="inline-flex items-center md:justify-end space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
              <span>{cv.personalInfo.location}</span>
            </div>
            <div className="inline-flex items-center md:justify-end space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
              <a
                href={`mailto:${cv.personalInfo.email}`}
                className="hover:text-sky-500 hover:underline transition-colors font-medium"
              >
                {cv.personalInfo.email}
              </a>
            </div>
            <div className="inline-flex items-center md:justify-end space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
              <a
                href={`tel:${cv.personalInfo.phone.replace(/\s+/g, "")}`}
                className="hover:text-sky-500 hover:underline transition-colors font-medium font-mono"
              >
                {cv.personalInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Liens vérifiés (LinkedIn, GitHub, Portfolio) */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap items-center gap-2 text-[11px] print:text-[10px]">
          {cv.personalInfo.linkedin && (
            <a
              href={cv.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/[0.1] transition-all hover:scale-105"
            >
              <Linkedin className="w-3 h-3 text-[#0077b5]" />
              <span className="font-semibold">LinkedIn</span>
            </a>
          )}
          {cv.personalInfo.github && (
            <a
              href={cv.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/[0.1] transition-all hover:scale-105"
            >
              <Github className="w-3 h-3" />
              <span className="font-semibold">GitHub</span>
            </a>
          )}
          {cv.personalInfo.website && (
            <a
              href={cv.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/[0.1] transition-all hover:scale-105"
            >
              <Globe className="w-3 h-3 text-emerald-500" />
              <span className="font-semibold">{isEn ? "Live Portfolio" : "Portfolio en ligne"}</span>
            </a>
          )}
        </div>
      </header>

      {/* =========================================================
          IMPACT KEY METRICS / CHIFFRES CLÉS
          ========================================================= */}
      <div className="cv-metrics-banner grid grid-cols-2 sm:grid-cols-4 print:grid-cols-4 gap-2 mb-4 print:mb-2.5">
        {impactMetrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <div
              key={idx}
              className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]"
            >
              <div className="w-6 h-6 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-none font-mono">
                  {metric.value}
                </div>
                <div className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {metric.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="space-y-4 print:space-y-2.5">
        {/* =========================================================
            PROFIL PROFESSIONNEL (PROFESSIONAL SUMMARY)
            ========================================================= */}
        <section aria-labelledby="cv-summary-heading" className="cv-section-block break-inside-avoid">
          <div className="flex items-center space-x-2 pb-1 mb-1.5 border-b border-slate-200 dark:border-white/[0.08]">
            <div className="w-1 h-3 rounded-full bg-sky-500 flex-shrink-0" />
            <h2
              id="cv-summary-heading"
              className="text-[11.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex-1"
            >
              {isEn ? "PROFESSIONAL SUMMARY" : "PROFIL PROFESSIONNEL"}
            </h2>
            <span className="text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              6+ YEARS EXP
            </span>
          </div>
          <p className="text-[11.5px] print:text-[10.5px] text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
            {cv.professionalSummary.summary}
          </p>
        </section>

        {/* =========================================================
            COMPÉTENCES TECHNIQUES & EXPERTISES (GRILLE HARMONIEUSE)
            ========================================================= */}
        <section aria-labelledby="cv-skills-heading" className="cv-section-block break-inside-avoid">
          <div className="flex items-center space-x-2 pb-1 mb-2 border-b border-slate-200 dark:border-white/[0.08]">
            <div className="w-1 h-3 rounded-full bg-sky-500 flex-shrink-0" />
            <h2
              id="cv-skills-heading"
              className="text-[11.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex-1"
            >
              {isEn ? "CORE COMPETENCIES & TECHNICAL SKILLS" : "COMPÉTENCES TECHNIQUES & EXPERTISES"}
            </h2>
            <Layers className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
          </div>

          <div className="cv-skills-grid grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-2 text-xs">
            {cv.technicalSkills.map((cat) => {
              const isCoreOrAutomation =
                cat.category.toLowerCase().includes("core") ||
                cat.category.toLowerCase().includes("automat")
              return (
                <div
                  key={cat.id}
                  className={`p-2 rounded-lg border transition-colors ${
                    isCoreOrAutomation
                      ? "bg-sky-50/50 dark:bg-sky-950/10 border-sky-200/70 dark:border-sky-800/40"
                      : "bg-slate-50/70 dark:bg-white/[0.02] border-slate-200/70 dark:border-white/[0.04]"
                  }`}
                >
                  <div className="text-[10.5px] font-bold text-slate-900 dark:text-slate-200 mb-1 flex items-center space-x-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isCoreOrAutomation ? "bg-sky-500" : "bg-slate-400"}`} />
                    <span>{cat.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          isCoreOrAutomation
                            ? "bg-white dark:bg-white/[0.08] text-sky-900 dark:text-sky-200 border border-sky-300/60 dark:border-sky-500/30"
                            : "bg-white dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06]"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* =========================================================
            EXPÉRIENCES PROFESSIONNELLES (TIMELINE SANS DÉBORDEMENT)
            ========================================================= */}
        <section aria-labelledby="cv-experiences-heading" className="cv-section-block">
          <div className="flex items-center space-x-2 pb-1 mb-2.5 border-b border-slate-200 dark:border-white/[0.08]">
            <div className="w-1 h-3 rounded-full bg-sky-500 flex-shrink-0" />
            <h2
              id="cv-experiences-heading"
              className="text-[11.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex-1"
            >
              {isEn ? "PROFESSIONAL EXPERIENCE" : "EXPÉRIENCES PROFESSIONNELLES"}
            </h2>
            <Briefcase className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
          </div>

          <div className="space-y-3.5 print:space-y-2.5 ml-1">
            {cv.experiences.map((exp) => (
              <article
                key={exp.id}
                className="cv-item-block break-inside-avoid relative pl-4 border-l-2 border-sky-500/30 hover:border-sky-500 transition-colors"
              >
                {/* Jalon de timeline proprement ancré sans débordement négatif */}
                <div
                  className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${
                    exp.current
                      ? "bg-emerald-500 ring-2 ring-emerald-400/30"
                      : "bg-sky-500"
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
                  <div>
                    <span className="font-bold text-xs sm:text-[13px] print:text-[11.5px] text-slate-950 dark:text-white">
                      {exp.role}
                    </span>
                    <span className="text-[11px] print:text-[10px] text-sky-600 dark:text-sky-400 font-bold sm:ml-2 block sm:inline">
                      — {exp.company}
                    </span>
                    {exp.location && (
                      <span className="text-[10.5px] print:text-[9.5px] text-slate-500 dark:text-slate-400 ml-1">
                        ({exp.location})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10.5px] print:text-[9.5px] font-mono text-slate-500 dark:text-slate-400 flex-shrink-0">
                    <Calendar className="w-3 h-3 text-sky-500" />
                    <span>
                      {exp.startDate} – {exp.endDate}
                    </span>
                    {exp.current && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9.5px] font-sans font-bold border border-emerald-500/20">
                        {isEn ? "Current" : "Actuel"}
                      </span>
                    )}
                  </div>
                </div>

                {exp.description && (
                  <p className="text-[11px] print:text-[10px] text-slate-700 dark:text-slate-300 mb-1 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-0.5 mb-1.5">
                    {exp.achievements.map((ach, aIdx) => (
                      <li
                        key={aIdx}
                        className="text-[11px] print:text-[10px] text-slate-600 dark:text-slate-300 flex items-start space-x-1.5 leading-relaxed"
                      >
                        <span className="text-sky-500 font-bold mt-0.5 flex-shrink-0">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider">
                      TECH :
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.2 text-[9.5px] rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 font-mono border border-sky-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* =========================================================
            FORMATION & CERTIFICATIONS (2 COLONNES)
            ========================================================= */}
        <div className="cv-grid-block break-inside-avoid grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-3.5 print:gap-3 pt-0.5">
          {/* Formation */}
          <section aria-labelledby="cv-edu-heading">
            <div className="flex items-center space-x-2 pb-1 mb-1.5 border-b border-slate-200 dark:border-white/[0.08]">
              <div className="w-1 h-3 rounded-full bg-sky-500 flex-shrink-0" />
              <h2
                id="cv-edu-heading"
                className="text-[11.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex-1"
              >
                {isEn ? "EDUCATION" : "FORMATION"}
              </h2>
              <GraduationCap className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
            </div>
            <div className="space-y-1.5">
              {cv.education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5 p-2 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04]">
                  <div className="font-bold text-[11px] text-slate-950 dark:text-white">
                    {edu.degree}
                  </div>
                  <div className="text-sky-600 dark:text-sky-400 font-medium text-[10.5px]">
                    {edu.institution} {edu.location ? `• ${edu.location}` : ""}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {edu.startDate} – {edu.endDate}
                  </div>
                  {edu.description && (
                    <p className="text-[10.5px] text-slate-600 dark:text-slate-400 pt-0.5 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section aria-labelledby="cv-certs-heading">
            <div className="flex items-center space-x-2 pb-1 mb-1.5 border-b border-slate-200 dark:border-white/[0.08]">
              <div className="w-1 h-3 rounded-full bg-sky-500 flex-shrink-0" />
              <h2
                id="cv-certs-heading"
                className="text-[11.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex-1"
              >
                {isEn ? "CERTIFICATIONS" : "CERTIFICATIONS"}
              </h2>
              <Award className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
            </div>
            <div className="space-y-1.5">
              {cv.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="text-xs flex items-start space-x-2 p-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-bold text-[11px] text-slate-900 dark:text-white leading-tight">
                      {cert.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* =========================================================
            LANGUES & POSTURE PROFESSIONNELLE (2 COLONNES)
            ========================================================= */}
        <div className="cv-grid-block break-inside-avoid grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-3.5 print:gap-3 pt-0.5 border-t border-slate-100 dark:border-white/[0.06]">
          {/* Langues */}
          <section aria-labelledby="cv-lang-heading">
            <div className="flex items-center space-x-2 pb-1 mb-1.5 border-b border-slate-200 dark:border-white/[0.08]">
              <div className="w-1 h-3 rounded-full bg-sky-500 flex-shrink-0" />
              <h2
                id="cv-lang-heading"
                className="text-[11.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex-1"
              >
                <span>{isEn ? "LANGUAGES" : "LANGUES"}</span>
              </h2>
              <Languages className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
            </div>
            <div className="space-y-1 text-xs">
              {cv.languages.map((l) => (
                <div
                  key={l.id}
                  className="flex justify-between items-center py-1 px-2 rounded bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04]"
                >
                  <span className="font-bold text-[11px] text-slate-900 dark:text-slate-200">
                    {l.language}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 text-[10.5px] font-medium">
                    {l.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Qualités humaines / Soft Skills */}
          <section aria-labelledby="cv-soft-heading">
            <div className="flex items-center space-x-2 pb-1 mb-1.5 border-b border-slate-200 dark:border-white/[0.08]">
              <div className="w-1 h-3 rounded-full bg-sky-500 flex-shrink-0" />
              <h2
                id="cv-soft-heading"
                className="text-[11.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex-1"
              >
                <span>{isEn ? "SOFT SKILLS & WORK ETHIC" : "POSTURE & QUALITÉS PROFESSIONNELLES"}</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {cv.softSkills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-50 dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200/70 dark:border-white/[0.06]"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
