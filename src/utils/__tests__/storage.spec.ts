import { describe, it, expect, beforeEach } from 'vitest'
import { loadFromStorage, saveToStorage } from '../storage'

describe('storage 工具', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('沒有資料時回傳 fallback', () => {
    expect(loadFromStorage('missing-key', { count: 0 })).toEqual({ count: 0 })
  })

  it('儲存後可讀回相同內容', () => {
    saveToStorage('my-key', { name: '珍奶', price: 50 })
    expect(loadFromStorage('my-key', null)).toEqual({ name: '珍奶', price: 50 })
  })

  it('內容毀損時回傳 fallback 而非丟例外', () => {
    localStorage.setItem('broken', '{ not json')
    expect(loadFromStorage('broken', [])).toEqual([])
  })
})
