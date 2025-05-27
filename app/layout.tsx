import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StagewiseToolbar } from '@stagewise/toolbar-next'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chinese Name AI - Generate meaningful Chinese names for international friends",
  description: "Use AI technology to create personalized Chinese names for international friends, combining phonetic similarity and cultural significance",
  generator: 'v0.dev'
}

const stagewiseConfig = {
  plugins: []
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {process.env.NODE_ENV === 'development' && (
          <StagewiseToolbar config={stagewiseConfig} />
        )}
      </body>
    </html>
  )
}
