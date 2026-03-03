"use client"

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Software Engineer",
    company: "Google",
    content: "Profolio helped me land my dream job! The clean design and easy updates made it perfect for showcasing my projects. Recruiters loved it.",
    avatar: "from-indigo-400 to-indigo-600",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Designer",
    company: "Airbnb",
    content: "As a designer, I'm picky about portfolios. Profolio nailed it - beautiful, fast, and professional. Got 3x more interview requests!",
    avatar: "from-purple-400 to-purple-600",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Full Stack Developer",
    company: "Microsoft",
    content: "Setup took literally 8 minutes. The portfolio looks amazing and I can update it anytime. Best decision for my career!",
    avatar: "from-pink-400 to-pink-600",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Data Scientist",
    company: "Meta",
    content: "Switched from PDF resumes to Profolio and never looked back. The analytics feature is a game-changer. Highly recommend!",
    avatar: "from-blue-400 to-blue-600",
    rating: 5
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_70%)]" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 max-w-6xl relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-4 py-2 text-sm font-bold mb-6">
            <Star className="h-4 w-4 mr-2 fill-current" />
            Loved by Professionals
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
            What Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Users Say</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who transformed their career with Profolio
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-3xl p-10 md:p-12 border-2 border-slate-200 shadow-2xl relative">
                    <Quote className="absolute top-8 right-8 h-16 w-16 text-indigo-100" aria-hidden="true" />
                    
                    <div className="flex items-center gap-6 mb-8">
                      <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${testimonial.avatar} shadow-xl flex-shrink-0`}></div>
                      <div>
                        <div className="text-2xl font-black text-slate-900">{testimonial.name}</div>
                        <div className="text-base font-semibold text-slate-600">{testimonial.role}</div>
                        <div className="text-sm font-bold text-indigo-600">{testimonial.company}</div>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xl text-slate-700 leading-relaxed font-medium">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-12 bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
