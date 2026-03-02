"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateProfile(formData: FormData) {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        redirect("/login")
    }

    // Handle avatar upload
    let avatar_url = (formData.get("current_avatar_url") as string) || ""
    const file = formData.get("avatar") as File
    
    console.log("[Avatar] File received:", file?.name, "size:", file?.size, "type:", file?.type)
    
    if (file && file.size > 0 && file.name !== "undefined") {
        try {
            // Convert file to ArrayBuffer for Supabase
            const arrayBuffer = await file.arrayBuffer()
            const fileExt = file.name.split('.').pop()
            const fileName = `${user.id}-${Date.now()}.${fileExt}`
            const filePath = fileName

            console.log("[Avatar] Uploading to path:", filePath, "size:", file.size)

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, arrayBuffer, {
                    contentType: file.type,
                    upsert: true
                })

            if (uploadError) {
                console.error("[Avatar Upload Error]", uploadError.message, uploadError)
                redirect("/dashboard?error=" + encodeURIComponent(`Avatar upload failed: ${uploadError.message}`))
            }

            if (uploadData) {
                const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
                avatar_url = data.publicUrl
                console.log("[Avatar] Uploaded successfully:", avatar_url)
            }
        } catch (err) {
            console.error("[Avatar] Exception:", err)
            redirect("/dashboard?error=" + encodeURIComponent("Failed to process avatar image"))
        }
    }

    // Normalize username to lowercase and trim
    const rawUsername = (formData.get("username") as string || "").trim().toLowerCase()

    if (rawUsername && !/^[a-z0-9_]+$/.test(rawUsername)) {
        redirect("/dashboard?error=" + encodeURIComponent("Username can only contain lowercase letters, numbers, and underscores."))
    }

    const updates = {
        id: user.id,
        username: rawUsername || null,
        full_name: (formData.get("full_name") as string || "").trim(),
        headline: (formData.get("headline") as string || "").trim(),
        location: (formData.get("location") as string || "").trim(),
        bio: (formData.get("bio") as string || "").trim(),
        phone: (formData.get("phone") as string || "").trim() || null,
        email: (formData.get("email") as string || "").trim() || null,
        linkedin_url: (formData.get("linkedin_url") as string || "").trim() || null,
        github_url: (formData.get("github_url") as string || "").trim() || null,
        website_url: (formData.get("website_url") as string || "").trim() || null,
        avatar_url: avatar_url || null,
        updated_at: new Date().toISOString(),
    }

    console.log("[updateProfile] Saving:", { ...updates, avatar_url: avatar_url?.slice(0, 60) })

    const { error } = await supabase
        .from("profiles")
        .upsert(updates)

    if (error) {
        console.error("[updateProfile] DB error:", error)
        if (error.code === '23505' && error.message.includes('username')) {
            redirect("/dashboard?error=" + encodeURIComponent("This username is already taken."))
        }
        redirect("/dashboard?error=" + encodeURIComponent(error.message))
    }

    revalidatePath("/dashboard")
    revalidatePath(`/${rawUsername || user.id}`)
    redirect("/dashboard?success=1")
}

