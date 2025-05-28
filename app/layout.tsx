import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Particles } from "@/components/particles"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abhishek Kumar - Software Developer",
  description:
    "Futuristic portfolio showcasing innovative software development projects and expertise in modern web technologies, AI integration, and blockchain development",
  keywords: [
    "Abhishek Kumar",
    "Software Developer",
    "Web Developer",
    "Full Stack",
    "React",
    "Next.js",
    "Blockchain",
    "AI",
  ],
  authors: [{ name: "Abhishek Kumar" }],
  creator: "Abhishek Kumar",
  publisher: "Abhishek Kumar",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhishek-kumar.dev",
    title: "Abhishek Kumar - Software Developer",
    description: "Futuristic portfolio showcasing innovative software development projects and expertise",
    siteName: "Abhishek Kumar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abhishek Kumar - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Kumar - Software Developer",
    description: "Futuristic portfolio showcasing innovative software development projects and expertise",
    creator: "@Abhishe07793339",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#06b6d4" }],
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#06b6d4" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 relative flex flex-col">
            <Particles />
            <Navigation />
            <main className="relative z-10 flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
