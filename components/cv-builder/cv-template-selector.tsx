"use client"
import React from "react"
import { CVTemplateId } from "@/types/cv"
import { Check, Sparkles, ShieldCheck, Cpu } from "lucide-react"

interface CVTemplateSelectorProps {
  currentTemplate: CVTemplateId
  onSelect: (template: CVTemplateId) => void
}

export function CVTemplateSelector({
  currentTemplate,
  onSelect,
}: CVTemplateSelectorProps) {
  const templates: {
    id: CVTemplateId
    title: string
    subtitle: string
    badge: string
    icon: React.ElementType
    description: string
    previewType: "modern" | "ats" | "blueprint"
  }[] = [
    {
      id: "modern",
      title: "Moderne Executive",
      subtitle: "2 Colonnes & En-tête Valorisé",
      badge: "Recommandé Recruteurs",
      icon: Sparkles,
      description:
        "Disposition équilibrée à 2 colonnes avec bandeau coloré, sidebar de compétences et hiérarchie visuelle premium.",
      previewType: "modern",
    },
    {
      id: "ats",
      title: "Minimalist ATS",
      subtitle: "1 Colonne Standard International",
      badge: "100% Conforme ATS",
      icon: ShieldCheck,
      description:
        "Design épuré et séquentiel, conçu pour un parsing infaillible par les robots de recrutement et cabinets RH.",
      previewType: "ats",
    },
    {
      id: "blueprint",
      title: "Tech Blueprint",
      subtitle: "Ingénierie QA & Timeline Impact",
      badge: "Profils Tech & Automatisation",
      icon: Cpu,
      description:
        "Style axé ingénierie logicielle avec timeline technique, métriques de couverture de test et tags monospace.",
      previewType: "blueprint",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
      {templates.map((tpl) => {
        const isSelected = currentTemplate === tpl.id
        const Icon = tpl.icon
        return (
          <div
            key={tpl.id}
            onClick={() => onSelect(tpl.id)}
            className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border text-left flex flex-col justify-between relative group ${
              isSelected
                ? "bg-primary/[0.08] dark:bg-primary/[0.12] border-primary shadow-accent scale-[1.01]"
                : "bg-white/90 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15] hover:bg-slate-50 dark:hover:bg-white/[0.05]"
            }`}
          >
            {/* Header de la carte */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isSelected
                      ? "bg-primary text-white border-primary"
                      : "bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/[0.08]"
                  }`}
                >
                  {tpl.badge}
                </span>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? "bg-primary border-primary text-white"
                      : "border-slate-300 dark:border-white/[0.2] text-transparent group-hover:border-slate-400"
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              {/* Silhouette miniature du template */}
              <div className="h-20 w-full rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06] p-2 flex items-center justify-center overflow-hidden">
                {tpl.previewType === "modern" && (
                  <div className="w-full h-full bg-white dark:bg-slate-900 rounded shadow-xs flex flex-col overflow-hidden border border-slate-200 dark:border-white/10">
                    <div className="h-3.5 bg-primary/80 w-full flex items-center px-1">
                      <div className="w-8 h-1 bg-white/80 rounded-xs" />
                    </div>
                    <div className="flex-1 grid grid-cols-12 gap-1 p-1">
                      <div className="col-span-4 bg-slate-100 dark:bg-white/5 rounded-xs space-y-1 p-0.5">
                        <div className="w-full h-1 bg-slate-300 dark:bg-white/20 rounded-xs" />
                        <div className="w-3/4 h-1 bg-slate-200 dark:bg-white/10 rounded-xs" />
                      </div>
                      <div className="col-span-8 space-y-1 p-0.5">
                        <div className="w-full h-1 bg-slate-300 dark:bg-white/20 rounded-xs" />
                        <div className="w-5/6 h-1 bg-slate-200 dark:bg-white/10 rounded-xs" />
                        <div className="w-2/3 h-1 bg-slate-200 dark:bg-white/10 rounded-xs" />
                      </div>
                    </div>
                  </div>
                )}

                {tpl.previewType === "ats" && (
                  <div className="w-full h-full bg-white dark:bg-slate-900 rounded shadow-xs p-1.5 flex flex-col justify-between border border-slate-200 dark:border-white/10">
                    <div className="flex flex-col items-center space-y-0.5 pb-1 border-b border-slate-200 dark:border-white/10">
                      <div className="w-16 h-1.5 bg-slate-800 dark:bg-white/70 rounded-xs" />
                      <div className="w-10 h-1 bg-primary/70 rounded-xs" />
                    </div>
                    <div className="space-y-1">
                      <div className="w-full h-1 bg-slate-300 dark:bg-white/20 rounded-xs" />
                      <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-xs" />
                      <div className="w-4/5 h-1 bg-slate-200 dark:bg-white/10 rounded-xs" />
                    </div>
                  </div>
                )}

                {tpl.previewType === "blueprint" && (
                  <div className="w-full h-full bg-white dark:bg-slate-900 rounded shadow-xs p-1.5 flex flex-col justify-between border-t-2 border-primary border-x border-b border-slate-200 dark:border-white/10">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-white/10">
                      <div className="w-12 h-1.5 bg-slate-800 dark:bg-white/70 rounded-xs" />
                      <div className="w-6 h-1 bg-primary/80 rounded-xs" />
                    </div>
                    <div className="flex space-x-1 pl-1 border-l border-primary">
                      <div className="space-y-1 flex-1">
                        <div className="w-full h-1 bg-slate-300 dark:bg-white/20 rounded-xs" />
                        <div className="w-3/4 h-1 bg-slate-200 dark:bg-white/10 rounded-xs" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center space-x-1.5 font-bold text-sm text-slate-900 dark:text-white">
                  <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{tpl.title}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {tpl.subtitle}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {tpl.description}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-xs">
              <span
                className={`font-semibold ${
                  isSelected ? "text-primary font-bold" : "text-slate-500"
                }`}
              >
                {isSelected ? "Actuellement sélectionné" : "Cliquer pour activer"}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
