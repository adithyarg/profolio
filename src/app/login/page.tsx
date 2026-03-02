import Link from "next/link"
import { login } from "./actions"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Sparkles } from "lucide-react"

export default function LoginPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden font-sans selection:bg-indigo-500/30">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08),transparent_50%)]" aria-hidden="true"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.06),transparent_50%)]" aria-hidden="true"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true"></div>

            <div className="w-full max-w-[480px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Logo Area */}
                <div className="flex justify-center mb-10">
                    <Link href="/" className="flex items-center gap-3 font-bold text-2xl tracking-tight transition-all duration-300 hover:scale-105">
                        <div className="h-12 w-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                            <span className="text-white font-extrabold text-xl">P</span>
                        </div>
                        <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Profolio</span>
                    </Link>
                </div>

                {/* Main Card */}
                <div className="bg-white/90 backdrop-blur-xl border-2 border-slate-200 shadow-2xl shadow-slate-900/10 rounded-3xl p-10 sm:p-12">
                    <div className="text-center space-y-3 mb-10">
                        <div className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-4 py-2 text-sm font-bold mb-2">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Welcome Back
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900">Sign In</h1>
                        <p className="text-base font-medium text-slate-600">
                            Enter your credentials to access your dashboard
                        </p>
                    </div>

                    {searchParams?.error && (
                        <div className="bg-gradient-to-r from-red-50 to-red-100/50 text-red-700 border-2 border-red-200 p-4 rounded-2xl text-sm font-semibold mb-8 text-center">
                            {searchParams.error}
                        </div>
                    )}
                    {searchParams?.message && (
                        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border-2 border-emerald-200 p-4 rounded-2xl text-sm font-semibold mb-8 text-center">
                            {searchParams.message}
                        </div>
                    )}

                    <form action={login} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="h-14 rounded-2xl border-2 border-slate-200 px-5 text-base focus-visible:ring-offset-0 focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 bg-slate-50/50 placeholder:text-slate-400 font-medium transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-bold text-slate-700">Password</Label>
                                    <Link href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot?</Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="h-14 rounded-2xl border-2 border-slate-200 px-5 text-base focus-visible:ring-offset-0 focus-visible:ring-4 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 bg-slate-50/50 font-medium transition-all"
                                />
                            </div>
                        </div>

                        <SubmitButton className="w-full h-14 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/40 hover:scale-105 transition-all duration-300">
                            Sign In to Dashboard
                        </SubmitButton>
                    </form>

                    <div className="mt-10 text-center text-base font-semibold text-slate-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline underline-offset-4 transition-all">
                            Create one free
                        </Link>
                    </div>
                </div>

                {/* Reassurance text */}
                <div className="mt-8 flex items-center justify-center gap-3 text-sm font-semibold text-slate-500">
                    <Lock className="h-4 w-4 text-indigo-600" />
                    Secure login with industry-standard encryption
                </div>
            </div>
        </div>
    )
}
