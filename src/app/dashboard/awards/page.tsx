import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Trophy, CheckCircle2, AlertCircle, Pencil } from "lucide-react"
import { DeleteButton } from "@/components/delete-button"

async function createAward(formData: FormData) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const id = formData.get("id") as string | null
    const isUpdate = !!id

    // Build date string from dropdowns
    const month = formData.get("award_month") as string
    const year = formData.get("award_year") as string
    const date = (month && year) ? `${month} ${year}` : year || null

    const award = {
        user_id: user.id,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        date: date,
    }

    let error

    if (isUpdate) {
        const result = await supabase
            .from("awards")
            .update(award)
            .eq("id", id)
            .eq("user_id", user.id)
        error = result.error
    } else {
        const result = await supabase.from("awards").insert([award])
        error = result.error
    }

    if (error) {
        redirect("/dashboard/awards?error=" + encodeURIComponent(error.message))
    }

    revalidatePath("/dashboard/awards")
    redirect(isUpdate ? "/dashboard/awards?updated=1" : "/dashboard/awards?success=1")
}

async function deleteAward(id: string) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from("awards").delete().eq("id", id).eq("user_id", user.id)
    revalidatePath("/dashboard/awards")
    redirect("/dashboard/awards?deleted=1")
}

export default async function AwardsPage({
    searchParams
}: {
    searchParams: { success?: string; error?: string; deleted?: string; edit?: string; updated?: string }
}) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: awards } = await supabase
        .from("awards")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    const editingAward = searchParams.edit 
        ? awards?.find(a => a.id === searchParams.edit)
        : null

    // Parse date for editing
    let awardMonth = "", awardYear = ""
    if (editingAward?.date) {
        const parts = editingAward.date.split(" ")
        if (parts.length === 2) {
            awardMonth = parts[0]
            awardYear = parts[1]
        } else if (parts.length === 1) {
            awardYear = parts[0]
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Success / Error Banner */}
            {searchParams?.success && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Award added successfully!
                </div>
            )}
            {searchParams?.updated && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Award updated successfully!
                </div>
            )}
            {searchParams?.deleted && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Award deleted successfully!
                </div>
            )}
            {searchParams?.error && (
                <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 text-sm font-semibold">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    {decodeURIComponent(searchParams.error)}
                </div>
            )}

            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Awards</h1>
                <p className="text-base font-medium text-slate-500">Showcase special recognitions and honors.</p>
            </div>

            {/* List Existing Awards */}
            <div className="space-y-6 border-b pb-12">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" /> Your Achievements
                </h2>

                {!awards || awards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                        <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                            <Trophy className="h-6 w-6 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No awards added</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">
                            Add any scholarships, competition wins, or company awards here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {awards.map((award: any) => (
                            <div key={award.id} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition-all flex items-start gap-4">
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a 
                                        href={`/dashboard/awards?edit=${award.id}#form`}
                                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                        title="Edit award"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </a>
                                    <form action={async () => {
                                        "use server"
                                        await deleteAward(award.id)
                                    }}>
                                        <DeleteButton itemName="award" />
                                    </form>
                                </div>

                                <div className="h-10 w-10 shrink-0 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100 hidden sm:flex">
                                    <Trophy className="h-5 w-5 text-amber-500" />
                                </div>
                                <div className="space-y-1 pr-10">
                                    <h3 className="font-bold text-slate-900">{award.title}</h3>
                                    {award.date && (
                                        <p className="text-xs font-semibold text-slate-500 bg-slate-100 w-fit px-2 py-0.5 rounded uppercase tracking-wider">
                                            {award.date}
                                        </p>
                                    )}
                                    {award.description && (
                                        <p className="text-sm font-medium text-slate-600 pt-1 leading-relaxed">
                                            {award.description}
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
                        {editingAward ? 'Edit Award' : 'Add an Award'}
                    </h2>
                    <p className="text-sm font-medium text-slate-500">Document a significant milestone or achievement.</p>
                    {editingAward && (
                        <a href="/dashboard/awards" className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700 mt-2">
                            ← Cancel editing
                        </a>
                    )}
                </div>

                <form 
                    key={editingAward ? `edit-${editingAward.id}` : (searchParams?.success ? Date.now() : 'award-form')}
                    action={createAward}
                >
                    {editingAward && <input type="hidden" name="id" value={editingAward.id} />}
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Award Title *</Label>
                                <Input 
                                    id="title" 
                                    name="title" 
                                    required 
                                    defaultValue={editingAward?.title || ""}
                                    placeholder="e.g. Employee of the Year" 
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Date Received</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <select 
                                        name="award_month" 
                                        defaultValue={awardMonth}
                                        className="h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-4 font-medium text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600"
                                    >
                                        <option value="">Month (Optional)</option>
                                        <option value="Jan">January</option>
                                        <option value="Feb">February</option>
                                        <option value="Mar">March</option>
                                        <option value="Apr">April</option>
                                        <option value="May">May</option>
                                        <option value="Jun">June</option>
                                        <option value="Jul">July</option>
                                        <option value="Aug">August</option>
                                        <option value="Sep">September</option>
                                        <option value="Oct">October</option>
                                        <option value="Nov">November</option>
                                        <option value="Dec">December</option>
                                    </select>
                                    <select 
                                        name="award_year" 
                                        defaultValue={awardYear}
                                        className="h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-4 font-medium text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600"
                                    >
                                        <option value="">Year</option>
                                        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <p className="text-[11px] font-medium text-slate-400">Month is optional, year only is fine</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description (Optional)</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                defaultValue={editingAward?.description || ""}
                                className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600 font-medium resize-y"
                                placeholder="Why were you given this award? What was the impact?"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <SubmitButton className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
                                {editingAward ? 'Update Award' : 'Add Award'}
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
