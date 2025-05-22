"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import LanguageToggle from "@/components/language-toggle"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          John Doe
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
            {t.about}
          </Link>
          <Link href="#skills" className="text-foreground/80 hover:text-foreground transition-colors">
            {t.skills}
          </Link>
          <Link href="#education" className="text-foreground/80 hover:text-foreground transition-colors">
            {t.education}
          </Link>
          <Link href="#projects" className="text-foreground/80 hover:text-foreground transition-colors">
            {t.projects}
          </Link>
          <Link href="#experience" className="text-foreground/80 hover:text-foreground transition-colors">
            {t.experience}
          </Link>
          <Link href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">
            {t.contact}
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <LanguageToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-background border-b border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              href="#about"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.about}
            </Link>
            <Link
              href="#skills"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.skills}
            </Link>
            <Link
              href="#education"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.education}
            </Link>
            <Link
              href="#projects"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.projects}
            </Link>
            <Link
              href="#experience"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.experience}
            </Link>
            <Link
              href="#contact"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.contact}
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
