'use client'

import Header from '@/components/header'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <CTA />
      <Footer />
    </div>
  )
}
