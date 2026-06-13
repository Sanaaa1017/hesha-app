import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDrinkRecordsStore } from '../drinkRecords'

describe('useDrinkRecordsStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('addRecord 後 records 更新', () => {
    const store = useDrinkRecordsStore()
    store.addRecord({ drinkName: '珍奶', storeName: '五十嵐' })
    expect(store.records).toHaveLength(1)
    expect(store.records[0]!.drinkName).toBe('珍奶')
  })

  it('editRecord 後內容更新', () => {
    const store = useDrinkRecordsStore()
    const created = store.addRecord({ drinkName: '珍奶', storeName: '五十嵐' })
    store.editRecord(created.id, { drinkName: '紅茶', storeName: '清心' })
    expect(store.getRecord(created.id)?.drinkName).toBe('紅茶')
  })

  it('deleteRecord 後 records 移除該筆', () => {
    const store = useDrinkRecordsStore()
    const created = store.addRecord({ drinkName: '珍奶', storeName: '五十嵐' })
    store.deleteRecord(created.id)
    expect(store.records).toHaveLength(0)
  })

  it('fetchRecords 從 localStorage 載入既有資料', () => {
    const first = useDrinkRecordsStore()
    first.addRecord({ drinkName: '珍奶', storeName: '五十嵐' })

    setActivePinia(createPinia())
    const second = useDrinkRecordsStore()
    second.fetchRecords()
    expect(second.records).toHaveLength(1)
  })
})
