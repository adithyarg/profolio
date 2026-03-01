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
                  <Link href="/devgaming">See Example</Link>
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
