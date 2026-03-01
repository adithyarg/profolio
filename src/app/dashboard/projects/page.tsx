import { createClient } from "@/lib/supabase/server"
import { createProject, deleteProject } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default async function ProjectsPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-medium">Projects</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your portfolio projects.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Project</CardTitle>
                    <CardDescription>
                        Create a new project to showcase on your portfolio.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createProject}>
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="grid gap-2 lg:col-span-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input id="title" name="title" required placeholder="E-commerce Platform" />
                            </div>

                            <div className="grid gap-2 lg:col-span-2">
                                <Label htmlFor="short_description">Short Description</Label>
                                <Input id="short_description" name="short_description" placeholder="A brief summary of the project" />
                            </div>

                            <div className="grid gap-2 lg:col-span-2">
                                <Label htmlFor="description">Full Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    placeholder="Detailed explanation of the project, your role, and the impact..."
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="role">Your Role</Label>
                                <Input id="role" name="role" placeholder="Lead Developer" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="tech_stack">Tech Stack (comma separated)</Label>
                                <Input id="tech_stack" name="tech_stack" placeholder="React, Node.js, PostgreSQL" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="demo_url">Live Demo URL</Label>
                                <Input id="demo_url" name="demo_url" type="url" placeholder="https://myproject.com" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="github_url">GitHub URL</Label>
                                <Input id="github_url" name="github_url" type="url" placeholder="https://github.com/myusername/project" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="start_date">Start Date</Label>
                                <Input id="start_date" name="start_date" type="date" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="end_date">End Date</Label>
                                <Input id="end_date" name="end_date" type="date" />
                            </div>

                            <div className="lg:col-span-2 mt-2">
                                <Button type="submit">Add Project</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project) => (
                    <Card key={project.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription>{project.short_description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-sm text-muted-foreground mb-4">
                                <strong>Role:</strong> {project.role || "N/A"}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack?.map((tech: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t p-4">
                            <div className="flex gap-2">
                                {project.demo_url && (
                                    <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline">Demo</a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline">GitHub</a>
                                )}
                            </div>
                            <form action={async () => {
                                "use server"
                                await deleteProject(project.id)
                            }}>
                                <Button variant="destructive" size="sm" type="submit">Delete</Button>
                            </form>
                        </CardFooter>
                    </Card>
                ))}
                {projects?.length === 0 && (
                    <p className="text-muted-foreground col-span-full">No projects added yet.</p>
                )}
            </div>
        </div>
    )
}
