"use client"
import { LanguageProvider } from "@/hooks/use-language"
import { AnimatedBackground } from "@/components/animated-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { QAExpertiseSection } from "@/components/qa-expertise-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { MobileContactBar } from "@/components/mobile-contact-bar"

function PortfolioContent() {
  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* Dynamic Background */}
      <AnimatedBackground />

      {/* Main Navigation */}
      <Navbar />

      {/* Page Content Flow */}
      <main className="flex-1 w-full overflow-hidden">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. About & Storytelling */}
        <AboutSection />

        {/* 3. QA Methodology & Engineering Maturity */}
        <QAExpertiseSection />

        {/* 4. Verified Professional Experience Timeline */}
        <ExperienceSection />

        {/* 5. Technical Skills & Tools */}
        <SkillsSection />

        {/* 6. Case Studies & Real Projects */}
        <ProjectsSection />

        {/* 7. Education, Languages & Soft Skills */}
        <EducationSection />

        {/* 8. Conversion & Contact System */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileContactBar />
    </div>
  )
}

export default function QAPortfolio() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  )
}
