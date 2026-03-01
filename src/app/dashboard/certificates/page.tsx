import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Award, FileText } from "lucide-react"

async function createCertificate(formData: FormData) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    let file_url = ""

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
        file_url: file_url || null,
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
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Certificates</h1>
                <p className="text-base font-medium text-slate-500">Manage your verified credentials and courses.</p>
            </div>

            {/* List Existing Certificates */}
            <div className="space-y-6 border-b pb-12">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Award className="h-5 w-5 text-indigo-600" /> Your Credentials
                </h2>

                {!certificates || certificates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                            <Award className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No certificates added</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">
                            Showcase your continuous learning by adding a course or certificate.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {certificates.map((cert: any) => (
                            <div key={cert.id} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between h-full">
                                <form action={async () => {
                                    "use server"
                                    await deleteCertificate(cert.id)
                                }} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </form>

                                <div className="space-y-2 pr-10 mb-6">
                                    <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 mb-4">
                                        <Award className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <h3 className="font-bold leading-tight text-slate-900">{cert.title}</h3>
                                    <p className="text-sm font-semibold text-slate-500">{cert.issuer}</p>
                                    {cert.issue_date && (
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{cert.issue_date}</p>
                                    )}
                                </div>

                                <div className="mt-auto border-t border-slate-100 pt-4">
                                    {cert.file_url ? (
                                        <a href={cert.file_url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors w-fit">
                                            <FileText className="h-4 w-4 mr-2" /> View Document
                                        </a>
                                    ) : (
                                        <span className="flex items-center text-xs font-medium text-slate-400">
                                            No file attached
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add New Form */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
                <div className="space-y-1 mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Add a Certificate</h2>
                    <p className="text-sm font-medium text-slate-500">Add the details and optionally upload the PDF or image file.</p>
                </div>

                <form action={createCertificate}>
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2 lg:col-span-2">
                                <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Certificate Name *</Label>
                                <Input id="title" name="title" required placeholder="e.g. AWS Certified Developer" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="issuer" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Issuing Organization *</Label>
                                <Input id="issuer" name="issuer" required placeholder="e.g. Amazon Web Services" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="issue_date" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Date Issued</Label>
                                <Input id="issue_date" name="issue_date" type="text" placeholder="e.g. Oct 2023" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium" />
                            </div>
                        </div>

                        <div className="space-y-2 border-t pt-8">
                            <Label htmlFor="file" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Upload PDF or Image (Optional)</Label>
                            <Input id="file" name="file" type="file" accept="image/*,.pdf" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium text-slate-600 file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-indigo-600" />
                            <p className="text-[11px] font-medium text-slate-400">File will be stored securely on Supabase Storage.</p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
                                Upload Certificate
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
