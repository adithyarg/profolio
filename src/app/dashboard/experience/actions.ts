"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createExperience(formData: FormData) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const experience = {
        user_id: user.id,
        company: formData.get("company") as string,
        role: formData.get("role") as string,
        duration: formData.get("duration") as string,
        description: formData.get("description") as string,
    }

    const { error } = await supabase.from("experiences").insert([experience])
    if (error) return { error: error.message }

    revalidatePath("/dashboard/experience")
    return { success: true }
}

export async function deleteExperience(id: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from("experiences").delete().eq("id", id).eq("user_id", user.id)
    revalidatePath("/dashboard/experience")
}
