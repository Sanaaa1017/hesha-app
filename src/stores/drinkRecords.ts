import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DrinkRecord, DrinkRecordInput } from '@/types/drinkRecord'
import * as recordService from '@/services/drinkRecords'

export const useDrinkRecordsStore = defineStore('drinkRecords', () => {
  const records = ref<DrinkRecord[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function fetchRecords(): void {
    isLoading.value = true
    error.value = null
    try {
      records.value = recordService.getAll()
    } catch {
      error.value = '讀取紀錄失敗'
    } finally {
      isLoading.value = false
    }
  }

  function addRecord(input: DrinkRecordInput): DrinkRecord {
    const created = recordService.create(input)
    records.value = recordService.getAll()
    return created
  }

  function editRecord(id: string, input: DrinkRecordInput): DrinkRecord {
    const updated = recordService.update(id, input)
    records.value = recordService.getAll()
    return updated
  }

  function deleteRecord(id: string): void {
    recordService.remove(id)
    records.value = recordService.getAll()
  }

  function getRecord(id: string): DrinkRecord | undefined {
    return records.value.find((record) => record.id === id) ?? recordService.getById(id)
  }

  return {
    records,
    isLoading,
    error,
    fetchRecords,
    addRecord,
    editRecord,
    deleteRecord,
    getRecord,
  }
})
