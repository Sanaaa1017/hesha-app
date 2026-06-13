import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePreferencesStore } from '../preferences'

describe('usePreferencesStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('toggle 可新增與移除偏好', () => {
    const store = usePreferencesStore()
    store.toggle('tea')
    expect(store.has('tea')).toBe(true)
    store.toggle('tea')
    expect(store.has('tea')).toBe(false)
  })

  it('偏好持久化於 localStorage', () => {
    const first = usePreferencesStore()
    first.toggle('milk')
    first.toggle('low-sugar')

    setActivePinia(createPinia())
    const second = usePreferencesStore()
    second.load()
    expect(second.types).toEqual(['milk', 'low-sugar'])
  })
})
