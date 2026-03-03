"use client"

import { useEffect, useRef } from "react"

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const moveX = (clientX - innerWidth / 2) / 50
      const moveY = (clientY - innerHeight / 2) / 50
      
      const elements = containerRef.current.querySelectorAll('.floating-element')
      elements.forEach((el, index) => {
        const speed = (index + 1) * 0.5
        ;(el as HTMLElement).style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Floating geometric shapes */}
      <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-3xl rotate-12 blur-xl transition-transform duration-300 ease-out animate-float"></div>
      <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl transition-transform duration-300 ease-out animate-float-delayed"></div>
      <div className="floating-element absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-2xl -rotate-12 blur-xl transition-transform duration-300 ease-out animate-float"></div>
      <div className="floating-element absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl transition-transform duration-300 ease-out animate-float-delayed"></div>
      <div className="floating-element absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-3xl rotate-45 blur-xl transition-transform duration-300 ease-out animate-float"></div>
    </div>
  )
}
