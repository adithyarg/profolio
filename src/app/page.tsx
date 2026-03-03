import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, CheckCircle2, Zap, Shield, Rocket, Star, TrendingUp, Users, Layout, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30 relative overflow-x-hidden">
      
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

        {/* Stats Section - Full Width */}
        <section className="py-32 bg-gradient-to-b from-black to-indigo-950/20 relative overflow-hidden border-y border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]"></div>
          
          <div className="container mx-auto px-6 max-w-7xl relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, value: "1,247", label: "Active Users", color: "from-indigo-500 to-indigo-600" },
                { icon: TrendingUp, value: "3,891", label: "Portfolios Created", color: "from-purple-500 to-purple-600" },
                { icon: Star, value: "125K+", label: "Profile Views", color: "from-pink-500 to-pink-600" },
                { icon: CheckCircle2, value: "98%", label: "Satisfaction", color: "from-green-500 to-green-600" }
              ].map((stat, index) => (
                <div key={index} className="group text-center">
                  <div className={`inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon className="h-8 w-8 stroke-[2]" />
                  </div>
                  <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-sm font-bold text-white/60 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Dark */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          
          <div className="container mx-auto px-6 max-w-7xl relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center rounded-full bg-white/5 border border-white/10 text-white px-6 py-3 text-sm font-bold mb-8 backdrop-blur-xl">
                <Zap className="h-5 w-5 mr-2" />
                Lightning Fast Setup
              </div>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-6">
                Built for <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Speed & Impact</span>
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Everything you need to create a professional portfolio that gets you noticed
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: Layout, title: "Add Once, Shine Forever", desc: "Input your career milestones, projects, and skills. Our intelligent system handles the beautiful design automatically.", color: "from-indigo-500 to-indigo-600" },
                { icon: Globe, title: "Share Everywhere", desc: "Get a clean, memorable URL that looks stunning on any device. Perfect for LinkedIn, email signatures, and networking.", color: "from-purple-500 to-purple-600" },
                { icon: Zap, title: "Always Up-to-Date", desc: "Update your portfolio in seconds. Changes go live instantly—no deployments, no waiting, no hassle.", color: "from-pink-500 to-pink-600" }
              ].map((feature, index) => (
                <div key={index} className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                      <feature.icon className="h-8 w-8 stroke-[2]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed text-lg">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Full Screen */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-float-delayed"></div>
          
          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <div className="space-y-12">
              <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm text-white px-6 py-3 text-sm font-bold border border-white/20">
                <Rocket className="h-5 w-5 mr-2" />
                Start Your Journey Today
              </div>
              <h2 className="text-5xl lg:text-8xl font-black tracking-tight text-white leading-tight">
                Ready to Stand Out?
              </h2>
              <p className="text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
                Join thousands of professionals who've ditched the PDF resume for something better.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button asChild size="lg" className="h-16 px-12 text-lg bg-white text-indigo-600 hover:bg-slate-50 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 font-black">
                  <Link href="/register" className="flex items-center gap-3">
                    <Rocket className="h-6 w-6" />
                    Get Started Free
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-12 text-lg rounded-full border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-bold hover:scale-110 bg-transparent">
                  <Link href="/adithyarg" className="flex items-center gap-3">
                    View Live Demo
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </Button>
              </div>
              <p className="text-white/70 text-sm">No credit card required • Setup in 10 minutes • Cancel anytime</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 font-bold text-white">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl">P</div>
            <span className="text-2xl">Profolio</span>
          </div>
          <p className="text-base font-medium text-white/50">© 2026 Profolio Inc. All rights reserved.</p>
          <div className="flex gap-8 text-base font-semibold text-white/50">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
