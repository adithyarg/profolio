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
                <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-2 border-emerald-200 text-emerald-700 px-6 py-5 text-base font-bold shadow-lg">
                    <CheckCircle2 className="h-6 w-6 shrink-0" />
                    Profile saved successfully!
                </div>
            )}
            {searchParams?.error && (
                <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-red-50 to-red-100/50 border-2 border-red-200 text-red-700 px-6 py-5 text-base font-bold shadow-lg">
                    <AlertCircle className="h-6 w-6 shrink-0" />
                    {decodeURIComponent(searchParams.error)}
                </div>
            )}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Dashboard</h1>
                    <p className="text-lg font-semibold text-slate-600">
                        Manage your identity and what recruiters see on your portfolio
                    </p>
                </div>

                {/* Mini Analytics Stat */}
                <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 shadow-xl rounded-3xl px-8 py-6 flex items-center gap-5 min-w-[240px] hover:scale-105 transition-transform duration-300">
                    <div className="h-14 w-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                        <Eye className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Views</p>
                        <p className="text-3xl font-black text-slate-900">{viewCount || 0}</p>
                    </div>
                </div>
            </div>

            {/* Public Link Card */}
            <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" aria-hidden="true"></div>
                <div className="space-y-3 relative z-10">
                    <h2 className="text-2xl font-black text-indigo-900">Your Portfolio Link</h2>
                    <p className="text-base font-semibold text-indigo-700/90 max-w-lg leading-relaxed">
                        Share this custom link with recruiters or on your social profiles. The page is completely read-only for visitors.
                    </p>
                    <div className="pt-3">
                        <code className="text-base font-bold text-indigo-800 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl border-2 border-indigo-200 select-all inline-block">
                            profolio.vercel.app/{profile?.username || user.id}
                        </code>
                    </div>
                </div>
                <Button variant="default" className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all duration-300 h-14 px-8 text-base font-bold" asChild>
                    <a href={`/${profile?.username || user.id}`} target="_blank" rel="noreferrer">
                        Preview Profile <ExternalLink className="h-5 w-5 ml-2" />
                    </a>
                </Button>
            </div>

            {/* Form Card */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white shadow-2xl p-8 sm:p-12">
                <div className="space-y-2 mb-10">
                    <h2 className="text-3xl font-black text-slate-900">Personal Information</h2>
                    <p className="text-base font-semibold text-slate-600">Update your core details and contact information</p>
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
                                <Label htmlFor="full_name" className="text-sm font-bold text-slate-700">Full Name</Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    required
                                    defaultValue={profile?.full_name || ""}
                                    placeholder="e.g. Alex Robinson"
                                    className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all"
                                />
                                <p className="text-xs font-semibold text-slate-500">Displayed prominently at the top of your portfolio</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-bold text-slate-700">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    required
                                    defaultValue={profile?.username || ""}
                                    placeholder="e.g. alexrobinson"
                                    className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all"
                                />
                                <p className="text-xs font-semibold text-slate-500">Used for your public URL. Lowercase, letters and numbers</p>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="headline" className="text-sm font-bold text-slate-700">Professional Headline</Label>
                                <Input
                                    id="headline"
                                    name="headline"
                                    defaultValue={profile?.headline || ""}
                                    placeholder="e.g. Senior Product Designer building accessible tools"
                                    className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all"
                                />
                                <p className="text-xs font-semibold text-slate-500">Keep it short, impactful, and specific to your role</p>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="location" className="text-sm font-bold text-slate-700">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    defaultValue={profile?.location || ""}
                                    placeholder="e.g. San Francisco, CA"
                                    className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all"
                                />
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="border-t-2 border-slate-200 pt-10">
                            <h3 className="text-2xl font-black text-slate-900 mb-8">Contact Information</h3>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-bold text-slate-700">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        defaultValue={profile?.phone || ""}
                                        placeholder="e.g. +91 98765 43210"
                                        className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-bold text-slate-700">Professional Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={profile?.email || user.email || ""}
                                        placeholder="e.g. your.name@email.com"
                                        className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all"
                                    />
                                    <p className="text-xs font-semibold text-slate-500">Defaults to your login email</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="linkedin_url" className="text-sm font-bold text-slate-700">LinkedIn Profile</Label>
                                    <Input
                                        id="linkedin_url"
                                        name="linkedin_url"
                                        type="url"
                                        defaultValue={profile?.linkedin_url || ""}
                                        placeholder="https://linkedin.com/in/yourname"
                                        className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="github_url" className="text-sm font-bold text-slate-700">GitHub Profile</Label>
                                    <Input
                                        id="github_url"
                                        name="github_url"
                                        type="url"
                                        defaultValue={profile?.github_url || ""}
                                        placeholder="https://github.com/yourname"
                                        className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all"
                                    />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="website_url" className="text-sm font-bold text-slate-700">Personal Website / Portfolio</Label>
                                    <Input
                                        id="website_url"
                                        name="website_url"
                                        type="url"
                                        defaultValue={profile?.website_url || ""}
                                        placeholder="https://yourwebsite.com"
                                        className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 border-t-2 border-slate-200 pt-10">
                            <Label htmlFor="bio" className="text-sm font-bold text-slate-700">Professional Summary</Label>
                            <textarea
                                id="bio"
                                name="bio"
                                defaultValue={profile?.bio || ""}
                                rows={6}
                                className="flex w-full rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 py-4 text-base shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 font-medium resize-y transition-all"
                                placeholder="Write 3-4 lines about your expertise, what you build, and your career focus. Example: 'VLSI enthusiast with hands-on experience in Verilog and FPGA design. Built hardware accelerators and CNN pipelines. Focused on RTL design and verification roles.'"
                            />
                            <p className="text-xs font-semibold text-slate-500">Keep it concise (3-4 lines). Focus on your field, core skills, and what you build</p>
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t-2 border-slate-200 pt-10">
                            <SubmitButton className="h-14 px-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all duration-300">
                                Save Profile Changes
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
