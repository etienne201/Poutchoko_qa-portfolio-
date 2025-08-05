"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, ChevronDown, FileText, Loader2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function CVDownload() {
  const { t } = useLanguage()
  const [isDownloading, setIsDownloading] = useState<string | null>(null)

  const downloadCV = async (language: "en" | "fr") => {
    setIsDownloading(language)

    try {
      // Simulate PDF generation delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const fileName = language === "en" ? "cv-etienne-poutchoko-en.txt" : "cv-etienne-poutchoko-fr.txt"
      const downloadName = language === "en" ? "Etienne_Poutchoko_CV_English.pdf" : "Etienne_Poutchoko_CV_Francais.pdf"

      const link = document.createElement("a")
      link.href = `/${fileName}`
      link.download = downloadName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(null)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="backdrop-blur-xl bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          disabled={isDownloading !== null}
        >
          {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
          {t("cv.download")}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10"
      >
        <DropdownMenuItem
          onClick={() => downloadCV("en")}
          className="cursor-pointer text-white hover:bg-white/10"
          disabled={isDownloading === "en"}
        >
          {isDownloading === "en" ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <FileText className="w-4 h-4 mr-2" />
          )}
          <span className="mr-2">🇺🇸</span>
          {t("cv.downloadEn")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => downloadCV("fr")}
          className="cursor-pointer text-white hover:bg-white/10"
          disabled={isDownloading === "fr"}
        >
          {isDownloading === "fr" ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <FileText className="w-4 h-4 mr-2" />
          )}
          <span className="mr-2">🇫🇷</span>
          {t("cv.downloadFr")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
