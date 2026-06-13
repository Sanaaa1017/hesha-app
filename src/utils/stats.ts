import type { DrinkRecord } from '@/types/drinkRecord'
import { monthKey } from './date'

export interface MonthlySpending {
  month: string // YYYY-MM
  total: number
  count: number
  average: number
}

/** 依月份彙整消費（只計入有填金額的紀錄），由舊到新排序 */
export function monthlySpending(records: DrinkRecord[]): MonthlySpending[] {
  const map = new Map<string, { total: number; count: number }>()
  for (const record of records) {
    if (record.price == null) continue
    const key = monthKey(record.lastDrankAt)
    const current = map.get(key) ?? { total: 0, count: 0 }
    current.total += record.price
    current.count += 1
    map.set(key, current)
  }
  return [...map.entries()]
    .map(([month, { total, count }]) => ({
      month,
      total,
      count,
      average: count > 0 ? Math.round(total / count) : 0,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

/** 取得指定月份的消費統計，無資料時回傳 null */
export function spendingForMonth(records: DrinkRecord[], month: string): MonthlySpending | null {
  return monthlySpending(records).find((item) => item.month === month) ?? null
}
