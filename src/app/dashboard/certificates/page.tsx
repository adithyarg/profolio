import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

async function createCertificate(formData: FormData) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    let file_url = ""

    // Handle file upload if provided
    const file = formData.get("file") as File
    if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${user.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('certificates')
            .upload(filePath, file)

        if (!uploadError) {
            const { data } = supabase.storage.from('certificates').getPublicUrl(filePath)
            file_url = data.publicUrl
        }
    }

    const certificate = {
        user_id: user.id,
        title: formData.get("title") as string,
        issuer: formData.get("issuer") as string,
        issue_date: formData.get("issue_date") ? formData.get("issue_date") as string : null,
        file_url: file_url,
    }

    await supabase.from("certificates").insert([certificate])
    revalidatePath("/dashboard/certificates")
}

async function deleteCertificate(id: string) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from("certificates").delete().eq("id", id).eq("user_id", user.id)
    revalidatePath("/dashboard/certificates")
}

export default async function CertificatesPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: certificates } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-medium">Certificates</h3>
                <p className="text-sm text-muted-foreground">Manage your credentials and certifications.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add Certificate</CardTitle>
                    <CardDescription>Upload professional certificates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createCertificate} className="grid gap-4 lg:grid-cols-2">
                        <div className="grid gap-2 lg:col-span-2">
                            <Label htmlFor="title">Certificate Title</Label>
                            <Input id="title" name="title" required placeholder="AWS Solutions Architect" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="issuer">Issuer</Label>
                            <Input id="issuer" name="issuer" required placeholder="Amazon Web Services" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="issue_date">Issue Date</Label>
                            <Input id="issue_date" name="issue_date" type="date" />
                        </div>
                        <div className="grid gap-2 lg:col-span-2">
                            <Label htmlFor="file">Upload Certificate (optional)</Label>
                            <Input id="file" name="file" type="file" accept="image/*,.pdf" />
                            <p className="text-xs text-muted-foreground">
                                Ensure a "certificates" bucket is created and set to public in Supabase.
                            </p>
                        </div>
                        <div className="col-span-2">
                            <Button type="submit">Add Certificate</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {certificates?.map((cert) => (
                    <Card key={cert.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">{cert.title}</CardTitle>
                            <CardDescription>{cert.issuer} - {cert.issue_date}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {cert.file_url ? (
                                <a href={cert.file_url} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline">
                                    View Credential Attachment
                                </a>
                            ) : (
                                <span className="text-sm text-muted-foreground">No file attached.</span>
                            )}
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                            <form action={async () => { "use server"; await deleteCertificate(cert.id) }}>
                                <Button variant="destructive" size="sm" type="submit">Delete</Button>
                            </form>
                        </CardFooter>
                    </Card>
                ))}
                {certificates?.length === 0 && <p className="text-muted-foreground col-span-full">No certificates added.</p>}
            </div>
        </div>
    )
}
