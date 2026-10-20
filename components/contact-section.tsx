"use client"
import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { TypewriterText } from "@/components/ui/typewriter-text"
import {
  Mail,
  Linkedin,
  Phone,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Clock,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  ChevronDown,
  ShieldCheck,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  const { t, language } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    requestType: "Recruitment (Full-time / Contract)",
    subject: "",
    message: "",
    website_hp: "", // Honeypot bot trap
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [submitResult, setSubmitResult] = useState<{
    status: "idle" | "success" | "fallback" | "error"
    message: string
    emailId?: string
    whatsappLink?: string
    mailtoLink?: string
    gmailLink?: string
    leadSummary?: {
      name: string
      email: string
      company: string
      requestType: string
      subject: string
      message: string
      referenceId: string
      date: string
    }
  }>({
    status: "idle",
    message: "",
  })

  const requestTypes = [
    { value: "Recruitment (Full-time / Contract)", label: t("contact.types.recruitment") },
    { value: "Freelance / QA Consulting", label: t("contact.types.freelance") },
    { value: "Test Automation Project", label: t("contact.types.automation") },
    { value: "Technical Discussion / Networking", label: t("contact.types.discussion") },
    { value: "Partnership / Collaboration", label: t("contact.types.collab") },
    { value: "Other Inquiry", label: t("contact.types.other") },
  ]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleResetForm = () => {
    setSubmitResult({ status: "idle", message: "" })
    setFormData({
      name: "",
      email: "",
      company: "",
      requestType: "Recruitment (Full-time / Contract)",
      subject: "",
      message: "",
      website_hp: "",
    })
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2500)
    } catch {
      // Fallback
    }
  }

  const handleCopySummary = async () => {
    const summary = submitResult.leadSummary
    const textToCopy = summary
      ? `Destinataire : poutchokoetienne@gmail.com\nRéf : ${summary.referenceId}\nObjet : ${summary.subject}\nDe : ${summary.name} (${summary.email})\nEntreprise : ${summary.company || "N/A"}\nType : ${summary.requestType}\nDate : ${summary.date}\n\nMessage :\n${summary.message}`
      : `Destinataire : poutchokoetienne@gmail.com\nObjet : ${formData.subject || "Contact Portfolio QA"}\nDe : ${formData.name} (${formData.email})\nEntreprise : ${formData.company || "N/A"}\nType : ${formData.requestType}\n\nMessage :\n${formData.message}`

    await copyToClipboard(textToCopy, "summary")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Client-side rigorous validation
    if (formData.name.trim().length < 2) {
      setSubmitResult({
        status: "error",
        message: t("contact.valName"),
      })
      return
    }
    if (formData.name.trim().length > 100) {
      setSubmitResult({
        status: "error",
        message: t("contact.valNameMax"),
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitResult({
        status: "error",
        message: t("contact.valEmail"),
      })
      return
    }

    if (formData.message.trim().length < 15) {
      setSubmitResult({
        status: "error",
        message: t("contact.valMessage"),
      })
      return
    }
    if (formData.message.trim().length > 5000) {
      setSubmitResult({
        status: "error",
        message: t("contact.valMessageMax"),
      })
      return
    }

    setIsSubmitting(true)
    setSubmitResult({ status: "idle", message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          requestType: formData.requestType,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.website_hp,
          locale: language,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        if (data.emailSent) {
          // Direct email successfully delivered via Resend
          setSubmitResult({
            status: "success",
            emailId: data.emailId,
            message: data.message || t("contact.form.success"),
            whatsappLink: data.whatsappLink,
            mailtoLink: data.mailtoLink,
            gmailLink: data.gmailLink,
            leadSummary: data.leadSummary,
          })
          setFormData({
            name: "",
            email: "",
            company: "",
            requestType: "Recruitment (Full-time / Contract)",
            subject: "",
            message: "",
            website_hp: "",
          })
        } else {
          // Validated & Prepared - Transparent 1-click fallback
          setSubmitResult({
            status: "fallback",
            message: data.message || t("contact.fallbackDesc"),
            whatsappLink: data.whatsappLink,
            mailtoLink: data.mailtoLink,
            gmailLink: data.gmailLink,
            leadSummary: data.leadSummary,
          })
        }
      } else {
        throw new Error(data.message || t("contact.form.error"))
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t("contact.form.error")
      const fallbackSubject = encodeURIComponent(
        `Contact Portfolio QA - ${formData.company || formData.name}`,
      )
      const fallbackBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nType: ${formData.requestType}\n\nMessage:\n${formData.message}`,
      )
      const fallbackMailto = `mailto:poutchokoetienne@gmail.com?subject=${fallbackSubject}&body=${fallbackBody}`
      const fallbackGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=poutchokoetienne@gmail.com&su=${fallbackSubject}&body=${fallbackBody}`

      const fallbackWaText = encodeURIComponent(
        language === "fr"
          ? `Bonjour Étienne,\n\nJe suis ${formData.name}${formData.company ? ` de ${formData.company}` : ""}.\nMon email : ${formData.email}\n\n${formData.message}`
          : `Hello Étienne,\n\nI am ${formData.name}${formData.company ? ` from ${formData.company}` : ""}.\nMy email: ${formData.email}\n\n${formData.message}`,
      )
      const fallbackWa = `https://wa.me/237657268355?text=${fallbackWaText}`

      setSubmitResult({
        status: "error",
        message: errorMessage,
        whatsappLink: fallbackWa,
        mailtoLink: fallbackMailto,
        gmailLink: fallbackGmail,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fastTrackWaText = encodeURIComponent(
    language === "fr"
      ? "Bonjour Étienne, je viens de consulter votre portfolio et je souhaiterais échanger avec vous concernant une opportunité QA Automation."
      : "Hello Étienne, I reviewed your QA portfolio and would like to connect regarding a QA Automation opportunity.",
  )

  const fastTrackMailSubject = encodeURIComponent(
    language === "fr"
      ? "Contact Portfolio QA - Opportunité QA Automation"
      : "QA Portfolio Contact - QA Automation Opportunity",
  )

  const directChannels = [
    {
      id: "linkedin",
      title: t("contact.btn.linkedin"),
      desc: "linkedin.com/in/étienne-poutchoko-emako-420524184",
      copyText: "https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184/",
      href: "https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184/",
      icon: Linkedin,
      color: "hover:border-blue-500/50 hover:bg-blue-600/[0.06] text-blue-500 dark:text-blue-400",
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      cta: t("contact.cta.connect"),
      external: true,
    },
    {
      id: "whatsapp",
      title: t("contact.btn.whatsapp"),
      desc: t("contact.waDesc"),
      copyText: "+237657268355",
      href: `https://wa.me/237657268355?text=${fastTrackWaText}`,
      icon: MessageSquare,
      color: "hover:border-emerald-500/50 hover:bg-emerald-600/[0.06] text-emerald-500 dark:text-emerald-400",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      cta: t("contact.cta.chat"),
      external: true,
    },
    {
      id: "call",
      title: t("contact.btn.call"),
      desc: t("contact.callDesc"),
      copyText: "+237657268355",
      href: "tel:+237657268355",
      icon: Phone,
      color: "hover:border-sky-500/50 hover:bg-sky-600/[0.06] text-sky-500 dark:text-sky-400",
      iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      cta: t("contact.cta.call"),
      external: false,
    },
    {
      id: "email",
      title: t("contact.btn.email"),
      desc: "poutchokoetienne@gmail.com",
      copyText: "poutchokoetienne@gmail.com",
      href: `mailto:poutchokoetienne@gmail.com?subject=${fastTrackMailSubject}`,
      icon: Mail,
      color: "hover:border-cyan-500/50 hover:bg-cyan-600/[0.06] text-cyan-500 dark:text-cyan-400",
      iconBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      cta: t("contact.cta.write"),
      external: false,
    },
  ]

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Send className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{t("contact.badge")}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("contact.title")}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed min-h-[2.5rem]">
            <TypewriterText
              key={`contact-sub-${language}`}
              text={t("contact.subtitle")}
              triggerOnView={true}
              speed={20}
              delay={150}
              cursorChar="|"
              cursorClassName="text-primary"
              hideCursorOnComplete={true}
            />
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Fast-Track & Availability, Right Form / Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Fast-Track Direct Channels & Availability (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>{t("contact.fastTrack")}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t("contact.fastTrackDesc")}
              </p>
            </div>

            {/* Direct Channels Cards - 2x2 grid on Tablet (sm to lg), 1 col on mobile and desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
              {directChannels.map((ch) => {
                const Icon = ch.icon
                const isCopied = copiedKey === ch.id
                return (
                  <div
                    key={ch.id}
                    className={`relative group p-3.5 sm:p-4 rounded-xl glass-panel border border-slate-200/80 dark:border-white/[0.08] hover:border-primary/40 dark:hover:border-white/[0.2] transition-all duration-200 ${ch.color} shadow-sm flex items-center justify-between gap-3`}
                  >
                    <a
                      href={ch.href}
                      target={ch.external ? "_blank" : undefined}
                      rel={ch.external ? "noopener noreferrer" : undefined}
                      className="flex items-center space-x-3 min-w-0 flex-1 touch-manipulation"
                      aria-label={`${ch.title} — ${ch.desc}`}
                    >
                      <div
                        className={`p-2.5 rounded-xl ${ch.iconBg} border group-hover:scale-105 transition-transform flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-400 transition-colors truncate">
                          {ch.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">
                          {ch.desc}
                        </div>
                      </div>
                    </a>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {/* Quick Copy Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          copyToClipboard(ch.copyText, ch.id)
                        }}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all active:scale-95 touch-manipulation"
                        title={isCopied ? t("contact.copied") : t("contact.copyAction")}
                        aria-label={`Copy ${ch.title}`}
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Direct External Link Icon */}
                      <a
                        href={ch.href}
                        target={ch.external ? "_blank" : undefined}
                        rel={ch.external ? "noopener noreferrer" : undefined}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 transition-colors"
                        aria-label={`Open ${ch.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* High-Maturity Availability Card */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel-elevated border border-emerald-500/25 bg-emerald-500/[0.03]">
              <div className="flex items-start space-x-3.5">
                <span className="relative flex h-3.5 w-3.5 mt-1 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {t("contact.availTitle")}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      Remote &bull; Hybride
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t("contact.availDesc")}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t("contact.availResponseTime")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Smart Contact Form or Post-Submission Screen (lg:col-span-7) */}
          <div className="lg:col-span-7 w-full">
            {submitResult.status === "success" || submitResult.status === "fallback" ? (
              <div className="rounded-2xl p-5 sm:p-8 glass-panel-elevated shadow-card text-left space-y-6 animate-in fade-in zoom-in-95 duration-200">
                {/* 1. Header with Success Confirmation */}
                <div className="flex items-start space-x-3.5 sm:space-x-4 pb-5 border-b border-slate-200/80 dark:border-white/[0.08]">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-500 dark:text-emerald-400 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="truncate">
                        {submitResult.status === "success"
                          ? "Email transmis à poutchokoetienne@gmail.com"
                          : "Données validées & prêtes à l'envoi"}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {t("contact.successTitle")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {submitResult.status === "success"
                        ? t("contact.successDesc")
                        : submitResult.message || t("contact.fallbackDesc")}
                    </p>
                  </div>
                </div>

                {/* 2. Prominent WhatsApp Express Conversion Option */}
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-600/5 to-transparent border-2 border-emerald-500/30 dark:border-emerald-500/40 shadow-sm space-y-3.5 relative overflow-hidden">
                  <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 flex-shrink-0" />
                    <span>{t("contact.waOptionBadge")}</span>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      {t("contact.waOptionTitle")}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {t("contact.waOptionDesc")}
                    </p>
                  </div>

                  <div className="pt-1">
                    {submitResult.whatsappLink && (
                      <a
                        href={submitResult.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.98] min-h-[48px] touch-manipulation"
                      >
                        <MessageSquare className="w-5 h-5 mr-2.5 flex-shrink-0" />
                        <span>{t("contact.waOptionBtn")}</span>
                      </a>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                    {t("contact.waOptionHint")}
                  </p>
                </div>

                {/* 3. Summary Card */}
                {submitResult.leadSummary && (
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] space-y-3 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-200 dark:border-white/[0.08] flex-wrap gap-2">
                      <span>{t("contact.successSummary")}</span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-200 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300">
                        Réf : {submitResult.leadSummary.referenceId}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-600 dark:text-slate-400">
                      <div className="break-words">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {t("contact.summarySender")} :{" "}
                        </span>
                        {submitResult.leadSummary.name} ({submitResult.leadSummary.email})
                      </div>
                      <div className="break-words">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {t("contact.summaryCompany")} :{" "}
                        </span>
                        {submitResult.leadSummary.company || "Non précisée"}
                      </div>
                      <div className="break-words">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {t("contact.summaryType")} :{" "}
                        </span>
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold text-[11px]">
                          {submitResult.leadSummary.requestType}
                        </span>
                      </div>
                      <div className="break-words">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {t("contact.summarySubject")} :{" "}
                        </span>
                        {submitResult.leadSummary.subject}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-white/[0.06]">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono line-clamp-2 italic break-words">
                        &quot;{submitResult.leadSummary.message}&quot;
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-white/[0.08]">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center text-xs font-semibold text-primary dark:text-sky-400 hover:underline transition-colors min-h-[44px] py-2 touch-manipulation"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    <span>{t("contact.sendAnother")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/[0.1] transition-all hover:scale-[1.01] active:scale-[0.98] min-h-[44px] touch-manipulation"
                  >
                    {copiedKey === "summary" ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500 flex-shrink-0" />
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {t("contact.copied")}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                        <span>{t("contact.copyMessage")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-5 sm:p-7 md:p-8 glass-panel-elevated shadow-card text-left">
                <div className="mb-5 sm:mb-6 pb-4 border-b border-slate-200/80 dark:border-white/[0.07]">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {t("contact.form.title")}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {t("contact.form.desc")}
                  </p>
                </div>

                {/* Error Banner */}
                {submitResult.status === "error" && (
                  <div
                    aria-live="polite"
                    className="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 text-sm space-y-2 animate-in fade-in duration-200"
                  >
                    <div className="flex items-center space-x-2 font-bold">
                      <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                      <span>{t("contact.errorTitle")}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {submitResult.message}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {submitResult.whatsappLink && (
                        <a
                          href={submitResult.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white min-h-[40px] transition-colors touch-manipulation"
                        >
                          <MessageSquare className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                          <span>Envoyer directement via WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                  {/* Honeypot hidden input for anti-bot trap */}
                  <input
                    type="text"
                    name="website_hp"
                    value={formData.website_hp}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                    suppressHydrationWarning
                  />

                  {/* Name & Email Row: text-base sm:text-sm to prevent iOS Safari auto-zoom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t("contact.form.name")}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        autoComplete="name"
                        enterKeyHint="next"
                        maxLength={100}
                        placeholder={t("contact.form.namePlaceholder")}
                        disabled={isSubmitting}
                        suppressHydrationWarning
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#081018]/70 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t("contact.form.email")}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        autoComplete="email"
                        inputMode="email"
                        enterKeyHint="next"
                        maxLength={254}
                        placeholder={t("contact.form.emailPlaceholder")}
                        disabled={isSubmitting}
                        suppressHydrationWarning
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#081018]/70 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm min-h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Company & Request Type Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t("contact.form.company")}
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        autoComplete="organization"
                        enterKeyHint="next"
                        maxLength={100}
                        placeholder={t("contact.form.companyPlaceholder")}
                        disabled={isSubmitting}
                        suppressHydrationWarning
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#081018]/70 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-type"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t("contact.form.type")}
                      </label>
                      <div className="relative">
                        <select
                          id="contact-type"
                          name="requestType"
                          value={formData.requestType}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          suppressHydrationWarning
                          className="w-full appearance-none px-3.5 py-2.5 pr-10 rounded-xl bg-slate-50 dark:bg-[#081018]/70 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm min-h-[44px]"
                        >
                          {requestTypes.map((rt, idx) => (
                            <option
                              key={idx}
                              value={rt.value}
                              className="bg-white dark:bg-[#0e1922] text-slate-900 dark:text-white"
                            >
                              {rt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      {t("contact.form.subject")}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      enterKeyHint="next"
                      maxLength={200}
                      placeholder={t("contact.form.subjectPlaceholder")}
                      disabled={isSubmitting}
                      suppressHydrationWarning
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#081018]/70 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm min-h-[44px]"
                    />
                  </div>

                  {/* Message & Counter */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {t("contact.form.message")}
                      </label>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                        {formData.message.length}/5000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      aria-required="true"
                      maxLength={5000}
                      placeholder={t("contact.form.messagePlaceholder")}
                      disabled={isSubmitting}
                      data-gramm="false"
                      data-enable-grammarly="false"
                      suppressHydrationWarning
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#081018]/70 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-y min-h-[120px] shadow-sm"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl shadow-accent hover:shadow-accent transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center min-h-[48px] touch-manipulation text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin flex-shrink-0" />
                        <span>{t("contact.form.sending")}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{t("contact.form.submit")}</span>
                      </>
                    )}
                  </Button>

                  {/* Response Guarantee Notice */}
                  <div className="flex items-center justify-center space-x-2 pt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 text-center">
                    <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{t("contact.responseTime")}</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
