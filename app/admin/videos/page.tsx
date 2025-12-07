"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import type { YouTubeVideo } from "@/lib/types"

export default function VideosPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingVideo, setEditingVideo] = useState<Partial<YouTubeVideo> | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const fetchVideos = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("youtube_videos").select("*").order("order_index")
    if (data) setVideos(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const handleSave = async () => {
    if (!editingVideo) return
    setIsSaving(true)
    const supabase = createClient()

    try {
      if (editingVideo.id) {
        await supabase
          .from("youtube_videos")
          .update({
            ...editingVideo,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingVideo.id)
      } else {
        await supabase.from("youtube_videos").insert([
          {
            ...editingVideo,
            order_index: videos.length,
          },
        ])
      }
      setIsDialogOpen(false)
      setEditingVideo(null)
      fetchVideos()
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return
    const supabase = createClient()
    await supabase.from("youtube_videos").delete().eq("id", id)
    fetchVideos()
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
        <h1 className="text-3xl font-bold">YouTube Videos</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingVideo({})}>
              <Plus className="w-4 h-4 mr-2" /> Add Video
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingVideo?.id ? "Edit" : "Add"} Video</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={editingVideo?.title || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>YouTube URL</Label>
                <Input
                  value={editingVideo?.video_url || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={editingVideo?.description || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  rows={3}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <CardTitle className="text-lg">{video.title}</CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setEditingVideo(video)
                    setIsDialogOpen(true)
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(video.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground truncate">{video.video_url}</p>
              {video.description && <p className="text-sm mt-2">{video.description}</p>}
            </CardContent>
          </Card>
        ))}
        {videos.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">No videos yet. Add your first one!</p>
        )}
      </div>
    </div>
  )
}
