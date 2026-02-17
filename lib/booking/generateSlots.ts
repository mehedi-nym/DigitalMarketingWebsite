import dayjs from 'dayjs'

export function generateSlots(
  start: string,
  end: string,
  duration: number
) {
  const slots: string[] = []
  let current = dayjs(`2024-01-01 ${start}`)
  const endTime = dayjs(`2024-01-01 ${end}`)

  while (current.isBefore(endTime)) {
    slots.push(current.format('HH:mm'))
    current = current.add(duration, 'minute')
  }

  return slots
}
