"use client"

import { motion } from "framer-motion"
import type { YouTubeVideo } from "@/lib/types"

interface VideosIslandProps {
  videos: YouTubeVideo[]
}

function getYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export function VideosIslandContent({ videos }: VideosIslandProps) {
  if (!videos.length) {
    return <p className="text-white/70 text-sm">No videos yet.</p>
  }

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 hide-scrollbar">
      {videos.map((video, index) => {
        const videoId = getYouTubeId(video.video_url)
        return (
          <motion.div
            key={video.id}
            className="bg-white/10 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {videoId && (
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
            <div className="p-3">
              <h4 className="font-medium text-white text-sm">{video.title}</h4>
              {video.description && <p className="text-white/70 text-xs mt-1">{video.description}</p>}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
