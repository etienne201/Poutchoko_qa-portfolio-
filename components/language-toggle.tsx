"use client"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "fr" : "en")}
      className="h-9 px-3 font-medium text-white/60 hover:text-white hover:bg-white/10 flex items-center gap-2 transition-all duration-300"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-semibold">
        {language === "en" ? `${t("lang.flag.fr")} ${t("lang.text.fr")}` : `${t("lang.flag.en")} ${t("lang.text.en")}`}
      </span>
    </Button>
  )
}
