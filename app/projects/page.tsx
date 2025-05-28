"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/use-scroll-animation"

const featuredProjects = [
  {
    id: 1,
    title: "Dropyfy- Cloud Storage Platform",
    description:
      "A cloud storage platform designed to provide users with secure, scalable, and accessible file storage, enabling seamless upload, management, and retrieval of files from any device.",
    image: "/images/dropfy-screenshot.png?height=400&width=600",
    technologies: ["Next.js", "Typescript", "Clerk", "PostgreSQL", "Neon", "Drizzle"],
    github: "https://github.com/abhishek007-git/Dropyfy",
    demo: "https://dropyfy-deployment.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    title: "Calculator Smart Contract",
    description:
      "A blockchain-based project developed using Solidity that performs basic arithmetic operations (addition, subtraction, multiplication, division) securely and transparently on the Ethereum network.",
    image: "/images/calculator-icon.png?height=400&width=600",
    technologies: ["Solidity", "Ethereum"],
    github: "https://github.com/abhishek007-git/Blockchain_Repo",
    demo: "https://github.com/abhishek007-git/Blockchain_Repo",
    featured: true,
  },
  {
    id: 3,
    title: "Custom Hashing Algorithm",
    description:
      "Designed and implemented a unique hashing algorithm to ensure data integrity and security, focusing on custom logic for optimized performance and collision resistance.",
    image: "https://cdn-icons-png.flaticon.com/512/9080/9080400.png?height=400&width=600",
    technologies: ["JavaScript"],
    github: "https://github.com/abhishek007-git/Blockchain_Repo",
    demo: "https://github.com/abhishek007-git/Blockchain_Repo",
    featured: true,
  },
]

const allProjects = [
  ...featuredProjects,
  {
    id: 4,
    title: "Bussiness Consulting Website",
    description:
      "Designed and developed a professional, responsive website for a business consulting firm, showcasing services, case studies, and client testimonials to establish a strong online presence and drive client engagement.",
    image: "/images/business-consulting-website.png?height=300&width=400",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "https://tif-consulting.vercel.app/",
  },
  {
    id: 5,
    title: "Basic Console Tic-Tac-Toe",
    description:
      "Developed a simple two-player Tic-Tac-Toe game playable in the console, implementing core game logic, win condition checks, and a user-friendly interface using basic programming constructs.",
    image:
      "https://banner2.cleanpng.com/20180518/vru/kisspng-tic-tac-toe-oxo-chess-video-game-5aff53602d14e1.9166423615266824641847.jpg?height=300&width=400",
    technologies: ["Python"],
    github: "#",
    demo: "https://github.com/abhishek007-git/Tic-Tac-Toe_basic",
  },
  {
    id: 6,
    title: "Portfolio Webpage 1.0",
    description:
      "Created a personal portfolio website to showcase projects, skills, and contact information using clean design principles and responsive layout for optimal viewing across devices.",
    image: "/images/abhishek-portfolio-screenshot.png?height=300&width=400",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/abhishek007-git/Personal-Portfolio",
    demo: "https://abhishek007-git.github.io/Personal-Portfolio/",
  },
]

export default function ProjectsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const headerAnimation = useScrollAnimation({ threshold: 0.2 })
  const carouselAnimation = useScrollAnimation({ threshold: 0.1 })
  const projectsAnimation = useStaggeredScrollAnimation(allProjects.length, 100)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work and innovative solutions across various technologies
          </p>
        </div>

        {/* Featured Projects Carousel */}
        <section
          ref={carouselAnimation.ref}
          className={`mb-20 transition-all duration-1000 ${
            carouselAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl bg-gradient-to-br from-background to-background/50 border border-cyan-500/20">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProjects.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8">
                      <div className="relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="rounded-lg object-cover w-full h-48 sm:h-64 md:h-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">{project.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-6">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20 text-xs sm:text-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button asChild className="bg-gradient-to-r from-cyan-500 to-cyan-600 touch-manipulation">
                            <Link href={project.demo}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="border-cyan-500/50 touch-manipulation">
                            <Link href={project.github}>
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-cyan-500/50 touch-manipulation"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-cyan-500/50 touch-manipulation"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors touch-manipulation ${
                    index === currentSlide ? "bg-cyan-500" : "bg-cyan-500/30"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* All Projects Grid */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center">All Projects</h2>
          <div ref={projectsAnimation.ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`group bg-gradient-to-br from-background to-background/50 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105 touch-manipulation ${
                  projectsAnimation.visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transitionDuration: "600ms",
                }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button size="sm" asChild className="bg-cyan-500 hover:bg-cyan-600 touch-manipulation">
                          <Link href={project.demo || "#"}>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-white/50 text-white hover:bg-white/10 touch-manipulation"
                        >
                          <Link href={project.github || "#"}>
                            <Github className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
