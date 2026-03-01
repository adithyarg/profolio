import { createClient } from "@/lib/supabase/server"
import { createExperience, deleteExperience } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

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
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-medium">Experience</h3>
                <p className="text-sm text-muted-foreground">Manage your work history.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add Experience</CardTitle>
                    <CardDescription>Add a new role to your portfolio.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createExperience}>
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" name="company" required placeholder="Acme Corp" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" name="role" required placeholder="Software Engineer" />
                            </div>
                            <div className="grid gap-2 lg:col-span-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input id="duration" name="duration" placeholder="Jan 2020 - Present" />
                            </div>
                            <div className="grid gap-2 lg:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    placeholder="Describe your responsibilities and achievements..."
                                />
                            </div>
                            <div className="col-span-2">
                                <Button type="submit">Add Experience</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-4">
                {experiences?.map((exp) => (
                    <Card key={exp.id}>
                        <CardHeader>
                            <CardTitle>{exp.role} at {exp.company}</CardTitle>
                            <CardDescription>{exp.duration}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap text-sm">{exp.description}</p>
                        </CardContent>
                        <CardFooter>
                            <form action={async () => { "use server"; await deleteExperience(exp.id) }}>
                                <Button variant="destructive" size="sm" type="submit">Delete</Button>
                            </form>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
