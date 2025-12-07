"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/types"

interface BlogIslandProps {
  posts: BlogPost[]
}

export function BlogIslandContent({ posts }: BlogIslandProps) {
  return (
    <div className="space-y-3">
      <Link
        href="/blog"
        className="flex items-center justify-center gap-2 bg-amber-500/90 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-2"
      >
        <span>All Blog Posts</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

      {!posts.length ? (
        <p className="text-white/70 text-sm text-center">No blog posts yet.</p>
      ) : (
        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 hide-scrollbar">
          {posts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors"
              >
                <div className="flex gap-3">
                  {post.cover_image && (
                    <img
                      src={post.cover_image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm mb-1">{post.title}</h4>
                    {post.excerpt && <p className="text-white/70 text-xs line-clamp-2">{post.excerpt}</p>}
                    <div className="flex items-center gap-2 mt-2">
                      {post.tags &&
                        post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      {post.published_at && (
                        <span className="text-xs text-white/50">
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
