"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    let avatar_url = formData.get("current_avatar_url") as string || ""
    const file = formData.get("avatar") as File
    if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${user.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file)

        if (!uploadError) {
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
            avatar_url = data.publicUrl
        }
    }

    const newUsername = formData.get("username") as string

    // Basic custom validation for username format (lowercase no spaces)
    if (newUsername && !/^[a-z0-9_]+$/.test(newUsername)) {
        return { error: "Username can only contain lowercase letters, numbers, and underscores." }
    }

    const updates = {
        id: user.id,
        username: newUsername || null,
        full_name: formData.get("full_name") as string,
        headline: formData.get("headline") as string,
        location: formData.get("location") as string,
        bio: formData.get("bio") as string,
        avatar_url: avatar_url || null,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
        .from("profiles")
        .upsert(updates)

    if (error) {
        // Handle unique constraint violation on username
        if (error.code === '23505' && error.message.includes('username')) {
            return { error: "This username is already taken. Please choose another." }
        }
        return { error: error.message }
    }

    revalidatePath("/dashboard")
    revalidatePath(`/${newUsername || user.id}`)
    return { success: true }
}
