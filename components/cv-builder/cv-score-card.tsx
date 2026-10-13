"use client"
import React from "react"
import { CVCompletionReport, SectionStatus } from "@/types/cv"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

interface CVScoreCardProps {
  report: CVCompletionReport
  onSelectSection?: (sectionId: string) => void
  activeSection?: string
}

export function CVScoreCard({
  report,
  onSelectSection,
  activeSection,
}: CVScoreCardProps) {
  const { score, sections, recommendations } = report

  // Couleur dynamique selon le score
  const getScoreColor = (val: number) => {
    if (val >= 85) return "text-emerald-500 stroke-emerald-500"
    if (val >= 60) return "text-sky-500 stroke-sky-500"
    if (val >= 35) return "text-amber-500 stroke-amber-500"
    return "text-rose-500 stroke-rose-500"
  }

  const getScoreBadge = (val: number) => {
    if (val >= 90) return { label: "Excellent / Prêt pour l'embauche", bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" }
    if (val >= 75) return { label: "Très solide / Bonne complétion", bg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" }
    if (val >= 50) return { label: "En progression / Quelques manques", bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" }
    return { label: "Incomplet / Informations requises", bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" }
  }

  const badgeInfo = getScoreBadge(score)

  // Circonférence pour le cercle SVG
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const renderStatusIcon = (status: SectionStatus, isOptional?: boolean) => {
    if (isOptional && status === "empty") {
      return <HelpCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
    }
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
      case "in_progress":
        return <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
      case "empty":
      default:
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
    }
  }

  return (
    <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 dark:border-white/[0.08] shadow-card space-y-5">
      {/* En-tête Score */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-slate-200 dark:stroke-white/[0.08]"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className={`${getScoreColor(score)} transition-all duration-700 ease-out`}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                {score}%
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Complétion
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Indicateur de Qualité CV
              </h3>
            </div>
            <div
              className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeInfo.bg}`}
            >
              {badgeInfo.label}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
              Calculé d&apos;après les standards de recrutement tech &amp; ATS.
            </p>
          </div>
        </div>
      </div>

      {/* Grille d'état par rubrique */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Rubriques &amp; Progression</span>
          <span>{sections.filter((s) => s.status === "complete").length}/{sections.length}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection?.(sec.id)}
                className={`flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all border ${
                  isActive
                    ? "bg-primary/10 border-primary text-slate-900 dark:text-white font-medium"
                    : "bg-slate-50/70 dark:bg-white/[0.03] border-slate-200/60 dark:border-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  {renderStatusIcon(sec.status, sec.isOptional)}
                  <span className="truncate">{sec.title}</span>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                  {sec.weight > 0 && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {sec.earned}/{sec.weight}pts
                    </span>
                  )}
                  {sec.isOptional && (
                    <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-slate-200/60 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400">
                      Option
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Recommandations intelligentes */}
      {recommendations.length > 0 && (
        <div className="p-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>Recommandations d&apos;optimisation :</span>
          </div>
          <ul className="space-y-1.5">
            {recommendations.slice(0, 3).map((rec, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-600 dark:text-slate-300 flex items-start space-x-1.5 leading-relaxed"
              >
                <ArrowRight className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
