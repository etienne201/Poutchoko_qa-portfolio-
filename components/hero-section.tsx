"use client"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TypewriterText } from "@/components/typewriter-text"
import { CVDownload } from "@/components/cv-download"
import { GlassCard } from "@/components/glass-card"
import { useLanguage } from "@/hooks/use-language"
import { Mail, Linkedin, Github, Shield, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="backdrop-blur-xl bg-white/10 border-white/30 text-white hover:bg-white/20 animate-bounce"
              >
                <Shield className="w-4 h-4 mr-2" />
                <Sparkles className="w-4 h-4 mr-2" />
                {t("hero.badge")}
              </Badge>

              <h1 className="text-6xl font-bold text-white leading-tight">
                <TypewriterText text={t("hero.title")} speed={100} />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block">
                  <TypewriterText text={t("hero.subtitle")} speed={100} />
                </span>
              </h1>

              <p className="text-xl text-white/80 leading-relaxed max-w-2xl">{t("hero.description")}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="backdrop-blur-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <Mail className="w-4 h-4 mr-2" />
                {t("hero.cta.contact")}
              </Button>

              <CVDownload />
            </div>

            <div className="flex space-x-6">
              <Link
                href="https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184"
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-125 transform"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-125 transform"
              >
                <Github className="w-6 h-6" />
              </Link>
              <Link
                href="mailto:poutchokoetienne@gmail.com"
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-125 transform"
              >
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <GlassCard className="p-8 text-center">
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <CheckCircle className="w-16 h-16 text-green-400" />
                </div>

                <div>
                  <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-white/80">{t("hero.metric.label")}</div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                  <div>
                    <div className="text-2xl font-bold text-white">5+</div>
                    <div className="text-sm text-white/60">Years</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white"> 10 +</div>
                    <div className="text-sm text-white/60">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">80%</div>
                    <div className="text-sm text-white/60">Automation</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
