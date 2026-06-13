import { describe, it, expect } from 'vitest'
import { monthlyNutrition, nutritionForMonth, type NutritionValues } from '../stats'
import type { DrinkRecord } from '@/types/drinkRecord'

function makeRecord(overrides: Partial<DrinkRecord>): DrinkRecord {
  return {
    id: Math.random().toString(),
    drinkName: '飲料',
    storeName: '店家',
    rating: null,
    notes: null,
    lastDrankAt: '2026-06-01',
    photoUrl: null,
    price: null,
    menuItemId: null,
    brandId: null,
    createdAt: '',
    updatedAt: '',
    ...overrides,
  }
}

const table: Record<string, NutritionValues> = {
  m1: { sugarG: 40, calories: 300, caffeineMg: 90 },
  m2: { sugarG: 30, calories: 150, caffeineMg: 60 },
}
const resolve = (id: string): NutritionValues | undefined => table[id]

describe('monthlyNutrition', () => {
  it('忽略沒有連結菜單品項的紀錄', () => {
    const records = [
      makeRecord({ menuItemId: null }),
      makeRecord({ menuItemId: 'm1' }),
    ]
    const result = monthlyNutrition(records, resolve)
    expect(result).toHaveLength(1)
    expect(result[0]!.count).toBe(1)
  })

  it('忽略查不到品項的紀錄', () => {
    const records = [makeRecord({ menuItemId: 'unknown' })]
    expect(monthlyNutrition(records, resolve)).toHaveLength(0)
  })

  it('依月份累加糖分、熱量、咖啡因', () => {
    const records = [
      makeRecord({ menuItemId: 'm1', lastDrankAt: '2026-06-01' }),
      makeRecord({ menuItemId: 'm2', lastDrankAt: '2026-06-20' }),
    ]
    const june = nutritionForMonth(records, resolve, '2026-06')!
    expect(june.sugarG).toBe(70)
    expect(june.calories).toBe(450)
    expect(june.caffeineMg).toBe(150)
    expect(june.count).toBe(2)
  })
})
