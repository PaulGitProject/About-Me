"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import SkillCategory from "@/components/skill-category"
import ScrollReveal from "@/components/scroll-reveal"
import { programmingSkills, officeSkills, projectManagementSkills, designSkills } from "@/lib/skills-data"

export default function SkillsSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeCategory, setActiveCategory] = useState("programming")

  const categories = [
    { id: "programming", name: t.programmingCategory },
    { id: "office", name: t.officeCategory },
    { id: "projectManagement", name: t.projectManagementCategory },
    { id: "design", name: t.designCategory },
  ]

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal variant="slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center font-heading">{t.skillsTitle}</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">{t.skillsDescription}</p>
        </ScrollReveal>

        {/* Category Navigation */}
        <ScrollReveal variant="slide-up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`px-5 py-2 rounded-full text-sm md:text-base transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
                style={{ width: "auto" }}
                transition={{ layout: { duration: 0.3, type: "spring", bounce: 0.2 } }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Display */}
        <div className="min-h-[400px]" key={activeCategory}>
          {activeCategory === "programming" && <SkillCategory skills={programmingSkills} />}
          {activeCategory === "office" && <SkillCategory skills={officeSkills} />}
          {activeCategory === "projectManagement" && <SkillCategory skills={projectManagementSkills} />}
          {activeCategory === "design" && <SkillCategory skills={designSkills} />}
        </div>
      </div>
    </section>
  )
}
