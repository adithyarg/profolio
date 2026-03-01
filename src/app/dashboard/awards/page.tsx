import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Trophy } from "lucide-react"

async function createAward(formData: FormData) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const award = {
        user_id: user.id,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        date: formData.get("date") ? formData.get("date") as string : null,
    }

    await supabase.from("awards").insert([award])
    revalidatePath("/dashboard/awards")
}

async function deleteAward(id: string) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from("awards").delete().eq("id", id).eq("user_id", user.id)
    revalidatePath("/dashboard/awards")
}

export default async function AwardsPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: awards } = await supabase
        .from("awards")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                                <form action={async () => {
                                    "use server"
                                    await deleteAward(award.id)
                                }} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </form>

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

            {/* Add New Form */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
                <div className="space-y-1 mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Add an Award</h2>
                    <p className="text-sm font-medium text-slate-500">Document a significant milestone or achievement.</p>
                </div>

                <form action={createAward}>
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Award Title *</Label>
                                <Input id="title" name="title" required placeholder="e.g. Employee of the Year" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Date Received</Label>
                                <Input id="date" name="date" type="text" placeholder="e.g. 2023" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                                <p className="text-[11px] font-medium text-slate-400">Can be a full date or just a year</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description (Optional)</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600 font-medium resize-y"
                                placeholder="Why were you given this award? What was the impact?"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
                                Add Award
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
