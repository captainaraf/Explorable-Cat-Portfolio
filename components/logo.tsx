"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface LogoProps {
  name: string
}

export function Logo({ name }: LogoProps) {
  return (
    <Link href="/" className="fixed top-4 left-4 z-50">
      <motion.div
        className="flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/20 cursor-cat-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Cat logo icon */}
        <svg width="32" height="32" viewBox="0 0 32 32" className="text-primary">
          <circle cx="16" cy="18" r="10" fill="currentColor" />
          <path d="M8 12 L6 4 L12 10 Z" fill="currentColor" />
          <path d="M24 12 L26 4 L20 10 Z" fill="currentColor" />
          <circle cx="12" cy="16" r="2" fill="white" />
          <circle cx="20" cy="16" r="2" fill="white" />
          <ellipse cx="16" cy="20" rx="2" ry="1" fill="#FFB6C1" />
        </svg>
        <span className="font-bold text-foreground">{name}</span>
      </motion.div>
    </Link>
  )
}
