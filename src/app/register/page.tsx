import Link from "next/link"
import { signup } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from "lucide-react"

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center py-12 px-4 bg-slate-50 overflow-hidden font-sans selection:bg-indigo-500/30">
            {/* Background decorative blurs */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3"></div>

            <div className="w-full max-w-[460px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
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
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create your account</h1>
                        <p className="text-sm font-medium text-slate-500">
                            Join ambitious professionals building their identity.
                        </p>
                    </div>

                    {searchParams?.error && (
                        <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-lg text-sm font-medium mb-6 text-center">
                            {searchParams.error}
                        </div>
                    )}

                    <form action={signup} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-slate-500">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="h-11 rounded-xl border-slate-200 px-4 focus-visible:ring-offset-0 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 bg-slate-50/50 font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        required
                                        className="h-11 rounded-xl border-slate-200 px-4 focus-visible:ring-offset-0 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 bg-slate-50/50 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    required
                                    placeholder="e.g. alexsmith"
                                    className="h-11 rounded-xl border-slate-200 px-4 focus-visible:ring-offset-0 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 bg-slate-50/50 placeholder:text-slate-400 font-medium"
                                />
                                <p className="text-[11px] font-medium text-slate-400 px-1">Your portfolio will be profolio.com/<span className="text-slate-600">username</span></p>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="h-11 rounded-xl border-slate-200 px-4 focus-visible:ring-offset-0 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 bg-slate-50/50 placeholder:text-slate-400 font-medium"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="h-11 rounded-xl border-slate-200 px-4 focus-visible:ring-offset-0 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 bg-slate-50/50 font-medium"
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 transition-all">
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm font-medium text-slate-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline underline-offset-4">
                            Sign in
                        </Link>
                    </div>
                </div>

                {/* Reassurance text */}
                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    Your data is completely private and secure.
                </div>
            </div>
        </div>
    )
}
