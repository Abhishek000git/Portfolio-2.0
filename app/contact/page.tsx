"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { useState } from "react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

interface SubmissionState {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: "",
  })

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address"
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters"
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = "Subject must be less than 100 characters"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset submission state
    setSubmissionState({
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      message: "",
    })

    // Validate form
    if (!validateForm()) {
      return
    }

    setSubmissionState((prev) => ({ ...prev, isSubmitting: true }))

    try {
      // Web3Forms access key - Replace with your actual key from https://web3forms.com
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "0ce40255-908c-476b-96ab-8c053d9fa13e"

      // Check if access key is configured
      if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
        throw new Error(
          "Web3Forms access key not configured. Please add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your environment variables.",
        )
      }

      // Prepare form data for Web3Forms
      const web3FormsData = new FormData()
      web3FormsData.append("access_key", accessKey)
      web3FormsData.append("name", formData.name.trim())
      web3FormsData.append("email", formData.email.trim())
      web3FormsData.append("subject", formData.subject.trim())
      web3FormsData.append("message", formData.message.trim())
      web3FormsData.append("from_name", "Portfolio Contact Form")
      web3FormsData.append("redirect", "false")

      // Add timeout to the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormsData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setSubmissionState({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: "Thank you for your message! I'll get back to you within 24 hours.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setErrors({})
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Form submission error:", error)

      let errorMessage = "Sorry, there was an error sending your message. "

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage += "The request timed out. Please check your internet connection and try again."
        } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
          errorMessage += "Network error. Please check your internet connection and try again."
        } else if (error.message.includes("access key") || error.message.includes("not configured")) {
          errorMessage += "Configuration error: Please contact the site administrator to configure the contact form."
        } else if (error.message.includes("HTTP error")) {
          errorMessage += "Server error. Please try again later."
        } else {
          errorMessage += `Error: ${error.message}`
        }
      } else {
        errorMessage += "An unknown error occurred."
      }

      errorMessage += " You can also contact me directly at abhishekiitkgp007@gmail.com."

      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: errorMessage,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // Clear submission messages when user starts editing
    if (submissionState.isSuccess || submissionState.isError) {
      setSubmissionState((prev) => ({ ...prev, isSuccess: false, isError: false, message: "" }))
    }
  }

  return (
    <div className="pt-16 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-600/5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-cyan-300/8 to-cyan-500/8 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-block p-4 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-full mb-6">
            <MessageCircle className="h-12 w-12 text-cyan-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to bring your next project to life? I'm here to help you transform your ideas into exceptional digital
            experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {/* Contact Information - Enhanced */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Contact Cards */}
            <div className="grid gap-6">
              <Card className="group bg-gradient-to-br from-background via-background to-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1">Email</p>
                      <p className="text-cyan-500 font-medium">abhishekiitkgp007@gmail.com</p>
                      <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-gradient-to-br from-background via-background to-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1">Phone</p>
                      <p className="text-cyan-500 font-medium">+91 88408-68076</p>
                      <p className="text-sm text-muted-foreground">Available Mon-Fri, 9AM-6PM IST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-gradient-to-br from-background via-background to-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1">Location</p>
                      <p className="text-cyan-500 font-medium">Kanpur, Uttar Pradesh, India</p>
                      <p className="text-sm text-muted-foreground">Open to remote collaboration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Links - Enhanced */}
            <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/30">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-500">Connect With Me</h3>
                <div className="flex gap-4">
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-cyan-500/50 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300 hover:scale-110"
                  >
                    <a href="https://github.com/abhishek007-git" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-cyan-500/50 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300 hover:scale-110"
                  >
                    <a
                      href="https://www.linkedin.com/in/abhishek-kumar-97a99631b/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-cyan-500/50 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300 hover:scale-110"
                  >
                    <a href="https://x.com/Abhishe07793339" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Follow my journey and latest projects on social media
                </p>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-bold text-green-500">Available for Projects</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Currently accepting new projects and collaborations. Let's build something amazing together!
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Typical response time: 24 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form - Enhanced */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-br from-background via-background/95 to-cyan-500/5 border-cyan-500/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                    Start a Conversation
                  </h2>
                  <p className="text-muted-foreground">
                    Tell me about your project and let's discuss how we can work together
                  </p>
                </div>

                {/* Success/Error Messages */}
                {submissionState.isSuccess && (
                  <Alert className="mb-6 border-green-500/20 bg-green-500/10">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      {submissionState.message}
                    </AlertDescription>
                  </Alert>
                )}

                {submissionState.isError && (
                  <Alert className="mb-6 border-red-500/20 bg-red-500/10">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-700 dark:text-red-400">
                      {submissionState.message}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className={`border-cyan-500/20 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 ${
                          errors.name ? "border-red-500 focus:border-red-500" : ""
                        }`}
                        disabled={submissionState.isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className={`border-cyan-500/20 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 ${
                          errors.email ? "border-red-500 focus:border-red-500" : ""
                        }`}
                        disabled={submissionState.isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold">
                      Project Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Web Development Project / Consultation / Collaboration"
                      required
                      className={`border-cyan-500/20 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 ${
                        errors.subject ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      disabled={submissionState.isSubmitting}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold">
                      Project Details <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project goals, timeline, budget, and any specific requirements..."
                      rows={6}
                      required
                      className={`border-cyan-500/20 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none transition-all duration-300 hover:border-cyan-500/40 ${
                        errors.message ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      disabled={submissionState.isSubmitting}
                    />
                    <div className="flex justify-between items-center">
                      {errors.message ? (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </p>
                      ) : (
                        <div />
                      )}
                      <p className="text-xs text-muted-foreground">{formData.message.length}/1000 characters</p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submissionState.isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {submissionState.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to receive email responses regarding your inquiry.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-20">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-500/10 via-cyan-400/5 to-cyan-600/10 border-cyan-500/30 shadow-2xl">
            <CardContent className="p-12">
              <div className="mb-6">
                <Calendar className="h-16 w-16 text-cyan-500 mx-auto mb-4" />
              </div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                Ready to Start Your Project?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you have a detailed project plan or just an idea, I'm here to help you navigate the development
                process and bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-8 py-3 transition-all duration-300 hover:scale-105">
                  Schedule a Free Consultation
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/10 font-semibold px-8 py-3 transition-all duration-300 hover:scale-105"
                >
                  <a href="/projects">View My Work</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
