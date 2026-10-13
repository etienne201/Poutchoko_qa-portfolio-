"use client"
import React, { useState } from "react"
import Link from "next/link"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useLanguage } from "@/hooks/use-language"
import { CVViewer } from "@/components/cv-viewer"
import {
  Download,
  X,
  Printer,
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
} from "lucide-react"

interface CVModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CVModal({ isOpen, onClose }: CVModalProps) {
  const { language, setLanguage, t } = useLanguage()
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const isEn = language === "en"
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
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col bg-slate-100 dark:bg-[#070d14] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200 overflow-hidden"
          aria-describedby={undefined}
        >
          {/* Barre d'action supérieure sticky (Screen only) */}
          <header className="flex-shrink-0 sticky top-0 z-30 bg-white/95 dark:bg-[#081018]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.1] px-4 py-3 sm:px-6 shadow-sm flex items-center justify-between gap-3">
            {/* Gauche : Retour et Titre */}
            <div className="flex items-center space-x-3 min-w-0">
              <button
                type="button"
                onClick={onClose}
                className="p-2 -ml-1 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors flex items-center space-x-1.5"
                title={t("cv.backPortfolio")}
                aria-label={t("cv.backPortfolio")}
              >
                <ArrowLeft className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline text-xs font-semibold">
                  {t("cv.backPortfolio")}
                </span>
              </button>

              <div className="min-w-0">
                <DialogPrimitive.Title className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate flex items-center gap-2">
                  <span>{t("cv.viewModalTitle")}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    {isEn ? "EN" : "FR"}
                  </span>
                </DialogPrimitive.Title>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block truncate">
                  {t("cv.directDownloadNotice")}
                </p>
              </div>
            </div>

            {/* Droite : Bouton langue, Téléchargement PDF, Impression, Fermeture */}
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

              {/* Bouton Téléchargement PDF officiel dans la langue active */}
              <button
                type="button"
                onClick={handleDownload}
                className="px-3 sm:px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-98 text-white font-semibold text-xs transition-all shadow-md flex items-center space-x-2 min-h-[36px]"
                title={fileName}
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
                className="hidden md:flex p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors items-center justify-center min-h-[36px] min-w-[36px]"
                title={t("cv.print")}
                aria-label={t("cv.print")}
              >
                <Printer className="w-4 h-4" />
              </button>

              {/* Plein écran / Permalien /cv */}
              <Link
                href="/cv"
                className="hidden lg:flex p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors items-center justify-center min-h-[36px] min-w-[36px]"
                title={t("cv.openNewTab")}
                aria-label={t("cv.openNewTab")}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>

              {/* Bouton Fermer */}
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                  aria-label={t("cv.close")}
                >
                  <X className="w-5 h-5" />
                </button>
              </DialogPrimitive.Close>
            </div>
          </header>

          {/* Corps de défilement pour la consultation */}
          <div className="flex-1 overflow-y-auto px-3.5 sm:px-6 py-6 md:py-10">
            <CVViewer variant="paper" />
            
            {/* Pied de consultation */}
            <div className="max-w-4xl mx-auto mt-6 text-center text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 px-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                <span>{fileName}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="text-sky-600 dark:text-sky-400 font-semibold hover:underline"
                >
                  {t("cv.downloadAction")}
                </button>
                <span>•</span>
                <Link href="/cv-builder" className="hover:underline">
                  Studio CV
                </Link>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
