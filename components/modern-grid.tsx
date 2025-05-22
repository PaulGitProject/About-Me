"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function ModernGrid() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Ne rien rendre côté serveur ou si non monté
  if (!mounted) return null

  // Déterminer la couleur de la grille en fonction du thème - beaucoup plus transparente
  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(138, 75, 245, 0.015)"

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-5"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${gridColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px", // Cellules plus grandes pour moins de lignes à dessiner
        backgroundPosition: "center center",
        opacity: 0.7,
      }}
    />
  )
}
