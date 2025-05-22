"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function LeeroyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [quality, setQuality] = useState<"high" | "medium" | "low">("medium")
  const [mounted, setMounted] = useState(false)

  // Déterminer la qualité en fonction des performances du système
  useEffect(() => {
    setMounted(true)

    // Détection simple des performances
    const detectPerformance = () => {
      // Vérifier si l'appareil est mobile (généralement moins puissant)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      if (isMobile) {
        setQuality("low")
      } else if (window.innerWidth > 1920) {
        // Écrans haute résolution - réduire la qualité pour compenser
        setQuality("medium")
      } else {
        setQuality("medium")
      }
    }

    detectPerformance()
  }, [])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Configuration basée sur la qualité
    const config = {
      high: {
        blobCount: 6,
        darkSpotCount: 10,
        updateFrequency: 1, // Chaque frame
        particleDetail: 1,
      },
      medium: {
        blobCount: 4,
        darkSpotCount: 6,
        updateFrequency: 2, // Une frame sur deux
        particleDetail: 0.7,
      },
      low: {
        blobCount: 3,
        darkSpotCount: 4,
        updateFrequency: 3, // Une frame sur trois
        particleDetail: 0.5,
      },
    }

    const currentConfig = config[quality]

    // Fonction de mouvement simplifiée
    const movementPattern = (blob, t) => {
      const amplitudeX = Math.sin(t * blob.speedFactor) * blob.waveAmplitude
      const amplitudeY = Math.cos(t * blob.speedFactor + blob.phaseOffset) * blob.waveAmplitude
      return { x: amplitudeX, y: amplitudeY }
    }

    // Create blobs with simplified behaviors
    const blobs = []
    const blobCount = currentConfig.blobCount

    for (let i = 0; i < blobCount; i++) {
      // Créer des angles de direction aléatoires pour un mouvement dans toutes les directions
      const angle = Math.random() * Math.PI * 2

      // Vitesse de base très variée pour chaque blob
      const baseSpeed = 0.1 + Math.random() * 0.3

      // Réduire la luminosité des blobs pour avoir plus de zones sombres
      const hue = Math.random() * 40 + 250 // Teintes violet (250-290)
      const saturation = Math.random() * 30 + 50 // Saturation réduite (50-80)
      const brightness = Math.random() * 20 + 30 // Luminosité réduite (30-50)
      const alpha = Math.random() * 0.25 + 0.15 // Alpha réduit (0.15-0.4)

      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 150,
        speedX: Math.cos(angle) * baseSpeed,
        speedY: Math.sin(angle) * baseSpeed,
        baseSpeed: baseSpeed,
        hue: hue,
        saturation: saturation,
        brightness: brightness,
        alpha: alpha,

        // Paramètres de mouvement simplifiés
        waveAmplitude: Math.random() * 1.5 + 0.5,
        speedFactor: 0.01 + Math.random() * 0.02,
        phaseOffset: Math.random() * Math.PI * 2,

        // Temps individuel pour chaque blob
        individualTime: Math.random() * 1000,
      })
    }

    // Create dark spots with simplified behaviors
    const darkSpots = []
    const darkSpotCount = currentConfig.darkSpotCount

    for (let i = 0; i < darkSpotCount; i++) {
      // Créer des angles de direction aléatoires
      const angle = Math.random() * Math.PI * 2

      // Vitesse de base très variée
      const baseSpeed = 0.1 + Math.random() * 0.3

      // Couleurs pour le thème clair - tons de violet pâle
      const lightThemeHue = Math.random() * 30 + 260 // 260-290 (violet)
      const lightThemeSaturation = Math.random() * 20 + 20 // 20-40% (pastel)
      const lightThemeBrightness = Math.random() * 20 + 75 // 75-95% (clair)

      darkSpots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 250 + 150,
        speedX: Math.cos(angle) * baseSpeed,
        speedY: Math.sin(angle) * baseSpeed,
        baseSpeed: baseSpeed,
        alpha: Math.random() * 0.6 + 0.4,

        // Couleurs pour le thème clair
        lightThemeHue,
        lightThemeSaturation,
        lightThemeBrightness,

        // Paramètres de mouvement simplifiés
        waveAmplitude: Math.random() * 1.5 + 0.5,
        speedFactor: 0.01 + Math.random() * 0.02,
        phaseOffset: Math.random() * Math.PI * 2,

        // Temps individuel pour chaque spot
        individualTime: Math.random() * 1000,
      })
    }

    // Animation variables
    let animationFrameId
    let lastScrollY = window.scrollY
    let scrollDirection = 0
    let scrollEffect = 0
    let globalTime = 0
    let frameCount = 0

    // Handle scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollDirection = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      // Create a temporary scroll effect that fades out
      scrollEffect = Math.sign(scrollDirection) * Math.min(Math.abs(scrollDirection) * 0.05, 5)
    }

    window.addEventListener("scroll", handleScroll)

    // Animation loop
    const animate = () => {
      frameCount++

      // Mettre à jour moins fréquemment selon la qualité
      const shouldUpdate = frameCount % currentConfig.updateFrequency === 0

      if (shouldUpdate) {
        globalTime += 0.01 // Incrémenter le temps global

        // Clear canvas - Fond légèrement plus sombre
        ctx.fillStyle = theme === "dark" ? "#0a071a" : "#f5f4fa"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Gradually reduce scroll effect
        scrollEffect *= 0.95

        // Update and draw blobs with simplified behaviors
        blobs.forEach((blob) => {
          // Incrémenter le temps individuel de chaque blob
          blob.individualTime += blob.speedFactor * 2

          // Appliquer le pattern de mouvement
          const movement = movementPattern(blob, blob.individualTime)

          // Move blob with base speed + pattern movement + scroll effect
          blob.x += blob.speedX + movement.x
          blob.y += blob.speedY + movement.y + scrollEffect * 0.5

          // Wrap around edges with a small buffer to avoid visual glitches
          const buffer = blob.radius * 0.2
          if (blob.x < -blob.radius - buffer) blob.x = canvas.width + blob.radius
          if (blob.x > canvas.width + blob.radius + buffer) blob.x = -blob.radius
          if (blob.y < -blob.radius - buffer) blob.y = canvas.height + blob.radius
          if (blob.y > canvas.height + blob.radius + buffer) blob.y = -blob.radius

          // Draw blob
          const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)
          gradient.addColorStop(0, `hsla(${blob.hue}, ${blob.saturation}%, ${blob.brightness}%, ${blob.alpha})`)
          gradient.addColorStop(1, `hsla(${blob.hue}, ${blob.saturation}%, ${blob.brightness}%, 0)`)

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
          ctx.fill()
        })

        // Update and draw dark spots with simplified behaviors
        darkSpots.forEach((spot) => {
          // Incrémenter le temps individuel de chaque spot
          spot.individualTime += spot.speedFactor * 2

          // Appliquer le pattern de mouvement
          const movement = movementPattern(spot, spot.individualTime)

          // Move spot with base speed + pattern movement + scroll effect
          spot.x += spot.speedX + movement.x
          spot.y += spot.speedY + movement.y + scrollEffect * 0.3

          // Wrap around edges with a small buffer to avoid visual glitches
          const buffer = spot.radius * 0.2
          if (spot.x < -spot.radius - buffer) spot.x = canvas.width + spot.radius
          if (spot.x > canvas.width + spot.radius + buffer) spot.x = -spot.radius
          if (spot.y < -spot.radius - buffer) spot.y = canvas.height + spot.radius
          if (spot.y > canvas.height + spot.radius + buffer) spot.y = -spot.radius

          // Draw spot with different colors based on theme
          const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius)

          if (theme === "dark") {
            // Mode sombre: taches noires plus intenses
            gradient.addColorStop(0, `rgba(0, 0, 10, ${spot.alpha})`)
            gradient.addColorStop(1, "rgba(0, 0, 10, 0)")
          } else {
            // Mode clair: taches en violet pâle
            gradient.addColorStop(
              0,
              `hsla(${spot.lightThemeHue}, ${spot.lightThemeSaturation}%, ${spot.lightThemeBrightness}%, ${spot.alpha})`,
            )
            gradient.addColorStop(
              1,
              `hsla(${spot.lightThemeHue}, ${spot.lightThemeSaturation}%, ${spot.lightThemeBrightness}%, 0)`,
            )
          }

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(spot.x, spot.y, spot.radius, 0, Math.PI * 2)
          ctx.fill()
        })

        // Ajouter du bruit uniquement en haute qualité
        if (quality === "high") {
          addNoiseTexture(ctx, canvas.width, canvas.height, 0.01)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, mounted, quality])

  // Function to add subtle noise texture - simplified
  const addNoiseTexture = (ctx: CanvasRenderingContext2D, width: number, height: number, alpha: number) => {
    // Réduire la résolution du bruit pour améliorer les performances
    const scale = 4 // Échantillonner 1 pixel sur 4
    const scaledWidth = Math.ceil(width / scale)
    const scaledHeight = Math.ceil(height / scale)

    const imageData = ctx.getImageData(0, 0, scaledWidth, scaledHeight)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 16) {
      // Sauter plus de pixels
      const noise = Math.random() * 10 - 5

      data[i] = Math.min(255, Math.max(0, data[i] + noise * alpha))
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * alpha))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * alpha))
    }

    ctx.putImageData(imageData, 0, 0)
    ctx.scale(scale, scale)
    ctx.drawImage(canvas, 0, 0)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{
        filter: "blur(30px)",
        transform: "scale(1.1)", // Slightly larger to avoid seeing edges when blurred
      }}
    />
  )
}
