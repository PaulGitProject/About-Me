"use client"

import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import SkillCard from "@/components/skill-card"
import ScrollReveal from "@/components/scroll-reveal"

export default function SkillCategory({ skills }) {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {skills.map((skill, index) => (
        <ScrollReveal key={skill.name} variant="zoom" delay={0.1 * index} threshold={0.2}>
          <SkillCard name={skill.name} icon={skill.icon} color={skill.color} level={skill.level} />
        </ScrollReveal>
      ))}
    </div>
  )
}
