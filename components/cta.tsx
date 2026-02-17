'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import ConsultationModal from './ConsultationModal'

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative py-24 md:py-20 bg-background overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right floating circle */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full border border-accent/10 animate-float-up" style={{ animationDuration: '4s' }}></div>
        
        {/* Bottom left floating circle */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full border border-accent/10 animate-float-up" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        
        {/* Center subtle pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-accent/5 to-accent/2 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 text-center">
          {/* Badge */}
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm">
              <p className="text-sm font-medium text-accent">Ready to Transform</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Animated heading with gradient effect */}
            <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Let's Create Something
              <br />
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent/60 animate-gradient-shift">
                  Extraordinary Together
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              From concept to completion, we partner with you to bring your vision to life. 
              Let's collaborate and create something that truly stands out.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-glow-pulse">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="border border-accent/30 hover:bg-accent/5 bg-transparent px-8 py-6 text-base rounded-full text-foreground transition-all duration-300 group" onClick={() => {
              setIsModalOpen(true)
            }}>
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats/Features */}
          <div className="pt-12 border-t border-accent/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Stat 1 */}
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-accent">100%</div>
                <p className="text-sm md:text-base text-muted-foreground">Custom Solutions</p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-accent">2-6 Weeks</div>
                <p className="text-sm md:text-base text-muted-foreground">Fast Turnaround</p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-accent">24/7</div>
                <p className="text-sm md:text-base text-muted-foreground">Support & Updates</p>
              </div>
            </div>
          </div>

          {/* Trust marker */}
          <div className="pt-8 space-y-4">
            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Trusted by leading brands</p>
            <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap opacity-60">
            </div>
          </div>
        </div>
      </div>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
