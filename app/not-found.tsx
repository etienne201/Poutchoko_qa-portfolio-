"use client"

import Link from "next/link"
import { ArrowLeft, Command, FileQuestion, FileText } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useCommandPalette } from "@/components/navigation/command-palette-provider"

export default function NotFound() {
  const { language } = useLanguage()
  const { openPalette } = useCommandPalette()
  const isEn = language === "en"

  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#081018] text-slate-900 dark:text-white"
    >
      <div className="max-w-md w-full text-center space-y-5 p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-[#0e1922]/85 backdrop-blur-xl shadow-card">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
          <FileQuestion className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <p className="text-[11px] font-mono uppercase tracking-widest text-primary">
            HTTP 404
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {isEn ? "Page not found" : "Page introuvable"}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isEn
              ? "The page you are looking for does not exist or has been moved."
              : "La page que vous recherchez n'existe pas ou a été déplacée."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-accent transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isEn ? "Back to Home" : "Retour à l'accueil"}</span>
          </Link>

          <Link
            href="/cv"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/20 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isEn ? "View Resume" : "Voir le CV"}</span>
          </Link>
        </div>

        <div className="pt-2 border-t border-slate-200/80 dark:border-white/10">
          <button
            type="button"
            onClick={openPalette}
            className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors"
          >
            <Command className="w-3.5 h-3.5" />
            <span>{isEn ? "Press ⌘K to jump anywhere" : "Appuyez sur ⌘K pour naviguer"}</span>
          </button>
        </div>
      </div>
    </main>
  )
}
