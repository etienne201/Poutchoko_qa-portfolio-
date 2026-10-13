"use client"
import { MessageSquare, Phone, Mail, FileDown } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function MobileContactBar() {
  const { t, language } = useLanguage()

  const waText = encodeURIComponent(
    language === "fr"
      ? "Bonjour Étienne, je consulte votre portfolio QA et souhaiterais échanger avec vous."
      : "Hello Étienne, I visited your QA portfolio and would like to connect with you.",
  )
  const mailSubject = encodeURIComponent(
    language === "fr"
      ? "Opportunité QA Automation - Portfolio"
      : "QA Automation Opportunity - Portfolio",
  )
  const cvFile =
    language === "fr"
      ? "CV_Poutchoko_Emako_Etienne_FR.pdf"
      : "CV_Poutchoko_Emako_Etienne_EN.pdf"

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-2.5 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] bg-white/95 dark:bg-[#081018]/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/[0.08] shadow-lg dark:shadow-elevated">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/237657268355?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 active:scale-95 transition-transform shadow-sm min-h-[44px]"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 flex-shrink-0" />
          <span className="text-[10px] font-semibold truncate max-w-full">{t("mobile.whatsapp")}</span>
        </a>

        {/* Call */}
        <a
          href="tel:+237657268355"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-primary/10 text-primary border border-primary/20 active:scale-95 transition-transform shadow-sm min-h-[44px]"
        >
          <Phone className="w-4 h-4 mb-0.5 flex-shrink-0" />
          <span className="text-[10px] font-semibold truncate max-w-full">{t("mobile.call")}</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:poutchokoetienne@gmail.com?subject=${mailSubject}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 active:scale-95 transition-transform shadow-sm min-h-[44px]"
        >
          <Mail className="w-4 h-4 mb-0.5 flex-shrink-0" />
          <span className="text-[10px] font-semibold truncate max-w-full">{t("mobile.email")}</span>
        </a>

        {/* Consultation & Téléchargement CV */}
        <a
          href="/cv"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20 active:scale-95 transition-transform shadow-sm min-h-[44px]"
          title={`${t("cv.viewCta")} — ${cvFile}`}
        >
          <FileDown className="w-4 h-4 mb-0.5 flex-shrink-0 text-sky-600 dark:text-sky-400" />
          <span className="text-[10px] font-semibold truncate max-w-full">{t("cv.viewCta")}</span>
        </a>
      </div>
    </div>
  )
}
