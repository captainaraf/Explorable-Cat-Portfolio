"use client"

import * as React from "react"
import { motion, MotionValue, useTransform } from "framer-motion"
import type { Island as IslandType } from "@/lib/types"

interface MinimapProps {
  islands: IslandType[]
  currentIsland: string | null
  viewportX: MotionValue<number>
  viewportY: MotionValue<number>
  mapSize: { width: number; height: number }
  onIslandClick: (id: string) => void
}

export function Minimap({ islands, currentIsland, viewportX, viewportY, mapSize, onIslandClick }: MinimapProps) {
  const minimapWidth = 200
  const minimapHeight = 150
  const scaleX = minimapWidth / mapSize.width
  const scaleY = minimapHeight / mapSize.height

  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 })

  // Transform viewport position to minimap indicator position
  const indicatorX = useTransform(viewportX, (x) => -x * scaleX)
  const indicatorY = useTransform(viewportY, (y) => -y * scaleY)

  React.useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 bg-ocean-deep/80 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-xl">
      <div className="text-xs text-white/60 mb-2 font-medium">Map</div>
      <div
        className="relative bg-ocean-medium/50 rounded-lg overflow-hidden"
        style={{ width: minimapWidth, height: minimapHeight }}
      >
        {/* Ocean pattern */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute w-full h-px bg-white/20" style={{ top: `${20 + i * 20}%` }} />
          ))}
        </div>

        {/* Islands */}
        {islands.map((island) => (
          <motion.div
            key={island.id}
            className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-200 ${currentIsland === island.id ? "bg-accent ring-2 ring-white" : "bg-sand hover:bg-accent/70"
              }`}
            style={{
              left: island.x * scaleX - 8,
              top: island.y * scaleY - 8,
            }}
            onClick={() => onIslandClick(island.id)}
            whileHover={{ scale: 1.3 }}
            title={island.name}
          />
        ))}

        {/* Viewport indicator */}
        <motion.div
          className="absolute border-2 border-white/60 rounded pointer-events-none"
          style={{
            width: windowSize.width * scaleX,
            height: windowSize.height * scaleY,
            x: indicatorX,
            y: indicatorY,
          }}
        />


        {/* Compass */}
        <div className="absolute bottom-1 right-1 w-6 h-6">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            <path d="M12 4 L14 12 L12 10 L10 12 Z" fill="#FF6B6B" />
            <path d="M12 20 L14 12 L12 14 L10 12 Z" fill="#fff" />
            <text x="12" y="3" textAnchor="middle" fill="#fff" fontSize="4" fontWeight="bold">
              N
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
