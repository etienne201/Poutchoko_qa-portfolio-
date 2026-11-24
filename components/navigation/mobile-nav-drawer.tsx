"use client"

import Link from "next/link"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ArrowUpRight, CheckCircle2, Command, FileText, Sparkles, X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { PORTFOLIO_SECTIONS } from "@/config/navigation"
import { Button } from "@/components/ui/button"

interface MobileNavDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeSection: string
  isHome: boolean
  onOpenCommandPalette: () => void
}

export function MobileNavDrawer({
  open,
  onOpenChange,
  activeSection,
  isHome,
  onOpenCommandPalette,
}: MobileNavDrawerProps) {
  const { t, language } = useLanguage()

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 dark:bg-black/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />

        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="lg:hidden fixed top-3 inset-x-3 sm:inset-x-6 z-50 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.08)] max-h-[calc(100dvh-24px)] overflow-y-auto focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          {/* En-tête Statut Disponibilité + Fermer */}
          <div className="flex items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div className="min-w-0">
                <DialogPrimitive.Title className="text-xs font-bold text-emerald-600 dark:text-emerald-300 leading-tight truncate">
                  {t("nav.availableBadge")}
                </DialogPrimitive.Title>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  {t("nav.badgeRemote")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false)
                  onOpenCommandPalette()
                }}
                className="inline-flex items-center gap-1.5 px-2.5 h-9 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] hover:bg-slate-200/90 dark:hover:bg-white/[0.12] text-slate-600 dark:text-slate-300 text-xs font-mono border border-slate-200/80 dark:border-white/10 transition-colors"
                aria-label={t("nav.commandOpen")}
              >
                <Command className="w-3.5 h-3.5" />
                <span>K</span>
              </button>

              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  aria-label={t("nav.closeMenu")}
                  className="h-9 w-9 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] hover:bg-slate-200/90 dark:hover:bg-white/[0.12] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </DialogPrimitive.Close>
            </div>
          </div>

          {/* Liste verticale des sections */}
          <nav aria-label={language === "en" ? "Mobile navigation" : "Navigation mobile"}>
            <ul className="flex flex-col gap-1 py-1">
              {PORTFOLIO_SECTIONS.map((item) => {
                const isActive = isHome && activeSection === item.id
                const href = isHome ? item.href : `/${item.href}`

                return (
                  <li key={item.id}>
                    <Link
                      href={href}
                      onClick={() => onOpenChange(false)}
                      aria-current={isActive ? "location" : undefined}
                      className={`flex items-center justify-between w-full px-3.5 py-2.5 min-h-[44px] rounded-xl text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? "bg-primary/10 dark:bg-sky-500/15 text-primary dark:text-sky-300 font-bold border border-primary/20 dark:border-sky-500/30 shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/[0.06] font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                          {item.num}
                        </span>
                        <span className="text-sm tracking-tight">{t(item.labelKey)}</span>
                      </div>
                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-primary dark:text-sky-400 shrink-0" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Accès Rapides et CTA */}
          <div className="pt-3.5 mt-3.5 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-2">
            <Link
              href="/cv"
              onClick={() => onOpenChange(false)}
              className="w-full flex items-center justify-center gap-2 h-11 bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold text-sm rounded-xl border border-sky-500/25 dark:border-sky-500/30 transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>{t("cv.viewCta")}</span>
            </Link>

            <Link
              href="/cv-builder"
              onClick={() => onOpenChange(false)}
              className="w-full flex items-center justify-center gap-2 h-11 bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-900/90 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm rounded-xl border border-slate-200 dark:border-white/10 transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t("nav.cvStudio")}</span>
            </Link>

            <Button
              asChild
              size="default"
              className="w-full h-11 bg-primary hover:bg-primary/95 text-primary-foreground dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 dark:hover:from-sky-400 dark:hover:to-blue-500 dark:text-white dark:border dark:border-sky-400/30 font-bold text-sm rounded-xl shadow-accent dark:shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center justify-center gap-2 mt-1"
            >
              <Link href={isHome ? "#contact" : "/#contact"} onClick={() => onOpenChange(false)}>
                <span>{t("hero.cta.contact")}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Signature */}
          <div className="pt-3 mt-3 text-center">
            <p className="text-[11px] text-slate-400 dark:text-slate-400 font-mono">
              {t("hero.subtitle")}
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
