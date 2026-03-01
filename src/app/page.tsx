import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Layout, Globe, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center font-bold text-xl tracking-tight" href="#">
          Profolio
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-48 text-center bg-muted/40 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10 max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your Professional Identity, <br />
              <span className="text-primary">Beautifully Simplified.</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-balance">
              Create one professional portfolio link instead of resumes. Showcase your projects, experience, skills, and awards in a single dynamic page.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/register">
                  Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/login">Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-24 border-t bg-background">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Built for Modern Professionals</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                  <Layout className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Auto-Generated</h3>
                <p className="text-muted-foreground">Just fill in your details and we instantly build a mobile-responsive, beautifully designed portfolio.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Custom URL</h3>
                <p className="text-muted-foreground">Share your unique profolio.vercel.app/username link with recruiters and network easily.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">AI-Ready</h3>
                <p className="text-muted-foreground">Architecture prepared for future AI enhancements to automatically improve your descriptions.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2026 Profolio Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <span className="text-xs hover:underline underline-offset-4 pointer-events-none opacity-50">Terms of Service</span>
          <span className="text-xs hover:underline underline-offset-4 pointer-events-none opacity-50">Privacy Policy</span>
        </nav>
      </footer>
    </div>
  )
}
