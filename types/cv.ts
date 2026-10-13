export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  photoUrl?: string
}

export interface ProfessionalSummary {
  summary: string
  careerGoals?: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
  technologies: string[]
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description?: string
}

export interface TechnicalSkillCategory {
  id: string
  category: string
  skills: string[]
}

export interface SoftSkillItem {
  id: string
  name: string
  description?: string
}

export interface CertificationItem {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialUrl?: string
}

export interface ProjectItem {
  id: string
  title: string
  role: string
  description: string
  technologies: string[]
  outcomes?: string
  link?: string
}

export interface LanguageItem {
  id: string
  language: string
  proficiency: string
}

export interface HobbyItem {
  id: string
  name: string
}

export interface ReferenceItem {
  id: string
  name: string
  role: string
  company: string
  contact?: string
  availableOnDemand?: boolean
}

export type CVTemplateId = "modern" | "ats" | "blueprint"
export type CVAccentColor = "ocean" | "cobalt" | "emerald" | "indigo" | "graphite"
export type CVFontFamily = "inter" | "sans" | "serif"
export type CVSpacing = "compact" | "normal" | "relaxed"
export type CVFontSize = "small" | "medium" | "large"
export type CVMargins = "compact" | "normal" | "spacious"

export interface CVSettings {
  template: CVTemplateId
  accentColor: CVAccentColor
  fontFamily: CVFontFamily
  spacing: CVSpacing
  fontSize?: CVFontSize
  margins?: CVMargins
  language: "fr" | "en"
  showPhoto?: boolean
}

export interface CVData {
  personalInfo: PersonalInfo
  professionalSummary: ProfessionalSummary
  experiences: ExperienceItem[]
  education: EducationItem[]
  technicalSkills: TechnicalSkillCategory[]
  softSkills: SoftSkillItem[]
  certifications: CertificationItem[]
  projects: ProjectItem[]
  languages: LanguageItem[]
  hobbies: HobbyItem[]
  references: ReferenceItem[]
  settings: CVSettings
}

export type SectionStatus = "complete" | "in_progress" | "empty"

export interface SectionScore {
  id: string
  title: string
  weight: number
  earned: number
  status: SectionStatus
  tips: string[]
  isOptional?: boolean
}

export interface CVCompletionReport {
  score: number // 0 à 100
  sections: SectionScore[]
  recommendations: string[]
}
