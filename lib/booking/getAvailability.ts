import dayjs from 'dayjs'
import { supabaseServer } from '@/lib/supabase-server'
import { generateSlots } from './generateSlots'

export async function getAvailability(date: Date) {
  const formattedDate = dayjs(date).format('YYYY-MM-DD')

  // 1️⃣ Get active settings
  const { data: settings, error: settingsError } = await supabaseServer
    .from('consultation_settings')
    .select('*')
    .eq('is_active', true)
    .single()

  if (settingsError || !settings) {
    return { error: 'Settings not configured.' }
  }

  // 2️⃣ Check blocked date
  const { data: blocked } = await supabaseServer
    .from('consultation_blocked_dates')
    .select('*')
    .eq('date', formattedDate)
    .single()

  if (blocked) {
    return { slots: [], isBlocked: true }
  }

  // 3️⃣ Fetch existing bookings
  const { data: bookings } = await supabaseServer
    .from('consultations')
    .select('consultation_time')
    .eq('consultation_date', formattedDate)
    .in('status', ['pending', 'confirmed'])

  const bookedTimes =
    bookings?.map((b) =>
      dayjs(b.consultation_time, 'HH:mm:ss').format('HH:mm')
    ) || []

    // 4️⃣ Generate all possible slots
    const allSlots = generateSlots(
      settings.start_time,
      settings.end_time,
      settings.slot_duration
    )
  
    // 5️⃣ Filter out booked slots
    const availableSlots = allSlots.filter(
      (slot) => !bookedTimes.includes(slot)
    )
  
    return { slots: availableSlots, isBlocked: false }
  }
