"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function ProfileImage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frontImageRef = useRef<HTMLImageElement | null>(null)
  const backImageRef = useRef<HTMLImageElement | null>(null)
  const animationRef = useRef<number>()

  // Mouse tracking for 3D effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  // Initialize image and canvas
  useEffect(() => {
    setMounted(true)

    // Create front image element
    frontImageRef.current = new Image()
    frontImageRef.current.src = "/placeholder.svg?height=600&width=600"
    frontImageRef.current.crossOrigin = "anonymous"
    frontImageRef.current.onload = () => {
      if (canvasRef.current) {
        initCanvas()
      }
    }

    // Create back image element
    backImageRef.current = new Image()
    backImageRef.current.src = "/models/smile-image.png" // Utiliser une image du smiley au lieu du modèle 3D
    backImageRef.current.crossOrigin = "anonymous"

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Handle theme changes
  useEffect(() => {
    if (mounted && canvasRef.current) {
      initCanvas()
    }
  }, [theme, mounted])

  // Update rotation based on mouse position with smooth animation
  useEffect(() => {
    if (isFlipped) {
      setRotation({ x: 0, y: 0 })
      return
    }

    const animateRotation = () => {
      // Calculate target rotation based on mouse position (much more subtle now)
      const targetX = mousePosition.y * 3 // Reduced from 10 to 3
      const targetY = mousePosition.x * 3 // Reduced from 10 to 3

      // Apply smooth easing with stronger damping
      setRotation((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.05, // Reduced from 0.1 to 0.05 for more stability
        y: prev.y + (targetY - prev.y) * 0.05, // Reduced from 0.1 to 0.05 for more stability
      }))
    }

    // Use requestAnimationFrame for smoother animation
    const animationId = requestAnimationFrame(animateRotation)
    return () => cancelAnimationFrame(animationId)
  }, [mousePosition, isFlipped])

  // Initialize canvas and particles
  const initCanvas = () => {
    if (!canvasRef.current || !frontImageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 400
    canvas.width = size
    canvas.height = size

    // Draw circular image
    ctx.save()
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    // Draw image inside the circle
    ctx.drawImage(frontImageRef.current, 0, 0, size, size)
    ctx.restore()

    // Draw glow effect
    const isDark = theme === "dark"
    const gradient = ctx.createRadialGradient(size / 2, size / 2, size / 2 - 15, size / 2, size / 2, size / 2 + 20)
    gradient.addColorStop(0, isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.2)")
    gradient.addColorStop(1, "rgba(139, 92, 246, 0)")

    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2 + 20, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
  }

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized position (-1 to 1)
    const mouseX = (e.clientX - centerX) / (rect.width / 2)
    const mouseY = (e.clientY - centerY) / (rect.height / 2)

    // Update mouse position (clamped between -1 and 1)
    setMousePosition({
      x: Math.max(-1, Math.min(1, mouseX)),
      y: Math.max(-1, Math.min(1, mouseY)),
    })
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  // Handle flip animation
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Calculate rotation limits (max 5 degrees - reduced from 15)
  const maxRotation = 5 // Reduced from 15 to 5 degrees
  const rotateY = isFlipped ? 0 : rotation.y * maxRotation
  const rotateX = isFlipped ? 0 : -rotation.x * maxRotation

  return (
    <div
      className="relative perspective-1200"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
          rotateX: { duration: 0.3, ease: "easeOut" }, // Increased from 0.1 to 0.3
          rotateY: { duration: 0.3, ease: "easeOut" }, // Increased from 0.1 to 0.3
        }}
        onClick={handleFlip}
      >
        {/* 3D Flip Container */}
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Side */}
          <motion.div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
            {/* Text that flows around the image - Only visible when not flipped */}
            {!isFlipped && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <div className="absolute w-full h-full rounded-full">
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <defs>
                      <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text fontSize="2.5">
                      <textPath xlinkHref="#circle" className="text-muted-foreground">
                        FRONTEND DEVELOPER • UI/UX DESIGNER • CREATIVE THINKER • PROBLEM SOLVER • FRONTEND DEVELOPER •
                        UI/UX DESIGNER • CREATIVE THINKER • PROBLEM SOLVER •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {/* Canvas for image and particles */}
            <canvas ref={canvasRef} className="w-full h-full rounded-full" />
          </motion.div>

          {/* Back Side - Simplified to use an image */}
          <motion.div
            className="absolute w-full h-full rounded-full overflow-hidden backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="w-full h-full bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="text-6xl">😊</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Click indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground animate-pulse">
          Click to flip
        </div>
      </motion.div>
    </div>
  )
}
