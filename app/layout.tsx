import type React from "react"
import type { Metadata } from "next"
import { Fredoka, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _fredoka = Fredoka({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fardin Khan",
  description: "A communications and strategies expert, specializing in business strategies, negotiation and conflict resolution.",
  icons: {
    icon: "/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased cursor-cat">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
