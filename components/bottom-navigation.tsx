"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Briefcase, FolderOpen, BookOpen, User, Mail, Youtube } from "lucide-react"
import type { Island } from "@/lib/types"

interface BottomNavigationProps {
  islands: Island[]
  currentIsland: string | null
  onNavigate: (id: string) => void
}

const iconMap: Record<string, React.ReactNode> = {
  experience: <Briefcase className="w-5 h-5" />,
  projects: <FolderOpen className="w-5 h-5" />,
  blog: <BookOpen className="w-5 h-5" />,
  about: <User className="w-5 h-5" />,
  contact: <Mail className="w-5 h-5" />,
  videos: <Youtube className="w-5 h-5" />,
}

export function BottomNavigation({ islands, currentIsland, onNavigate }: BottomNavigationProps) {
  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center gap-1 bg-white/10 backdrop-blur-xl rounded-full px-3 py-2 shadow-2xl border border-white/20">
        {islands.map((island) => (
          <motion.button
            key={island.id}
            onClick={() => onNavigate(island.id)}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-cat-pointer ${currentIsland === island.id
                ? "bg-white/20 text-white"
                : "hover:bg-white/10 text-white/70 hover:text-white"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {iconMap[island.type]}
            <span className="text-[10px] font-medium">{island.name}</span>
            {currentIsland === island.id && (
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full"
                layoutId="activeIndicator"
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  )
}
