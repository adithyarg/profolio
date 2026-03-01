import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Blocks, CheckCircle2 } from "lucide-react"

async function createSkill(formData: FormData) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const skill = {
        user_id: user.id,
        skill_name: formData.get("skill_name") as string,
        category: formData.get("category") as string,
        level: parseInt(formData.get("level") as string) || 0,
    }

    await supabase.from("skills").insert([skill])
    revalidatePath("/dashboard/skills")
}

async function deleteSkill(id: string) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from("skills").delete().eq("id", id).eq("user_id", user.id)
    revalidatePath("/dashboard/skills")
}

export default async function SkillsPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: skills } = await supabase
        .from("skills")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Skills</h1>
                <p className="text-base font-medium text-slate-500">Manage your core competencies and technical skills.</p>
            </div>

            {/* List Existing Skills */}
            <div className="space-y-6 border-b pb-12">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Blocks className="h-5 w-5 text-indigo-600" /> Your Expertise
                </h2>

                {!skills || skills.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                            <Blocks className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No skills added</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">
                            Add some skills so recruiters know what you are capable of!
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill: any) => (
                            <div key={skill.id} className="group flex items-center bg-white border border-slate-200 shadow-sm rounded-full pl-4 pr-1 py-1.5 text-sm font-semibold text-slate-700 transition-all hover:border-indigo-300">
                                <CheckCircle2 className="h-4 w-4 mr-2 text-indigo-500" />
                                <span className="mr-3">{skill.skill_name}</span>
                                <form action={async () => {
                                    "use server"
                                    await deleteSkill(skill.id)
                                }}>
                                    <button type="submit" className="h-7 w-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add New Form */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10 max-w-3xl">
                <div className="space-y-1 mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Add Skill</h2>
                    <p className="text-sm font-medium text-slate-500">Add a new tool, language, or soft skill you possess.</p>
                </div>

                <form action={createSkill}>
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="skill_name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Skill Name *</Label>
                                <Input id="skill_name" name="skill_name" required placeholder="e.g. React.js" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category (Optional)</Label>
                                <Input id="category" name="category" placeholder="e.g. Frontend" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
                                Add Skill
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
