import { createClient } from "@/lib/supabase/server"
import { updateProfile } from "./actions"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExternalLink, Eye, CheckCircle2, AlertCircle } from "lucide-react"
import { AvatarUpload } from "@/components/avatar-upload"

export default async function DashboardProfilePage({
    searchParams
}: {
    searchParams: { success?: string; error?: string }
}) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

    // Fetch view count
    const { count: viewCount } = await supabase
        .from("portfolio_views")
        .select("*", { count: 'exact', head: true })
        .eq("profile_id", user.id)

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Success / Error Banner */}
            {searchParams?.success && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Profile saved successfully!
                </div>
            )}
            {searchParams?.error && (
                <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 text-sm font-semibold">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    {decodeURIComponent(searchParams.error)}
                </div>
            )}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                    <p className="text-base font-medium text-slate-500">
                        Manage your identity and what recruiters see on your public portfolio.
                    </p>
                </div>

                {/* Mini Analytics Stat */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl px-6 py-4 flex items-center gap-4 min-w-[200px]">
                    <div className="h-10 w-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                        <Eye className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Views</p>
                        <p className="text-2xl font-extrabold text-slate-900">{viewCount || 0}</p>
                    </div>
                </div>
            </div>

            {/* Public Link Card */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="space-y-2 relative z-10">
                    <h2 className="text-lg font-bold text-indigo-900">Your Portfolio Link</h2>
                    <p className="text-sm font-medium text-indigo-700/80 max-w-lg">
                        Share this custom link with recruiters or on your social profiles. The page is completely read-only for visitors.
                    </p>
                    <div className="pt-2">
                        <code className="text-sm font-semibold text-indigo-800 bg-white/60 px-3 py-1.5 rounded-md border border-indigo-200/50 select-all">
                            profolio.vercel.app/{profile?.username || user.id}
                        </code>
                    </div>
                </div>
                <Button variant="default" className="relative z-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20" asChild>
                    <a href={`/${profile?.username || user.id}`} target="_blank" rel="noreferrer">
                        Preview Profile <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                </Button>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
                <div className="space-y-1 mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                    <p className="text-sm font-medium text-slate-500">Update your core details.</p>
                </div>

                <form
                    action={async (formData) => {
                        "use server"
                        await updateProfile(formData)
                    }}
                    encType="multipart/form-data"
                >
                    <div className="space-y-8">
                        <AvatarUpload currentAvatarUrl={profile?.avatar_url} />

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="full_name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    required
                                    defaultValue={profile?.full_name || ""}
                                    placeholder="e.g. Alex Robinson"
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600"
                                />
                                <p className="text-[11px] font-medium text-slate-400">Displayed prominently at the top of your portfolio.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    required
                                    defaultValue={profile?.username || ""}
                                    placeholder="e.g. alexrobinson"
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600"
                                />
                                <p className="text-[11px] font-medium text-slate-400">Used for your public URL. Lowercase, letters and numbers.</p>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="headline" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Professional Headline</Label>
                                <Input
                                    id="headline"
                                    name="headline"
                                    defaultValue={profile?.headline || ""}
                                    placeholder="e.g. Senior Product Designer building accessible tools"
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600"
                                />
                                <p className="text-[11px] font-medium text-slate-400">Keep it short, impactful, and specific to your role.</p>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    defaultValue={profile?.location || ""}
                                    placeholder="e.g. San Francisco, CA"
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 border-t pt-8">
                            <Label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wider text-slate-500">About Section (Bio)</Label>
                            <textarea
                                id="bio"
                                name="bio"
                                defaultValue={profile?.bio || ""}
                                rows={6}
                                className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600 font-medium resize-y"
                                placeholder="Tell your professional story..."
                            />
                            <p className="text-[11px] font-medium text-slate-400">Write 2-3 short paragraphs explaining your journey, current focus, and what drives you.</p>
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t pt-8">
                            <SubmitButton className="h-11 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                                Save Profile Changes
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
