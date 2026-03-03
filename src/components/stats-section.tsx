"use client"

import { useEffect, useState } from "react"
import { Users, Briefcase, Award, TrendingUp } from "lucide-react"

export function StatsSection() {
  const [counts, setCounts] = useState({
    users: 0,
    portfolios: 0,
    views: 0,
    satisfaction: 0
  })

  useEffect(() => {
    const targets = {
      users: 1247,
      portfolios: 3891,
      views: 125000,
      satisfaction: 98
    }

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounts({
        users: Math.floor(targets.users * progress),
        portfolios: Math.floor(targets.portfolios * progress),
        views: Math.floor(targets.views * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts(targets)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      icon: Users,
      value: counts.users.toLocaleString(),
      label: "Active Users",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Briefcase,
      value: counts.portfolios.toLocaleString(),
      label: "Portfolios Created",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      value: counts.views.toLocaleString() + "+",
      label: "Profile Views",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Award,
      value: counts.satisfaction + "%",
      label: "Satisfaction Rate",
      color: "from-green-500 to-green-600"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
              <div className="relative text-center">
                <div className={`inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white items-center justify-center mb-6 shadow-xl dark:shadow-indigo-500/50 group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="h-8 w-8 stroke-[2]" />
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
