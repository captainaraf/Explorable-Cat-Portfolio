"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Project } from "@/lib/types"
import { useEffect } from "react"
import { use } from "react"

interface ProjectDetailPageProps {
    params: Promise<{ id: string }>
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { id } = use(params)
    const [project, setProject] = useState<Project | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    useEffect(() => {
        async function fetchProject() {
            const supabase = createClient()
            const { data } = await supabase.from("projects").select("*").eq("id", id).single()
            if (data) setProject(data)
            setIsLoading(false)
        }
        fetchProject()
    }, [id])

    // Get all images (cover + gallery)
    const allImages = project
        ? [project.image_url, ...(project.images || [])].filter((img): img is string => !!img)
        : []

    const navigateImage = (direction: "prev" | "next") => {
        if (selectedImage === null) return
        if (direction === "prev") {
            setSelectedImage(selectedImage > 0 ? selectedImage - 1 : allImages.length - 1)
        } else {
            setSelectedImage(selectedImage < allImages.length - 1 ? selectedImage + 1 : 0)
        }
    }

    if (isLoading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: "linear-gradient(180deg, #1a5276 0%, #0d2137 100%)" }}
            >
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
            </div>
        )
    }

    if (!project) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center"
                style={{ background: "linear-gradient(180deg, #1a5276 0%, #0d2137 100%)" }}
            >
                <p className="text-white/70 text-xl mb-4">Project not found</p>
                <Link href="/projects" className="text-teal-400 hover:text-teal-300 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Projects
                </Link>
            </div>
        )
    }

    return (
        <div
            className="min-h-screen"
            style={{ background: "linear-gradient(180deg, #1a5276 0%, #0d2137 100%)" }}
        >
            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/projects" className="text-white/70 hover:text-white transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-white">{project.title}</h1>
                        {project.description && <p className="text-white/60 mt-1">{project.description}</p>}
                    </div>
                    <div className="flex gap-3">
                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                Source
                            </a>
                        )}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Cover Image */}
                        {project.image_url && (
                            <motion.img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-80 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setSelectedImage(0)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            />
                        )}

                        {/* Image Gallery */}
                        {project.images && project.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {project.images.map((img, index) => (
                                    <motion.img
                                        key={index}
                                        src={img}
                                        alt={`${project.title} screenshot ${index + 1}`}
                                        className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => setSelectedImage(index + 1)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Long Description */}
                        {project.long_description && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h2 className="text-xl font-semibold text-white mb-4">About This Project</h2>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
                                        {project.long_description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-4">Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Project Info */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Project Info</h3>
                            <div className="space-y-3 text-sm">
                                {project.featured && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-amber-400">★</span>
                                        <span className="text-white/70">Featured Project</span>
                                    </div>
                                )}
                                <div className="text-white/50">
                                    Added {new Date(project.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && allImages.length > 0 && (
                    <motion.div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/70 hover:text-white"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {allImages.length > 1 && (
                            <>
                                <button
                                    className="absolute left-4 text-white/70 hover:text-white p-2"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        navigateImage("prev")
                                    }}
                                >
                                    <ChevronLeft className="w-10 h-10" />
                                </button>
                                <button
                                    className="absolute right-4 text-white/70 hover:text-white p-2"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        navigateImage("next")
                                    }}
                                >
                                    <ChevronRight className="w-10 h-10" />
                                </button>
                            </>
                        )}

                        <motion.img
                            key={selectedImage}
                            src={allImages[selectedImage]}
                            alt="Full size"
                            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-4 text-white/50 text-sm">
                            {selectedImage + 1} / {allImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
