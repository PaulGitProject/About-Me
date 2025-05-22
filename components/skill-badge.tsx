"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.div
      className="px-3 py-1.5 rounded-full bg-muted border border-border text-sm"
      whileHover={{ y: -2, scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {name}
    </motion.div>
  )
}
