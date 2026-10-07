"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, ChevronDown, FileText, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface CVDownloadProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function CVDownload({ variant = "outline", size = "lg", className = "" }: CVDownloadProps) {
  const { t } = useLanguage()
  const [downloadedLang, setDownloadedLang] = useState<string | null>(null)

  const handleDownload = (lang: "en" | "fr") => {
    const fileName = lang === "en" ? "Etienne_Poutchoko_CV_EN.pdf" : "Etienne_Poutchoko_CV_FR.pdf"
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={size}
          variant={variant}
          className={`group border-slate-300/80 dark:border-white/[0.12] hover:border-slate-400 dark:hover:border-white/[0.25] bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] backdrop-blur-md text-slate-800 dark:text-white rounded-xl transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] min-h-[44px] ${className}`}
        >
          <Download className="w-4 h-4 mr-2 text-primary group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
          <span>{t("hero.cta.cv")}</span>
          <ChevronDown className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-white/95 dark:bg-[#0e1922]/95 backdrop-blur-xl border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-xl shadow-xl dark:shadow-elevated p-1.5"
      >
        <DropdownMenuItem
          onClick={() => handleDownload("en")}
          className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <div className="flex items-center space-x-2.5 min-w-0">
            <span className="text-base" aria-hidden="true">🇺🇸</span>
            <div className="text-left min-w-0">
              <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                {t("cv.enTitle")}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {t("cv.enSubtitle")}
              </div>
            </div>
          </div>
          {downloadedLang === "en" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 ml-2" />
          ) : (
            <FileText className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleDownload("fr")}
          className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <div className="flex items-center space-x-2.5 min-w-0">
            <span className="text-base" aria-hidden="true">🇫🇷</span>
            <div className="text-left min-w-0">
              <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                {t("cv.frTitle")}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {t("cv.frSubtitle")}
              </div>
            </div>
          </div>
          {downloadedLang === "fr" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 ml-2" />
          ) : (
            <FileText className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
