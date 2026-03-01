"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function signup(formData: FormData) {
    const supabase = createClient()

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        username: formData.get("username") as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
    }

    const rawUsername = data.username
    if (!rawUsername || !/^[a-z0-9_]+$/.test(rawUsername)) {
        redirect("/register?error=" + encodeURIComponent("Username must be lowercase letters, numbers, and underscores only."))
    }
    const username = rawUsername.toLowerCase()

    // Check if username is taken
    const { data: existingUser } = await supabase.from('profiles').select('id').eq('username', username).maybeSingle()
    if (existingUser) {
        redirect("/register?error=" + encodeURIComponent("This username is already taken."))
    }

    const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                username: username,
                full_name: `${data.firstName} ${data.lastName}`,
            }
        }
    })

    if (error) {
        redirect("/register?error=" + encodeURIComponent(error.message))
    }

    // If email confirmation is required, session will be null
    if (!authData.session) {
        redirect("/login?message=" + encodeURIComponent("Check your email to confirm your account."))
    }

    revalidatePath("/", "layout")
    redirect("/dashboard")
}
