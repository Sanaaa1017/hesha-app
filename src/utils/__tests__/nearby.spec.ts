import { describe, it, expect } from 'vitest'
import { rankStoresByDistance } from '../nearby'
import type { DrinkStore } from '@/types/store'

const stores: DrinkStore[] = [
  { id: 'far', name: '遠', brandId: null, lat: 25.1, lng: 121.6, address: '', openHour: 10, closeHour: 22 },
  { id: 'near', name: '近', brandId: null, lat: 25.034, lng: 121.566, address: '', openHour: 10, closeHour: 22 },
  { id: 'mid', name: '中', brandId: null, lat: 25.05, lng: 121.57, address: '', openHour: 10, closeHour: 22 },
]

describe('rankStoresByDistance', () => {
  const user = { lat: 25.033, lng: 121.5654 }
  const noon = new Date('2026-06-13T12:00:00')

  it('依距離由近到遠排序', () => {
    const ranked = rankStoresByDistance(stores, user, noon)
    expect(ranked.map((s) => s.id)).toEqual(['near', 'mid', 'far'])
  })

  it('每筆都帶距離與營業狀態', () => {
    const ranked = rankStoresByDistance(stores, user, noon)
    expect(ranked[0]!.distanceMeters).toBeGreaterThanOrEqual(0)
    expect(ranked[0]!.isOpenNow).toBe(true)
  })
})
