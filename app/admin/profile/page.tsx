"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Loader2, X, Plus } from "lucide-react"
import type { Profile } from "@/lib/types"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Partial<Profile>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [newSkill, setNewSkill] = useState("")

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient()
      const { data } = await supabase.from("profiles").select("*").limit(1).single()
      if (data) setProfile(data)
      setIsLoading(false)
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    const supabase = createClient()

    try {
      // Always fetch the first profile to get its ID
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .limit(1)
        .single()

      if (existingProfile?.id) {
        // Update existing profile
        const { error } = await supabase
          .from("profiles")
          .update({ ...profile, id: existingProfile.id, updated_at: new Date().toISOString() })
          .eq("id", existingProfile.id)
        if (error) throw error
        // Update local state with the correct ID
        setProfile({ ...profile, id: existingProfile.id })
      } else {
        // Insert new profile (only if none exists)
        const { data, error } = await supabase
          .from("profiles")
          .insert([profile])
          .select()
          .single()
        if (error) throw error
        if (data) setProfile(data)
      }
      setMessage({ type: "success", text: "Profile saved successfully!" })
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error)
      console.error("Save error:", error)
      setMessage({ type: "error", text: `Failed to save profile: ${errMsg}` })
    } finally {
      setIsSaving(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills?.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...(profile.skills || []), newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills?.filter((s) => s !== skillToRemove) || [],
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 ${message.type === "success" ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"
            }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name || ""}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={profile.title || ""}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                placeholder="e.g., Creative Developer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                value={profile.short_description || ""}
                onChange={(e) => setProfile({ ...profile, short_description: e.target.value })}
                placeholder="A brief tagline"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Full Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio || ""}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell your story..."
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email || ""}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="hello@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location || ""}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience & Skills</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="years_of_experience">Years of Experience</Label>
              <Input
                id="years_of_experience"
                type="number"
                min="0"
                value={profile.years_of_experience || 0}
                onChange={(e) => setProfile({ ...profile, years_of_experience: Number.parseInt(e.target.value) || 0 })}
                placeholder="5"
              />
            </div>
            <div className="grid gap-2">
              <Label>Skills & Technologies</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., React)"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {profile.skills && profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media & Links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="image_url">Profile Image URL</Label>
              <Input
                id="image_url"
                value={profile.image_url || ""}
                onChange={(e) => setProfile({ ...profile, image_url: e.target.value })}
                placeholder="https://..."
              />
              {profile.image_url && (
                <img
                  src={profile.image_url || "/placeholder.svg"}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mt-2"
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resume_url">Resume URL</Label>
              <Input
                id="resume_url"
                value={profile.resume_url || ""}
                onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
