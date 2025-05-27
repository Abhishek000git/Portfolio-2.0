import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Trophy, Star } from "lucide-react"
import Image from "next/image"

const education = [
  {
    id: 1,
    degree: "Bachelor Of Technology in Civil Engineering",
    school: "Indian Institute of Technology Kharagpur",
    location: "Kharagpur, West Bengal, India",
    period: "2024 - present",
    duration: "4 years",
    gpa: "7.5/10.0",
    description:
      "Currently pursuing a degree in Civil Engineering while actively developing a strong specialization in software development. Focused on bridging engineering principles with modern technologies, with particular interest in web development and practical applications of software in real-world problems.",
    coursework: [
      "Programming and Data Structures",
      "Machine Learning",
      "Linear Algebra",
      "Advanced Calculus",
      "Numerical and Complex Analysis",
    ],
    achievements: [
      "Participated in SIH'24",
    ],
    honors: "",
    thesis: "",
    image: "https://images.unsplash.com/photo-1620496009285-ac853df7b9b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

const certifications = [
  {
    id: 1,
    name: "Google Analytics Certification",
    issuer: "Google Skillshop",
    date: "2025",
    credentialId: "143076707",
    description:
      "Certified in Google Analytics, demonstrating proficiency in tracking, analyzing, and interpreting website data to drive informed digital decisions..",
    level: "Intermediate",
    validUntil: "2026",
  },
  {
    id: 2,
    name: "Software Engineering Job Simulation",
    issuer: "Accenture Nordics",
    date: "2024",
    credentialId: "",
    description:
      "Completed Accenture’s Software Engineering Virtual Job Simulation, gaining hands-on experience in developing, testing, and delivering software solutions in a real-world business context.",
    level: "Beginner",
    validUntil: "---",
  },
  {
    id: 3,
    name: "Certificate of Participation",
    issuer: "Techfest, IIT Bombay",
    date: "2025",
    credentialId: "",
    description: "Participated in a Web3 workshop hosted by IIT Bombay, exploring blockchain fundamentals, decentralized applications, and emerging Web3 technologies.",
    level: "",
    validUntil: "---",
  },
]

export default function EducationPage() {
  return (
    <div className="pt-16 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-block p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full mb-6">
            <BookOpen className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            Academic Excellence
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My educational foundation and continuous learning journey through formal education and professional
            certifications
          </p>
        </div>

        {/* Enhanced Education Timeline */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Academic Background
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Enhanced Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-600 rounded-full shadow-lg shadow-orange-500/20"></div>

              {education.map((edu, index) => (
                <div
                  key={edu.id}
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
                      index % 2 === 0
                        ? "from-orange-500 to-transparent right-0"
                        : "from-transparent to-orange-500 left-0"
                    } group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all duration-500`}
                    style={{
                      [index % 2 === 0 ? "right" : "left"]: "-2rem",
                    }}
                  ></div>

                  {/* College/University Image - Positioned opposite to the card */}
                  <div
                    className={`hidden md:block absolute top-0 w-80 h-60 ${
                      index % 2 === 0 ? "right-full mr-16" : "left-full ml-16"
                    } group-hover:scale-105 transition-all duration-500`}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-orange-500/20 border border-orange-500/20">
                      <Image
                        src={edu.image || "/placeholder.svg"}
                        alt={`${edu.school} campus`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-bold text-lg">{edu.school}</h4>
                        <p className="text-white/80 text-sm">{edu.location}</p>
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
                            src={edu.image || "/placeholder.svg"}
                            alt={`${edu.school} campus`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <h4 className="text-white font-bold">{edu.school}</h4>
                            <p className="text-white/80 text-sm">{edu.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Header Section */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold group-hover:text-orange-500 transition-colors duration-300">
                              {edu.degree}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="bg-orange-500/10 text-orange-500 border-orange-500/20"
                            >
                              {edu.duration}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-orange-500 mb-3">
                            <GraduationCap className="h-5 w-5" />
                            <span className="font-semibold text-lg">{edu.school}</span>
                          </div>
                          {edu.honors && (
                            <div className="flex items-center gap-2 mb-3">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span className="text-yellow-600 font-medium">{edu.honors}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col lg:items-end gap-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-orange-500" />
                            <span className="text-orange-500 font-semibold">GPA: {edu.gpa}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">{edu.description}</p>

                      {edu.thesis && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-orange-500/5 to-orange-600/5 rounded-lg border border-orange-500/10">
                          <h4 className="font-semibold text-orange-500 mb-1">Thesis</h4>
                          <p className="text-sm text-muted-foreground">{edu.thesis}</p>
                        </div>
                      )}

                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-lg">Key Coursework</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course) => (
                            <Badge
                              key={course}
                              variant="secondary"
                              className="bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20 transition-colors duration-300"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                          <Award className="h-5 w-5 text-orange-500" />
                          Academic Achievements
                        </h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="group-hover:text-foreground transition-colors duration-300">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Certifications Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Professional Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Continuous learning through industry-recognized certifications and professional development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <Card
                key={cert.id}
                className="group bg-gradient-to-br from-background via-background/95 to-orange-500/5 border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors duration-300 leading-tight">
                          {cert.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={`ml-2 ${
                            cert.level === "Professional"
                              ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                              : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          }`}
                        >
                          {cert.level}
                        </Badge>
                      </div>
                      <p className="text-orange-500 font-semibold mb-3">{cert.issuer}</p>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cert.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Issued</p>
                          <p className="font-medium">{cert.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Valid Until</p>
                          <p className="font-medium">{cert.validUntil}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-orange-500/10">
                        <p className="text-xs text-muted-foreground font-mono">Credential ID: {cert.credentialId}</p>
                      </div>
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
