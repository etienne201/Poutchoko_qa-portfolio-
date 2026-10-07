"use client"
import React from "react"
import {
  Terminal,
  Network,
  CheckCircle2,
  Workflow,
  Smartphone,
  CreditCard,
  ShieldCheck,
  FileText,
  FileSpreadsheet,
  Search,
} from "lucide-react"

interface TechIconProps {
  name: string
  className?: string
  size?: number
}

export function TechIcon({ name = "", className = "w-4 h-4", size = 16 }: TechIconProps) {
  const norm = (name || "").toLowerCase().trim()

  // 1. Cypress
  if (norm.includes("cypress")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-emerald-400 ${className}`}
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="50 12" />
        <path
          d="M14.5 9.5C13.8 8.6 12.8 8 11.5 8C9.5 8 8 9.8 8 12C8 14.2 9.5 16 11.5 16C12.8 16 13.8 15.4 14.5 14.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path d="M16 11L14 16.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  }

  // 2. Playwright
  if (norm.includes("playwright")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-green-400 ${className}`}
      >
        <path
          d="M17.5 7.5C16 4.5 12.5 3 9.5 4.5C6.5 6 5 9.5 6.5 12.5C8 15.5 11.5 17 14.5 15.5C17.5 14 19 10.5 17.5 7.5Z"
          stroke="#45ba4b"
          strokeWidth="2"
        />
        <path
          d="M19 11.5C17.8 8.5 14.3 7 11.3 8.2C8.3 9.4 6.8 12.9 8 15.9C9.2 18.9 12.7 20.4 15.7 19.2C18.7 18 20.2 14.5 19 11.5Z"
          stroke="#2ead33"
          strokeWidth="1.8"
          strokeDasharray="2 2"
        />
        <circle cx="10.5" cy="8.5" r="1" fill="#45ba4b" />
        <circle cx="14" cy="13" r="1" fill="#45ba4b" />
      </svg>
    )
  }

  // 3. Robot Framework
  if (norm.includes("robot")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-cyan-400 ${className}`}
      >
        <rect x="5" y="7" width="14" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
        <path d="M12 3V7M8 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="2" cy="13" r="1" fill="currentColor" />
        <circle cx="22" cy="13" r="1" fill="currentColor" />
      </svg>
    )
  }

  // 4. Postman
  if (norm.includes("postman")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-orange-400 ${className}`}
      >
        <circle cx="12" cy="12" r="9" stroke="#FF6C37" strokeWidth="2" />
        <path
          d="M7 11.5L16.5 7L13 16.5L11.2 13L7 11.5Z"
          fill="#FF6C37"
          stroke="#FF6C37"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M11.2 13L16.5 7" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }

  // 5. Gatling
  if (norm.includes("gatling")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-amber-400 ${className}`}
      >
        <circle cx="12" cy="12" r="9" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="#f59e0b" />
        <circle cx="12" cy="6" r="1.5" fill="#f59e0b" />
        <circle cx="17.2" cy="9" r="1.5" fill="#f59e0b" />
        <circle cx="17.2" cy="15" r="1.5" fill="#f59e0b" />
        <circle cx="12" cy="18" r="1.5" fill="#f59e0b" />
        <circle cx="6.8" cy="15" r="1.5" fill="#f59e0b" />
        <circle cx="6.8" cy="9" r="1.5" fill="#f59e0b" />
      </svg>
    )
  }

  // 6. GitLab / GitLab CI / GitLab CI/CD
  if (norm.includes("gitlab")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-orange-500 ${className}`}
      >
        <path
          d="M22 13.5L19.5 5.5L17 13.5H7L4.5 5.5L2 13.5L12 21.5L22 13.5Z"
          stroke="#fc6d26"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M12 21.5L17 13.5H7L12 21.5Z" fill="#e24329" />
        <path d="M2 13.5L7 13.5L4.5 5.5L2 13.5Z" fill="#fca326" />
        <path d="M22 13.5L17 13.5L19.5 5.5L22 13.5Z" fill="#fca326" />
      </svg>
    )
  }

  // 7. Jenkins
  if (norm.includes("jenkins")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-red-400 ${className}`}
      >
        <circle cx="12" cy="9" r="5" stroke="#d33833" strokeWidth="2" />
        <path d="M8 17C8 14.8 9.8 13 12 13C14.2 13 16 14.8 16 17V21H8V17Z" fill="#d33833" />
        <path d="M7 6H17" stroke="#335061" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M9 3H15V6H9V3Z" fill="#335061" />
        <circle cx="10.5" cy="8.5" r="1" fill="#ffffff" />
        <circle cx="13.5" cy="8.5" r="1" fill="#ffffff" />
      </svg>
    )
  }

  // 8. Docker
  if (norm.includes("docker")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-sky-400 ${className}`}
      >
        <path
          d="M2 13C2 17.4 5.6 21 10 21C15 21 19.5 17 21 13C21 12 20 12 19 12C18 12 17.5 13 16 13C14.5 13 14 12 12.5 12C11 12 10.5 13 9 13C7.5 13 7 12 5.5 12C4 12 3 12.5 2 13Z"
          stroke="#0db7ed"
          strokeWidth="1.8"
          fill="#0db7ed"
          fillOpacity="0.2"
        />
        <rect x="5" y="8" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
        <rect x="8.5" y="8" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
        <rect x="12" y="8" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
        <rect x="8.5" y="4.5" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
        <rect x="12" y="4.5" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
      </svg>
    )
  }

  // 9. Git
  if (norm === "git") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-orange-400 ${className}`}
      >
        <path
          d="M19.5 10.5L13.5 4.5C12.7 3.7 11.3 3.7 10.5 4.5L4.5 10.5C3.7 11.3 3.7 12.7 4.5 13.5L10.5 19.5C11.3 20.3 12.7 20.3 13.5 19.5L19.5 13.5C20.3 12.7 20.3 11.3 19.5 10.5Z"
          stroke="#F05032"
          strokeWidth="2"
        />
        <circle cx="9.5" cy="14.5" r="1.5" fill="#F05032" />
        <circle cx="14.5" cy="9.5" r="1.5" fill="#F05032" />
        <path d="M9.5 13V8.5M14.5 9.5L10.5 13.5" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  // 10. Xray / JIRA
  if (norm.includes("xray") || norm.includes("jira")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-blue-400 ${className}`}
      >
        <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="#2684FF" strokeWidth="2" />
        <path
          d="M8.5 12L11 14.5L15.5 10"
          stroke="#0052CC"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  // 11. ClickUp
  if (norm.includes("clickup")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-purple-400 ${className}`}
      >
        <path
          d="M4 14.5L12 7.5L20 14.5"
          stroke="#7B68EE"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="18" r="2.5" fill="#FF007F" />
      </svg>
    )
  }

  // 12. SonarQube
  if (norm.includes("sonar")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-cyan-400 ${className}`}
      >
        <circle cx="12" cy="12" r="9" stroke="#4B9FD5" strokeWidth="2" />
        <path
          d="M7 14C8.5 11 11 9 14 9M9 16C10.5 14 12.5 13 15 13"
          stroke="#4B9FD5"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // 13. Python
  if (norm.includes("python")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <path
          d="M11.9 2C8.6 2 8.7 3.4 8.7 3.4V5H12V5.5H5.8C5.8 5.5 2 5.1 2 9.5C2 13.9 5.3 13.8 5.3 13.8H6.8V12C6.8 9.9 8.6 9.9 8.6 9.9H13.6C15.6 9.9 15.6 8 15.6 8V3.6C15.6 3.6 15.9 2 11.9 2Z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22C15.4 22 15.3 20.6 15.3 20.6V19H12V18.5H18.2C18.2 18.5 22 18.9 22 14.5C22 10.1 18.7 10.2 18.7 10.2H17.2V12C17.2 14.1 15.4 14.1 15.4 14.1H10.4C8.4 14.1 8.4 16 8.4 16V20.4C8.4 20.4 8.1 22 12.1 22Z"
          fill="#FFD43B"
        />
        <circle cx="10.2" cy="3.5" r="0.7" fill="#ffffff" />
        <circle cx="13.8" cy="20.5" r="0.7" fill="#ffffff" />
      </svg>
    )
  }

  // 14. JavaScript / TypeScript
  if (norm.includes("typescript") || norm === "ts") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M6 9H13M9.5 9V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M14 16C15 17 17.5 17 17.5 15.5C17.5 13.5 14 14 14 11.5C14 10 16 9.5 17.5 10"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (norm.includes("javascript") || norm === "js") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          d="M8 12V16.5C8 17.5 7 17.5 6 17"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M13 16.5C14.5 17.5 17.5 17 17.5 15C17.5 13 13 13.5 13 11C13 9.5 15 9 17 9.5"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // 15. Cucumber / BDD / Gherkin
  if (norm.includes("cucumber") || norm.includes("bdd") || norm.includes("gherkin")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-emerald-400 ${className}`}
      >
        <ellipse cx="12" cy="12" rx="7" ry="10" stroke="#23D96C" strokeWidth="2" fill="#23D96C" fillOpacity="0.2" />
        <circle cx="10" cy="8" r="1" fill="#23D96C" />
        <circle cx="14" cy="12" r="1" fill="#23D96C" />
        <circle cx="10" cy="16" r="1" fill="#23D96C" />
      </svg>
    )
  }

  // 16. GitHub / GitHub Actions
  if (norm.includes("github")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`inline-block flex-shrink-0 text-slate-200 ${className}`}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    )
  }

  // 17. Linux / Bash / Shell / Terminal
  if (norm.includes("bash") || norm.includes("shell") || norm.includes("linux")) {
    return <Terminal className={`text-emerald-400 ${className}`} style={{ width: size, height: size }} />
  }

  // 18. SQL / PostgreSQL / MySQL / Database
  if (norm.includes("sql") || norm.includes("database") || norm.includes("postgres")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-cyan-400 ${className}`}
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2" />
        <path d="M21 12C21 13.66 16.97 15 12 15C7.03 15 3 13.66 3 12" stroke="currentColor" strokeWidth="2" />
        <path d="M3 5V19C3 20.66 7.03 22 12 22C16.97 22 21 20.66 21 19V5" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  // 19. Allure Reporting
  if (norm.includes("allure")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 text-yellow-400 ${className}`}
      >
        <circle cx="12" cy="12" r="9" stroke="#E5A823" strokeWidth="2" />
        <path d="M12 7V17M7 12L12 7L17 12" stroke="#E5A823" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // 20. Appium / Mobile Testing
  if (norm.includes("appium") || norm.includes("maestro") || norm.includes("mobile")) {
    return <Smartphone className={`text-purple-400 ${className}`} style={{ width: size, height: size }} />
  }

  // 21. Mobile Money / Orange / MTN
  if (norm.includes("money") || norm.includes("orange") || norm.includes("mtn")) {
    return <Smartphone className={`text-emerald-400 ${className}`} style={{ width: size, height: size }} />
  }

  // 22. Visa / PayPal / Payment systems
  if (norm.includes("visa") || norm.includes("paypal") || norm.includes("payment")) {
    return <CreditCard className={`text-indigo-400 ${className}`} style={{ width: size, height: size }} />
  }

  // 23. REST API / API Testing / Webhooks
  if (norm.includes("api") || norm.includes("webhook")) {
    return <Network className={`text-sky-400 ${className}`} style={{ width: size, height: size }} />
  }

  // 24. Google Docs / Sheets / Workspace
  if (norm.includes("sheet")) {
    return <FileSpreadsheet className={`text-emerald-400 ${className}`} style={{ width: size, height: size }} />
  }
  if (norm.includes("doc")) {
    return <FileText className={`text-blue-400 ${className}`} style={{ width: size, height: size }} />
  }

  // 25. Agile / Scrum
  if (norm.includes("agile") || norm.includes("scrum")) {
    return <Workflow className={`text-purple-400 ${className}`} style={{ width: size, height: size }} />
  }

  // 26. Security Testing
  if (norm.includes("security")) {
    return <ShieldCheck className={`text-emerald-400 ${className}`} style={{ width: size, height: size }} />
  }

  // 27. Defect Lifecycle / Bug Tracking / Manual testing / STLC
  if (norm.includes("manual") || norm.includes("test case") || norm.includes("stlc") || norm.includes("defect")) {
    return <Search className={`text-amber-400 ${className}`} style={{ width: size, height: size }} />
  }

  // 28. Automation general / Code / Scripting
  if (norm.includes("automation") || norm.includes("code") || norm.includes("pom") || norm.includes("framework")) {
    return <Terminal className={`text-blue-400 ${className}`} style={{ width: size, height: size }} />
  }

  // Default fallback
  return <CheckCircle2 className={`text-blue-400 ${className}`} style={{ width: size, height: size }} />
}

interface TechBadgeProps {
  name: string
  className?: string
  size?: "sm" | "md"
}

export function TechBadge({ name, className = "", size = "md" }: TechBadgeProps) {
  const isSm = size === "sm"

  return (
    <span
      className={`inline-flex items-center space-x-1.5 rounded-lg bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/[0.2] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] transition-all duration-200 ${
        isSm ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      } font-medium shadow-sm dark:shadow-subtle ${className}`}
    >
      <TechIcon name={name} size={isSm ? 13 : 15} />
      <span>{name}</span>
    </span>
  )
}
