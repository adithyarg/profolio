import Link from "next/link"
import { login } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
    return (
        <div className="flex h-screen w-full items-center justify-center -px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    {searchParams?.error && (
                        <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm mt-4">
                            {searchParams.error}
                        </div>
                    )}
                    {searchParams?.message && (
                        <div className="bg-primary/15 text-primary p-3 rounded-md text-sm mt-4">
                            {searchParams.message}
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <form action={login}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
