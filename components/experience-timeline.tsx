"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Code, Server, ChevronDown } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  location: string
  type: "senior" | "mid" | "junior"
  index: number
  isLast: boolean
}

function ExperienceItem({ title, company, period, description, location, type, index, isLast }: ExperienceItemProps) {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.3 })
  const isEven = index % 2 === 0
  const [isExpanded, setIsExpanded] = useState(false)

  // Determine icon based on experience type
  const getIcon = () => {
    switch (type) {
      case "senior":
        return <Briefcase className="h-5 w-5 text-white" />
      case "mid":
        return <Code className="h-5 w-5 text-white" />
      case "junior":
        return <Server className="h-5 w-5 text-white" />
      default:
        return <Briefcase className="h-5 w-5 text-white" />
    }
  }

  // Determine gradient based on experience type
  const getGradient = () => {
    switch (type) {
      case "senior":
        return "from-purple-400 to-violet-500"
      case "mid":
        return "from-violet-400 to-purple-500"
      case "junior":
        return "from-purple-300 to-violet-400"
      default:
        return "from-purple-400 to-violet-500"
    }
  }

  // Content card component with simplified approach
  const ContentCard = () => (
    <div className="relative">
      {/* Utilisation de Tailwind uniquement pour les transitions */}
      <div
        className={`bg-card/50 border border-border rounded-lg p-5 relative overflow-hidden cursor-pointer z-10 shadow-sm
                    transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg
                    ${isExpanded ? "shadow-lg" : ""}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Effet de bordure */}
        <div
          className={`absolute inset-0 border rounded-lg transition-colors duration-500 ease-out
                      ${isExpanded || true ? "border-purple-400/30" : "border-transparent"}`}
        ></div>

        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-sm rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 text-foreground">
            {period}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-violet-400 mb-1">{company}</p>
            <p className="text-sm text-muted-foreground mb-3">{location}</p>
          </div>

          {/* Indicateur de clic avec rotation */}
          <div className="ml-2 p-1 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center">
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-500 ease-out
                          ${isExpanded ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>

        {/* Contenu détaillé */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-out
                      ${
                        isExpanded
                          ? "max-h-96 opacity-100 mt-4 pt-4 border-t border-border"
                          : "max-h-0 opacity-0 mt-0 pt-0 border-t-0"
                      }`}
        >
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Indicateur */}
        <div
          className={`absolute bottom-2 right-2 text-xs text-muted-foreground transition-opacity duration-300
                      opacity-0 hover:opacity-100 ${isExpanded ? "opacity-100" : ""}`}
        >
          {isExpanded ? "Click to close" : "Click to view details"}
        </div>
      </div>
    </div>
  )

  // Rendu du composant principal
  return (
    <div ref={itemRef} className="relative mb-16 last:mb-0">
      {/* Mobile layout - vertical timeline with all content on the right */}
      <div className="md:hidden relative pl-16">
        {/* Timeline dot */}
        <div className="absolute left-0 top-0 z-10">
          <motion.div
            className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${getGradient()} shadow-lg`}
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            {getIcon()}
          </motion.div>
        </div>

        {/* Timeline connector line */}
        {!isLast && (
          <div className="absolute left-4 top-8 bottom-[-4rem] w-[2px] bg-gradient-to-b z-0">
            <motion.div
              className={`absolute inset-0 bg-gradient-to-b ${getGradient()} origin-top`}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
        )}

        {/* Content */}
        <motion.div
          className="mt-2 relative"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContentCard />
        </motion.div>
      </div>

      {/* Desktop layout - alternating sides */}
      <div className="hidden md:block">
        {/* Center icon */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${getGradient()} shadow-lg`}
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            {getIcon()}
          </motion.div>
        </div>

        {/* Timeline connector line */}
        {!isLast && (
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[3.5rem] bottom-[-4rem] w-[2px] bg-gradient-to-b z-0">
            <motion.div
              className={`absolute inset-0 bg-gradient-to-b ${getGradient()} origin-top`}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
        )}

        {/* Content row with alternating sides */}
        <div className="flex">
          {/* Left side */}
          <motion.div
            className="w-1/2 pr-12 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: isEven ? 1 : 0, x: isEven ? 0 : -50 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isEven && <ContentCard />}
          </motion.div>

          {/* Right side */}
          <motion.div
            className="w-1/2 pl-12 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: !isEven ? 1 : 0, x: !isEven ? 0 : 50 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!isEven && <ContentCard />}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function ExperienceTimeline() {
  const { language } = useLanguage()
  const t = translations[language]

  const experienceItems = [
    {
      title: t.importDevTitle,
      company: "blgCloud",
      period: t.importDevPeriod,
      location: t.compiegneLocation,
      description: t.importDevDesc,
      type: "mid" as const,
    },
    {
      title: t.internDevPMTitle,
      company: "blgCloud",
      period: t.internDevPMPeriod,
      location: t.compiegneLocation,
      description: t.internDevPMDesc,
      type: "mid" as const,
    },
    {
      title: t.internWebDevTitle,
      company: t.misLab,
      period: t.internWebDevPeriod,
      location: t.amiensLocation,
      description: t.internWebDevDesc,
      type: "junior" as const,
    },
  ]

  return (
    <div className="relative py-8">
      {experienceItems.map((item, index) => (
        <ExperienceItem
          key={index}
          title={item.title}
          company={item.company}
          period={item.period}
          location={item.location}
          description={item.description}
          type={item.type}
          index={index}
          isLast={index === experienceItems.length - 1}
        />
      ))}
    </div>
  )
}
