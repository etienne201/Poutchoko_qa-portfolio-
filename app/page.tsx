"use client"
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
import { SectionRail } from "@/components/navigation/section-rail"
import { FloatingBackToTop } from "@/components/navigation/floating-back-to-top"
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll"

export default function QAPortfolio() {
  return (
    <div className="min-h-screen relative isolate flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* Dynamic Background */}
      <AnimatedBackground />

      {/* Main Navigation */}
      <Navbar />

      {/* Page Content Flow */}
      <main id="main-content" className="flex-1 w-full overflow-x-clip">
        {/* 1. Hero Section (rendu immédiat pour LCP optimal) */}
        <HeroSection />

        {/* 2. About & Storytelling */}
        <RevealOnScroll>
          <AboutSection />
        </RevealOnScroll>

        {/* 3. QA Methodology & Engineering Maturity */}
        <RevealOnScroll>
          <QAExpertiseSection />
        </RevealOnScroll>

        {/* 4. Verified Professional Experience Timeline */}
        <RevealOnScroll>
          <ExperienceSection />
        </RevealOnScroll>

        {/* 5. Technical Skills & Tools */}
        <RevealOnScroll>
          <SkillsSection />
        </RevealOnScroll>

        {/* 6. Case Studies & Real Projects */}
        <RevealOnScroll>
          <ProjectsSection />
        </RevealOnScroll>

        {/* 7. Education, Languages & Soft Skills */}
        <RevealOnScroll>
          <EducationSection />
        </RevealOnScroll>

        {/* 8. Conversion & Contact System */}
        <RevealOnScroll>
          <ContactSection />
        </RevealOnScroll>
      </main>

      {/* Footer */}
      <Footer />

      {/* Micro-rail latéral discret sur très grands écrans */}
      <SectionRail />

      {/* Retour en haut flottant (Mobile / Tablette / Desktop <2xl) */}
      <FloatingBackToTop />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileContactBar />
    </div>
  )
}
