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
    ExternalLink
} from "lucide-react"

export function DashboardSidebar({ user, profile }: { user: any, profile: any }) {
    const pathname = usePathname()
    const supabase = createClient()

    const navItems = [
        { name: "Profile", href: "/dashboard", icon: User },
        { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
        { name: "Experience", href: "/dashboard/experience", icon: Briefcase },
        { name: "Certificates", href: "/dashboard/certificates", icon: Award },
        { name: "Awards", href: "/dashboard/awards", icon: GraduationCap },
        { name: "Skills", href: "/dashboard/skills", icon: Blocks },
    ]

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = "/login"
    }

    return (
        <aside className="w-full md:w-[260px] md:shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between sticky top-0 h-screen overflow-y-auto">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 mb-10">
                    <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-extrabold text-sm">P</span>
                    </div>
                    Profolio
                </Link>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive
                                        ? "bg-indigo-50 text-indigo-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <item.icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="p-6 space-y-4 border-t border-slate-100 bg-slate-50/50 mt-auto">
                <div className="mb-4 px-2">
                    <p className="text-sm font-medium text-slate-900 truncate">{profile?.full_name || "User"}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>

                <a
                    href={`/${profile?.username || user.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-3 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors"
                >
                    <ExternalLink className="h-4 w-4" />
                    View Portfolio
                </a>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
