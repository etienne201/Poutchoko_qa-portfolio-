"use client"
import React, { forwardRef } from "react"
import { CVData, CVAccentColor, CVFontFamily, CVSpacing } from "@/types/cv"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
} from "lucide-react"

interface CVPreviewProps {
  data: CVData
  scale?: number
}

// Helpers de styles pour les thèmes
function getAccentClass(accent: CVAccentColor) {
  switch (accent) {
    case "cobalt":
      return {
        bg: "bg-blue-600",
        text: "text-blue-600",
        border: "border-blue-600",
        lightBg: "bg-blue-50 text-blue-700",
        hex: "#2563eb",
      }
    case "emerald":
      return {
        bg: "bg-emerald-600",
        text: "text-emerald-600",
        border: "border-emerald-600",
        lightBg: "bg-emerald-50 text-emerald-700",
        hex: "#059669",
      }
    case "indigo":
      return {
        bg: "bg-indigo-600",
        text: "text-indigo-600",
        border: "border-indigo-600",
        lightBg: "bg-indigo-50 text-indigo-700",
        hex: "#4f46e5",
      }
    case "graphite":
      return {
        bg: "bg-slate-800",
        text: "text-slate-800",
        border: "border-slate-800",
        lightBg: "bg-slate-100 text-slate-800",
        hex: "#1e293b",
      }
    case "ocean":
    default:
      return {
        bg: "bg-sky-600",
        text: "text-sky-600",
        border: "border-sky-600",
        lightBg: "bg-sky-50 text-sky-700",
        hex: "#0284c7",
      }
  }
}

function getFontClass(font: CVFontFamily) {
  switch (font) {
    case "serif":
      return "font-serif"
    case "sans":
      return "font-sans"
    case "inter":
    default:
      return "font-sans tracking-tight"
  }
}

function getSpacingClass(spacing: CVSpacing) {
  switch (spacing) {
    case "compact":
      return {
        spaceY: "space-y-2.5",
        itemSpace: "space-y-1",
        padding: "p-6",
        textBase: "text-xs",
        textHeading: "text-xs font-bold",
        textTitle: "text-xl",
      }
    case "relaxed":
      return {
        spaceY: "space-y-5",
        itemSpace: "space-y-2.5",
        padding: "p-9",
        textBase: "text-[13px]",
        textHeading: "text-sm font-bold",
        textTitle: "text-3xl",
      }
    case "normal":
    default:
      return {
        spaceY: "space-y-3.5",
        itemSpace: "space-y-1.5",
        padding: "p-7",
        textBase: "text-xs",
        textHeading: "text-xs sm:text-sm font-bold",
        textTitle: "text-2xl",
      }
  }
}

