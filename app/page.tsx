"use client"

import Link from "next/link"
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe,
  Lightbulb,
  GraduationCap,
  Sparkles,
  Music,
  Gamepad2,
  Dumbbell,
  Headphones,
  Trophy,
  Flame,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import Navbar from "@/components/navbar"
import SkillsSection from "@/components/skills-section"
import ProfileImage from "@/components/profile-image"
import ScrollReveal from "@/components/scroll-reveal"
import EducationTimeline from "@/components/education-timeline"
import ExperienceTimeline from "@/components/experience-timeline"
import LeeroyBackground from "@/components/leeroy-background"
import ModernGrid from "@/components/modern-grid"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { useEffect, useState, useRef } from "react"
import { motion, useSpring, useInView, AnimatePresence } from "framer-motion"

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  // État pour suivre quelle carte de passion est développée
  const [expandedHobby, setExpandedHobby] = useState<number | null>(null)

  // Scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "auto" })
    }
  }

  // Split about text into paragraphs and remove emoji
  const aboutParagraphs = t.aboutText.split("\n\n").map((paragraph) => {
    // Remove emoji (typically the first 2 characters)
    return paragraph.substring(2).trim()
  })

  // Icons for each paragraph
  const paragraphIcons = [
    <GraduationCap key="education" className="h-6 w-6" />,
    <Globe key="globe" className="h-6 w-6" />,
    <Lightbulb key="lightbulb" className="h-6 w-6" />,
  ]

  // Fun emojis for each paragraph
  const funEmojis = ["🚀", "✈️", "🔍"]

  // Données des passions
  const hobbies = [
    {
      title: "Musique",
      description:
        "Je mixe des voix et crée des arrangements vocaux. J'adore explorer différentes techniques pour transformer et harmoniser les voix.",
      icon: <Music className="h-6 w-6" />,
      bgGradient: "linear-gradient(135deg, #FF6B6B, #FFE66D)",
      accentColor: "#FF6B6B",
      details: [
        { icon: <Headphones className="h-4 w-4" />, text: "Mixage vocal" },
        { icon: <Music className="h-4 w-4" />, text: "Arrangements" },
        { icon: <Flame className="h-4 w-4" />, text: "Production audio" },
      ],
    },
    {
      title: "Jeux Vidéo",
      description:
        "Je joue régulièrement à Valorant et Minecraft. J'apprécie les jeux qui combinent stratégie, créativité et compétition.",
      icon: <Gamepad2 className="h-6 w-6" />,
      bgGradient: "linear-gradient(135deg, #4158D0, #C850C0)",
      accentColor: "#C850C0",
      details: [
        { icon: <Trophy className="h-4 w-4" />, text: "Valorant" },
        { icon: <Gamepad2 className="h-4 w-4" />, text: "Minecraft" },
        { icon: <Flame className="h-4 w-4" />, text: "Jeux stratégiques" },
      ],
    },
    {
      title: "Sport",
      description:
        "Je pratique la course à pied et la musculation régulièrement. Le sport est essentiel pour maintenir un équilibre entre corps et esprit.",
      icon: <Dumbbell className="h-6 w-6" />,
      bgGradient: "linear-gradient(135deg, #43CBFF, #9708CC)",
      accentColor: "#43CBFF",
      details: [
        { icon: <Flame className="h-4 w-4" />, text: "Course à pied" },
        { icon: <Dumbbell className="h-4 w-4" />, text: "Musculation" },
        { icon: <Trophy className="h-4 w-4" />, text: "Fitness" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-transparent text-foreground relative">
      {/* Leeroy-inspired background */}
      <LeeroyBackground />

      {/* Modern grid overlay */}
      <ModernGrid />

      <Navbar />

      {/* Hero Section with Profile Image */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-visible">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-6xl mx-auto">
          {/* Profile Image */}
          <ScrollReveal variant="fade" duration={0.8}>
            <ProfileImage />
          </ScrollReveal>

          {/* Hero Text */}
          <div className="text-center md:text-left max-w-2xl space-y-8 relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter font-heading">
              <span className="block">{t.hello}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-500 mt-2 block">
                John Doe
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">{t.role}</p>
            <ScrollReveal variant="slide-up" delay={0.2}>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="#projects">
                    {t.viewWork} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="#contact">{t.contactMe}</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <button
          onClick={scrollToAbout}
          className="absolute bottom-10 left-0 right-0 flex justify-center items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-full p-2 transition-transform hover:scale-110"
          aria-label="Scroll to About section"
        >
          <div className="animate-bounce">
            <ArrowRight className="h-6 w-6 rotate-90" />
          </div>
        </button>
      </section>

      {/* About Section - Enhanced with 3D and motion effects */}
      <section id="about" className="relative py-20 pb-32 px-4 overflow-visible">
        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal variant="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-heading">
              <span className="relative inline-block">
                {t.aboutMe}
                <motion.span
                  className="absolute -top-6 -right-8 text-blue-400"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Sparkles className="h-6 w-6" />
                </motion.span>
              </span>
            </h2>
          </ScrollReveal>

          <div className="space-y-12">
            {aboutParagraphs.map((paragraph, index) => (
              <AboutCard
                key={index}
                text={paragraph}
                icon={paragraphIcons[index]}
                funEmoji={funEmojis[index]}
                index={index}
              />
            ))}

            <ScrollReveal variant="slide-up" delay={0.6}>
              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="#skills">
                    {t.viewSkills} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Language Proficiency Section - Redesigned with only left section */}
      <section className="relative py-16 pt-8 pb-32 px-4 overflow-visible">
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal variant="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-heading">{t.languageTitle}</h2>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={0.2}>
            <div className="space-y-8 p-6 rounded-lg border border-border bg-card/50 shadow-sm">
              <div>
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-500 font-heading">
                  {t.languageSubtitle}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">{t.languageDesc}</p>
              </div>

              {/* Language Section - Redesigned */}
              <div className="space-y-6">
                <LanguageFlagWithProgress
                  flag="🇫🇷"
                  language="Français"
                  level={t.nativeLevel}
                  percentage={100}
                  color="#9d84b7"
                  delay={0.1}
                />
                <LanguageFlagWithProgress
                  flag="🇬🇧"
                  language="English"
                  level={t.c1Level}
                  percentage={85}
                  color="#8e83a3"
                  delay={0.3}
                />
                <LanguageFlagWithProgress
                  flag="🇪🇸"
                  language="Español"
                  level={t.a1Level}
                  percentage={25}
                  color="#a393bf"
                  delay={0.5}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="relative py-20 pt-8 pb-32 px-4 overflow-visible">
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal variant="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center font-heading">Mes Passions</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-center">
              Au-delà des diagrammes de Gantt et des réunions de cadrage, ces passions me permettent de développer une
              vision stratégique et créative essentielle à la gestion de projets ambitieux.
            </p>
          </ScrollReveal>

          <motion.div className="grid md:grid-cols-3 gap-8" layout>
            {hobbies.map((hobby, index) => (
              <HobbyCard
                key={index}
                title={hobby.title}
                description={hobby.description}
                icon={hobby.icon}
                bgGradient={hobby.bgGradient}
                accentColor={hobby.accentColor}
                index={index}
                details={hobby.details}
                isExpanded={expandedHobby === index}
                onToggle={() => setExpandedHobby(expandedHobby === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20 pt-8 pb-32 px-4 overflow-visible">
        <div className="relative z-10">
          <ScrollReveal variant="fade">
            <SkillsSection />
          </ScrollReveal>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative py-20 pt-8 pb-32 px-4 overflow-visible">
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal variant="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-heading">{t.educationTitle}</h2>
          </ScrollReveal>

          {/* Education Timeline */}
          <EducationTimeline />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 pt-8 pb-32 px-4 overflow-visible">
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal variant="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-heading">{t.projectsTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal variant="zoom" delay={0.2}>
              <ProjectCard
                title="E-commerce Platform"
                description="A modern e-commerce platform built with Next.js and Tailwind CSS."
                tags={["Next.js", "React", "Tailwind"]}
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
            </ScrollReveal>
            <ScrollReveal variant="zoom" delay={0.4}>
              <ProjectCard
                title="Dashboard UI"
                description="An admin dashboard with dark mode, charts, and responsive design."
                tags={["React", "TypeScript", "Recharts"]}
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
            </ScrollReveal>
            <ScrollReveal variant="zoom" delay={0.6}>
              <ProjectCard
                title="Mobile App"
                description="A cross-platform mobile application built with React Native."
                tags={["React Native", "Expo", "Firebase"]}
                image="/placeholder.svg?height=400&width=600"
                link="#"
              />
            </ScrollReveal>
          </div>
          <ScrollReveal variant="slide-up" delay={0.8}>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  {t.viewAllProjects} <Github className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-20 pt-8 pb-32 px-4 overflow-visible">
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal variant="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-heading">{t.experienceTitle}</h2>
          </ScrollReveal>

          {/* Experience Timeline */}
          <ExperienceTimeline />

          <ScrollReveal variant="slide-up" delay={0.8}>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  {t.downloadResume} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 pt-8 px-4 overflow-visible">
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal variant="slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center font-heading">{t.contactTitle}</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-center">{t.contactText}</p>
          </ScrollReveal>
          <ScrollReveal variant="slide-up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="mailto:hello@example.com">
                  <Mail className="mr-2 h-4 w-4" /> {t.emailMe}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2 h-4 w-4" /> Twitter
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-border/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} John Doe. {t.rightsReserved}
          </div>
          <div className="flex space-x-6">
            <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="mailto:hello@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// 3D About Card Component with parallax effect
function AboutCard({ text, icon, funEmoji, index }) {
  const cardRef = useRef(null)
  const iconRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  // Mouse parallax effect
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center (normalized from -1 to 1)
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)

    setMouseX(x * 5) // Reduced from 10 to 5 degrees for more subtle rotation
    setMouseY(-y * 5) // Reduced from 10 to 5 degrees
  }

  const resetMouse = () => {
    setMouseX(0)
    setMouseY(0)
    setIsHovered(false)
  }

  // Spring animations for smoother movement
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 }) // Increased damping for smoother motion
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })

  useEffect(() => {
    rotateX.set(mouseY)
    rotateY.set(mouseX)
  }, [mouseX, mouseY, rotateX, rotateY])

  return (
    <ScrollReveal variant="slide-up" delay={0.2 + index * 0.1}>
      <div className="relative w-full mb-8">
        {/* Card container with perspective */}
        <motion.div
          ref={cardRef}
          className="relative w-full perspective-1200"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={resetMouse}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Floating icon - positioned absolutely relative to the container */}
          <motion.div
            ref={iconRef}
            className="absolute -top-6 right-2 sm:-right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white z-10"
            style={{
              background: "linear-gradient(135deg, #9d84b7, #7d6e93)",
              boxShadow: "0 10px 25px -5px rgba(157, 132, 183, 0.5)",
              scale: isHovered ? 1 : 1, // Keep the same size when card is hovered
            }}
            animate={{
              y: [0, index === 0 ? -5 : index === 1 ? -7 : -6, 0], // Different heights based on index
              x: isHovered ? 6 : 0, // Move right when card is hovered to follow the corner
            }}
            transition={{
              y: {
                duration: index === 0 ? 3 : index === 1 ? 4 : 5, // Different durations
                delay: index * 0.7, // Staggered delays
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              x: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
          >
            {icon}
          </motion.div>

          {/* Card content */}
          <motion.div
            className="bg-card/50 border border-border rounded-lg p-5 shadow-sm"
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1200px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          >
            {/* Text content */}
            <motion.p
              className="text-lg text-foreground leading-relaxed mt-2"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(10px)",
              }}
            >
              {text}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </ScrollReveal>
  )
}

// Hobby Card Component - Amélioré avec des animations fluides
function HobbyCard({ title, description, icon, bgGradient, accentColor, index, details, isExpanded, onToggle }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  // Mouse parallax effect
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center (normalized from -1 to 1)
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)

    setMouseX(x * 5)
    setMouseY(-y * 5)
  }

  const resetMouse = () => {
    setMouseX(0)
    setMouseY(0)
  }

  // Spring animations for smoother movement
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })

  useEffect(() => {
    rotateX.set(mouseY)
    rotateY.set(mouseX)
  }, [mouseX, mouseY, rotateX, rotateY])

  return (
    <motion.div className="relative" layout>
      {/* Carte principale - hauteur fixe */}
      <div className="h-[250px]">
        <motion.div
          ref={cardRef}
          className="relative perspective-1200 cursor-pointer h-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetMouse}
          onClick={onToggle}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Card content with 3D effect */}
          <motion.div
            className="relative bg-card/50 border border-border p-6 rounded-lg shadow-sm overflow-hidden h-full flex flex-col"
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1200px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            {/* Background gradient - subtle */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                background: bgGradient,
                borderRadius: "0.5rem",
              }}
            />

            {/* Icon with floating animation */}
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: bgGradient,
                  boxShadow: `0 8px 20px -5px ${accentColor}80`,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)",
                }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="text-white">{icon}</div>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-xl font-semibold font-heading"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(15px)",
                }}
              >
                {title}
              </motion.h3>
            </div>

            {/* Description */}
            <motion.p
              className="text-muted-foreground mb-4 flex-grow"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(10px)",
              }}
            >
              {description}
            </motion.p>

            {/* Expand indicator */}
            <motion.div
              className="absolute bottom-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: `${accentColor}20`,
                color: accentColor,
                transformStyle: "preserve-3d",
                transform: "translateZ(5px)",
              }}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Détails - Avec animation fluide à l'ouverture et à la fermeture */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              opacity: { duration: 0.2 },
            }}
            style={{ overflow: "hidden" }}
            layout
          >
            <div className="bg-card/50 border border-border rounded-lg p-4 shadow-sm">
              <ul className="space-y-2">
                {details.map((detail, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                  >
                    <span
                      className="p-1 rounded-full"
                      style={{
                        background: `${accentColor}20`,
                        color: accentColor,
                      }}
                    >
                      {detail.icon}
                    </span>
                    <span>{detail.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Language Flag With Progress Component
function LanguageFlagWithProgress({ flag, language, level, percentage, color, delay = 0 }) {
  return (
    <motion.div
      className="bg-card/50 border border-border rounded-lg p-4 shadow-sm"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{flag}</span>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{language}</h4>
            <p className="text-sm text-muted-foreground">{level}</p>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}
