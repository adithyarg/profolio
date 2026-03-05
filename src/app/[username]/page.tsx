import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, ExternalLink, MapPin, Briefcase, Calendar, Award, CheckCircle2, ChevronRight, Mail, Phone, Linkedin, Globe, GraduationCap } from "lucide-react"
import Image from "next/image"
import { getTheme } from "@/lib/themes"

export async function generateMetadata({ params }: { params: { username: string } }) {
    const supabase = createClient()

    let { data: profile } = await supabase
        .from("profiles")
        .select("full_name, headline")
        .eq("username", params.username)
        .maybeSingle()

    if (!profile) {
        const { data: profileById } = await supabase
            .from("profiles")
            .select("full_name, headline")
            .eq("id", params.username)
            .maybeSingle()
        profile = profileById
    }

    if (!profile) return { title: "Portfolio Not Found" }

    return {
        title: `${profile.full_name} | ${profile.headline}`,
        description: profile.headline,
    }
}

export default async function PortfolioPage({ params }: { params: { username: string } }) {
    const supabase = createClient()

    // First try to find by username (the pretty URL slug)
    let { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", params.username)
        .maybeSingle()

    // Fallback: maybe it's a UUID (old-style links)
    if (!profile) {
        const { data: profileById } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", params.username)
            .maybeSingle()
        profile = profileById
    }

    if (!profile) return notFound()

    // Get the theme configuration
    const theme = getTheme(profile.theme)

    // Track page view asynchronously
    supabase.from("portfolio_views").insert([{ profile_id: profile.id }])

    const [
        { data: projects },
        { data: experiences },
        { data: skills },
        { data: certificates },
        { data: awards },
        { data: education }
    ] = await Promise.all([
        supabase.from("projects").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }),
        supabase.from("experiences").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }),
        supabase.from("skills").select("*").eq("user_id", profile.id).order("level", { ascending: false }),
        supabase.from("certificates").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }),
        supabase.from("awards").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }),
        supabase.from("education").select("*").eq("user_id", profile.id).order("created_at", { ascending: false })
    ])

    return (
        <div className={`min-h-screen ${theme.styles.sectionClass} text-${theme.colors.text} font-sans selection:bg-indigo-500/30 pb-20 scroll-smooth`}>

            {/* Sticky Navigation */}
            <nav className={`sticky top-0 z-50 w-full border-b border-${theme.colors.border}/50 bg-${theme.colors.cardBg}/70 backdrop-blur-xl supports-[backdrop-filter]:bg-${theme.colors.cardBg}/60 transition-all`}>
                <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
                    <span className={`font-bold tracking-tight text-${theme.colors.text}`}>{profile.full_name}</span>
                    <div className="hidden lg:flex gap-8 text-[13px] font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                        {profile.bio && <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>}
                        {(experiences?.length ?? 0) > 0 && <a href="#experience" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Experience</a>}
                        {(projects?.length ?? 0) > 0 && <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Projects</a>}
                        {(skills?.length ?? 0) > 0 && <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Skills</a>}
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button asChild size="sm" className="rounded-full px-6 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white shadow-md shadow-slate-900/10">
                            <a href="#contact">Hire Me</a>
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 max-w-6xl mt-16 md:mt-24">

                {/* Hero Section */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-16 md:pb-24 border-b border-slate-200">
                    <div className="max-w-4xl space-y-6">
                        {/* Avatar */}
                        {profile.avatar_url && (
                            <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0 mb-6">
                                <Image
                                    src={profile.avatar_url}
                                    alt={profile.full_name || "Avatar"}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                        )}
                        <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-extrabold tracking-tight text-slate-900">
                            {profile.full_name || "Professional"}
                        </h1>
                        <h2 className="text-xl md:text-3xl text-slate-500 font-medium leading-snug max-w-3xl">
                            {profile.headline || "Digital Portfolio"}
                        </h2>
                        
                        {/* Contact Information */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            {profile.location && (
                                <div className="inline-flex items-center text-sm font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
                                    <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                                    {profile.location}
                                </div>
                            )}
                            {profile.phone && (
                                <div className="inline-flex items-center text-sm font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
                                    <Phone className="h-4 w-4 mr-2 text-indigo-500" />
                                    {profile.phone}
                                </div>
                            )}
                            {profile.email && (
                                <a href={`mailto:${profile.email}`} className="inline-flex items-center text-sm font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                                    <Mail className="h-4 w-4 mr-2 text-indigo-500" />
                                    {profile.email}
                                </a>
                            )}
                        </div>

                        {/* Social Links */}
                        {(profile.linkedin_url || profile.github_url || profile.website_url) && (
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                {profile.linkedin_url && (
                                    <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                        <Linkedin className="h-4 w-4 mr-2" />
                                        LinkedIn
                                    </a>
                                )}
                                {profile.github_url && (
                                    <a href={profile.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                        <Github className="h-4 w-4 mr-2" />
                                        GitHub
                                    </a>
                                )}
                                {profile.website_url && (
                                    <a href={profile.website_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                        <Globe className="h-4 w-4 mr-2" />
                                        Website
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-16 md:pt-24 relative">

                    {/* Left Column: Context & Skills (Sticky) */}
                    <div className="lg:col-span-4 relative">
                        <div className="lg:sticky lg:top-32 space-y-12">
                            {/* Professional Summary Section */}
                            {profile.bio && (
                                <section id="about" className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                                    <h3 className="text-[13px] font-bold tracking-widest uppercase text-slate-400 mb-6">Professional Summary</h3>
                                    <p className="leading-relaxed text-slate-700 font-medium text-base whitespace-pre-wrap">
                                        {profile.bio}
                                    </p>
                                </section>
                            )}

                            {/* Skills Section */}
                            {skills && skills.length > 0 && (
                                <section id="skills" className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                                    <h3 className="text-[13px] font-bold tracking-widest uppercase text-slate-400 mb-6">Core Competencies</h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {skills.map((skill: any) => (
                                            <div key={skill.id} className="inline-flex items-center bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5 text-sm font-semibold text-slate-700">
                                                <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-indigo-500" />
                                                {skill.skill_name}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Experience, Projects, Awards */}
                    <div className="lg:col-span-8 space-y-32">

                        {/* Experience Section - Vertical Timeline */}
                        {experiences && experiences.length > 0 && (
                            <section id="experience" className="space-y-10">
                                <h3 className="text-[13px] font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-slate-300" /> Professional Experience
                                </h3>
                                <div className="relative border-l-2 border-slate-100 ml-3 md:ml-0 space-y-12 pb-4">
                                    {experiences.map((exp: any, index: number) => (
                                        <div key={exp.id} className="relative pl-8 md:pl-12">
                                            {/* Timeline Dot */}
                                            <div className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full bg-white border-4 border-indigo-100 ring-2 ring-white"></div>

                                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3 gap-2">
                                                <h4 className="text-xl font-bold text-slate-900">{exp.role}</h4>
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded w-fit inline-block">
                                                    {exp.duration}
                                                </span>
                                            </div>
                                            <div className="text-indigo-600 font-semibold mb-4">{exp.company}</div>
                                            <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education Section */}
                        {education && education.length > 0 && (
                            <section id="education" className="space-y-10">
                                <h3 className="text-[13px] font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-slate-300" /> Education
                                </h3>
                                <div className="space-y-6">
                                    {education.map((edu: any) => (
                                        <div key={edu.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-slate-900">{edu.degree}</h4>
                                                    {edu.field_of_study && (
                                                        <p className="text-sm font-semibold text-indigo-600 mt-1">{edu.field_of_study}</p>
                                                    )}
                                                </div>
                                                {edu.grade && (
                                                    <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
                                                        {edu.grade}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-base font-bold text-slate-700 mb-2">{edu.institution}</div>
                                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                                {(edu.start_date || edu.end_date) && (
                                                    <span className="font-semibold text-slate-500">
                                                        {edu.start_date && edu.end_date ? `${edu.start_date} - ${edu.end_date}` : edu.start_date || edu.end_date}
                                                    </span>
                                                )}
                                                {edu.location && (
                                                    <span className="font-medium text-slate-500">
                                                        • {edu.location}
                                                    </span>
                                                )}
                                            </div>
                                            {edu.description && (
                                                <p className="text-sm font-medium text-slate-600 leading-relaxed pt-3 mt-3 border-t border-slate-100">
                                                    {edu.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects Section */}
                        {projects && projects.length > 0 && (
                            <section id="projects" className="space-y-10">
                                <h3 className="text-[13px] font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">
                                    <ExternalLink className="h-4 w-4 text-slate-300" /> Selected Works
                                </h3>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {projects.map((project: any) => (
                                        <div key={project.id} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-200 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                                            {/* Simulated large image preview header */}
                                            <div className="h-32 bg-slate-50 border-b border-slate-100 p-6 flex items-end justify-between relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <h4 className="text-xl font-bold text-slate-900 relative z-10">{project.title}</h4>
                                                <div className="flex gap-2 relative z-10">
                                                    {project.github_url && (
                                                        <a href={project.github_url} target="_blank" rel="noreferrer" className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-colors">
                                                            <Github className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                    {project.demo_url && (
                                                        <a href={project.demo_url} target="_blank" rel="noreferrer" className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-colors">
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <p className="text-sm font-semibold text-slate-500 mb-4">{project.short_description}</p>
                                                <p className="text-sm text-slate-600 leading-relaxed font-medium flex-1">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-6">
                                                    {project.tech_stack?.map((tech: string, i: number) => (
                                                        <span key={i} className="text-[10px] font-bold tracking-wider uppercase text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Credentials Section */}
                        {((certificates?.length ?? 0) > 0 || (awards?.length ?? 0) > 0) && (
                            <section className="space-y-10">
                                <h3 className="text-[13px] font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">
                                    <Award className="h-4 w-4 text-slate-300" /> Credentials & Honours
                                </h3>
                                <div className="space-y-4">
                                    {/* Certificates */}
                                    {certificates?.map((cert: any) => (
                                        <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 transition-colors shadow-sm">
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 shrink-0 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 hidden sm:flex">
                                                    <Award className="h-5 w-5 text-indigo-500" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{cert.title}</h4>
                                                    <p className="text-sm font-medium text-slate-500 mt-1">{cert.issuer} {cert.issue_date && `• ${cert.issue_date}`}</p>
                                                </div>
                                            </div>
                                            {cert.file_url && (
                                                <Button variant="outline" size="sm" asChild className="mt-4 sm:mt-0 shrink-0 rounded-full font-semibold px-4 border-slate-200 hover:bg-slate-50 hover:text-indigo-600 text-slate-600">
                                                    <a href={cert.file_url} target="_blank" rel="noreferrer">View Credential <ChevronRight className="h-3 w-3 ml-1" /></a>
                                                </Button>
                                            )}
                                        </div>
                                    ))}

                                    {/* Awards */}
                                    {awards?.map((award: any) => (
                                        <div key={award.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-slate-200 bg-white shadow-sm border-l-4 border-l-indigo-500">
                                            <div className="flex-1 pr-6">
                                                <h4 className="font-bold text-slate-900">{award.title}</h4>
                                                {award.description && (
                                                    <p className="text-sm font-medium text-slate-600 mt-2">{award.description}</p>
                                                )}
                                            </div>
                                            {award.date && (
                                                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 bg-slate-100 px-3 py-1 rounded shrink-0 mt-4 sm:mt-0">
                                                    {award.date}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                </div>

                {/* Contact Footer */}
                <section id="contact" className="py-32 border-t border-slate-200 mt-32 text-center">
                    <div className="max-w-2xl mx-auto space-y-8 flex flex-col items-center">
                        <div className="h-16 w-16 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-center mb-4">
                            <Mail className="h-8 w-8 text-indigo-600 stroke-[1.5]" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                            Let&apos;s build something <br className="hidden md:block" /> meaningful together.
                        </h2>
                        <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 hover:-translate-y-1 transition-transform">
                            Get In Touch
                        </Button>
                    </div>
                </section>

            </main>

            <footer className="text-center pb-8 pt-8">
                <p className="text-xs font-semibold text-slate-400">
                    Built with <a href="/" className="text-indigo-500 hover:text-indigo-600 transition-colors">Profolio 1.0</a>
                </p>
            </footer>
        </div>
    )
}
