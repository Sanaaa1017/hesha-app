<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDrinkRecordsStore } from '@/stores/drinkRecords'
import { useMenuStore } from '@/stores/menu'
import {
  monthlySpending,
  spendingForMonth,
  monthlyNutrition,
  nutritionForMonth,
  type NutritionValues,
} from '@/utils/stats'
import { todayISODate, monthKey, formatMonth } from '@/utils/date'
import BarChart from '@/components/BarChart.vue'

const records = useDrinkRecordsStore()
const menu = useMenuStore()

onMounted(() => {
  records.fetchRecords()
  menu.load()
})

const currentMonth = monthKey(todayISODate())

function monthShort(month: string): string {
  return `${Number(month.slice(5))}月`
}

function resolveNutrition(menuItemId: string): NutritionValues | undefined {
  const item = menu.getItem(menuItemId)
  if (!item) return undefined
  return { sugarG: item.sugarG, calories: item.calories, caffeineMg: item.caffeineMg }
}

// ── 消費 ──
const spending = computed(() => monthlySpending(records.records))
const hasSpending = computed(() => spending.value.length > 0)
const focusSpending = computed(
  () => spendingForMonth(records.records, currentMonth) ?? spending.value.at(-1) ?? null,
)
const spendingChart = computed(() =>
  spending.value.map((item) => ({ label: monthShort(item.month), value: item.total })),
)

// ── 營養 ──
const nutrition = computed(() => monthlyNutrition(records.records, resolveNutrition))
const hasNutrition = computed(() => nutrition.value.length > 0)
const focusNutrition = computed(
  () =>
    nutritionForMonth(records.records, resolveNutrition, currentMonth) ??
    nutrition.value.at(-1) ??
    null,
)
const caffeineChart = computed(() =>
  nutrition.value.map((item) => ({ label: monthShort(item.month), value: item.caffeineMg })),
)

const hasAnyData = computed(() => hasSpending.value || hasNutrition.value)
</script>

<template>
  <div class="page">
    <h1 class="page-title">數據總覽 📊</h1>
    <p class="page-subtitle">看看你的飲料花費與營養</p>

    <template v-if="hasAnyData">
      <!-- 消費 -->
      <section v-if="hasSpending && focusSpending" class="section">
        <h2 class="section-title">{{ formatMonth(focusSpending.month) }}消費概況</h2>
        <div class="stat-grid">
          <div class="stat-card card">
            <span class="stat-label">花費</span>
            <span class="stat-value">${{ focusSpending.total }}</span>
          </div>
          <div class="stat-card card">
            <span class="stat-label">杯數</span>
            <span class="stat-value">{{ focusSpending.count }}</span>
          </div>
          <div class="stat-card card">
            <span class="stat-label">平均/杯</span>
            <span class="stat-value">${{ focusSpending.average }}</span>
          </div>
        </div>
        <div class="card chart-card">
          <p class="chart-title">每月花費（元）</p>
          <BarChart :data="spendingChart" color="var(--color-primary)" />
        </div>
      </section>

      <!-- 營養 -->
      <section v-if="hasNutrition && focusNutrition" class="section">
        <h2 class="section-title">{{ formatMonth(focusNutrition.month) }}營養攝取</h2>
        <p class="section-note">僅統計已連結菜單品項的紀錄（{{ focusNutrition.count }} 杯）</p>
        <div class="stat-grid">
          <div class="stat-card card">
            <span class="stat-label">🍬 糖分</span>
            <span class="stat-value">{{ focusNutrition.sugarG }}<small>g</small></span>
          </div>
          <div class="stat-card card">
            <span class="stat-label">🔥 熱量</span>
            <span class="stat-value">{{ focusNutrition.calories }}<small>kcal</small></span>
          </div>
          <div class="stat-card card">
            <span class="stat-label">☕ 咖啡因</span>
            <span class="stat-value">{{ focusNutrition.caffeineMg }}<small>mg</small></span>
          </div>
        </div>
        <div class="card chart-card">
          <p class="chart-title">每月咖啡因（mg）</p>
          <BarChart :data="caffeineChart" color="var(--color-mint)" />
        </div>
      </section>

      <p v-if="!hasNutrition" class="link-hint card">
        💡 在紀錄中「從菜單帶入品項」，就能看到糖分、熱量與咖啡因統計
      </p>
    </template>

    <div v-else class="empty-state">
      <span class="emoji">🧾</span>
      <p>還沒有可分析的資料</p>
      <p class="empty-hint">新增紀錄並填入金額或連結菜單品項就會出現統計</p>
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
  margin-bottom: var(--space-xs);
}

.section-note {
  font-size: 12px;
  color: var(--color-text-soft);
  margin-bottom: var(--space-sm);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
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

.stat-value small {
  font-size: 12px;
  font-weight: 600;
  margin-left: 1px;
}

.chart-card {
  padding: var(--space-md);
}

.chart-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-soft);
  margin-bottom: var(--space-sm);
}

.link-hint {
  margin-top: var(--space-lg);
  font-size: 13px;
  color: var(--color-text-soft);
  text-align: center;
}

.empty-hint {
  font-size: 13px;
  margin-top: var(--space-xs);
}
</style>
