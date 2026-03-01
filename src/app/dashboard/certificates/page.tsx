import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Award, FileText, CheckCircle2, AlertCircle } from "lucide-react"
import { DeleteButton } from "@/components/delete-button"

async function createCertificate(formData: FormData) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    let file_url = ""

    const file = formData.get("file") as File
    
    console.log("[Certificate] File received:", file?.name, "size:", file?.size, "type:", file?.type)
    
    if (file && file.size > 0 && file.name !== "undefined") {
        try {
            // Convert file to ArrayBuffer for Supabase
            const arrayBuffer = await file.arrayBuffer()
            const fileExt = file.name.split('.').pop()
            const fileName = `${user.id}-${Date.now()}.${fileExt}`
            const filePath = fileName

            console.log("[Certificate] Uploading to path:", filePath, "size:", file.size)

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('certificates')
                .upload(filePath, arrayBuffer, {
                    contentType: file.type,
                    upsert: true
                })

            if (uploadError) {
                console.error("[Certificate Upload Error]", uploadError.message, uploadError)
                redirect("/dashboard/certificates?error=" + encodeURIComponent(`File upload failed: ${uploadError.message}`))
            }

            if (uploadData) {
                const { data } = supabase.storage.from('certificates').getPublicUrl(filePath)
                file_url = data.publicUrl
                console.log("[Certificate] Uploaded successfully:", file_url)
            }
        } catch (err) {
            console.error("[Certificate] Exception:", err)
            redirect("/dashboard/certificates?error=" + encodeURIComponent("Failed to process certificate file"))
        }
    }

    const month = formData.get("issue_month") as string
    const year = formData.get("issue_year") as string
    const issue_date = (month && year) ? `${month} ${year}` : null

    const certificate = {
        user_id: user.id,
        title: formData.get("title") as string,
        issuer: formData.get("issuer") as string,
        issue_date: issue_date,
        file_url: file_url || null,
    }

    const { error } = await supabase.from("certificates").insert([certificate])
    
    if (error) {
        redirect("/dashboard/certificates?error=" + encodeURIComponent(error.message))
    }

    revalidatePath("/dashboard/certificates")
    redirect("/dashboard/certificates?success=1")
}

async function deleteCertificate(id: string) {
    "use server"
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from("certificates").delete().eq("id", id).eq("user_id", user.id)
    revalidatePath("/dashboard/certificates")
    redirect("/dashboard/certificates?deleted=1")
}

export default async function CertificatesPage({
    searchParams
}: {
    searchParams: { success?: string; error?: string; deleted?: string }
}) {
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
            
            {/* Success / Error Banner */}
            {searchParams?.success && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Certificate added successfully!
                </div>
            )}
            {searchParams?.deleted && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Certificate deleted successfully!
                </div>
            )}
            {searchParams?.error && (
                <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 text-sm font-semibold">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    {decodeURIComponent(searchParams.error)}
                </div>
            )}

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
                                    <DeleteButton itemName="certificate" />
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

                <form 
                    key={searchParams?.success ? Date.now() : 'certificate-form'}
                    action={createCertificate}
                    encType="multipart/form-data"
                >
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
                                <Label htmlFor="issue_month" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Date Issued</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <select 
                                        id="issue_month" 
                                        name="issue_month" 
                                        className="h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-4 font-medium text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600"
                                    >
                                        <option value="">Month</option>
                                        <option value="Jan">January</option>
                                        <option value="Feb">February</option>
                                        <option value="Mar">March</option>
                                        <option value="Apr">April</option>
                                        <option value="May">May</option>
                                        <option value="Jun">June</option>
                                        <option value="Jul">July</option>
                                        <option value="Aug">August</option>
                                        <option value="Sep">September</option>
                                        <option value="Oct">October</option>
                                        <option value="Nov">November</option>
                                        <option value="Dec">December</option>
                                    </select>
                                    <select 
                                        id="issue_year" 
                                        name="issue_year" 
                                        className="h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-4 font-medium text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600"
                                    >
                                        <option value="">Year</option>
                                        {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 border-t pt-8">
                            <Label htmlFor="file" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Upload PDF or Image (Optional)</Label>
                            <Input id="file" name="file" type="file" accept="image/*,.pdf" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 font-medium text-slate-600 file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-indigo-600" />
                            <p className="text-[11px] font-medium text-slate-400">File will be stored securely on Supabase Storage.</p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <SubmitButton className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
                                Upload Certificate
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
