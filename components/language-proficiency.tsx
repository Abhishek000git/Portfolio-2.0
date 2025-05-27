"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface Language {
  name: string
  level: number
  logo: string
  color: string
  gradient: string
}

const languages: Language[] = [
  {
    name: "JavaScript",
    level: 95,
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png?height=32&width=32&text=JS",
    color: "#F7DF1E",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    name: "TypeScript",
    level: 93,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/768px-Typescript_logo_2020.svg.png?height=32&width=32&text=TS",
    color: "#3178C6",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "Python",
    level: 90,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/172px-Python-logo-notext.svg.png?height=32&width=32&text=PY",
    color: "#3776AB",
    gradient: "from-blue-500 to-green-500",
  },
  {
    name: "Java",
    level: 85,
    logo: "https://upload.wikimedia.org/wikipedia/vec/0/05/Java_Logo.svg.png?20101217132408?height=32&width=32&text=JV",
    color: "#ED8B00",
    gradient: "from-orange-400 to-red-500",
  },
  {
    name: "C++",
    level: 80,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/459px-ISO_C%2B%2B_Logo.svg.png?height=32&width=32&text=C%2B%2B",
    color: "#00599C",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    name: "Solidity",
    level: 75,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Solidity_logo.svg/579px-Solidity_logo.svg.png?height=32&width=32&text=SOL",
    color: "#CE422B",
    gradient: "from-orange-600 to-red-600",
  },
]

// Function to get proficiency level based on percentage
const getProficiencyLevel = (level: number): { label: string; color: string; bgColor: string } => {
  if (level >= 90) {
    return {
      label: "Advanced",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800",
    }
  } else if (level >= 80) {
    return {
      label: "Intermediate",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
    }
  } else {
    return {
      label: "Beginner",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800",
    }
  }
}

interface LanguageCardProps {
  language: Language
  index: number
  isVisible: boolean
}

function LanguageCard({ language, index, isVisible }: LanguageCardProps) {
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const proficiency = getProficiencyLevel(language.level)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(language.level)
      }, index * 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, language.level, index])

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  return (
    <Card
      className={`group relative overflow-hidden bg-gradient-to-br from-background to-background/50 border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:scale-[1.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transitionDuration: "600ms",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${language.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {/* Language Logo */}
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-background to-background/50 rounded-xl p-2 border border-orange-500/20 group-hover:border-orange-500/40 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
              {!imageError ? (
                <>
                  <img
                    src={language.logo || "/placeholder.svg"}
                    alt={`${language.name} logo`}
                    className={`w-8 h-8 object-contain transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    crossOrigin="anonymous"
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: language.color }}
                >
                  {language.name === "JavaScript"
                    ? "JS"
                    : language.name === "TypeScript"
                      ? "TS"
                      : language.name === "Python"
                        ? "PY"
                        : language.name === "C++"
                          ? "C++"
                          : language.name === "Solidity"
                            ? "SOL"
                            : language.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Language Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 group-hover:text-orange-500 transition-colors duration-300">
              {language.name}
            </h3>
            {/* Proficiency Level Badge */}
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 ${proficiency.bgColor} ${proficiency.color}`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  language.level >= 90 ? "bg-green-500" : language.level >= 80 ? "bg-blue-500" : "bg-orange-500"
                }`}
              ></div>
              {proficiency.label}
            </div>
          </div>

          {/* Percentage */}
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {language.level >= 90 ? "Expert Level" : language.level >= 80 ? "Proficient" : "Learning"}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${language.gradient} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{
                width: `${progress}%`,
                boxShadow: isHovered ? `0 0 15px ${language.color}40` : "none",
              }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Progress Bar Labels */}
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
          </div>

          {/* Progress Markers */}
          <div className="absolute top-0 left-0 right-0 flex justify-between">
            <div className="w-px h-3 bg-muted-foreground/30" style={{ marginLeft: "0%" }}></div>
            <div className="w-px h-3 bg-muted-foreground/30" style={{ marginLeft: "80%" }}></div>
            <div className="w-px h-3 bg-muted-foreground/30" style={{ marginLeft: "90%" }}></div>
            <div className="w-px h-3 bg-muted-foreground/30" style={{ marginLeft: "100%" }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function LanguageProficiency() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  // Group languages by proficiency level
  const groupedLanguages = {
    advanced: languages.filter((lang) => lang.level >= 90),
    intermediate: languages.filter((lang) => lang.level >= 80 && lang.level < 90),
    beginner: languages.filter((lang) => lang.level < 80),
  }

  return (
    <section ref={ref} className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Language Proficiency
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            My expertise across different programming languages and technologies, categorized by proficiency levels
          </p>

          {/* Proficiency Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Advanced (90%+)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Intermediate (80-89%)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-full">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Beginner (&lt;80%)</span>
            </div>
          </div>
        </div>

        {/* Language Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {languages.map((language, index) => (
            <LanguageCard key={language.name} language={language} index={index} isVisible={isVisible} />
          ))}
        </div>

        {/* Summary Statistics */}
        <div
          className={`mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {groupedLanguages.advanced.length}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">Advanced</div>
          </div>
          <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {groupedLanguages.intermediate.length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Intermediate</div>
          </div>
          <div className="text-center p-4 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {groupedLanguages.beginner.length}
            </div>
            <div className="text-sm text-orange-600 dark:text-orange-400">Beginner</div>
          </div>
        </div>
      </div>
    </section>
  )
}
