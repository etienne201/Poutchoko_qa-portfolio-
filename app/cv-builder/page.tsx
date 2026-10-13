"use client"
import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { LanguageProvider } from "@/hooks/use-language"
import { CVData, CVSettings } from "@/types/cv"
import {
  defaultEtienneCV,
  defaultEtienneCV_FR,
  defaultEtienneCV_EN,
  emptyCV,
  calculateCVScore,
} from "@/lib/cv-data"
import { CVScoreCard } from "@/components/cv-builder/cv-score-card"
import { CVToolbar } from "@/components/cv-builder/cv-toolbar"
import { CVFormEditor } from "@/components/cv-builder/cv-form-editor"
import { CVPreview } from "@/components/cv-builder/cv-preview"
import { CVExportModal } from "@/components/cv-builder/cv-export-modal"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Eye,
  Edit3,
  ZoomIn,
  ZoomOut,
  FileText,
  Printer,
} from "lucide-react"

function CVBuilderInner() {
  const [cvData, setCvData] = useState<CVData>(defaultEtienneCV)
  const [activeSection, setActiveSection] = useState<string>("personal")
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor")
  const [previewScale, setPreviewScale] = useState<number>(0.85)
  const [isSaved, setIsSaved] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false)
  const printRef = useRef<HTMLDivElement>(null)

  // 1. Chargement initial depuis localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_cv_data_v2")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.personalInfo) {
          setCvData(parsed)
        }
      }
    } catch (e) {
      console.warn("Could not load CV data from localStorage", e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // 2. Sauvegarde automatique dans localStorage
  useEffect(() => {
    if (!isLoaded) return
    setIsSaved(false)
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem("portfolio_cv_data_v2", JSON.stringify(cvData))
        setIsSaved(true)
      } catch (e) {
        console.warn("Could not save CV to localStorage", e)
      }
    }, 600)
    return () => clearTimeout(timeout)
  }, [cvData, isLoaded])

  // Ajustement du zoom initial selon la taille de fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPreviewScale(0.48)
      } else if (window.innerWidth < 1280) {
        setPreviewScale(0.68)
      } else {
        setPreviewScale(0.85)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calcul du score intelligent
  const report = calculateCVScore(cvData)

  // Helpers pour la toolbar
  const handleUpdateSettings = (newSettings: Partial<CVSettings>) => {
    setCvData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      },
    }))
  }

  const handleExportPDF = () => {
    if (typeof window !== "undefined") {
      const originalTitle = document.title
      const safeName = (cvData.personalInfo.fullName || "CV").replace(/\s+/g, "_")
      const safeRole = (cvData.personalInfo.jobTitle || "Resume").replace(/\s+/g, "_")
      document.title = `${safeName}_${safeRole}_CV`
      window.print()
      setTimeout(() => {
        document.title = originalTitle
      }, 1000)
    }
  }

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2))
    const downloadAnchor = document.createElement("a")
    const safeName = (cvData.personalInfo.fullName || "CV").replace(/\s+/g, "_")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `${safeName}_CV_Data.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleImportJSON = (imported: CVData) => {
    setCvData(imported)
    alert("Votre CV a été importé avec succès !")
  }

  const handleResetToDefault = () => {
    if (confirm("Voulez-vous charger le profil officiel d'Étienne Poutchoko ? Vos modifications actuelles seront écrasées.")) {
      setCvData(defaultEtienneCV)
    }
  }

  const handleLoadProfileLanguage = (lang: "fr" | "en") => {
    if (lang === "en") {
      setCvData(defaultEtienneCV_EN)
    } else {
      setCvData(defaultEtienneCV_FR)
    }
  }

  const handleResetToEmpty = () => {
    if (confirm("Voulez-vous réinitialiser le formulaire pour démarrer un CV vierge ?")) {
      setCvData(emptyCV)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100/90 dark:bg-[#081018] text-slate-900 dark:text-white flex flex-col selection:bg-primary/20 selection:text-primary print:bg-white print:p-0">
      {/* ============================================================ */}
      {/* NAVBAR DU STUDIO CV (no-print) */}
      {/* ============================================================ */}
      <header className="no-print sticky top-0 z-40 bg-white/90 dark:bg-[#0e1922]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au portfolio</span>
            </Link>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  Studio CV &amp; Créateur Professionnel
                </h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Création, personnalisation en temps réel &amp; export PDF conforme ATS
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Bascule Mobile Éditeur / Aperçu */}
            <div className="xl:hidden flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-white/[0.06] border border-slate-300 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => setMobileView("editor")}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  mobileView === "editor"
                    ? "bg-white dark:bg-white/[0.12] text-primary shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Formulaire</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileView("preview")}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  mobileView === "preview"
                    ? "bg-white dark:bg-white/[0.12] text-primary shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Aperçu</span>
              </button>
            </div>

            {/* Bouton Export PDF rapide */}
            <Button
              type="button"
              size="sm"
              onClick={() => setIsExportModalOpen(true)}
              className="text-xs h-8 px-3.5 bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Télécharger / Exporter</span>
              <span className="sm:hidden">Exporter</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* CONTENU PRINCIPAL : SPLIT-SCREEN SUR DESKTOP */}
      {/* ============================================================ */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-6 space-y-4 print:p-0 print:m-0 print:max-w-none">
        {/* Barre d'outils et sélecteurs de style */}
        <CVToolbar
          settings={cvData.settings}
          onUpdateSettings={handleUpdateSettings}
          onExportPDF={handleExportPDF}
          onExportJSON={handleExportJSON}
          onImportJSON={handleImportJSON}
          onResetToDefault={handleResetToDefault}
          onResetToEmpty={handleResetToEmpty}
          onLoadProfileLanguage={handleLoadProfileLanguage}
          isSaved={isSaved}
          onOpenExportModal={() => setIsExportModalOpen(true)}
        />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start print:block">
          {/* ============================================================ */}
          {/* COLONNE GAUCHE (55% sur grand écran) : ÉDITEUR & SCORE (no-print) */}
          {/* ============================================================ */}
          <div
            className={`no-print xl:col-span-6 space-y-5 ${
              mobileView === "preview" ? "hidden xl:block" : "block"
            }`}
          >
            {/* Jauge de complétion et recommandations */}
            <CVScoreCard
              report={report}
              onSelectSection={(secId) => {
                setActiveSection(secId)
                if (mobileView === "preview") setMobileView("editor")
              }}
              activeSection={activeSection}
            />

            {/* Formulaires d'édition des 11 sections */}
            <CVFormEditor
              data={cvData}
              onChange={setCvData}
              activeSection={activeSection}
              onSectionSelect={setActiveSection}
            />
          </div>

          {/* ============================================================ */}
          {/* COLONNE DROITE (45% sur grand écran) : PRÉVISUALISATION A4 */}
          {/* ============================================================ */}
          <div
            className={`xl:col-span-6 space-y-3 sticky top-20 print:static print:w-full ${
              mobileView === "editor" ? "hidden xl:block" : "block"
            }`}
          >
            {/* Barre de contrôle du zoom d'aperçu */}
            <div className="no-print flex items-center justify-between p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] backdrop-blur-md text-xs">
              <div className="flex items-center space-x-2">
                <Eye className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Aperçu Temps Réel (Format A4)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {Math.round(previewScale * 100)}%
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setPreviewScale((s) => Math.max(0.4, Number((s - 0.1).toFixed(2))))}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300"
                  title="Zoom arrière"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewScale(0.85)}
                  className="px-2 py-1 text-[11px] font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300"
                  title="Réinitialiser zoom"
                >
                  Fit
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewScale((s) => Math.min(1.2, Number((s + 0.1).toFixed(2))))}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300"
                  title="Zoom avant"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Conteneur d'affichage de la feuille A4 */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-200/50 dark:bg-[#0b141d] p-3 sm:p-5 overflow-auto max-h-[calc(100vh-140px)] flex justify-center shadow-inner print:border-none print:p-0 print:bg-white print:overflow-visible print:max-h-none print:shadow-none">
              <CVPreview ref={printRef} data={cvData} scale={previewScale} />
            </div>
          </div>
        </div>
      </main>

      {/* Modal d'exportation de haute fidélité */}
      <CVExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={cvData}
        onPrint={handleExportPDF}
      />
    </div>
  )
}

export default function CVBuilderPage() {
  return (
    <LanguageProvider>
      <CVBuilderInner />
    </LanguageProvider>
  )
}
