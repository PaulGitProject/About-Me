"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

interface LanguageBarProps {
  language: string
  level: string
  percentage: number
  color: string
}

function LanguageBar({ language, level, percentage, color }: LanguageBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{language}</span>
        <span className="text-sm text-muted-foreground">{level}</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default function LanguageProficiency() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <motion.div
      className="mt-8 p-6 rounded-xl border border-border bg-card/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-4">{t.languageTitle}</h3>
      <p className="text-muted-foreground mb-6">{t.languageDesc}</p>

      <div className="space-y-6">
        <LanguageBar language="Français" level={t.nativeLevel} percentage={100} color="#5856D6" />
        <LanguageBar language="English" level={t.c1Level} percentage={85} color="#007AFF" />
        <LanguageBar language="Español" level={t.a1Level} percentage={25} color="#FF2D55" />
      </div>
    </motion.div>
  )
}
