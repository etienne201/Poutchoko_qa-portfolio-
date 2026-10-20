"use client"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { Logo } from "@/components/logo"
import {
  Linkedin,
  MessageSquare,
  Mail,
  Phone,
  FileDown,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowUp,
  Sliders,
} from "lucide-react"

export function Footer() {
  const { t, language } = useLanguage()

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const cvPdfUrl =
    language === "en"
      ? "/CV_Poutchoko_Emako_Etienne_EN.pdf"
      : "/CV_Poutchoko_Emako_Etienne_FR.pdf"
  const cvPdfFilename =
    language === "en"
      ? "CV_Poutchoko_Emako_Etienne_EN.pdf"
      : "CV_Poutchoko_Emako_Etienne_FR.pdf"

  return (
    <footer className="pt-14 sm:pt-20 pb-[max(7.5rem,calc(5.5rem+env(safe-area-inset-bottom)))] md:pb-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#081018]/65 backdrop-blur-md relative text-left">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-slate-200/80 dark:border-white/[0.08]">
          {/* Column 1: Identity, Role, Value Prop & Location (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3.5">
              <Logo size={42} />
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight leading-snug">
                  {t("footer.name")}
                </h3>
                <p className="text-[11px] sm:text-xs text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider">
                  {t("footer.role")}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm sm:max-w-md leading-relaxed">
              {t("footer.desc")}
            </p>

            <div className="inline-flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-white/[0.04] px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-white/[0.06]">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="truncate">{t("footer.location")}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (md:col-span-3) - 2-cols on mobile for ergonomic thumb reach */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>{t("footer.navTitle")}</span>
            </h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link
                  href="#about"
                  className="hover:text-primary dark:hover:text-sky-400 transition-colors py-1 inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover:bg-primary transition-colors"></span>
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="#expertise"
                  className="hover:text-primary dark:hover:text-sky-400 transition-colors py-1 inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover:bg-primary transition-colors"></span>
                  {t("nav.expertise")}
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="hover:text-primary dark:hover:text-sky-400 transition-colors py-1 inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover:bg-primary transition-colors"></span>
                  {t("nav.experience")}
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="hover:text-primary dark:hover:text-sky-400 transition-colors py-1 inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover:bg-primary transition-colors"></span>
                  {t("nav.skills")}
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="hover:text-primary dark:hover:text-sky-400 transition-colors py-1 inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover:bg-primary transition-colors"></span>
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="#education"
                  className="hover:text-primary dark:hover:text-sky-400 transition-colors py-1 inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover:bg-primary transition-colors"></span>
                  {t("nav.education")}
                </Link>
              </li>
              <li className="col-span-2 md:col-span-1">
                <Link
                  href="#contact"
                  className="hover:text-primary dark:hover:text-sky-400 transition-colors py-1 inline-flex items-center gap-1.5 group font-semibold text-primary dark:text-sky-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Socials & Quick Resume Hub (md:col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t("footer.channelsTitle")}
            </h4>

            {/* Social Icons with Apple/WCAG Compliant 44px Tap Targets */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:border-blue-500 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 transition-all shadow-sm flex items-center justify-center active:scale-95 touch-manipulation"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile - Étienne Poutchoko Emako"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/237657268355"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:border-emerald-500 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/10 transition-all shadow-sm flex items-center justify-center active:scale-95 touch-manipulation"
                title="WhatsApp Direct"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href="mailto:poutchokoetienne@gmail.com"
                className="w-11 h-11 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:border-sky-500 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-500/10 transition-all shadow-sm flex items-center justify-center active:scale-95 touch-manipulation"
                title="Email Direct"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="tel:+237657268355"
                className="w-11 h-11 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:border-indigo-500 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 transition-all shadow-sm flex items-center justify-center active:scale-95 touch-manipulation"
                title="Call"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Action Badges / CV Hub */}
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/cv"
                className="group flex items-center justify-between px-3.5 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/15 border border-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-semibold transition-all active:scale-[0.99]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                  <span>{t("cv.viewCta")}</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-800 dark:text-sky-200">
                  Online
                </span>
              </Link>

              <a
                href={cvPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={cvPdfFilename}
                className="group flex items-center justify-between px-3.5 py-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all active:scale-[0.99]"
              >
                <span className="flex items-center gap-2">
                  <FileDown className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{t("cv.downloadCta")}</span>
                </span>
                <span className="text-[10px] uppercase font-mono text-slate-400">PDF</span>
              </a>

              <Link
                href="/cv-builder"
                className="group flex items-center justify-between px-3.5 py-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-all active:scale-[0.99]"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{t("footer.cvStudio")}</span>
                </span>
                <span className="text-[10px] text-slate-400">Studio</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Tagline & Back-to-Top Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p className="text-center sm:text-left order-2 sm:order-1">
            © {new Date().getFullYear()} {t("footer.name")}. {t("footer.rights")}
          </p>

          <div className="flex items-center justify-between w-full sm:w-auto gap-4 order-1 sm:order-2">
            <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
              <span className="font-medium text-[11px] sm:text-xs">{t("footer.tagline")}</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200/60 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all hover:-translate-y-0.5 active:scale-95 touch-manipulation"
              title={t("footer.backToTop")}
              aria-label={t("footer.backToTop")}
            >
              <span>{t("footer.backToTop")}</span>
              <ArrowUp className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
