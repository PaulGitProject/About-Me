"use client"

import { motion } from "framer-motion"

interface EducationItemProps {
  degree: string
  institution: string
  period: string
  description: string
  logo?: string
}

export default function EducationItem({ degree, institution, period, description, logo }: EducationItemProps) {
  return (
    <motion.div
      className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8 relative pl-6 md:pl-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute left-0 top-1.5 md:relative md:left-auto md:top-auto">
        <div className="h-3 w-3 rounded-full bg-violet-500 md:hidden" />
        <div className="hidden md:block text-right">
          <span className="text-muted-foreground text-sm">{period}</span>
        </div>
      </div>
      <div className="md:hidden">
        <span className="text-muted-foreground text-sm">{period}</span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-start gap-4">
          {logo && (
            <div className="hidden md:block h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <img src={logo || "/placeholder.svg"} alt={institution} className="h-full w-full object-cover" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold">{degree}</h3>
            <p className="text-violet-400 mb-2">{institution}</p>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
