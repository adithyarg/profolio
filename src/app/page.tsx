import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Layout, Globe, ArrowRight, CheckCircle2, Zap, Shield, Rocket } from "lucide-react"
import { FloatingElements } from "@/components/floating-elements"
import { StatsSection } from "@/components/stats-section"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      <FloatingElements />

      {/* Navigation */}
      <header className="px-6 lg:px-16 h-24 flex items-center justify-between border-b border-slate-200/60 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <Link className="flex items-center gap-3 font-bold text-2xl tracking-tight text-slate-900 transition-all duration-300 hover:scale-105" href="/">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <span className="text-white font-extrabold text-lg">P</span>
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Profolio</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link className="text-base font-semibold text-slate-600 hover:text-indigo-600 transition-all duration-200 min-h-[44px] flex items-center relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all after:duration-300" href="/login">
            Sign in
          </Link>
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-full px-8 h-12 shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40 transition-all duration-300 hover:scale-105 font-semibold">
            <Link href="/register">Get Started Free</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">

        {/* Premium Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-40 lg:pt-44 lg:pb-52">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-60" aria-hidden="true"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]" aria-hidden="true"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" aria-hidden="true"></div>
          
          <div className="container px-6 mx-auto grid lg:grid-cols-2 gap-20 items-center relative">

            {/* Left Narrative */}
            <div className="space-y-12 z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-full border-2 border-indigo-600/30 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-5 py-2.5 text-sm font-bold shadow-lg shadow-indigo-600/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-600/20">
                  <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
                  The Future of Professional Portfolios
                </div>
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1]">
                  <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">Your Career.</span>
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">One Powerful Link.</span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-600 max-w-2xl leading-relaxed font-medium">
                  Build a <span className="text-indigo-600 font-bold">stunning portfolio</span> that recruiters love. No design skills needed. Just your story, beautifully told.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <Button asChild size="lg" className="h-16 px-10 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-2xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 transition-all duration-300 font-bold">
                  <Link href="/register" className="flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Create Your Portfolio
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg rounded-2xl border-2 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 font-semibold hover:scale-105 hidden sm:inline-flex">
                  <Link href="/adithyarg" className="flex items-center gap-2">
                    View Live Demo
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="pt-10 flex items-center gap-6 border-t-2 border-slate-200">
                <div className="flex -space-x-3" aria-hidden="true">
                  <div className="h-12 w-12 rounded-full border-4 border-white bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg"></div>
                  <div className="h-12 w-12 rounded-full border-4 border-white bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg"></div>
                  <div className="h-12 w-12 rounded-full border-4 border-white bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg"></div>
                  <div className="h-12 w-12 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"></div>
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900">
                    Join 1,000+ professionals
                  </p>
                  <p className="text-sm text-slate-600">
                    Trusted by engineers, designers & creators
                  </p>
                </div>
              </div>
            </div>

            {/* Right Mockup Preview */}
            <div className="relative z-10 hidden lg:block animate-in fade-in zoom-in-95 duration-1000 delay-150 perspective-1000">
              <div className="relative rounded-3xl bg-white border-2 border-slate-200 shadow-2xl p-8 transform-3d animate-tilt hover:scale-105 transition-all duration-500 hover:shadow-indigo-500/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-4 w-4 rounded-full bg-red-500 shadow-lg animate-pulse" aria-hidden="true"></div>
                  <div className="h-4 w-4 rounded-full bg-amber-500 shadow-lg animate-pulse" style={{ animationDelay: "0.2s" }} aria-hidden="true"></div>
                  <div className="h-4 w-4 rounded-full bg-green-500 shadow-lg animate-pulse" style={{ animationDelay: "0.4s" }} aria-hidden="true"></div>
                  <div className="ml-6 h-8 bg-slate-100 rounded-lg w-3/4 flex items-center px-4 text-xs text-slate-500 font-mono font-semibold">
                    profolio.app/yourname
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="h-12 w-4/5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse" aria-hidden="true"></div>
                    <div className="h-6 w-3/5 bg-slate-100 rounded-lg animate-pulse" style={{ animationDelay: "0.1s" }} aria-hidden="true"></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-20 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-full shadow-sm animate-pulse" style={{ animationDelay: "0.2s" }} aria-hidden="true"></div>
                    <div className="h-8 w-24 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full shadow-sm animate-pulse" style={{ animationDelay: "0.3s" }} aria-hidden="true"></div>
                    <div className="h-8 w-16 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full shadow-sm animate-pulse" style={{ animationDelay: "0.4s" }} aria-hidden="true"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-28 w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow" aria-hidden="true"></div>
                    <div className="h-28 w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow" aria-hidden="true"></div>
                  </div>
                </div>
              </div>

              {/* Decorative background elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-[120px] -z-10 rounded-full pointer-events-none animate-pulse" aria-hidden="true"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl -z-10 animate-float" aria-hidden="true"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -z-10 animate-float-delayed" aria-hidden="true"></div>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"></div>
          
          <div className="container mx-auto px-6 max-w-7xl relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-4 py-2 text-sm font-bold mb-6 animate-bounce">
                <Zap className="h-4 w-4 mr-2" />
                Lightning Fast Setup
              </div>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
                Built for <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Speed & Impact</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Everything you need to create a professional portfolio that gets you noticed
              </p>
            </div>
            
            <div className="grid gap-10 md:grid-cols-3">
              <div className="group relative bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 border-2 border-slate-200 hover:border-indigo-300 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-xl shadow-indigo-500/30 mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Layout className="h-8 w-8 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Add Once, Shine Forever</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">Input your career milestones, projects, and skills. Our intelligent system handles the beautiful design automatically.</p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 border-2 border-slate-200 hover:border-purple-300 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl shadow-purple-500/30 mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Globe className="h-8 w-8 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Share Everywhere</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">Get a clean, memorable URL that looks stunning on any device. Perfect for LinkedIn, email signatures, and networking.</p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 border-2 border-slate-200 hover:border-green-300 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl shadow-green-500/30 mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Zap className="h-8 w-8 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Always Up-to-Date</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">Update your portfolio in seconds. Changes go live instantly—no deployments, no waiting, no hassle.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Why Choose Section */}
        <section className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]" aria-hidden="true"></div>
          
          <div className="container mx-auto px-6 max-w-6xl relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center rounded-full bg-purple-50 text-purple-700 px-4 py-2 text-sm font-bold mb-6">
                <Shield className="h-4 w-4 mr-2" />
                Trusted by Professionals
              </div>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
                Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Profolio</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Stand out from the crowd with a portfolio that showcases your work, not just lists it
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="group bg-white rounded-3xl p-10 border-2 border-slate-200 hover:border-green-300 shadow-lg hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle2 className="h-7 w-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Recruiter-Friendly Format</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">Optimized for how recruiters actually review candidates. Clean layout, easy navigation, and all the information they need at their fingertips.</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white rounded-3xl p-10 border-2 border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                    <Sparkles className="h-7 w-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">No Design Skills Required</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">Focus on your content, not design. Our platform automatically creates a beautiful, professional portfolio that adapts to your information.</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white rounded-3xl p-10 border-2 border-slate-200 hover:border-purple-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-500">
                    <Zap className="h-7 w-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Instant Updates</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">Landed a new project? Got certified? Update your portfolio in seconds and share the same link. No need to regenerate or resend anything.</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white rounded-3xl p-10 border-2 border-slate-200 hover:border-amber-300 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-500">
                    <Globe className="h-7 w-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Perfect for All Devices</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">Whether viewed on a phone during a commute or a desktop in an office, your portfolio looks pixel-perfect everywhere.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"></div>
          
          <div className="container mx-auto px-6 max-w-5xl relative">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
                Got <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Questions?</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">Everything you need to know about Profolio</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-3">How is Profolio different from a PDF resume?</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Unlike static PDFs, Profolio creates a dynamic, interactive portfolio that's always up-to-date. Recruiters can easily navigate through your experience, view your projects with live links, and access everything from a single shareable URL.</p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-3">How long does it take to create my portfolio?</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Most users have a complete portfolio ready in under 10 minutes. Simply fill in your information through our intuitive dashboard, and your professional portfolio is instantly live.</p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Can I customize how my portfolio looks?</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Your portfolio follows a clean, professional design that's proven to work with recruiters. You have full control over your content, including your bio, projects, skills, and achievements.</p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Is my information secure?</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Absolutely. We use industry-standard security practices to protect your data. Your information is stored securely, and you maintain full control over what's displayed publicly.</p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Can I use Profolio for different industries?</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Yes! Profolio works for any profession - from software engineers and designers to marketers, consultants, and beyond. The flexible structure adapts to showcase your unique experience.</p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 mb-3">What if I don't have much experience yet?</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Profolio is perfect for professionals at any career stage. Whether you're a student with academic projects or a seasoned professional, our platform helps you present your experience in the best possible light.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" aria-hidden="true"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl" aria-hidden="true"></div>
          
          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 text-sm font-bold mb-8 border border-white/20">
              <Rocket className="h-4 w-4 mr-2" />
              Start Your Journey Today
            </div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-8 leading-tight">
              Ready to Stand Out?
            </h2>
            <p className="text-2xl text-indigo-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Join thousands of professionals who've ditched the PDF resume for something better. Create your stunning portfolio in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="h-16 px-12 text-lg bg-white text-indigo-600 hover:bg-slate-50 rounded-2xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 font-bold">
                <Link href="/register" className="flex items-center gap-3">
                  <Rocket className="h-5 w-5" />
                  Get Started Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-12 text-lg rounded-2xl border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-semibold hover:scale-105 hover:border-white/50">
                <Link href="/adithyarg" className="flex items-center gap-3">
                  View Live Demo
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="text-indigo-200 mt-8 text-sm">No credit card required • Setup in 10 minutes • Cancel anytime</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 font-bold text-white">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm shadow-lg">P</div>
            <span className="text-2xl">Profolio</span>
          </div>
          <p className="text-base font-medium text-slate-400">© 2026 Profolio Inc. All rights reserved.</p>
          <div className="flex gap-8 text-base font-semibold text-slate-400">
            <a href="#" className="hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
