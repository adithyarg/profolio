"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateTheme(formData: FormData) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const theme = formData.get("theme") as string

    const { error } = await supabase
        .from("profiles")
        .update({ theme })
        .eq("id", user.id)

    if (error) {
        redirect("/dashboard/themes?error=" + encodeURIComponent(error.message))
    }

    revalidatePath("/dashboard/themes")
    revalidatePath("/[username]", "page")
    redirect("/dashboard/themes?success=true")
}
