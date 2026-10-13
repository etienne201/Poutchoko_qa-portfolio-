import type { CVData, CVCompletionReport, SectionScore } from "../types/cv"

/**
 * CV Officiel d'Étienne Poutchoko Emako - Version Anglaise (EN)
 * Source certifiée conforme au document cv-en.html
 */
export const defaultEtienneCV_EN: CVData = {
  personalInfo: {
    fullName: "ETIENNE POUTCHOKO EMAKO",
    jobTitle: "Senior QA Automation Engineer | FinTech | CI/CD | Cypress | Playwright",
    email: "poutchokoetienne@gmail.com",
    phone: "+237 657 268 355",
    location: "Douala, Cameroon (Open to Remote – Europe & International)",
    website: "https://poutchoko-qa-portfolio.vercel.app",
    linkedin: "https://linkedin.com/in/etienne-poutchoko-emako",
    github: "https://github.com/etienne201",
    photoUrl: "",
  },
  professionalSummary: {
    summary:
      "Senior QA Automation Engineer with 6+ years of experience delivering high-quality digital products in FinTech, SaaS, RegTech, Insurance, and Payment platforms. Expert in test strategy design, end-to-end automation (UI & API), performance testing, and CI/CD integration. Proven track record in leading QA processes for regulated systems (CEMAC region), digital payments, and enterprise SaaS platforms. Strong experience working in Agile/Scrum environments with distributed international teams. Results-driven, analytical, and focused on continuous quality improvement.",
    careerGoals:
      "Drive QA excellence and quality engineering for mission-critical software products with international engineering teams.",
  },
  experiences: [
    {
      id: "exp-1",
      role: "Senior QA Engineer",
      company: "Seven Common Factors (Seven GPS)",
      location: "Douala, Cameroon",
      startDate: "Jan 2025",
      endDate: "Present",
      current: true,
      description:
        "Lead QA activities for CEMAC regulatory platforms (ARSy & URBANY—urban and regulatory management systems).",
      achievements: [
        "Designed and implemented automated E2E testing frameworks using Cypress.",
        "Conducted API and performance testing using Postman and Gatling.",
        "Reduced regression testing time by 40% through automation implementation.",
        "Integrated automated test pipelines into GitLab CI/CD.",
        "Supervised full test cycles: exploratory, regression, performance, and UAT.",
        "Coordinated with cross-functional regional stakeholders in Agile/Scrum environments.",
      ],
      technologies: ["Cypress", "Postman", "Gatling", "GitLab CI/CD", "Xray (JIRA)", "ClickUp"],
    },
    {
      id: "exp-2",
      role: "Freelance QA Automation Engineer",
      company: "Bainkode Dev",
      location: "Italy (Remote — Europe)",
      startDate: "Jan 2023",
      endDate: "Nov 2024",
      current: false,
      description:
        "Delivered automated QA solutions for European SaaS and digital platforms (D4Lean, EZ Trip).",
      achievements: [
        "Developed scalable automation frameworks using Cypress, Playwright, and Robot Framework.",
        "Increased test coverage by 60% for multiple client projects.",
        "Designed comprehensive test plans and custom manual testing strategies.",
        "Managed the defect lifecycle via JIRA/Xray; collaborated with distributed development teams across Europe.",
      ],
      technologies: ["Cypress", "Playwright", "Robot Framework", "JIRA / Xray", "SonarQube"],
    },
    {
      id: "exp-3",
      role: "QA Engineer",
      company: "Seven Common Factors (Seven GPS)",
      location: "Douala, Cameroon",
      startDate: "Jun 2020",
      endDate: "Jan 2023",
      current: false,
      description:
        "QA for multiple SaaS platforms, including digital payments (Mobile Money, Visa, PayPal), insurance, and automotive platforms.",
      achievements: [
        "Executed functional, exploratory, and performance testing.",
        "Automated critical user flows using Cypress; integrated automation into Jenkins CI pipelines.",
        "Improved release stability by reducing production defects by 35%.",
      ],
      technologies: ["Cypress", "Postman", "Jenkins CI", "Docker", "Mobile Money", "Visa / PayPal"],
    },
    {
      id: "exp-4",
      role: "Software Tester Intern",
      company: "Seven Common Factors (Seven GPS)",
      location: "Douala, Cameroon",
      startDate: "Dec 2019",
      endDate: "Jun 2020",
      current: false,
      description:
        "Designed and executed manual test cases; documented defects and monitored resolution processes via JIRA.",
      achievements: [
        "Participated actively in Scrum ceremonies and sprint planning.",
        "Established baseline bug reporting templates and test case tracking standards.",
      ],
      technologies: ["Manual Testing", "Test Cases", "JIRA", "Scrum Ceremonies", "Bug Lifecycle"],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Full Stack Web Developer",
      institution: "Seven Advanced Academy",
      location: "Douala, Cameroon",
      startDate: "2018",
      endDate: "2020",
      current: false,
      description:
        "Deep immersion in modern software engineering, web architectures, frontend/backend development, and testing methodologies.",
    },
  ],
  technicalSkills: [
    {
      id: "tech-1",
      category: "Core Competencies",
      skills: [
        "Test Strategy",
        "E2E Automation",
        "UI & API Testing",
        "Performance Testing",
        "CI/CD Integration",
        "FinTech QA",
        "Agile/Scrum",
        "Defect Lifecycle",
        "Risk-based Testing",
      ],
    },
    {
      id: "tech-2",
      category: "Automation Tools",
      skills: ["Cypress", "Playwright", "Robot Framework"],
    },
    {
      id: "tech-3",
      category: "API Testing",
      skills: ["Postman", "REST API Testing"],
    },
    {
      id: "tech-4",
      category: "Performance & CI/CD",
      skills: ["Gatling", "GitLab CI", "Jenkins", "Docker"],
    },
    {
      id: "tech-5",
      category: "Management & Tools",
      skills: ["Xray (JIRA)", "ClickUp", "Git", "Google Workspace"],
    },
  ],
  softSkills: [
    { id: "soft-1", name: "Strong analytical thinking" },
    { id: "soft-2", name: "Detail-oriented & Quality obsessed" },
    { id: "soft-3", name: "Autonomous & team-driven" },
    { id: "soft-4", name: "Problem-solving mindset" },
    { id: "soft-5", name: "Continuous improvement culture" },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "ISTQB Foundation Level (CTFL Standards)",
      issuer: "ISTQB / Quality Engineering Standards",
      issueDate: "2021",
    },
    {
      id: "cert-2",
      name: "Cypress End-to-End Test Automation Specialist",
      issuer: "Test Automation University",
      issueDate: "2022",
    },
    {
      id: "cert-3",
      name: "GitLab CI/CD Pipeline Automation",
      issuer: "GitLab",
      issueDate: "2023",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "ARSy & URBANY — CEMAC Regulatory & Urban Systems",
      role: "Lead QA Engineer",
      description:
        "Complete QA lifecycle for regulatory approvals and urban planning management across CEMAC member states.",
      technologies: ["Cypress", "Postman", "Gatling", "GitLab CI/CD", "Xray"],
      outcomes: "Reduced regression testing time by 40%, 100% regulatory compliance.",
    },
    {
      id: "proj-2",
      title: "D4Lean & EZ Trip — European SaaS Platforms",
      role: "Freelance QA Automation Engineer",
      description:
        "Automated regression suites and multi-browser execution for European enterprise clients.",
      technologies: ["Cypress", "Playwright", "Robot Framework", "SonarQube"],
      outcomes: "60% increase in automated test coverage.",
    },
  ],
  languages: [
    { id: "lang-1", language: "French", proficiency: "Native" },
    { id: "lang-2", language: "English", proficiency: "Professional Working Proficiency" },
  ],
  hobbies: [
    { id: "hob-1", name: "Open Source Quality Engineering" },
    { id: "hob-2", name: "Tech Mentorship" },
    { id: "hob-3", name: "Fitness & Running" },
  ],
  references: [
    {
      id: "ref-1",
      name: "Professional References",
      role: "Engineering Managers & Product Leads",
      company: "Seven GPS & Bainkode Dev",
      availableOnDemand: true,
      contact: "Available upon request",
    },
  ],
  settings: {
    template: "modern",
    accentColor: "ocean",
    fontFamily: "inter",
    spacing: "normal",
    language: "en",
  },
}

