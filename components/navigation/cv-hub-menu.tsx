"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, FileDown, FileText, Sparkles } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CVHubMenu() {
  const { t, language } = useLanguage()
  const pathname = usePathname()
  const isCVRoute = pathname === "/cv" || pathname === "/cv-builder"

  const cvPdfUrl =
    language === "en"
      ? "/CV_Poutchoko_Emako_Etienne_EN.pdf"
      : "/CV_Poutchoko_Emako_Etienne_FR.pdf"
  const cvPdfFilename =
    language === "en"
      ? "CV_Poutchoko_Emako_Etienne_EN.pdf"
      : "CV_Poutchoko_Emako_Etienne_FR.pdf"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`hidden lg:inline-flex items-center gap-1.5 h-9 px-2.5 xl:px-3 rounded-xl text-xs font-semibold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap shrink-0 ${
            isCVRoute
              ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/35 shadow-xs"
              : "bg-sky-500/10 hover:bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/20 dark:border-sky-500/30"
          }`}
          aria-label={t("nav.cvHub")}
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span>CV</span>
          <ChevronDown className="w-3 h-3 opacity-75 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 p-1.5 rounded-2xl bg-white/95 dark:bg-[#0c1722]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-elevated"
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {t("nav.cvHub")}
        </DropdownMenuLabel>

        <DropdownMenuItem asChild className="rounded-xl p-0 focus:bg-transparent">
          <Link
            href="/cv"
            className="flex items-center gap-3 w-full px-2.5 py-2 rounded-xl hover:bg-slate-100/90 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {t("cv.viewCta")}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {language === "en" ? "Interactive ATS view (EN/FR)" : "Vue interactive ATS (FR/EN)"}
              </div>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="rounded-xl p-0 focus:bg-transparent">
          <a
            href={cvPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={cvPdfFilename}
            className="flex items-center gap-3 w-full px-2.5 py-2 rounded-xl hover:bg-slate-100/90 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <FileDown className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {t("cv.downloadCta")}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                PDF • {language.toUpperCase()}
              </div>
            </div>
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5 bg-slate-200/80 dark:bg-white/10" />

        <DropdownMenuItem asChild className="rounded-xl p-0 focus:bg-transparent">
          <Link
            href="/cv-builder"
            className="flex items-center gap-3 w-full px-2.5 py-2 rounded-xl hover:bg-slate-100/90 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {t("nav.cvStudio")}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {language === "en" ? "Live editor & A4 export" : "Éditeur temps réel & export A4"}
              </div>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
