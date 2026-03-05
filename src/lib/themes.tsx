import { ReactNode } from "react"

export type ThemeId = "modern" | "minimal" | "creative" | "professional" | "bold"

export interface ThemeConfig {
    id: ThemeId
    name: string
    colors: {
        primary: string
        secondary: string
        accent: string
        background: string
        text: string
        cardBg: string
        border: string
    }
    styles: {
        headerClass: string
        cardClass: string
        buttonClass: string
        badgeClass: string
        sectionClass: string
    }
}

export const themes: Record<ThemeId, ThemeConfig> = {
    modern: {
        id: "modern",
        name: "Modern",
        colors: {
            primary: "indigo-600",
            secondary: "purple-600",
            accent: "pink-500",
            background: "slate-50",
            text: "slate-900",
            cardBg: "white",
            border: "slate-200"
        },
        styles: {
            headerClass: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
            cardClass: "bg-white border-2 border-slate-200 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300",
            buttonClass: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white",
            badgeClass: "bg-indigo-100 text-indigo-700 border border-indigo-200",
            sectionClass: "bg-gradient-to-b from-slate-50 to-white"
        }
    },
    minimal: {
        id: "minimal",
        name: "Minimal",
        colors: {
            primary: "slate-900",
            secondary: "slate-700",
            accent: "slate-600",
            background: "white",
            text: "slate-900",
            cardBg: "slate-50",
            border: "slate-300"
        },
        styles: {
            headerClass: "bg-slate-900 text-white",
            cardClass: "bg-slate-50 border border-slate-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300",
            buttonClass: "bg-slate-900 hover:bg-slate-800 text-white",
            badgeClass: "bg-slate-200 text-slate-900 border border-slate-300",
            sectionClass: "bg-white"
        }
    },
    creative: {
        id: "creative",
        name: "Creative",
        colors: {
            primary: "pink-600",
            secondary: "orange-500",
            accent: "yellow-400",
            background: "orange-50",
            text: "slate-900",
            cardBg: "white",
            border: "pink-200"
        },
        styles: {
            headerClass: "bg-gradient-to-r from-pink-600 to-orange-500 text-white",
            cardClass: "bg-white border-2 border-pink-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-rotate-1 transition-all duration-300",
            buttonClass: "bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white",
            badgeClass: "bg-pink-100 text-pink-700 border border-pink-300",
            sectionClass: "bg-gradient-to-b from-orange-50 to-pink-50"
        }
    },
    professional: {
        id: "professional",
        name: "Professional",
        colors: {
            primary: "blue-700",
            secondary: "cyan-600",
            accent: "blue-500",
            background: "slate-100",
            text: "slate-900",
            cardBg: "white",
            border: "blue-200"
        },
        styles: {
            headerClass: "bg-gradient-to-r from-blue-700 to-cyan-600 text-white",
            cardClass: "bg-white border border-blue-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300",
            buttonClass: "bg-blue-700 hover:bg-blue-800 text-white",
            badgeClass: "bg-blue-100 text-blue-800 border border-blue-200",
            sectionClass: "bg-slate-100"
        }
    },
    bold: {
        id: "bold",
        name: "Bold",
        colors: {
            primary: "red-600",
            secondary: "yellow-500",
            accent: "orange-500",
            background: "slate-900",
            text: "white",
            cardBg: "slate-800",
            border: "red-500"
        },
        styles: {
            headerClass: "bg-gradient-to-r from-red-600 to-yellow-500 text-white",
            cardClass: "bg-slate-800 border-2 border-red-500 rounded-3xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300",
            buttonClass: "bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white",
            badgeClass: "bg-red-900 text-red-100 border border-red-500",
            sectionClass: "bg-slate-900"
        }
    }
}

export function getTheme(themeId?: string): ThemeConfig {
    const id = (themeId as ThemeId) || "modern"
    return themes[id] || themes.modern
}
