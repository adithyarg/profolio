import { createClient } from "@/lib/supabase/server"
import { updateProfile } from "./actions"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExternalLink, CheckCircle2, AlertCircle } from "lucide-react"
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

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Success / Error Banner */}
            {searchParams?.success && (
                <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-950/50 dark:to-emerald-900/50 border-2 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-6 py-5 text-base font-bold shadow-lg">
                    <CheckCircle2 className="h-6 w-6 shrink-0" />
                    Profile saved successfully!
                </div>
            )}
            {searchParams?.error && (
                <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/50 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-5 text-base font-bold shadow-lg">
                    <AlertCircle className="h-6 w-6 shrink-0" />
                    {decodeURIComponent(searchParams.error)}
                </div>
            )}
            <div className="space-y-2">
                <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Dashboard</h1>
                <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
                    Manage your identity and what recruiters see on your portfolio
                </p>
            </div>

            {/* Public Link Card */}
            <div className="rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 relative overflow-hidden shadow-xl dark:shadow-indigo-500/20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 dark:bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" aria-hidden="true"></div>
                <div className="space-y-3 relative z-10">
                    <h2 className="text-2xl font-black text-indigo-900 dark:text-indigo-300">Your Portfolio Link</h2>
                    <p className="text-base font-semibold text-indigo-700/90 dark:text-indigo-400/90 max-w-lg leading-relaxed">
                        Share this custom link with recruiters or on your social profiles. The page is completely read-only for visitors.
                    </p>
                    <div className="pt-3">
                        <code className="text-base font-bold text-indigo-800 dark:text-indigo-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-5 py-3 rounded-2xl border-2 border-indigo-200 dark:border-indigo-700 select-all inline-block">
                            profolio.vercel.app/{profile?.username || user.id}
                        </code>
                    </div>
                </div>
                <Button variant="default" className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white rounded-2xl shadow-xl shadow-indigo-600/30 dark:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 h-14 px-8 text-base font-bold" asChild>
                    <a href={`/${profile?.username || user.id}`} target="_blank" rel="noreferrer">
                        Preview Profile <ExternalLink className="h-5 w-5 ml-2" />
                    </a>
                </Button>
            </div>

            {/* Form Card */}
            <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl dark:shadow-indigo-500/10 p-8 sm:p-12">
                <div className="space-y-2 mb-10">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">Personal Information</h2>
                    <p className="text-base font-semibold text-slate-600 dark:text-slate-400">Update your core details and contact information</p>
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
                                <Label htmlFor="full_name" className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    required
                                    defaultValue={profile?.full_name || ""}
                                    placeholder="e.g. Alex Robinson"
                                    className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 transition-all"
                                />
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Displayed prominently at the top of your portfolio</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-bold text-slate-700 dark:text-slate-300">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    required
                                    defaultValue={profile?.username || ""}
                                    placeholder="e.g. alexrobinson"
                                    className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 transition-all"
                                />
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Used for your public URL. Lowercase, letters and numbers</p>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="headline" className="text-sm font-bold text-slate-700 dark:text-slate-300">Professional Headline</Label>
                                <Input
                                    id="headline"
                                    name="headline"
                                    defaultValue={profile?.headline || ""}
                                    placeholder="e.g. Senior Product Designer building accessible tools"
                                    className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 transition-all"
                                />
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Keep it short, impactful, and specific to your role</p>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="location" className="text-sm font-bold text-slate-700 dark:text-slate-300">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    defaultValue={profile?.location || ""}
                                    placeholder="e.g. San Francisco, CA"
                                    className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="border-t-2 border-slate-200 dark:border-slate-800 pt-10">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Contact Information</h3>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        defaultValue={profile?.phone || ""}
                                        placeholder="e.g. +91 98765 43210"
                                        className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">Professional Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={profile?.email || user.email || ""}
                                        placeholder="e.g. your.name@email.com"
                                        className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 transition-all"
                                    />
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Defaults to your login email</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="linkedin_url" className="text-sm font-bold text-slate-700 dark:text-slate-300">LinkedIn Profile</Label>
                                    <Input
                                        id="linkedin_url"
                                        name="linkedin_url"
                                        type="url"
                                        defaultValue={profile?.linkedin_url || ""}
                                        placeholder="https://linkedin.com/in/yourname"
                                        className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="github_url" className="text-sm font-bold text-slate-700 dark:text-slate-300">GitHub Profile</Label>
                                    <Input
                                        id="github_url"
                                        name="github_url"
                                        type="url"
                                        defaultValue={profile?.github_url || ""}
                                        placeholder="https://github.com/yourname"
                                        className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="website_url" className="text-sm font-bold text-slate-700 dark:text-slate-300">Personal Website / Portfolio</Label>
                                    <Input
                                        id="website_url"
                                        name="website_url"
                                        type="url"
                                        defaultValue={profile?.website_url || ""}
                                        placeholder="https://yourwebsite.com"
                                        className="h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 text-base font-medium focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 border-t-2 border-slate-200 dark:border-slate-800 pt-10">
                            <Label htmlFor="bio" className="text-sm font-bold text-slate-700 dark:text-slate-300">Professional Summary</Label>
                            <textarea
                                id="bio"
                                name="bio"
                                defaultValue={profile?.bio || ""}
                                rows={6}
                                className="flex w-full rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-5 py-4 text-base shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/20 dark:focus-visible:ring-indigo-500/30 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-500 font-medium resize-y transition-all text-slate-900 dark:text-slate-100"
                                placeholder="Write 3-4 lines about your expertise, what you build, and your career focus. Example: 'VLSI enthusiast with hands-on experience in Verilog and FPGA design. Built hardware accelerators and CNN pipelines. Focused on RTL design and verification roles.'"
                            />
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Keep it concise (3-4 lines). Focus on your field, core skills, and what you build</p>
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t-2 border-slate-200 dark:border-slate-800 pt-10">
                            <SubmitButton className="h-14 px-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white font-bold text-base shadow-xl shadow-indigo-600/30 dark:shadow-indigo-500/50 hover:scale-105 transition-all duration-300">
                                Save Profile Changes
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
