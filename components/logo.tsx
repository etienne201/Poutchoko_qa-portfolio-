"use client"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 50, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`relative group block ${className}`}>
      <div className="relative flex items-center justify-center">
        <div
          className="relative overflow-hidden rounded-full shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-110 border-2 border-white/20 group-hover:border-white/40"
          style={{ width: size, height: size }}
        >
          <Image
            src="/images/logo.jpg"
            alt="Étienne Poutchoko  Emako- QA Engineer"
            width={size}
            height={size}
            className="rounded-full object-cover w-full h-full"
            priority
          />

          {/* Overlay effects */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-md opacity-0 group-hover:opacity-60 transition-all duration-500 -z-10"></div>
      </div>
    </Link>
  )
}
