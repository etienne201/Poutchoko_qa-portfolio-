<div align="center">

# 🚀 Poutchoko QA Portfolio
### **Senior QA Automation Engineer | FinTech, RegTech & European SaaS**

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![QA Tests](https://img.shields.io/badge/QA_Tests-21%2F21_Passing-10b981?style=for-the-badge&logo=checkmarx)](scripts/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Production_Ready-000000?style=for-the-badge&logo=vercel)](https://poutchoko-qa-portfolio.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br />

**[🌐 Live Portfolio](https://poutchoko-qa-portfolio.vercel.app)** • **[📄 Interactive CV](https://poutchoko-qa-portfolio.vercel.app/cv)** • **[🛠️ CV Builder Studio](https://poutchoko-qa-portfolio.vercel.app/cv-builder)** • **[💼 LinkedIn Profile](https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184/)** • **[📧 Email Contact](mailto:poutchokoetienne@gmail.com)**

<br />

> *"Transforming software testing from a delivery bottleneck into an automated, predictable deployment accelerator."*

</div>

---

## 📋 Table of Contents

- [Overview & Value Proposition](#-overview--value-proposition)
- [Key Engineering Metrics](#-key-engineering-metrics)
- [Core Features](#-core-features)
  - [1. Interactive Portfolio Showcase](#1-interactive-portfolio-showcase)
  - [2. Dual-Language Architecture (i18n)](#2-dual-language-architecture-i18n)
  - [3. Hardened Contact & Lead Generation Pipeline](#3-hardened-contact--lead-generation-pipeline)
  - [4. Dedicated CV Viewer & Print Engine](#4-dedicated-cv-viewer--print-engine)
  - [5. ATS CV Builder Studio](#5-ats-cv-builder-studio)
  - [6. Automated Headless PDF Generator](#6-automated-headless-pdf-generator)
- [Architecture & Directory Structure](#-architecture--directory-structure)
- [Technology Stack](#-technology-stack)
- [Automated Testing & Quality Gates](#-automated-testing--quality-gates)
- [Prerequisites](#-prerequisites)
- [Installation & Quick Start](#-installation--quick-start)
- [Environment Configuration](#-environment-configuration)
- [Available Scripts](#-available-scripts)
- [Production Deployment](#-production-deployment)
- [Engineering Best Practices & Defense-in-Depth](#-engineering-best-practices--defense-in-depth)
- [Author & Contact Information](#-author--contact-information)
- [License](#-license)

---

## 🎯 Overview & Value Proposition

**Poutchoko QA Portfolio** is a high-performance web application built with **Next.js 15 (App Router)**, **TypeScript 5**, and **Tailwind CSS**. Rather than serving as a passive static portfolio, this project is engineered as an active demonstration of **Software Quality Assurance (QA) maturity**, defense-in-depth security, and modern full-stack web engineering.

The platform showcases the verified 6+ year career of **Poutchoko Emako Étienne**—a Senior QA Automation Engineer specialized in:
- **FinTech & Digital Payments:** Real-time transaction validation across Mobile Money, Visa, MasterCard, and PayPal gateways with zero financial data leaks.
- **RegTech & Regional Governance:** Quality leadership on mission-critical national platforms across the **CEMAC** region (**ARSy** and **URBANY**).
- **European SaaS Systems:** Architecting scalable automated testing frameworks (Cypress, Playwright, Robot Framework) for distributed squads across Europe.
- **CI/CD Quality Gates:** Automated test execution pipelines in GitLab CI/CD, Jenkins, and Docker, preventing defect escape into production.

---

## 📊 Key Engineering Metrics

```
┌───────────────────────────────────────┬───────────────────────────────────────┐
│        -40% REGRESSION CYCLE          │        +60% AUTOMATION COVERAGE       │
│   Parallelized Cypress & GitLab CI    │     E2E UI, API & Multi-Provider      │
├───────────────────────────────────────┼───────────────────────────────────────┤
│        -35% PRODUCTION DEFECTS        │       0 CRITICAL DATA LEAKS (PROD)    │
│      Strict CI/CD Quality Gates       │       RegTech & Payment Systems       │
└───────────────────────────────────────┴───────────────────────────────────────┘
```

---

## ✨ Core Features

### 1. Interactive Portfolio Showcase
- **Hero & Storytelling:** Strategic positioning highlighting experience, availability for international remote and freelance contracts, and verified technical credentials.
- **QA Methodology & Maturity:** Interactive breakdown of STLC stages, test pyramid distribution, Shift-Left testing philosophy, and risk-based test prioritization.
- **Verified Experience Timeline:** Detailed case studies for Seven Common Factors (Seven GPS), Bainkode Dev (Italy/Remote), and enterprise clients.
- **Case Studies Modal Explorer:** Deep dive into real-world challenges, technical solutions, and quantified results with keyboard accessibility (`Esc`, left/right navigation).
- **Dark / Light Theme Engine:** Smooth theme switching with zero flash of unstyled content (FOUC), powered by `next-themes` and CSS custom properties.
- **Mobile Sticky Quick-Action Bar:** Fixed bottom drawer on mobile viewports providing instantaneous one-tap access to WhatsApp, phone call, email, and CV download.

### 2. Dual-Language Architecture (i18n)
- Seamless real-time switching between **English (EN)** and **French (FR)**.
- Localized JSON dictionaries under `locales/` ensuring unified terminology for technical testing concepts.
- URL query parameter synchronization (`?lang=en` or `?lang=fr`) with localStorage persistence and zero layout shifts.

### 3. Hardened Contact & Lead Generation Pipeline
A production-grade backend contact API route (`/api/contact`) engineered with defensive security patterns:
- **Sliding-Window IP Rate Limiting:** Restricts abusive traffic to 5 requests per 10-minute window per IP.
- **Anti-Spoofing Proxy Resolution:** Resolves client IPs using trusted reverse-proxy headers (`x-real-ip` and the last hop of `x-forwarded-for`).
- **Honeypot Anti-Spam Trap:** Hidden trap fields that intercept automated bots silently without penalizing genuine users.
- **Zod Schema Validation:** Strict field type, length, and email format assertions with localized error feedback.
- **HTML Sanitization & CRLF Injection Prevention:** Defense against XSS payloads and header injection attacks on email transports.
- **Resilient Dual Delivery & Graceful Fallback:** Integrates with the **Resend API**, accompanied by auto-generated prefilled deep links for **WhatsApp** and **Gmail Webmail** featuring unique tracking references (`QA-XXXX`).

### 4. Dedicated CV Viewer & Print Engine
- Dedicated route at `/cv` displaying an ATS-friendly, structured curriculum vitae.
- Native browser print styling (`@media print`) configured to eliminate unwanted headers, footers, and margins, delivering a crisp 2-page printout.
- One-click downloads for official bilingually compiled PDF documents:
  - `CV_Poutchoko_Emako_Etienne_EN.pdf`
  - `CV_Poutchoko_Emako_Etienne_FR.pdf`

### 5. ATS CV Builder Studio
Located at `/cv-builder`, this full-featured tool empowers candidates and recruiters to evaluate and customize resumes:
- **Real-Time ATS Score Card (0-100%):** Weighted algorithm evaluating section completion, quantifiable metrics, keywords, and action verbs.
- **Dynamic Form Editor:** Live manipulation of personal information, executive summaries, work experience, education, certifications, and technical proficiencies.
- **Multi-Template Selector:** Instant visual switching between `Modern`, `ATS Minimalist`, and `Technical Blueprint` themes.
- **Export Capabilities:** Full JSON data backup/import, one-click copy of ATS-optimized plain text, and native browser print export.

### 6. Automated Headless PDF Generator
- Node.js automation script (`scripts/generate-cv-pdfs.mjs`) leveraging **Chromium/Chrome Headless Mode**.
- Renders the `/cv` route directly and outputs clean vector PDFs directly into `public/`, eliminating manual document formatting.

---

## 🏗️ Architecture & Directory Structure

The project follows the standard **Next.js 15 App Router** architecture, maintaining strict separation between presentation, state, and domain business logic:

```text
Poutchoko-qa-portfolio/
├── app/                              # Next.js App Router (pages, layouts, API)
│   ├── api/
│   │   └── contact/                  # POST /api/contact endpoint (Rate limit, Zod, Resend)
│   ├── cv/                           # Standalone CV Viewer page (?lang=fr|en)
│   ├── cv-builder/                   # Interactive ATS CV Builder studio page
│   ├── globals.css                   # Tailwind base, components, and print rules
│   ├── layout.tsx                    # Root layout with SEO metadata & theme provider
│   ├── not-found.tsx                 # Custom 404 error page
│   ├── page.tsx                      # Main single-page portfolio view
│   ├── robots.ts                     # Dynamic robots.txt generation
│   └── sitemap.ts                    # Dynamic sitemap.xml generation
│
├── components/                       # Reusable UI Components
│   ├── ui/                           # Primitive UI components (buttons, dialogs, badges)
│   ├── cv-builder/                   # Form editor, preview, toolbar, score card
│   ├── about-section.tsx             # Career narrative & background
│   ├── animated-background.tsx       # Subtle ambient gradient backdrop
│   ├── contact-section.tsx           # Contact form with fallback links & WhatsApp modal
│   ├── cv-download.tsx               # Download trigger & dropdown menu
│   ├── cv-viewer.tsx                 # Printable curriculum vitae layout
│   ├── experience-section.tsx        # Career timeline with company details
│   ├── hero-section.tsx              # Landing hero banner with credentials & CTA
│   ├── navbar.tsx                    # Responsive navigation with mobile menu & toggles
│   ├── projects-section.tsx          # Case study cards with detail modals
│   ├── qa-expertise-section.tsx      # QA methodologies, testing pyramid & metrics
│   └── skills-section.tsx            # Categorized tools & proficiency levels
│
├── hooks/                            # Custom React Hooks
│   └── use-language.tsx              # i18n Context, translation helper & locale state
│
├── lib/                              # Core Domain Services & Data Models
│   ├── contact-service.ts            # Rate limiter, XSS escaping, Zod schema, email logic
│   ├── cv-data.ts                    # Official bilingual profile data & ATS scoring engine
│   └── utils.ts                      # ClassName merger (clsx + tailwind-merge)
│
├── locales/                          # Internationalization dictionaries
│   ├── en/common.json                # English text strings
│   └── fr/common.json                # French text strings
│
├── public/                           # Static Assets & Public Documents
│   ├── cv/                           # HTML templates (cv-en.html, cv-fr.html)
│   ├── CV_Poutchoko_Emako_Etienne_EN.pdf  # Certified English Resume
│   ├── CV_Poutchoko_Emako_Etienne_FR.pdf  # Certified French Resume
│   ├── favicon.ico                   # Favicon icon
│   └── manifest.json                 # Web App Manifest
│
├── scripts/                          # Automated Verification & Build Scripts
│   ├── generate-cv-pdfs.mjs          # Headless Chromium PDF compiler
│   ├── test-contact-flow.mjs         # 9 automated tests for Contact service & security
│   └── test-cv-flow.mjs              # 12 automated tests for CV data, ATS & i18n
│
├── types/                            # TypeScript Type Definitions
│   └── cv.ts                         # CV models, score reports & template types
│
├── .env.example                      # Template for environment variables
├── package.json                      # Project dependencies & automation scripts
├── tailwind.config.ts                # Tailwind design system configuration
└── tsconfig.json                     # TypeScript strict compiler options
```

---

## 💻 Technology Stack

| Domain | Technologies |
|---|---|
| **Core Framework** | [Next.js 15.5](https://nextjs.org/) (App Router, Server Actions & Route Handlers) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict mode enabled) |
| **UI Library** | [React 18.3](https://react.dev/) |
| **Styling & Design** | [Tailwind CSS 3.4](https://tailwindcss.com/), [PostCSS](https://postcss.org/), `tailwindcss-animate` |
| **Component Primitives** | [Radix UI](https://www.radix-ui.com/) (`Slot`, `Dialog`, `DropdownMenu`), `class-variance-authority` |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) (Modern scalable icons) |
| **Theme Engine** | [Next Themes](https://github.com/pacocoursey/next-themes) (Light / Dark mode persistence) |
| **Validation & Schema** | [Zod 3.24](https://zod.dev/) (Runtime schema assertion & input validation) |
| **Email Transports** | [Resend 4.8](https://resend.com/) & [Nodemailer 10.1](https://nodemailer.com/) |
| **Testing & Verification** | Node.js native test runner & strict assertions (`node:assert/strict`) |
| **PDF Rendering** | Chromium / Google Chrome Headless CLI Engine |
| **Deployment & Hosting** | [Vercel](https://vercel.com/) (Edge-optimized serverless platform) |

---

## 🧪 Automated Testing & Quality Gates

In alignment with senior QA engineering standards, this repository includes built-in automated test suites executable directly via Node.js without third-party test bloat:

```bash
# Run the Contact Service Security & Delivery Test Suite (9 tests)
pnpm test:contact

# Run the CV Engine, ATS Scoring & i18n Test Suite (12 tests)
pnpm test:cv
```

### Test Coverage Highlights

```text
🚀 Contact Service Security Suite (9/9 Passed)
  ✔ Test 1: HTML injection escaping & CRLF sanitization
  ✔ Test 2: Name length validation (< 2 characters rejected)
  ✔ Test 3: RFC-compliant email address validation
  ✔ Test 4: Message minimum length boundary validation
  ✔ Test 5: Honeypot silent trap for automated bots
  ✔ Test 6: Fallback link generation (WhatsApp, Mailto, Gmail) with ref IDs
  ✔ Test 7: Sliding window IP rate limiter (HTTP 429 enforcement)
  ✔ Test 8: Spoofed X-Forwarded-For proxy rotation mitigation
  ✔ Test 9: Resend API provider outage resilience & graceful degradation

🧪 CV Engine & Multilingual Pipeline Suite (12/12 Passed)
  ✔ Test 1: Certified profile data completeness (Score >= 90%)
  ✔ Test 2: Blank profile baseline evaluation (Score 0% + recommendations)
  ✔ Test 3: Non-penalization of optional sections
  ✔ Test 4: Incremental score calculation algorithm
  ✔ Test 5: JSON serialization & roundtrip data integrity
  ✔ Test 6: ATS plain-text extraction format
  ✔ Test 7: Extreme volume resilience (stress payload testing)
  ✔ Test 8: Consistency of supported layout templates
  ✔ Test 9: Integrity of official compiled PDF binaries
  ✔ Test 10: Strict isolation between French and English datasets
  ✔ Test 11: 100% synchronization of i18n dictionary keys
  ✔ Test 12: Zero browser header contamination in print styling
```

---

## ⚙️ Prerequisites

Ensure your development environment meets the following minimum requirements:

- **Node.js:** `v18.18.0` or higher (Node 20+ LTS recommended)
- **Package Manager:** `pnpm` (recommended, `v8.0+`), or `npm` / `yarn`
- **Web Browser / Headless Engine:** Google Chrome, Chromium, or Brave (only required if running `pnpm generate:pdf`)

---

## 🚀 Installation & Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/etienne201/Poutchoko_qa-portfolio-.git
cd Poutchoko_qa-portfolio-
```

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Alternatively using npm
npm install
```

### 3. Configure Environment Variables
Copy the template configuration file:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your preferred credentials (see [Environment Configuration](#-environment-configuration)).

### 4. Launch Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔐 Environment Configuration

The application operates seamlessly in development mode with fallback transports even without external API keys. To enable live transactional email dispatch, configure the variables in `.env.local`:

```ini
# ==============================================================================
# Portfolio QA Automation - Environment Configuration (.env.local)
# ==============================================================================

# Resend API Key for automated contact form delivery
# Obtain your free API key at: https://resend.com
RESEND_API_KEY=re_your_api_key_here

# Sender email address verified in your Resend account
# Default free test domain: "Portfolio Contact <onboarding@resend.dev>"
# Custom verified domain: "Etienne Poutchoko <contact@yourdomain.com>"
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>

# Recipient email where contact submissions will be delivered
CONTACT_EMAIL_TO=poutchokoetienne@gmail.com

# Direct WhatsApp contact phone number (international format without + or spaces)
WHATSAPP_NUMBER=237657268355
```

> **Security Note:** Never commit `.env.local` to version control. It is strictly excluded by `.gitignore`.

---

## 📜 Available Scripts

All scripts can be executed via `pnpm <script>` (or `npm run <script>`):

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev` | Starts the local development server with Hot Module Replacement on `http://localhost:3000`. |
| `build` | `next build` | Compiles the production build, optimizes bundles, and generates static pages. |
| `start` | `next start` | Runs the compiled production server. |
| `lint` | `next lint` | Executes ESLint to check for code style issues, unused imports, and Next.js best practices. |
| `fix` | `next lint --fix` | Automatically corrects fixable linting and formatting issues. |
| `test:contact` | `node --experimental-strip-types scripts/test-contact-flow.mjs` | Runs the 9-point automated test suite for the contact service, rate limiter, and security controls. |
| `test:cv` | `node --experimental-strip-types scripts/test-cv-flow.mjs` | Runs the 12-point automated test suite for CV data, ATS scoring, and i18n synchronization. |
| `generate:pdf` | `node scripts/generate-cv-pdfs.mjs` | Automates Chrome Headless to compile `/cv` into official vector PDFs inside `public/`. |

---

## 🌐 Production Deployment

The project is pre-configured for instant zero-configuration deployment on [Vercel](https://vercel.com):

### Deploying via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy preview build
vercel

# Deploy to production
vercel --prod
```

### Deploying via Vercel Web Dashboard
1. Push your changes to your GitHub repository: `https://github.com/etienne201/Poutchoko_qa-portfolio-`.
2. Connect your repository on the [Vercel Dashboard](https://vercel.com/new).
3. Select the **Next.js** framework preset (detected automatically).
4. In the **Environment Variables** section, add your production values:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `CONTACT_EMAIL_TO`
   - `WHATSAPP_NUMBER`
5. Click **Deploy**. Vercel will build the project and provide your live URL (e.g. `https://poutchoko-qa-portfolio.vercel.app`).

---

## 🛡️ Engineering Best Practices & Defense-in-Depth

This project incorporates senior-level engineering and QA principles across the codebase:

- **Input Sanitization & Output Encoding:** All form inputs undergo strict HTML escaping to neutralize XSS injection and CRLF stripping to avoid header manipulation.
- **Strict Payload Constraints:** The contact API enforces a `16 KB` maximum body limit to shield the server against memory exhaustion and payload flood attacks.
- **Web Accessibility (a11y):** Built using accessible Radix UI primitives with focus management, visible outline rings, ARIA labels, and WCAG 2.1 AA compliant color contrast ratios.
- **Search Engine Optimization (SEO):** Fully configured with dynamic `sitemap.ts`, `robots.ts`, JSON-LD structured data schemas (`Person`, `WebSite`), and comprehensive OpenGraph / Twitter metadata.
- **Clean Architecture & Maintainability:** Reusable, single-responsibility components with strict TypeScript types, avoiding `any` assertions across all core services.

---

## 👨‍💻 Author & Contact Information

**Poutchoko Emako Étienne**  
*Senior QA Automation Engineer | FinTech & RegTech Specialist*  
📍 Douala, Cameroon (Available for international remote contracts & freelance missions 🌍)

- **🌐 Portfolio:** [poutchoko-qa-portfolio.vercel.app](https://poutchoko-qa-portfolio.vercel.app)
- **💼 LinkedIn:** [linkedin.com/in/étienne-poutchoko-emako-420524184](https://www.linkedin.com/in/%C3%A9tienne-poutchoko-emako-420524184/)
- **🐙 GitHub:** [@etienne201](https://github.com/etienne201)
- **📧 Email:** [poutchokoetienne@gmail.com](mailto:poutchokoetienne@gmail.com)
- **💬 WhatsApp:** [+237 657 268 355](https://wa.me/237657268355)

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use this codebase as a reference or template for building technical portfolio applications.
