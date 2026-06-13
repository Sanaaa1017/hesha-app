/** 口味偏好類型 */
export type PreferenceType =
  | 'tea'
  | 'milk'
  | 'fruit'
  | 'novelty'
  | 'low-sugar'
  | 'low-caffeine'

export const PREFERENCE_LABELS: Record<PreferenceType, string> = {
  tea: '🍵 茶感控',
  milk: '🥛 奶味控',
  fruit: '🍓 水果系',
  novelty: '✨ 愛嚐鮮',
  'low-sugar': '🍃 低糖',
  'low-caffeine': '😴 低咖啡因',
}

export const ALL_PREFERENCES = Object.keys(PREFERENCE_LABELS) as PreferenceType[]

/** 使用者偏好（持久化於 localStorage） */
export interface UserPreferences {
  types: PreferenceType[]
  updatedAt: string
}

/** 推薦情境 */
export type RecommendContext = 'any' | 'hot' | 'greasy' | 'energize'

export const CONTEXT_LABELS: Record<RecommendContext, string> = {
  any: '🎲 隨便推',
  hot: '🥵 天氣很熱',
  greasy: '🍔 吃完油膩',
  energize: '⚡ 想提神',
}

export const ALL_CONTEXTS = Object.keys(CONTEXT_LABELS) as RecommendContext[]

/** 推薦結果 */
export interface Recommendation {
  menuItemId: string
  brandId: string
  brandName: string
  itemName: string
  price: number
  sugarG: number
  calories: number
  caffeineMg: number
  reason: string
  score: number
}

/** 收藏的推薦 */
export interface SavedRecommendation {
  id: string
  menuItemId: string
  itemName: string
  brandName: string
  reason: string
  context: RecommendContext
  createdAt: string
}
