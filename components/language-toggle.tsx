"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "fr" : "en")}
      className="rounded-full"
      aria-label="Toggle language"
    >
      {language === "en" ? "FR" : "EN"}
    </Button>
  )
}