/**
 * CV Officiel d'Étienne Poutchoko Emako - Version Française (FR)
 * Source certifiée conforme au document cv-fr.html
 */
export const defaultEtienneCV_FR: CVData = {
  personalInfo: {
    fullName: "ETIENNE POUTCHOKO EMAKO",
    jobTitle: "Senior QA Automation Engineer | FinTech | CI/CD | Cypress | Playwright",
    email: "poutchokoetienne@gmail.com",
    phone: "+237 657 268 355",
    location: "Douala, Cameroun (Ouvert au Remote – Europe & International)",
    website: "https://poutchoko-qa-portfolio.vercel.app",
    linkedin: "https://linkedin.com/in/etienne-poutchoko-emako",
    github: "https://github.com/etienne201",
    photoUrl: "",
  },
  professionalSummary: {
    summary:
      "Ingénieur Senior QA Automation fort de 6+ années d'expérience dans la livraison de produits numériques à haute fiabilité en FinTech, SaaS, RegTech, Assurance et plateformes de paiement. Expert en conception de stratégies de test, automatisation end-to-end (UI & API), tests de performance et intégration CI/CD. Expérience éprouvée dans le pilotage des processus QA pour des systèmes réglementés (zone CEMAC), paiements digitaux et plateformes SaaS d'entreprise. Forte pratique des environnements Agile/Scrum avec des équipes internationales distribuées. Orienté résultats, rigueur analytique et amélioration continue de la qualité logicielle.",
    careerGoals:
      "Accompagner des équipes d'ingénierie d'envergure internationale dans l'industrialisation des tests automatisés, la réduction des régressions critiques et l'accélération des cycles de déploiement en production.",
  },
  experiences: [
    {
      id: "exp-1",
      role: "Senior QA Engineer",
      company: "Seven Common Factors (Seven GPS)",
      location: "Douala, Cameroun",
      startDate: "Janv 2025",
      endDate: "Présent",
      current: true,
      description:
        "Pilotage des activités QA pour les plateformes réglementaires d'envergure CEMAC (ARSy & URBANY—systèmes d'agréments et d'aménagement urbain).",
      achievements: [
        "Conception et mise en œuvre de frameworks de tests automatisés E2E sous Cypress.",
        "Exécution des tests d'API et de performance avec Postman et Gatling.",
        "Réduction de 40% du temps de test de non-régression grâce à l'automatisation.",
        "Intégration des pipelines de tests automatisés dans GitLab CI/CD.",
        "Supervision de cycles complets : exploratoire, régression, charge et UAT.",
        "Coordination avec les parties prenantes régionales en environnement Agile/Scrum.",
      ],
      technologies: ["Cypress", "Postman", "Gatling", "GitLab CI/CD", "Xray (JIRA)", "ClickUp"],
    },
    {
      id: "exp-2",
      role: "Freelance QA Automation Engineer",
      company: "Bainkode Dev",
      location: "Italie (Remote — Europe)",
      startDate: "Janv 2023",
      endDate: "Nov 2024",
      current: false,
      description:
        "Prestations de solutions QA automatisées pour plateformes SaaS et digitales européennes (D4Lean, EZ Trip).",
      achievements: [
        "Développement de frameworks d'automatisation évolutifs sous Cypress, Playwright et Robot Framework.",
        "Augmentation mesurable de 60% de la couverture de tests sur plusieurs projets clients.",
        "Conception de plans de test exhaustifs et stratégies de tests manuels sur mesure.",
        "Gestion complète du cycle de vie des anomalies sous JIRA/Xray et collaboration avec des équipes européennes distribuées.",
      ],
      technologies: ["Cypress", "Playwright", "Robot Framework", "JIRA / Xray", "SonarQube"],
    },
    {
      id: "exp-3",
      role: "QA Engineer",
      company: "Seven Common Factors (Seven GPS)",
      location: "Douala, Cameroun",
      startDate: "Juin 2020",
      endDate: "Janv 2023",
      current: false,
      description:
        "Assurance qualité sur plusieurs plateformes SaaS : paiements digitaux (Mobile Money, Visa, PayPal), assurances et automobile.",
      achievements: [
        "Exécution des tests fonctionnels, exploratoires et de performance.",
        "Automatisation des parcours utilisateurs critiques avec Cypress et intégration dans les pipelines Jenkins CI.",
        "Amélioration de la stabilité des versions avec une réduction de 35% des anomalies en production.",
      ],
      technologies: ["Cypress", "Postman", "Jenkins CI", "Docker", "Mobile Money", "Visa / PayPal"],
    },
    {
      id: "exp-4",
      role: "Software Tester Intern",
      company: "Seven Common Factors (Seven GPS)",
      location: "Douala, Cameroun",
      startDate: "Déc 2019",
      endDate: "Juin 2020",
      current: false,
      description:
        "Conception et exécution de cas de tests manuels ; documentation des anomalies et suivi des résolutions sous JIRA.",
      achievements: [
        "Participation active aux cérémonies Scrum et à la planification des sprints.",
        "Mise en place de standards de reporting et de structuration des cas de tests.",
      ],
      technologies: ["Manual Testing", "Test Cases", "JIRA", "Scrum Ceremonies", "Bug Lifecycle"],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Full Stack Web Developer (CQP)",
      institution: "Seven Advanced Academy",
      location: "Douala, Cameroun",
      startDate: "2018",
      endDate: "2020",
      current: false,
      description:
        "Formation approfondie aux architectures web modernes, au développement frontend/backend et aux principes d'ingénierie logicielle.",
    },
  ],
  technicalSkills: [
    {
      id: "tech-1",
      category: "Cœur de métier (Core)",
      skills: [
        "Stratégie de test",
        "Automatisation E2E",
        "Tests UI & API",
        "Tests de performance",
        "Intégration CI/CD",
        "Assurance Qualité FinTech",
        "Agile/Scrum",
        "Gestion des anomalies",
        "Approche par les risques",
      ],
    },
    {
      id: "tech-2",
      category: "Outils d'Automatisation",
      skills: ["Cypress", "Playwright", "Robot Framework"],
    },
    {
      id: "tech-3",
      category: "Tests d'API",
      skills: ["Postman", "REST API Testing"],
    },
    {
      id: "tech-4",
      category: "Performance & CI/CD",
      skills: ["Gatling", "GitLab CI", "Jenkins", "Docker"],
    },
    {
      id: "tech-5",
      category: "Gestion & Outils",
      skills: ["Xray (JIRA)", "ClickUp", "Git", "Google Workspace"],
    },
  ],
  softSkills: [
    { id: "soft-1", name: "Esprit analytique affûté et rigueur méthodologique" },
    { id: "soft-2", name: "Sens aigu du détail et obsession de la fiabilité" },
    { id: "soft-3", name: "Autonome, proactif et excellent esprit d'équipe" },
    { id: "soft-4", name: "Orientation résolution pragmatique de problèmes" },
    { id: "soft-5", name: "Culture forte de l'amélioration continue" },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "ISTQB Certified Tester Foundation Level (CTFL)",
      issuer: "ISTQB / GASQ Standards",
      issueDate: "2021",
    },
    {
      id: "cert-2",
      name: "Cypress End-to-End Automation Specialist",
      issuer: "Test Automation University",
      issueDate: "2022",
    },
    {
      id: "cert-3",
      name: "GitLab CI/CD Fundamentals & Pipeline Automation",
      issuer: "GitLab",
      issueDate: "2023",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "ARSy & URBANY — Systèmes Réglementaires CEMAC",
      role: "Lead QA Engineer",
      description:
        "Numérisation intégrale du processus d'agréments et d'inspections urbaines pour les pays membres de la communauté CEMAC.",
      technologies: ["Cypress", "Postman", "Gatling", "GitLab CI/CD", "Xray"],
      outcomes: "Réduction de 40% des cycles de non-régression, 100% de conformité.",
    },
    {
      id: "proj-2",
      title: "D4Lean & EZ Trip — Plateformes SaaS Européennes",
      role: "Freelance QA Automation Engineer",
      description:
        "Automatisation de suites de tests de charge et multi-navigateurs pour applications SaaS européennes.",
      technologies: ["Cypress", "Playwright", "Robot Framework", "SonarQube"],
      outcomes: "+60% de couverture de tests automatisés.",
    },
  ],
  languages: [
    { id: "lang-1", language: "Français", proficiency: "Langue maternelle / Natif" },
    { id: "lang-2", language: "Anglais", proficiency: "Aisance professionnelle quotidienne (C1)" },
  ],
  hobbies: [
    { id: "hob-1", name: "Veille technologique Open Source & QA" },
    { id: "hob-2", name: "Mentorat de jeunes ingénieurs" },
    { id: "hob-3", name: "Course à pied & Fitness" },
  ],
  references: [
    {
      id: "ref-1",
      name: "Références professionnelles vérifiables",
      role: "Responsables Techniques & Chefs de Produit",
      company: "Seven GPS & Bainkode Dev",
      availableOnDemand: true,
      contact: "Disponibles sur demande",
    },
  ],
  settings: {
    template: "modern",
    accentColor: "ocean",
    fontFamily: "inter",
    spacing: "normal",
    language: "fr",
  },
}

