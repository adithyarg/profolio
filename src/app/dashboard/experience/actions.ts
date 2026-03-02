"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createExperience(formData: FormData) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const id = formData.get("id") as string | null
    const isUpdate = !!id

    // Build duration string from date dropdowns
    const startMonth = formData.get("start_month") as string
    const startYear = formData.get("start_year") as string
    const endMonth = formData.get("end_month") as string
    const endYear = formData.get("end_year") as string

    let duration = ""
    if (startMonth && startYear) {
        duration = `${startMonth} ${startYear}`
        if (endMonth === "Present") {
            duration += " - Present"
        } else if (endMonth && endYear) {
            duration += ` - ${endMonth} ${endYear}`
        }
    }

    const experience = {
        user_id: user.id,
        company: formData.get("company") as string,
        role: formData.get("role") as string,
        duration: duration || null,
        description: formData.get("description") as string,
    }

    let error

    if (isUpdate) {
        const result = await supabase
            .from("experiences")
            .update(experience)
            .eq("id", id)
            .eq("user_id", user.id)
        error = result.error
    } else {
        const result = await supabase.from("experiences").insert([experience])
        error = result.error
    }

    if (error) {
        redirect("/dashboard/experience?error=" + encodeURIComponent(error.message))
    }

    revalidatePath("/dashboard/experience")
    redirect(isUpdate ? "/dashboard/experience?updated=1" : "/dashboard/experience?success=1")
}

export async function deleteExperience(id: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from("experiences").delete().eq("id", id).eq("user_id", user.id)
    revalidatePath("/dashboard/experience")
    redirect("/dashboard/experience?deleted=1")
}
