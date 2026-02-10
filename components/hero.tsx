import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background pt-24 md:pt-32">
      {/* Minimal background accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-b from-accent/15 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gradient-to-t from-accent/10 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 md:space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <div className="h-1 w-12 bg-accent"></div>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Creative Studio
                </span>
              </div>
              
              <h1 className="text-balance text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-foreground">
                Transform Your <span className="font-semibold text-accent">Vision</span> Into Reality
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                We craft exceptional digital experiences that captivate audiences and drive meaningful results for your brand.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-8 py-6 text-base rounded-lg">
                Start Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button className="border border-border hover:bg-secondary/40 bg-transparent px-8 py-6 text-base text-foreground rounded-lg transition-colors">
                Explore Work
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="space-y-2">
                <p className="text-3xl font-light text-foreground">150+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-light text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-light text-foreground">5+</p>
                <p className="text-sm text-muted-foreground">Years in Business</p>
              </div>
            </div>
          </div>

          {/* Visual Element - Elegant Geometric Composition */}
          <div className="relative h-96 md:h-full lg:h-[550px] flex items-center justify-center">
            {/* Background shapes */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Live indicator - pulsing center circle */}
              <div className="absolute w-8 h-8 rounded-full bg-accent animate-pulse-ring"></div>
              
              {/* Concentric circles with subtle animation */}
              <div className="absolute w-80 h-80 rounded-full border border-accent/20 animate-pulse" style={{ animationDuration: '3s' }}></div>
              <div className="absolute w-64 h-64 rounded-full border border-accent/10"></div>
              <div className="absolute w-48 h-48 rounded-full border border-accent/5"></div>
            </div>

            {/* Cards orbiting around center */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Card 1 */}
              <div className="absolute animate-orbit">
                <div className="w-40 h-32 rounded-xl bg-gradient-to-b from-accent/15 to-accent/5 border border-accent/20 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 hover:bg-gradient-to-b hover:from-accent/20 hover:to-accent/10 transition-all duration-300">
                  <div className="w-2 h-12 bg-accent rounded-full"></div>
                  <p className="text-xs font-semibold text-foreground text-center">Design</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute animate-orbit-delay-2">
                <div className="w-40 h-32 rounded-xl bg-gradient-to-b from-accent/15 to-accent/5 border border-accent/20 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 hover:bg-gradient-to-b hover:from-accent/20 hover:to-accent/10 transition-all duration-300">
                  <div className="w-12 h-2 bg-accent rounded-full"></div>
                  <p className="text-xs font-semibold text-foreground text-center">Development</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="absolute animate-orbit-delay-3">
                <div className="w-40 h-32 rounded-xl bg-gradient-to-b from-accent/15 to-accent/5 border border-accent/20 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 hover:bg-gradient-to-b hover:from-accent/20 hover:to-accent/10 transition-all duration-300">
                  <div className="w-8 h-8 bg-accent rounded-lg rotate-45"></div>
                  <p className="text-xs font-semibold text-foreground text-center">Strategy</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="absolute animate-orbit-delay-4">
                <div className="w-40 h-32 rounded-xl bg-gradient-to-b from-accent/15 to-accent/5 border border-accent/20 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 hover:bg-gradient-to-b hover:from-accent/20 hover:to-accent/10 transition-all duration-300">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-xs font-semibold text-foreground text-center">Innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
