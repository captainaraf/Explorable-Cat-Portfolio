"use client"

import { motion } from "framer-motion"
import type { Experience } from "@/lib/types"

interface ExperienceIslandProps {
  experiences: Experience[]
}

export function ExperienceIslandContent({ experiences }: ExperienceIslandProps) {
  if (!experiences.length) {
    return <p className="text-white/70 text-sm">No experiences yet.</p>
  }

  return (
    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 hide-scrollbar">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          className="bg-white/10 rounded-lg p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-white">{exp.position}</h4>
              <p className="text-white/70 text-sm">{exp.company}</p>
            </div>
            <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">
              {new Date(exp.start_date).getFullYear()} -{" "}
              {exp.is_current ? "Present" : exp.end_date ? new Date(exp.end_date).getFullYear() : ""}
            </span>
          </div>
          {exp.description && <p className="text-white/80 text-sm mb-2">{exp.description}</p>}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {exp.technologies.map((tech) => (
                <span key={tech} className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
