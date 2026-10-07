"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/hooks/use-language"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      const sections = ["about", "expertise", "experience", "skills", "projects", "education", "contact"]
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#about", label: t("nav.about"), id: "about" },
    { href: "#expertise", label: t("nav.expertise"), id: "expertise" },
    { href: "#experience", label: t("nav.experience"), id: "experience" },
    { href: "#skills", label: t("nav.skills"), id: "skills" },
    { href: "#projects", label: t("nav.projects"), id: "projects" },
    { href: "#education", label: t("nav.education"), id: "education" },
    { href: "#contact", label: t("nav.contact"), id: "contact" },
  ]

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-3 sm:pt-4">
      <div className="max-w-7xl mx-auto">
        <nav
          aria-label="Navigation principale"
          className={`flex items-center justify-between transition-all duration-300 rounded-2xl px-3 sm:px-6 py-2 sm:py-3 ${
            isScrolled
              ? "bg-white/85 dark:bg-[#081018]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-card"
              : "bg-white/60 dark:bg-[#081018]/50 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.05]"
          }`}
        >
          {/* Logo & Name */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0">
            <Logo size={40} />
            <div className="hidden sm:block min-w-0">
              <Link href="/" className="group block text-left">
                <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors block truncate">
                  {t("nav.brand")}
                </span>
                <span className="block text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide truncate">
                  {t("nav.role")}
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center space-x-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap ${
                    isActive
                      ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/[0.12] shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Actions: Availability Pill + Lang + Theme + CTA */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 flex-shrink-0">
            {/* Availability status badge */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t("nav.availableBadge")}</span>
            </div>

            <LanguageToggle />
            <ThemeToggle />

            {/* Quick Contact CTA */}
            <Button
              size="sm"
              onClick={() => handleNavClick("#contact")}
              className="hidden lg:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs rounded-xl px-3.5 py-2 shadow-accent transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <span>{t("nav.contact")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[38px] min-w-[38px] flex items-center justify-center"
              aria-label={t("nav.toggleMenu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-2 p-4 rounded-2xl bg-white/95 dark:bg-[#081018]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mobile Availability info */}
            <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-200 dark:border-white/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="leading-snug">{t("nav.available")}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 px-3 py-2.5 rounded-lg transition-colors truncate"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <Button
                size="sm"
                onClick={() => handleNavClick("#contact")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl py-2.5 shadow-accent"
              >
                <span>{t("hero.cta.contact")}</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
