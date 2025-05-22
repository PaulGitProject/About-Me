"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { showSkillPercentages } from "@/lib/skills-data"

interface SkillCardProps {
  name: string
  description?: string
  icon: string
  color: string
  level: number
}

export default function SkillCard({ name, description, icon, color, level }: SkillCardProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Reset rotation when language changes to prevent stale state
  useEffect(() => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }, [language])

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized position (-1 to 1)
    const mouseX = (e.clientX - centerX) / (rect.width / 2)
    const mouseY = (e.clientY - centerY) / (rect.height / 2)

    // Update rotation (clamped between -10 and 10 degrees)
    setRotation({
      x: Math.max(-10, Math.min(10, -mouseY * 10)),
      y: Math.max(-10, Math.min(10, mouseX * 10)),
    })
  }

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="h-48 relative cursor-pointer w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      layout // Enable layout animations
    >
      <div
        className="w-full h-full rounded-lg border border-border bg-card/50 p-4 flex flex-col items-center justify-center shadow-sm"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.2s ease-out",
          boxShadow: isHovered ? `0 0 20px ${color}40` : `0 0 5px ${color}20`,
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: color }}
        >
          <span className="text-white text-2xl font-bold">{icon}</span>
        </div>

        <motion.h3 className="text-xl font-semibold mb-2 text-center" layout>
          {name}
        </motion.h3>

        {showSkillPercentages && (
          <motion.div className="w-full mt-auto" layout>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${level}%`,
                  backgroundColor: color,
                }}
              />
            </div>

            <div className="text-xs text-muted-foreground mt-2">
              {level}% {t.skillLevel}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
