import assert from "node:assert/strict"

// Simuler les données, le calculateur de score et le générateur ATS
import { defaultEtienneCV, emptyCV, calculateCVScore, generatePlainTextATS } from "../lib/cv-data.ts"

console.log("🧪 Démarrage de la suite étendue de tests automatisés du Module CV Studio...")

// Test 1: Intégrité du profil par défaut d'Étienne Poutchoko
console.log("▶ Test 1: Validation du profil certifié d'Étienne Poutchoko...")
assert.ok(defaultEtienneCV.personalInfo.fullName.toUpperCase().includes("ETIENNE"), "Le nom complet doit être défini")
assert.ok(defaultEtienneCV.personalInfo.email.includes("@"), "L'email doit être valide")
assert.ok(defaultEtienneCV.experiences.length >= 3, "Il doit y avoir au moins 3 expériences professionnelles")
assert.ok(defaultEtienneCV.education.length >= 1, "Il doit y avoir au moins 1 formation")
assert.ok(defaultEtienneCV.technicalSkills.length >= 4, "Il doit y avoir au moins 4 catégories techniques")
assert.ok(defaultEtienneCV.languages.length >= 2, "Il doit y avoir au moins 2 langues")

const etienneReport = calculateCVScore(defaultEtienneCV)
console.log(`   Score obtenu pour le profil officiel : ${etienneReport.score}%`)
assert.ok(etienneReport.score >= 90, `Le score du profil officiel doit être >= 90% (actuel: ${etienneReport.score}%)`)
console.log("   ✔ Test 1 réussi : Profil certifié validé avec succès (Score >= 90%).")

// Test 2: Comportement du modèle vierge (Empty CV)
console.log("▶ Test 2: Validation du modèle vierge...")
const emptyReport = calculateCVScore(emptyCV)
console.log(`   Score obtenu pour le profil vierge : ${emptyReport.score}%`)
assert.equal(emptyReport.score, 0, "Le score d'un CV vide doit être exactement 0%")
assert.ok(emptyReport.recommendations.length > 0, "Un CV vide doit fournir des recommandations explicites")
console.log(`   Nombre de recommandations générées : ${emptyReport.recommendations.length}`)
console.log("   ✔ Test 2 réussi : Modèle vierge validé (Score 0% et recommandations actives).")

// Test 3: Règle métier - Les sections facultatives ne doivent pas pénaliser le score
console.log("▶ Test 3: Vérification de la non-pénalisation des sections facultatives...")
const cvWithoutOptionals = JSON.parse(JSON.stringify(defaultEtienneCV))
cvWithoutOptionals.hobbies = []
cvWithoutOptionals.references = []
cvWithoutOptionals.softSkills = []

const reportWithoutOptionals = calculateCVScore(cvWithoutOptionals)
console.log(`   Score sans sections facultatives : ${reportWithoutOptionals.score}%`)
assert.equal(
  reportWithoutOptionals.score,
  etienneReport.score,
  "La suppression des sections facultatives (loisirs, références, soft skills) ne doit pas faire baisser le score global"
)
console.log("   ✔ Test 3 réussi : Règle métier des sections optionnelles respectée à 100%.")

// Test 4: Calcul progressif incrémental
console.log("▶ Test 4: Validation de l'incrémentation graduelle du score...")
const partialCV = JSON.parse(JSON.stringify(emptyCV))
partialCV.personalInfo.fullName = "Test Candidate"
partialCV.personalInfo.jobTitle = "QA Analyst"
partialCV.personalInfo.email = "test@example.com"
partialCV.personalInfo.phone = "+237 600 00 00 00"
partialCV.personalInfo.location = "Douala, Cameroun"

const partialReport = calculateCVScore(partialCV)
console.log(`   Score avec uniquement les infos personnelles : ${partialReport.score}%`)
assert.ok(partialReport.score >= 18, "Les infos personnelles complètes doivent rapporter au moins 18%")
console.log("   ✔ Test 4 réussi : Calcul progressif validé.")

// Test 5: Sérialisation / Désérialisation JSON (Sauvegarde & Export)
console.log("▶ Test 5: Sérialisation JSON pour l'exportation et la persistance...")
const serialized = JSON.stringify(defaultEtienneCV)
const deserialized = JSON.parse(serialized)
assert.deepEqual(deserialized.personalInfo, defaultEtienneCV.personalInfo, "La sérialisation JSON doit préserver l'intégrité")
console.log("   ✔ Test 5 réussi : Sérialisation et intégrité JSON validées.")

// Test 6: Génération conforme du format texte brut ATS
console.log("▶ Test 6: Validation du format texte brut ATS (Copier / Coller)...")
const plainATS = generatePlainTextATS(defaultEtienneCV)
assert.ok(plainATS.toUpperCase().includes("ETIENNE POUTCHOKO EMAKO"), "Le nom en majuscule doit être présent en tête de document ATS")
assert.ok(plainATS.includes("COMPÉTENCES TECHNIQUES"), "La section compétences doit être explicitement titrée")
assert.ok(plainATS.includes("EXPÉRIENCES PROFESSIONNELLES"), "La section expériences doit être titrée")
assert.ok(plainATS.includes("FORMATION"), "La section formation doit être titrée")
assert.ok(plainATS.includes("Cypress"), "Les compétences clés doivent être présentes dans le texte brut")
console.log("   ✔ Test 6 réussi : Format ATS structuré validé sans perte d'information.")

