import { describe, it, expect, beforeEach } from 'vitest'
import * as service from '../drinkRecords'

describe('drinkRecords service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('create 後可由 getAll 取得', () => {
    service.create({ drinkName: '珍奶', storeName: '五十嵐' })
    const all = service.getAll()
    expect(all).toHaveLength(1)
    expect(all[0]!.drinkName).toBe('珍奶')
    expect(all[0]!.lastDrankAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('getAll 依 lastDrankAt 由新到舊排序', () => {
    service.create({ drinkName: '舊', storeName: 'A', lastDrankAt: '2026-01-01' })
    service.create({ drinkName: '新', storeName: 'B', lastDrankAt: '2026-06-01' })
    const all = service.getAll()
    expect(all.map((r) => r.drinkName)).toEqual(['新', '舊'])
  })

  it('update 可修改內容並更新 updatedAt', () => {
    const created = service.create({ drinkName: '珍奶', storeName: '五十嵐' })
    const updated = service.update(created.id, {
      drinkName: '波霸奶茶',
      storeName: '五十嵐',
      rating: 5,
    })
    expect(updated.drinkName).toBe('波霸奶茶')
    expect(updated.rating).toBe(5)
    expect(service.getById(created.id)?.drinkName).toBe('波霸奶茶')
  })

  it('remove 後該筆消失', () => {
    const created = service.create({ drinkName: '珍奶', storeName: '五十嵐' })
    service.remove(created.id)
    expect(service.getAll()).toHaveLength(0)
  })
})
