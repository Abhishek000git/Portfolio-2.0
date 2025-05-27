"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Rocket, Zap, Palette, Database, Cloud, Shield, Globe, Smartphone } from "lucide-react"
import { useTypingAnimation } from "@/hooks/use-typing-animation"
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/use-scroll-animation"
import { LanguageProficiency } from "@/components/language-proficiency"
import { InteractiveDemo } from "@/components/interactive-demo"

const skills = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Building scalable applications with modern frameworks and cutting-edge technologies",
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Leveraging artificial intelligence to create intelligent and adaptive solutions",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Ensuring lightning-fast performance and exceptional user experiences",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and visually stunning user interfaces with modern design principles",
  },
  {
    icon: Database,
    title: "Database Architecture",
    description: "Designing robust and scalable database solutions for complex applications",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Creating cross-platform mobile applications with React Native and Flutter",
  },
]

export default function HomePage() {
  const typingText = useTypingAnimation({
    words: ["Software Developer", "AI Enthusiast", "Full-Stack Engineer", "Digital Innovator"],
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 2000,
  })

  const heroAnimation = useScrollAnimation({ threshold: 0.2 })
  const skillsAnimation = useStaggeredScrollAnimation(skills.length, 150)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        ref={heroAnimation.ref}
        className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              Abhishek Kumar
            </h1>
            <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 h-8 flex items-center justify-center">
              <span className="mr-2">I'm a</span>
              <span className="text-orange-500 font-semibold min-w-[180px] sm:min-w-[200px] text-left">
                {typingText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Crafting the future through code. Specializing in modern web technologies, AI integration, and creating
              exceptional digital experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 touch-manipulation"
              >
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-orange-500/50 hover:bg-orange-500/10 transform hover:scale-105 transition-all duration-300 touch-manipulation"
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-orange-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-orange-300/15 to-orange-500/15 rounded-full blur-lg animate-pulse delay-500" />
        <div className="absolute bottom-1/3 right-1/4 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-orange-600/15 to-orange-400/15 rounded-full blur-lg animate-pulse delay-1500" />
      </section>

      {/* Enhanced Skills Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              What I Do
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforming ideas into reality through innovative technology solutions
            </p>
          </div>

          <div ref={skillsAnimation.ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skill, index) => (
              <Card
                key={skill.title}
                className={`group bg-gradient-to-br from-background to-background/50 border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 touch-manipulation ${
                  skillsAnimation.visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  transitionDuration: "600ms",
                }}
              >
                <CardContent className="p-4 sm:p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <skill.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      {skill.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {skill.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Language Proficiency Section */}
      <LanguageProficiency />

      {/* Interactive Demo Section */}
      <InteractiveDemo />
    </div>
  )
}
