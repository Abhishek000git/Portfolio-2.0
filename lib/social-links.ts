// Centralized social media links configuration
export const socialLinks = {
  github: "https://github.com/abhishek007-git",
  linkedin: "www.linkedin.com/in/abhishek-kumar-97a99631b",
  twitter: "https://x.com/Abhishe07793339",
  email: "mailto:abhishekiitkgp007@gmail.com",
  phone: "tel:+918840868076",
  // Additional social platforms
  instagram: "https://www.instagram.com/abhishek_19_28/",
  youtube: "#",
  discord: "#",
  telegram: "#",
  // Professional platforms
  portfolio: "#",
  blog: "#",
  resume: "#",
} as const

export type SocialPlatform = keyof typeof socialLinks

// Helper function to get social link
export const getSocialLink = (platform: SocialPlatform): string => {
  return socialLinks[platform]
}

// Helper function to check if link is external
export const isExternalLink = (url: string): boolean => {
  return url.startsWith("http") || url.startsWith("mailto:") || url.startsWith("tel:")
}

// Social media metadata for SEO and sharing
export const socialMetadata = {
  siteName: "Abhishek Kumar - Software Developer",
  title: "Abhishek Kumar | Full-Stack Developer & AI Enthusiast",
  description:
    "Passionate software developer specializing in modern web technologies, AI integration, and creating exceptional digital experiences.",
  image: "/og-image.jpg",
  url: "https://abhishek-kumar.dev",
  twitterHandle: "@abhishekiitkgp",
  linkedinProfile: "abhishek-kumar-iitkgp",
  githubUsername: "abhishekiitkgp007",
} as const
