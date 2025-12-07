import { ClientHome } from "@/components/client-home"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from("profiles").select("*").limit(1).single()

  return <ClientHome profile={profile} />
}
