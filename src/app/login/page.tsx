import Link from "next/link"
import { login } from "./actions"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

export default function LoginPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center p-4 bg-slate-50 overflow-hidden font-sans selection:bg-indigo-500/30">
            {/* Background decorative blurs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

            <div className="w-full max-w-[420px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Logo Area */}
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-extrabold text-sm">P</span>
                        </div>
                        Profolio
                    </Link>
                </div>

                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl p-8 sm:p-10">
                    <div className="text-center space-y-2 mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h1>
                        <p className="text-sm font-medium text-slate-500">
                            Enter your credentials to access your dashboard.
                        </p>
                    </div>

                    {searchParams?.error && (
                        <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-lg text-sm font-medium mb-6 text-center">
                            {searchParams.error}
                        </div>
                    )}
                    {searchParams?.message && (
                        <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 p-3 rounded-lg text-sm font-medium mb-6 text-center">
                            {searchParams.message}
                        </div>
                    )}

                    <form action={login} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="h-12 rounded-xl border-slate-200 px-4 focus-visible:ring-offset-0 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 bg-slate-50/50 placeholder:text-slate-400 font-medium"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Password</Label>
                                    <Link href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Forgot password?</Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="h-12 rounded-xl border-slate-200 px-4 focus-visible:ring-offset-0 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 bg-slate-50/50 font-medium"
                                />
                            </div>
                        </div>

                        <SubmitButton className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 transition-all">
                            Sign in to Profolio
                        </SubmitButton>
                    </form>

                    <div className="mt-8 text-center text-sm font-medium text-slate-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold under hover:underline underline-offset-4">
                            Create one now
                        </Link>
                    </div>
                </div>

                {/* Reassurance text */}
                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                    <Lock className="h-3 w-3" />
                    Secure login encrypted with industry standards.
                </div>
            </div>
        </div>
    )
}
