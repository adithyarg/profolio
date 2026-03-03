import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 relative overflow-hidden transition-colors duration-300">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" aria-hidden="true"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 dark:bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true"></div>
                
                <DashboardSidebar user={user} profile={profile} />

                <main className="flex-1 p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full relative z-10">
                    {children}
                </main>
            </div>
        </ThemeProvider>
    )
}
