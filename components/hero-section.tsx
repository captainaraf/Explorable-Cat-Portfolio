"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { Profile } from "@/lib/types"
import { useRef } from "react"

interface HeroSectionProps {
  profile: Profile | null
}

export function HeroSection({ profile }: HeroSectionProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])

  const handleExplore = () => {
    router.push("/portfolio")
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_#0f172a_100%)]" />
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[100px]"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[80px]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Particles/Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Walking Cats in Background */}
      <div className="absolute bottom-16 left-0 right-0 z-20 overflow-hidden pointer-events-none h-24">
        {/* Orange Cat - Walking Left to Right */}
        <motion.div
          className="absolute bottom-0"
          initial={{ x: "-150px" }}
          animate={{ x: "calc(100vw + 150px)" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg width="120" height="80" viewBox="0 0 120 80" className="text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]">
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
            {/* Legs */}
            <motion.path d="M45 55 L40 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" animate={{ d: ["M45 55 L40 70", "M45 55 L50 70"] }} transition={{ duration: 0.3, repeat: Infinity }} />
            <motion.path d="M75 55 L70 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" animate={{ d: ["M75 55 L70 70", "M75 55 L80 70"] }} transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }} />
          </svg>
        </motion.div>

        {/* Gray Cat - Walking Right to Left */}
        <motion.div
          className="absolute bottom-4"
          initial={{ x: "calc(100vw + 100px)" }}
          animate={{ x: "-200px" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 8 }}
        >
          <svg width="100" height="70" viewBox="0 0 120 80" className="text-slate-300 drop-shadow-[0_0_15px_rgba(203,213,225,0.5)] -scale-x-100">
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
          </svg>
        </motion.div>
      </div>




      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          style={{ y: y1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-blue-400 font-medium tracking-widest uppercase mb-4 text-sm md:text-base">
              {profile?.title || "Creative Developer"}
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-tight">
              {profile?.name || "Your Name"}
              <span className="text-blue-500">.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              {profile?.short_description || "Crafting digital experiences that merge creativity with technology. Welcome to my universe."}
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={handleExplore}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 text-lg px-10 py-7 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all duration-300 group"
              >
                <span className="mr-3">Explore Portfolio</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Visual Element (Profile & Decor) */}
        <motion.div
          className="flex-1 relative flex justify-center lg:justify-end"
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Glowing Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-blue-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-purple-500/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Profile Image Container */}
            <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
              <img
                src={profile?.image_url || "/placeholder.svg?height=400&width=400&query=professional developer portrait"}
                alt={profile?.name || "Profile"}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Floating Cat Silhouette */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 text-white/80 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 20 Q65 5 80 20 Q90 35 80 50 Q90 80 50 90 Q10 80 20 50 Q10 35 20 20 Q35 5 50 20" />
                <path d="M30 25 L25 5 L45 20 Z" />
                <path d="M70 25 L75 5 L55 20 Z" />
                <circle cx="40" cy="40" r="3" fill="#0f172a" />
                <circle cx="60" cy="40" r="3" fill="#0f172a" />
              </svg>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-8 -left-8 text-4xl opacity-50"
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
