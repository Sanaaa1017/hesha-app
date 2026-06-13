import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMenuStore } from '../menu'

describe('useMenuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('load 後載入品牌與品項', () => {
    const store = useMenuStore()
    expect(store.isLoaded).toBe(false)
    store.load()
    expect(store.isLoaded).toBe(true)
    expect(store.brandCount).toBeGreaterThan(0)
    expect(store.itemCount).toBeGreaterThan(0)
  })

  it('itemsOfBrand 只回傳該品牌品項', () => {
    const store = useMenuStore()
    store.load()
    const firstBrand = store.brands[0]!
    const items = store.itemsOfBrand(firstBrand.id)
    expect(items.length).toBeGreaterThan(0)
    expect(items.every((item) => item.brandId === firstBrand.id)).toBe(true)
  })

  it('getItem 依 id 取得品項', () => {
    const store = useMenuStore()
    store.load()
    const someItem = store.items[0]!
    expect(store.getItem(someItem.id)?.name).toBe(someItem.name)
  })
})
