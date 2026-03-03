"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
    User,
    FolderGit2,
    Briefcase,
    Award,
    GraduationCap,
    Blocks,
    LogOut,
    ExternalLink,
    Sparkles
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardSidebar({ user, profile }: { user: any, profile: any }) {
    const pathname = usePathname()
    const supabase = createClient()

    const navItems = [
        { name: "Profile", href: "/dashboard", icon: User },
        { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
        { name: "Experience", href: "/dashboard/experience", icon: Briefcase },
        { name: "Education", href: "/dashboard/education", icon: GraduationCap },
        { name: "Certificates", href: "/dashboard/certificates", icon: Award },
        { name: "Awards", href: "/dashboard/awards", icon: GraduationCap },
        { name: "Skills", href: "/dashboard/skills", icon: Blocks },
    ]

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = "/login"
    }

    return (
        <aside className="w-full md:w-[280px] md:shrink-0 border-r-2 border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900/50 flex flex-col justify-between sticky top-0 h-screen overflow-y-auto">
            <div className="p-8">
                <div className="flex items-center justify-between mb-12">
                    <Link href="/dashboard" className="flex items-center gap-3 font-bold text-2xl tracking-tight transition-all duration-300 hover:scale-105">
                        <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30 dark:shadow-indigo-500/50">
                            <span className="text-white font-extrabold text-lg">P</span>
                        </div>
                        <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Profolio</span>
                    </Link>
                    <ThemeToggle />
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 text-base font-semibold transition-all duration-200 ${isActive
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white shadow-lg shadow-indigo-600/30 dark:shadow-indigo-500/50"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400 dark:text-slate-500"}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="p-6 space-y-4 border-t-2 border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 mt-auto">
                <div className="mb-4 px-3 py-2 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{profile?.full_name || "User"}</p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                </div>

                <a
                    href={`/${profile?.username || user.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 px-4 py-3 text-sm font-bold text-indigo-700 dark:text-indigo-300 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    <ExternalLink className="h-4 w-4" />
                    View Portfolio
                </a>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
