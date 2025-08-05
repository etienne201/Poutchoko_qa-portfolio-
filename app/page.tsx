"use client"
import { Badge } from "@/components/ui/badge"
import type React from "react"

import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider, useLanguage } from "@/hooks/use-language"
import { TypewriterText } from "@/components/typewriter-text"
import { ProjectModal } from "@/components/project-modal"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingNav } from "@/components/floating-nav"
import { HeroSection } from "@/components/hero-section"
import { GlassCard } from "@/components/glass-card"
import {
  CheckCircle,
  Code,
  Cog,
  Github,
  Linkedin,
  Mail,
  Phone,
  Search,
  Shield,
  Target,
  TestTube,
  Zap,
  Globe,
  Database,
  GitBranch,
  Monitor,
  Bug,
  Users,
  Award,
  Calendar,
  Eye,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const projectsData = {
  arsy: {
    id: "arsy",
    title: "ARSy - CEMAC Regulation",
    description: "Testing for regulatory compliance in the CEMAC region",
    fullDescription:
      "Led comprehensive testing efforts for ARSy, a critical regulatory management system for the CEMAC region. This project involved ensuring compliance with complex regional regulations while maintaining system performance and user experience. Implemented automated testing frameworks and conducted extensive security testing to meet regulatory standards.",
    technologies: ["Cypress", "Postman", "GitLab CI", "Xray", "Security Testing"],
    duration: "8 months (Jan 2025 - Present)",
    role: "Lead QA Engineer",
    challenges: [
      "Complex regulatory requirements across multiple CEMAC countries",
      "Integration with legacy government systems",
      "Multi-language support and localization testing",
      "High security and compliance standards",
    ],
    results: [
      "100% compliance with CEMAC regulatory standards",
      "Zero critical security vulnerabilities in production",
      "95% test automation coverage achieved",
      "Reduced manual testing time by 60%",
    ],
  },
  payunit: {
    id: "payunit",
    title: "PayUnit Payment Platform",
    description: "End-to-end testing for a digital payment platform",
    fullDescription:
      "Comprehensive quality assurance for PayUnit, a robust digital payment platform supporting multiple payment methods including Mobile Money, Visa, and PayPal. Focused on security, performance, and user experience testing across web and mobile platforms.",
    technologies: ["Selenium", "Postman", "JMeter", "Jenkins", "Mobile Testing"],
    duration: "18 months (Jun 2020 - Dec 2021)",
    role: "QA Engineer",
    challenges: [
      "PCI DSS compliance requirements",
      "Integration with multiple payment gateways",
      "Real-time transaction processing testing",
      "Cross-platform compatibility",
    ],
    results: [
      "99.9% payment processing accuracy",
      "PCI DSS Level 1 compliance achieved",
      "Load testing validated 10,000+ concurrent users",
      "40% reduction in payment-related bugs",
    ],
  },
  activa: {
    id: "activa",
    title: "Activa Insurance Platform",
    description: "QA for an insurance management system",
    fullDescription:
      "Quality assurance for Activa, a comprehensive insurance management platform covering policy management, claims processing, and customer relationship management. Implemented end-to-end testing strategies and automated regression testing suites.",
    technologies: ["Robot Framework", "Cypress", "API Testing", "Database Testing"],
    duration: "12 months (Jan 2021 - Dec 2021)",
    role: "QA Engineer",
    challenges: [
      "Complex insurance business logic validation",
      "Integration with external insurance providers",
      "Large dataset management and testing",
      "Regulatory compliance requirements",
    ],
    results: [
      "85% automation coverage for regression testing",
      "Reduced claim processing errors by 70%",
      "Improved system performance by 45%",
      "Zero data integrity issues in production",
    ],
  },
  urbany: {
    id: "urbany",
    title: "URBANY - CEMAC Project",
    description: "QA for a real estate platform in the CEMAC region",
    fullDescription:
      "Quality assurance for URBANY, an urban planning and real estate management system for the CEMAC region. Focused on geospatial data validation, user interface testing, and integration with government databases.",
    technologies: ["Playwright", "Gatling", "GitLab", "GIS Testing"],
    duration: "6 months (Jul 2024 - Dec 2024)",
    role: "Senior QA Engineer",
    challenges: [
      "Geospatial data accuracy validation",
      "Multi-tenant architecture testing",
      "Government system integrations",
      "Performance with large geographical datasets",
    ],
    results: [
      "100% geospatial data accuracy achieved",
      "System handles 50,000+ property records efficiently",
      "Automated testing reduced deployment time by 50%",
      "Zero critical issues in production launch",
    ],
  },
  d4lean: {
    id: "d4lean",
    title: "D4 Lean - European Client",
    description: "QA for a European lean management platform",
    fullDescription:
      "Freelance QA services for D4 Lean, a European lean management and process optimization platform. Implemented comprehensive testing strategies including API testing, UI automation, and performance testing.",
    technologies: ["Cypress", "Postman", "Docker", "CI/CD"],
    duration: "10 months (Mar 2023 - Dec 2023)",
    role: "Freelance QA Engineer",
    challenges: [
      "Remote collaboration across time zones",
      "Complex workflow automation testing",
      "Multi-language platform support",
      "Integration with various enterprise tools",
    ],
    results: [
      "90% test automation coverage",
      "Reduced bug escape rate by 80%",
      "Improved deployment confidence",
      "Enhanced team productivity metrics",
    ],
  },
  eztrip: {
    id: "eztrip",
    title: "EZ Trip - European Client",
    description: "QA for a European travel management platform",
    fullDescription:
      "Quality assurance for EZ Trip, a comprehensive travel management platform for European businesses. Focused on booking system testing, payment integration, and mobile application quality assurance.",
    technologies: ["Selenium", "Appium", "REST Assured", "Jenkins"],
    duration: "8 months (May 2023 - Dec 2023)",
    role: "Freelance QA Engineer",
    challenges: [
      "Multi-currency payment processing",
      "Real-time booking system validation",
      "Mobile app testing across devices",
      "Third-party travel API integrations",
    ],
    results: [
      "99.5% booking accuracy rate",
      "Mobile app crash rate reduced to <0.1%",
      "Payment processing errors eliminated",
      "Customer satisfaction improved by 35%",
    ],
  },
}

function PortfolioContent() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<keyof typeof projectsData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "QA Consulting",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const openProjectModal = (projectId: keyof typeof projectsData) => {
    setSelectedProject(projectId)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000) // Augmenté à 12s

      const response = await fetch("/api/contact", {
        // Changé de /api/send-email à /api/contact
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        // Ouvrir WhatsApp si disponible
        if (data.whatsappLink) {
          setTimeout(() => {
            window.open(data.whatsappLink, "_blank")
          }, 1000)
        }

        // Reset du formulaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          projectType: "QA Consulting",
          message: "",
        })

        setSubmitStatus("success")

        // Auto-hide success message après 5 secondes
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 5000)
      } else {
        throw new Error(data.message || "Erreur lors de l'envoi")
      }
    } catch (error) {
      console.error("Erreur:", error)
      setSubmitStatus("error")

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          alert("⏱️ La requête a pris trop de temps. Veuillez réessayer.")
        } else {
          alert(`❌ ${error.message}`)
        }
      } else {
        alert("❌ Erreur lors de l'envoi du message. Veuillez réessayer.")
      }

      // Auto-hide error message après 5 secondes
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <FloatingNav />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              <TypewriterText text={t("about.title")} speed={80} />
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">{t("about.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center text-white">
                    <Users className="w-5 h-5 mr-2 text-blue-400" />
                    {t("about.journey.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-white/80 leading-relaxed">{t("about.journey.p1")}</p>
                  <p className="text-white/80 leading-relaxed">{t("about.journey.p2")}</p>
                </CardContent>
              </GlassCard>

              <GlassCard className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center text-white">
                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                    {t("about.philosophy.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-white/80 leading-relaxed">{t("about.philosophy.text")}</p>
                </CardContent>
              </GlassCard>
            </div>

            <div className="space-y-6">
              <GlassCard className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center text-white">
                    <Award className="w-5 h-5 mr-2 text-blue-400" />
                    {t("about.achievements.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{t("about.achievements.cemac")}</span>
                    <span className="font-semibold text-white">10+</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{t("about.achievements.european")}</span>
                    <span className="font-semibold text-white">5+</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{t("about.achievements.automation")}</span>
                    <span className="font-semibold text-white">80%</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{t("about.achievements.experience")}</span>
                    <span className="font-semibold text-white">5+</span>
                  </div>
                </CardContent>
              </GlassCard>

              <GlassCard className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center text-white">
                    <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                    {t("about.availability.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-white/80">{t("about.availability.projects")}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-white/80">{t("about.availability.remote")}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-white/80">{t("about.availability.flexible")}</span>
                    </div>
                  </div>
                </CardContent>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              <TypewriterText text={t("skills.title")} speed={80} />
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">{t("skills.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassCard className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center text-white">
                  <TestTube className="w-6 h-6 mr-3 text-blue-400" />
                  {t("skills.automation.title")}
                </CardTitle>
                <CardDescription className="text-white/60">{t("skills.automation.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Cypress
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Playwright
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Robot Framework
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Selenium
                  </Badge>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center text-white">
                  <Code className="w-6 h-6 mr-3 text-green-400" />
                  {t("skills.api.title")}
                </CardTitle>
                <CardDescription className="text-white/60">{t("skills.api.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Postman
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Gatling
                  </Badge>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center text-white">
                  <Search className="w-6 h-6 mr-3 text-purple-400" />
                  {t("skills.cicd.title")}
                </CardTitle>
                <CardDescription className="text-white/60">{t("skills.cicd.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    GitLab
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Jenkins
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Docker
                  </Badge>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center text-white">
                  <GitBranch className="w-6 h-6 mr-3 text-orange-400" />
                  {t("skills.documentation.title")}
                </CardTitle>
                <CardDescription className="text-white/60">{t("skills.documentation.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Xray (JIRA)
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Google Docs
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Google Sheets
                  </Badge>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center text-white">
                  <Cog className="w-6 h-6 mr-3 text-red-400" />
                  {t("skills.functional.title")}
                </CardTitle>
                <CardDescription className="text-white/60">{t("skills.functional.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Regression Testing
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Integration Testing
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    User Acceptance Testing
                  </Badge>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center text-white">
                  <Database className="w-6 h-6 mr-3 text-indigo-400" />
                  {t("skills.other.title")}
                </CardTitle>
                <CardDescription className="text-white/60">{t("skills.other.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Agile Methodologies
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                    Test Management
                  </Badge>
                </div>
              </CardContent>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              <TypewriterText text={t("projects.title")} speed={80} />
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">{t("projects.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(projectsData).map(([key, project]) => (
              <GlassCard
                key={key}
                className={`p-6 group`}
                // If you want to keep the animation delay, you can add it to a child div or use inline style on a wrapper
              >
                <CardHeader className="p-0 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      key === "arsy"
                        ? "bg-blue-500/20"
                        : key === "payunit"
                          ? "bg-green-500/20"
                          : key === "activa"
                            ? "bg-purple-500/20"
                            : key === "urbany"
                              ? "bg-orange-500/20"
                              : key === "d4lean"
                                ? "bg-red-500/20"
                                : "bg-yellow-500/20"
                    }`}
                  >
                    {key === "arsy" ? (
                      <Globe className="w-6 h-6 text-blue-400" />
                    ) : key === "payunit" ? (
                      <Shield className="w-6 h-6 text-green-400" />
                    ) : key === "activa" ? (
                      <Zap className="w-6 h-6 text-purple-400" />
                    ) : key === "urbany" ? (
                      <Zap className="w-6 h-6 text-orange-400" />
                    ) : key === "d4lean" ? (
                      <Zap className="w-6 h-6 text-red-400" />
                    ) : (
                      <Zap className="w-6 h-6 text-yellow-400" />
                    )}
                  </div>
                  <CardTitle className="text-white">{t(`projects.${key}.title`)}</CardTitle>
                  <CardDescription className="text-white/60">{t(`projects.${key}.desc`)}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <p className="text-sm text-white/80">{t(`projects.${key}.text`)}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 2).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-white/30 text-white/80">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openProjectModal(key as keyof typeof projectsData)}
                      className="w-full mt-4 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {t("projects.seeMore")}
                    </Button>
                  </div>
                </CardContent>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              <TypewriterText text={t("services.title")} speed={80} />
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">{t("services.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center text-xl text-white">
                  <Bug className="w-6 h-6 mr-3 text-blue-400" />
                  {t("services.consulting.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {t("services.consulting.1")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {t("services.consulting.2")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {t("services.consulting.3")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {t("services.consulting.4")}
                  </li>
                </ul>
              </CardContent>
            </GlassCard>

            <GlassCard className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center text-xl text-white">
                  <Monitor className="w-6 h-6 mr-3 text-green-400" />
                  {t("services.automation.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {t("services.automation.1")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {t("services.automation.2")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {t("services.automation.3")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {t("services.automation.4")}
                  </li>
                </ul>
              </CardContent>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              <TypewriterText text={t("contact.title")} speed={80} />
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">{t("contact.getInTouch")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center transform hover:scale-105 transition-all duration-300">
                    <Mail className="w-5 h-5 text-blue-400 mr-4" />
                    <div>
                      <div className="font-medium text-white">{t("contact.email")}</div>
                      <div className="text-white/80">poutchokoetienne@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center transform hover:scale-105 transition-all duration-300">
                    <Phone className="w-5 h-5 text-blue-400 mr-4" />
                    <div>
                      <div className="font-medium text-white">{t("contact.phone")}</div>
                      <div className="text-white/80">+237 657 268 355</div>
                    </div>
                  </div>
                  <div className="flex items-center transform hover:scale-105 transition-all duration-300">
                    <Linkedin className="w-5 h-5 text-blue-400 mr-4" />
                    <div>
                      <div className="font-medium text-white">{t("contact.linkedin")}</div>
                      <div className="text-white/80">linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184</div>
                    </div>
                  </div>
                  <div className="flex items-center transform hover:scale-105 transition-all duration-300">
                    <Globe className="w-5 h-5 text-blue-400 mr-4" />
                    <div>
                      <div className="font-medium text-white">{t("contact.location")}</div>
                      <div className="text-white/80">Douala, Cameroon</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">{t("contact.whyChoose")}</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    {t("contact.why.1")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    {t("contact.why.2")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    {t("contact.why.3")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    {t("contact.why.4")}
                  </li>
                </ul>
              </div>
            </div>

            <GlassCard className="p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-white">{t("contact.form.title")}</CardTitle>
                <CardDescription className="text-white/60">{t("contact.form.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {submitStatus === "success" && (
                  <div className="mb-4 p-4 bg-green-500/20 border border-green-400/30 rounded-md animate-pulse">
                    <p className="text-green-300 text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />✅ Message envoyé avec succès ! Vérifiez votre email et
                      WhatsApp.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-4 p-4 bg-red-500/20 border border-red-400/30 rounded-md animate-pulse">
                    {/* <p className="text-red-300 text-sm flex items-center">
                      <X className="w-4 h-4 mr-2" />❌ Erreur lors de l'envoi. Veuillez réessayer.
                    </p> */}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t("contact.form.firstName")}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/50 transition-all duration-300 disabled:opacity-50"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        {t("contact.form.lastName")}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/50 transition-all duration-300 disabled:opacity-50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">{t("contact.form.email")}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/50 transition-all duration-300 disabled:opacity-50"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      {t("contact.form.projectType")}
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white transition-all duration-300 disabled:opacity-50"
                    >
                      <option value="QA Consulting" className="bg-slate-800">
                        QA Consulting
                      </option>
                      <option value="Test Automation" className="bg-slate-800">
                        Test Automation
                      </option>
                      <option value="CI/CD Integration" className="bg-slate-800">
                        CI/CD Integration
                      </option>
                      <option value="Full QA Services" className="bg-slate-800">
                        Full QA Services
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">{t("contact.form.message")}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full px-3 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/50 transition-all duration-300 disabled:opacity-50"
                      placeholder={t("contact.form.messagePlaceholder")}
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full backdrop-blur-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t("form.sending")}
                      </>
                    ) : (
                      t("contact.form.send")
                    )}
                  </Button>
                </form>
              </CardContent>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <GlassCard className="p-8 text-center">
            <div className="font-bold text-xl mb-4 text-white">Étienne Poutchoko</div>
            <p className="text-white/60 mb-6">{t("footer.tagline")}</p>
            <div className="flex justify-center space-x-6">
              <Link
                href="https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184"
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-125"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-125">
                <Github className="w-6 h-6" />
              </Link>
              <Link
                href="mailto:poutchokoetienne@gmail.com"
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-125"
              >
                <Mail className="w-6 h-6" />
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20 text-white/60 text-sm">{t("footer.copyright")}</div>
          </GlassCard>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeProjectModal}
        project={selectedProject ? projectsData[selectedProject] : null}
      />
    </div>
  )
}

export default function QAPortfolio() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LanguageProvider>
        <PortfolioContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}
