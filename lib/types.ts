export interface Profile {
  id: string
  name: string
  title: string | null
  bio: string | null
  short_description: string | null
  image_url: string | null
  resume_url: string | null
  email: string | null
  phone: string | null
  location: string | null
  years_of_experience: number | null
  skills: string[] | null
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  company: string
  position: string
  description: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  technologies: string[] | null
  order_index: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string | null
  long_description: string | null
  image_url: string | null
  images: string[] | null
  live_url: string | null
  github_url: string | null
  technologies: string[] | null
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  published: boolean
  published_at: string | null
  author_id: string | null
  tags: string[] | null
  created_at: string
  updated_at: string
}

export interface YouTubeVideo {
  id: string
  title: string
  video_url: string
  description: string | null
  order_index: number
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  created_at: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string | null
  order_index: number
  created_at: string
}

export interface Island {
  id: string
  name: string
  x: number
  y: number
  type: "experience" | "projects" | "blog" | "about" | "contact" | "videos"
}
