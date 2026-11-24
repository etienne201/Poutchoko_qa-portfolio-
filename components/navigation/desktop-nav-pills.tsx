"use client"

import Link from "next/link"
import { m } from "motion/react"
import { useLanguage } from "@/hooks/use-language"
import { DESKTOP_SECTION_ITEMS } from "@/config/navigation"

interface DesktopNavPillsProps {
  activeSection: string
  isHome: boolean
}

export function DesktopNavPills({ activeSection, isHome }: DesktopNavPillsProps) {
  const { t } = useLanguage()

  return (
    <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-1.5 py-1 rounded-xl bg-slate-100/70 dark:bg-[#0c1722]/85 border border-slate-200/70 dark:border-white/[0.08]">
      {DESKTOP_SECTION_ITEMS.map((item) => {
        const isActive = isHome && activeSection === item.id
        const href = isHome ? item.href : `/${item.href}`

        return (
          <li key={item.id} className="relative">
            <Link
              href={href}
              aria-current={isActive ? "location" : undefined}
              className={`relative z-10 block text-xs px-2.5 xl:px-3 py-1.5 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap ${
                isActive
                  ? "text-primary dark:text-sky-300 font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium"
              }`}
            >
              {isActive && (
                <m.span
                  layoutId="desktop-nav-active-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 -z-10 rounded-lg bg-white dark:bg-sky-500/15 border border-slate-200/80 dark:border-sky-500/30 shadow-xs dark:shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                />
              )}
              {t(item.labelKey)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
