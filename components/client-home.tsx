"use client"

import { useState, useCallback, useRef } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { HeroSection } from "@/components/hero-section"
import type { Profile } from "@/lib/types"

interface ClientHomeProps {
    profile: Profile | null
}

export function ClientHome({ profile }: ClientHomeProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [showHero, setShowHero] = useState(false)
    const hasCompletedRef = useRef(false)

    const handleLoadingComplete = useCallback(() => {
        if (hasCompletedRef.current) return
        hasCompletedRef.current = true
        setIsLoading(false)
        setShowHero(true)
    }, [])

    return (
        <main className="min-h-screen">
            {isLoading && <LoadingScreen name={profile?.name || "Fardin Khan"} onComplete={handleLoadingComplete} />}
            {showHero && <HeroSection profile={profile} />}
        </main>
    )
}
