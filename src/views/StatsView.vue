<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDrinkRecordsStore } from '@/stores/drinkRecords'
import { monthlySpending, spendingForMonth } from '@/utils/stats'
import { todayISODate, monthKey, formatMonth } from '@/utils/date'
import BarChart from '@/components/BarChart.vue'

const store = useDrinkRecordsStore()

onMounted(() => store.fetchRecords())

const spending = computed(() => monthlySpending(store.records))
const hasData = computed(() => spending.value.length > 0)

const currentMonth = monthKey(todayISODate())

/** 優先顯示本月，本月無資料時退而顯示最近有資料的月份 */
const focusMonth = computed(() => {
  const thisMonth = spendingForMonth(store.records, currentMonth)
  if (thisMonth) return thisMonth
  return spending.value.at(-1) ?? null
})

const focusMonthLabel = computed(() =>
  focusMonth.value ? formatMonth(focusMonth.value.month) : '',
)

const chartData = computed(() =>
  spending.value.map((item) => ({
    label: `${Number(item.month.slice(5))}月`,
    value: item.total,
  })),
)
</script>

<template>
  <div class="page">
    <h1 class="page-title">數據總覽 📊</h1>
    <p class="page-subtitle">看看你的飲料花費</p>

    <template v-if="hasData && focusMonth">
      <section class="section">
        <h2 class="section-title">{{ focusMonthLabel }}消費概況</h2>
        <div class="stat-grid">
          <div class="stat-card card">
            <span class="stat-label">花費</span>
            <span class="stat-value">${{ focusMonth.total }}</span>
          </div>
          <div class="stat-card card">
            <span class="stat-label">杯數</span>
            <span class="stat-value">{{ focusMonth.count }}</span>
          </div>
          <div class="stat-card card">
            <span class="stat-label">平均/杯</span>
            <span class="stat-value">${{ focusMonth.average }}</span>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">每月花費</h2>
        <div class="card chart-card">
          <BarChart :data="chartData" color="var(--color-primary)" unit="" />
        </div>
      </section>
    </template>

    <div v-else class="empty-state">
      <span class="emoji">🧾</span>
      <p>還沒有消費紀錄</p>
      <p class="empty-hint">在新增紀錄時填入金額，就會出現統計囉</p>
    </div>
  </div>
</template>

<style scoped>
.section {
  margin-top: var(--space-lg);
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: var(--space-sm);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  text-align: center;
  padding: var(--space-md) var(--space-sm);
}

.stat-label {
  font-size: 12px;
  color: var(--color-text-soft);
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-primary-strong);
}

.chart-card {
  padding: var(--space-lg) var(--space-md) var(--space-md);
}

.empty-hint {
  font-size: 13px;
  margin-top: var(--space-xs);
}
</style>
