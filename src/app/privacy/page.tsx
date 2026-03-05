import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="px-6 lg:px-16 h-24 flex items-center justify-between border-b border-slate-200/60 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <Link className="flex items-center gap-3 font-bold text-2xl tracking-tight text-slate-900" href="/">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <span className="text-white font-extrabold text-lg">P</span>
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Profolio 1.0</span>
        </Link>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </header>

      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <h1 className="text-5xl font-black text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-lg text-slate-600 mb-12">Last updated: March 3, 2026</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              Welcome to Profolio 1.0. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Account information (name, email, username)</li>
              <li>Profile information (bio, headline, location, contact details)</li>
              <li>Professional information (experience, education, projects, skills)</li>
              <li>Uploaded files (profile pictures, certificates)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Create and maintain your portfolio</li>
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Information Sharing</h2>
            <p className="text-slate-600 leading-relaxed">
              Your portfolio information is publicly accessible through your custom URL. We do not sell your personal 
              information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@profolio.com
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-16 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 font-bold text-white">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm shadow-lg">P</div>
            <span className="text-2xl">Profolio 1.0</span>
          </div>
          <p className="text-base font-medium text-slate-400">© 2026 Profolio 1.0 Inc. All rights reserved.</p>
          <div className="flex gap-8 text-base font-semibold text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
