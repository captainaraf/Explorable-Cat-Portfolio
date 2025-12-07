import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FolderOpen, BookOpen, Youtube, Mail } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [expCount, projCount, blogCount, videoCount, msgCount] = await Promise.all([
    supabase.from("experiences").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("youtube_videos").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
  ])

  const stats = [
    {
      label: "Experiences",
      count: expCount.count || 0,
      icon: Briefcase,
      href: "/admin/experiences",
      color: "bg-blue-500",
    },
    {
      label: "Projects",
      count: projCount.count || 0,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "bg-green-500",
    },
    { label: "Blog Posts", count: blogCount.count || 0, icon: BookOpen, href: "/admin/blog", color: "bg-purple-500" },
    { label: "Videos", count: videoCount.count || 0, icon: Youtube, href: "/admin/videos", color: "bg-red-500" },
    {
      label: "Unread Messages",
      count: msgCount.count || 0,
      icon: Mail,
      href: "/admin/messages",
      color: "bg-orange-500",
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.count}</div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/blog/new"
            className="p-4 bg-primary text-primary-foreground rounded-lg text-center hover:opacity-90 transition-opacity"
          >
            Create New Blog Post
          </Link>
          <Link
            href="/admin/projects"
            className="p-4 bg-secondary text-secondary-foreground rounded-lg text-center hover:opacity-90 transition-opacity"
          >
            Add New Project
          </Link>
          <Link
            href="/admin/profile"
            className="p-4 bg-accent text-accent-foreground rounded-lg text-center hover:opacity-90 transition-opacity"
          >
            Edit Profile
          </Link>
          <Link
            href="/admin/messages"
            className="p-4 bg-muted text-muted-foreground rounded-lg text-center hover:opacity-90 transition-opacity"
          >
            View Messages
          </Link>
        </div>
      </div>
    </div>
  )
}
