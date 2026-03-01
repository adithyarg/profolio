import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

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
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-medium">Awards & Honors</h3>
                <p className="text-sm text-muted-foreground">Manage your recognitions.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add Award</CardTitle>
                    <CardDescription>Include relevant awards in your portfolio.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createAward}>
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="grid gap-2 lg:col-span-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" required placeholder="Employee of the Year" />
                            </div>
                            <div className="grid gap-2 lg:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    placeholder="Details about the award..."
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" name="date" type="date" />
                            </div>
                            <div className="col-span-2">
                                <Button type="submit">Add Award</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                {awards?.map((award) => (
                    <Card key={award.id}>
                        <CardHeader>
                            <CardTitle>{award.title}</CardTitle>
                            <CardDescription>{award.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{award.description}</p>
                        </CardContent>
                        <CardFooter>
                            <form action={async () => { "use server"; await deleteAward(award.id) }}>
                                <Button variant="destructive" size="sm" type="submit">Delete</Button>
                            </form>
                        </CardFooter>
                    </Card>
                ))}
                {awards?.length === 0 && <p className="text-muted-foreground">No awards added.</p>}
            </div>
        </div>
    )
}
