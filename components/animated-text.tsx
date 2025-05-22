"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  delay?: number
  className?: string
}

export default function AnimatedText({ text, delay = 0, className = "" }: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return <span className={className}>{text}</span>

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      {text}
    </motion.span>
  )
}
