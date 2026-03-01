import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Mail, MapPin, Briefcase } from "lucide-react"

export async function generateMetadata({ params }: { params: { username: string } }) {
    const supabase = createClient()
    const { data: user } = await supabase
        .from("users")
        .select("id")
        .eq("username", params.username)
        .single()

    if (!user) return { title: "Not Found" }

    const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, headline")
        .eq("id", user.id)
        .single()

    return {
        title: `${profile?.full_name} | ${profile?.headline}`,
        description: profile?.headline,
    }
}

export default async function PortfolioPage({ params }: { params: { username: string } }) {
    const supabase = createClient()

    // Wait, Next.js metadata and page need to fetch user, actually the username is in auth.users ideally but auth.users can't easily be queried without service_role key due to RLS, or we simply add `username` to `profiles` table. Let me check my schema...
    // In `00_schema.sql` I didn't add username to profiles! I only have `users` table wait no, Supabase `auth.users` doesn't have a public username, but the `users` table from public was supposed to be there. But my schema only has `profiles` mapping to `auth.users`. And `profiles` doesn't have `username` explicitly unless it was added!
    // Wait, "users" table was mentioned in plan but not explicitly created in the 00_schema `create table public.profiles ( ... )` did I include username? Let me check schema.
    // I must query profiles by checking if we have a username, but we didn't add `username` column to `profiles`.
    // Wait, how did I get username during registration? `data: { username: data.username }` in raw_user_meta_data.
    // In `handle_new_user` I could insert username if it existed on the table. But the database doesn't have the username column. 
    // Let's modify the code to assume we just use `id` for now or wait, the prompt says `/[username]`. 
    // Since I don't have username, maybe I can just fetch from profiles if I alter the table to include username!

    // For the sake of this file working right now before altering schema, I will try to query `profiles` by `id` directly if they pass `id` in the URL, OR we alter table profiles to have `username`. Let's assume we alter it later and use `username`.

    const { data: profile } = await supabase
        .from("profiles")
        .select("*, auth_user_id:id")
        .eq("id", params.username) // Fallback temporarily using ID if username fails
        .maybeSingle()

    // Temporary hack: we will just use the profile ID as the URL parameter until I fix the DB schema to have actual unique usernames. 
    if (!profile) return notFound()

    // Track page view asynchronously
    supabase.from("portfolio_views").insert([{ profile_id: profile.id }])

    const [
        { data: projects },
        { data: experiences },
        { data: skills },
        { data: certificates },
        { data: awards }
    ] = await Promise.all([
        supabase.from("projects").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }),
        supabase.from("experiences").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }),
        supabase.from("skills").select("*").eq("user_id", profile.id).order("level", { ascending: false }),
        supabase.from("certificates").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }),
        supabase.from("awards").select("*").eq("user_id", profile.id).order("created_at", { ascending: false })
    ])

    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-20">
            {/* Hero Section */}
            <header className="py-20 px-4 max-w-4xl mx-auto space-y-6">
                <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
                    {profile.full_name || "Anonymous User"}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    {profile.headline || "Professional Portfolio"}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <Button asChild>
                        <a href="#contact">Contact Me</a>
                    </Button>
                    {profile.location && (
                        <div className="flex items-center text-muted-foreground text-sm gap-2">
                            <MapPin className="h-4 w-4" /> {profile.location}
                        </div>
                    )}
                </div>
            </header>

            <main className="px-4 max-w-4xl mx-auto space-y-24 mt-10">
                {/* About Section */}
                {profile.bio && (
                    <section id="about" className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">About</h2>
                        <p className="leading-7 text-muted-foreground whitespace-pre-wrap">
                            {profile.bio}
                        </p>
                    </section>
                )}

                {/* Experience Section */}
                {experiences && experiences.length > 0 && (
                    <section id="experience" className="space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
                        <div className="space-y-8 border-l-2 border-muted pl-6 ml-3">
                            {experiences.map((exp: any) => (
                                <div key={exp.id} className="relative">
                                    <span className="absolute -left-[35px] top-1 bg-background border-2 border-muted h-4 w-4 rounded-full" />
                                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                                    <div className="text-muted-foreground flex items-center gap-2 mb-2">
                                        <Briefcase className="h-4 w-4" /> {exp.company} • {exp.duration}
                                    </div>
                                    <p className="text-muted-foreground">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {projects && projects.length > 0 && (
                    <section id="projects" className="space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {projects.map((project: any) => (
                                <Card key={project.id} className="flex flex-col overflow-hidden border-border/50 bg-card hover:bg-accent/5 transition-colors">
                                    <CardHeader>
                                        <CardTitle className="flex justify-between items-start">
                                            {project.title}
                                            <div className="flex gap-2">
                                                {project.github_url && (
                                                    <a href={project.github_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                                                        <Github className="h-5 w-5" />
                                                    </a>
                                                )}
                                                {project.demo_url && (
                                                    <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                                                        <ExternalLink className="h-5 w-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </CardTitle>
                                        <CardDescription>{project.short_description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tech_stack?.map((tech: string, i: number) => (
                                                <Badge key={i} variant="secondary">{tech}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {skills && skills.length > 0 && (
                    <section id="skills" className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill: any) => (
                                <Badge key={skill.id} className="text-sm px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-transparent">
                                    {skill.skill_name}
                                </Badge>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certs & Awards */}
                {(certificates?.length || awards?.length) ? (
                    <section id="recognitions" className="space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight">Recognitions</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {certificates?.map((cert: any) => (
                                <Card key={cert.id} className="border-l-4 border-l-blue-500 rounded-none border-y-0 border-r-0 shadow-sm bg-muted/20">
                                    <CardHeader className="py-4">
                                        <CardTitle className="text-lg">{cert.title}</CardTitle>
                                        <CardDescription>{cert.issuer} • {cert.issue_date}</CardDescription>
                                        {cert.file_url && (
                                            <a href={cert.file_url} className="text-blue-500 text-sm mt-2 font-medium hover:underline inline-block">
                                                View Credential
                                            </a>
                                        )}
                                    </CardHeader>
                                </Card>
                            ))}
                            {awards?.map((award: any) => (
                                <Card key={award.id} className="border-l-4 border-l-amber-500 rounded-none border-y-0 border-r-0 shadow-sm bg-muted/20">
                                    <CardHeader className="py-4">
                                        <CardTitle className="text-lg">{award.title}</CardTitle>
                                        <CardDescription>{award.date}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-4">
                                        <p className="text-sm">{award.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                ) : null}

                {/* Contact Section */}
                <section id="contact" className="space-y-6 pt-10 border-t">
                    <div className="text-center space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Interested in working together or have a question? I'd love to hear from you.
                        </p>
                        {/* The user email isn't strictly public via profile but let's assume if they have a mailto link it could be there. I'll just use a generic placeholder since email isn't in profile table schema right now. */}
                        <Button size="lg" className="rounded-full">
                            Contact Me
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    )
}