function getInitials(name: string) {
  if (!name) return "CV"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function getCVLabels(lang: "fr" | "en" = "fr") {
  const isEn = lang === "en"
  return {
    links: isEn ? "Links & Portfolios" : "Liens & Portfolios",
    skills: isEn ? "Core Competencies & Technical Skills" : "Compétences Techniques",
    languages: isEn ? "Languages" : "Langues",
    education: isEn ? "Education" : "Formation",
    certifications: isEn ? "Certifications" : "Certifications",
    softSkills: isEn ? "Soft Skills & Mindset" : "Atouts & Posture",
    interests: isEn ? "Interests & Activities" : "Centres d'intérêt",
    summary: isEn ? "Professional Summary" : "Profil Professionnel",
    summaryATS: isEn ? "PROFESSIONAL SUMMARY" : "RÉSUMÉ PROFESSIONNEL",
    skillsATS: isEn ? "CORE COMPETENCIES & TECHNICAL SKILLS" : "COMPÉTENCES TECHNIQUES",
    experienceATS: isEn ? "PROFESSIONAL EXPERIENCE" : "EXPÉRIENCES PROFESSIONNELLES",
    educationATS: isEn ? "EDUCATION" : "FORMATION",
    certificationsATS: isEn ? "CERTIFICATIONS" : "CERTIFICATIONS",
    languagesATS: isEn ? "LANGUAGES" : "LANGUES",
    experience: isEn ? "Professional Experience" : "Expériences Professionnelles",
    projects: isEn ? "Key Projects & Deliverables" : "Projets Réalisés & Réalisations",
    impact: isEn ? "Impact: " : "Impact : ",
    references: isEn ? "References" : "Références",
    present: isEn ? "Present" : "Présent",
    presentUpper: isEn ? "NOW" : "PRÉSENT",
    availableOnDemand: isEn ? "Available upon request" : "Sur demande",
    sysProfile: "SYS_PROFILE // VERIFIED_QA",
    missionStatement: isEn ? "// MISSION STATEMENT & SUMMARY" : "// SYNTHÈSE PROFESSIONNELLE",
    techStack: isEn ? "TECH STACK & AUTOMATION TOOLING" : "STACK TECHNIQUE & AUTOMATISATION",
    workHistory: isEn ? "WORK HISTORY & IMPACT" : "PARCOURS PROFESSIONNEL & IMPACT",
    academicDegrees: isEn ? "// ACADEMIC DEGREES" : "// DIPLÔMES & FORMATIONS",
    certificationsBlueprint: "// CERTIFICATIONS",
  }
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data, scale = 1 }, ref) => {
    const {
      settings,
      personalInfo,
      professionalSummary,
      experiences,
      education,
      technicalSkills,
      softSkills,
      certifications,
      projects,
      languages,
      hobbies,
      references,
    } = data

    const accent = getAccentClass(settings.accentColor)
    const font = getFontClass(settings.fontFamily)
    const sp = getSpacingClass(settings.spacing)
    const initials = getInitials(personalInfo.fullName)
    const labels = getCVLabels(settings.language)

    return (
      <div
        className="w-full flex justify-center overflow-auto p-2 sm:p-4 print:p-0 print:m-0"
        style={{ transformOrigin: "top center" }}
      >
        {/* Page A4 : dimensions standard 210mm x 297mm */}
        <div
          ref={ref}
          id="cv-print-area"
          className={`cv-a4-sheet bg-white text-slate-800 shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] ${font} relative transition-all duration-300 print:w-[210mm] print:min-h-[297mm] print:text-black`}
          style={{
            transform: scale !== 1 ? `scale(${scale})` : undefined,
            transformOrigin: "top center",
          }}
        >
          {/* ============================================================ */}
          {/* MODÈLE 1 : MODERNE EXECUTIVE (2 Colonnes avec header) */}
          {/* ============================================================ */}
          {settings.template === "modern" && (
            <div className="flex flex-col min-h-[297mm]">
              {/* Header avec accent */}
              <div
                className="p-6 sm:p-7 text-white relative overflow-hidden print:p-6"
                style={{ backgroundColor: accent.hex }}
              >
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 min-w-0">
                    {/* Monogramme ou Photo */}
                    {personalInfo.photoUrl ? (
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-white/80 shadow-md flex-shrink-0 bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={personalInfo.photoUrl}
                          alt={personalInfo.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-black text-xl text-white shadow-inner flex-shrink-0">
                        {initials}
                      </div>
                    )}

                    <div className="space-y-1 min-w-0">
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white truncate break-words">
                        {personalInfo.fullName || "Votre Nom Complet"}
                      </h1>
                      <p className="text-sm sm:text-base font-semibold text-white/95 truncate">
                        {personalInfo.jobTitle || "Titre Professionnel Cible"}
                      </p>
                    </div>
                  </div>

                  {/* Coordonnées compactes header */}
                  <div className="hidden sm:flex flex-col space-y-1 text-xs text-white/90 text-right flex-shrink-0">
                    {personalInfo.email && (
                      <div className="flex items-center justify-end space-x-1.5">
                        <span className="truncate max-w-[200px]">{personalInfo.email}</span>
                        <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div className="flex items-center justify-end space-x-1.5">
                        <span>{personalInfo.phone}</span>
                        <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      </div>
                    )}
                    {personalInfo.location && (
                      <div className="flex items-center justify-end space-x-1.5">
                        <span className="truncate max-w-[200px]">{personalInfo.location}</span>
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Coordonnées visibles sur mobile ou petit format */}
                <div className="sm:hidden pt-3 border-t border-white/20 mt-3 grid grid-cols-1 gap-1 text-[11px] text-white/90">
                  {personalInfo.email && <div>✉ {personalInfo.email}</div>}
                  {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
                  {personalInfo.location && <div>📍 {personalInfo.location}</div>}
                </div>
              </div>

              {/* Corps 2 colonnes */}
              <div className="flex-1 grid grid-cols-12 divide-x divide-slate-200">
                {/* Colonne latérale (35%) */}
                <div className="col-span-4 p-5 sm:p-6 bg-slate-50/70 print:bg-slate-50 space-y-5 text-xs text-slate-700">
                  {/* Liens web & réseaux */}
                  {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
                    <div className="space-y-2 cv-section-block">
                      <h3
                        className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.links}
                      </h3>
                      <div className="space-y-1.5 text-[11px] break-words">
                        {personalInfo.linkedin && (
                          <div className="flex items-center space-x-1.5 truncate">
                            <Linkedin className="w-3.5 h-3.5 flex-shrink-0 text-slate-500" />
                            <span className="truncate">{personalInfo.linkedin.replace("https://", "")}</span>
                          </div>
                        )}
                        {personalInfo.github && (
                          <div className="flex items-center space-x-1.5 truncate">
                            <Github className="w-3.5 h-3.5 flex-shrink-0 text-slate-500" />
                            <span className="truncate">{personalInfo.github.replace("https://", "")}</span>
                          </div>
                        )}
                        {personalInfo.website && (
                          <div className="flex items-center space-x-1.5 truncate">
                            <Globe className="w-3.5 h-3.5 flex-shrink-0 text-slate-500" />
                            <span className="truncate">{personalInfo.website.replace("https://", "")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Compétences techniques */}
                  {technicalSkills.length > 0 && (
                    <div className="space-y-2.5 cv-section-block">
                      <h3
                        className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.skills}
                      </h3>
                      {technicalSkills.map((cat, i) => (
                        <div key={i} className="space-y-1">
                          <div className="font-bold text-[11px] text-slate-900">{cat.category}</div>
                          <div className="flex flex-wrap gap-1">
                            {cat.skills.map((s, si) => (
                              <span
                                key={si}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-800 font-medium"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Langues */}
                  {languages.length > 0 && (
                    <div className="space-y-2 cv-section-block">
                      <h3
                        className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.languages}
                      </h3>
                      <div className="space-y-1.5">
                        {languages.map((l, i) => (
                          <div key={i} className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-900">{l.language}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{l.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Formation */}
                  {education.length > 0 && (
                    <div className="space-y-2 cv-section-block">
                      <h3
                        className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.education}
                      </h3>
                      <div className="space-y-2.5">
                        {education.map((edu, i) => (
                          <div key={i} className="space-y-0.5 text-xs cv-item-block break-inside-avoid">
                            <div className="font-bold text-slate-900 leading-tight">{edu.degree}</div>
                            <div className="text-[11px] text-slate-600">{edu.institution}</div>
                            <div className="text-[10px] text-slate-400">
                              {edu.startDate} — {edu.endDate || labels.present}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {certifications.length > 0 && (
                    <div className="space-y-2 cv-section-block">
                      <h3
                        className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.certifications}
                      </h3>
                      <div className="space-y-2">
                        {certifications.map((c, i) => (
                          <div key={i} className="text-xs cv-item-block break-inside-avoid">
                            <div className="font-bold text-slate-900 leading-snug">{c.name}</div>
                            <div className="text-[10px] text-slate-500">
                              {c.issuer} {c.issueDate && `• ${c.issueDate}`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Soft Skills */}
                  {softSkills.length > 0 && (
                    <div className="space-y-2 cv-section-block">
                      <h3
                        className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.softSkills}
                      </h3>
                      <ul className="space-y-1 text-[11px]">
                        {softSkills.map((s, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-slate-400 mt-0.5">•</span>
                            <span className="text-slate-700 leading-snug">{s.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Loisirs */}
                  {hobbies.length > 0 && (
                    <div className="space-y-1.5 cv-section-block">
                      <h3
                        className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.interests}
                      </h3>
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-600">
                        {hobbies.map((h, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-200/60 rounded">
                            {h.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Colonne principale (65%) */}
                <div className="col-span-8 p-6 sm:p-7 space-y-5">
                  {/* Résumé professionnel */}
                  {professionalSummary.summary && (
                    <div className="space-y-1.5 cv-section-block break-inside-avoid">
                      <h2
                        className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.summary}
                      </h2>
                      <p className="text-xs leading-relaxed text-slate-700 text-justify">
                        {professionalSummary.summary}
                      </p>
                    </div>
                  )}

                  {/* Expériences professionnelles */}
                  {experiences.length > 0 && (
                    <div className="space-y-3.5 cv-section-block">
                      <h2
                        className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.experience}
                      </h2>
                      <div className="space-y-4">
                        {experiences.map((exp, i) => (
                          <div key={i} className="space-y-1.5 cv-item-block break-inside-avoid">
                            <div className="flex items-baseline justify-between gap-2">
                              <div className="font-bold text-sm text-slate-900 leading-tight">
                                {exp.role}
                              </div>
                              <div className="text-[11px] font-semibold text-slate-500 whitespace-nowrap font-mono">
                                {exp.startDate} — {exp.current ? labels.present : exp.endDate}
                              </div>
                            </div>
                            <div className="text-xs font-medium text-slate-600 flex items-center space-x-2">
                              <span className="font-semibold text-slate-800">{exp.company}</span>
                              {exp.location && <span>• {exp.location}</span>}
                            </div>
                            {exp.description && (
                              <p className="text-xs text-slate-700 leading-relaxed pt-0.5">
                                {exp.description}
                              </p>
                            )}

                            {/* Réalisations */}
                            {exp.achievements && exp.achievements.filter(Boolean).length > 0 && (
                              <ul className="space-y-1 pt-1 text-xs text-slate-700">
                                {exp.achievements.filter(Boolean).map((ach, achI) => (
                                  <li key={achI} className="flex items-start space-x-1.5">
                                    <span style={{ color: accent.hex }} className="font-bold mt-0.5">
                                      ▹
                                    </span>
                                    <span className="leading-snug">{ach}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Tags technos */}
                            {exp.technologies && exp.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1.5">
                                {exp.technologies.map((t, ti) => (
                                  <span
                                    key={ti}
                                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projets majeurs */}
                  {projects.length > 0 && (
                    <div className="space-y-3 cv-section-block">
                      <h2
                        className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.projects}
                      </h2>
                      <div className="space-y-3">
                        {projects.map((p, i) => (
                          <div key={i} className="space-y-1 text-xs cv-item-block break-inside-avoid">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">{p.title}</span>
                              {p.role && <span className="text-[11px] text-slate-500 font-medium">{p.role}</span>}
                            </div>
                            <p className="text-slate-700 leading-relaxed">{p.description}</p>
                            {p.outcomes && (
                              <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                                {labels.impact}{p.outcomes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Références */}
                  {references.length > 0 && (
                    <div className="space-y-1.5 cv-section-block break-inside-avoid pt-2">
                      <h2
                        className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                        style={{ color: accent.hex, borderColor: accent.hex }}
                      >
                        {labels.references}
                      </h2>
                      <div className="text-xs text-slate-600 space-y-1">
                        {references.map((r, i) => (
                          <div key={i}>
                            <span className="font-semibold text-slate-900">{r.name}</span> ({r.company}) — {r.contact || labels.availableOnDemand}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* MODÈLE 2 : MINIMALIST ATS (1 Colonne épurée conforme aux robots RH) */}
          {/* ============================================================ */}
          {settings.template === "ats" && (
            <div className={`p-8 sm:p-10 ${sp.spaceY} text-slate-900`}>
              {/* Header centré ultra lisible */}
              <div className="text-center space-y-1.5 pb-4 border-b-2 border-slate-900">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                  {personalInfo.fullName || "Votre Nom"}
                </h1>
                <p className="text-sm font-bold uppercase tracking-wider" style={{ color: accent.hex }}>
                  {personalInfo.jobTitle || "Titre Professionnel"}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-700 pt-1">
                  {personalInfo.email && <span className="font-medium">{personalInfo.email}</span>}
                  {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                  {personalInfo.location && <span>• {personalInfo.location}</span>}
                  {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                  {personalInfo.github && <span>• {personalInfo.github}</span>}
                </div>
              </div>

              {/* Résumé professionnel */}
              {professionalSummary.summary && (
                <div className="space-y-1 cv-section-block break-inside-avoid">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                    {labels.summaryATS}
                  </h2>
                  <p className="text-xs leading-relaxed text-slate-800 pt-1 text-justify">
                    {professionalSummary.summary}
                  </p>
                </div>
              )}

              {/* Compétences techniques groupées */}
              {technicalSkills.length > 0 && (
                <div className="space-y-1.5 cv-section-block break-inside-avoid">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                    {labels.skillsATS}
                  </h2>
                  <div className="space-y-1 text-xs pt-1">
                    {technicalSkills.map((cat, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-baseline">
                        <span className="font-bold text-slate-900 w-48 flex-shrink-0">
                          {cat.category} :
                        </span>
                        <span className="text-slate-800">{cat.skills.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expériences professionnelles */}
              {experiences.length > 0 && (
                <div className="space-y-3 cv-section-block">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                    {labels.experienceATS}
                  </h2>
                  <div className="space-y-3.5 pt-1">
                    {experiences.map((exp, i) => (
                      <div key={i} className="space-y-1 cv-item-block break-inside-avoid">
                        <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                          <span>
                            {exp.role} | <span className="font-semibold text-slate-700">{exp.company}</span>
                          </span>
                          <span className="text-slate-600 font-normal font-mono">
                            {exp.startDate} – {exp.current ? labels.present : exp.endDate}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-xs text-slate-700 leading-relaxed">{exp.description}</p>
                        )}
                        {exp.achievements && exp.achievements.filter(Boolean).length > 0 && (
                          <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-800 pl-1">
                            {exp.achievements.filter(Boolean).map((ach, achI) => (
                              <li key={achI} className="leading-snug">
                                {ach}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formation */}
              {education.length > 0 && (
                <div className="space-y-2 cv-section-block break-inside-avoid">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                    {labels.educationATS}
                  </h2>
                  <div className="space-y-2 pt-1">
                    {education.map((edu, i) => (
                      <div key={i} className="flex justify-between items-baseline text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{edu.degree}</div>
                          <div className="text-slate-600">{edu.institution}</div>
                        </div>
                        <span className="text-slate-600 font-mono">
                          {edu.startDate} – {edu.endDate || labels.present}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications & Langues */}
              {(certifications.length > 0 || languages.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 cv-section-block break-inside-avoid">
                  {certifications.length > 0 && (
                    <div className="space-y-1">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                        {labels.certificationsATS}
                      </h2>
                      <ul className="list-disc list-inside text-xs text-slate-800 space-y-0.5 pt-1">
                        {certifications.map((c, i) => (
                          <li key={i}>
                            <span className="font-semibold">{c.name}</span> ({c.issuer})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {languages.length > 0 && (
                    <div className="space-y-1">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                        {labels.languagesATS}
                      </h2>
                      <div className="text-xs text-slate-800 space-y-0.5 pt-1">
                        {languages.map((l, i) => (
                          <div key={i}>
                            <span className="font-bold">{l.language}:</span> {l.proficiency}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* MODÈLE 3 : TECH BLUEPRINT (Ingénierie QA, timeline et badges) */}
          {/* ============================================================ */}
          {settings.template === "blueprint" && (
            <div className={`p-8 sm:p-10 ${sp.spaceY}`}>
              {/* Header axé Tech */}
              <div className="pb-5 border-b-2" style={{ borderColor: accent.hex }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div
                      className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider mb-1"
                      style={{ backgroundColor: accent.hex, color: "#fff" }}
                    >
                      {labels.sysProfile}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {personalInfo.fullName || "Votre Nom"}
                    </h1>
                    <p className="text-sm font-bold" style={{ color: accent.hex }}>
                      {personalInfo.jobTitle || "Titre"}
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 text-left sm:text-right font-mono">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                  </div>
                </div>
              </div>

              {/* Résumé de synthèse */}
              {professionalSummary.summary && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 cv-section-block break-inside-avoid">
                  <div className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                    {labels.missionStatement}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed text-justify">
                    {professionalSummary.summary}
                  </p>
                </div>
              )}

              {/* Grille technique */}
              {technicalSkills.length > 0 && (
                <div className="space-y-2 cv-section-block break-inside-avoid">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
                    <span style={{ color: accent.hex }}>#</span>
                    <span>{labels.techStack}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {technicalSkills.map((cat, i) => (
                      <div key={i} className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-1">
                        <div className="font-bold text-[11px] text-slate-900">{cat.category}</div>
                        <div className="flex flex-wrap gap-1">
                          {cat.skills.map((s, si) => (
                            <span
                              key={si}
                              className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 border border-slate-200"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline d'expériences */}
              {experiences.length > 0 && (
                <div className="space-y-3 cv-section-block">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
                    <span style={{ color: accent.hex }}>#</span>
                    <span>{labels.workHistory}</span>
                  </div>
                  <div className="space-y-3.5 border-l-2 pl-3.5 ml-1" style={{ borderColor: accent.hex }}>
                    {experiences.map((exp, i) => (
                      <div key={i} className="space-y-1 text-xs cv-item-block break-inside-avoid relative">
                        <div
                          className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white"
                          style={{ backgroundColor: accent.hex }}
                        />
                        <div className="flex items-baseline justify-between font-bold text-slate-900">
                          <span className="text-sm font-bold">{exp.role}</span>
                          <span className="text-[11px] font-mono text-slate-500 font-normal">
                            [{exp.startDate} - {exp.current ? labels.presentUpper : exp.endDate}]
                          </span>
                        </div>
                        <div className="font-semibold text-slate-600">{exp.company}</div>
                        {exp.description && (
                          <p className="text-slate-700 leading-relaxed text-xs">{exp.description}</p>
                        )}
                        {exp.achievements && exp.achievements.filter(Boolean).length > 0 && (
                          <ul className="space-y-1 pt-1">
                            {exp.achievements.filter(Boolean).map((ach, achI) => (
                              <li key={achI} className="flex items-start space-x-1.5 text-xs text-slate-700">
                                <span className="text-emerald-600 font-bold">✓</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formation, Projets & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 cv-section-block break-inside-avoid">
                {education.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                      {labels.academicDegrees}
                    </div>
                    {education.map((edu, i) => (
                      <div key={i} className="text-xs border-l-2 border-slate-200 pl-2 space-y-0.5">
                        <div className="font-bold text-slate-900">{edu.degree}</div>
                        <div className="text-slate-600">{edu.institution}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {edu.startDate} - {edu.endDate || labels.present}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {certifications.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                      {labels.certificationsBlueprint}
                    </div>
                    {certifications.map((c, i) => (
                      <div key={i} className="text-xs border-l-2 border-slate-200 pl-2 space-y-0.5">
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-slate-600 text-[11px]">{c.issuer}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

CVPreview.displayName = "CVPreview"
