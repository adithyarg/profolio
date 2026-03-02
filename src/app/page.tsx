import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Layout, Globe, ArrowRight, CheckCircle2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/30">

      {/* Navigation */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900" href="/">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-extrabold text-sm">P</span>
          </div>
          Profolio
        </Link>
        <nav className="flex items-center gap-6">
          <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="/login">
            Sign in
          </Link>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-sm shadow-indigo-600/20">
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">

        {/* Premium Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="container px-6 mx-auto grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Narrative */}
            <div className="space-y-10 z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-indigo-600/20 bg-indigo-50 text-indigo-700 px-3 py-1 text-sm font-medium">
                  <Sparkles className="h-4 w-4 mr-2" />
                  The new standard for resumes
                </div>
                <h1 className="text-5xl lg:text-[4rem] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
                  Your Professional Identity. <br />
                  <span className="text-indigo-600">One Link.</span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                  Create a stunning, recruiter-focused portfolio in minutes. Never send a PDF resume again.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 transition-all">
                  <Link href="/register">
                    Create Your Portfolio
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-full border-slate-300 text-slate-700 hover:bg-slate-100 hidden sm:inline-flex">
                  <Link href="/adithyarg">See Example</Link>
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="pt-8 flex items-center gap-4 border-t border-slate-200">
                <div className="flex -space-x-2">
                  {/* Avatar Stack placeholders */}
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400"></div>
                </div>
                <p className="text-sm font-medium text-slate-500">
                  Trusted by ambitious engineers and designers.
                </p>
              </div>
            </div>

            {/* Right Mockup Preview */}
            <div className="relative z-10 hidden lg:block animate-in fade-in zoom-in-95 duration-1000 delay-150">
              <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 h-6 bg-slate-100 rounded-md w-3/4 flex items-center px-3 text-[10px] text-slate-400 font-mono">
                    profolio.vercel.app/alex
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="h-10 w-3/4 bg-slate-200 rounded-lg"></div>
                    <div className="h-5 w-1/2 bg-slate-100 rounded-md"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-indigo-100 rounded-full"></div>
                    <div className="h-6 w-20 bg-indigo-100 rounded-full"></div>
                    <div className="h-6 w-14 bg-indigo-100 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-20 w-full bg-slate-50 rounded-xl border border-slate-100"></div>
                    <div className="h-20 w-full bg-slate-50 rounded-xl border border-slate-100"></div>
                  </div>
                </div>
              </div>

              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-600/5 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-16 text-slate-900">Designed for speed and impact</h2>
            <div className="grid gap-12 md:grid-cols-3">
              <div className="space-y-5">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600">
                  <Layout className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Add Once</h3>
                <p className="text-slate-600 leading-relaxed font-medium">Input your career milestones, projects, and skills into our structured dashboard. We handle the design automatically.</p>
              </div>
              <div className="space-y-5">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600">
                  <Globe className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Share Anywhere</h3>
                <p className="text-slate-600 leading-relaxed font-medium">Get a clean, custom URL that looks stunning on desktop and mobile. Perfect for recruiters and networking.</p>
              </div>
              <div className="space-y-5">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600">
                  <CheckCircle2 className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Always Updated</h3>
                <p className="text-slate-600 leading-relaxed font-medium">Adding a new project or certification takes seconds. Your portfolio instantly reflects the changes, no deployments needed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Why professionals choose Profolio</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Stand out from the crowd with a portfolio that showcases your work, not just lists it.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Recruiter-Friendly Format</h3>
                    <p className="text-slate-600 leading-relaxed">Your portfolio is optimized for how recruiters actually review candidates. Clean layout, easy navigation, and all the information they need at their fingertips.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Design Skills Required</h3>
                    <p className="text-slate-600 leading-relaxed">Focus on your content, not design. Our platform automatically creates a beautiful, professional portfolio that adapts to your information.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Instant Updates</h3>
                    <p className="text-slate-600 leading-relaxed">Landed a new project? Got certified? Update your portfolio in seconds and share the same link. No need to regenerate or resend anything.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Perfect for All Devices</h3>
                    <p className="text-slate-600 leading-relaxed">Whether viewed on a phone during a commute or a desktop in an office, your portfolio looks pixel-perfect everywhere.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600">Everything you need to know about Profolio</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">How is Profolio different from a PDF resume?</h3>
                <p className="text-slate-600 leading-relaxed">Unlike static PDFs, Profolio creates a dynamic, interactive portfolio that's always up-to-date. Recruiters can easily navigate through your experience, view your projects with live links, and access everything from a single shareable URL. Plus, you never have to worry about formatting issues or outdated information.</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">How long does it take to create my portfolio?</h3>
                <p className="text-slate-600 leading-relaxed">Most users have a complete portfolio ready in under 10 minutes. Simply fill in your information through our intuitive dashboard, and your professional portfolio is instantly live. You can always come back to add more details or update existing information.</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Can I customize how my portfolio looks?</h3>
                <p className="text-slate-600 leading-relaxed">Your portfolio follows a clean, professional design that's proven to work with recruiters. While the layout is standardized for optimal readability, you have full control over your content, including your bio, projects, skills, and achievements.</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Is my information secure?</h3>
                <p className="text-slate-600 leading-relaxed">Absolutely. We use industry-standard security practices to protect your data. Your information is stored securely, and you maintain full control over what's displayed publicly on your portfolio. We never share your data with third parties.</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Can I use Profolio for different industries?</h3>
                <p className="text-slate-600 leading-relaxed">Yes! Profolio works for any profession - from software engineers and designers to marketers, consultants, and beyond. The flexible structure adapts to showcase your unique experience and achievements, regardless of your field.</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">What if I don't have much experience yet?</h3>
                <p className="text-slate-600 leading-relaxed">Profolio is perfect for professionals at any career stage. Whether you're a student with academic projects, a career changer highlighting transferable skills, or a seasoned professional, our platform helps you present your experience in the best possible light.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-indigo-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
          <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-6">Ready to stand out?</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">Join professionals who've ditched the PDF resume for something better. Create your portfolio in minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-14 px-8 text-base bg-white text-indigo-600 hover:bg-slate-50 rounded-full shadow-xl hover:-translate-y-0.5 transition-all">
                <Link href="/register">
                  Get Started Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-full border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                <Link href="/adithyarg">View Example Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="h-6 w-6 bg-indigo-600 rounded flex items-center justify-center text-white text-[10px]">P</div>
            Profolio
          </div>
          <p className="text-sm font-medium text-slate-500">© 2026 Profolio Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
