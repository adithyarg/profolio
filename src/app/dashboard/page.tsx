import { createClient } from "@/lib/supabase/server"
import { updateProfile } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardProfilePage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    Update your public profile information.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                        This information will be displayed on your generated portfolio.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={updateProfile}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Full Name</Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    defaultValue={profile?.full_name || ""}
                                    placeholder="Max Robinson"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="headline">Headline</Label>
                                <Input
                                    id="headline"
                                    name="headline"
                                    defaultValue={profile?.headline || ""}
                                    placeholder="Senior Software Engineer at TechCorp"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    defaultValue={profile?.location || ""}
                                    placeholder="San Francisco, CA"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="bio">Bio</Label>
                                {/* We use textarea manually or shadcn Textarea. We haven't installed it, so fallback to HTML textarea styled with tailwind */}
                                <textarea
                                    id="bio"
                                    name="bio"
                                    defaultValue={profile?.bio || ""}
                                    rows={5}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <Button type="submit">Save Profile</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
