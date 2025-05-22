"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  link: string
}

export default function ProjectCard({ title, description, tags, image, link }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg border border-border bg-card/50 shadow-sm"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          {title}
          <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowUpRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={link} className="absolute inset-0" aria-label={`View project: ${title}`} />
      </div>
    </motion.div>
  )
}
