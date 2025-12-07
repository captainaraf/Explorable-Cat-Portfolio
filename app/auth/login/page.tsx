"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/admin")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(180deg, #1a5276 0%, #0d2137 100%)",
      }}
    >
      {/* Animated cat decoration */}
      <motion.div
        className="fixed bottom-10 left-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <svg width="80" height="100" viewBox="0 0 100 120">
          <ellipse cx="50" cy="90" rx="30" ry="25" fill="#F4A460" />
          <circle cx="50" cy="45" r="25" fill="#F4A460" />
          <path d="M30 30 L22 5 L42 25 Z" fill="#F4A460" />
          <path d="M70 30 L78 5 L58 25 Z" fill="#F4A460" />
          <circle cx="40" cy="42" r="5" fill="#333" />
          <circle cx="60" cy="42" r="5" fill="#333" />
          <circle cx="41" cy="40" r="2" fill="#fff" />
          <circle cx="61" cy="40" r="2" fill="#fff" />
          <ellipse cx="50" cy="52" rx="3" ry="2" fill="#FFB6C1" />
        </svg>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md bg-card/95 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <svg width="60" height="60" viewBox="0 0 32 32" className="text-primary">
                <circle cx="16" cy="18" r="10" fill="currentColor" />
                <path d="M8 12 L6 4 L12 10 Z" fill="currentColor" />
                <path d="M24 12 L26 4 L20 10 Z" fill="currentColor" />
                <circle cx="12" cy="16" r="2" fill="white" />
                <circle cx="20" cy="16" r="2" fill="white" />
                <ellipse cx="16" cy="20" rx="2" ry="1" fill="#FFB6C1" />
              </svg>
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Sign in to manage your portfolio content</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                {error && <p className="text-sm text-destructive bg-destructive/10 p-2 rounded">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
