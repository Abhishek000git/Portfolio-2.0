"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Code, Heart, ArrowUp } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-background via-background to-cyan-500/5 border-t border-cyan-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-cyan-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                Abhishek Kumar
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Crafting the future through innovative software solutions. Passionate about creating exceptional digital
              experiences that make a difference.
            </p>
            <div className="flex gap-4">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all duration-300"
              >
                <a href="https://github.com/abhishek007-git" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all duration-300"
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
                className="border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all duration-300"
              >
                <a href="https://x.com/Abhishe07793339" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all duration-300"
              >
                <a href="/contact">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-cyan-500">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projects" },
                { href: "/experience", label: "Experience" },
                { href: "/education", label: "Education" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-cyan-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-cyan-500">Services</h3>
            <ul className="space-y-4">
              {["Web Development", "Mobile Apps", "AI Integration", "Consulting"].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground hover:text-cyan-500 transition-colors duration-300 flex items-center gap-2 group cursor-pointer">
                    <div className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-cyan-500">Stay Connected</h3>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-cyan-500" />
                <span className="text-sm">abhishekiitkgp007@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-cyan-500" />
                <span className="text-sm">+91 88408-68076</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-cyan-500" />
                <span className="text-sm">Kanpur, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-cyan-500/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© 2025 Abhishek Kumar. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-cyan-500 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-cyan-500 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>and lots of coffee</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
