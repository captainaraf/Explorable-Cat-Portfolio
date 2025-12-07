"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  name: string
  onComplete: () => void
}

interface Star {
  id: number
  width: number
  height: number
  left: number
  top: number
  duration: number
}

interface Sparkle {
  id: number
  x: number
  y: number
  color: string
}

export function LoadingScreen({ name, onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"sleeping" | "waking" | "chasing" | "heaving" | "vomiting" | "complete">("sleeping")
  const [stars, setStars] = useState<Star[]>([])
  const [vomitParticles, setVomitParticles] = useState<Sparkle[]>([])
  const hasCalledComplete = useRef(false)

  useEffect(() => {
    // Generate stars
    const newStars = [...Array(30)].map((_, i) => ({
      id: i,
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 2 + 1,
    }))
    setStars(newStars)

    // Generate vomit particles (colorful)
    const colors = ["#fbbf24", "#3b82f6", "#ef4444", "#10b981", "#8b5cf6"]
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 60, // Spread width
      y: Math.random() * 100 + 20, // Fall distance
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setVomitParticles(newParticles)

    if (hasCalledComplete.current) return

    const sequence = async () => {
      // Phase 1: Sleeping
      await new Promise((r) => setTimeout(r, 500))

      // Phase 2: Waking
      setPhase("waking")
      await new Promise((r) => setTimeout(r, 1000))

      // Phase 3: Chasing
      setPhase("chasing")
      await new Promise((r) => setTimeout(r, 2000))

      // Phase 4: Heaving (Pre-vomit)
      setPhase("heaving")
      await new Promise((r) => setTimeout(r, 1500)) // 3 heaves

      // Phase 5: Vomiting (Reveal)
      setPhase("vomiting")
      await new Promise((r) => setTimeout(r, 2000))

      // Complete
      setPhase("complete")
      setTimeout(() => {
        if (!hasCalledComplete.current) {
          hasCalledComplete.current = true
          onComplete()
        }
      }, 500)
    }

    sequence()
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Stars */}
          <div className="absolute inset-0">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute bg-white rounded-full"
                style={{
                  width: star.width,
                  height: star.height,
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Container */}
          <div className="relative w-full max-w-3xl h-96 flex flex-col items-center justify-center">

            {/* Phase 1 & 2: Sleeping / Waking Eyes */}
            <AnimatePresence>
              {(phase === "sleeping" || phase === "waking") && (
                <motion.div
                  className="absolute"
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="120" height="60" viewBox="0 0 120 60">
                    <motion.g
                      initial={{ scaleY: 0.1 }}
                      animate={{ scaleY: phase === "waking" ? 1 : 0.1 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      <ellipse cx="30" cy="30" rx="20" ry="15" fill="#fbbf24" />
                      <ellipse cx="30" cy="30" rx="5" ry="12" fill="#0f172a" />
                      <ellipse cx="90" cy="30" rx="20" ry="15" fill="#fbbf24" />
                      <ellipse cx="90" cy="30" rx="5" ry="12" fill="#0f172a" />
                    </motion.g>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 3: The Chase */}
            <AnimatePresence>
              {phase === "chasing" && (
                <>
                  {/* Laser Orb */}
                  <motion.div
                    className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                    animate={{
                      x: [-200, 200, -150, 150, 0],
                      y: [-100, 100, 50, -50, 0],
                      scale: [1, 1.2, 0.8, 1.1, 0],
                    }}
                    transition={{ duration: 2, times: [0, 0.25, 0.5, 0.75, 1] }}
                  />

                  {/* Orange Running Cat SVG */}
                  <motion.div
                    className="absolute"
                    animate={{
                      x: [-220, 180, -170, 130, 0],
                      y: [-110, 90, 40, -60, -10],
                      scaleX: [1, 1, -1, -1, 1]
                    }}
                    transition={{ duration: 2, delay: 0.1, times: [0, 0.25, 0.5, 0.75, 1] }}
                  >
                    <svg width="120" height="80" viewBox="0 0 120 80" className="text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]">
                      <ellipse cx="60" cy="45" rx="30" ry="17" fill="currentColor" />
                      <circle cx="88" cy="35" r="15" fill="currentColor" />
                      <path d="M78 27 L74 12 L85 23 Z" fill="currentColor" />
                      <path d="M98 27 L102 12 L91 23 Z" fill="currentColor" />
                      <circle cx="83" cy="33" r="2" fill="#0f172a" />
                      <circle cx="93" cy="33" r="2" fill="#0f172a" />
                      <motion.path
                        d="M30 45 Q15 35 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                        animate={{ d: ["M30 45 Q15 35 20 20", "M30 45 Q20 30 25 15", "M30 45 Q15 35 20 20"] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                      {/* Animated Legs */}
                      <motion.path d="M45 55 L40 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" animate={{ d: ["M45 55 L40 70", "M45 55 L50 70"] }} transition={{ duration: 0.15, repeat: Infinity }} />
                      <motion.path d="M55 55 L50 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" animate={{ d: ["M55 55 L50 70", "M55 55 L60 70"] }} transition={{ duration: 0.15, repeat: Infinity, delay: 0.075 }} />
                      <motion.path d="M65 55 L60 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" animate={{ d: ["M65 55 L60 70", "M65 55 L70 70"] }} transition={{ duration: 0.15, repeat: Infinity, delay: 0.05 }} />
                      <motion.path d="M75 55 L70 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" animate={{ d: ["M75 55 L70 70", "M75 55 L80 70"] }} transition={{ duration: 0.15, repeat: Infinity, delay: 0.1 }} />
                    </svg>
                  </motion.div>
                </>
              )}
            </AnimatePresence>


            {/* Phase 4 & 5: Heaving & Vomiting */}
            {(phase === "heaving" || phase === "vomiting") && (
              <div className="relative flex flex-col items-center">

                {/* Sitting Cat (Heaving) */}
                <motion.div
                  className="relative z-20 w-32 h-32 text-slate-200"
                  animate={
                    phase === "heaving"
                      ? {
                        scaleY: [1, 0.9, 1.1, 0.9, 1],
                        y: [0, 5, -5, 5, 0]
                      }
                      : { scaleY: 1, y: 0 }
                  }
                  transition={{ duration: 1.5, times: [0, 0.25, 0.5, 0.75, 1] }}
                >
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    {/* Body */}
                    <path d="M50 20 Q65 5 80 20 Q90 35 80 50 Q90 80 50 90 Q10 80 20 50 Q10 35 20 20 Q35 5 50 20" />
                    {/* Ears */}
                    <path d="M30 25 L25 5 L45 20 Z" />
                    <path d="M70 25 L75 5 L55 20 Z" />
                    {/* Eyes (Squeezed shut when heaving) */}
                    {phase === "heaving" ? (
                      <g stroke="#fbbf24" strokeWidth="2">
                        <path d="M35 40 L45 40" />
                        <path d="M55 40 L65 40" />
                      </g>
                    ) : (
                      <g fill="#fbbf24">
                        <circle cx="40" cy="40" r="3" />
                        <circle cx="60" cy="40" r="3" />
                      </g>
                    )}
                    {/* Mouth (Open when vomiting) */}
                    <motion.path
                      d="M45 55 Q50 60 55 55"
                      stroke="#000" strokeWidth="2" fill="none"
                      animate={{ d: phase === "vomiting" ? "M40 55 Q50 70 60 55" : "M45 55 Q50 60 55 55" }}
                    />
                  </svg>
                </motion.div>

                {/* Vomit Particles & Name */}
                <div className="relative z-10 flex flex-col items-center -mt-4">
                  {phase === "vomiting" && (
                    <>
                      {/* Particles */}
                      {vomitParticles.map((p) => (
                        <motion.div
                          key={p.id}
                          className="absolute rounded-full"
                          style={{
                            width: Math.random() * 6 + 4,
                            height: Math.random() * 6 + 4,
                            backgroundColor: p.color,
                            top: 0,
                          }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                          animate={{
                            x: p.x,
                            y: p.y,
                            opacity: 0,
                            scale: 1
                          }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: Math.random() * 0.2 }}
                        />
                      ))}

                      {/* Name Reveal - Letter by Letter Wave */}
                      <div className="mt-8 flex justify-center overflow-hidden">
                        {name.split("").map((letter, i) => (
                          <motion.span
                            key={i}
                            className="text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 inline-block"
                            initial={{
                              y: 100,
                              opacity: 0,
                              rotateX: -90,
                              scale: 0.5
                            }}
                            animate={{
                              y: 0,
                              opacity: 1,
                              rotateX: 0,
                              scale: 1
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 150,
                              damping: 12,
                              delay: i * 0.08
                            }}
                            style={{
                              display: letter === " " ? "inline" : "inline-block",
                              width: letter === " " ? "0.3em" : "auto"
                            }}
                          >
                            {letter === " " ? "\u00A0" : letter}
                          </motion.span>
                        ))}
                      </div>

                    </>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Loading Text */}
          <motion.div
            className="absolute bottom-10 text-slate-500 text-sm tracking-[0.3em] font-light uppercase"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {phase === "sleeping" && "Zzz..."}
            {phase === "waking" && "Spotting target..."}
            {phase === "chasing" && "Target acquired..."}
            {phase === "heaving" && "Preparing..."}
            {phase === "vomiting" && "Delivered!"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
