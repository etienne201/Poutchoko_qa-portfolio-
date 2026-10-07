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
} from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="pt-16 sm:pt-20 pb-24 md:pb-16 px-3.5 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/95 dark:bg-[#081018]/95 relative text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 sm:pb-12 border-b border-slate-200/80 dark:border-white/[0.08]">
          {/* Identity & Role */}
          <div className="md:col-span-5 space-y-3.5 sm:space-y-4">
            <div className="flex items-center space-x-3.5">
              <Logo size={40} />
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                  {t("footer.name")}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                  {t("footer.role")}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
              {t("footer.desc")}
            </p>

            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{t("footer.location")}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t("footer.navTitle")}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors py-0.5 inline-block">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="#expertise" className="hover:text-slate-900 dark:hover:text-white transition-colors py-0.5 inline-block">
                  {t("nav.expertise")}
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors py-0.5 inline-block">
                  {t("nav.experience")}
                </Link>
              </li>
              <li>
                <Link href="#skills" className="hover:text-slate-900 dark:hover:text-white transition-colors py-0.5 inline-block">
                  {t("nav.skills")}
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors py-0.5 inline-block">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link href="#education" className="hover:text-slate-900 dark:hover:text-white transition-colors py-0.5 inline-block">
                  {t("nav.education")}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors py-0.5 inline-block">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Connect & CV */}
          <div className="md:col-span-4 space-y-3.5 sm:space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t("footer.channelsTitle")}
            </h4>
            <div className="flex items-center space-x-2.5">
              <a
                href="https://linkedin.com/in/etienne-poutchoko-emako"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:border-blue-500 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all shadow-sm min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/237657268355"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:border-emerald-500 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all shadow-sm min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:poutchokoetienne@gmail.com"
                className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:border-sky-500 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all shadow-sm min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="Email"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+237657268355"
                className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:border-indigo-500 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all shadow-sm min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="Call"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="/Etienne_Poutchoko_CV_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Etienne_Poutchoko_CV_EN.pdf"
                className="inline-flex items-center text-xs text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-0.5"
              >
                <FileDown className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
                <span>{t("footer.cvEn")}</span>
              </a>
              <br />
              <a
                href="/Etienne_Poutchoko_CV_FR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Etienne_Poutchoko_CV_FR.pdf"
                className="inline-flex items-center text-xs text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-0.5"
              >
                <FileDown className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
                <span>{t("footer.cvFr")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} {t("footer.name")}. {t("footer.rights")}</p>
          <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
            <span>{t("footer.tagline")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
