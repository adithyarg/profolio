"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    const project = {
        user_id: user.id,
        title: formData.get("title") as string,
        short_description: formData.get("short_description") as string,
        description: formData.get("description") as string,
        role: formData.get("role") as string,
        demo_url: formData.get("demo_url") as string,
        github_url: formData.get("github_url") as string,
        start_date: formData.get("start_date") ? formData.get("start_date") as string : null,
        end_date: formData.get("end_date") ? formData.get("end_date") as string : null,
        tech_stack: formData.get("tech_stack") ? (formData.get("tech_stack") as string).split(",").map(t => t.trim()) : [],
    }

    const { error } = await supabase
        .from("projects")
        .insert([project])

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/dashboard/projects")
    return { success: true }
}

export async function deleteProject(id: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized")

    await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id)

    revalidatePath("/dashboard/projects")
}
