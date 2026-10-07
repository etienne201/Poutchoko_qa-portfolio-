"use client"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 44, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`relative group inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full ${className}`}
      aria-label="Poutchoko Emako Étienne — Senior QA Automation Engineer Portfolio"
    >
      <div
        className="relative rounded-full transition-transform duration-300 ease-out group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(15,23,42,0.1)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_4px_16px_rgba(2,132,199,0.25)] dark:group-hover:drop-shadow-[0_4px_16px_rgba(56,189,248,0.35)]"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/logo-badge.png"
          alt="Poutchoko Emako Étienne — Senior QA Automation Engineer"
          width={size * 2}
          height={size * 2}
          className="rounded-full object-contain w-full h-full"
          priority
        />
      </div>
    </Link>
  )
}
