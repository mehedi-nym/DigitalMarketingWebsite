'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabaseServer as supabase } from '@/lib/supabase-server'


type Project = {
  id: string
  title: string
  slug: string
  category: string
  description: string
  image: string
}

export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    <section id="portfolio" className="relative py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 space-y-4">
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
            <span className="text-sm font-medium text-accent">Selected Work</span>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Projects that <span className="text-accent">showcase</span> our expertise
            </h2>

            <p className="mt-6 text-lg text-muted-foreground">
              A curated collection of recent work demonstrating our approach to design, strategy, and execution.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-muted-foreground">Loading projects...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
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

        {/* Bottom CTA */}
        <div className="mt-20 border-t border-muted/40 pt-12 text-center">
          <p className="mb-6 text-muted-foreground">Interested in working together?</p>

          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-8 py-3 font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
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
          </Link>
        </div>
      </div>
    </section>
  )
}
