import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
        <h1 className="text-5xl font-black text-slate-900 mb-6">Terms of Service</h1>
        <p className="text-lg text-slate-600 mb-12">Last updated: March 3, 2026</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing or using Profolio 1.0, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Use of Service</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Profolio 1.0 provides a platform for creating and hosting professional portfolios. You agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Not use the service for any illegal or unauthorized purpose</li>
              <li>Not violate any laws in your jurisdiction</li>
              <li>Not impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">User Content</h2>
            <p className="text-slate-600 leading-relaxed">
              You retain all rights to the content you upload to Profolio 1.0. By uploading content, you grant us 
              a license to display, store, and distribute your content as necessary to provide the service. 
              You are responsible for ensuring you have the right to share any content you upload.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Account Termination</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violations of these terms. 
              You may delete your account at any time through your dashboard settings.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              The Profolio 1.0 platform, including its design, features, and functionality, is owned by Profolio 1.0 Inc. 
              and is protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Disclaimer of Warranties</h2>
            <p className="text-slate-600 leading-relaxed">
              Profolio 1.0 is provided "as is" without warranties of any kind, either express or implied. 
              We do not guarantee that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              Profolio 1.0 Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes. 
              Your continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at legal@profolio.com
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
