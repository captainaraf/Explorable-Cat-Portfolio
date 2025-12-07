import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase.from("projects").select("*").order("order_index", { ascending: true })

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #1a5276 0%, #0d2137 100%)",
      }}
    >
      {/* Decorative cat header */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <svg className="absolute top-4 right-8 w-16 h-16 text-white/10" viewBox="0 0 60 50">
          <ellipse cx="30" cy="35" rx="20" ry="12" fill="currentColor" />
          <circle cx="30" cy="20" r="12" fill="currentColor" />
          <path d="M20 14 L17 4 L25 12 Z" fill="currentColor" />
          <path d="M40 14 L43 4 L35 12 Z" fill="currentColor" />
        </svg>
        <svg className="absolute top-8 left-12 w-12 h-12 text-white/5" viewBox="0 0 60 50">
          <ellipse cx="30" cy="35" rx="20" ry="12" fill="currentColor" />
          <circle cx="30" cy="20" r="12" fill="currentColor" />
          <path d="M20 14 L17 4 L25 12 Z" fill="currentColor" />
          <path d="M40 14 L43 4 L35 12 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-6 py-12 relative">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/portfolio" className="text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              My Projects
              {/* Cat paw icon */}
              <svg width="32" height="32" viewBox="0 0 40 40" className="text-teal-400">
                <ellipse cx="20" cy="28" rx="10" ry="8" fill="currentColor" />
                <circle cx="10" cy="16" r="5" fill="currentColor" />
                <circle cx="20" cy="12" r="5" fill="currentColor" />
                <circle cx="30" cy="16" r="5" fill="currentColor" />
                <circle cx="14" cy="22" r="4" fill="currentColor" />
                <circle cx="26" cy="22" r="4" fill="currentColor" />
              </svg>
            </h1>
            <p className="text-white/60 mt-1">A collection of my work and experiments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <article
                className="group bg-card/90 backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-white/10 cursor-pointer h-full"
              >
                <div className="relative">
                  {project.image_url ? (
                    <img
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-teal-500/30 to-blue-500/30 flex items-center justify-center">
                      <svg width="60" height="50" viewBox="0 0 60 50" className="text-white/20">
                        <ellipse cx="30" cy="35" rx="20" ry="12" fill="currentColor" />
                        <circle cx="30" cy="20" r="12" fill="currentColor" />
                        <path d="M20 14 L17 4 L25 12 Z" fill="currentColor" />
                        <path d="M40 14 L43 4 L35 12 Z" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                  {project.featured && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-card-foreground">{project.title}</h2>
                    <div className="flex gap-2">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-teal-400 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-teal-400 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <span key={tech} className="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {(!projects || projects.length === 0) && (
          <div className="text-center py-16">
            <svg width="80" height="70" viewBox="0 0 60 50" className="mx-auto mb-4 text-white/30">
              <ellipse cx="30" cy="35" rx="20" ry="12" fill="currentColor" />
              <circle cx="30" cy="20" r="12" fill="currentColor" />
              <path d="M20 14 L17 4 L25 12 Z" fill="currentColor" />
              <path d="M40 14 L43 4 L35 12 Z" fill="currentColor" />
              <circle cx="25" cy="18" r="2" fill="#333" />
              <circle cx="35" cy="18" r="2" fill="#333" />
              <path d="M26 24 Q30 21 34 24" fill="none" stroke="#333" strokeWidth="1.5" />
            </svg>
            <p className="text-white/70 text-lg">No projects yet. Check back soon!</p>
          </div>
        )}

        {/* Bottom cat decoration */}
        <div className="flex justify-center mt-16 gap-8">
          <svg width="40" height="35" viewBox="0 0 60 50" className="text-white/10">
            <ellipse cx="30" cy="35" rx="20" ry="12" fill="currentColor" />
            <circle cx="30" cy="20" r="12" fill="currentColor" />
            <path d="M20 14 L17 4 L25 12 Z" fill="currentColor" />
            <path d="M40 14 L43 4 L35 12 Z" fill="currentColor" />
          </svg>
          <svg width="40" height="35" viewBox="0 0 60 50" className="text-white/10">
            <ellipse cx="30" cy="35" rx="20" ry="12" fill="currentColor" />
            <circle cx="30" cy="20" r="12" fill="currentColor" />
            <path d="M20 14 L17 4 L25 12 Z" fill="currentColor" />
            <path d="M40 14 L43 4 L35 12 Z" fill="currentColor" />
          </svg>
          <svg width="40" height="35" viewBox="0 0 60 50" className="text-white/10">
            <ellipse cx="30" cy="35" rx="20" ry="12" fill="currentColor" />
            <circle cx="30" cy="20" r="12" fill="currentColor" />
            <path d="M20 14 L17 4 L25 12 Z" fill="currentColor" />
            <path d="M40 14 L43 4 L35 12 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  )
}
