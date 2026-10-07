"use client"
import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "@/hooks/use-language"
import {
  FolderGit2,
  Eye,
  CheckCircle2,
  Target,
  Zap,
  Globe,
  X,
  Calendar,
  Building2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { TechBadge } from "@/components/tech-icon"

export interface ProjectItem {
  id: string
  title: string
  tagline: string
  organization: string
  period: string
  role: string
  sector: string
  categories: ("regtech" | "fintech" | "saas" | "automation" | "api" | "cicd")[]
  context: string
  problem: string
  solution: string
  results: string[]
  technologies: string[]
  metric: string
}

export function ProjectsSection() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const projects: ProjectItem[] = [
    {
      id: "arsy",
      title: t("projects.arsy.title"),
      tagline: t("projects.arsy.tagline"),
      organization: "Seven Common Factors (Seven GPS)",
      period: t("exp.job1.period"),
      role: t("projects.arsy.role"),
      sector: t("projects.arsy.sector"),
      categories: ["regtech", "automation", "api", "cicd"],
      context: t("projects.arsy.context"),
      problem: t("projects.arsy.problem"),
      solution: t("projects.arsy.solution"),
      results: [
        t("projects.arsy.res1"),
        t("projects.arsy.res2"),
        t("projects.arsy.res3"),
        t("projects.arsy.res4"),
      ],
      technologies: ["Cypress", "Postman", "Gatling", "GitLab CI/CD", "Xray (JIRA)", "ClickUp"],
      metric: t("projects.arsy.metric"),
    },
    {
      id: "urbany",
      title: t("projects.urbany.title"),
      tagline: t("projects.urbany.tagline"),
      organization: "Seven Common Factors (Seven GPS)",
      period: t("exp.job1.period"),
      role: t("projects.urbany.role"),
      sector: t("projects.urbany.sector"),
      categories: ["regtech", "automation", "api", "cicd"],
      context: t("projects.urbany.context"),
      problem: t("projects.urbany.problem"),
      solution: t("projects.urbany.solution"),
      results: [
        t("projects.urbany.res1"),
        t("projects.urbany.res2"),
        t("projects.urbany.res3"),
        t("projects.urbany.res4"),
      ],
      technologies: ["Cypress", "Postman", "Gatling", "GitLab CI/CD", "Xray (JIRA)", "ClickUp"],
      metric: t("projects.urbany.metric"),
    },
    {
      id: "d4lean",
      title: t("projects.d4lean.title"),
      tagline: t("projects.d4lean.tagline"),
      organization: "Bainkode Dev (Italie / Remote Europe)",
      period: t("exp.job2.period"),
      role: t("projects.d4lean.role"),
      sector: t("projects.d4lean.sector"),
      categories: ["saas", "automation", "api"],
      context: t("projects.d4lean.context"),
      problem: t("projects.d4lean.problem"),
      solution: t("projects.d4lean.solution"),
      results: [
        t("projects.d4lean.res1"),
        t("projects.d4lean.res2"),
        t("projects.d4lean.res3"),
        t("projects.d4lean.res4"),
      ],
      technologies: ["Cypress", "Playwright", "Robot Framework", "SonarQube", "JIRA / Xray", "GitLab CI"],
      metric: t("projects.d4lean.metric"),
    },
    {
      id: "eztrip",
      title: t("projects.eztrip.title"),
      tagline: t("projects.eztrip.tagline"),
      organization: "Bainkode Dev (Italie / Remote Europe)",
      period: t("exp.job2.period"),
      role: t("projects.eztrip.role"),
      sector: t("projects.eztrip.sector"),
      categories: ["saas", "automation"],
      context: t("projects.eztrip.context"),
      problem: t("projects.eztrip.problem"),
      solution: t("projects.eztrip.solution"),
      results: [
        t("projects.eztrip.res1"),
        t("projects.eztrip.res2"),
        t("projects.eztrip.res3"),
      ],
      technologies: ["Playwright", "Robot Framework", "Postman", "JIRA / Xray", "GitLab CI"],
      metric: t("projects.eztrip.metric"),
    },
    {
      id: "payunit",
      title: t("projects.payunit.title"),
      tagline: t("projects.payunit.tagline"),
      organization: "Seven Common Factors (Seven GPS)",
      period: t("exp.job3.period"),
      role: t("projects.payunit.role"),
      sector: t("projects.payunit.sector"),
      categories: ["fintech", "automation", "api", "cicd"],
      context: t("projects.payunit.context"),
      problem: t("projects.payunit.problem"),
      solution: t("projects.payunit.solution"),
      results: [
        t("projects.payunit.res1"),
        t("projects.payunit.res2"),
        t("projects.payunit.res3"),
      ],
      technologies: ["Cypress", "Postman", "Gatling", "Jenkins CI", "Docker", "Git", "Mobile Money"],
      metric: t("projects.payunit.metric"),
    },
    {
      id: "activa",
      title: t("projects.activa.title"),
      tagline: t("projects.activa.tagline"),
      organization: "Seven Common Factors (Seven GPS)",
      period: t("exp.job3.period"),
      role: t("projects.activa.role"),
      sector: t("projects.activa.sector"),
      categories: ["fintech", "saas", "automation"],
      context: t("projects.activa.context"),
      problem: t("projects.activa.problem"),
      solution: t("projects.activa.solution"),
      results: [
        t("projects.activa.res1"),
        t("projects.activa.res2"),
        t("projects.activa.res3"),
      ],
      technologies: ["Cypress", "Postman", "Jenkins CI", "Docker", "Git"],
      metric: t("projects.activa.metric"),
    },
  ]

  const filters = [
    { key: "all", label: t("projects.filter.all") },
    { key: "regtech", label: t("projects.filter.regtech") },
    { key: "fintech", label: t("projects.filter.fintech") },
    { key: "saas", label: t("projects.filter.saas") },
    { key: "automation", label: t("projects.filter.automation") },
  ]

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true
    return p.categories.includes(activeFilter as ProjectItem["categories"][number])
  })

  const currentProjectIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1

  const handlePrevProject = useCallback(() => {
    if (currentProjectIndex > 0) {
      setSelectedProject(filteredProjects[currentProjectIndex - 1])
    }
  }, [currentProjectIndex, filteredProjects])

  const handleNextProject = useCallback(() => {
    if (currentProjectIndex >= 0 && currentProjectIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentProjectIndex + 1])
    }
  }, [currentProjectIndex, filteredProjects])

  // Keyboard navigation for case study modal (Escape is handled by Radix, arrows cycle projects)
  useEffect(() => {
    if (!selectedProject) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        handlePrevProject()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        handleNextProject()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedProject, handlePrevProject, handleNextProject])

  return (
    <section id="projects" className="py-20 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider shadow-sm dark:shadow-subtle">
            <FolderGit2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{t("projects.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("projects.title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-12">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[38px] ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-accent border border-primary"
                    : "bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]"
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl p-5 sm:p-6 glass-panel border border-slate-200/80 dark:border-white/[0.07] hover:border-primary/40 dark:hover:border-white/[0.18] shadow-card flex flex-col justify-between text-left group transition-all duration-300 hover:scale-[1.01]"
            >
              <div>
                {/* Sector & Metric badge */}
                <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                  <span className="text-xs font-semibold text-primary truncate max-w-[200px]">
                    {project.sector}
                  </span>
                  <span className="chip-subtle text-[11px] font-bold font-mono px-2 py-0.5 rounded-md flex-shrink-0">
                    {project.metric}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors tracking-tight">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Challenge Snapshot */}
                <div className="p-3.5 rounded-xl inner-card mb-4 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-amber-500 dark:text-amber-400 block mb-1">
                    {t("projects.impact")}
                  </span>
                  <p className="line-clamp-2 leading-relaxed">{project.results[0]}</p>
                </div>
              </div>

              <div>
                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech, tIdx) => (
                    <TechBadge key={tIdx} name={tech} size="sm" />
                  ))}
                </div>

                {/* View Details Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProject(project)}
                  className="w-full bg-slate-100 dark:bg-white/[0.04] hover:bg-primary hover:text-primary-foreground border-slate-200 dark:border-white/[0.08] hover:border-primary text-slate-700 dark:text-slate-300 transition-all rounded-xl shadow-sm min-h-[38px]"
                >
                  <Eye className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                  <span>{t("projects.viewDetails")}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal Premium */}
        {selectedProject && (
          <Dialog
            open={!!selectedProject}
            onOpenChange={(open) => {
              if (!open) setSelectedProject(null)
            }}
          >
            <DialogContent className="max-w-3xl w-[95vw] sm:w-full max-h-[92vh] sm:max-h-[88vh] p-0 gap-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/15 bg-white/95 dark:bg-[#0c1622]/95 backdrop-blur-2xl shadow-2xl flex flex-col focus:outline-none dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_50px_-10px_rgba(56,189,248,0.12)]">
              {/* Top ambient accent beam */}
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-primary to-indigo-500 z-30"
              />

              {/* Sticky Header */}
              <div className="sticky top-0 z-20 px-5 sm:px-7 pt-5 pb-4 border-b border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0c1622]/90 backdrop-blur-xl">
                {/* Sector, metric & close action */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
                      {selectedProject.sector}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary bg-primary/10 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md"
                    >
                      {selectedProject.metric}
                    </Badge>
                  </div>

                  {/* Close button X + ESC shortcut badge */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04]"
                    >
                      {t("projects.modal.escHint")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      aria-label={t("projects.modal.close")}
                      title={t("projects.modal.close")}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100/90 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.14] border border-slate-200/80 dark:border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 group"
                    >
                      <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
                      <span className="sr-only">{t("projects.modal.close")}</span>
                    </button>
                  </div>
                </div>

                {/* Dialog Title */}
                <DialogTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white text-left leading-snug">
                  {selectedProject.title}
                </DialogTitle>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center font-medium text-slate-700 dark:text-slate-300">
                    <Building2 className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
                    {selectedProject.organization}
                  </span>
                  <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-600">
                    •
                  </span>
                  <span className="inline-flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400 flex-shrink-0" />
                    {selectedProject.period}
                  </span>
                  <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-600">
                    •
                  </span>
                  <span className="inline-flex items-center font-semibold text-primary">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    {selectedProject.role}
                  </span>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto px-5 sm:px-7 py-5 sm:py-6 space-y-6 text-left">
                {/* Executive Summary Tagline */}
                <div className="p-4 rounded-xl border-l-4 border-primary bg-primary/[0.04] dark:bg-primary/[0.08] border border-y-slate-200/60 dark:border-y-white/[0.06] border-r-slate-200/60 dark:border-r-white/[0.06]">
                  <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed italic">
                    &ldquo;{selectedProject.tagline}&rdquo;
                  </p>
                </div>

                {/* Context Section */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center">
                    <Globe className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
                    <span>{t("projects.modal.context")}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/60 dark:bg-white/[0.02] p-3.5 rounded-xl border border-slate-200/60 dark:border-white/[0.06]">
                    {selectedProject.context}
                  </p>
                </div>

                {/* Problem vs Solution Grid */}
                <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Problem Card */}
                  <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.03] dark:bg-amber-500/[0.06] space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <Target className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      </div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {t("projects.modal.problem")}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  {/* Solution Card */}
                  <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/[0.03] dark:bg-sky-500/[0.06] space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-primary">
                        {t("projects.modal.solution")}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Results & Measured Impact */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    <span>{t("projects.modal.results")}</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {selectedProject.results.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-start space-x-2.5 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.06] text-xs text-slate-700 dark:text-slate-200 transition-colors hover:border-emerald-500/35"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center">
                    <Layers className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
                    <span>{t("projects.modal.tech")}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, tIdx) => (
                      <TechBadge key={tIdx} name={tech} size="md" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Footer with Prev/Next and Close */}
              <div className="sticky bottom-0 z-20 px-5 sm:px-7 py-3.5 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/95 dark:bg-[#081018]/95 backdrop-blur-xl flex items-center justify-between gap-3">
                {/* Navigation Between Projects */}
                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentProjectIndex <= 0}
                    onClick={handlePrevProject}
                    className="h-8 px-2.5 text-xs rounded-lg border-slate-200 dark:border-white/10 hover:bg-slate-200/60 dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none"
                    title={t("projects.modal.prev")}
                    aria-label={t("projects.modal.prev")}
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:mr-1" />
                    <span className="hidden sm:inline">{t("projects.modal.prev")}</span>
                  </Button>

                  <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500 px-2">
                    {currentProjectIndex + 1} / {filteredProjects.length}
                  </span>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentProjectIndex >= filteredProjects.length - 1}
                    onClick={handleNextProject}
                    className="h-8 px-2.5 text-xs rounded-lg border-slate-200 dark:border-white/10 hover:bg-slate-200/60 dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none"
                    title={t("projects.modal.next")}
                    aria-label={t("projects.modal.next")}
                  >
                    <span className="hidden sm:inline">{t("projects.modal.next")}</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:ml-1" />
                  </Button>
                </div>

                {/* Close Button in Footer */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  className="h-8 px-4 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-transparent shadow-sm"
                >
                  {t("projects.modal.close")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
