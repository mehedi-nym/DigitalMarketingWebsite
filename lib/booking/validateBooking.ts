import dayjs from 'dayjs'
import { supabaseServer } from '@/lib/supabase-server'

export async function validateBooking(
  date: Date,
  time: string
) {
  const formattedDate = dayjs(date).format('YYYY-MM-DD')

  // 1️⃣ Check blocked
  const { data: blocked } = await supabaseServer
    .from('consultation_blocked_dates')
    .select('*')
    .eq('date', formattedDate)
    .single()

  if (blocked) {
    return { valid: false, message: 'This date is not available.' }
  }

  // 2️⃣ Check existing booking
  const { data: existing } = await supabaseServer
    .from('consultations')
    .select('*')
    .eq('consultation_date', formattedDate)
    .eq('consultation_time', time)
    .in('status', ['pending', 'confirmed'])

  if (existing && existing.length > 0) {
    return { valid: false, message: 'Time slot already booked.' }
  }

  // 3️⃣ Check max_per_day
  const { data: settings } = await supabaseServer
    .from('consultation_settings')
    .select('*')
    .eq('is_active', true)
    .single()

  const { data: bookings } = await supabaseServer
    .from('consultations')
    .select('*')
    .eq('consultation_date', formattedDate)
    .in('status', ['pending', 'confirmed'])

  if ((bookings?.length || 0) >= settings.max_per_day) {
    return { valid: false, message: 'This day is fully booked.' }
  }

  return { valid: true }
}
