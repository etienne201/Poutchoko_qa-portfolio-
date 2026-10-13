"use client"
import React, { useRef, useState } from "react"
import {
  CVSettings,
  CVTemplateId,
  CVAccentColor,
  CVFontFamily,
  CVSpacing,
  CVData,
} from "@/types/cv"
import { CVTemplateSelector } from "@/components/cv-builder/cv-template-selector"
import { Button } from "@/components/ui/button"
import {
  Printer,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  LayoutTemplate,
  Palette,
  Type,
  Maximize2,
  Check,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Globe,
  ExternalLink,
} from "lucide-react"

interface CVToolbarProps {
  settings: CVSettings
  onUpdateSettings: (newSettings: Partial<CVSettings>) => void
  onExportPDF: () => void
  onExportJSON: () => void
  onImportJSON: (data: CVData) => void
  onResetToDefault: () => void
  onResetToEmpty: () => void
  onLoadProfileLanguage?: (lang: "fr" | "en") => void
  isSaved?: boolean
  onToggleFullscreen?: () => void
  onOpenExportModal?: () => void
}

export function CVToolbar({
  settings,
  onUpdateSettings,
  onExportPDF,
  onExportJSON,
  onImportJSON,
  onResetToDefault,
  onResetToEmpty,
  onLoadProfileLanguage,
  isSaved = true,
  onToggleFullscreen,
  onOpenExportModal,
}: CVToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showGallery, setShowGallery] = useState<boolean>(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (json && json.personalInfo) {
          onImportJSON(json)
        } else {
          alert("Format de fichier JSON CV invalide.")
        }
      } catch {
        alert("Impossible de lire ce fichier JSON.")
      }
    }
    reader.readAsText(file)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const templates: { id: CVTemplateId; label: string; desc: string }[] = [
    { id: "modern", label: "Moderne Executive", desc: "Design 2 colonnes soigné avec bandeau" },
    { id: "ats", label: "Minimalist ATS", desc: "Structure épurée optimisée pour robots RH" },
    { id: "blueprint", label: "Tech Blueprint", desc: "Format orienté ingénierie QA & métriques" },
  ]

  const accentColors: { id: CVAccentColor; label: string; class: string }[] = [
    { id: "ocean", label: "Slate Cyan", class: "bg-sky-500 ring-sky-500" },
    { id: "cobalt", label: "Bleu Cobalt", class: "bg-blue-600 ring-blue-600" },
    { id: "emerald", label: "Émeraude", class: "bg-emerald-500 ring-emerald-500" },
    { id: "indigo", label: "Indigo Royal", class: "bg-indigo-500 ring-indigo-500" },
    { id: "graphite", label: "Graphite Noir", class: "bg-slate-700 ring-slate-700" },
  ]

  const fontOptions: { id: CVFontFamily; label: string }[] = [
    { id: "inter", label: "Inter (Moderne & Épuré)" },
    { id: "sans", label: "System Sans (Technique)" },
    { id: "serif", label: "Élégant Serif (Cadre & Exécutif)" },
  ]

  const spacingOptions: { id: CVSpacing; label: string }[] = [
    { id: "compact", label: "Compact (Format 1 page stricte)" },
    { id: "normal", label: "Normal (Standard équilibré)" },
    { id: "relaxed", label: "Aéré (Haute lisibilité)" },
  ]

  return (
    <div className="rounded-2xl glass-panel p-4 border border-slate-200/80 dark:border-white/[0.08] shadow-card space-y-4 no-print">
      {/* Ligne 1 : Contrôles de style & Langue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        {/* Choix du Template avec bouton galerie */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <LayoutTemplate className="w-3.5 h-3.5 text-primary" />
              <span>Modèle de CV</span>
            </label>
            <button
              type="button"
              onClick={() => setShowGallery(!showGallery)}
              className="text-[11px] text-primary hover:underline font-semibold flex items-center space-x-0.5"
            >
              <span>Galerie</span>
              {showGallery ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-slate-100/80 dark:bg-white/[0.04] p-1 rounded-xl border border-slate-200/60 dark:border-white/[0.06]">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => onUpdateSettings({ template: tpl.id })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all truncate text-center ${
                  settings.template === tpl.id
                    ? "bg-white dark:bg-white/[0.12] text-slate-900 dark:text-white shadow-sm font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={tpl.desc}
              >
                {tpl.label.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Sélecteur de Langue du CV */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>Langue du CV</span>
          </label>
          <div className="grid grid-cols-2 gap-1 bg-slate-100/80 dark:bg-white/[0.04] p-1 rounded-xl border border-slate-200/60 dark:border-white/[0.06]">
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ language: "fr" })
                onLoadProfileLanguage?.("fr")
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center space-x-1.5 ${
                settings.language === "fr"
                  ? "bg-white dark:bg-white/[0.12] text-primary dark:text-sky-300 shadow-sm font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Basculer vers la version française officielle"
            >
              <span>🇫🇷</span>
              <span>Français</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ language: "en" })
                onLoadProfileLanguage?.("en")
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center space-x-1.5 ${
                settings.language === "en"
                  ? "bg-white dark:bg-white/[0.12] text-primary dark:text-sky-300 shadow-sm font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Switch to official English resume"
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>
        </div>

        {/* Couleurs d'accent */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
            <Palette className="w-3.5 h-3.5 text-primary" />
            <span>Couleur d&apos;accent</span>
          </label>
          <div className="flex items-center space-x-2 py-1">
            {accentColors.map((color) => {
              const isSelected = settings.accentColor === color.id
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => onUpdateSettings({ accentColor: color.id })}
                  className={`w-6 h-6 rounded-full ${color.class} transition-transform flex items-center justify-center ${
                    isSelected ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-110" : "opacity-80 hover:opacity-100"
                  }`}
                  title={color.label}
                  aria-label={color.label}
                >
                  {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Typographie */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
            <Type className="w-3.5 h-3.5 text-primary" />
            <span>Police &amp; Style</span>
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => onUpdateSettings({ fontFamily: e.target.value as CVFontFamily })}
            className="w-full text-xs py-1.5 px-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {fontOptions.map((f) => (
              <option key={f.id} value={f.id} className="dark:bg-slate-900">
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Densité */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Espacement / Densité
          </label>
          <select
            value={settings.spacing}
            onChange={(e) => onUpdateSettings({ spacing: e.target.value as CVSpacing })}
            className="w-full text-xs py-1.5 px-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {spacingOptions.map((s) => (
              <option key={s.id} value={s.id} className="dark:bg-slate-900">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Galerie visuelle dépliable */}
      {showGallery && (
        <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.06] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
            Sélectionnez votre modèle professionnel :
          </div>
          <CVTemplateSelector
            currentTemplate={settings.template}
            onSelect={(tplId) => {
              onUpdateSettings({ template: tplId })
              setShowGallery(false)
            }}
          />
        </div>
      )}

      {/* Ligne 2 : Actions principales et statut */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200/80 dark:border-white/[0.06]">
        {/* Statut de sauvegarde & profil */}
        <div className="flex items-center space-x-2">
          {isSaved ? (
            <span className="inline-flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <FileCheck className="w-3 h-3 mr-1" />
              Sauvegardé
            </span>
          ) : (
            <span className="text-[11px] text-amber-500 font-medium">Modifications en cours...</span>
          )}

          <button
            type="button"
            onClick={() => {
              onUpdateSettings({ language: "fr" })
              if (onLoadProfileLanguage) {
                onLoadProfileLanguage("fr")
              } else {
                onResetToDefault()
              }
            }}
            className="text-[11px] font-semibold text-primary hover:underline flex items-center space-x-1 px-2 py-0.5 rounded hover:bg-primary/10 transition-colors"
            title="Recharger le profil français certifié d'Étienne"
          >
            <Sparkles className="w-3 h-3" />
            <span>Profil FR</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onUpdateSettings({ language: "en" })
              onLoadProfileLanguage?.("en")
            }}
            className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center space-x-1 px-2 py-0.5 rounded hover:bg-sky-500/10 transition-colors"
            title="Load certified English profile for Étienne"
          >
            <Sparkles className="w-3 h-3" />
            <span>Profile EN</span>
          </button>

          <button
            type="button"
            onClick={onResetToEmpty}
            className="text-[11px] font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center space-x-1 px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            title="Effacer et démarrer un nouveau CV vierge"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Vierge</span>
          </button>

          {/* Liens rapides vers les fichiers HTML standalone */}
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <a
            href="/cv/cv-en.html"
            target="_blank"
            rel="noopener"
            className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary flex items-center space-x-1 px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            title="Ouvrir le fichier HTML standalone cv-en.html"
          >
            <span>HTML EN</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
          <a
            href="/cv/cv-fr.html"
            target="_blank"
            rel="noopener"
            className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary flex items-center space-x-1 px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            title="Ouvrir le fichier HTML standalone cv-fr.html"
          >
            <span>HTML FR</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
        </div>

        {/* Boutons d'export / import / print */}
        <div className="flex items-center space-x-2">
          {/* Import JSON */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs h-8 px-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08]"
            title="Importer une sauvegarde JSON"
          >
            <Upload className="w-3.5 h-3.5 mr-1" />
            <span>Importer</span>
          </Button>

          {/* Export JSON rapide */}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={onExportJSON}
            className="text-xs h-8 px-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08]"
            title="Sauvegarder les données en fichier JSON"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>JSON</span>
          </Button>

          {/* Plein écran Aperçu si fourni */}
          {onToggleFullscreen && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onToggleFullscreen}
              className="text-xs h-8 px-2.5 border-slate-300 dark:border-white/[0.1]"
              title="Agrandir l'aperçu"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </Button>
          )}

          {/* Téléchargement PDF / Impression A4 */}
          <Button
            type="button"
            size="sm"
            onClick={onOpenExportModal || onExportPDF}
            className="text-xs h-8 px-3.5 bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            <span>Télécharger / Exporter</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
