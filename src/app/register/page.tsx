import Link from "next/link"
import { signup } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4">
            <Card className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                    {searchParams?.error && (
                        <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm mt-4">
                            {searchParams.error}
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <form action={signup}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input id="firstName" name="firstName" placeholder="Max" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input id="lastName" name="lastName" placeholder="Robinson" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="maxrobinson"
                                    required
                                />
                            </div>
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
                                Create an account
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
