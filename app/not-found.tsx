import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#081018] text-slate-900 dark:text-white">
      <div className="max-w-md w-full text-center space-y-4 p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl shadow-card">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
          <FileQuestion className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black tracking-tight">Page introuvable</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-accent transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
