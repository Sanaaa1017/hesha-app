import { describe, it, expect } from 'vitest'
import { haversineMeters, formatDistance, isOpenAt } from '../geo'

describe('geo 工具', () => {
  it('同一點距離為 0', () => {
    const p = { lat: 25.033, lng: 121.5654 }
    expect(haversineMeters(p, p)).toBe(0)
  })

  it('台北 101 到台北車站約 4~6 公里', () => {
    const taipei101 = { lat: 25.033, lng: 121.5654 }
    const taipeiStation = { lat: 25.0478, lng: 121.5173 }
    const d = haversineMeters(taipei101, taipeiStation)
    expect(d).toBeGreaterThan(4000)
    expect(d).toBeLessThan(6000)
  })

  it('formatDistance 1000 以下用公尺、以上用公里', () => {
    expect(formatDistance(350)).toBe('350 公尺')
    expect(formatDistance(1500)).toBe('1.5 公里')
  })

  it('isOpenAt 判斷營業時間', () => {
    const noon = new Date('2026-06-13T12:00:00')
    const earlyMorning = new Date('2026-06-13T08:00:00')
    expect(isOpenAt(10, 22, noon)).toBe(true)
    expect(isOpenAt(10, 22, earlyMorning)).toBe(false)
  })
})
