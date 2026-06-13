<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDrinkRecordsStore } from '@/stores/drinkRecords'
import type { DrinkRecordInput } from '@/types/drinkRecord'
import DrinkRecordForm from '@/components/DrinkRecordForm.vue'

const router = useRouter()
const store = useDrinkRecordsStore()

function onSubmit(input: DrinkRecordInput): void {
  store.addRecord(input)
  router.push('/records')
}
</script>

<template>
  <div class="page">
    <RouterLink to="/records" class="back">‹ 紀錄列表</RouterLink>
    <h1 class="page-title">新增紀錄</h1>
    <p class="page-subtitle">今天喝了什麼呢？</p>
    <DrinkRecordForm submit-label="新增" @submit="onSubmit" @cancel="router.push('/records')" />
  </div>
</template>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: var(--space-md);
  color: var(--color-text-soft);
  font-size: 14px;
  font-weight: 600;
}
</style>
