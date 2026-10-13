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
} from "lucide-react"

interface CVViewerProps {
  className?: string
  variant?: "paper" | "embedded"
}

export function CVViewer({ className = "", variant = "paper" }: CVViewerProps) {
  const { language } = useLanguage()
  const cv = language === "en" ? defaultEtienneCV_EN : defaultEtienneCV_FR
  const isEn = language === "en"

  return (
    <div
      className={`w-full max-w-4xl mx-auto transition-all ${
        variant === "paper"
          ? "bg-white dark:bg-[#0c141d] text-slate-900 dark:text-slate-100 shadow-2xl rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-5 sm:p-8 md:p-12"
          : "text-slate-900 dark:text-slate-100"
      } ${className}`}
    >
      {/* En-tête principal / Profile Header */}
      <header className="border-b border-slate-200 dark:border-white/[0.1] pb-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-1">
              <Sparkles className="w-3 h-3 flex-shrink-0" />
              <span>{isEn ? "Official Certified Resume" : "Curriculum Vitae Certifié"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 dark:text-white uppercase">
              {cv.personalInfo.fullName}
            </h1>
            <p className="text-sm sm:text-base font-bold text-sky-600 dark:text-sky-400">
              {cv.personalInfo.jobTitle}
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-300 md:text-right">
            <div className="inline-flex items-center md:justify-end space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
              <span>{cv.personalInfo.location}</span>
            </div>
            <div className="inline-flex items-center md:justify-end space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
              <a
                href={`mailto:${cv.personalInfo.email}`}
                className="hover:text-sky-500 hover:underline transition-colors"
              >
                {cv.personalInfo.email}
              </a>
            </div>
            <div className="inline-flex items-center md:justify-end space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
              <a
                href={`tel:${cv.personalInfo.phone.replace(/\s+/g, "")}`}
                className="hover:text-sky-500 hover:underline transition-colors"
              >
                {cv.personalInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Liens professionnels vérifiés (Clickable) */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.05] flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
          {cv.personalInfo.linkedin && (
            <a
              href={cv.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/[0.1] transition-all hover:scale-105"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
              <span className="font-medium">LinkedIn</span>
            </a>
          )}
          {cv.personalInfo.github && (
            <a
              href={cv.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/[0.1] transition-all hover:scale-105"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="font-medium">GitHub</span>
            </a>
          )}
          {cv.personalInfo.website && (
            <a
              href={cv.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/[0.1] transition-all hover:scale-105"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-medium">{isEn ? "Live Portfolio" : "Portfolio en ligne"}</span>
            </a>
          )}
        </div>
      </header>

      <div className="space-y-7">
        {/* Résumé Professionnel */}
        <section aria-labelledby="cv-summary-heading">
          <h2
            id="cv-summary-heading"
            className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100 pb-1.5 mb-2.5 border-b-2 border-sky-500 flex items-center justify-between"
          >
            <span>{isEn ? "PROFESSIONAL SUMMARY" : "PROFIL PROFESSIONNEL"}</span>
            <span className="text-[10px] text-slate-400 font-normal">6+ Years Exp</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
            {cv.professionalSummary.summary}
          </p>
        </section>

        {/* Compétences Clés & Outils */}
        <section aria-labelledby="cv-skills-heading">
          <h2
            id="cv-skills-heading"
            className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100 pb-1.5 mb-3 border-b-2 border-sky-500 flex items-center justify-between"
          >
            <span>{isEn ? "CORE COMPETENCIES & TECHNICAL SKILLS" : "COMPÉTENCES TECHNIQUES & EXPERTISES"}</span>
            <Layers className="w-3.5 h-3.5 text-sky-500" />
          </h2>
          <div className="grid grid-cols-1 gap-2 text-xs">
            {cv.technicalSkills.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 py-1 border-b border-slate-100 dark:border-white/[0.04] last:border-0"
              >
                <span className="font-bold text-slate-900 dark:text-slate-200 min-w-[170px] sm:w-44 flex-shrink-0">
                  {cat.category} :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expériences Professionnelles */}
        <section aria-labelledby="cv-experiences-heading">
          <h2
            id="cv-experiences-heading"
            className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100 pb-1.5 mb-4 border-b-2 border-sky-500 flex items-center justify-between"
          >
            <span>{isEn ? "PROFESSIONAL EXPERIENCE" : "EXPÉRIENCES PROFESSIONNELLES"}</span>
            <Briefcase className="w-3.5 h-3.5 text-sky-500" />
          </h2>

          <div className="space-y-5">
            {cv.experiences.map((exp) => (
              <article
                key={exp.id}
                className="relative pl-4 border-l-2 border-sky-500/30 hover:border-sky-500 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <div>
                    <span className="font-bold text-sm text-slate-950 dark:text-white">
                      {exp.role}
                    </span>
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold sm:ml-2 block sm:inline">
                      — {exp.company}
                    </span>
                    {exp.location && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                        ({exp.location})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex-shrink-0">
                    <Calendar className="w-3 h-3 text-sky-500" />
                    <span>
                      {exp.startDate} – {exp.endDate}
                    </span>
                    {exp.current && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-sans font-bold">
                        {isEn ? "Current" : "Actuel"}
                      </span>
                    )}
                  </div>
                </div>

                {exp.description && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-1 mb-2.5">
                    {exp.achievements.map((ach, aIdx) => (
                      <li
                        key={aIdx}
                        className="text-[11.5px] text-slate-600 dark:text-slate-300 flex items-start space-x-2 leading-relaxed"
                      >
                        <span className="text-sky-500 font-bold mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                      Tech :
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 text-[10.5px] rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 font-mono"
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

        {/* Formation & Certifications (2 Colonnes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Formation */}
          <section aria-labelledby="cv-edu-heading">
            <h2
              id="cv-edu-heading"
              className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100 pb-1.5 mb-3 border-b-2 border-sky-500 flex items-center justify-between"
            >
              <span>{isEn ? "EDUCATION" : "FORMATION"}</span>
              <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
            </h2>
            <div className="space-y-3">
              {cv.education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="font-bold text-slate-950 dark:text-white">
                    {edu.degree}
                  </div>
                  <div className="text-sky-600 dark:text-sky-400 font-medium">
                    {edu.institution} {edu.location ? `• ${edu.location}` : ""}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {edu.startDate} – {edu.endDate}
                  </div>
                  {edu.description && (
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-400 pt-0.5">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section aria-labelledby="cv-certs-heading">
            <h2
              id="cv-certs-heading"
              className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100 pb-1.5 mb-3 border-b-2 border-sky-500 flex items-center justify-between"
            >
              <span>{isEn ? "CERTIFICATIONS" : "CERTIFICATIONS"}</span>
              <Award className="w-3.5 h-3.5 text-sky-500" />
            </h2>
            <div className="space-y-2.5">
              {cv.certifications.map((cert) => (
                <div key={cert.id} className="text-xs flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {cert.name}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Langues & Soft Skills (2 Colonnes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-white/[0.05]">
          {/* Langues */}
          <section aria-labelledby="cv-lang-heading">
            <h2
              id="cv-lang-heading"
              className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100 pb-1.5 mb-2.5 border-b-2 border-sky-500 flex items-center justify-between"
            >
              <span>{isEn ? "LANGUAGES" : "LANGUES"}</span>
              <Languages className="w-3.5 h-3.5 text-sky-500" />
            </h2>
            <div className="space-y-1.5 text-xs">
              {cv.languages.map((l) => (
                <div key={l.id} className="flex justify-between items-center py-0.5">
                  <span className="font-bold text-slate-900 dark:text-slate-200">
                    {l.language}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px]">
                    {l.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Qualités humaines / Soft Skills */}
          <section aria-labelledby="cv-soft-heading">
            <h2
              id="cv-soft-heading"
              className="text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-slate-100 pb-1.5 mb-2.5 border-b-2 border-sky-500"
            >
              <span>{isEn ? "SOFT SKILLS & WORK ETHIC" : "POSTURE & QUALITÉS PROFESSIONNELLES"}</span>
            </h2>
            <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
              {cv.softSkills.map((s) => s.name).join(" • ")}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
