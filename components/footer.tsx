import React from 'react'
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-muted/30 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <span className="font-bold text-accent-foreground">∞</span>
              </div>
              <span className="text-lg font-bold text-foreground">CreativeFlow</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transforming ideas into impactful digital experiences since 2019.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-muted/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
              >
                <Twitter className="h-4 w-4 text-muted-foreground hover:text-accent" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-muted/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-accent" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-muted/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
              >
                <Instagram className="h-4 w-4 text-muted-foreground hover:text-accent" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Social Media Design
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Video Creation
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Branding & Logo
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Custom Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog (Coming Soon)
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Get In Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@creativeflow.com"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@creativeflow.com
              </a>
              <p className="text-sm text-muted-foreground">
                Response time: <span className="text-foreground font-semibold">24 hours</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Based in timezone: UTC+5:30
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-muted/30"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 CreativeFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
