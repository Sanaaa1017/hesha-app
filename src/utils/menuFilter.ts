import type { DrinkCategory, MenuItem, Region } from '@/types/menu'

export interface MenuFilters {
  /** 品項名稱關鍵字 */
  query: string
  /** 所在區域：篩掉其他區域限定品項；null 表示不限 */
  region: Region | null
  /** 分類篩選；null 表示全部 */
  category: DrinkCategory | null
  /** 只看區域限定 */
  onlyRegional: boolean
  /** 只看季節限定 */
  onlySeasonal: boolean
}

export const DEFAULT_MENU_FILTERS: MenuFilters = {
  query: '',
  region: null,
  category: null,
  onlyRegional: false,
  onlySeasonal: false,
}

/**
 * 依條件過濾菜單品項（純函式，方便測試）。
 * 區域邏輯：選定區域時，顯示「全台販售」與「該區域限定」的品項，
 * 隱藏其他區域限定的品項——解決「不確定哪些是外地限定」的困擾。
 */
export function filterMenuItems(items: MenuItem[], filters: MenuFilters): MenuItem[] {
  const keyword = filters.query.trim().toLowerCase()

  return items.filter((item) => {
    if (keyword && !item.name.toLowerCase().includes(keyword)) return false
    if (filters.category && item.category !== filters.category) return false
    if (filters.onlyRegional && !item.isRegional) return false
    if (filters.onlySeasonal && !item.isSeasonal) return false
    if (filters.region && item.isRegional && item.region !== filters.region) return false
    return true
  })
}
