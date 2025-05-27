"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, Instagram, Youtube, MessageCircle, Phone } from "lucide-react"
import { socialLinks, isExternalLink } from "@/lib/social-links"

interface SocialLinksProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showLabels?: boolean
  platforms?: Array<keyof typeof socialLinks>
}

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  phone: Phone,
  instagram: Instagram,
  youtube: Youtube,
  discord: MessageCircle,
  telegram: MessageCircle,
} as const

const socialLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  email: "Email",
  phone: "Phone",
  instagram: "Instagram",
  youtube: "YouTube",
  discord: "Discord",
  telegram: "Telegram",
} as const

export function SocialLinks({
  variant = "outline",
  size = "icon",
  className = "",
  showLabels = false,
  platforms = ["github", "linkedin", "twitter", "email"],
}: SocialLinksProps) {
  return (
    <div className={`flex gap-4 ${showLabels ? "flex-col sm:flex-row" : ""} ${className}`}>
      {platforms.map((platform) => {
        const Icon = socialIcons[platform as keyof typeof socialIcons]
        const label = socialLabels[platform as keyof typeof socialLabels]
        const url = socialLinks[platform]

        if (!Icon || !url) return null

        const linkProps = isExternalLink(url) ? { target: "_blank", rel: "noopener noreferrer" } : {}

        return (
          <Button
            key={platform}
            asChild
            variant={variant}
            size={size}
            className="border-orange-500/50 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 hover:scale-110"
          >
            <a href={url} {...linkProps} aria-label={label}>
              <Icon className="h-5 w-5" />
              {showLabels && <span className="ml-2">{label}</span>}
            </a>
          </Button>
        )
      })}
    </div>
  )
}

// Predefined social link sets for different contexts
export function HeaderSocialLinks() {
  return <SocialLinks platforms={["github", "linkedin", "twitter"]} />
}

export function FooterSocialLinks() {
  return <SocialLinks platforms={["github", "linkedin", "twitter", "email"]} />
}

export function ContactSocialLinks() {
  return <SocialLinks platforms={["github", "linkedin", "twitter"]} />
}

export function CompleteSocialLinks() {
  return (
    <SocialLinks
      platforms={["github", "linkedin", "twitter", "email", "instagram", "youtube"]}
      showLabels={true}
      size="default"
    />
  )
}
