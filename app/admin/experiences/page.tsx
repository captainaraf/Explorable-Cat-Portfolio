"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import type { Experience } from "@/lib/types"

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const fetchExperiences = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("experiences").select("*").order("order_index")
    if (data) setExperiences(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  const handleSave = async () => {
    if (!editingExp) return
    setIsSaving(true)
    const supabase = createClient()

    try {
      if (editingExp.id) {
        await supabase
          .from("experiences")
          .update({
            ...editingExp,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingExp.id)
      } else {
        await supabase.from("experiences").insert([
          {
            ...editingExp,
            order_index: experiences.length,
          },
        ])
      }
      setIsDialogOpen(false)
      setEditingExp(null)
      fetchExperiences()
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return
    const supabase = createClient()
    await supabase.from("experiences").delete().eq("id", id)
    fetchExperiences()
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
        <h1 className="text-3xl font-bold">Experiences</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingExp({})}>
              <Plus className="w-4 h-4 mr-2" /> Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingExp?.id ? "Edit" : "Add"} Experience</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Company</Label>
                  <Input
                    value={editingExp?.company || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Position</Label>
                  <Input
                    value={editingExp?.position || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={editingExp?.description || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={editingExp?.start_date || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={editingExp?.end_date || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
                    disabled={editingExp?.is_current}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingExp?.is_current || false}
                  onCheckedChange={(checked) =>
                    setEditingExp({
                      ...editingExp,
                      is_current: checked,
                      end_date: checked ? undefined : editingExp?.end_date,
                    })
                  }
                />
                <Label>Currently working here</Label>
              </div>
              <div className="grid gap-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  defaultValue={editingExp?.technologies?.join(", ") || ""}
                  onBlur={(e) =>
                    setEditingExp({
                      ...editingExp,
                      technologies: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{exp.position}</CardTitle>
                <p className="text-muted-foreground">{exp.company}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setEditingExp(exp)
                    setIsDialogOpen(true)
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(exp.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(exp.start_date).toLocaleDateString()} -{" "}
                {exp.is_current ? "Present" : exp.end_date ? new Date(exp.end_date).toLocaleDateString() : ""}
              </p>
              {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
              {exp.technologies && (
                <div className="flex flex-wrap gap-1">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-muted px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {experiences.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No experiences yet. Add your first one!</p>
        )}
      </div>
    </div>
  )
}
