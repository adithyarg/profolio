"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

interface DeleteButtonProps {
    onDelete: () => void
    itemName?: string
}

export function DeleteButton({ onDelete, itemName = "item" }: DeleteButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (!showConfirm) {
            setShowConfirm(true)
            return
        }
        onDelete()
    }

    return (
        <div className="relative">
            {showConfirm && (
                <div className="absolute right-0 top-0 z-10 bg-white border-2 border-red-200 rounded-lg shadow-xl p-4 min-w-[280px] animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-sm font-semibold text-slate-900 mb-3">
                        Delete this {itemName}?
                    </p>
                    <p className="text-xs text-slate-600 mb-4">
                        This action cannot be undone.
                    </p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setShowConfirm(false)}
                            className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleClick}
                            className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
            <button
                type="button"
                onClick={handleClick}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title={`Delete ${itemName}`}
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    )
}
