/**
 * 型別安全的 localStorage 工具。
 * 本專案不接後端，所有使用者資料以 localStorage 持久化。
 */

/** 本專案使用的所有 localStorage key，集中管理避免衝突。 */
export const STORAGE_KEYS = {
  drinkRecords: 'hesha:drink-records',
  preferences: 'hesha:preferences',
  savedRecommendations: 'hesha:saved-recommendations',
} as const

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 忽略 quota 超出或隱私模式寫入失敗
  }
}
