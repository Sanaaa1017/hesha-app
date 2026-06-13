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

export interface NutritionValues {
  sugarG: number
  calories: number
  caffeineMg: number
}

export interface MonthlyNutrition extends NutritionValues {
  month: string // YYYY-MM
  count: number
}

/**
 * 依月份彙整營養攝取。只計入有連結菜單品項（menuItemId 非空且查得到）的紀錄。
 * 以注入的 resolver 取得品項營養，維持純函式可測試性。
 */
export function monthlyNutrition(
  records: DrinkRecord[],
  resolve: (menuItemId: string) => NutritionValues | undefined,
): MonthlyNutrition[] {
  const map = new Map<string, MonthlyNutrition>()
  for (const record of records) {
    if (!record.menuItemId) continue
    const nutrition = resolve(record.menuItemId)
    if (!nutrition) continue
    const key = monthKey(record.lastDrankAt)
    const current =
      map.get(key) ?? { month: key, sugarG: 0, calories: 0, caffeineMg: 0, count: 0 }
    current.sugarG += nutrition.sugarG
    current.calories += nutrition.calories
    current.caffeineMg += nutrition.caffeineMg
    current.count += 1
    map.set(key, current)
  }
  return [...map.values()].sort((a, b) => a.month.localeCompare(b.month))
}

/** 取得指定月份的營養統計，無資料時回傳 null */
export function nutritionForMonth(
  records: DrinkRecord[],
  resolve: (menuItemId: string) => NutritionValues | undefined,
  month: string,
): MonthlyNutrition | null {
  return monthlyNutrition(records, resolve).find((item) => item.month === month) ?? null
}
