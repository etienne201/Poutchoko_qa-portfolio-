"use client"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none transition-colors duration-300">
      {/* Base gradient adaptatif : Alabaster clair en Light, Noir ardoisé profond du logo en Dark */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#081018] transition-colors duration-300" />

      {/* Halo radial d'ambiance basé sur les reflets cyan/cobalt du logo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(2,132,199,0.08),rgba(248,250,252,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.12),rgba(8,16,24,0))] transition-all duration-300" />

      {/* Grille technique de précision QA / Engineering */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          color: "var(--color-text)",
        }}
      />

      {/* Ambient lighting discret inspiré du logo */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/[0.04] dark:bg-sky-500/[0.07] rounded-full blur-[140px]" />
      <div className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-cyan-600/[0.03] dark:bg-cyan-600/[0.05] rounded-full blur-[160px]" />

      {/* Vignette subtile pour accentuer le focus central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(248,250,252,0.6)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_45%,rgba(8,16,24,0.9)_100%)]" />
    </div>
  )
}
