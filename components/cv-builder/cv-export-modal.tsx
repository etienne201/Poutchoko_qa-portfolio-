"use client"
import React, { useState } from "react"
import { CVData } from "@/types/cv"
import { generatePlainTextATS } from "@/lib/cv-data"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Printer,
  Copy,
  Check,
  Download,
  FileText,
  Sparkles,
  Info,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"

interface CVExportModalProps {
  isOpen: boolean
  onClose: () => void
  data: CVData
  onPrint: () => void
}

export function CVExportModal({
  isOpen,
  onClose,
  data,
  onPrint,
}: CVExportModalProps) {
  const [activeTab, setActiveTab] = useState<"pdf" | "ats" | "json">("pdf")
  const [copied, setCopied] = useState<boolean>(false)
  const [isExporting, setIsExporting] = useState<boolean>(false)

  const plainText = generatePlainTextATS(data)

  const handleCopyATS = async () => {
    try {
      await navigator.clipboard.writeText(plainText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      alert("Impossible de copier automatiquement. Veuillez sélectionner le texte manuellement.")
    }
  }

  const handleDownloadTxt = () => {
    const safeName = (data.personalInfo.fullName || "CV").replace(/\s+/g, "_")
    const blob = new Blob([plainText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${safeName}_CV_ATS.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDownloadJson = () => {
    const safeName = (data.personalInfo.fullName || "CV").replace(/\s+/g, "_")
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json;charset=utf-8",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${safeName}_CV_Backup.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleTriggerPrint = () => {
    setIsExporting(true)
    // Définir le nom de document pour que le fichier PDF proposé porte le bon nom
    const originalTitle = document.title
    const safeName = (data.personalInfo.fullName || "CV").replace(/\s+/g, "_")
    const safeRole = (data.personalInfo.jobTitle || "Resume").replace(/\s+/g, "_")
    document.title = `${safeName}_${safeRole}_CV`

    setTimeout(() => {
      onPrint()
      setIsExporting(false)
      document.title = originalTitle
      onClose()
    }, 400)
  }

  const templateName =
    data.settings.template === "modern"
      ? "Moderne Executive"
      : data.settings.template === "ats"
      ? "Minimalist ATS"
      : "Tech Blueprint"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white dark:bg-[#0e1922] border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white rounded-2xl p-6 shadow-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-extrabold flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Téléchargement &amp; Exportation du CV</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Exportez votre document selon vos besoins de recrutement avec une fidélité graphique absolue.
          </DialogDescription>
        </DialogHeader>

        {/* Onglets de sélection du format */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-white/[0.04] p-1 rounded-xl border border-slate-200/80 dark:border-white/[0.06] mt-4">
          <button
            type="button"
            onClick={() => setActiveTab("pdf")}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === "pdf"
                ? "bg-white dark:bg-white/[0.12] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF Haute Définition</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ats")}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === "ats"
                ? "bg-white dark:bg-white/[0.12] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Texte Brut ATS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("json")}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === "json"
                ? "bg-white dark:bg-white/[0.12] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sauvegarde JSON</span>
          </button>
        </div>

        {/* Contenu de l'onglet actif */}
        <div className="pt-4 space-y-4">
          {/* ============================================================ */}
          {/* ONGLET 1 : PDF Haute Définition */}
          {/* ============================================================ */}
          {activeTab === "pdf" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Modèle actif :</span>
                  <span className="font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {templateName}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Format d&apos;impression :</span>
                  <span className="font-mono text-slate-600 dark:text-slate-300">A4 Portrait (210 × 297 mm)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Couleur d&apos;accent :</span>
                  <span className="capitalize text-slate-600 dark:text-slate-300">{data.settings.accentColor}</span>
                </div>
              </div>

              {/* Conseils de configuration d'impression */}
              <div className="p-3.5 rounded-xl bg-primary/[0.06] border border-primary/20 space-y-2 text-xs">
                <div className="flex items-center space-x-2 font-bold text-primary">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>Recommandations pour un PDF parfait :</span>
                </div>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300 pl-6 list-disc">
                  <li>Destination : <strong>Enregistrer au format PDF</strong></li>
                  <li>Disposition : <strong>Portrait</strong></li>
                  <li>Plus de paramètres &gt; Marges : <strong>Aucune ou Par défaut</strong></li>
                  <li>Plus de paramètres &gt; Options : Cocher <strong>Graphiques d&apos;arrière-plan</strong></li>
                </ul>
              </div>

              {/* Fichiers HTML Standalone directs */}
              <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-800 dark:text-slate-200">Versions HTML autonomes imprimables :</div>
                  <div className="text-[11px] text-slate-500">Prêtes à être partagées ou imprimées directement dans votre navigateur.</div>
                </div>
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <a
                    href="/CV_Poutchoko_Emako_Etienne_EN.pdf"
                    target="_blank"
                    download="CV_Poutchoko_Emako_Etienne_EN.pdf"
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] hover:text-primary transition-colors"
                  >
                    🇬🇧 PDF Officiel (EN)
                  </a>
                  <a
                    href="/CV_Poutchoko_Emako_Etienne_FR.pdf"
                    target="_blank"
                    download="CV_Poutchoko_Emako_Etienne_FR.pdf"
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] hover:text-primary transition-colors"
                  >
                    🇫🇷 PDF Officiel (FR)
                  </a>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="text-xs"
                >
                  Annuler
                </Button>
                <Button
                  type="button"
                  onClick={handleTriggerPrint}
                  disabled={isExporting}
                  className="text-xs font-semibold bg-primary hover:bg-primary/90 text-white px-5 shadow-accent"
                >
                  <Printer className="w-3.5 h-3.5 mr-1.5" />
                  <span>{isExporting ? "Préparation..." : "Lancer l'exportation PDF"}</span>
                </Button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* ONGLET 2 : Format Texte Brut ATS */}
          {/* ============================================================ */}
          {activeTab === "ats" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Format pur sans formatage visuel, structuré pour les portails ATS (Workday, Taleo, etc.).
                </span>
                <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% ATS Compatible</span>
                </span>
              </div>

              <textarea
                readOnly
                rows={10}
                value={plainText}
                className="w-full text-xs font-mono p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white leading-relaxed resize-none focus:outline-none"
              />

              <div className="flex justify-between items-center pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTxt}
                  className="text-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  <span>Télécharger .txt</span>
                </Button>

                <Button
                  type="button"
                  size="sm"
                  onClick={handleCopyATS}
                  className="text-xs font-semibold bg-primary hover:bg-primary/90 text-white"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5" />
                      <span>Copié dans le presse-papier !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      <span>Copier tout le texte</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* ONGLET 3 : Sauvegarde JSON */}
          {/* ============================================================ */}
          {activeTab === "json" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] space-y-2 text-xs">
                <div className="flex items-center space-x-2 font-bold text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Sauvegarde intégrale de vos données</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Le fichier JSON contient l&apos;intégralité de vos 11 rubriques et de vos réglages visuels. Vous pourrez le réimporter à tout moment via le bouton <strong>Importer</strong> de la barre d&apos;outils.
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="text-xs"
                >
                  Fermer
                </Button>
                <Button
                  type="button"
                  onClick={handleDownloadJson}
                  className="text-xs font-semibold bg-primary hover:bg-primary/90 text-white px-5"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  <span>Télécharger le fichier JSON</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
