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
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/types"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProj, setEditingProj] = useState<Partial<Project> | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const fetchProjects = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("projects").select("*").order("order_index")
    if (data) setProjects(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleSave = async () => {
    if (!editingProj) return
    setIsSaving(true)
    const supabase = createClient()

    try {
      if (editingProj.id) {
        await supabase
          .from("projects")
          .update({
            ...editingProj,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingProj.id)
      } else {
        await supabase.from("projects").insert([
          {
            ...editingProj,
            order_index: projects.length,
          },
        ])
      }
      setIsDialogOpen(false)
      setEditingProj(null)
      fetchProjects()
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    const supabase = createClient()
    await supabase.from("projects").delete().eq("id", id)
    fetchProjects()
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
        <h1 className="text-3xl font-bold">Projects</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProj({})}>
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProj?.id ? "Edit" : "Add"} Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={editingProj?.title || ""}
                  onChange={(e) => setEditingProj({ ...editingProj, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Short Description</Label>
                <Input
                  value={editingProj?.description || ""}
                  onChange={(e) => setEditingProj({ ...editingProj, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Long Description</Label>
                <Textarea
                  value={editingProj?.long_description || ""}
                  onChange={(e) => setEditingProj({ ...editingProj, long_description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label>Cover Image URL</Label>
                <Input
                  value={editingProj?.image_url || ""}
                  onChange={(e) => setEditingProj({ ...editingProj, image_url: e.target.value })}
                  placeholder="Main project image"
                />
                {editingProj?.image_url && (
                  <img src={editingProj.image_url} alt="Cover preview" className="w-full h-32 object-cover rounded-lg" />
                )}
              </div>
              <div className="grid gap-2">
                <Label>Gallery Images</Label>
                <div className="space-y-2">
                  {(editingProj?.images || []).map((img, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={img}
                        onChange={(e) => {
                          const newImages = [...(editingProj?.images || [])]
                          newImages[index] = e.target.value
                          setEditingProj({ ...editingProj, images: newImages })
                        }}
                        placeholder={`Image ${index + 1} URL`}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newImages = (editingProj?.images || []).filter((_, i) => i !== index)
                          setEditingProj({ ...editingProj, images: newImages })
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingProj({
                        ...editingProj,
                        images: [...(editingProj?.images || []), ""],
                      })
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Image
                  </Button>
                </div>
                {editingProj?.images && editingProj.images.length > 0 && editingProj.images.some(img => img) && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {editingProj.images.filter(img => img).map((img, i) => (
                      <img key={i} src={img} alt={`Preview ${i + 1}`} className="w-20 h-20 object-cover rounded" />
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Live URL</Label>
                  <Input
                    value={editingProj?.live_url || ""}
                    onChange={(e) => setEditingProj({ ...editingProj, live_url: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>GitHub URL</Label>
                  <Input
                    value={editingProj?.github_url || ""}
                    onChange={(e) => setEditingProj({ ...editingProj, github_url: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={editingProj?.technologies?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingProj({
                      ...editingProj,
                      technologies: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingProj?.featured || false}
                  onCheckedChange={(checked) => setEditingProj({ ...editingProj, featured: checked })}
                />
                <Label>Featured Project</Label>
              </div>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <Card key={proj.id} className="overflow-hidden">
            {proj.image_url && (
              <img src={proj.image_url || "/placeholder.svg"} alt={proj.title} className="w-full h-40 object-cover" />
            )}
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg">{proj.title}</CardTitle>
                {proj.featured && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Featured</span>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setEditingProj(proj)
                    setIsDialogOpen(true)
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(proj.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {proj.description && <p className="text-sm text-muted-foreground mb-2">{proj.description}</p>}
              <div className="flex gap-2">
                {proj.live_url && (
                  <a
                    href={proj.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {proj.github_url && (
                  <a
                    href={proj.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">No projects yet. Add your first one!</p>
        )}
      </div>
    </div>
  )
}
