import React from 'react'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-muted/30 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <span className="font-bold text-accent-foreground">∞</span>
            </div>
            <span className="text-xl font-bold text-foreground">CreativeFlow</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
          <Button className="bg-accent hover:bg-accent/90">Let's Talk</Button>
        </div>
      </div>
    </header>
  )
}
