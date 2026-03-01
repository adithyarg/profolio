import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", user.id)
        .single()

    return (
        <div className="flex min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-indigo-500/30">
            {/* Sidebar extracted to client component for active states ideally, but we can do it simply here or as a Server Component if Next.js handles it. Let's keep it clean. */}
            <DashboardSidebar user={user} profile={profile} />

            <main className="flex-1 p-6 md:p-12 lg:p-16 max-w-6xl mx-auto w-full">
                {children}
            </main>
        </div>
    )
}
