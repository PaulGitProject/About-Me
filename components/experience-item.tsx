"use client"

import { motion } from "framer-motion"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
}

export default function ExperienceItem({ title, company, period, description }: ExperienceItemProps) {
  return (
    <motion.div
      className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8 relative pl-6 md:pl-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute left-0 top-1.5 md:relative md:left-auto md:top-auto">
        <div className="h-3 w-3 rounded-full bg-primary md:hidden" />
        <div className="hidden md:block text-right">
          <span className="text-muted-foreground text-sm">{period}</span>
        </div>
      </div>
      <div className="md:hidden">
        <span className="text-muted-foreground text-sm">{period}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-violet-400 mb-2">{company}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}
