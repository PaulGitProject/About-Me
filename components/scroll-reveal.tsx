"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView, type Variant } from "framer-motion"

type AnimationVariant = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "none"

interface ScrollRevealProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  threshold?: number
  margin?: string
}

export default function ScrollReveal({
  children,
  variant = "fade",
  delay = 0,
  duration = 0.5,
  once = true,
  className = "",
  threshold = 0.1,
  margin = "-100px",
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold, margin })

  const getVariants = (variant: AnimationVariant) => {
    const variants = {
      hidden: {} as Variant,
      visible: {
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0], // Smooth easing function
        },
      } as Variant,
    }

    switch (variant) {
      case "fade":
        variants.hidden = { opacity: 0 }
        variants.visible = { ...variants.visible, opacity: 1 }
        break
      case "slide-up":
        variants.hidden = { opacity: 0, y: 20 } // Reduced from 30 to 20 for better performance
        variants.visible = { ...variants.visible, opacity: 1, y: 0 }
        break
      case "slide-down":
        variants.hidden = { opacity: 0, y: -20 } // Reduced from -30 to -20
        variants.visible = { ...variants.visible, opacity: 1, y: 0 }
        break
      case "slide-left":
        variants.hidden = { opacity: 0, x: 20 } // Reduced from 30 to 20
        variants.visible = { ...variants.visible, opacity: 1, x: 0 }
        break
      case "slide-right":
        variants.hidden = { opacity: 0, x: -20 } // Reduced from -30 to -20
        variants.visible = { ...variants.visible, opacity: 1, x: 0 }
        break
      case "zoom":
        variants.hidden = { opacity: 0, scale: 0.97 } // Changed from 0.95 to 0.97 for subtler effect
        variants.visible = { ...variants.visible, opacity: 1, scale: 1 }
        break
      case "none":
        variants.hidden = {}
        variants.visible = { ...variants.visible }
        break
    }

    return variants
  }

  const variants = getVariants(variant)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
