import type { Recommendation, RecommendContext, SavedRecommendation } from '@/types/recommend'
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '@/utils/storage'

function readAll(): SavedRecommendation[] {
  return loadFromStorage<SavedRecommendation[]>(STORAGE_KEYS.savedRecommendations, [])
}

function writeAll(items: SavedRecommendation[]): void {
  saveToStorage(STORAGE_KEYS.savedRecommendations, items)
}

export function getSaved(): SavedRecommendation[] {
  return readAll()
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function addSaved(rec: Recommendation, context: RecommendContext): SavedRecommendation {
  const saved: SavedRecommendation = {
    id: crypto.randomUUID(),
    menuItemId: rec.menuItemId,
    itemName: rec.itemName,
    brandName: rec.brandName,
    reason: rec.reason,
    context,
    createdAt: new Date().toISOString(),
  }
  writeAll([...readAll(), saved])
  return saved
}

export function removeSaved(id: string): void {
  writeAll(readAll().filter((item) => item.id !== id))
}
