"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function OceanBackground() {
  const [boats, setBoats] = useState<
    Array<{ id: number; y: number; delay: number; duration: number; direction: number }>
  >([])
  const [fish, setFish] = useState<Array<{ id: number; x: number; delay: number }>>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setBoats([
      { id: 1, y: 15, delay: 0, duration: 60, direction: 1 },
      { id: 2, y: 40, delay: 20, duration: 75, direction: -1 },
      { id: 3, y: 65, delay: 10, duration: 55, direction: 1 },
      { id: 4, y: 85, delay: 35, duration: 70, direction: -1 },
    ])
    setFish([
      { id: 1, x: 15, delay: 0 },
      { id: 2, x: 35, delay: 2 },
      { id: 3, x: 55, delay: 4 },
      { id: 4, x: 75, delay: 6 },
      { id: 5, x: 90, delay: 8 },
    ])
  }, [])

  if (!mounted) return null

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {/* Ocean gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #1a5276 0%, #1a3a5c 30%, #0d2137 70%, #091520 100%)",
          }}
        />

        {/* Animated wave layers */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[200%] h-full"
              style={{ top: `${20 + i * 20}%`, opacity: 0.1 - i * 0.02 }}
              animate={{ x: [0, i % 2 === 0 ? "-50%" : "50%"] }}
              transition={{ duration: 20 + i * 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <svg viewBox="0 0 1200 200" className="w-full h-32" preserveAspectRatio="none">
                <path
                  d={`M0 100 Q150 ${50 + i * 10} 300 100 T600 100 T900 100 T1200 100 T1500 100 T1800 100 T2100 100 T2400 100 L2400 200 L0 200 Z`}
                  fill={`rgba(100, 180, 255, ${0.15 - i * 0.03})`}
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {boats.map((boat) => (
          <motion.div
            key={boat.id}
            className="absolute"
            style={{ top: `${boat.y}%` }}
            initial={{ left: boat.direction === 1 ? "-150px" : "calc(100vw + 150px)" }}
            animate={{ left: boat.direction === 1 ? "calc(100vw + 150px)" : "-150px" }}
            transition={{
              duration: boat.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: boat.delay,
            }}
          >
            <motion.div
              animate={{ rotate: [-3, 3, -3], y: [-2, 2, -2] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <svg
                width="80"
                height="70"
                viewBox="0 0 120 100"
                style={{ transform: boat.direction === -1 ? "scaleX(-1)" : "none", opacity: 0.6 }}
              >
                <path d="M20 70 L30 85 L90 85 L100 70 L85 70 Q60 75 35 70 Z" fill="#8B4513" />
                <path d="M25 70 L30 80 L90 80 L95 70" fill="#A0522D" />
                <rect x="55" y="25" width="4" height="50" fill="#5D3A1A" />
                <path d="M59 25 L59 65 L95 55 Z" fill="#F5F5DC" />
                <path d="M55 25 L55 65 L25 55 Z" fill="#FAF0E6" />
                <ellipse cx="70" cy="62" rx="12" ry="8" fill="#F4A460" />
                <circle cx="78" cy="55" r="8" fill="#F4A460" />
                <path d="M73 50 L71 42 L77 48 Z" fill="#F4A460" />
                <path d="M83 50 L85 42 L79 48 Z" fill="#F4A460" />
                <path d="M74 50 L73 45 L76 49 Z" fill="#FFB6C1" />
                <path d="M82 50 L83 45 L80 49 Z" fill="#FFB6C1" />
                <circle cx="75" cy="54" r="1.5" fill="#333" />
                <circle cx="81" cy="54" r="1.5" fill="#333" />
                <ellipse cx="78" cy="57" rx="1" ry="0.5" fill="#FFB6C1" />
                <motion.path
                  d="M58 62 Q50 55 52 48"
                  fill="none"
                  stroke="#F4A460"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{ d: ["M58 62 Q50 55 52 48", "M58 62 Q48 58 50 50", "M58 62 Q50 55 52 48"] }}
                  transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.path
                  d="M57 25 L57 15 L70 20 L57 25"
                  fill="#FF6B6B"
                  animate={{
                    d: ["M57 25 L57 15 L70 20 L57 25", "M57 25 L57 15 L68 18 L57 25", "M57 25 L57 15 L70 20 L57 25"],
                  }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </svg>
            </motion.div>
          </motion.div>
        ))}

        {fish.map((f) => (
          <motion.div
            key={f.id}
            className="absolute"
            style={{ left: `${f.x}%`, bottom: "8%", opacity: 0.5 }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 0.5, 0.5, 0.5, 0],
              rotate: [0, -45, 0, 45, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: f.delay,
              repeatDelay: 6,
              ease: "easeOut",
            }}
          >
            <svg width="30" height="24" viewBox="0 0 40 30">
              <ellipse cx="20" cy="15" rx="15" ry="8" fill="#FFD700" />
              <path d="M5 15 L-8 5 L-8 25 Z" fill="#FFD700" />
              <path d="M20 7 L15 2 L25 2 Z" fill="#FFA500" />
              <circle cx="30" cy="13" r="2" fill="#333" />
              <path d="M18 18 Q20 22 22 18" fill="none" stroke="#FFA500" strokeWidth="1" />
            </svg>
          </motion.div>
        ))}

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: 4 + (i % 5) * 2,
              height: 4 + (i % 5) * 2,
              left: `${(i * 7) % 100}%`,
              bottom: "-20px",
            }}
            animate={{
              y: [0, -800],
              opacity: [0.2, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * 15],
            }}
            transition={{
              duration: 12 + (i % 5) * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.2,
              ease: "linear",
            }}
          />
        ))}

        {/* Seaweed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0"
              style={{ left: `${i * 14}%` }}
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3 + i * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <svg width="40" height="60" viewBox="0 0 40 60" style={{ opacity: 0.4 }}>
                <path
                  d="M20 60 Q15 45 20 30 Q25 15 20 0"
                  fill="none"
                  stroke="#2d5a3d"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path d="M20 50 Q10 40 15 30" fill="none" stroke="#2d5a3d" strokeWidth="3" strokeLinecap="round" />
                <path d="M20 45 Q30 35 25 25" fill="none" stroke="#2d5a3d" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
