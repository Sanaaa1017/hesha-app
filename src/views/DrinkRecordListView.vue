<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useDrinkRecordsStore } from '@/stores/drinkRecords'
import DrinkRecordCard from '@/components/DrinkRecordCard.vue'

const store = useDrinkRecordsStore()

onMounted(() => store.fetchRecords())
</script>

<template>
  <div class="page">
    <div class="header-row">
      <div>
        <h1 class="page-title">喝過紀錄 📝</h1>
        <p class="page-subtitle">記錄每一杯，留下評分與回憶</p>
      </div>
      <RouterLink to="/records/new" class="add-btn">＋ 新增</RouterLink>
    </div>

    <div v-if="store.records.length" class="list">
      <RouterLink
        v-for="record in store.records"
        :key="record.id"
        :to="`/records/${record.id}`"
        class="list-link"
      >
        <DrinkRecordCard :record="record" />
      </RouterLink>
    </div>

    <div v-else class="empty-state">
      <span class="emoji">🧋</span>
      <p>還沒有任何紀錄</p>
      <RouterLink to="/records/new" class="empty-cta">記下第一杯吧！</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.add-btn {
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: 600;
  font-size: 14px;
  box-shadow: var(--shadow-sm);
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.empty-cta {
  display: inline-block;
  margin-top: var(--space-md);
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: 600;
}
</style>
