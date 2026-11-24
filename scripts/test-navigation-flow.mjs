import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")

const read = (relPath) => fs.readFileSync(path.join(rootDir, relPath), "utf8")

console.log("🧭 Running Senior QA Automated Test Suite on Smart Navigation System...\n")

// Test 1: Navigation config & i18n parity
const fr = JSON.parse(read("locales/fr/common.json"))
const en = JSON.parse(read("locales/en/common.json"))
const navConfig = read("config/navigation.ts")

const sectionMatches = [...navConfig.matchAll(/id:\s*"([^"]+)",\s*href:\s*"#([^"]+)",\s*labelKey:\s*"([^"]+)"/g)]
assert.equal(sectionMatches.length, 7, "Expected 7 portfolio sections in config/navigation.ts")

for (const [, id, href, labelKey] of sectionMatches) {
  assert.equal(id, href, `Section id "${id}" must match href "#${href}"`)
  assert.ok(fr[labelKey], `Missing FR translation for ${labelKey}`)
  assert.ok(en[labelKey], `Missing EN translation for ${labelKey}`)
}
for (const key of ["nav.cvHub", "nav.commandOpen", "nav.commandPlaceholder", "nav.commandEmpty"]) {
  assert.ok(fr[key], `Missing FR translation for ${key}`)
  assert.ok(en[key], `Missing EN translation for ${key}`)
}
console.log("✅ Test 1: Navigation config & bilingual i18n parity passed.")

// Test 2: Every portfolio section has id + scroll-mt-24
const sectionFiles = [
  ["about", "components/about-section.tsx"],
  ["expertise", "components/qa-expertise-section.tsx"],
  ["experience", "components/experience-section.tsx"],
  ["skills", "components/skills-section.tsx"],
  ["projects", "components/projects-section.tsx"],
  ["education", "components/education-section.tsx"],
  ["contact", "components/contact-section.tsx"],
]
for (const [id, file] of sectionFiles) {
  const src = read(file)
  assert.ok(src.includes(`id="${id}"`), `${file} missing id="${id}"`)
  assert.ok(src.includes("scroll-mt-24"), `${file} missing scroll-mt-24`)
}
console.log("✅ Test 2: All 7 sections declare anchor IDs and scroll-mt-24 offset.")

// Test 3: Main landmark & sticky-safe overflow-x-clip
const homePage = read("app/page.tsx")
assert.ok(homePage.includes('id="main-content"'), 'app/page.tsx missing id="main-content"')
assert.ok(homePage.includes("overflow-x-clip"), "app/page.tsx should use overflow-x-clip (not overflow-hidden)")
assert.ok(!homePage.includes("LanguageProvider"), "app/page.tsx should not duplicate LanguageProvider")
console.log("✅ Test 3: Main landmark, overflow-x-clip, and centralized provider verified.")

// Test 4: Root layout mounts SkipLink, LanguageProvider, CommandPaletteProvider, and self-hosted fonts
const layout = read("app/layout.tsx")
assert.ok(layout.includes("SkipLink"), "app/layout.tsx must render SkipLink")
assert.ok(layout.includes("LanguageProvider"), "app/layout.tsx must mount LanguageProvider")
assert.ok(layout.includes("CommandPaletteProvider"), "app/layout.tsx must mount CommandPaletteProvider")
assert.ok(layout.includes("@fontsource-variable/plus-jakarta-sans"), "Self-hosted Plus Jakarta Sans missing")
assert.ok(layout.includes("@fontsource-variable/jetbrains-mono"), "Self-hosted JetBrains Mono missing")
console.log("✅ Test 4: Root layout accessibility, providers, and self-hosted fonts verified.")

// Test 5: Scroll-spy uses IntersectionObserver (no offsetTop layout thrashing)
const scrollSpy = read("hooks/use-scroll-spy.ts")
assert.ok(scrollSpy.includes("IntersectionObserver"), "use-scroll-spy must use IntersectionObserver")
assert.ok(!scrollSpy.includes(".offsetTop"), "use-scroll-spy must avoid .offsetTop forced reflows")
console.log("✅ Test 5: Scroll-spy uses IntersectionObserver without layout thrashing.")

// Test 6: Mobile drawer uses Radix Dialog (Focus Trap + Escape) and MobileContactBar uses next/link
const drawer = read("components/navigation/mobile-nav-drawer.tsx")
const mobileBar = read("components/mobile-contact-bar.tsx")
assert.ok(drawer.includes("@radix-ui/react-dialog"), "MobileNavDrawer must use @radix-ui/react-dialog")
assert.ok(mobileBar.includes('import Link from "next/link"'), "MobileContactBar must use next/link")
assert.ok(mobileBar.includes("no-print"), "MobileContactBar must include no-print class")
console.log("✅ Test 6: Accessible mobile drawer (Radix Dialog) and mobile bar verified.")

// Test 7: Sub-pages (/cv and /cv-builder) do not duplicate LanguageProvider and expose ⌘K + ThemeToggle
for (const subPage of ["app/cv/page.tsx", "app/cv-builder/page.tsx"]) {
  const src = read(subPage)
  assert.ok(!src.includes("<LanguageProvider"), `${subPage} must not duplicate LanguageProvider`)
  assert.ok(src.includes("ThemeToggle"), `${subPage} should expose ThemeToggle`)
  assert.ok(src.includes("useCommandPalette"), `${subPage} should expose ⌘K trigger`)
  assert.ok(src.includes('id="main-content"'), `${subPage} must define id="main-content"`)
}
console.log("✅ Test 7: Sub-pages (/cv, /cv-builder) navigation consistency verified.")

// Test 8: CSS scroll-driven animation, animated SVG trajectories, and GSAP ScrollTrigger reduced-motion guard
const globalsCss = read("app/globals.css")
const sectionRail = read("components/navigation/section-rail.tsx")
const gsapHook = read("hooks/use-gsap-scroll.ts")
const expSection = read("components/experience-section.tsx")
assert.ok(globalsCss.includes("animation-timeline: scroll("), "globals.css must include CSS scroll-driven animation")
assert.ok(sectionRail.includes("<svg") && sectionRail.includes("strokeDashoffset"), "SectionRail must render animated SVG trajectory")
assert.ok(
  gsapHook.includes("ScrollTrigger") &&
    gsapHook.includes("MotionPathPlugin") &&
    gsapHook.includes("prefers-reduced-motion: no-preference"),
  "useGsapScroll must register ScrollTrigger & MotionPathPlugin with reduced-motion guard",
)
assert.ok(
  expSection.includes("data-timeline-progress") &&
    expSection.includes("motionPath") &&
    expSection.includes("timeline("),
  "ExperienceSection must orchestrate SVG timeline with gsap.timeline + MotionPathPlugin",
)
console.log("✅ Test 8: CSS scroll-driven animations, SVG trajectories, GSAP timeline & MotionPathPlugin verified.")

console.log("\n🎉 All 8/8 Smart Navigation QA Automation tests PASSED with 100% success!")