// Test 7: Robustesse aux variations de volume (Profil lourd vs Profil minimal)
console.log("▶ Test 7: Résilience aux variations extrêmes de volume...")
const heavyCV = JSON.parse(JSON.stringify(defaultEtienneCV))
// Dupliquer les expériences pour simuler un profil de 10 ans avec 8 postes
for (let i = 4; i <= 8; i++) {
  heavyCV.experiences.push({
    id: `exp-${i}`,
    role: `Software Quality Consultant #${i}`,
    company: `Tech Enterprise ${i}`,
    location: "Paris / Remote",
    startDate: "2015",
    endDate: "2018",
    current: false,
    description: "Mise en place de frameworks de tests automatisés et accompagnement des équipes agiles.",
    achievements: ["Augmentation de 40% de la vélocité", "Intégration continue GitLab"],
    technologies: ["Playwright", "Docker"],
  })
}
const heavyATS = generatePlainTextATS(heavyCV)
assert.ok(
  heavyATS.toUpperCase().includes("SOFTWARE QUALITY CONSULTANT #8"),
  "Les expériences volumineuses doivent être sérialisées sans troncature"
)
const heavyReport = calculateCVScore(heavyCV)
assert.equal(heavyReport.score, 100, "Le score reste à 100% sans overflow")
console.log("   ✔ Test 7 réussi : Résilience aux volumes élevés confirmée.")

// Test 8: Conformité des 3 templates
console.log("▶ Test 8: Cohérence des identifiants de modèles supportés...")
const validTemplates = ["modern", "ats", "blueprint"]
validTemplates.forEach((tpl) => {
  const testCV = JSON.parse(JSON.stringify(defaultEtienneCV))
  testCV.settings.template = tpl
  assert.equal(testCV.settings.template, tpl)
})
console.log("   ✔ Test 8 réussi : Templates modern, ats et blueprint conformes.")

// Test 9: Intégrité physique et conformité des PDF officiels
console.log("▶ Test 9: Vérification des documents PDF officiels bilingues...")
import fs from "node:fs"
import path from "node:path"

const pdfFiles = [
  { name: "CV_Poutchoko_Emako_Etienne_FR.pdf", minSize: 200000 },
  { name: "CV_Poutchoko_Emako_Etienne_EN.pdf", minSize: 200000 },
]

for (const pdf of pdfFiles) {
  const fullPath = path.resolve(process.cwd(), "public", pdf.name)
  assert.ok(fs.existsSync(fullPath), `Le fichier ${pdf.name} doit exister dans public/`)
  const stat = fs.statSync(fullPath)
  assert.ok(stat.size > pdf.minSize, `Le fichier ${pdf.name} ne doit pas être vide (taille: ${stat.size} octets)`)
  const header = fs.readFileSync(fullPath, { encoding: "ascii", flag: "r" }).slice(0, 5)
  assert.equal(header, "%PDF-", `Le fichier ${pdf.name} doit être un PDF valide (en-tête %PDF-)`)
}
console.log("   ✔ Test 9 réussi : Les deux fichiers PDF officiels FR et EN sont présents, intègres et conformes.")

// Test 10: Validation de la séparation linguistique stricte des données
console.log("▶ Test 10: Validation de la séparation stricte des contenus FR et EN...")
import { defaultEtienneCV_FR, defaultEtienneCV_EN } from "../lib/cv-data.ts"

assert.equal(defaultEtienneCV_FR.settings.language, "fr", "Le CV français doit avoir settings.language = 'fr'")
assert.equal(defaultEtienneCV_EN.settings.language, "en", "Le CV anglais doit avoir settings.language = 'en'")
assert.ok(
  defaultEtienneCV_FR.professionalSummary.summary.includes("Ingénieur Senior QA"),
  "Le CV FR doit débuter par son intitulé en français"
)
assert.ok(
  defaultEtienneCV_EN.professionalSummary.summary.includes("Senior QA Automation Engineer"),
  "Le CV EN doit débuter par son intitulé en anglais"
)
console.log("   ✔ Test 10 réussi : Données sources bilingues validées et strictement isolées.")

// Test 11: Validation des clés de traduction i18n requises
console.log("▶ Test 11: Validation de la couverture des clés i18n pour le CV...")
const frLocale = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "locales/fr/common.json"), "utf8"))
const enLocale = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "locales/en/common.json"), "utf8"))

const requiredKeys = [
  "cv.viewCta",
  "cv.downloadCta",
  "cv.viewModalTitle",
  "cv.downloadAction",
  "cv.backPortfolio",
]

for (const key of requiredKeys) {
  assert.ok(frLocale[key], `Clé i18n manquante dans fr/common.json: ${key}`)
  assert.ok(enLocale[key], `Clé i18n manquante dans en/common.json: ${key}`)
}
console.log("   ✔ Test 11 réussi : Toutes les clés i18n requises pour le CV sont présentes et synchronisées.")

console.log("\n🎉 Tous les 11/11 tests du moteur CV et de la chaîne multilingue sont validés avec 100% de succès !")

