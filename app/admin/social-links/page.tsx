"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import type { SocialLink } from "@/lib/types"

export default function SocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingLink, setEditingLink] = useState<Partial<SocialLink> | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const fetchLinks = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("social_links").select("*").order("order_index")
    if (data) setLinks(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleSave = async () => {
    if (!editingLink) return
    setIsSaving(true)
    const supabase = createClient()

    try {
      if (editingLink.id) {
        await supabase.from("social_links").update(editingLink).eq("id", editingLink.id)
      } else {
        await supabase.from("social_links").insert([
          {
            ...editingLink,
            order_index: links.length,
          },
        ])
      }
      setIsDialogOpen(false)
      setEditingLink(null)
      fetchLinks()
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return
    const supabase = createClient()
    await supabase.from("social_links").delete().eq("id", id)
    fetchLinks()
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
        <h1 className="text-3xl font-bold">Social Links</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingLink({})}>
              <Plus className="w-4 h-4 mr-2" /> Add Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLink?.id ? "Edit" : "Add"} Social Link</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Platform</Label>
                <Input
                  value={editingLink?.platform || ""}
                  onChange={(e) => setEditingLink({ ...editingLink, platform: e.target.value })}
                  placeholder="GitHub, LinkedIn, Twitter, etc."
                />
              </div>
              <div className="grid gap-2">
                <Label>URL</Label>
                <Input
                  value={editingLink?.url || ""}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="grid gap-2">
                <Label>Icon (github, linkedin, twitter)</Label>
                <Input
                  value={editingLink?.icon || ""}
                  onChange={(e) => setEditingLink({ ...editingLink, icon: e.target.value })}
                  placeholder="github"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Card key={link.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{link.platform}</CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setEditingLink(link)
                    setIsDialogOpen(true)
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(link.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline truncate block"
              >
                {link.url}
              </a>
            </CardContent>
          </Card>
        ))}
        {links.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">
            No social links yet. Add your first one!
          </p>
        )}
      </div>
    </div>
  )
}
