"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe } from "lucide-react"
import type { Profile, SocialLink } from "@/lib/types"

interface ContactIslandProps {
  profile: Profile | null
  socialLinks: SocialLink[]
}

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  default: <Globe className="w-5 h-5" />,
}

export function ContactIslandContent({ profile, socialLinks }: ContactIslandProps) {
  return (
    <div className="space-y-4">
      {/* Cat greeting */}
      <div className="flex justify-center mb-2">
        <motion.svg
          width="60"
          height="50"
          viewBox="0 0 60 50"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ellipse cx="30" cy="35" rx="18" ry="12" fill="#F4A460" />
          <circle cx="38" cy="22" r="12" fill="#F4A460" />
          <path d="M30 14 L26 4 L34 12 Z" fill="#F4A460" />
          <path d="M46 14 L50 4 L42 12 Z" fill="#F4A460" />
          <circle cx="34" cy="20" r="2" fill="#333" />
          <circle cx="42" cy="20" r="2" fill="#333" />
          <ellipse cx="38" cy="25" rx="2" ry="1.5" fill="#FFB6C1" />
          {/* Waving paw */}
          <motion.g
            animate={{ rotate: [-20, 20, -20] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            style={{ transformOrigin: "15px 35px" }}
          >
            <ellipse cx="12" cy="32" rx="6" ry="8" fill="#F4A460" />
          </motion.g>
        </motion.svg>
      </div>

      <p className="text-center text-white/80 text-sm">Let&apos;s connect! Reach out through any of these channels.</p>

      {/* Contact Details */}
      <div className="space-y-3 mt-4">
        {profile?.email && (
          <motion.a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
            whileHover={{ x: 5 }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Email</p>
              <p className="text-white font-medium text-sm">{profile.email}</p>
            </div>
          </motion.a>
        )}

        {profile?.phone && (
          <motion.a
            href={`tel:${profile.phone}`}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
            whileHover={{ x: 5 }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Phone</p>
              <p className="text-white font-medium text-sm">{profile.phone}</p>
            </div>
          </motion.a>
        )}

        {profile?.location && (
          <motion.div className="flex items-center gap-3 p-3 rounded-lg bg-white/10" whileHover={{ x: 5 }}>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white/60 text-xs">Location</p>
              <p className="text-white font-medium text-sm">{profile.location}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="pt-4 border-t border-white/20">
          <p className="text-white/60 text-xs mb-3 text-center">Find me on</p>
          <div className="flex justify-center gap-3">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {socialIcons[link.icon?.toLowerCase() || "default"] || socialIcons.default}
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Decorative fish */}
      <motion.div
        className="absolute -bottom-2 -right-2 opacity-50"
        animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <svg width="30" height="20" viewBox="0 0 30 20">
          <ellipse cx="15" cy="10" rx="12" ry="7" fill="#FFD700" />
          <path d="M27 10 L35 3 L35 17 Z" fill="#FFD700" />
          <circle cx="8" cy="8" r="2" fill="#333" />
        </svg>
      </motion.div>
    </div>
  )
}
