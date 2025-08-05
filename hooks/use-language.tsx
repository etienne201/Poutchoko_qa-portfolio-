"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.contact": "Contact",

    // Hero Section
    "hero.badge": "Quality Assurance Expert",
    "hero.title": "Étienne Poutchoko  Emako-",
    "hero.subtitle": "QA Engineer",
    "hero.description":
      "Experienced QA Engineer specializing in test automation, performance testing, and CI/CD integration. Passionate about delivering high-quality software solutions across various industries.",
    "hero.cta.contact": "Get In Touch",
    "hero.cta.resume": "Download Resume",
    "hero.metric.label": "Bug Detection Rate",

    // About Section
    "about.title": "About Me",
    "about.subtitle": "Passionate about delivering flawless user experiences through comprehensive testing strategies",
    "about.journey.title": "Professional Journey",
    "about.journey.p1":
      "With a solid background in QA, I've contributed to diverse projects, including digital payments, regional regulation compliance (CEMAC), real estate platforms, and insurance systems. My experience spans across both local and international projects, delivering high-quality software solutions to European clients and projects within the CEMAC region.",
    "about.journey.p2":
      "I focus on creating robust testing frameworks and continuously improving processes to ensure quality at every stage of development. My goal is to not only identify bugs but also to prevent them, ensuring a seamless user experience.",
    "about.philosophy.title": "Core Philosophy",
    "about.philosophy.text":
      '"Quality is a continuous process, not just a final check." I apply meticulous attention to detail in every project, ensuring that quality is integrated into each phase of the development lifecycle. My expertise covers various testing methodologies, adapting to the specific needs of each project.',
    "about.achievements.title": "Key Achievements",
    "about.achievements.cemac": "CEMAC Projects",
    "about.achievements.european": "European Clients",
    "about.achievements.automation": "Automation Coverage",
    "about.achievements.experience": "Years Experience",
    "about.availability.title": "Availability",
    "about.availability.projects": "Available for new projects",
    "about.availability.remote": "Remote & On-site work",
    "about.availability.flexible": "Flexible time zones",

    // Skills Section
    "skills.title": "Expertise & Skills",
    "skills.subtitle": "Comprehensive testing capabilities across multiple domains and technologies",
    "skills.automation.title": "Test Automation",
    "skills.automation.desc": "Scalable automated testing solutions",
    "skills.api.title": "API Testing",
    "skills.api.desc": "Tools for API validation and performance",
    "skills.cicd.title": "CI/CD Tools",
    "skills.cicd.desc": "Integration and deployment expertise",
    "skills.documentation.title": "Documentation",
    "skills.documentation.desc": "Tools for creating and managing test documentation",
    "skills.functional.title": "Functional Testing",
    "skills.functional.desc": "Comprehensive validation of software functionality",
    "skills.other.title": "Other Skills",
    "skills.other.desc": "Additional relevant skills",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.subtitle": "Showcasing successful testing implementations across various industries",
    "projects.arsy.title": "ARSy - CEMAC Regulation",
    "projects.arsy.desc": "Testing for regulatory compliance in the CEMAC region",
    "projects.arsy.text": "Ensuring compliance with CEMAC regulations through comprehensive testing and validation.",
    "projects.payunit.title": "PayUnit Payment Platform",
    "projects.payunit.desc": "End-to-end testing for a digital payment platform",
    "projects.payunit.text":
      "Comprehensive testing of payment processing, security, and user experience for a digital payment platform.",
    "projects.activa.title": "Activa Insurance Platform",
    "projects.activa.desc": "QA for an insurance management system",
    "projects.activa.text":
      "Quality assurance for an insurance platform, covering policy management, claims processing, and customer interactions.",
    "projects.urbany.title": "URBANY - CEMAC Project",
    "projects.urbany.desc": "QA for a real estate platform in the CEMAC region",
    "projects.urbany.text":
      "Quality assurance for a real estate platform, covering property listings and user interactions.",
    "projects.d4lean.title": "D4 Lean - European Client",
    "projects.d4lean.desc": "QA for a European lean management platform",
    "projects.d4lean.text": "Quality assurance for a European lean management and process optimization platform.",
    "projects.eztrip.title": "EZ Trip - European Client",
    "projects.eztrip.desc": "QA for a European travel management platform",
    "projects.eztrip.text": "Quality assurance for a European travel management platform.",
    "projects.seeMore": "Click to see more",
    "projects.modal.close": "Close",
    "projects.modal.technologies": "Technologies Used",
    "projects.modal.duration": "Project Duration",
    "projects.modal.role": "My Role",
    "projects.modal.challenges": "Key Challenges",
    "projects.modal.results": "Results Achieved",

    // Services Section
    "services.title": "Services Offered",
    "services.subtitle": "Comprehensive QA solutions tailored to your specific needs",
    "services.consulting.title": "QA Consulting & Strategy",
    "services.consulting.1": "Test strategy development and optimization",
    "services.consulting.2": "QA process improvement and best practices",
    "services.consulting.3": "Team training and knowledge transfer",
    "services.consulting.4": "Quality metrics and reporting setup",
    "services.automation.title": "Test Automation Services",
    "services.automation.1": "Custom automation framework development",
    "services.automation.2": "CI/CD pipeline integration and optimization",
    "services.automation.3": "API and web application automation",
    "services.automation.4": "Performance and load testing automation",

    // Contact Section
    "contact.title": "Let's Work Together",
    "contact.subtitle":
      "Ready to elevate your software quality? Let's discuss how I can help ensure your project's success.",
    "contact.getInTouch": "Get In Touch",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.linkedin": "LinkedIn",
    "contact.location": "Location",
    "contact.whyChoose": "Why Choose Me?",
    "contact.why.1": "5+ years of proven QA expertise",
    "contact.why.2": "End-to-end testing solutions",
    "contact.why.3": "Agile and DevOps integration",
    "contact.why.4": "Flexible engagement models",
    "contact.form.title": "Send a Message",
    "contact.form.subtitle": "Let's discuss your project requirements and how I can help",
    "contact.form.firstName": "First Name",
    "contact.form.lastName": "Last Name",
    "contact.form.email": "Email",
    "contact.form.projectType": "Project Type",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell me about your project...",
    "contact.form.send": "Send Message",

    // Form messages
    "form.sending": "Sending...",
    "form.success": "Your messages have been prepared! Check your email and WhatsApp applications.",
    "form.error": "Error sending message. Please try again.",

    // Footer
    "footer.tagline": "Delivering excellence through comprehensive quality assurance",
    "footer.copyright": "© 2024 Étienne Poutchoko. All rights reserved.",

    // CV Download
    "cv.download": "Download Resume",
    "cv.downloadEn": "Download English CV",
    "cv.downloadFr": "Download French CV",

    // Language flags
    "lang.flag.en": "🇺🇸",
    "lang.flag.fr": "🇫🇷",
    "lang.text.en": "EN",
    "lang.text.fr": "FR",
  },
  fr: {
    // Navigation
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.services": "Services",
    "nav.contact": "Contact",

    // Hero Section
    "hero.badge": "Expert en Assurance Qualité",
    "hero.title": "Étienne Poutchoko  Emako-",
    "hero.subtitle": "Ingénieur QA",
    "hero.description":
      "Ingénieur QA expérimenté spécialisé dans l'automatisation des tests, les tests de performance et l'intégration CI/CD. Passionné par la livraison de solutions logicielles de haute qualité dans diverses industries.",
    "hero.cta.contact": "Me Contacter",
    "hero.cta.resume": "Télécharger CV",
    "hero.metric.label": "Taux de Détection de Bugs",

    // About Section
    "about.title": "À Propos de Moi",
    "about.subtitle":
      "Passionné par la livraison d'expériences utilisateur parfaites grâce à des stratégies de test complètes",
    "about.journey.title": "Parcours Professionnel",
    "about.journey.p1":
      "Avec une solide expérience en QA, j'ai contribué à des projets diversifiés, incluant les paiements numériques, la conformité réglementaire régionale (CEMAC), les plateformes immobilières et les systèmes d'assurance. Mon expérience s'étend aux projets locaux et internationaux, livrant des solutions logicielles de haute qualité aux clients européens et aux projets de la région CEMAC.",
    "about.journey.p2":
      "Je me concentre sur la création de frameworks de test robustes et l'amélioration continue des processus pour assurer la qualité à chaque étape du développement. Mon objectif est non seulement d'identifier les bugs mais aussi de les prévenir, garantissant une expérience utilisateur fluide.",
    "about.philosophy.title": "Philosophie Fondamentale",
    "about.philosophy.text":
      "\"La qualité est un processus continu, pas seulement une vérification finale.\" J'applique une attention méticuleuse aux détails dans chaque projet, m'assurant que la qualité est intégrée dans chaque phase du cycle de développement. Mon expertise couvre diverses méthodologies de test, s'adaptant aux besoins spécifiques de chaque projet.",
    "about.achievements.title": "Réalisations Clés",
    "about.achievements.cemac": "Projets CEMAC",
    "about.achievements.european": "Clients Européens",
    "about.achievements.automation": "Couverture Automatisation",
    "about.achievements.experience": "Années d'Expérience",
    "about.availability.title": "Disponibilité",
    "about.availability.projects": "Disponible pour nouveaux projets",
    "about.availability.remote": "Travail à distance et sur site",
    "about.availability.flexible": "Fuseaux horaires flexibles",

    // Skills Section
    "skills.title": "Expertise & Compétences",
    "skills.subtitle": "Capacités de test complètes dans plusieurs domaines et technologies",
    "skills.automation.title": "Automatisation des Tests",
    "skills.automation.desc": "Solutions de test automatisées évolutives",
    "skills.api.title": "Tests d'API",
    "skills.api.desc": "Outils pour la validation et la performance des API",
    "skills.cicd.title": "Outils CI/CD",
    "skills.cicd.desc": "Expertise en intégration et déploiement",
    "skills.documentation.title": "Documentation",
    "skills.documentation.desc": "Outils pour créer et gérer la documentation de test",
    "skills.functional.title": "Tests Fonctionnels",
    "skills.functional.desc": "Validation complète de la fonctionnalité logicielle",
    "skills.other.title": "Autres Compétences",
    "skills.other.desc": "Compétences supplémentaires pertinentes",

    // Projects Section
    "projects.title": "Projets Phares",
    "projects.subtitle": "Présentation d'implémentations de tests réussies dans diverses industries",
    "projects.arsy.title": "ARSy - Réglementation CEMAC",
    "projects.arsy.desc": "Tests pour la conformité réglementaire dans la région CEMAC",
    "projects.arsy.text": "Assurer la conformité aux réglementations CEMAC grâce à des tests et validations complets.",
    "projects.payunit.title": "Plateforme de Paiement PayUnit",
    "projects.payunit.desc": "Tests de bout en bout pour une plateforme de paiement numérique",
    "projects.payunit.text":
      "Tests complets du traitement des paiements, de la sécurité et de l'expérience utilisateur pour une plateforme de paiement numérique.",
    "projects.activa.title": "Plateforme d'Assurance Activa",
    "projects.activa.desc": "QA pour un système de gestion d'assurance",
    "projects.activa.text":
      "Assurance qualité pour une plateforme d'assurance, couvrant la gestion des polices, le traitement des réclamations et les interactions clients.",
    "projects.urbany.title": "URBANY - Projet CEMAC",
    "projects.urbany.desc": "QA pour une plateforme immobilière dans la région CEMAC",
    "projects.urbany.text":
      "Assurance qualité pour une plateforme immobilière, couvrant les annonces immobilières et les interactions utilisateur.",
    "projects.d4lean.title": "D4 Lean - Client Européen",
    "projects.d4lean.desc": "QA pour une plateforme de gestion lean européenne",
    "projects.d4lean.text":
      "Assurance qualité pour une plateforme européenne de gestion lean et d'optimisation des processus.",
    "projects.eztrip.title": "EZ Trip - European Client",
    "projects.eztrip.desc": "QA pour une plateforme de gestion de voyage européenne",
    "projects.eztrip.text": "Assurance qualité pour une plateforme européenne de gestion de voyage.",
    "projects.seeMore": "Cliquer pour voir plus",
    "projects.modal.close": "Fermer",
    "projects.modal.technologies": "Technologies Utilisées",
    "projects.modal.duration": "Durée du Projet",
    "projects.modal.role": "Mon Rôle",
    "projects.modal.challenges": "Défis Principaux",
    "projects.modal.results": "Résultats Obtenus",

    // Services Section
    "services.title": "Services Offerts",
    "services.subtitle": "Solutions QA complètes adaptées à vos besoins spécifiques",
    "services.consulting.title": "Conseil & Stratégie QA",
    "services.consulting.1": "Développement et optimisation de stratégies de test",
    "services.consulting.2": "Amélioration des processus QA et meilleures pratiques",
    "services.consulting.3": "Formation d'équipe et transfert de connaissances",
    "services.consulting.4": "Configuration de métriques et rapports qualité",
    "services.automation.title": "Services d'Automatisation des Tests",
    "services.automation.1": "Développement de frameworks d'automatisation personnalisés",
    "services.automation.2": "Intégration et optimisation de pipelines CI/CD",
    "services.automation.3": "Automatisation d'API et d'applications web",
    "services.automation.4": "Automatisation des tests de performance et de charge",

    // Contact Section
    "contact.title": "Travaillons Ensemble",
    "contact.subtitle":
      "Prêt à élever la qualité de votre logiciel ? Discutons de comment je peux aider à assurer le succès de votre projet.",
    "contact.getInTouch": "Me Contacter",
    "contact.email": "Email",
    "contact.phone": "Téléphone",
    "contact.linkedin": "LinkedIn",
    "contact.location": "Localisation",
    "contact.whyChoose": "Pourquoi Me Choisir ?",
    "contact.why.1": "5+ années d'expertise QA prouvée",
    "contact.why.2": "Solutions de test de bout en bout",
    "contact.why.3": "Intégration Agile et DevOps",
    "contact.why.4": "Modèles d'engagement flexibles",
    "contact.form.title": "Envoyer un Message",
    "contact.form.subtitle": "Discutons de vos exigences de projet et comment je peux aider",
    "contact.form.firstName": "Prénom",
    "contact.form.lastName": "Nom",
    "contact.form.email": "Email",
    "contact.form.projectType": "Type de Projet",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Parlez-moi de votre projet...",
    "contact.form.send": "Envoyer le Message",

    // Form messages
    "form.sending": "Envoi en cours...",
    "form.success": "Vos messages ont été préparés ! Vérifiez vos applications email et WhatsApp.",
    "form.error": "Erreur lors de l'envoi du message. Veuillez réessayer.",

    // Footer
    "footer.tagline": "Livrer l'excellence grâce à une assurance qualité complète",
    "footer.copyright": "© 2024 Étienne Poutchoko. Tous droits réservés.",

    // CV Download
    "cv.download": "Télécharger CV",
    "cv.downloadEn": "Télécharger CV Anglais",
    "cv.downloadFr": "Télécharger CV Français",

    // Language flags
    "lang.flag.en": "🇺🇸",
    "lang.flag.fr": "🇫🇷",
    "lang.text.en": "EN",
    "lang.text.fr": "FR",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    const translation = translations[language][key as keyof (typeof translations)["en"]]
    return translation || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
