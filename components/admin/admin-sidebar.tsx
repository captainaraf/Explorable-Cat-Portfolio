"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderOpen,
  BookOpen,
  Youtube,
  Mail,
  LinkIcon,
  LogOut,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/experiences", label: "Experiences", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/videos", label: "Videos", icon: Youtube },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/social-links", label: "Social Links", icon: LinkIcon },
]

interface AdminSidebarProps {
  userEmail: string
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" className="text-primary">
            <circle cx="16" cy="18" r="10" fill="currentColor" />
            <path d="M8 12 L6 4 L12 10 Z" fill="currentColor" />
            <path d="M24 12 L26 4 L20 10 Z" fill="currentColor" />
            <circle cx="12" cy="16" r="2" fill="white" />
            <circle cx="20" cy="16" r="2" fill="white" />
            <ellipse cx="16" cy="20" rx="2" ry="1" fill="#FFB6C1" />
          </svg>
          <span className="font-bold text-lg">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>View Site</span>
        </Link>
        <div className="px-4 py-2 text-sm text-muted-foreground truncate">{userEmail}</div>
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
