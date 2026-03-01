import { createClient } from "@/lib/supabase/server"
import { createExperience, deleteExperience } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Briefcase } from "lucide-react"

export default async function ExperiencePage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: experiences } = await supabase
        .from("experiences")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Experience</h1>
                <p className="text-base font-medium text-slate-500">Manage your work history.</p>
            </div>

            {/* List Existing Experiences */}
            <div className="space-y-6 border-b pb-12">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-indigo-600" /> Your Work History
                </h2>

                {!experiences || experiences.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                            <Briefcase className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No experience added</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">
                            Add your past roles to build out your resume.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {experiences.map((exp: any) => (
                            <div key={exp.id} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                                <form action={async () => {
                                    "use server"
                                    await deleteExperience(exp.id)
                                }} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </form>

                                <div className="space-y-2 pr-10">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                                        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md w-fit">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <div className="text-indigo-600 font-bold mb-4">{exp.company}</div>
                                    <p className="whitespace-pre-wrap text-sm font-medium text-slate-600 leading-relaxed pt-2">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add New Form */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
                <div className="space-y-1 mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Add Experience</h2>
                    <p className="text-sm font-medium text-slate-500">Include a past role to strengthen your portfolio.</p>
                </div>

                <form action={async (formData) => {
                    "use server"
                    await createExperience(formData)
                }}>
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company Name *</Label>
                                <Input id="company" name="company" required placeholder="e.g. Acme Corp" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your Role *</Label>
                                <Input id="role" name="role" required placeholder="e.g. Senior Software Engineer" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Duration</Label>
                            <Input id="duration" name="duration" placeholder="e.g. Jan 2020 - Present" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium max-w-md" />
                        </div>

                        <div className="space-y-2 border-t pt-8">
                            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600 font-medium resize-y"
                                placeholder="Describe your responsibilities, achievements, and impact..."
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
                                Add Experience
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
