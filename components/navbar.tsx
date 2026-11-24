"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ArrowUpRight, Command } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/hooks/use-language"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { OBSERVED_SECTION_IDS } from "@/config/navigation"
import { Button } from "@/components/ui/button"
import { DesktopNavPills } from "@/components/navigation/desktop-nav-pills"
import { CVHubMenu } from "@/components/navigation/cv-hub-menu"
import { ScrollProgressBar } from "@/components/navigation/scroll-progress-bar"
import { MobileNavDrawer } from "@/components/navigation/mobile-nav-drawer"
import { useCommandPalette } from "@/components/navigation/command-palette-provider"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openPalette } = useCommandPalette()
  const pathname = usePathname()
  const isHome = pathname === "/"
  const { t } = useLanguage()

  const activeSection = useScrollSpy(OBSERVED_SECTION_IDS, isHome)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 28)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        id="navbar"
        className={`no-print fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 ${
          isScrolled ? "pt-2 sm:pt-2.5" : "pt-3 sm:pt-4"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Navigation principale"
            className={`relative flex items-center justify-between gap-2 transition-all duration-300 rounded-2xl px-3 sm:px-4 ${
              isScrolled
                ? "py-2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-lg shadow-slate-900/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-black/[0.03] dark:ring-white/[0.06]"
                : "py-2.5 bg-white/80 dark:bg-slate-950/85 backdrop-blur-xl border border-slate-200/70 dark:border-white/10 shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
            }`}
          >
            {/* 1. BRANDING + Indicateur discret de disponibilité */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="relative shrink-0">
                <Logo size={36} className="shrink-0" />
                <span
                  title={t("nav.available")}
                  className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
                </span>
              </div>

              <div className="hidden sm:flex flex-col text-left leading-tight shrink-0 select-none">
                <Link href="/" className="group block">
                  <span className="font-extrabold text-xs sm:text-[13px] tracking-tight text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-400 transition-colors block whitespace-nowrap">
                    {t("nav.brand")}
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-300 font-medium tracking-wide whitespace-nowrap">
                    {t("nav.role")}
                  </span>
                </Link>
              </div>
            </div>

            {/* 2. NAVIGATION DESKTOP (Pilules sémantiques <a> + layoutId) */}
            <DesktopNavPills activeSection={activeSection} isHome={isHome} />

            {/* 3. ACTIONS INTELLIGENTES (⌘K + Hub CV + Langue + Thème + CTA + Drawer) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Trigger Palette de Commandes (⌘K) */}
              <button
                type="button"
                onClick={openPalette}
                aria-label={t("nav.commandOpen")}
                title={t("nav.commandOpen")}
                className="hidden md:inline-flex items-center gap-1.5 h-9 px-2.5 rounded-xl bg-slate-100/90 dark:bg-[#0c1722] hover:bg-slate-200/90 dark:hover:bg-[#132230] border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-[11px] font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
              >
                <Command className="w-3.5 h-3.5 text-slate-400" />
                <span>K</span>
              </button>

              {/* Menu Hub CV (visible dès 1024px) */}
              <CVHubMenu />

              {/* Sélecteur de Langue (FR / EN) */}
              <LanguageToggle />

              {/* Basculeur de Thème */}
              <ThemeToggle />

              {/* CTA Contact Principal Desktop */}
              <Button
                asChild
                size="sm"
                className="hidden lg:inline-flex items-center gap-1.5 h-9 bg-primary hover:bg-primary/95 text-primary-foreground dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 dark:hover:from-sky-400 dark:hover:to-blue-500 dark:text-white dark:border dark:border-sky-400/30 font-bold text-xs rounded-xl px-3.5 shadow-accent dark:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <Link href={isHome ? "#contact" : "/#contact"}>
                  <span>{t("nav.contact")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </Button>

              {/* Bouton Drawer Mobile & Tablette (<1024px) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden h-9 w-9 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-[#0c1722] hover:bg-slate-200/90 dark:hover:bg-[#132230] border border-slate-200/80 dark:border-white/10 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 shadow-xs"
                aria-label={t("nav.openMenu")}
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>

            {/* Barre de progression de lecture (Home uniquement) */}
            {isHome && <ScrollProgressBar />}
          </nav>
        </div>
      </header>

      {/* Drawer Mobile Accessible (Radix Dialog + Focus Trap) */}
      <MobileNavDrawer
        open={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        activeSection={activeSection}
        isHome={isHome}
        onOpenCommandPalette={openPalette}
      />
    </>
  )
}
