import type { PreferenceType, UserPreferences } from '@/types/recommend'
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '@/utils/storage'

const EMPTY: UserPreferences = { types: [], updatedAt: '' }

export function getPreferences(): UserPreferences {
  return loadFromStorage<UserPreferences>(STORAGE_KEYS.preferences, EMPTY)
}

export function savePreferences(types: PreferenceType[]): UserPreferences {
  const prefs: UserPreferences = { types, updatedAt: new Date().toISOString() }
  saveToStorage(STORAGE_KEYS.preferences, prefs)
  return prefs
}
