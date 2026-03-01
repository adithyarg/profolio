import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
    User,
    FolderGit2,
    Briefcase,
    Award,
    GraduationCap,
    Blocks,
    LogOut,
    Eye
} from "lucide-react"

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
        .select("username")
        .eq("id", user.id)
        .single()

    const navItems = [
        { name: "Profile", href: "/dashboard", icon: User },
        { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
        { name: "Experience", href: "/dashboard/experience", icon: Briefcase },
        { name: "Certificates", href: "/dashboard/certificates", icon: Award },
        { name: "Awards", href: "/dashboard/awards", icon: GraduationCap },
        { name: "Skills", href: "/dashboard/skills", icon: Blocks },
    ]

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <aside className="w-full md:w-64 border-r bg-muted/40 p-4 flex flex-col justify-between">
                <div>
                    <div className="mb-8 px-4">
                        <h2 className="text-xl font-bold tracking-tight">Profolio</h2>
                        <p className="text-sm text-muted-foreground">Dashboard</p>
                    </div>
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="space-y-1 mt-auto pt-6 border-t">
                    {profile?.username && (
                        <Link
                            href={`/${profile.username}`}
                            target="_blank"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors text-blue-600 dark:text-blue-400"
                        >
                            <Eye className="h-4 w-4" />
                            View Portfolio
                        </Link>
                    )}
                    <form action={async () => {
                        "use server"
                        const supabase = createClient()
                        await supabase.auth.signOut()
                        redirect("/login")
                    }}>
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors text-red-600 dark:text-red-400">
                            <LogOut className="h-4 w-4" />
                            Log Out
                        </button>
                    </form>
                </div>
            </aside>
            <main className="flex-1 p-6 lg:p-10 bg-background/95 max-w-5xl">
                {children}
            </main>
        </div>
    )
}
