"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createEducation(formData: FormData) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const id = formData.get("id") as string | null
    const isUpdate = !!id

    // Build date strings from dropdowns
    const startMonth = formData.get("start_month") as string
    const startYear = formData.get("start_year") as string
    const endMonth = formData.get("end_month") as string
    const endYear = formData.get("end_year") as string

    let start_date = ""
    let end_date = ""

    if (startMonth && startYear) {
        start_date = `${startMonth} ${startYear}`
    }

    if (endMonth === "Present") {
        end_date = "Present"
    } else if (endMonth && endYear) {
        end_date = `${endMonth} ${endYear}`
    }

    const education = {
        user_id: user.id,
        degree: formData.get("degree") as string,
        institution: formData.get("institution") as string,
        field_of_study: (formData.get("field_of_study") as string) || null,
        start_date: start_date || null,
        end_date: end_date || null,
        grade: (formData.get("grade") as string) || null,
        location: (formData.get("location") as string) || null,
        description: (formData.get("description") as string) || null,
    }

    let error

    if (isUpdate) {
        const result = await supabase
            .from("education")
            .update(education)
            .eq("id", id)
            .eq("user_id", user.id)
        error = result.error
    } else {
        const result = await supabase.from("education").insert([education])
        error = result.error
    }

    if (error) {
        redirect("/dashboard/education?error=" + encodeURIComponent(error.message))
    }

    revalidatePath("/dashboard/education")
    redirect(isUpdate ? "/dashboard/education?updated=1" : "/dashboard/education?success=1")
}

export async function deleteEducation(id: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from("education").delete().eq("id", id).eq("user_id", user.id)
    revalidatePath("/dashboard/education")
    redirect("/dashboard/education?deleted=1")
}
