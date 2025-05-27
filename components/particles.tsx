"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.3, // Increased from 0.5 + 0.1 to 0.8 + 0.3
          color: `rgba(249, 115, 22, ${Math.random() * 0.7 + 0.4})`, // Increased from 0.3 + 0.1 to 0.7 + 0.4
        })
      }
      return particles
    }

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawConnections = (particles: Particle[]) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = ((100 - distance) / 100) * 0.3 // Increased from 0.1 to 0.3
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.strokeStyle = "rgba(249, 115, 22, 0.5)" // Increased from 0.2 to 0.5
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      particle.y = Math.max(0, Math.min(canvas.height, particle.y))

      // Subtle opacity animation
      particle.opacity += (Math.random() - 0.5) * 0.02 // Increased from 0.01 to 0.02
      particle.opacity = Math.max(0.2, Math.min(0.9, particle.opacity)) // Changed from 0.05-0.4 to 0.2-0.9
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (theme === "dark") {
        particlesRef.current.forEach((particle) => {
          updateParticle(particle)
          drawParticle(particle)
        })
        drawConnections(particlesRef.current)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    particlesRef.current = createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      particlesRef.current = createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  if (theme !== "dark") return null

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.9 }} />
}
