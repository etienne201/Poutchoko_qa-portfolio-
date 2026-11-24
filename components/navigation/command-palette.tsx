"use client"

import { useEffect, useMemo, useState, useCallback, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTheme } from "next-themes"
import {
  ArrowRight,
  Check,
  Copy,
  FileDown,
  FileText,
  Globe,
  Hash,
  Linkedin,
  MessageSquare,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { CONTACT_INFO, PORTFOLIO_SECTIONS } from "@/config/navigation"

interface CommandItem {
  id: string
  group: "sections" | "pages" | "actions"
  label: string
  hint?: string
  keywords: string
  icon: ReactNode
  onSelect: () => void
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { t, language, setLanguage } = useLanguage()
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const isHome = pathname === "/"
  const isDark = resolvedTheme === "dark"

  const closeAndRun = useCallback(
    (fn: () => void) => {
      onOpenChange(false)
      setQuery("")
      fn()
    },
    [onOpenChange],
  )

  const navigateToSection = useCallback(
    (href: `#${string}`) => {
      if (isHome) {
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
          window.history.replaceState(null, "", href)
          return
        }
      }
      router.push(`/${href}`)
    },
    [isHome, router],
  )

  const handleCopyEmail = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(CONTACT_INFO.email).catch(() => {})
    }
    setCopiedEmail(true)
    window.setTimeout(() => setCopiedEmail(false), 1800)
  }, [])

  const commands = useMemo<CommandItem[]>(() => {
    const cvPdfUrl =
      language === "en"
        ? "/CV_Poutchoko_Emako_Etienne_EN.pdf"
        : "/CV_Poutchoko_Emako_Etienne_FR.pdf"
    const cvPdfFilename =
      language === "en"
        ? "CV_Poutchoko_Emako_Etienne_EN.pdf"
        : "CV_Poutchoko_Emako_Etienne_FR.pdf"

    const sectionItems: CommandItem[] = PORTFOLIO_SECTIONS.map((sec) => ({
      id: `section-${sec.id}`,
      group: "sections",
      label: t(sec.labelKey),
      hint: sec.num,
      keywords: `${sec.id} ${sec.num} ${t(sec.labelKey)} section`,
      icon: <Hash className="w-4 h-4 text-sky-500" />,
      onSelect: () => closeAndRun(() => navigateToSection(sec.href)),
    }))

    const pageItems: CommandItem[] = [
      {
        id: "page-cv",
        group: "pages",
        label: t("cv.viewCta"),
        hint: "/cv",
        keywords: "cv resume curriculum vitae ats online",
        icon: <FileText className="w-4 h-4 text-sky-500" />,
        onSelect: () => closeAndRun(() => router.push("/cv")),
      },
      {
        id: "page-cv-builder",
        group: "pages",
        label: t("nav.cvStudio"),
        hint: "/cv-builder",
        keywords: "studio cv builder editor createur",
        icon: <Sparkles className="w-4 h-4 text-amber-500" />,
        onSelect: () => closeAndRun(() => router.push("/cv-builder")),
      },
      {
        id: "download-pdf",
        group: "pages",
        label: `${t("cv.downloadCta")} (${language.toUpperCase()})`,
        hint: "PDF",
        keywords: "download pdf telecharger cv resume",
        icon: <FileDown className="w-4 h-4 text-emerald-500" />,
        onSelect: () =>
          closeAndRun(() => {
            const link = document.createElement("a")
            link.href = cvPdfUrl
            link.download = cvPdfFilename
            link.target = "_blank"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }),
      },
    ]

    const actionItems: CommandItem[] = [
      {
        id: "action-copy-email",
        group: "actions",
        label: copiedEmail
          ? language === "en"
            ? "Email copied!"
            : "Email copié !"
          : language === "en"
            ? "Copy email address"
            : "Copier l'adresse email",
        hint: CONTACT_INFO.email,
        keywords: "copy email mail contact clipboard copier",
        icon: copiedEmail ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        ),
        onSelect: handleCopyEmail,
      },
      {
        id: "action-toggle-lang",
        group: "actions",
        label: language === "en" ? "Passer en Français (FR)" : "Switch to English (EN)",
        hint: language === "en" ? "FR" : "EN",
        keywords: "language langue french english fr en switch",
        icon: <Globe className="w-4 h-4 text-sky-500" />,
        onSelect: () => closeAndRun(() => setLanguage(language === "en" ? "fr" : "en")),
      },
      {
        id: "action-toggle-theme",
        group: "actions",
        label: isDark
          ? language === "en"
            ? "Switch to Light Mode"
            : "Passer en mode clair"
          : language === "en"
            ? "Switch to Dark Mode"
            : "Passer en mode sombre",
        hint: isDark ? "Light" : "Dark",
        keywords: "theme dark light mode sombre clair appearance",
        icon: isDark ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-500" />
        ),
        onSelect: () =>
          closeAndRun(() => {
            if (typeof document !== "undefined") {
              document.documentElement.classList.add("theme-transition")
              window.setTimeout(() => {
                document.documentElement.classList.remove("theme-transition")
              }, 320)
            }
            setTheme(isDark ? "light" : "dark")
          }),
      },
      {
        id: "action-linkedin",
        group: "actions",
        label: "LinkedIn",
        hint: "↗",
        keywords: "linkedin profile social network",
        icon: <Linkedin className="w-4 h-4 text-blue-500" />,
        onSelect: () => closeAndRun(() => window.open(CONTACT_INFO.linkedin, "_blank", "noopener,noreferrer")),
      },
      {
        id: "action-whatsapp",
        group: "actions",
        label: "WhatsApp Direct",
        hint: "↗",
        keywords: "whatsapp chat message phone",
        icon: <MessageSquare className="w-4 h-4 text-emerald-500" />,
        onSelect: () => closeAndRun(() => window.open(CONTACT_INFO.whatsapp, "_blank", "noopener,noreferrer")),
      },
    ]

    return [...sectionItems, ...pageItems, ...actionItems]
  }, [closeAndRun, copiedEmail, handleCopyEmail, isDark, language, navigateToSection, router, setLanguage, setTheme, t])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        (item.hint?.toLowerCase().includes(q) ?? false),
    )
  }, [commands, query])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query, open])

  // Raccourci global Cmd+K / Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) =>
        filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0,
      )
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault()
      filtered[selectedIndex].onSelect()
    }
  }

  const groupLabels: Record<CommandItem["group"], string> = {
    sections: language === "en" ? "Portfolio Sections" : "Sections du Portfolio",
    pages: language === "en" ? "Resume & Studio" : "CV & Studio",
    actions: language === "en" ? "Quick Actions" : "Actions Rapides",
  }

  const groups: CommandItem["group"][] = ["sections", "pages", "actions"]

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="no-print fixed inset-0 z-[70] bg-slate-950/60 dark:bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-150" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="no-print fixed left-1/2 top-[14%] sm:top-[18%] z-[70] w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 rounded-2xl bg-white/95 dark:bg-[#0c1722]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-2xl overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-150"
        >
          <DialogPrimitive.Title className="sr-only">
            {t("nav.commandOpen")}
          </DialogPrimitive.Title>

          {/* Barre de recherche */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200/80 dark:border-white/10">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={t("nav.commandPlaceholder")}
              autoFocus
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                aria-label={t("nav.closeMenu")}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </DialogPrimitive.Close>
          </div>

          {/* Résultats groupés */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-3">
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
                {t("nav.commandEmpty")}
              </p>
            ) : (
              groups.map((group) => {
                const items = filtered.filter((item) => item.group === group)
                if (items.length === 0) return null

                return (
                  <div key={group}>
                    <div className="px-2.5 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {groupLabels[group]}
                    </div>
                    <div className="space-y-0.5">
                      {items.map((item) => {
                        const globalIdx = filtered.indexOf(item)
                        const isSelected = globalIdx === selectedIndex
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            onClick={item.onSelect}
                            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                              isSelected
                                ? "bg-sky-500/10 dark:bg-sky-500/15 text-slate-950 dark:text-white border border-sky-500/25"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="shrink-0">{item.icon}</span>
                              <span className="font-medium truncate">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {item.hint && (
                                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                                  {item.hint}
                                </span>
                              )}
                              {isSelected && <ArrowRight className="w-3.5 h-3.5 text-primary" />}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Pied de palette : repères clavier */}
          <div className="px-4 py-2.5 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.02] flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-3">
              <span>↑↓ {language === "en" ? "Navigate" : "Naviguer"}</span>
              <span>↵ {language === "en" ? "Select" : "Ouvrir"}</span>
              <span>ESC {language === "en" ? "Close" : "Fermer"}</span>
            </div>
            <span className="text-sky-600 dark:text-sky-400">QA-CMD</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
