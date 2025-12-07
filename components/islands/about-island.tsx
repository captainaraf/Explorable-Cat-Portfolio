"use client"

import { motion } from "framer-motion"
import type { Profile } from "@/lib/types"
import { Award, Code, Calendar } from "lucide-react"

interface AboutIslandProps {
  profile: Profile | null
}

export function AboutIslandContent({ profile }: AboutIslandProps) {
  return (
    <div className="space-y-4">
      {profile?.image_url && (
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img
            src={profile.image_url || "/placeholder.svg"}
            alt={profile.name}
            className="w-20 h-20 rounded-full border-4 border-white/30 object-cover"
          />
        </motion.div>
      )}

      <div className="text-center">
        <h4 className="text-lg font-bold text-white">{profile?.name || "Your Name"}</h4>
        <p className="text-white/70 text-sm">{profile?.title || "Creative Developer"}</p>
      </div>

      {/* Years of Experience */}
      {profile?.years_of_experience && (
        <motion.div
          className="flex items-center justify-center gap-2 py-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-white font-bold text-lg">{profile.years_of_experience}+</span>
            <span className="text-white/70 text-sm">Years Experience</span>
          </div>
        </motion.div>
      )}

      {profile?.bio && <p className="text-white/80 text-sm leading-relaxed text-center">{profile.bio}</p>}

      {/* Skills Section */}
      {profile?.skills && profile.skills.length > 0 && (
        <div className="pt-3 border-t border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-4 h-4 text-accent" />
            <h5 className="text-white font-semibold text-sm">Skills & Technologies</h5>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1 text-xs bg-white/20 text-white rounded-full border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Achievement cat */}
      <motion.div
        className="flex justify-center pt-2"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <svg width="50" height="40" viewBox="0 0 50 40">
          <ellipse cx="25" cy="30" rx="15" ry="8" fill="#F4A460" />
          <circle cx="32" cy="20" r="10" fill="#F4A460" />
          <path d="M25 13 L22 5 L28 11 Z" fill="#F4A460" />
          <path d="M39 13 L42 5 L36 11 Z" fill="#F4A460" />
          <circle cx="29" cy="18" r="1.5" fill="#333" />
          <circle cx="35" cy="18" r="1.5" fill="#333" />
          <ellipse cx="32" cy="22" rx="2" ry="1" fill="#FFB6C1" />
          {/* Crown/medal */}
          <g transform="translate(27, 3)">
            <path d="M5 8 L0 2 L3 5 L5 0 L7 5 L10 2 L5 8" fill="#FFD700" />
          </g>
        </svg>
      </motion.div>

      {profile?.resume_url && (
        <motion.a
          href={profile.resume_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Award className="w-4 h-4" />
          Download Resume
        </motion.a>
      )}
    </div>
  )
}
