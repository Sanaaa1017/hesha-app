import { describe, it, expect } from 'vitest'
import { recommend } from '../recommend'
import type { MenuItem } from '@/types/menu'
import type { DrinkRecord } from '@/types/drinkRecord'

function makeItem(overrides: Partial<MenuItem>): MenuItem {
  return {
    id: Math.random().toString(),
    brandId: 'b',
    name: '飲料',
    category: 'tea',
    price: 50,
    isRegional: false,
    isSeasonal: false,
    sugarG: 40,
    calories: 200,
    caffeineMg: 50,
    ...overrides,
  }
}

const getBrandName = () => '測試品牌'

describe('recommend 推薦引擎', () => {
  it('低糖偏好者優先推薦低糖品項', () => {
    const items = [
      makeItem({ id: 'high', name: '高糖', sugarG: 50 }),
      makeItem({ id: 'low', name: '低糖', sugarG: 20 }),
    ]
    const result = recommend(
      { items, prefs: ['low-sugar'], context: 'any', history: [] },
      getBrandName,
    )
    expect(result[0]!.menuItemId).toBe('low')
    expect(result[0]!.reason).toContain('含糖量較低')
  })

  it('提神情境優先推薦高咖啡因品項', () => {
    const items = [
      makeItem({ id: 'decaf', name: '無咖啡因', caffeineMg: 0 }),
      makeItem({ id: 'strong', name: '濃茶', caffeineMg: 95 }),
    ]
    const result = recommend(
      { items, prefs: [], context: 'energize', history: [] },
      getBrandName,
    )
    expect(result[0]!.menuItemId).toBe('strong')
    expect(result[0]!.reason).toContain('提神')
  })

  it('嚐鮮者會避免推薦喝過的品項', () => {
    const items = [
      makeItem({ id: 'drunk', name: '喝過的季節品', isSeasonal: true }),
      makeItem({ id: 'fresh', name: '沒喝過的季節品', isSeasonal: true }),
    ]
    const history: DrinkRecord[] = [
      {
        id: 'r1',
        drinkName: '喝過的季節品',
        storeName: '店',
        rating: 5,
        notes: null,
        lastDrankAt: '2026-06-01',
        photoUrl: null,
        price: null,
        menuItemId: 'drunk',
        brandId: 'b',
        createdAt: '',
        updatedAt: '',
      },
    ]
    const result = recommend(
      { items, prefs: ['novelty'], context: 'any', history },
      getBrandName,
    )
    expect(result[0]!.menuItemId).toBe('fresh')
  })

  it('limit 控制回傳數量', () => {
    const items = Array.from({ length: 10 }, (_, i) => makeItem({ id: `i${i}` }))
    const result = recommend(
      { items, prefs: [], context: 'any', history: [], limit: 3 },
      getBrandName,
    )
    expect(result).toHaveLength(3)
  })

  it('預設（無偏好、無情境）仍能給出推薦', () => {
    const items = [makeItem({ id: 'a' }), makeItem({ id: 'b' })]
    const result = recommend({ items, prefs: [], context: 'any', history: [] }, getBrandName)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]!.reason).toBeTruthy()
  })
})
