"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/types"

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPosts = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })
    if (data) setPosts(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const togglePublish = async (post: BlogPost) => {
    const supabase = createClient()
    await supabase
      .from("blog_posts")
      .update({
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id)
    fetchPosts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    const supabase = createClient()
    await supabase.from("blog_posts").delete().eq("id", id)
    fetchPosts()
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
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  {post.published ? (
                    <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded">Published</span>
                  ) : (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Draft</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">/blog/{post.slug}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => togglePublish(post)}
                  title={post.published ? "Unpublish" : "Publish"}
                >
                  {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Link href={`/admin/blog/${post.id}`}>
                  <Button variant="outline" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {post.excerpt && <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-muted px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                {post.published_at && <span>Published: {new Date(post.published_at).toLocaleDateString()}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts yet.</p>
            <Link href="/admin/blog/new">
              <Button>Create Your First Post</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
