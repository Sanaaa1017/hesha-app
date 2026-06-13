/** 喝過紀錄（對應假資料 localStorage） */
export interface DrinkRecord {
  id: string
  drinkName: string
  storeName: string
  /** 星等 1–5，未評分為 null */
  rating: number | null
  /** 心得文字 */
  notes: string | null
  /** 最後一次喝的日期（YYYY-MM-DD） */
  lastDrankAt: string
  /** 照片（壓縮後的 base64 data URL） */
  photoUrl: string | null
  /** 消費金額（功能⑤） */
  price: number | null
  /** 關聯菜單品項 id（功能⑥，用於營養統計） */
  menuItemId: string | null
  /** 關聯品牌 id */
  brandId: string | null
  createdAt: string
  updatedAt: string
}

/** 新增 / 編輯紀錄時的輸入 */
export interface DrinkRecordInput {
  drinkName: string
  storeName: string
  rating?: number | null
  notes?: string | null
  lastDrankAt?: string
  photoUrl?: string | null
  price?: number | null
  menuItemId?: string | null
  brandId?: string | null
}
