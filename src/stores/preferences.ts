import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PreferenceType } from '@/types/recommend'
import { getPreferences, savePreferences } from '@/services/preferences'

export const usePreferencesStore = defineStore('preferences', () => {
  const types = ref<PreferenceType[]>([])
  const isLoaded = ref(false)

  function load(): void {
    types.value = getPreferences().types
    isLoaded.value = true
  }

  function toggle(type: PreferenceType): void {
    const next = types.value.includes(type)
      ? types.value.filter((item) => item !== type)
      : [...types.value, type]
    types.value = savePreferences(next).types
  }

  function has(type: PreferenceType): boolean {
    return types.value.includes(type)
  }

  return { types, isLoaded, load, toggle, has }
})
