export interface PortfolioSectionItem {
  id: string
  href: `#${string}`
  labelKey: string
  num: string
  showInDesktopBar: boolean
}

export const PORTFOLIO_SECTIONS: readonly PortfolioSectionItem[] = [
  { id: "about", href: "#about", labelKey: "nav.about", num: "01", showInDesktopBar: true },
  { id: "expertise", href: "#expertise", labelKey: "nav.expertise", num: "02", showInDesktopBar: true },
  { id: "experience", href: "#experience", labelKey: "nav.experience", num: "03", showInDesktopBar: true },
  { id: "skills", href: "#skills", labelKey: "nav.skills", num: "04", showInDesktopBar: true },
  { id: "projects", href: "#projects", labelKey: "nav.projects", num: "05", showInDesktopBar: true },
  { id: "education", href: "#education", labelKey: "nav.education", num: "06", showInDesktopBar: true },
  { id: "contact", href: "#contact", labelKey: "nav.contact", num: "07", showInDesktopBar: false },
] as const

export const DESKTOP_SECTION_ITEMS = PORTFOLIO_SECTIONS.filter((item) => item.showInDesktopBar)

export const OBSERVED_SECTION_IDS = PORTFOLIO_SECTIONS.map((item) => item.id)

export const CONTACT_INFO = {
  email: "poutchokoetienne@gmail.com",
  phone: "+237657268355",
  whatsapp: "https://wa.me/237657268355",
  linkedin: "https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184/",
  github: "https://github.com/etienne201",
} as const
