import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, CheckCircle2, Zap, Shield, Rocket, Star, TrendingUp, Users } from "lucide-react"
import { FloatingElements } from "@/components/floating-elements"
import { StatsSection } from "@/components/stats-section"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 px-8 lg:px-16 h-20 flex items-center justify-between bg-black/80 backdrop-blur-2xl z-50 border-b border-white/10">
        <Link className="flex items-center gap-3 font-bold text-2xl tracking-tight transition-all duration-300 hover:scale-105" href="/">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/50">
            <span className="text-white font-extrabold text-lg">P</span>
          </div>
          <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">Profolio</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link className="text-base font-semibold text-white/70 hover:text-white transition-all duration-200 hidden md:block" href="/login">
            Sign in
          </Link>
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full px-8 h-12 shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-300 hover:scale-105 font-bold border-0">
            <Link href="/register">Get Started Free</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 pt-20">

        {/* Hero Section - Full Screen */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-950/20 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)] animate-pulse"></div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float-delayed"></div>
          
          <div className="container px-6 mx-auto relative z-10 text-center">
            <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white px-6 py-3 text-sm font-bold shadow-2xl">
                <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
                The Future of Professional Portfolios
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9]">
                <span className="block bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">Your Career.</span>
                <span className="block mt-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">One Link.</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-4xl mx-auto leading-relaxed font-medium">
                Build a <span className="text-white font-bold">stunning portfolio</span> that recruiters can't ignore. No design skills needed.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button asChild size="lg" className="h-16 px-12 text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:scale-110 transition-all duration-300 font-black border-0">
                  <Link href="/register" className="flex items-center gap-3">
                    <Rocket className="h-6 w-6" />
                    Create Your Portfolio
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-12 text-lg rounded-full border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-xl transition-all duration-300 font-bold hover:scale-110 bg-transparent">
                  <Link href="/adithyarg" className="flex items-center gap-3">
                    View Live Demo
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="pt-16 flex flex-col items-center gap-6">
                <div className="flex -space-x-4">
                  <div className="h-14 w-14 rounded-full border-4 border-black bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-2xl"></div>
                  <div className="h-14 w-14 rounded-full border-4 border-black bg-gradient-to-br from-purple-400 to-purple-600 shadow-2xl"></div>
                  <div className="h-14 w-14 rounded-full border-4 border-black bg-gradient-to-br from-pink-400 to-pink-600 shadow-2xl"></div>
                  <div className="h-14 w-14 rounded-full border-4 border-black bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl"></div>
                </div>
                <p className="text-lg font-bold text-white/70">
                  Join <span className="text-white">1,000+</span> professionals who transformed their career
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
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
