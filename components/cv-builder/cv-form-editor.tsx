"use client"
import React, { useState } from "react"
import {
  CVData,
  ExperienceItem,
  EducationItem,
  TechnicalSkillCategory,
  SoftSkillItem,
  CertificationItem,
  ProjectItem,
  LanguageItem,
  ReferenceItem,
} from "@/types/cv"
import { Button } from "@/components/ui/button"
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Cpu,
  HeartHandshake,
  Award,
  FolderGit2,
  Languages,
  Compass,
  Users,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react"

interface CVFormEditorProps {
  data: CVData
  onChange: (newData: CVData) => void
  activeSection?: string
  onSectionSelect?: (secId: string) => void
}

export function CVFormEditor({
  data,
  onChange,
  activeSection = "personal",
  onSectionSelect,
}: CVFormEditorProps) {
  const [currentTab, setCurrentTab] = useState<string>(activeSection)

  // Synchronisation si le parent change activeSection
  React.useEffect(() => {
    if (activeSection) {
      setCurrentTab(activeSection)
    }
  }, [activeSection])

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId)
    onSectionSelect?.(tabId)
  }

  // --- Helpers d'édition génériques ---
  const updatePersonalInfo = (field: keyof CVData["personalInfo"], value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    })
  }

  const updateSummary = (field: keyof CVData["professionalSummary"], value: string) => {
    onChange({
      ...data,
      professionalSummary: {
        ...data.professionalSummary,
        [field]: value,
      },
    })
  }

  // --- Gestion des Expériences ---
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: "exp-" + Date.now(),
      role: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
      technologies: [],
    }
    onChange({ ...data, experiences: [newExp, ...data.experiences] })
  }

  const updateExperience = (index: number, updated: Partial<ExperienceItem>) => {
    const list = [...data.experiences]
    list[index] = { ...list[index], ...updated }
    onChange({ ...data, experiences: list })
  }

  const deleteExperience = (index: number) => {
    const list = data.experiences.filter((_, i) => i !== index)
    onChange({ ...data, experiences: list })
  }

  const moveExperience = (index: number, direction: "up" | "down") => {
    const list = [...data.experiences]
    const target = direction === "up" ? index - 1 : index + 1
    if (target < 0 || target >= list.length) return
    const temp = list[index]
    list[index] = list[target]
    list[target] = temp
    onChange({ ...data, experiences: list })
  }

  // --- Gestion de la Formation ---
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: "edu-" + Date.now(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    onChange({ ...data, education: [newEdu, ...data.education] })
  }

  const updateEducation = (index: number, updated: Partial<EducationItem>) => {
    const list = [...data.education]
    list[index] = { ...list[index], ...updated }
    onChange({ ...data, education: list })
  }

  const deleteEducation = (index: number) => {
    const list = data.education.filter((_, i) => i !== index)
    onChange({ ...data, education: list })
  }

  // --- Gestion Compétences Techniques ---
  const addSkillCategory = () => {
    const newCat: TechnicalSkillCategory = {
      id: "tech-" + Date.now(),
      category: "Nouvelle Catégorie",
      skills: ["Compétence 1"],
    }
    onChange({ ...data, technicalSkills: [...data.technicalSkills, newCat] })
  }

  const updateSkillCategory = (index: number, updated: Partial<TechnicalSkillCategory>) => {
    const list = [...data.technicalSkills]
    list[index] = { ...list[index], ...updated }
    onChange({ ...data, technicalSkills: list })
  }

  const deleteSkillCategory = (index: number) => {
    const list = data.technicalSkills.filter((_, i) => i !== index)
    onChange({ ...data, technicalSkills: list })
  }

  // --- Gestion Soft Skills ---
  const addSoftSkill = () => {
    const newSkill: SoftSkillItem = {
      id: "soft-" + Date.now(),
      name: "",
    }
    onChange({ ...data, softSkills: [...data.softSkills, newSkill] })
  }

  const updateSoftSkill = (index: number, name: string) => {
    const list = [...data.softSkills]
    list[index] = { ...list[index], name }
    onChange({ ...data, softSkills: list })
  }

  const deleteSoftSkill = (index: number) => {
    onChange({ ...data, softSkills: data.softSkills.filter((_, i) => i !== index) })
  }

  // --- Gestion Certifications ---
  const addCertification = () => {
    const newCert: CertificationItem = {
      id: "cert-" + Date.now(),
      name: "",
      issuer: "",
      issueDate: "",
    }
    onChange({ ...data, certifications: [...data.certifications, newCert] })
  }

  const updateCertification = (index: number, updated: Partial<CertificationItem>) => {
    const list = [...data.certifications]
    list[index] = { ...list[index], ...updated }
    onChange({ ...data, certifications: list })
  }

  const deleteCertification = (index: number) => {
    onChange({ ...data, certifications: data.certifications.filter((_, i) => i !== index) })
  }

  // --- Gestion Projets ---
  const addProject = () => {
    const newProj: ProjectItem = {
      id: "proj-" + Date.now(),
      title: "",
      role: "",
      description: "",
      technologies: [],
      outcomes: "",
    }
    onChange({ ...data, projects: [...data.projects, newProj] })
  }

  const updateProject = (index: number, updated: Partial<ProjectItem>) => {
    const list = [...data.projects]
    list[index] = { ...list[index], ...updated }
    onChange({ ...data, projects: list })
  }

  const deleteProject = (index: number) => {
    onChange({ ...data, projects: data.projects.filter((_, i) => i !== index) })
  }

  // --- Gestion Langues ---
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: "lang-" + Date.now(),
      language: "",
      proficiency: "Professionnel",
    }
    onChange({ ...data, languages: [...data.languages, newLang] })
  }

  const updateLanguage = (index: number, updated: Partial<LanguageItem>) => {
    const list = [...data.languages]
    list[index] = { ...list[index], ...updated }
    onChange({ ...data, languages: list })
  }

  const deleteLanguage = (index: number) => {
    onChange({ ...data, languages: data.languages.filter((_, i) => i !== index) })
  }

  // --- Gestion Loisirs ---
  const addHobby = () => {
    onChange({ ...data, hobbies: [...data.hobbies, { id: "hob-" + Date.now(), name: "" }] })
  }

  const updateHobby = (index: number, name: string) => {
    const list = [...data.hobbies]
    list[index] = { ...list[index], name }
    onChange({ ...data, hobbies: list })
  }

  const deleteHobby = (index: number) => {
    onChange({ ...data, hobbies: data.hobbies.filter((_, i) => i !== index) })
  }

  // --- Gestion Références ---
  const addReference = () => {
    onChange({
      ...data,
      references: [
        ...data.references,
        {
          id: "ref-" + Date.now(),
          name: "",
          role: "",
          company: "",
          availableOnDemand: true,
          contact: "Sur demande",
        },
      ],
    })
  }

  const updateReference = (index: number, updated: Partial<ReferenceItem>) => {
    const list = [...data.references]
    list[index] = { ...list[index], ...updated }
    onChange({ ...data, references: list })
  }

  const deleteReference = (index: number) => {
    onChange({ ...data, references: data.references.filter((_, i) => i !== index) })
  }

  // Liste des rubriques pour l'onglet
  const navTabs = [
    { id: "personal", label: "Infos perso", icon: User, required: true },
    { id: "summary", label: "Profil", icon: FileText, required: true },
    { id: "experiences", label: "Expériences", icon: Briefcase, count: data.experiences.length, required: true },
    { id: "education", label: "Formation", icon: GraduationCap, count: data.education.length, required: true },
    { id: "skills", label: "Compétences tech", icon: Cpu, count: data.technicalSkills.length, required: true },
    { id: "soft_skills", label: "Soft skills", icon: HeartHandshake, count: data.softSkills.length, optional: true },
    { id: "certifications", label: "Certifications", icon: Award, count: data.certifications.length },
    { id: "projects", label: "Projets", icon: FolderGit2, count: data.projects.length },
    { id: "languages", label: "Langues", icon: Languages, count: data.languages.length, required: true },
    { id: "hobbies", label: "Loisirs", icon: Compass, count: data.hobbies.length, optional: true },
    { id: "references", label: "Références", icon: Users, count: data.references.length, optional: true },
  ]

  return (
    <div className="rounded-2xl glass-panel border border-slate-200/80 dark:border-white/[0.08] shadow-card overflow-hidden">
      {/* Barre d'onglets horizontale scrollable */}
      <div className="flex items-center overflow-x-auto border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] p-1.5 scrollbar-thin">
        {navTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? "bg-white dark:bg-white/[0.12] text-primary shadow-sm border border-slate-200/60 dark:border-white/[0.1]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/[0.04]"
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/70 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300">
                  {tab.count}
                </span>
              )}
              {tab.required && <span className="text-rose-500 font-bold">*</span>}
            </button>
          )
        })}
      </div>

      {/* Contenu de la section active */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* ============================================================ */}
        {/* SECTION 1 : INFORMATIONS PERSONNELLES */}
        {/* ============================================================ */}
        {currentTab === "personal" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <User className="w-4 h-4 text-primary" />
                  <span>Informations personnelles & Coordonnées</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ces informations s&apos;affichent en en-tête de votre CV.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nom complet <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                  placeholder="ex: Étienne Poutchoko Emako"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Titre professionnel cible <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.personalInfo.jobTitle}
                  onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
                  placeholder="ex: Senior QA Automation Engineer"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Adresse email professionnelle <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  placeholder="ex: poutchoko.etienne@gmail.com"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Numéro de téléphone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  placeholder="ex: +237 693 25 15 28"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Localisation & Mobilité <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                  placeholder="ex: Douala, Cameroun (Ouvert au Remote)"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Profil LinkedIn
                </label>
                <input
                  type="url"
                  value={data.personalInfo.linkedin || ""}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                  placeholder="ex: https://linkedin.com/in/etienne-poutchoko"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Profil GitHub / Portfolio
                </label>
                <input
                  type="url"
                  value={data.personalInfo.github || ""}
                  onChange={(e) => updatePersonalInfo("github", e.target.value)}
                  placeholder="ex: https://github.com/etienne201"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  URL Photo (Facultative)
                </label>
                <input
                  type="url"
                  value={data.personalInfo.photoUrl || ""}
                  onChange={(e) => updatePersonalInfo("photoUrl", e.target.value)}
                  placeholder="https://... (ou laisser vide pour un CV standard ATS)"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 2 : PROFIL & RÉSUMÉ PROFESSIONNEL */}
        {/* ============================================================ */}
        {currentTab === "summary" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Profil professionnel & Objectifs de carrière</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Une présentation synthétique et percutante de votre proposition de valeur.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Résumé de profil <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {data.professionalSummary.summary.length} caractères (recommandé &gt; 120)
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={data.professionalSummary.summary}
                  onChange={(e) => updateSummary("summary", e.target.value)}
                  placeholder="Ingénieur QA Automation Senior fort de 5+ années d'expérience dans la conception de stratégies de test robustes pour environnements bancaires et FinTech..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Objectifs de carrière / Valeur ajoutée (Optionnel)
                </label>
                <textarea
                  rows={2}
                  value={data.professionalSummary.careerGoals || ""}
                  onChange={(e) => updateSummary("careerGoals", e.target.value)}
                  placeholder="Accompagner des organisations innovantes dans l'accélération de leurs cycles de livraison sans compromis sur la fiabilité logicielle..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 3 : EXPÉRIENCES PROFESSIONNELLES */}
        {/* ============================================================ */}
        {currentTab === "experiences" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>Expériences professionnelles ({data.experiences.length})</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Valorisez vos responsabilités et vos résultats mesurables.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addExperience}
                className="text-xs h-8 px-3 bg-primary text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Ajouter</span>
              </Button>
            </div>

            {data.experiences.length === 0 ? (
              <div className="text-center py-8 p-4 rounded-xl border border-dashed border-slate-300 dark:border-white/[0.1]">
                <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Aucune expérience enregistrée.</p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addExperience}
                  className="mt-3 text-xs"
                >
                  Ajouter votre première expérience
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.experiences.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="p-4 rounded-xl inner-card border border-slate-200/80 dark:border-white/[0.08] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                          #{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {exp.role || "Nouveau poste"} — {exp.company || "Entreprise"}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => moveExperience(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                          title="Monter"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveExperience(idx, "down")}
                          disabled={idx === data.experiences.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                          title="Descendre"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteExperience(idx)}
                          className="p-1 text-rose-500 hover:text-rose-700"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Intitulé du poste <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(idx, { role: e.target.value })}
                          placeholder="ex: Lead QA Automation Engineer"
                          className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Entreprise <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(idx, { company: e.target.value })}
                          placeholder="ex: UBA / FinTech Solutions"
                          className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Date de début
                        </label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(idx, { startDate: e.target.value })}
                          placeholder="ex: 2023 ou Mars 2023"
                          className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                            Date de fin
                          </label>
                          <label className="flex items-center space-x-1 text-[11px] text-slate-500 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) =>
                                updateExperience(idx, {
                                  current: e.target.checked,
                                  endDate: e.target.checked ? "Présent" : exp.endDate,
                                })
                              }
                              className="rounded text-primary focus:ring-0"
                            />
                            <span>Poste actuel</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          disabled={exp.current}
                          value={exp.current ? "Présent" : exp.endDate}
                          onChange={(e) => updateExperience(idx, { endDate: e.target.value })}
                          placeholder="ex: 2024 ou Présent"
                          className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Description des missions
                      </label>
                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => updateExperience(idx, { description: e.target.value })}
                        placeholder="Pilotage global de la stratégie d'automatisation des tests sur les modules critiques..."
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between">
                        <span>Réalisations clés & Résultats quantifiables (1 par ligne)</span>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      </label>
                      <textarea
                        rows={2}
                        value={(exp.achievements || []).join("\n")}
                        onChange={(e) =>
                          updateExperience(idx, {
                            achievements: e.target.value.split("\n"),
                          })
                        }
                        placeholder="Réduction de 70% du temps d'exécution E2E (de 4h à 35min)&#10;Couverture de tests E2E portée de 25% à 88%"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Technologies utilisées (séparées par des virgules)
                      </label>
                      <input
                        type="text"
                        value={(exp.technologies || []).join(", ")}
                        onChange={(e) =>
                          updateExperience(idx, {
                            technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        placeholder="ex: Cypress, Postman, Gatling, GitLab CI/CD"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 4 : FORMATION */}
        {/* ============================================================ */}
        {currentTab === "education" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span>Formation académique ({data.education.length})</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Diplômes universitaires et parcours d&apos;études.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addEducation}
                className="text-xs h-8 px-3 bg-primary text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Ajouter</span>
              </Button>
            </div>

            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="p-4 rounded-xl inner-card border border-slate-200/80 dark:border-white/[0.08] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {edu.degree || "Nouveau diplôme"}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteEducation(idx)}
                      className="p-1 text-rose-500 hover:text-rose-700"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Diplôme ou Certification <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(idx, { degree: e.target.value })}
                        placeholder="ex: Master en Génie Logiciel"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Établissement <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(idx, { institution: e.target.value })}
                        placeholder="ex: Université de Douala"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Année début
                      </label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(idx, { startDate: e.target.value })}
                        placeholder="ex: 2017"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Année fin
                      </label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(idx, { endDate: e.target.value })}
                        placeholder="ex: 2019"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      Détails du cursus ou spécialisation
                    </label>
                    <textarea
                      rows={2}
                      value={edu.description || ""}
                      onChange={(e) => updateEducation(idx, { description: e.target.value })}
                      placeholder="Spécialisation en architecture logicielle, tests automatisés..."
                      className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 5 : COMPÉTENCES TECHNIQUES */}
        {/* ============================================================ */}
        {currentTab === "skills" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span>Compétences techniques & Technologies</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Organisez vos compétences par catégorie (ex: E2E, API, DevOps, Méthodologie).
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addSkillCategory}
                className="text-xs h-8 px-3 bg-primary text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Ajouter Catégorie</span>
              </Button>
            </div>

            <div className="space-y-4">
              {data.technicalSkills.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  className="p-4 rounded-xl inner-card border border-slate-200/80 dark:border-white/[0.08] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cat.category}
                      onChange={(e) => updateSkillCategory(idx, { category: e.target.value })}
                      placeholder="Nom de la catégorie (ex: Automatisation Web & Mobile)"
                      className="text-xs font-bold p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white flex-1 max-w-sm"
                    />
                    <button
                      type="button"
                      onClick={() => deleteSkillCategory(idx)}
                      className="p-1 text-rose-500 hover:text-rose-700 ml-2"
                      title="Supprimer la catégorie"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      Compétences & Outils (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      value={(cat.skills || []).join(", ")}
                      onChange={(e) =>
                        updateSkillCategory(idx, {
                          skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Cypress, Playwright, Robot Framework, Postman..."
                      className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 6 : COMPÉTENCES COMPORTEMENTALES (SOFT SKILLS) */}
        {/* ============================================================ */}
        {currentTab === "soft_skills" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-500" />
                  <span>Compétences comportementales (Soft Skills)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Qualités humaines, posture agile, leadership et communication.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addSoftSkill}
                className="text-xs h-8 px-3 bg-primary text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Ajouter</span>
              </Button>
            </div>

            <div className="space-y-2">
              {data.softSkills.map((soft, idx) => (
                <div key={soft.id || idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={soft.name}
                    onChange={(e) => updateSoftSkill(idx, e.target.value)}
                    placeholder="ex: Rigueur analytique & Orientation détails"
                    className="flex-1 text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => deleteSoftSkill(idx)}
                    className="p-1.5 text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 7 : CERTIFICATIONS */}
        {/* ============================================================ */}
        {currentTab === "certifications" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Certifications professionnelles ({data.certifications.length})</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Titres officiels (ex: ISTQB, Cloud, DevOps, Frameworks).
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addCertification}
                className="text-xs h-8 px-3 bg-primary text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Ajouter</span>
              </Button>
            </div>

            <div className="space-y-3">
              {data.certifications.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  className="p-3.5 rounded-xl inner-card border border-slate-200/80 dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
                >
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Nom du certificat</label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(idx, { name: e.target.value })}
                      placeholder="ex: ISTQB CTFL"
                      className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Organisme émetteur</label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(idx, { issuer: e.target.value })}
                      placeholder="ex: ISTQB / GASQ"
                      className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-slate-500">Année</label>
                      <input
                        type="text"
                        value={cert.issueDate}
                        onChange={(e) => updateCertification(idx, { issueDate: e.target.value })}
                        placeholder="ex: 2022"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteCertification(idx)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 mt-3"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 8 : PROJETS */}
        {/* ============================================================ */}
        {currentTab === "projects" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <FolderGit2 className="w-4 h-4 text-indigo-500" />
                  <span>Projets majeurs & Réalisations ({data.projects.length})</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Études de cas réelles démontrant votre savoir-faire technique.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addProject}
                className="text-xs h-8 px-3 bg-primary text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Ajouter</span>
              </Button>
            </div>

            <div className="space-y-4">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="p-4 rounded-xl inner-card border border-slate-200/80 dark:border-white/[0.08] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {proj.title || "Nouveau projet"}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteProject(idx)}
                      className="p-1 text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Titre du projet
                      </label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(idx, { title: e.target.value })}
                        placeholder="ex: Framework d'automatisation FinTech"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Votre rôle
                      </label>
                      <input
                        type="text"
                        value={proj.role}
                        onChange={(e) => updateProject(idx, { role: e.target.value })}
                        placeholder="ex: Architecte QA"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      Description & Enjeux
                    </label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(idx, { description: e.target.value })}
                      placeholder="Conception d'une suite de tests E2E modulaire avec Cypress..."
                      className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Technologies (séparées par des virgules)
                      </label>
                      <input
                        type="text"
                        value={(proj.technologies || []).join(", ")}
                        onChange={(e) =>
                          updateProject(idx, {
                            technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        placeholder="Cypress, TypeScript, Docker"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Résultats / Métrique obtenue
                      </label>
                      <input
                        type="text"
                        value={proj.outcomes || ""}
                        onChange={(e) => updateProject(idx, { outcomes: e.target.value })}
                        placeholder="ex: 99.4% de stabilité, adopté par 4 équipes"
                        className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 9 : LANGUES */}
        {/* ============================================================ */}
        {currentTab === "languages" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Languages className="w-4 h-4 text-sky-500" />
                  <span>Langues parlées & Niveaux ({data.languages.length})</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Indiquez votre aisance pour les contextes internationaux.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addLanguage}
                className="text-xs h-8 px-3 bg-primary text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Ajouter</span>
              </Button>
            </div>

            <div className="space-y-3">
              {data.languages.map((lang, idx) => (
                <div
                  key={lang.id || idx}
                  className="p-3.5 rounded-xl inner-card border border-slate-200/80 dark:border-white/[0.08] flex items-center space-x-3"
                >
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => updateLanguage(idx, { language: e.target.value })}
                    placeholder="ex: Français ou Anglais"
                    className="flex-1 text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(idx, { proficiency: e.target.value })}
                    placeholder="ex: Bilingue / Professionnel"
                    className="flex-1 text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => deleteLanguage(idx)}
                    className="p-1.5 text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 10 : LOISIRS & CENTRES D'INTÉRÊT */}
        {/* ============================================================ */}
        {currentTab === "hobbies" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-primary" />
                  <span>Centres d&apos;intérêt (Facultatif)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Activités extra-professionnelles et passions.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addHobby}
                className="text-xs h-8 px-3 bg-primary text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Ajouter</span>
              </Button>
            </div>

            <div className="space-y-2">
              {data.hobbies.map((hob, idx) => (
                <div key={hob.id || idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={hob.name}
                    onChange={(e) => updateHobby(idx, e.target.value)}
                    placeholder="ex: Veille technologique, Mentorat, Musique..."
                    className="flex-1 text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => deleteHobby(idx)}
                    className="p-1.5 text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 11 : RÉFÉRENCES */}
        {/* ============================================================ */}
        {currentTab === "references" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Références professionnelles (Facultatif)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Recommandations et contacts de confiance (ex: &quot;Disponibles sur demande&quot;).
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addReference}
                className="text-xs h-8 px-3 bg-primary text-white"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Ajouter</span>
              </Button>
            </div>

            <div className="space-y-3">
              {data.references.map((ref, idx) => (
                <div
                  key={ref.id || idx}
                  className="p-3.5 rounded-xl inner-card border border-slate-200/80 dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
                >
                  <input
                    type="text"
                    value={ref.name}
                    onChange={(e) => updateReference(idx, { name: e.target.value })}
                    placeholder="Nom ou Titre (ex: Responsable QA)"
                    className="text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={ref.company}
                    onChange={(e) => updateReference(idx, { company: e.target.value })}
                    placeholder="Entreprise"
                    className="text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={ref.contact || ""}
                      onChange={(e) => updateReference(idx, { contact: e.target.value })}
                      placeholder="Coordonnées ou 'Sur demande'"
                      className="flex-1 text-xs p-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => deleteReference(idx)}
                      className="p-1.5 text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
