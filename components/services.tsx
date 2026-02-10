'use client'

import React from 'react'
import { Check } from 'lucide-react'

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Social Media Design',
      description: 'Eye-catching posts, stories, and templates that stop the scroll and drive engagement across all platforms.',
      shape: 'circles', // Two overlapping circles
      features: ['Posts & Stories', 'Graphics & Templates', 'Feed Aesthetics', 'Social Assets'],
    },
    {
      id: 2,
      title: 'Video Creation',
      description: 'From concept to delivery, we create compelling video content that tells your story and converts viewers.',
      shape: 'play', // Play button triangle
      features: ['Promotional Videos', 'Product Demos', 'Animations', 'Editing & Effects'],
    },
    {
      id: 3,
      title: 'Branding & Logo Design',
      description: 'Complete brand identity that represents your vision, values, and sets you apart from competitors.',
      shape: 'hexagon', // Hexagon shape
      features: ['Logo Design', 'Brand Guidelines', 'Color Palettes', 'Typography'],
    },
    {
      id: 4,
      title: 'Custom Tools & Software',
      description: 'Tailor-made solutions designed specifically for your workflow, saving time and increasing efficiency.',
      shape: 'grid', // Grid pattern
      features: ['Web Tools', 'Automation', 'Integration', 'Custom Features'],
    },
    {
      id: 5,
      title: 'Website Development',
      description: 'Beautiful, fast, and conversion-focused websites that represent your brand and drive results.',
      shape: 'layers', // Layered squares
      features: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'User Experience'],
    },
    {
      id: 6,
      title: 'Complete Packages',
      description: 'Integrated solutions combining multiple services for maximum impact and cohesive brand presence.',
      shape: 'star', // Star shape
      features: ['All Services', 'Brand Cohesion', 'Strategic Planning', 'Support'],
    },
  ]

  const renderShape = (shape: string) => {
    switch (shape) {
      case 'circles':
        return (
          <div className="relative w-16 h-16">
            <div className="absolute w-10 h-10 rounded-full border-2 border-accent top-0 left-0"></div>
            <div className="absolute w-10 h-10 rounded-full border-2 border-accent bottom-0 right-0 opacity-60"></div>
          </div>
        )
      case 'play':
  return (
    <svg
      className="w-16 h-16 text-accent"
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        d="M24 18 L46 32 L24 46 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )

      case 'hexagon':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
            <path
              d="M32 8L48 16L48 40L32 48L16 40L16 16Z"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            />
          </svg>
        )
      case 'grid':
        return (
          <div className="grid grid-cols-2 gap-2 w-14 h-14">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-5 h-5 border-2 border-accent rounded"></div>
            ))}
          </div>
        )
      case 'layers':
        return (
          <div className="relative w-16 h-16 space-y-1.5">
            <div className="w-12 h-3 border-2 border-accent rounded"></div>
            <div className="w-12 h-3 border-2 border-accent rounded opacity-70"></div>
            <div className="w-12 h-3 border-2 border-accent rounded opacity-40"></div>
          </div>
        )
      case 'star':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
            <path
              d="M32 8L40 28L61 28L44 41L52 61L32 48L12 61L20 41L3 28L24 28Z"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section id="services" className="relative py-20 md:py-22 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
            <span className="text-sm font-medium text-accent">Our Expertise</span>
          </div>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Services That <span className="text-accent">Transform</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Comprehensive creative solutions tailored to elevate your brand and achieve your business goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-2xl border border-muted/50 bg-card p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              style={{
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              {/* Subtle background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -z-10 group-hover:bg-accent/10 transition-all duration-300"></div>

              <div className="relative z-10 space-y-6">
                {/* Geometric Icon with subtle animation */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-accent/10 group-hover:bg-accent/15 transition-all duration-300 group-hover:scale-110">
                  {renderShape(service.shape)}
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2 pt-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Not sure which service is right for you?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors hover:translate-x-1 duration-300"
          >
            Schedule a free consultation →
          </a>
        </div>
      </div>
    </section>
  )
}
