import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, MapPin, TrendingUp, Users, Award } from "lucide-react"
import Image from "next/image"

const experiences = [
  {
    id: 1,
    title: "Senior Executive Member",
    company: "KodeinKGP: Technology Web3.0 Society",
    location: "IIT Kharagpur",
    period: "2025 - Present",
    duration: "",
    description:
      "Serving as Senior Executive Member in Blockchain Team at KodeinKGP, leading the design and implementation of decentralized applications and blockchain-based solutions.",
    technologies: ["Ethereum", "Solidity", "Next.js", "Hardhat", "Web3.js", "MetaMask", "IPFS"],
    achievements: [
      "Not yet",
    ],
    metrics: {
      teamSize: "30+ developers",
      impact: "",
      improvement: "",
    },
    image: "https://kodeinkgp.in/static/media/kik-final-logo.bc34184b7fe2143f59bc.png?height=400&width=600&text=TechCorp+Solutions+HQ",
  },
  {
    id: 2,
    title: "Junior Executive Member",
    company: "KodeinKGP",
    location: "IIT Kharagpur",
    period: "2024 - 2025",
    duration: "1 year",
    description:
      "Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality products.",
    technologies: ["Next.js", "Python", "PostgreSQL", "Solidity", "JavaScript"],
    achievements: [
      "Built a simple calculator smart contract",
      "Built a custom hashing algorithm.",
      "Built a minimal Tic-Tac-Toe application on console.",
    ],
    metrics: {
      teamSize: "40+ members",
      impact: "",
      improvement: "",
    },
    image: "https://kodeinkgp.in/static/media/kik-final-logo.bc34184b7fe2143f59bc.png?height=400&width=600&text=InnovateLab+Office",
  },
]

export default function ExperiencePage() {
  return (
    <div className="pt-16 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5" />
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-block p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full mb-6">
            <TrendingUp className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            Professional Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My evolution in software development, from junior developer to senior engineer, building impactful solutions
            across diverse technologies
          </p>
        </div>

        {/* Enhanced Timeline */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Enhanced Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-600 rounded-full shadow-lg shadow-orange-500/20"></div>

            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`relative mb-20 ${index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"} md:w-1/2 group`}
              >
                {/* Enhanced Timeline Dot */}
                <div
                  className="absolute left-6 md:left-auto md:right-auto w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full border-4 border-background shadow-xl shadow-orange-500/30 group-hover:scale-125 transition-all duration-500 z-10"
                  style={{
                    [index % 2 === 0 ? "right" : "left"]: index % 2 === 0 ? "-3rem" : "-3rem",
                    top: "2rem",
                  }}
                >
                  <div className="absolute inset-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Enhanced Timeline Connector */}
                <div
                  className={`hidden md:block absolute top-8 w-8 h-0.5 bg-gradient-to-r ${
                    index % 2 === 0 ? "from-orange-500 to-transparent right-0" : "from-transparent to-orange-500 left-0"
                  } group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all duration-500`}
                  style={{
                    [index % 2 === 0 ? "right" : "left"]: "-2rem",
                  }}
                ></div>

                {/* Company/Workplace Image - Positioned opposite to the card */}
                <div
                  className={`hidden md:block absolute top-0 w-80 h-60 ${
                    index % 2 === 0 ? "right-full mr-16" : "left-full ml-16"
                  } group-hover:scale-105 transition-all duration-500`}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-orange-500/20 border border-orange-500/20">
                    <Image
                      src={experience.image || "/placeholder.svg"}
                      alt={`${experience.company} office`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-bold text-lg">{experience.company}</h4>
                      <p className="text-white/80 text-sm">{experience.location}</p>
                    </div>
                    {/* Decorative overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                <Card className="ml-16 md:ml-0 bg-gradient-to-br from-background via-background/95 to-orange-500/5 border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 group-hover:translate-y-[-4px]">
                  <CardContent className="p-8">
                    {/* Mobile Image - Show above content on mobile */}
                    <div className="md:hidden mb-6">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg border border-orange-500/20">
                        <Image
                          src={experience.image || "/placeholder.svg"}
                          alt={`${experience.company} office`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h4 className="text-white font-bold">{experience.company}</h4>
                          <p className="text-white/80 text-sm">{experience.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold group-hover:text-orange-500 transition-colors duration-300">
                            {experience.title}
                          </h3>
                          <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                            {experience.duration}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-orange-500 mb-3">
                          <Building className="h-5 w-5" />
                          <span className="font-semibold text-lg">{experience.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col lg:items-end gap-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Metrics Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-gradient-to-br from-orange-500/5 to-orange-600/5 rounded-lg border border-orange-500/10">
                        <Users className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Team Size</p>
                        <p className="font-semibold text-sm">{experience.metrics.teamSize}</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-orange-500/5 to-orange-600/5 rounded-lg border border-orange-500/10">
                        <TrendingUp className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Impact</p>
                        <p className="font-semibold text-sm">{experience.metrics.impact}</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-orange-500/5 to-orange-600/5 rounded-lg border border-orange-500/10">
                        <Award className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Key Result</p>
                        <p className="font-semibold text-sm">{experience.metrics.improvement}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">{experience.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-orange-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="group-hover:text-foreground transition-colors duration-300">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Technologies & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20 transition-colors duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
