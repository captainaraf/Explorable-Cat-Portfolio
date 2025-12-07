"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { BlogEditor } from "@/components/admin/blog-editor"
import type { BlogPost } from "@/lib/types"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (post: Partial<BlogPost>) => {
    setIsSaving(true)
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase.from("blog_posts").insert([
      {
        ...post,
        author_id: user?.id,
        published_at: post.published ? new Date().toISOString() : null,
      },
    ])

    if (!error) {
      router.push("/admin/blog")
    }
    setIsSaving(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <BlogEditor onSave={handleSave} isSaving={isSaving} />
    </div>
  )
}
