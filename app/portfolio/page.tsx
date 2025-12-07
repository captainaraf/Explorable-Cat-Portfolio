"use client"

import type React from "react"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useMotionValue } from "framer-motion"
import { Briefcase, FolderOpen, BookOpen, User, Mail, Youtube } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { OceanBackground } from "@/components/ocean-background"
import { Island } from "@/components/island"
import { Minimap } from "@/components/minimap"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Logo } from "@/components/logo"
import { ExperienceIslandContent } from "@/components/islands/experience-island"
import { ProjectsIslandContent } from "@/components/islands/projects-island"
import { BlogIslandContent } from "@/components/islands/blog-island"
import { AboutIslandContent } from "@/components/islands/about-island"
import { ContactIslandContent } from "@/components/islands/contact-island"
import { VideosIslandContent } from "@/components/islands/videos-island"
import type {
  Profile,
  Experience,
  Project,
  BlogPost,
  YouTubeVideo,
  SocialLink,
  Island as IslandType,
} from "@/lib/types"

const ISLAND_CONFIG: IslandType[] = [
  { id: "experience", name: "Experience", x: 400, y: 400, type: "experience" },
  { id: "projects", name: "Projects", x: 1400, y: 800, type: "projects" },
  { id: "blog", name: "Blog", x: 2400, y: 350, type: "blog" },
  { id: "about", name: "About Me", x: 3400, y: 900, type: "about" },
  { id: "videos", name: "Videos", x: 4400, y: 400, type: "videos" },
  { id: "contact", name: "Contact", x: 5400, y: 750, type: "contact" },
]

const ISLAND_COLORS: Record<string, string> = {
  experience: "#2980b9",
  projects: "#27ae60",
  blog: "#8e44ad",
  about: "#e67e22",
  videos: "#c0392b",
  contact: "#16a085",
}

const ISLAND_ICONS: Record<string, React.ReactNode> = {
  experience: <Briefcase className="w-6 h-6" />,
  projects: <FolderOpen className="w-6 h-6" />,
  blog: <BookOpen className="w-6 h-6" />,
  about: <User className="w-6 h-6" />,
  videos: <Youtube className="w-6 h-6" />,
  contact: <Mail className="w-6 h-6" />,
}

const MAP_SIZE = { width: 6500, height: 1600 }

