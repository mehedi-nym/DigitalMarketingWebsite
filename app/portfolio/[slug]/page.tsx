import { supabaseServer as supabase } from '@/lib/supabase-server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'


type Props = {
  params: {
    slug: string
  }
}

type Project = {
  id: string
  title: string
  slug: string
  category: string
  description: string
  image: string
  content: string
}

/* =================================
   Dynamic Project Page (Server)
================================= */
export default async function ProjectPage({ params }: Props) {
  // 1. Await the params first!
  const { slug } = await params; 

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug) // Use the awaited slug
    .single()

  if (error || !project) {
    notFound()
  }

  return (
   <section>
        <Header />
   
    <section className="bg-background py-20 md:py-28">
       
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* --- Breadcrumbs --- */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-muted-foreground">
          <Link 
            href="/" 
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="mr-1 h-4 w-4" />
            Home
          </Link>
          
          <ChevronRight className="h-4 w-4 opacity-50" />
          
          <Link 
            href="/projects" 
            className="hover:text-foreground transition-colors"
          >
            Projects
          </Link>
          
          <ChevronRight className="h-4 w-4 opacity-50" />
          
          <span className="truncate font-medium text-foreground">
            {project.title}
          </span>
        </nav>
        {/* --- End Breadcrumbs --- */}
        
        {/* Category */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          {project.title}
        </h1>

        {/* Description */}
        <p className="mb-10 text-lg text-muted-foreground">
          {project.description}
        </p>

        {/* Image */}
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-muted/40">
          <Image
            src={project.image || '/placeholder.jpg'}
            alt={project.title}
            width={1200}
            height={700}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        {/* Full Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
          {project.content}
        </div>
      </div>
      
    </section>
    <Footer />
    </section>
  )
}
