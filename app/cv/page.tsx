"use client"
import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useLanguage, LanguageProvider } from "@/hooks/use-language"
import { CVViewer } from "@/components/cv-viewer"
import {
  Download,
  Printer,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react"

function CVPageContent() {
  const { language, setLanguage, t } = useLanguage()
  const searchParams = useSearchParams()
  const langQuery = searchParams.get("lang")
  const activeLang = (langQuery === "en" || langQuery === "fr") ? langQuery : language
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  // Synchronisation avec le paramètre d'URL ?lang=fr|en si présent
  useEffect(() => {
    if (langQuery === "en" || langQuery === "fr") {
      setLanguage(langQuery)
    }
  }, [langQuery, setLanguage])

  const isEn = activeLang === "en"
  const fileName = isEn
    ? "CV_Poutchoko_Emako_Etienne_EN.pdf"
    : "CV_Poutchoko_Emako_Etienne_FR.pdf"

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = `/${fileName}`
    link.download = fileName
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 3000)
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  const toggleLanguage = () => {
    setLanguage(isEn ? "fr" : "en")
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#070d14] text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Barre d'action supérieure sticky (masquée en impression) */}
      <header className="cv-page-header no-print sticky top-0 z-40 bg-white/95 dark:bg-[#081018]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.1] px-4 py-3 sm:px-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Gauche : Retour au Portfolio & Titre */}
          <div className="flex items-center space-x-3 min-w-0">
            <Link
              href="/"
              className="p-2 -ml-1 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-5 h-5 flex-shrink-0" />
              <span className="hidden sm:inline text-xs font-semibold">
                {t("cv.backPortfolio")}
              </span>
            </Link>

            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate flex items-center gap-2">
                <span>{t("cv.viewModalTitle")}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  {isEn ? "EN" : "FR"}
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block truncate">
                {t("cv.directDownloadNotice")}
              </p>
            </div>
          </div>

          {/* Droite : Bouton langue, Téléchargement PDF, Impression */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Bascule rapide de langue FR / EN */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-800 dark:text-white border border-slate-200 dark:border-white/[0.1] text-xs font-bold transition-all flex items-center space-x-1.5 min-h-[36px]"
              title={isEn ? "Basculer en français" : "Switch to English"}
            >
              <span className="text-sm">{isEn ? "🇫🇷" : "🇬🇧"}</span>
              <span className="hidden xs:inline">{isEn ? "FR" : "EN"}</span>
            </button>

            {/* Téléchargement PDF dans la langue active */}
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-98 text-white font-semibold text-xs transition-all shadow-md flex items-center space-x-2 min-h-[36px]"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-pulse flex-shrink-0" />
                  <span className="hidden sm:inline">{t("cv.downloadSuccess")}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 flex-shrink-0" />
                  <span>{t("cv.downloadAction")}</span>
                </>
              )}
            </button>

            {/* Imprimer */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors flex items-center justify-center min-h-[36px] min-w-[36px]"
              title={t("cv.print")}
              aria-label={t("cv.print")}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal de consultation */}
      <main className="flex-1 px-3.5 sm:px-6 py-6 md:py-10 print:p-0 print:m-0">
        <CVViewer variant="paper" lang={activeLang} />
      </main>

      {/* Pied de page */}
      <footer className="cv-page-footer no-print py-6 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>{fileName}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/" className="hover:underline">
              {t("cv.backPortfolio")}
            </Link>
            <span>•</span>
            <Link href="/cv-builder" className="hover:underline">
              Studio CV
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function CVPage() {
  return (
    <LanguageProvider>
      <Suspense fallback={null}>
        <CVPageContent />
      </Suspense>
    </LanguageProvider>
  )
}
