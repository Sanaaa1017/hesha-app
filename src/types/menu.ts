/** 飲料分類 */
export type DrinkCategory =
  | 'milk-tea' // 奶茶
  | 'tea' // 純茶
  | 'fresh-tea' // 鮮奶茶
  | 'fruit-tea' // 水果茶
  | 'milk' // 鮮奶 / 拿鐵
  | 'special' // 特調 / 其他

/** 區域（用於區域限定品項與篩選） */
export type Region = 'north' | 'central' | 'south' | 'east'

/** 飲料品牌 */
export interface Brand {
  id: string
  name: string
  /** 以 emoji 作為可愛簡約風格的代表 logo */
  emoji: string
  /** 品牌代表色 */
  color: string
  description: string
}

/** 菜單品項 */
export interface MenuItem {
  id: string
  brandId: string
  name: string
  category: DrinkCategory
  /** 中杯參考售價（元） */
  price: number
  /** 是否區域限定 */
  isRegional: boolean
  /** 區域限定時的所屬區域 */
  region?: Region
  /** 區域限定的補充說明，例如「台中發跡」 */
  regionalNote?: string
  /** 是否季節限定 */
  isSeasonal: boolean
  /** 全糖估計含糖量（g） */
  sugarG: number
  /** 估計熱量（kcal） */
  calories: number
  /** 估計咖啡因（mg） */
  caffeineMg: number
}

export const CATEGORY_LABELS: Record<DrinkCategory, string> = {
  'milk-tea': '奶茶',
  tea: '純茶',
  'fresh-tea': '鮮奶茶',
  'fruit-tea': '水果茶',
  milk: '鮮奶/拿鐵',
  special: '特調',
}

export const REGION_LABELS: Record<Region, string> = {
  north: '北部限定',
  central: '中部限定',
  south: '南部限定',
  east: '東部限定',
}
