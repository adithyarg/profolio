import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

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
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-medium">Skills</h3>
                <p className="text-sm text-muted-foreground">Manage your skills and expertise.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add Skill</CardTitle>
                    <CardDescription>Add tools and technologies you know.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createSkill}>
                        <div className="grid gap-4 lg:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="skill_name">Skill Name</Label>
                                <Input id="skill_name" name="skill_name" required placeholder="React" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" name="category" placeholder="Frontend, Backend, etc." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="level">Level (1-100)</Label>
                                <Input id="level" name="level" type="number" min={1} max={100} placeholder="90" />
                            </div>
                            <div className="col-span-full">
                                <Button type="submit">Add Skill</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {skills?.map((skill) => (
                    <Card key={skill.id} className="flex flex-row items-center justify-between p-4">
                        <div>
                            <h4 className="font-semibold">{skill.skill_name}</h4>
                            <p className="text-xs text-muted-foreground">{skill.category}</p>
                        </div>
                        <form action={async () => { "use server"; await deleteSkill(skill.id) }}>
                            <Button variant="ghost" size="sm" type="submit" className="text-red-500">Delete</Button>
                        </form>
                    </Card>
                ))}
            </div>
        </div>
    )
}