// Par défaut : Version Française officielle
export const defaultEtienneCV: CVData = defaultEtienneCV_FR

export const emptyCV: CVData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    photoUrl: "",
  },
  professionalSummary: {
    summary: "",
    careerGoals: "",
  },
  experiences: [],
  education: [],
  technicalSkills: [],
  softSkills: [],
  certifications: [],
  projects: [],
  languages: [],
  hobbies: [],
  references: [],
  settings: {
    template: "modern",
    accentColor: "ocean",
    fontFamily: "inter",
    spacing: "normal",
    language: "fr",
  },
}

/**
 * Calculateur de score intelligent et explicite
 */
export function calculateCVScore(cv: CVData): CVCompletionReport {
  const sections: SectionScore[] = []
  const recommendations: string[] = []

  // 1. Infos personnelles (20 pts)
  {
    let earned = 0
    const tips: string[] = []
    const { fullName, jobTitle, email, phone, location, linkedin } = cv.personalInfo

    if (fullName.trim().length >= 3) earned += 5
    else tips.push("Renseignez votre nom complet.")

    if (jobTitle.trim().length >= 3) earned += 5
    else tips.push("Ajoutez un titre professionnel précis (ex: Senior QA Automation).")

    if (email.trim().includes("@")) earned += 4
    else tips.push("Ajoutez une adresse email professionnelle valide.")

    if (phone.trim().length >= 6) earned += 3
    else tips.push("Ajoutez un numéro de téléphone avec indicatif.")

    if (location.trim().length >= 3) earned += 2
    else tips.push("Indiquez votre localisation et disponibilité remote.")

    if (linkedin && linkedin.trim().length > 5) earned += 1

    const status = earned >= 18 ? "complete" : earned > 0 ? "in_progress" : "empty"
    sections.push({
      id: "personal",
      title: "Informations personnelles",
      weight: 20,
      earned,
      status,
      tips,
    })
    if (earned < 18) {
      recommendations.push(
        "Complétez vos coordonnées de contact pour maximiser la joignabilité auprès des recruteurs."
      )
    }
  }

  // 2. Résumé professionnel (15 pts)
  {
    let earned = 0
    const tips: string[] = []
    const len = cv.professionalSummary.summary.trim().length

    if (len >= 120) {
      earned = 15
    } else if (len >= 50) {
      earned = 10
      tips.push("Enrichissez votre résumé (idéalement plus de 120 caractères).")
    } else if (len > 0) {
      earned = 5
      tips.push("Développez votre présentation et votre valeur ajoutée.")
    } else {
      tips.push("Rédigez une accroche percutante résumant vos points forts.")
    }

    const status = earned === 15 ? "complete" : earned > 0 ? "in_progress" : "empty"
    sections.push({
      id: "summary",
      title: "Profil & Résumé",
      weight: 15,
      earned,
      status,
      tips,
    })
    if (earned < 10) {
      recommendations.push(
        "Rédigez un profil professionnel synthétique de 2 à 4 lignes pour captiver le lecteur dès les 5 premières secondes."
      )
    }
  }

  // 3. Expériences professionnelles (25 pts)
  {
    let earned = 0
    const tips: string[] = []
    const exps = cv.experiences

    if (exps.length === 0) {
      tips.push("Ajoutez au moins une expérience professionnelle.")
    } else {
      earned += 10
      if (exps.length >= 2) earned += 5

      const hasAchievements = exps.some(
        (e) => (e.achievements && e.achievements.length > 0) || e.description.length >= 80
      )
      if (hasAchievements) {
        earned += 6
      } else {
        tips.push("Ajoutez des réalisations chiffrées (ex: -40% temps de tests).")
      }

      const hasTech = exps.some((e) => e.technologies && e.technologies.length > 0)
      if (hasTech) {
        earned += 4
      } else {
        tips.push("Associez les technologies clés utilisées à chaque poste.")
      }
    }

    const status = earned >= 20 ? "complete" : earned > 0 ? "in_progress" : "empty"
    sections.push({
      id: "experiences",
      title: "Expériences professionnelles",
      weight: 25,
      earned,
      status,
      tips,
    })
    if (earned < 20) {
      recommendations.push(
        "Détaillez vos responsabilités avec des réalisations quantifiables (% d'automatisation, temps gagné)."
      )
    }
  }

  // 4. Formation (10 pts)
  {
    let earned = 0
    const tips: string[] = []
    const edus = cv.education

    if (edus.length === 0) {
      tips.push("Renseignez votre formation académique ou technique.")
    } else {
      earned += 7
      if (edus.some((e) => e.degree && e.institution && e.startDate)) {
        earned += 3
      }
    }

    const status = earned >= 10 ? "complete" : earned > 0 ? "in_progress" : "empty"
    sections.push({
      id: "education",
      title: "Formation académique",
      weight: 10,
      earned,
      status,
      tips,
    })
    if (earned === 0) {
      recommendations.push("Indiquez votre formation principale ou diplôme technique.")
    }
  }

  // 5. Compétences techniques (15 pts)
  {
    let earned = 0
    const tips: string[] = []
    const totalSkills = cv.technicalSkills.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0)

    if (totalSkills >= 8) {
      earned = 15
    } else if (totalSkills >= 4) {
      earned = 10
      tips.push("Ajoutez quelques compétences clés supplémentaires.")
    } else if (totalSkills > 0) {
      earned = 5
      tips.push("Renseignez davantage d'outils et frameworks maîtrisés.")
    } else {
      tips.push("Ajoutez vos compétences techniques.")
    }

    const status = earned >= 15 ? "complete" : earned > 0 ? "in_progress" : "empty"
    sections.push({
      id: "skills",
      title: "Compétences techniques",
      weight: 15,
      earned,
      status,
      tips,
    })
    if (earned < 10) {
      recommendations.push(
        "Mettez en avant vos compétences phares (Cypress, Playwright, CI/CD, JIRA, Postman)."
      )
    }
  }

  // 6. Langues (10 pts)
  {
    let earned = 0
    const tips: string[] = []
    const langs = cv.languages

    if (langs.length >= 2) {
      earned = 10
    } else if (langs.length === 1) {
      earned = 7
      tips.push("Ajoutez une seconde langue si applicable (ex: Anglais professionnel).")
    } else {
      tips.push("Indiquez les langues parlées et votre niveau.")
    }

    const status = earned >= 10 ? "complete" : earned > 0 ? "in_progress" : "empty"
    sections.push({
      id: "languages",
      title: "Langues",
      weight: 10,
      earned,
      status,
      tips,
    })
    if (earned === 0) {
      recommendations.push("Renseignez vos langues pour les opportunités internationales.")
    }
  }

  // 7. Certifications ou Projets (5 pts)
  {
    let earned = 0
    const tips: string[] = []
    const hasCerts = cv.certifications.length > 0
    const hasProjects = cv.projects.length > 0

    if (hasCerts && hasProjects) {
      earned = 5
    } else if (hasCerts || hasProjects) {
      earned = 4
      if (!hasCerts) tips.push("Ajoutez vos certifications professionnelles.")
      if (!hasProjects) tips.push("Ajoutez des projets concrets démontrant votre expertise.")
    } else {
      tips.push("Ajoutez au moins une certification ou un projet marquant.")
    }

    const status = earned >= 4 ? "complete" : earned > 0 ? "in_progress" : "empty"
    sections.push({
      id: "certifications_projects",
      title: "Certifications & Projets",
      weight: 5,
      earned,
      status,
      tips,
    })
  }

  // Sections optionnelles
  {
    sections.push({
      id: "soft_skills",
      title: "Compétences comportementales",
      weight: 0,
      earned: 0,
      status: cv.softSkills.length > 0 ? "complete" : "empty",
      tips: ["Section valorisante pour la culture d'équipe (facultative)."],
      isOptional: true,
    })
    sections.push({
      id: "hobbies",
      title: "Centres d'intérêt",
      weight: 0,
      earned: 0,
      status: cv.hobbies.length > 0 ? "complete" : "empty",
      tips: ["Section facultative."],
      isOptional: true,
    })
    sections.push({
      id: "references",
      title: "Références professionnelles",
      weight: 0,
      earned: 0,
      status: cv.references.length > 0 ? "complete" : "empty",
      tips: ["Section facultative (ex: 'Disponibles sur demande')."],
      isOptional: true,
    })
  }

  const totalEarned = sections.reduce((acc, s) => acc + s.earned, 0)
  const score = Math.min(100, Math.max(0, totalEarned))

  return {
    score,
    sections,
    recommendations,
  }
}

