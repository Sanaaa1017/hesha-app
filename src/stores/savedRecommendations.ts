import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Recommendation, RecommendContext, SavedRecommendation } from '@/types/recommend'
import * as service from '@/services/savedRecommendations'

export const useSavedRecommendationsStore = defineStore('savedRecommendations', () => {
  const items = ref<SavedRecommendation[]>([])

  function load(): void {
    items.value = service.getSaved()
  }

  function save(rec: Recommendation, context: RecommendContext): void {
    service.addSaved(rec, context)
    items.value = service.getSaved()
  }

  function remove(id: string): void {
    service.removeSaved(id)
    items.value = service.getSaved()
  }

  function isSaved(menuItemId: string): boolean {
    return items.value.some((item) => item.menuItemId === menuItemId)
  }

  return { items, load, save, remove, isSaved }
})
