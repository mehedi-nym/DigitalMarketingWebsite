'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import dayjs from 'dayjs'
import { supabaseServer } from '@/lib/supabase-server'
import { Calendar } from '@/components/ui/calendar'
import { getAvailability } from '@/lib/booking/getAvailability'
import { validateBooking } from '@/lib/booking/validateBooking'

export default function ConsultationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [fullyBookedDates, setFullyBookedDates] = useState<Date[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    fetchFullDates()
  }, [])

const fetchFullDates = async () => {
  // 1. Get all consultation dates
  const { data } = await supabaseServer
    .from('consultations')
    .select('consultation_date')

  if (data) {
    // 2. Count bookings per date
    const counts: Record<string, number> = {}
    data.forEach(item => {
      counts[item.consultation_date] = (counts[item.consultation_date] || 0) + 1
    })

    // 3. If a date has 8+ bookings, mark it as full
    const full = Object.keys(counts)
      .filter(date => counts[date] >= 1)
      .map(d => dayjs(d).toDate())
    
    setFullyBookedDates(full)
  }
}

useEffect(() => {
  if (isOpen) fetchFullDates()
}, [isOpen])

  if (!isOpen || !mounted) return null

  const handleClose = () => {
    setStep(1); setSelectedDate(undefined); setAvailableSlots([]);
    setSelectedTime(null); setName(''); setPhone(''); setErrorMessage(null);
    onClose();
  }

  // DISABLER LOGIC: Past, Today, Friday (5), Saturday (6)
  const isUnavailable = (date: Date) => {
    const day = date.getDay()
    const isPastOrToday = dayjs(date).isBefore(dayjs(), 'day') || dayjs(date).isSame(dayjs(), 'day')
    const isWeekend = day === 5 || day === 6
    return isPastOrToday || isWeekend
  }

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return
    setErrorMessage(null); setSelectedDate(date); setLoadingSlots(true);
    const result = await getAvailability(date)
    if (result.error) {
      setErrorMessage(result.error); setAvailableSlots([]);
    } else {
      setAvailableSlots(result.slots || []); setStep(2);
    }
    setLoadingSlots(false)
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !name.trim() || !phone.trim()) {
      setErrorMessage('Please fill all required fields.'); return
    }
    setSubmitting(true); setErrorMessage(null)
    const validation = await validateBooking(selectedDate, selectedTime)
    if (!validation.valid) {
      setErrorMessage(validation.message || 'Slot not available.');
      setSubmitting(false); return
    }
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD')
    const { error } = await supabaseServer.from('consultations').insert([{
      name: name.trim(), phone: phone.trim(), consultation_date: formattedDate,
      consultation_time: selectedTime, status: 'pending',
    }])
    if (error) {
      setErrorMessage(error.code === '23505' ? 'Time slot just booked.' : 'Something went wrong.')
      setSubmitting(false); return
    }
    setSubmitting(false); handleClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-end overflow-hidden antialiased">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" onClick={handleClose} />

      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 ease-out flex flex-col">
        {/* Animated Progress Sidebar Line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gray-50">
           <div className="w-full bg-[#591FFF] transition-all duration-700" style={{ height: `${(step / 3) * 100}%` }} />
        </div>

        <header className="p-10 pb-6 flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#591FFF]">Step 0{step}</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">Consultation</h2>
          </div>
          <button onClick={handleClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-10">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-bold border border-red-100 animate-in fade-in zoom-in-95">
              {errorMessage}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">Choose a date</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-gray-200"/> Holiday</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-red-400 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-red-400"/> Fully Booked</div>
                </div>
              </div>
              <div className="bg-gray-50/50 rounded-[32px] p-4 border border-gray-100">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={[isUnavailable, ...fullyBookedDates]}
                  modifiers={{ booked: fullyBookedDates }}
                  modifiersClassNames={{ booked: "bg-red-50 text-red-500 border-red-100 opacity-100" }}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <button onClick={() => setStep(1)} className="text-[10px] font-black text-gray-400 hover:text-[#591FFF] tracking-widest uppercase">← Back to Calendar</button>
              <h3 className="text-3xl font-bold text-gray-900">{dayjs(selectedDate).format('MMMM D')}</h3>
              {loadingSlots ? (
                <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-gray-100 border-t-[#591FFF] rounded-full animate-spin" /></div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {availableSlots.map((slot) => (
                    <button key={slot} onClick={() => { setSelectedTime(slot); setStep(3); }}
                      className="group p-5 rounded-2xl border-2 border-gray-100 hover:border-[#591FFF] hover:bg-[#591FFF]/5 transition-all text-center">
                      <span className="text-lg font-bold text-gray-700 group-hover:text-[#591FFF]">{slot}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <button onClick={() => setStep(2)} className="text-[10px] font-black text-gray-400 hover:text-[#591FFF] tracking-widest uppercase">← Back to Time</button>
              <div className="p-6 bg-[#591FFF] rounded-[32px] text-white shadow-xl shadow-[#591FFF]/20">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Confirmed Schedule</p>
                <p className="text-2xl font-bold mt-1">{dayjs(selectedDate).format('MMM D')} at {selectedTime}</p>
              </div>
              <div className="space-y-6">
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full text-xl bg-transparent border-b-2 border-gray-100 py-4 outline-none focus:border-[#591FFF] transition-colors placeholder:text-gray-200" />
                <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xl bg-transparent border-b-2 border-gray-100 py-4 outline-none focus:border-[#591FFF] transition-colors placeholder:text-gray-200" />
              </div>
            </div>
          )}
        </main>

        <footer className="p-10 pt-6">
          {step === 3 && (
            <button onClick={handleBooking} disabled={submitting}
              className="w-full bg-[#591FFF] text-white py-5 rounded-2xl font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#591FFF]/30 disabled:opacity-50">
              {submitting ? 'Confirming...' : 'Book Now'}
            </button>
          )}
        </footer>
      </div>
    </div>,
    document.body
  )
}