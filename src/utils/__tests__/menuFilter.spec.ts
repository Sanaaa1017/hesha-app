import { describe, it, expect } from 'vitest'
import { filterMenuItems, DEFAULT_MENU_FILTERS, type MenuFilters } from '../menuFilter'
import type { MenuItem } from '@/types/menu'

function makeItem(overrides: Partial<MenuItem>): MenuItem {
  return {
    id: 'x',
    brandId: 'b',
    name: '測試飲料',
    category: 'tea',
    price: 50,
    isRegional: false,
    isSeasonal: false,
    sugarG: 30,
    calories: 150,
    caffeineMg: 50,
    ...overrides,
  }
}

const items: MenuItem[] = [
  makeItem({ id: 'a', name: '珍珠奶茶', category: 'milk-tea' }),
  makeItem({ id: 'b', name: '台中芋頭鮮奶', category: 'milk', isRegional: true, region: 'central' }),
  makeItem({ id: 'c', name: '花蓮蜜香紅茶', category: 'tea', isRegional: true, region: 'east' }),
  makeItem({ id: 'd', name: '草莓多多', category: 'fruit-tea', isSeasonal: true }),
]

function withFilters(overrides: Partial<MenuFilters>): MenuFilters {
  return { ...DEFAULT_MENU_FILTERS, ...overrides }
}

describe('filterMenuItems', () => {
  it('預設條件回傳全部品項', () => {
    expect(filterMenuItems(items, DEFAULT_MENU_FILTERS)).toHaveLength(4)
  })

  it('依關鍵字過濾品項名稱', () => {
    const result = filterMenuItems(items, withFilters({ query: '珍珠' }))
    expect(result.map((i) => i.id)).toEqual(['a'])
  })

  it('依分類過濾', () => {
    const result = filterMenuItems(items, withFilters({ category: 'milk' }))
    expect(result.map((i) => i.id)).toEqual(['b'])
  })

  it('只看區域限定', () => {
    const result = filterMenuItems(items, withFilters({ onlyRegional: true }))
    expect(result.map((i) => i.id)).toEqual(['b', 'c'])
  })

  it('只看季節限定', () => {
    const result = filterMenuItems(items, withFilters({ onlySeasonal: true }))
    expect(result.map((i) => i.id)).toEqual(['d'])
  })

  it('選定區域時，隱藏其他區域限定、保留全台與同區限定', () => {
    const result = filterMenuItems(items, withFilters({ region: 'central' }))
    const ids = result.map((i) => i.id)
    expect(ids).toContain('a') // 全台
    expect(ids).toContain('b') // 中部限定
    expect(ids).toContain('d') // 全台季節
    expect(ids).not.toContain('c') // 東部限定，應隱藏
  })
})
