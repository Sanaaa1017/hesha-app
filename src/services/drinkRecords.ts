import type { DrinkRecord, DrinkRecordInput } from '@/types/drinkRecord'
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '@/utils/storage'
import { todayISODate } from '@/utils/date'

/**
 * 喝過紀錄存取層。本專案不接後端，以 localStorage 持久化。
 * 未來改接 Supabase 時只需替換此檔。
 */

function readAll(): DrinkRecord[] {
  return loadFromStorage<DrinkRecord[]>(STORAGE_KEYS.drinkRecords, [])
}

function writeAll(records: DrinkRecord[]): void {
  saveToStorage(STORAGE_KEYS.drinkRecords, records)
}

/** 依最後飲用日期由新到舊排序 */
function sortByDateDesc(records: DrinkRecord[]): DrinkRecord[] {
  return records.slice().sort((a, b) => b.lastDrankAt.localeCompare(a.lastDrankAt))
}

function newId(): string {
  return crypto.randomUUID()
}

export function getAll(): DrinkRecord[] {
  return sortByDateDesc(readAll())
}

export function getById(id: string): DrinkRecord | undefined {
  return readAll().find((record) => record.id === id)
}

export function create(input: DrinkRecordInput): DrinkRecord {
  const now = new Date().toISOString()
  const record: DrinkRecord = {
    id: newId(),
    drinkName: input.drinkName,
    storeName: input.storeName,
    rating: input.rating ?? null,
    notes: input.notes ?? null,
    lastDrankAt: input.lastDrankAt ?? todayISODate(),
    photoUrl: input.photoUrl ?? null,
    price: input.price ?? null,
    menuItemId: input.menuItemId ?? null,
    brandId: input.brandId ?? null,
    createdAt: now,
    updatedAt: now,
  }
  writeAll([...readAll(), record])
  return record
}

export function update(id: string, input: DrinkRecordInput): DrinkRecord {
  const records = readAll()
  const index = records.findIndex((record) => record.id === id)
  if (index === -1) throw new Error(`找不到紀錄：${id}`)
  const existing = records[index]!
  const updated: DrinkRecord = {
    ...existing,
    drinkName: input.drinkName,
    storeName: input.storeName,
    rating: input.rating ?? null,
    notes: input.notes ?? null,
    lastDrankAt: input.lastDrankAt ?? existing.lastDrankAt,
    photoUrl: input.photoUrl ?? null,
    price: input.price ?? null,
    menuItemId: input.menuItemId ?? null,
    brandId: input.brandId ?? null,
    updatedAt: new Date().toISOString(),
  }
  records[index] = updated
  writeAll(records)
  return updated
}

export function remove(id: string): void {
  writeAll(readAll().filter((record) => record.id !== id))
}
