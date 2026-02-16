'use client'

import { useEffect, useState } from 'react'
import { supabaseServer } from '@/lib/supabase-server'
import { createPortal } from 'react-dom'

type Question = {
  id: string
  question: string
  type: string
  options: string[] | null
  step: number
  required: boolean
  placeholder: string | null // Add this line
}

type GroupedQuestions = Record<number, Question[]>

export default function QuoteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [groupedQuestions, setGroupedQuestions] = useState<GroupedQuestions>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [totalSteps, setTotalSteps] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const fetchQuestions = async () => {
      setLoading(true)
      const { data } = await supabaseServer
        .from('quote_questions')
        .select('*')
        .order('step', { ascending: true })

      if (data) {
        const parsed = data.map((q) => ({
          ...q,
          options: q.options ? q.options : null,
        }))
        setQuestions(parsed)
        const grouped: GroupedQuestions = {}
        parsed.forEach((q) => {
          if (!grouped[q.step]) grouped[q.step] = []
          grouped[q.step].push(q)
        })
        setGroupedQuestions(grouped)
        setTotalSteps(Math.max(...parsed.map((q) => q.step), 1))
      }
      setLoading(false)
    }
    fetchQuestions()
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const currentQuestions = groupedQuestions[currentStep] || []

  const handleChange = (questionText: string, value: any, isMultiSelect: boolean = false) => {
    if (isMultiSelect) {
      const current = answers[questionText] || []
      const updated = current.includes(value)
        ? current.filter((item: string) => item !== value)
        : [...current, value]
      setAnswers({ ...answers, [questionText]: updated })
    } else {
      setAnswers({ ...answers, [questionText]: value })
    }
  }

  const isStepValid = () => {
    return currentQuestions.every((q) => {
      if (!q.required) return true
      const answer = answers[q.question]
      if (Array.isArray(answer)) return answer.length > 0
      return answer && answer.toString().trim() !== ''
    })
  }

  const handleNext = () => {
    if (!isStepValid()) {
      alert('Please complete all required fields')
      return
    }
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    if (!isStepValid()) return
    setSubmitting(true)
    try {
      await supabaseServer.from('quotes').insert([
        {
          answers,
          name: answers['Your full name'] || null,
          phone: answers['Your phone number'] || null,
        },
      ])
      alert('Quote submitted successfully!')
      onClose()
      setCurrentStep(1)
      setAnswers({})
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white overflow-y-auto antialiased">
      {/* Large Header Navigation */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-6 md:p-10 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <span className="font-bold text-accent-foreground">∞</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              CreativeFlow
            </span>
          </div>
          <div className="h-6 w-[1px] bg-gray-200" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        
        {/* Large Close Button */}
        <button
          onClick={onClose}
          className="group flex items-center gap-3 p-2 hover:bg-gray-100 rounded-full transition-all"
        >
          <span className="hidden md:block text-sm font-bold uppercase tracking-tight">Close</span>
          <div className="bg-gray-900 text-white p-3 rounded-full group-hover:bg-[#591FFF] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 pb-32">
        <div className="w-full max-w-2xl">
          {loading ? (
            <div className="flex flex-col items-center animate-pulse">
              <div className="w-12 h-12 border-4 border-gray-100 border-t-[#591FFF] rounded-full animate-spin mb-4" />
              <p className="text-gray-400 font-medium">Hold Tight...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#591FFF] transition-all duration-700 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                  {currentQuestions.length > 1 ? "Let's get some details" : currentQuestions[0]?.question}
                </h1>
                <p className="text-gray-500 text-lg italic">Please provide the following information.</p>
              </div>
              <div className="space-y-5">
                {currentQuestions.map((q) => (
                  <div key={q.id} className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                    {['text', 'number'].includes(q.type) && (
                      <input
                        type={q.type}
                        placeholder={q.placeholder || "Type your answer..."} // Dynamic placeholder from DB
                        className="w-full text-2xl md:text-3xl bg-transparent border-b-2 border-gray-100 py-4 outline-none focus:border-[#591FFF] transition-colors placeholder:text-gray-200"
                        value={answers[q.question] || ''}
                        onChange={(e) => handleChange(q.question, e.target.value)}
                      />
                    )}

                    {q.type === 'textarea' && (
                      <textarea
                        placeholder={q.placeholder || "Write something..."}
                        className="w-full text-xl bg-gray-50 rounded-3xl p-8 outline-none focus:ring-2 focus:ring-[#591FFF]/20 border border-transparent focus:border-[#591FFF] transition-all min-h-[200px]"
                        value={answers[q.question] || ''}
                        onChange={(e) => handleChange(q.question, e.target.value)}
                      />
                    )}

                    {(q.type === 'radio' || q.type === 'select') && (
                        
                     <div>
                        <p className="text-gray-500 text-sm mb-2">{q.placeholder || "Select an option must:"}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {q.options?.map((option) => {
                          const isMulti = q.type === 'select';
                          const isSelected = isMulti
                            ? (answers[q.question] || []).includes(option)
                            : answers[q.question] === option;
                          
                          return (
                            <button
                              key={option}
                              onClick={() => handleChange(q.question, option, isMulti)}
                              className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                                isSelected 
                                  ? 'border-[#591FFF] bg-[#591FFF]/5 shadow-lg shadow-[#591FFF]/10' 
                                  : 'border-gray-100 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-lg font-semibold ${isSelected ? 'text-[#591FFF]' : 'text-gray-700'}`}>
                                  {option}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  isSelected ? 'border-[#591FFF] bg-[#591FFF]' : 'border-gray-300'
                                }`}>
                                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      </div>  
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Controls */}
      {!loading && (
        <footer className="fixed bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handlePrevious}
                className="text-gray-400 hover:text-black font-bold uppercase tracking-widest text-sm transition-colors"
              >
                ← Back
              </button>
            ) : <div />}

            <button
              onClick={currentStep < totalSteps ? handleNext : handleSubmit}
              disabled={submitting}
              className="bg-[#591FFF] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#591FFF]/20 disabled:opacity-50"
            >
              {submitting ? 'Processing...' : currentStep < totalSteps ? 'Continue' : 'Submit Quote'}
            </button>
          </div>
        </footer>
      )}
    </div>,
    document.body
  )
}