import type { Coords } from '@/types/store'

/** Haversine 公式計算兩點間距離（公尺） */
export function haversineMeters(a: Coords, b: Coords): number {
  const earthRadius = 6_371_000
  const toRad = (deg: number): number => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * earthRadius * Math.asin(Math.sqrt(h))
}

/** 將距離（公尺）格式化為易讀字串 */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} 公尺`
  return `${(meters / 1000).toFixed(1)} 公里`
}

/** 判斷指定時間是否在營業時間內 */
export function isOpenAt(openHour: number, closeHour: number, date: Date = new Date()): boolean {
  const hour = date.getHours() + date.getMinutes() / 60
  return hour >= openHour && hour < closeHour
}
