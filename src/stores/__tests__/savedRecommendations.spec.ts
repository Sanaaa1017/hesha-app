import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSavedRecommendationsStore } from '../savedRecommendations'
import type { Recommendation } from '@/types/recommend'

const rec: Recommendation = {
  menuItemId: 'm1',
  brandId: 'b',
  brandName: '五十嵐',
  itemName: '珍珠奶茶',
  price: 50,
  sugarG: 42,
  calories: 380,
  caffeineMg: 90,
  reason: '茶香十足',
  score: 3,
}

describe('useSavedRecommendationsStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('save 後加入收藏並可由 isSaved 查詢', () => {
    const store = useSavedRecommendationsStore()
    store.save(rec, 'hot')
    expect(store.items).toHaveLength(1)
    expect(store.isSaved('m1')).toBe(true)
  })

  it('remove 後從收藏移除', () => {
    const store = useSavedRecommendationsStore()
    store.save(rec, 'any')
    const savedId = store.items[0]!.id
    store.remove(savedId)
    expect(store.items).toHaveLength(0)
    expect(store.isSaved('m1')).toBe(false)
  })
})
