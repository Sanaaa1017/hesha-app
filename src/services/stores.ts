import { stores } from '@/data/stores'
import type { DrinkStore } from '@/types/store'

/**
 * 店家資料存取層（目前為假資料）。
 * 未來可改接 Google Places API，介面維持不變。
 */
export function getStores(): DrinkStore[] {
  return stores.slice()
}
