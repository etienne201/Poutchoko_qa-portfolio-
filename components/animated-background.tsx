"use client"

import Image from "next/image"

/**
 * Arrière-plan global de la Home Page.
 * Calque `fixed` couvrant le viewport : une seule image continue du Hero au footer,
 * sans répétition ni coupure. Cette approche remplace `background-attachment: fixed`
 * (non supporté sur iOS/Android) tout en offrant le même effet parallax-like partout.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none transition-colors duration-300"
    >
      {/* Couleur de base (affichée pendant le chargement de l'image) */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#081018] transition-colors duration-300" />

      {/* Photo d'arrière-plan globale — cadrage adapté selon l'écran */}
      <Image
        src="/images/hero-background.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-[60%_center] md:object-center scale-105"
      />

      {/* Voile principal : laisse respirer l'image tout en garantissant le contraste */}
      <div className="absolute inset-0 bg-[#f8fafc]/[0.72] dark:bg-[#081018]/[0.62] transition-colors duration-300" />

      {/* Dégradé vertical subtil : renforce la lisibilité haut/bas (navbar & footer) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/40 via-transparent to-[#f8fafc]/60 dark:from-[#081018]/50 dark:via-transparent dark:to-[#081018]/70" />

      {/* Halo radial d'ambiance basé sur les reflets cyan/cobalt du logo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(2,132,199,0.10),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.14),transparent)]" />

      {/* Grille technique de précision QA / Engineering */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          color: "var(--color-text)",
        }}
      />

      {/* Vignette subtile pour accentuer le focus central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(248,250,252,0.55)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_50%,rgba(8,16,24,0.75)_100%)]" />
    </div>
  )
}
