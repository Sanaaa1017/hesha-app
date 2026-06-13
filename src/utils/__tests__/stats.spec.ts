import { describe, it, expect } from 'vitest'
import { monthlySpending, spendingForMonth } from '../stats'
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

describe('monthlySpending', () => {
  it('忽略沒有金額的紀錄', () => {
    const records = [
      makeRecord({ price: null, lastDrankAt: '2026-06-01' }),
      makeRecord({ price: 50, lastDrankAt: '2026-06-02' }),
    ]
    const result = monthlySpending(records)
    expect(result).toHaveLength(1)
    expect(result[0]!.total).toBe(50)
    expect(result[0]!.count).toBe(1)
  })

  it('依月份彙整總額、筆數與平均', () => {
    const records = [
      makeRecord({ price: 50, lastDrankAt: '2026-06-01' }),
      makeRecord({ price: 70, lastDrankAt: '2026-06-15' }),
      makeRecord({ price: 30, lastDrankAt: '2026-05-10' }),
    ]
    const result = monthlySpending(records)
    expect(result.map((m) => m.month)).toEqual(['2026-05', '2026-06'])
    const june = result.find((m) => m.month === '2026-06')!
    expect(june.total).toBe(120)
    expect(june.count).toBe(2)
    expect(june.average).toBe(60)
  })

  it('spendingForMonth 取得指定月份、無資料回傳 null', () => {
    const records = [makeRecord({ price: 50, lastDrankAt: '2026-06-01' })]
    expect(spendingForMonth(records, '2026-06')?.total).toBe(50)
    expect(spendingForMonth(records, '2026-01')).toBeNull()
  })
})
