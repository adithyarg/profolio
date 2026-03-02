import { createClient } from "@/lib/supabase/server"
import { createExperience, deleteExperience } from "./actions"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Briefcase, CheckCircle2, AlertCircle, Pencil } from "lucide-react"
import { DeleteButton } from "@/components/delete-button"

export default async function ExperiencePage({
    searchParams
}: {
    searchParams: { success?: string; error?: string; deleted?: string; edit?: string; updated?: string }
}) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: experiences } = await supabase
        .from("experiences")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    const editingExperience = searchParams.edit 
        ? experiences?.find(e => e.id === searchParams.edit)
        : null

    // Parse duration for editing
    let startMonth = "", startYear = "", endMonth = "", endYear = ""
    if (editingExperience?.duration) {
        const parts = editingExperience.duration.split(" - ")
        if (parts[0]) {
            const [month, year] = parts[0].split(" ")
            startMonth = month || ""
            startYear = year || ""
        }
        if (parts[1]) {
            if (parts[1] === "Present") {
                endMonth = "Present"
            } else {
                const [month, year] = parts[1].split(" ")
                endMonth = month || ""
                endYear = year || ""
            }
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Success / Error Banner */}
            {searchParams?.success && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Experience added successfully!
                </div>
            )}
            {searchParams?.updated && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Experience updated successfully!
                </div>
            )}
            {searchParams?.deleted && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Experience deleted successfully!
                </div>
            )}

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
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {experiences.map((exp: any) => (
                            <div key={exp.id} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <a 
                                        href={`/dashboard/experience?edit=${exp.id}#form`}
                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors bg-white border border-slate-200"
                                        title="Edit experience"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </a>
                                    <form action={async () => {
                                        "use server"
                                        await deleteExperience(exp.id)
                                    }}>
                                        <DeleteButton itemName="experience" />
                                    </form>
                                </div>

                                <div className="space-y-2 pr-20">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                                        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md w-fit mt-2 sm:mt-0">
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

            {/* Add/Edit Form */}
            <div id="form" className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
                <div className="space-y-1 mb-8">
                    <h2 className="text-xl font-bold text-slate-900">
                        {editingExperience ? 'Edit Experience' : 'Add Experience'}
                    </h2>
                    <p className="text-sm font-medium text-slate-500">Include a past role to strengthen your portfolio.</p>
                    {editingExperience && (
                        <a href="/dashboard/experience" className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700 mt-2">
                            ← Cancel editing
                        </a>
                    )}
                </div>

                <form 
                    key={editingExperience ? `edit-${editingExperience.id}` : (searchParams?.success ? Date.now() : 'experience-form')}
                    action={async (formData) => {
                        "use server"
                        await createExperience(formData)
                    }}
                >
                    {editingExperience && <input type="hidden" name="id" value={editingExperience.id} />}
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company Name *</Label>
                                <Input 
                                    id="company" 
                                    name="company" 
                                    required 
                                    defaultValue={editingExperience?.company || ""}
                                    placeholder="e.g. Acme Corp" 
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your Role *</Label>
                                <Input 
                                    id="role" 
                                    name="role" 
                                    required 
                                    defaultValue={editingExperience?.role || ""}
                                    placeholder="e.g. Senior Software Engineer" 
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Duration</Label>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Start Date */}
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-slate-600">Start Date</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select 
                                            name="start_month" 
                                            defaultValue={startMonth}
                                            className="h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-3 font-medium text-slate-900 text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600"
                                        >
                                            <option value="">Month</option>
                                            <option value="Jan">Jan</option>
                                            <option value="Feb">Feb</option>
                                            <option value="Mar">Mar</option>
                                            <option value="Apr">Apr</option>
                                            <option value="May">May</option>
                                            <option value="Jun">Jun</option>
                                            <option value="Jul">Jul</option>
                                            <option value="Aug">Aug</option>
                                            <option value="Sep">Sep</option>
                                            <option value="Oct">Oct</option>
                                            <option value="Nov">Nov</option>
                                            <option value="Dec">Dec</option>
                                        </select>
                                        <select 
                                            name="start_year" 
                                            defaultValue={startYear}
                                            className="h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-3 font-medium text-slate-900 text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600"
                                        >
                                            <option value="">Year</option>
                                            {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* End Date */}
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-slate-600">End Date</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select 
                                            name="end_month" 
                                            defaultValue={endMonth}
                                            className="h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-3 font-medium text-slate-900 text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600"
                                        >
                                            <option value="">Month</option>
                                            <option value="Present">Present</option>
                                            <option value="Jan">Jan</option>
                                            <option value="Feb">Feb</option>
                                            <option value="Mar">Mar</option>
                                            <option value="Apr">Apr</option>
                                            <option value="May">May</option>
                                            <option value="Jun">Jun</option>
                                            <option value="Jul">Jul</option>
                                            <option value="Aug">Aug</option>
                                            <option value="Sep">Sep</option>
                                            <option value="Oct">Oct</option>
                                            <option value="Nov">Nov</option>
                                            <option value="Dec">Dec</option>
                                        </select>
                                        <select 
                                            name="end_year" 
                                            defaultValue={endYear}
                                            className="h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-3 font-medium text-slate-900 text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600"
                                        >
                                            <option value="">Year</option>
                                            {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[11px] font-medium text-slate-400">Select "Present" in end month if you currently work here</p>
                        </div>

                        <div className="space-y-2 border-t pt-8">
                            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                defaultValue={editingExperience?.description || ""}
                                className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600 font-medium resize-y"
                                placeholder="Describe your responsibilities, achievements, and impact..."
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <SubmitButton className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
                                {editingExperience ? 'Update Experience' : 'Add Experience'}
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
