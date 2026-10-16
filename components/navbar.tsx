"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/hooks/use-language"
import { Menu, X, ArrowUpRight, FileText, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const { t } = useLanguage()

  // Détection fluide du scroll et mise à jour de la section active
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)

      const sectionIds = ["about", "expertise", "experience", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 220

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Verrouillage du scroll quand le menu mobile est ouvert & gestion de la touche Échap
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = "hidden"

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => {
        document.body.style.overflow = originalStyle
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [isMobileMenuOpen])

  // Navigation fluide
  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith("#")) {
      const el = document.querySelector(href)
      if (el) {
        const navHeight = 90
        const elementPosition = el.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  }, [])

  // Sections pour la barre centrale desktop (le Contact est promu en CTA d'action principal)
  const desktopNavItems = [
    { href: "#about", label: t("nav.about"), id: "about" },
    { href: "#expertise", label: t("nav.expertise"), id: "expertise" },
    { href: "#experience", label: t("nav.experience"), id: "experience" },
    { href: "#skills", label: t("nav.skills"), id: "skills" },
    { href: "#projects", label: t("nav.projects"), id: "projects" },
    { href: "#education", label: t("nav.education"), id: "education" },
  ]

  // Menu mobile complet (inclut Contact)
  const mobileNavItems = [
    { href: "#about", label: t("nav.about"), id: "about", num: "01" },
    { href: "#expertise", label: t("nav.expertise"), id: "expertise", num: "02" },
    { href: "#experience", label: t("nav.experience"), id: "experience", num: "03" },
    { href: "#skills", label: t("nav.skills"), id: "skills", num: "04" },
    { href: "#projects", label: t("nav.projects"), id: "projects", num: "05" },
    { href: "#education", label: t("nav.education"), id: "education", num: "06" },
    { href: "#contact", label: t("nav.contact"), id: "contact", num: "07" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-3 sm:pt-4">
      <div className="max-w-7xl mx-auto">
        <nav
          aria-label="Navigation principale"
          className={`relative flex items-center justify-between transition-all duration-300 rounded-2xl px-3 sm:px-5 py-2.5 ${
            isScrolled
              ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-lg shadow-slate-900/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-black/[0.03] dark:ring-white/[0.06]"
              : "bg-white/80 dark:bg-slate-950/85 backdrop-blur-xl border border-slate-200/70 dark:border-white/10 shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
          }`}
        >
          {/* ================================================================= */}
          {/* 1. BRANDING (Logo + Identité) : Anti-collapse flex container */}
          {/* ================================================================= */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <Logo size={38} className="shrink-0" />
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

          {/* ================================================================= */}
          {/* 2. NAVIGATION DESKTOP (1024px et +) : Pilules interactives */}
          {/* ================================================================= */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-2 py-1 rounded-xl bg-slate-100/60 dark:bg-[#0c1722]/80 border border-slate-200/60 dark:border-white/[0.08]">
            {desktopNavItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-xs px-2.5 xl:px-3 py-1.5 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap ${
                    isActive
                      ? "text-primary dark:text-sky-300 bg-white dark:bg-sky-500/15 border border-slate-200/80 dark:border-sky-500/30 shadow-xs dark:shadow-[0_0_12px_rgba(56,189,248,0.15)] font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.06] font-medium"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* ================================================================= */}
          {/* 3. ACTIONS & HUBS (Disponibilité + CV + Langue + Thème + CTA) */}
          {/* ================================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Badge de disponibilité : Texte complet sur XL, compact sur LG */}
            <div
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/25 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-medium whitespace-nowrap shrink-0 dark:shadow-[0_0_12px_rgba(16,185,129,0.12)]"
              title={t("nav.available")}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden xl:inline">{t("nav.availableBadge")}</span>
              <span className="inline xl:hidden">{t("nav.shortAvailable")}</span>
            </div>

            {/* Bouton direct "Voir mon CV" sur grands écrans */}
            <Link
              href="/cv"
              className="hidden 2xl:inline-flex items-center gap-1.5 h-9 text-xs font-bold px-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/20 dark:border-sky-500/30 transition-all shadow-xs shrink-0"
              title={t("cv.viewCta")}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t("cv.viewCta")}</span>
            </Link>

            {/* Sélecteur de Langue segmenté (FR / EN) */}
            <LanguageToggle />

            {/* Basculeur de Thème (Clair / Sombre) */}
            <ThemeToggle />

            {/* CTA Contact Principal sur Desktop */}
            <Button
              size="sm"
              onClick={() => handleNavClick("#contact")}
              className="hidden lg:inline-flex items-center gap-1.5 h-9 bg-primary hover:bg-primary/95 text-primary-foreground dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 dark:hover:from-sky-400 dark:hover:to-blue-500 dark:text-white dark:border dark:border-sky-400/30 font-bold text-xs rounded-xl px-3.5 shadow-accent dark:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>{t("nav.contact")}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>

            {/* Bouton Hamburger Mobile & Tablette (<1024px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-[#0c1722] hover:bg-slate-200/90 dark:hover:bg-[#132230] border border-slate-200/80 dark:border-white/10 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 shadow-xs"
              aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 transition-transform duration-200 rotate-90 animate-in" />
              ) : (
                <Menu className="w-4 h-4 transition-transform duration-200" />
              )}
            </button>
          </div>
        </nav>

        {/* ================================================================= */}
        {/* 4. MENU MOBILE & TABLETTE (Drawer / Overlay Glassmorphism) */}
        {/* ================================================================= */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop plein écran estompé */}
            <div
              className="lg:hidden fixed inset-0 top-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-md z-40 transition-opacity animate-in fade-in duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panneau de navigation déroulant premium */}
            <div
              id="mobile-navigation-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu mobile"
              className="lg:hidden relative z-50 mt-2 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.08)] animate-in fade-in zoom-in-95 duration-200 max-h-[calc(100vh-90px)] overflow-y-auto"
            >
              {/* En-tête Statut Disponibilité */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-300 leading-tight">
                      {t("nav.availableBadge")}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {t("nav.badgeRemote")}
                    </p>
                  </div>
                </div>

                <div className="px-2 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-300 border border-slate-200/60 dark:border-white/[0.08]">
                  QA-PORTFOLIO
                </div>
              </div>

              {/* Liste verticale des sections */}
              <div className="flex flex-col gap-1 py-1">
                {mobileNavItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 ${
                        isActive
                          ? "bg-primary/10 dark:bg-sky-500/15 text-primary dark:text-sky-300 font-bold border border-primary/20 dark:border-sky-500/30 shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/[0.06] font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400">
                          {item.num}
                        </span>
                        <span className="text-sm tracking-tight">{item.label}</span>
                      </div>
                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-primary dark:text-sky-400 shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Accès Rapides et CTA */}
              <div className="pt-3.5 mt-3.5 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-2">
                <Link
                  href="/cv"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 h-11 bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold text-sm rounded-xl border border-sky-500/25 dark:border-sky-500/30 transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t("cv.viewCta")}</span>
                </Link>

                <Link
                  href="/cv-builder"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 h-11 bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-900/90 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm rounded-xl border border-slate-200 dark:border-white/10 transition-colors shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t("nav.cvStudio")}</span>
                </Link>

                <Button
                  size="default"
                  onClick={() => handleNavClick("#contact")}
                  className="w-full h-11 bg-primary hover:bg-primary/95 text-primary-foreground dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 dark:hover:from-sky-400 dark:hover:to-blue-500 dark:text-white dark:border dark:border-sky-400/30 font-bold text-sm rounded-xl shadow-accent dark:shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center justify-center gap-2 mt-1"
                >
                  <span>{t("hero.cta.contact")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Signature / Versioning */}
              <div className="pt-3 mt-3 text-center">
                <p className="text-[11px] text-slate-400 dark:text-slate-400 font-mono">
                  {t("hero.subtitle")}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
