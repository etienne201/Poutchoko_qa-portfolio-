"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { CommandPalette } from "@/components/navigation/command-palette"

interface CommandPaletteContextType {
  open: boolean
  setOpen: (open: boolean) => void
  openPalette: () => void
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined)

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openPalette = useCallback(() => setOpen(true), [])

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen, openPalette }}>
      {children}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </CommandPaletteContext.Provider>
  )
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext)
  if (!ctx) {
    throw new Error("useCommandPalette must be used within a CommandPaletteProvider")
  }
  return ctx
}
