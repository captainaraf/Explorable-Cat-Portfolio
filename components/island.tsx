"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useMemo } from "react"

interface IslandProps {
  id: string
  name: string
  icon: ReactNode
  color: string
  x: number
  y: number
  isActive: boolean
  onClick: () => void
  children?: ReactNode
}

function SittingCat({ variant, delay }: { variant: number; delay: number }) {
  const cats = [
    // Orange tabby sitting
    <motion.svg
      key="orange"
      width="40"
      height="35"
      viewBox="0 0 40 35"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay }}
    >
      <ellipse cx="20" cy="28" rx="12" ry="6" fill="#F4A460" />
      <ellipse cx="20" cy="22" rx="10" ry="8" fill="#F4A460" />
      <circle cx="20" cy="12" r="9" fill="#F4A460" />
      <path d="M13 6 L11 0 L16 5 Z" fill="#F4A460" />
      <path d="M27 6 L29 0 L24 5 Z" fill="#F4A460" />
      <path d="M14 6 L12 2 L16 5 Z" fill="#FFB6C1" />
      <path d="M26 6 L28 2 L24 5 Z" fill="#FFB6C1" />
      <circle cx="16" cy="11" r="2" fill="#333" />
      <circle cx="24" cy="11" r="2" fill="#333" />
      <circle cx="16.5" cy="10.5" r="0.5" fill="#fff" />
      <circle cx="24.5" cy="10.5" r="0.5" fill="#fff" />
      <ellipse cx="20" cy="14" rx="2" ry="1.5" fill="#FFB6C1" />
      <path d="M18 16 Q20 18 22 16" fill="none" stroke="#333" strokeWidth="0.5" />
      <motion.path
        d="M8 28 Q3 22 6 15"
        fill="none"
        stroke="#F4A460"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ d: ["M8 28 Q3 22 6 15", "M8 28 Q5 20 8 13", "M8 28 Q3 22 6 15"] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.svg>,
    // Gray cat lying down
    <motion.svg
      key="gray"
      width="50"
      height="25"
      viewBox="0 0 50 25"
      animate={{ scaleY: [1, 1.02, 1] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay }}
    >
      <ellipse cx="25" cy="18" rx="20" ry="7" fill="#808080" />
      <circle cx="42" cy="12" r="8" fill="#808080" />
      <path d="M37 6 L35 0 L40 5 Z" fill="#808080" />
      <path d="M47 6 L49 0 L44 5 Z" fill="#808080" />
      <circle cx="40" cy="11" r="1.5" fill="#333" />
      <circle cx="45" cy="11" r="1.5" fill="#333" />
      <ellipse cx="42" cy="14" rx="1.5" ry="1" fill="#FFB6C1" />
      <path d="M5 18 Q0 15 2 10" fill="none" stroke="#808080" strokeWidth="3" strokeLinecap="round" />
    </motion.svg>,
    // Black cat with green eyes
    <motion.svg
      key="black"
      width="35"
      height="40"
      viewBox="0 0 35 40"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay }}
    >
      <ellipse cx="17" cy="32" rx="10" ry="6" fill="#2c2c2c" />
      <ellipse cx="17" cy="24" rx="9" ry="10" fill="#2c2c2c" />
      <circle cx="17" cy="12" r="10" fill="#2c2c2c" />
      <path d="M9 5 L6 -2 L12 4 Z" fill="#2c2c2c" />
      <path d="M25 5 L28 -2 L22 4 Z" fill="#2c2c2c" />
      <circle cx="13" cy="11" r="2.5" fill="#90EE90" />
      <circle cx="21" cy="11" r="2.5" fill="#90EE90" />
      <circle cx="13" cy="11" r="1" fill="#000" />
      <circle cx="21" cy="11" r="1" fill="#000" />
      <ellipse cx="17" cy="15" rx="1.5" ry="1" fill="#FFB6C1" />
      <motion.path
        d="M27 30 Q32 24 30 18"
        fill="none"
        stroke="#2c2c2c"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ d: ["M27 30 Q32 24 30 18", "M27 30 Q34 22 32 16", "M27 30 Q32 24 30 18"] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.svg>,
    // White fluffy cat
    <motion.svg
      key="white"
      width="45"
      height="40"
      viewBox="0 0 45 40"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay }}
    >
      <ellipse cx="22" cy="32" rx="14" ry="7" fill="#f5f5f5" />
      <ellipse cx="22" cy="22" rx="12" ry="12" fill="#f5f5f5" />
      <circle cx="22" cy="10" r="10" fill="#f5f5f5" />
      <path d="M14 3 L10 -4 L16 2 Z" fill="#f5f5f5" />
      <path d="M30 3 L34 -4 L28 2 Z" fill="#f5f5f5" />
      <path d="M15 3 L12 -2 L17 2 Z" fill="#FFB6C1" />
      <path d="M29 3 L32 -2 L27 2 Z" fill="#FFB6C1" />
      <circle cx="18" cy="9" r="2" fill="#87CEEB" />
      <circle cx="26" cy="9" r="2" fill="#87CEEB" />
      <circle cx="18" cy="9" r="0.8" fill="#000" />
      <circle cx="26" cy="9" r="0.8" fill="#000" />
      <ellipse cx="22" cy="13" rx="2" ry="1" fill="#FFB6C1" />
      <path d="M20 15 Q22 17 24 15" fill="none" stroke="#ccc" strokeWidth="0.5" />
    </motion.svg>,
    // Calico cat
    <motion.svg
      key="calico"
      width="40"
      height="35"
      viewBox="0 0 40 35"
      animate={{ y: [0, -2, 0], rotate: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay }}
    >
      <ellipse cx="20" cy="28" rx="12" ry="6" fill="#f5f5f5" />
      <ellipse cx="10" cy="28" rx="5" ry="4" fill="#F4A460" />
      <ellipse cx="28" cy="28" rx="4" ry="3" fill="#333" />
      <ellipse cx="20" cy="20" rx="10" ry="9" fill="#f5f5f5" />
      <ellipse cx="14" cy="18" rx="4" ry="5" fill="#F4A460" />
      <circle cx="20" cy="10" r="9" fill="#f5f5f5" />
      <ellipse cx="24" cy="8" rx="4" ry="5" fill="#333" />
      <path d="M13 4 L10 -2 L15 3 Z" fill="#F4A460" />
      <path d="M27 4 L30 -2 L25 3 Z" fill="#333" />
      <circle cx="16" cy="9" r="2" fill="#333" />
      <circle cx="24" cy="9" r="2" fill="#333" />
      <ellipse cx="20" cy="13" rx="1.5" ry="1" fill="#FFB6C1" />
    </motion.svg>,
  ]

  return cats[variant % cats.length]
}

