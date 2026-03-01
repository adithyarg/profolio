import { createClient } from "@/lib/supabase/server"
import { createProject, deleteProject } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ExternalLink, Trash2, FolderGit2 } from "lucide-react"

export default async function DashboardProjectsPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Projects</h1>
                <p className="text-base font-medium text-slate-500">
                    Showcase your best work. Added projects appear on your public portfolio instantly.
                </p>
            </div>

            {/* List Existing Projects */}
            <div className="space-y-6 border-b pb-12">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FolderGit2 className="h-5 w-5 text-indigo-600" /> Your Portfolio Projects
                </h2>

                {!projects || projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                            <FolderGit2 className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No projects yet</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">
                            Your projects will appear here. Add your first project below to start building your portfolio.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {projects.map((project: any) => (
                            <div key={project.id} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                                <form action={async () => {
                                    "use server"
                                    await deleteProject(project.id)
                                }} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </form>

                                <div className="space-y-3 pr-10">
                                    <h3 className="font-bold text-lg text-slate-900">{project.title}</h3>
                                    <p className="text-sm font-medium text-slate-500">{project.short_description}</p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tech_stack?.map((tech: string, i: number) => (
                                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider font-bold rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100 mt-4">
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
                                                <Github className="h-3.5 w-3.5 mr-1.5" /> Source
                                            </a>
                                        )}
                                        {project.demo_url && (
                                            <a href={project.demo_url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
                                                <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add New Form */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
                <div className="space-y-1 mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Add New Project</h2>
                    <p className="text-sm font-medium text-slate-500">Provide details about what you built and the technologies used.</p>
                </div>

                <form action={async (formData) => {
                    "use server"
                    await createProject(formData)
                }}>
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Project Title *</Label>
                                <Input id="title" name="title" required placeholder="e.g. E-Commerce Platform" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tech_stack" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tech Stack</Label>
                                <Input id="tech_stack" name="tech_stack" placeholder="React, Node.js, Postgres" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                                <p className="text-[11px] font-medium text-slate-400">Comma separated</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="short_description" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Short Description</Label>
                            <Input id="short_description" name="short_description" placeholder="A brief 1-sentence summary" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600 font-medium resize-y"
                                placeholder="Explain your role, the challenges faced, and the impact..."
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                            <div className="space-y-2">
                                <Label htmlFor="github_url" className="text-xs font-semibold uppercase tracking-wider text-slate-500">GitHub Repository URL</Label>
                                <Input id="github_url" name="github_url" type="url" placeholder="https://github.com/..." className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="demo_url" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live Demo URL</Label>
                                <Input id="demo_url" name="demo_url" type="url" placeholder="https://your-app.com" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
                                Add Project
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
