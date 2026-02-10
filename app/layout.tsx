import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import '../app/globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Creative Agency | Social Media, Video & Branding Solutions',
  description: 'Full-service creative agency specializing in social media design, video creation, branding, custom tools, and website development. Bring your vision to life.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
