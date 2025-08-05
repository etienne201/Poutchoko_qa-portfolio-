"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Calendar, User, Target, TrendingUp } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface ProjectData {
  id: string
  title: string
  titleFr?: string
  description: string
  fullDescription: string
  fullDescriptionFr?: string
  technologies: string[]
  duration: string
  role: string
  challenges: string[]
  results: string[]
  image?: string
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: ProjectData | null
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { language, t } = useLanguage()

  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 pr-8">
            {language === "fr" ? project.titleFr || project.title : project.title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Project Overview */}
          <div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === "fr" ? project.fullDescriptionFr || project.fullDescription : project.fullDescription}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              {t("projects.modal.technologies")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Duration & Role */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                  {t("projects.modal.duration")}
                </h4>
                <p className="text-slate-600 dark:text-slate-300">{project.duration}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                  {t("projects.modal.role")}
                </h4>
                <p className="text-slate-600 dark:text-slate-300">{project.role}</p>
              </div>
            </div>

            {/* Challenges & Results */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" />
                  {t("projects.modal.challenges")}
                </h4>
                <ul className="space-y-1">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-start">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                  {t("projects.modal.results")}
                </h4>
                <ul className="space-y-1">
                  {project.results.map((result, index) => (
                    <li key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
