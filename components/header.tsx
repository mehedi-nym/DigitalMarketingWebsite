'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import QuoteModal from '@/components/QuoteModal'
import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const [open, setOpen] = useState(false)


  return (
    <header className="fixed top-0 z-50 w-full border-b border-muted/30 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          

{/* Logo */}
<Link href="/" className="flex items-center gap-2">
  <div className="h-10 w-10 overflow-hidden rounded-lg">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnqVgO86GWBsUvXdtBzEXl3TjZCtbbJKEYrg&s"
      alt="CreativeFlow Logo"
      className="h-full w-full object-cover"
    />
  </div>
  <span className="text-xl font-bold text-foreground">
    CreativeFlow
  </span>
</Link>

          {/* Nav */}
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
  className="bg-accent hover:bg-accent/90"
  onClick={() => setOpen(true)}
>
  Let's Talk
</Button>
<QuoteModal isOpen={open} onClose={() => setOpen(false)} />

          </div>
        </div>
      </div>
      
    </header>
    
  )
}


