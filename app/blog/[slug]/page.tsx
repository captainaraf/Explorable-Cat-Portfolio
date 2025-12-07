import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { MarkdownPreview } from "@/components/markdown-preview"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

  if (!post) {
    notFound()
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #1a5276 0%, #0d2137 100%)",
      }}
    >
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {post.cover_image && (
          <img
            src={post.cover_image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
          />
        )}

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70">
            {post.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <div className="flex gap-2">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="bg-white/10 px-2 py-0.5 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="bg-card/95 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-xl">
          <MarkdownPreview content={post.content} />
        </div>

        {/* Cat decoration */}
        <div className="flex justify-center mt-12">
          <svg width="60" height="50" viewBox="0 0 60 50" className="text-white/20">
            <ellipse cx="30" cy="35" rx="20" ry="12" fill="currentColor" />
            <circle cx="30" cy="20" r="12" fill="currentColor" />
            <path d="M20 14 L17 4 L25 12 Z" fill="currentColor" />
            <path d="M40 14 L43 4 L35 12 Z" fill="currentColor" />
            <circle cx="25" cy="18" r="2" fill="#333" />
            <circle cx="35" cy="18" r="2" fill="#333" />
            <ellipse cx="30" cy="23" rx="2" ry="1" fill="#FFB6C1" />
          </svg>
        </div>
      </article>
    </div>
  )
}
