"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { User, Camera } from "lucide-react"

interface AvatarUploadProps {
    currentAvatarUrl?: string | null
}

export function AvatarUpload({ currentAvatarUrl }: AvatarUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentAvatarUrl || null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Update preview when currentAvatarUrl changes (after save)
    useEffect(() => {
        setPreview(currentAvatarUrl || null)
    }, [currentAvatarUrl])

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
            {/* Preview circle / square */}
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="relative h-24 w-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 hover:border-indigo-400 overflow-hidden shrink-0 flex items-center justify-center group transition-colors cursor-pointer"
                title="Click to change photo"
            >
                {preview ? (
                    <Image
                        src={preview}
                        alt="Avatar preview"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        unoptimized
                    />
                ) : (
                    <User className="h-10 w-10 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                </div>
            </button>

            <div className="space-y-2 flex-1">
                <p className="text-sm font-bold text-slate-900">Profile Picture</p>
                <input
                    ref={inputRef}
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:text-sm file:font-semibold hover:file:bg-indigo-100 cursor-pointer"
                />
                {/* keep the current url so server action knows not to wipe it */}
                <input type="hidden" name="current_avatar_url" value={currentAvatarUrl || ""} />
                <p className="text-[11px] font-medium text-slate-400">
                    Click the photo or use the button above. PNG/JPG/WebP. Max 5 MB.
                </p>
            </div>
        </div>
    )
}