/**
 * Générateur de texte brut conforme aux ATS
 */
export function generatePlainTextATS(cv: CVData): string {
  const parts: string[] = []
  const isEn = cv.settings?.language === "en"

  parts.push((cv.personalInfo.fullName || "CV CANDIDATE").toUpperCase())
  if (cv.personalInfo.jobTitle) parts.push(cv.personalInfo.jobTitle.toUpperCase())

  const contacts: string[] = []
  if (cv.personalInfo.email) contacts.push(cv.personalInfo.email)
  if (cv.personalInfo.phone) contacts.push(cv.personalInfo.phone)
  if (cv.personalInfo.location) contacts.push(cv.personalInfo.location)
  if (cv.personalInfo.linkedin) contacts.push(cv.personalInfo.linkedin)
  if (cv.personalInfo.github) contacts.push(cv.personalInfo.github)
  if (contacts.length > 0) parts.push(contacts.join(" | "))

  parts.push("\n" + "=".repeat(40))

  if (cv.professionalSummary.summary) {
    parts.push(isEn ? "\nPROFESSIONAL SUMMARY" : "\nPROFIL PROFESSIONNEL")
    parts.push("-".repeat(25))
    parts.push(cv.professionalSummary.summary)
  }

  if (cv.technicalSkills.length > 0) {
    parts.push(isEn ? "\nCORE COMPETENCIES & TECHNICAL SKILLS" : "\nCOMPÉTENCES TECHNIQUES")
    parts.push("-".repeat(25))
    cv.technicalSkills.forEach((cat) => {
      parts.push(`• ${cat.category}: ${cat.skills.join(", ")}`)
    })
  }

  if (cv.experiences.length > 0) {
    parts.push(isEn ? "\nPROFESSIONAL EXPERIENCE" : "\nEXPÉRIENCES PROFESSIONNELLES")
    parts.push("-".repeat(25))
    cv.experiences.forEach((exp) => {
      parts.push(`\n${exp.role.toUpperCase()} — ${exp.company}`)
      parts.push(`Dates: ${exp.startDate} - ${exp.current ? (isEn ? "Present" : "Présent") : exp.endDate}${exp.location ? ` | ${exp.location}` : ""}`)
      if (exp.description) parts.push(exp.description)
      if (exp.achievements && exp.achievements.filter(Boolean).length > 0) {
        exp.achievements.filter(Boolean).forEach((ach) => {
          parts.push(`  - ${ach}`)
        })
      }
      if (exp.technologies && exp.technologies.length > 0) {
        parts.push(`  Technologies: ${exp.technologies.join(", ")}`)
      }
    })
  }

  if (cv.education.length > 0) {
    parts.push(isEn ? "\nEDUCATION" : "\nFORMATION")
    parts.push("-".repeat(25))
    cv.education.forEach((edu) => {
      parts.push(`• ${edu.degree} — ${edu.institution} (${edu.startDate} - ${edu.endDate || (isEn ? "Present" : "Présent")})`)
      if (edu.description) parts.push(`  ${edu.description}`)
    })
  }

  if (cv.softSkills.length > 0) {
    parts.push(isEn ? "\nSOFT SKILLS" : "\nCOMPÉTENCES COMPORTEMENTALES (SOFT SKILLS)")
    parts.push("-".repeat(25))
    parts.push(cv.softSkills.map((s) => s.name).join(" • "))
  }

  if (cv.certifications.length > 0) {
    parts.push(isEn ? "\nCERTIFICATIONS" : "\nCERTIFICATIONS")
    parts.push("-".repeat(25))
    cv.certifications.forEach((c) => {
      parts.push(`• ${c.name} — ${c.issuer}${c.issueDate ? ` (${c.issueDate})` : ""}`)
    })
  }

  if (cv.languages.length > 0) {
    parts.push(isEn ? "\nLANGUAGES" : "\nLANGUES")
    parts.push("-".repeat(25))
    cv.languages.forEach((l) => {
      parts.push(`• ${l.language}: ${l.proficiency}`)
    })
  }

  if (cv.references.length > 0) {
    parts.push(isEn ? "\nREFERENCES" : "\nRÉFÉRENCES")
    parts.push("-".repeat(25))
    cv.references.forEach((r) => {
      parts.push(`• ${r.name} (${r.company}) — ${r.contact || (isEn ? "Available upon request" : "Sur demande")}`)
    })
  }

  return parts.join("\n")
}
