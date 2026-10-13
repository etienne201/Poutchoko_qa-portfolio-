import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")
const publicDir = path.join(rootDir, "public")

console.log("🚀 Lancement du générateur officiel de PDF certifiés CV...")

// Trouver l'exécutable Chrome / Chromium disponible
const chromePaths = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome",
  "chromium",
  "chromium-browser",
]

let chromeBin = null
for (const p of chromePaths) {
  try {
    if (p.startsWith("/") && fs.existsSync(p)) {
      chromeBin = p
      break
    } else if (!p.startsWith("/")) {
      execSync(`which ${p}`, { stdio: "ignore" })
      chromeBin = p
      break
    }
  } catch {
    // Continuer
  }
}

if (!chromeBin) {
  console.error("❌ Aucun navigateur Chromium/Chrome trouvé pour l'export PDF headless.")
  process.exit(1)
}

console.log(`ℹ️ Utilisation du moteur : ${chromeBin}`)

const baseUrl = process.env.BASE_URL || "http://localhost:3000"

const targets = [
  {
    lang: "fr",
    url: `${baseUrl}/cv?lang=fr`,
    destNames: ["CV_Poutchoko_Emako_Etienne_FR.pdf", "Etienne_Poutchoko_CV_FR.pdf"],
  },
  {
    lang: "en",
    url: `${baseUrl}/cv?lang=en`,
    destNames: ["CV_Poutchoko_Emako_Etienne_EN.pdf", "Etienne_Poutchoko_CV_EN.pdf"],
  },
]

for (const target of targets) {
  console.log(`\n📄 Génération de la version [${target.lang.toUpperCase()}] depuis ${target.url}...`)
  const tmpPdf = path.join(publicDir, target.destNames[0])
  const cmd = `"${chromeBin}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${tmpPdf}" "${target.url}"`
  
  try {
    execSync(cmd, { stdio: "pipe" })
  } catch (err) {
    console.error(`❌ Échec de l'exportation pour ${target.lang} :`, err.message)
    process.exit(1)
  }

  // Vérifier le fichier généré
  const stats = fs.statSync(tmpPdf)
  if (!stats || stats.size < 10000) {
    console.error(`❌ Le fichier généré est anormalement petit (${stats?.size || 0} octets) : ${tmpPdf}`)
    process.exit(1)
  }

  // Copier vers le nom alternatif pour rétrocompatibilité
  for (let i = 1; i < target.destNames.length; i++) {
    const altDest = path.join(publicDir, target.destNames[i])
    fs.copyFileSync(tmpPdf, altDest)
  }

  console.log(`✔ [${target.lang.toUpperCase()}] PDF généré avec succès : ${stats.size} octets.`)
  console.log(`   -> Fichiers synchronisés : ${target.destNames.join(", ")}`)
}

console.log("\n✅ Tous les documents PDF officiels ont été synchronisés avec le template de référence.")
