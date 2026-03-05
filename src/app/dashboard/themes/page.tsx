import { createClient } from "@/lib/supabase/server"
import { updateTheme } from "./actions"
import { CheckCircle2 } from "lucide-react"

const themes = [
    {
        id: "modern",
        name: "Modern",
        description: "Clean and contemporary design with vibrant gradients",
        preview: "bg-gradient-to-br from-indigo-500 to-purple-600",
        badge: "Popular"
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Simple and elegant with focus on content",
        preview: "bg-gradient-to-br from-slate-700 to-slate-900",
        badge: null
    },
    {
        id: "creative",
        name: "Creative",
        description: "Bold colors and playful design elements",
        preview: "bg-gradient-to-br from-pink-500 to-orange-500",
        badge: "New"
    },
    {
        id: "professional",
        name: "Professional",
        description: "Corporate and business-focused layout",
        preview: "bg-gradient-to-br from-blue-600 to-cyan-600",
        badge: null
    },
    {
        id: "bold",
        name: "Bold",
        description: "High contrast with striking visual impact",
        preview: "bg-gradient-to-br from-red-600 to-yellow-500",
        badge: null
    }
]

export default async function ThemesPage({
    searchParams
}: {
    searchParams: { success?: string }
}) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from("profiles")
        .select("theme, username")
        .eq("id", user.id)
        .single()

    const currentTheme = profile?.theme || "modern"

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {searchParams?.success && (
                <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-950/50 dark:to-emerald-900/50 border-2 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-6 py-5 text-base font-bold shadow-lg">
                    <CheckCircle2 className="h-6 w-6 shrink-0" />
                    Theme updated successfully!
                </div>
            )}

            <div className="space-y-2">
                <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Portfolio Themes
                </h1>
                <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
                    Choose a theme that matches your style. All themes are free!
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {themes.map((theme) => {
                    const isActive = currentTheme === theme.id
                    
                    return (
                        <form key={theme.id} action={updateTheme}>
                            <input type="hidden" name="theme" value={theme.id} />
                            <button
                                type="submit"
                                className={`w-full text-left rounded-3xl border-2 p-6 transition-all duration-300 hover:scale-105 ${
                                    isActive
                                        ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 shadow-xl shadow-indigo-600/20 dark:shadow-indigo-500/30"
                                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700"
                                }`}
                            >
                                <div className="space-y-4">
                                    <div className={`h-32 rounded-2xl ${theme.preview} relative overflow-hidden`}>
                                        {theme.badge && (
                                            <div className="absolute top-3 right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-1 rounded-full text-xs font-bold">
                                                {theme.badge}
                                            </div>
                                        )}
                                        {isActive && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <div className="bg-white dark:bg-slate-900 rounded-full p-3">
                                                    <CheckCircle2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                {theme.name}
                                            </h3>
                                            {isActive && (
                                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/50 px-2 py-1 rounded-full">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {theme.description}
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <span className="text-sm font-bold text-green-600 dark:text-green-500">
                                            Free
                                        </span>
                                    </div>
                                </div>
                            </button>
                        </form>
                    )
                })}
            </div>

            <div className="rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 dark:bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" aria-hidden="true"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-black text-indigo-900 dark:text-indigo-300 mb-3">
                        Preview Your Theme
                    </h2>
                    <p className="text-base font-semibold text-indigo-700/90 dark:text-indigo-400/90 mb-4">
                        See how your portfolio looks with the selected theme
                    </p>
                    <a
                        href={`/${profile?.username || user.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        View Portfolio
                    </a>
                </div>
            </div>
        </div>
    )
}
