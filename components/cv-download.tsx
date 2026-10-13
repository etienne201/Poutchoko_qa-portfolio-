"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Download,
  ChevronDown,
  FileText,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
  Eye,
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { CVModal } from "@/components/cv-modal"

interface CVDownloadProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function CVDownload({
  variant = "outline",
  size = "lg",
  className = "",
}: CVDownloadProps) {
  const { t, language } = useLanguage()
  const [downloadedLang, setDownloadedLang] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isEn = language === "en"
  const currentFileName = isEn
    ? "CV_Poutchoko_Emako_Etienne_EN.pdf"
    : "CV_Poutchoko_Emako_Etienne_FR.pdf"

  const handleDownload = (lang: "en" | "fr") => {
    const fileName =
      lang === "en"
        ? "CV_Poutchoko_Emako_Etienne_EN.pdf"
        : "CV_Poutchoko_Emako_Etienne_FR.pdf"

    const link = document.createElement("a")
    link.href = `/${fileName}`
    link.download = fileName
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setDownloadedLang(lang)
    setTimeout(() => setDownloadedLang(null), 3000)
  }

  const handleCurrentDownload = () => {
    handleDownload(isEn ? "en" : "fr")
  }

  return (
    <>
      <div className="inline-flex items-center gap-2">
        {/* Bouton Consultation directe « Voir mon CV » */}
        <Button
          size={size}
          variant="default"
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] px-5 flex items-center group"
          id="btn-view-cv"
        >
          <Eye className="w-4 h-4 mr-2 text-sky-200 group-hover:scale-110 transition-transform flex-shrink-0" />
          <span>{t("cv.viewCta")}</span>
        </Button>

        {/* Menu déroulant pour téléchargement et options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={size}
              variant={variant}
              className={`group border-slate-300/80 dark:border-white/[0.12] hover:border-slate-400 dark:hover:border-white/[0.25] bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] backdrop-blur-md text-slate-800 dark:text-white rounded-xl transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] min-h-[44px] ${className}`}
              id="btn-download-cv-menu"
              aria-label={t("cv.downloadCta")}
            >
              <Download className="w-4 h-4 mr-2 text-sky-600 dark:text-sky-400 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
              <span className="hidden sm:inline">{t("cv.downloadCta")}</span>
              <span className="sm:hidden">PDF</span>
              <ChevronDown className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-80 bg-white/95 dark:bg-[#0e1922]/95 backdrop-blur-xl border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl shadow-xl dark:shadow-elevated p-2 space-y-1 z-50"
          >
            {/* Action 1 : Téléchargement PDF dans la langue active du portfolio */}
            <DropdownMenuItem
              onClick={handleCurrentDownload}
              className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-2.5 bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 text-sky-800 dark:text-sky-200 border border-sky-200/80 dark:border-sky-500/25 transition-colors"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className="text-base" aria-hidden="true">
                  {isEn ? "🇬🇧" : "🇫🇷"}
                </span>
                <div className="text-left min-w-0">
                  <div className="font-bold text-xs truncate">
                    {t("cv.downloadAction")}
                  </div>
                  <div className="text-[11px] opacity-80 font-mono truncate">
                    {currentFileName}
                  </div>
                </div>
              </div>
              {downloadedLang === (isEn ? "en" : "fr") ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-2" />
              ) : (
                <Download className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0 ml-2" />
              )}
            </DropdownMenuItem>

            {/* Action 2 : Téléchargement dans l'autre langue si besoin */}
            <DropdownMenuItem
              onClick={() => handleDownload(isEn ? "fr" : "en")}
              className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300 transition-colors"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className="text-base" aria-hidden="true">
                  {isEn ? "🇫🇷" : "🇬🇧"}
                </span>
                <div className="text-left min-w-0">
                  <div className="font-semibold text-xs truncate">
                    {isEn ? "Télécharger CV (Français)" : "Download Resume (English)"}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                    {isEn ? "CV_Poutchoko_Emako_Etienne_FR.pdf" : "CV_Poutchoko_Emako_Etienne_EN.pdf"}
                  </div>
                </div>
              </div>
              <FileText className="w-4 h-4 opacity-50 flex-shrink-0 ml-2" />
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-200/80 dark:bg-white/[0.08] my-1" />

            {/* Action 3 : Consultation plein écran / permalien */}
            <DropdownMenuItem asChild>
              <Link
                href="/cv"
                className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-medium">
                    {isEn ? "Open Resume page (/cv)" : "Page de consultation (/cv)"}
                  </span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-white/[0.08] text-slate-500 font-mono">
                  URL
                </span>
              </Link>
            </DropdownMenuItem>

            {/* Action 4 : Studio CV & Créateur */}
            <DropdownMenuItem asChild>
              <Link
                href="/cv-builder"
                className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium">Studio CV &amp; Personnalisation</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                  PRO
                </span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Modal de consultation immédiate sans téléchargement obligatoire */}
      <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
