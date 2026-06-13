import type { DrinkCategory, MenuItem } from '@/types/menu'
import type { DrinkRecord } from '@/types/drinkRecord'
import type { PreferenceType, RecommendContext, Recommendation } from '@/types/recommend'

export interface RecommendInput {
  items: MenuItem[]
  prefs: PreferenceType[]
  context: RecommendContext
  history: DrinkRecord[]
  limit?: number
  /** 同分時的抖動函式，預設 0（可重現）；UI 傳 Math.random 增加變化 */
  randomFn?: () => number
}

interface ScoreResult {
  score: number
  reasons: string[]
}

const MILK_CATEGORIES: DrinkCategory[] = ['milk', 'fresh-tea', 'milk-tea']
const TEA_CATEGORIES: DrinkCategory[] = ['tea', 'milk-tea', 'fresh-tea']

function scoreItem(
  item: MenuItem,
  prefs: PreferenceType[],
  context: RecommendContext,
  lovedCategories: Set<DrinkCategory>,
  drankItemIds: Set<string>,
): ScoreResult {
  let score = 0
  const reasons: string[] = []

  // ── 個人偏好 ──
  if (prefs.includes('tea') && TEA_CATEGORIES.includes(item.category)) {
    score += 2
    reasons.push('茶香十足')
  }
  if (prefs.includes('milk') && MILK_CATEGORIES.includes(item.category)) {
    score += 2
    reasons.push('奶味濃郁')
  }
  if (prefs.includes('fruit') && item.category === 'fruit-tea') {
    score += 2
    reasons.push('清爽水果')
  }
  if (prefs.includes('novelty') && item.isSeasonal) {
    score += 2
    reasons.push('季節限定新品')
  }
  if (prefs.includes('low-sugar')) {
    if (item.sugarG <= 32) {
      score += 2
      reasons.push('含糖量較低')
    } else {
      score -= 1
    }
  }
  if (prefs.includes('low-caffeine')) {
    if (item.caffeineMg <= 30) {
      score += 2
      reasons.push('低咖啡因')
    } else {
      score -= 1
    }
  }

  // ── 當下情境 ──
  if (context === 'hot') {
    if (item.category === 'fruit-tea' || item.category === 'tea') {
      score += 2
      reasons.push('天熱來點清爽的')
    }
    if (item.calories <= 200) score += 1
  } else if (context === 'greasy') {
    if (item.category === 'tea') {
      score += 2
      reasons.push('純茶解膩')
    }
    if (item.sugarG <= 32) {
      score += 1
      reasons.push('少負擔')
    }
  } else if (context === 'energize') {
    if (item.caffeineMg >= 80) {
      score += 3
      reasons.push('咖啡因充足好提神')
    } else if (item.caffeineMg >= 60) {
      score += 1
    }
  }

  // ── 歷史學習 ──
  if (prefs.includes('novelty') && drankItemIds.has(item.id)) {
    score -= 3 // 嚐鮮者避免重複推薦喝過的
  }
  if (lovedCategories.has(item.category)) {
    score += 1
    reasons.push('你常給高分的類型')
  }

  return { score, reasons }
}

/** 規則式推薦引擎：依偏好、情境與歷史紀錄排序菜單品項 */
export function recommend(
  input: RecommendInput,
  getBrandName: (brandId: string) => string,
): Recommendation[] {
  const { items, prefs, context, history, limit = 4, randomFn = () => 0 } = input

  const itemById = new Map(items.map((item) => [item.id, item]))
  const lovedCategories = new Set<DrinkCategory>()
  const drankItemIds = new Set<string>()
  for (const record of history) {
    if (!record.menuItemId) continue
    drankItemIds.add(record.menuItemId)
    if (record.rating != null && record.rating >= 4) {
      const item = itemById.get(record.menuItemId)
      if (item) lovedCategories.add(item.category)
    }
  }

  return items
    .map((item) => {
      const { score, reasons } = scoreItem(item, prefs, context, lovedCategories, drankItemIds)
      return { item, score, reasons, jitter: randomFn() }
    })
    .sort((a, b) => b.score - a.score || a.jitter - b.jitter)
    .slice(0, limit)
    .map(({ item, score, reasons }) => ({
      menuItemId: item.id,
      brandId: item.brandId,
      brandName: getBrandName(item.brandId),
      itemName: item.name,
      price: item.price,
      sugarG: item.sugarG,
      calories: item.calories,
      caffeineMg: item.caffeineMg,
      reason: reasons.length > 0 ? reasons.slice(0, 2).join('、') : '綜合推薦給你',
      score,
    }))
}
