"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, MailOpen, Trash2 } from "lucide-react"
import type { ContactMessage } from "@/lib/types"

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMessages = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
    if (data) setMessages(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markAsRead = async (id: string) => {
    const supabase = createClient()
    await supabase.from("contact_messages").update({ read: true }).eq("id", id)
    fetchMessages()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return
    const supabase = createClient()
    await supabase.from("contact_messages").delete().eq("id", id)
    fetchMessages()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

      <div className="space-y-4">
        {messages.map((msg) => (
          <Card key={msg.id} className={msg.read ? "opacity-70" : "border-primary"}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-start gap-3">
                {msg.read ? (
                  <MailOpen className="w-5 h-5 text-muted-foreground mt-1" />
                ) : (
                  <Mail className="w-5 h-5 text-primary mt-1" />
                )}
                <div>
                  <CardTitle className="text-lg">{msg.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{msg.email}</p>
                  {msg.subject && <p className="text-sm font-medium mt-1">{msg.subject}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</span>
                {!msg.read && (
                  <Button variant="outline" size="sm" onClick={() => markAsRead(msg.id)}>
                    Mark Read
                  </Button>
                )}
                <Button variant="destructive" size="icon" onClick={() => handleDelete(msg.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
            </CardContent>
          </Card>
        ))}
        {messages.length === 0 && <p className="text-center text-muted-foreground py-8">No messages yet.</p>}
      </div>
    </div>
  )
}
