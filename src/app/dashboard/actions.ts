"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    const updates = {
        id: user.id,
        full_name: formData.get("full_name") as string,
        headline: formData.get("headline") as string,
        location: formData.get("location") as string,
        bio: formData.get("bio") as string,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
        .from("profiles")
        .upsert(updates)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/dashboard")
    revalidatePath(`/${user.id}`) // We will resolve username later
    return { success: true }
}
