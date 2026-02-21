'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabaseServer as supabase } from '@/lib/supabase-server'
import QuoteModal from '@/components/QuoteModal'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import Footer from '@/components/footer'

type Project = {
  id: string
  title: string
  slug: string
  category: string
  description: string
  image: string
}

export default function ProjectsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  /* ================================
     Fetch from Supabase
  ================================= */
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
        setError('Failed to load projects')
      } else {
        setProjects(data || [])
      }

      setLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <Header />
      <section className="py-16 md:py-20 lg:py-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 pt-2">
            <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3">
              <span className="text-sm font-medium text-accent">Our Work</span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-balance text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                Projects that <span className="text-accent">define</span> excellence
              </h1>

              <p className="mt-6 text-lg text-muted-foreground">
                A comprehensive showcase of our creative work, demonstrating our expertise in design, strategy, and digital transformation across diverse industries.
              </p>
            </div>
          </div>
        </div>
      </section>
   {/* Projects Section */}
      <section className="py-2 md:py-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center justify-center py-20">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-muted/40 transition-all duration-500 hover:border-accent/50"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden bg-secondary/30">
                    <Image
                      src={project.image || '/placeholder.jpg'}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Content Container */}
                  <div className="relative bg-background p-6 md:p-8">
                    {/* Category Badge */}
                    <div className="mb-3 inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-3 py-1">
                      <span className="text-xs font-semibold text-accent">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-bold text-foreground md:text-2xl line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>

                    {/* Details Link */}
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all duration-300 hover:gap-3"
                    >
                      See full story
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    {/* Decorative element */}
                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent/20 transition-all duration-500 ${
                        hoveredId === project.id ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="border-t border-muted/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Floating circles for visual interest */}
            <div className="absolute right-0 top-1/2 -z-10 h-40 w-40 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute left-0 bottom-0 -z-10 h-40 w-40 rounded-full bg-accent/5 blur-3xl" />

            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  Ready to bring your vision to life?
                </h2>

                <p className="text-lg text-muted-foreground">
                  Let's collaborate and create something extraordinary together.
                </p>
              </div>

              <Button
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-8 py-3 font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                onClick={() => setOpen(true)}
              >
                Talk with Us
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
      </section>

      <QuoteModal isOpen={open} onClose={() => setOpen(false)} />
    <Footer />
    </div>
    
  )
}
