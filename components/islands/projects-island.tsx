"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/lib/types"

interface ProjectsIslandProps {
  projects: Project[]
}

export function ProjectsIslandContent({ projects }: ProjectsIslandProps) {
  return (
    <div className="space-y-4">
      <Link
        href="/projects"
        className="flex items-center justify-center gap-2 bg-teal-500/90 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        <span>All Projects</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

      {!projects.length ? (
        <p className="text-white/70 text-sm text-center">No projects yet.</p>
      ) : (
        <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 hide-scrollbar">
          {projects.slice(0, 2).map((project, index) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <motion.div
                className="bg-white/10 rounded-lg overflow-hidden cursor-pointer hover:bg-white/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {project.image_url && (
                  <img
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-28 object-cover"
                  />
                )}
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white text-sm">{project.title}</h4>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-white/80 text-xs mb-2 line-clamp-2">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
