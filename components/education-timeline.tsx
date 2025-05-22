"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

interface TimelineItemProps {
  year: string
  degree: string
  institution: string
  description: string
  logo?: string
  isLast?: boolean
  index: number
}

function TimelineItem({ year, degree, institution, description, logo, isLast = false, index }: TimelineItemProps) {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.5 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Gérer le mouvement de la souris pour la traînée de curseur
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div className="relative" ref={itemRef}>
      {/* Vertical line */}
      {!isLast && (
        <motion.div
          className="absolute left-[7px] top-[28px] w-[2px] bg-gradient-to-b from-purple-400 to-violet-500"
          style={{ bottom: "-40px" }}
          initial={{ height: 0 }}
          animate={isInView ? { height: "calc(100% + 40px)" } : { height: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      )}

      <div className="flex items-start gap-6">
        {/* Timeline dot */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 mt-2"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-background"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        <div className="flex-1">
          {/* Year - Maintenant inclus dans l'animation de groupe */}
          <motion.div
            className="text-sm font-medium text-purple-400 mb-2 inline-block transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {year}
          </motion.div>

          {/* Content */}
          <motion.div
            className="bg-card/50 border border-border rounded-lg p-5 shadow-sm relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              y: -5,
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              borderColor: "rgba(139, 92, 246, 0.3)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Effet de bordure au survol */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 border border-purple-400/30 rounded-lg" />
            </motion.div>

            {/* Traînée de curseur floue */}
            {isHovering && (
              <motion.div
                className="pointer-events-none absolute w-20 h-20 rounded-full"
                animate={{
                  x: mousePosition.x - 40, // Centrer sur le curseur (largeur/2)
                  y: mousePosition.y - 40, // Centrer sur le curseur (hauteur/2)
                }}
                transition={{ type: "spring", damping: 15, stiffness: 150 }}
                style={{
                  background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)",
                  filter: "blur(10px)",
                }}
              />
            )}

            <div className="flex items-start gap-4 relative z-10">
              {logo && (
                <div className="hidden md:block h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-shadow duration-300">
                  <img src={logo || "/placeholder.svg"} alt={institution} className="h-full w-full object-cover" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{degree}</h3>
                <p className="text-violet-400 mb-2">{institution}</p>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function EducationTimeline() {
  const { language } = useLanguage()
  const t = translations[language]

  const educationItems =
    language === "en"
      ? [
          {
            year: "September 2024 - Present",
            degree: t.masterDegree,
            institution: t.masterInstitution,
            description: t.masterDesc,
            logo: "/placeholder.svg?height=100&width=100",
          },
          {
            year: "September 2022 - May 2024",
            degree: t.engineeringDegree,
            institution: t.engineeringInstitution,
            description: t.engineeringDesc,
            logo: "/placeholder.svg?height=100&width=100",
          },
          {
            year: "September 2020 - May 2022",
            degree: t.dutDegree,
            institution: t.dutInstitution,
            description: t.dutDesc,
            logo: "/placeholder.svg?height=100&width=100",
          },
        ]
      : [
          {
            year: "Septembre 2024 - Présent",
            degree: "Maîtrise en gestion de projet d'ingénierie (Double Diplôme)",
            institution: "École de Technologie Supérieure (ÉTS) - Canada, Montréal",
            description:
              "Développement de compétences avancées en analyse de rentabilité de projets d'ingénierie, gestion des ressources humaines et techniques, et maîtrise des contraintes de coûts, temps et qualité selon les standards du PMI. Cette formation me permet d'acquérir une vision stratégique pour diriger des projets techniques complexes.",
            logo: "/placeholder.svg?height=100&width=100",
          },
          {
            year: "Septembre 2022 - Mai 2024",
            degree:
              "Études d'ingénieur en Informatique et Système d'Information - Spécialisation Innovation par le logiciel",
            institution: "Université de Technologie de Troyes (UTT) - France, Troyes",
            description:
              "Acquisition d'une expertise transdisciplinaire combinant informatique et sciences sociales, me permettant de concevoir des solutions logicielles innovantes centrées sur l'utilisateur. J'ai développé des compétences en analyse des besoins, conception de systèmes, et évaluation de l'impact des technologies sur les organisations.",
            logo: "/placeholder.svg?height=100&width=100",
          },
          {
            year: "Septembre 2020 - Mai 2022",
            degree: "DUT Informatique",
            institution: "Université de Picardie Jules-Verne - France, Amiens",
            description:
              "Formation fondamentale en informatique couvrant la programmation, les bases de données, les réseaux et l'architecture des systèmes. J'ai acquis une solide culture scientifique et technique me permettant de m'adapter aux évolutions technologiques et d'aborder des problématiques complexes avec méthodologie.",
            logo: "/placeholder.svg?height=100&width=100",
          },
        ]

  return (
    <div className="space-y-12 pl-2">
      {educationItems.map((item, index) => (
        <TimelineItem
          key={index}
          year={item.year}
          degree={item.degree}
          institution={item.institution}
          description={item.description}
          logo={item.logo}
          isLast={index === educationItems.length - 1}
          index={index}
        />
      ))}
    </div>
  )
}
