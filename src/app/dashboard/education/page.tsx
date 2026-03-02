import { createClient } from "@/lib/supabase/server"
import { createEducation, deleteEducation } from "./actions"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, CheckCircle2, AlertCircle, Pencil } from "lucide-react"
import { DeleteButton } from "@/components/delete-button"

export default async function EducationPage({
    searchParams
}: {
    searchParams: { success?: string; error?: string; deleted?: string; edit?: string; updated?: string }
}) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: education } = await supabase
        .from("education")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    const editingEducation = searchParams.edit 
        ? education?.find(e => e.id === searchParams.edit)
        : null

    // Parse dates for editing
    let startMonth = "", startYear = "", endMonth = "", endYear = ""
    if (editingEducation) {
        if (editingEducation.start_date) {
            const [month, year] = editingEducation.start_date.split(" ")
            startMonth = month || ""
            startYear = year || ""
        }
        if (editingEducation.end_date) {
            if (editingEducation.end_date === "Present") {
                endMonth = "Present"
            } else {
                const [month, year] = editingEducation.end_date.split(" ")
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
                    Education added successfully!
                </div>
            )}
            {searchParams?.updated && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Education updated successfully!
                </div>
            )}
            {searchParams?.deleted && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Education deleted successfully!
                </div>
            )}
            {searchParams?.error && (
                <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 text-sm font-semibold">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    {decodeURIComponent(searchParams.error)}
                </div>
            )}

            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Education</h1>
                <p className="text-base font-medium text-slate-500">Manage your academic qualifications.</p>
            </div>

            {/* List Existing Education */}
            <div className="space-y-6 border-b pb-12">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-indigo-600" /> Your Qualifications
                </h2>

                {!education || education.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                            <GraduationCap className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No education added</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">
                            Add your degree and institution to complete your profile.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {education.map((edu: any) => (
                            <div key={edu.id} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a 
                                        href={`/dashboard/education?edit=${edu.id}#form`}
                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="Edit education"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </a>
                                    <form action={async () => {
                                        "use server"
                                        await deleteEducation(edu.id)
                                    }}>
                                        <DeleteButton itemName="education" />
                                    </form>
                                </div>

                                <div className="space-y-3 pr-10">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900">{edu.degree}</h3>
                                            {edu.field_of_study && (
                                                <p className="text-sm font-semibold text-indigo-600 mt-1">{edu.field_of_study}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="text-base font-bold text-slate-700">{edu.institution}</div>
                                    
                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                        {(edu.start_date || edu.end_date) && (
                                            <span className="font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                                                {edu.start_date && edu.end_date ? `${edu.start_date} - ${edu.end_date}` : edu.start_date || edu.end_date}
                                            </span>
                                        )}
                                        {edu.grade && (
                                            <span className="font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                                                {edu.grade}
                                            </span>
                                        )}
                                        {edu.location && (
                                            <span className="font-medium text-slate-500">
                                                📍 {edu.location}
                                            </span>
                                        )}
                                    </div>

                                    {edu.description && (
                                        <p className="text-sm font-medium text-slate-600 leading-relaxed pt-2">
                                            {edu.description}
                                        </p>
                                    )}
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
                        {editingEducation ? 'Edit Education' : 'Add Education'}
                    </h2>
                    <p className="text-sm font-medium text-slate-500">Include your degree, institution, and academic achievements.</p>
                    {editingEducation && (
                        <a href="/dashboard/education" className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700 mt-2">
                            ← Cancel editing
                        </a>
                    )}
                </div>

                <form 
                    key={editingEducation ? `edit-${editingEducation.id}` : (searchParams?.success ? Date.now() : 'education-form')}
                    action={async (formData) => {
                        "use server"
                        await createEducation(formData)
                    }}
                >
                    {editingEducation && <input type="hidden" name="id" value={editingEducation.id} />}
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="degree" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Degree *</Label>
                                <Input 
                                    id="degree" 
                                    name="degree" 
                                    required 
                                    defaultValue={editingEducation?.degree || ""}
                                    placeholder="e.g. B.Tech, M.Sc, B.E" 
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="field_of_study" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Field of Study</Label>
                                <Input 
                                    id="field_of_study" 
                                    name="field_of_study" 
                                    defaultValue={editingEducation?.field_of_study || ""}
                                    placeholder="e.g. Computer Science, ECE" 
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="institution" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Institution *</Label>
                            <Input 
                                id="institution" 
                                name="institution" 
                                required 
                                defaultValue={editingEducation?.institution || ""}
                                placeholder="e.g. MIT, Stanford University" 
                                className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" 
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="grade" className="text-xs font-semibold uppercase tracking-wider text-slate-500">CGPA / Percentage</Label>
                                <Input 
                                    id="grade" 
                                    name="grade" 
                                    defaultValue={editingEducation?.grade || ""}
                                    placeholder="e.g. 8.5/10 or 85%" 
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Location</Label>
                                <Input 
                                    id="location" 
                                    name="location" 
                                    defaultValue={editingEducation?.location || ""}
                                    placeholder="e.g. Bangalore, India" 
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" 
                                />
                            </div>
                        </div>

                        {/* Duration */}
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
                            <p className="text-[11px] font-medium text-slate-400">Select "Present" if you're currently studying</p>
                        </div>

                        <div className="space-y-2 border-t pt-8">
                            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Additional Details (Optional)</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                defaultValue={editingEducation?.description || ""}
                                className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600 font-medium resize-y"
                                placeholder="Relevant coursework, achievements, or activities..."
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <SubmitButton className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
                                {editingEducation ? 'Update Education' : 'Add Education'}
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
