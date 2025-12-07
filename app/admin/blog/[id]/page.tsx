"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { BlogEditor } from "@/components/admin/blog-editor"
import { Loader2 } from "lucide-react"
import type { BlogPost } from "@/lib/types"

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient()
      const { data } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()
      if (data) setPost(data)
      setIsLoading(false)
    }
    fetchPost()
  }, [params.id])

  const handleSave = async (updatedPost: Partial<BlogPost>) => {
    setIsSaving(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("blog_posts")
      .update({
        ...updatedPost,
        updated_at: new Date().toISOString(),
        published_at: updatedPost.published && !post?.published_at ? new Date().toISOString() : post?.published_at,
      })
      .eq("id", params.id)

    if (!error) {
      router.push("/admin/blog")
    }
    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <BlogEditor post={post} onSave={handleSave} isSaving={isSaving} />
    </div>
  )
}