export default function PortfolioPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [currentIsland, setCurrentIsland] = useState<string | null>("experience")

  // MotionValues for high-performance updates without re-renders
  const viewportX = useMotionValue(0)
  const viewportY = useMotionValue(0)

  // Performance: Use refs for drag state to avoid re-renders
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const positionRef = useRef({ x: 0, y: 0 })
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const lastTimeRef = useRef(Date.now())
  const animationFrameRef = useRef<number>(0)
  const mapRef = useRef<HTMLDivElement>(null)
  const lastMinimapUpdateRef = useRef(0)



  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const [profileRes, expRes, projRes, blogRes, videoRes, socialRes] = await Promise.all([
        supabase.from("profiles").select("*").limit(1).single(),
        supabase.from("experiences").select("*").order("order_index"),
        supabase.from("projects").select("*").order("order_index"),
        supabase.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false }),
        supabase.from("youtube_videos").select("*").order("order_index"),
        supabase.from("social_links").select("*").order("order_index"),
      ])

      if (profileRes.data) setProfile(profileRes.data)
      if (expRes.data) setExperiences(expRes.data)
      if (projRes.data) setProjects(projRes.data)
      if (blogRes.data) setBlogPosts(blogRes.data)
      if (videoRes.data) setVideos(videoRes.data)
      if (socialRes.data) setSocialLinks(socialRes.data)
    }
    fetchData()
  }, [])

  const clampPosition = useCallback((x: number, y: number) => {
    if (typeof window === "undefined") return { x, y }
    return {
      x: Math.max(Math.min(x, 100), -(MAP_SIZE.width - window.innerWidth + 100)),
      y: Math.max(Math.min(y, 100), -(MAP_SIZE.height - window.innerHeight + 100)),
    }
  }, [])

  // Direct DOM manipulation for smooth updates
  const updateMapTransform = useCallback((x: number, y: number) => {
    // Update DOM
    if (mapRef.current) {
      mapRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    // Update MotionValues for Minimap (does not trigger re-render)
    viewportX.set(x)
    viewportY.set(y)
  }, [viewportX, viewportY])

  // Detect which island is closest to viewport center
  const detectClosestIsland = useCallback((position: { x: number; y: number }) => {
    if (typeof window === "undefined") return null

    const viewportCenterX = -position.x + window.innerWidth / 2
    const viewportCenterY = -position.y + window.innerHeight / 2

    let closestIsland = ISLAND_CONFIG[0]
    let minDistance = Infinity

    for (const island of ISLAND_CONFIG) {
      const islandCenterX = island.x + 200 // Approximate island center offset
      const islandCenterY = island.y + 250
      const distance = Math.sqrt(
        Math.pow(viewportCenterX - islandCenterX, 2) +
        Math.pow(viewportCenterY - islandCenterY, 2)
      )
      if (distance < minDistance) {
        minDistance = distance
        closestIsland = island
      }
    }

    return closestIsland.id
  }, [])

  // Throttled update for island detection (updates state at most every 100ms)
  const updateActiveIslandThrottled = useCallback((position: { x: number; y: number }) => {
    const now = performance.now()
    if (now - lastMinimapUpdateRef.current > 100) {
      lastMinimapUpdateRef.current = now

      // Auto-detect closest island
      const closest = detectClosestIsland(position)
      if (closest) {
        setCurrentIsland(prev => prev === closest ? prev : closest)
      }
    }
  }, [detectClosestIsland])

  // Smooth animated navigation to island

  const navigateToIsland = useCallback((islandId: string) => {
    if (typeof window === "undefined") return

    const island = ISLAND_CONFIG.find((i) => i.id === islandId)
    if (!island) return

    const targetX = -(island.x - window.innerWidth / 2 + 200)
    const targetY = -(island.y - window.innerHeight / 2 + 250)
    const clampedTarget = clampPosition(targetX, targetY)

    // Cancel any ongoing momentum
    cancelAnimationFrame(animationFrameRef.current)
    velocityRef.current = { x: 0, y: 0 }

    // Animate smoothly to target
    const startPos = { ...positionRef.current }
    const startTime = performance.now()
    const duration = 800 // ms

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animateToTarget = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      const currentX = startPos.x + (clampedTarget.x - startPos.x) * easedProgress
      const currentY = startPos.y + (clampedTarget.y - startPos.y) * easedProgress

      const currentPos = { x: currentX, y: currentY }
      positionRef.current = currentPos
      updateMapTransform(currentX, currentY)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateToTarget)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animateToTarget)
    setCurrentIsland(islandId)
  }, [clampPosition, updateMapTransform, updateActiveIslandThrottled])


  useEffect(() => {
    // Delay initial navigation to ensure mapRef is mounted
    const timeout = setTimeout(() => {
      navigateToIsland("experience")
    }, 100)
    return () => clearTimeout(timeout)
  }, [navigateToIsland])


  // Momentum animation loop
  const runMomentum = useCallback(() => {
    const vel = velocityRef.current
    if (Math.abs(vel.x) < 0.5 && Math.abs(vel.y) < 0.5) {
      return
    }

    vel.x *= 0.92
    vel.y *= 0.92

    const newPos = clampPosition(
      positionRef.current.x + vel.x,
      positionRef.current.y + vel.y
    )
    positionRef.current = newPos
    updateMapTransform(newPos.x, newPos.y)
    updateActiveIslandThrottled(newPos)

    animationFrameRef.current = requestAnimationFrame(runMomentum)
  }, [clampPosition, updateMapTransform, updateActiveIslandThrottled])

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, textarea, iframe")) return

    cancelAnimationFrame(animationFrameRef.current)
    isDraggingRef.current = true
    velocityRef.current = { x: 0, y: 0 }
    dragStartRef.current = { x: e.clientX - positionRef.current.x, y: e.clientY - positionRef.current.y }
    lastPositionRef.current = { x: e.clientX, y: e.clientY }
    lastTimeRef.current = Date.now()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return

    const newX = e.clientX - dragStartRef.current.x
    const newY = e.clientY - dragStartRef.current.y

    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = {
        x: (e.clientX - lastPositionRef.current.x) * (16 / dt),
        y: (e.clientY - lastPositionRef.current.y) * (16 / dt),
      }
    }
    lastPositionRef.current = { x: e.clientX, y: e.clientY }
    lastTimeRef.current = now

    const clampedPos = clampPosition(newX, newY)
    positionRef.current = clampedPos
    updateMapTransform(clampedPos.x, clampedPos.y)
    updateActiveIslandThrottled(clampedPos)
  }

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    // Start momentum
    if (Math.abs(velocityRef.current.x) > 0.5 || Math.abs(velocityRef.current.y) > 0.5) {
      animationFrameRef.current = requestAnimationFrame(runMomentum)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, textarea, iframe")) return

    cancelAnimationFrame(animationFrameRef.current)
    isDraggingRef.current = true
    velocityRef.current = { x: 0, y: 0 }
    dragStartRef.current = {
      x: e.touches[0].clientX - positionRef.current.x,
      y: e.touches[0].clientY - positionRef.current.y,
    }
    lastPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    lastTimeRef.current = Date.now()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return

    const newX = e.touches[0].clientX - dragStartRef.current.x
    const newY = e.touches[0].clientY - dragStartRef.current.y

    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = {
        x: (e.touches[0].clientX - lastPositionRef.current.x) * (16 / dt),
        y: (e.touches[0].clientY - lastPositionRef.current.y) * (16 / dt),
      }
    }
    lastPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    lastTimeRef.current = now

    const clampedPos = clampPosition(newX, newY)
    positionRef.current = clampedPos
    updateMapTransform(clampedPos.x, clampedPos.y)
    updateActiveIslandThrottled(clampedPos)
  }

  // Sync positionRef when viewportPosition changes (e.g., from navigation)
  // Note: viewportPosition state is removed, so this effect is no longer needed.
  // Instead, we rely on positionRef and MotionValues.

  return (
    <div
      className="h-screen w-screen overflow-hidden cursor-cat"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      style={{ touchAction: "none" }}
    >
      <OceanBackground />

      <div className="fixed top-0 left-0" style={{ zIndex: 50 }}>
        <Logo name={profile?.name || "Portfolio"} />
      </div>

      <div className="fixed top-0 right-0" style={{ zIndex: 50 }}>
        <Minimap
          islands={ISLAND_CONFIG}
          currentIsland={currentIsland}
          viewportX={viewportX}
          viewportY={viewportY}
          mapSize={MAP_SIZE}
          onIslandClick={navigateToIsland}
        />
      </div>

      {/* Map container - uses direct transform for performance */}
      <div
        ref={mapRef}
        className="absolute will-change-transform"
        style={{
          width: MAP_SIZE.width,
          height: MAP_SIZE.height,
          zIndex: 10,
        }}
      >
        {ISLAND_CONFIG.map((island) => (
          <div key={island.id} className="absolute" style={{ left: island.x, top: island.y }}>
            <Island
              id={island.id}
              name={island.name}
              icon={ISLAND_ICONS[island.type]}
              color={ISLAND_COLORS[island.type]}
              x={island.x}
              y={island.y}
              isActive={currentIsland === island.id}
              onClick={() => navigateToIsland(island.id)}
            >
              {island.type === "experience" && <ExperienceIslandContent experiences={experiences} />}
              {island.type === "projects" && <ProjectsIslandContent projects={projects} />}
              {island.type === "blog" && <BlogIslandContent posts={blogPosts} />}
              {island.type === "about" && <AboutIslandContent profile={profile} />}
              {island.type === "videos" && <VideosIslandContent videos={videos} />}
              {island.type === "contact" && <ContactIslandContent profile={profile} socialLinks={socialLinks} />}
            </Island>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0" style={{ zIndex: 50 }}>
        <BottomNavigation islands={ISLAND_CONFIG} currentIsland={currentIsland} onNavigate={navigateToIsland} />
      </div>

      <motion.div
        className="fixed bottom-28 left-1/2 -translate-x-1/2 text-white/50 text-sm pointer-events-none"
        style={{ zIndex: 40 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        Drag to explore or use navigation below
      </motion.div>
    </div >
  )
}