export function Island({ id, name, icon, color, isActive, onClick, children }: IslandProps) {
  const catVariant = useMemo(() => {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i)
    }
    return Math.abs(hash) % 5
  }, [id])

  const catDelay = useMemo(() => {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i)
    }
    return (Math.abs(hash) % 20) / 10 // 0 to 2 seconds
  }, [id])

  return (
    <motion.div
      id={id}
      className="relative cursor-cat-pointer"
      style={{ width: "400px", minHeight: "450px" }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Island content card */}
      <motion.div
        className={`relative mx-auto w-[350px] rounded-2xl p-6 backdrop-blur-md ${isActive ? "ring-4 ring-yellow-400" : ""
          }`}
        style={{
          background: `linear-gradient(135deg, ${color}ee 0%, ${color}cc 100%)`,
          boxShadow: isActive ? `0 0 40px ${color}80, 0 20px 60px rgba(0,0,0,0.3)` : "0 20px 60px rgba(0,0,0,0.3)",
          minHeight: "300px",
        }}
        onClick={onClick}
        animate={isActive ? { y: [0, -5, 0] } : {}}
        transition={{ duration: 2, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/20">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white drop-shadow-md">{name}</h3>
        </div>

        {/* Content */}
        <div className="text-white/90 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
          {children}
        </div>
      </motion.div>

      {/* Island base with sand */}
      <svg
        viewBox="0 0 400 120"
        className="w-full mt-[-20px]"
        style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}
      >
        <ellipse cx="200" cy="80" rx="180" ry="40" fill="#F4D03F" />
        <ellipse cx="200" cy="75" rx="170" ry="35" fill="#F7DC6F" />
        <ellipse cx="200" cy="70" rx="160" ry="30" fill="#FCF3CF" />
        <ellipse cx="150" cy="65" rx="40" ry="12" fill="#2ECC71" />
        <ellipse cx="250" cy="60" rx="50" ry="15" fill="#27AE60" />
        <ellipse cx="200" cy="55" rx="60" ry="18" fill="#2ECC71" />
        <rect x="60" y="25" width="6" height="40" fill="#8B4513" />
        <path d="M63 25 Q45 15 30 25" stroke="#27AE60" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M63 25 Q80 10 95 20" stroke="#2ECC71" strokeWidth="8" fill="none" strokeLinecap="round" />
        <rect x="330" y="30" width="6" height="35" fill="#8B4513" />
        <path d="M333 30 Q315 20 300 30" stroke="#27AE60" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M333 30 Q350 15 365 25" stroke="#2ECC71" strokeWidth="8" fill="none" strokeLinecap="round" />
      </svg>

      <div className="absolute bottom-12 right-24">
        <SittingCat variant={catVariant} delay={catDelay} />
      </div>

      {(catVariant === 0 || catVariant === 2) && (
        <div className="absolute bottom-14 left-20">
          <SittingCat variant={(catVariant + 2) % 5} delay={catDelay + 0.5} />
        </div>
      )}

      {/* Waves around island */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[420px]"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <svg viewBox="0 0 420 20" className="w-full">
          <path
            d="M0 10 Q35 3 70 10 T140 10 T210 10 T280 10 T350 10 T420 10"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}
