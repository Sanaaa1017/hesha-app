<script setup lang="ts">
import { computed } from 'vue'

interface BarDatum {
  label: string
  value: number
}

const props = withDefaults(
  defineProps<{
    data: BarDatum[]
    color?: string
    unit?: string
  }>(),
  { color: 'var(--color-primary)', unit: '' },
)

const maxValue = computed(() => Math.max(1, ...props.data.map((d) => d.value)))

function heightPct(value: number): number {
  return Math.max(4, (value / maxValue.value) * 100)
}
</script>

<template>
  <div class="bar-chart">
    <div v-for="(datum, index) in data" :key="index" class="bar-col">
      <span class="bar-value">{{ datum.value }}{{ unit }}</span>
      <div class="bar-track">
        <div
          class="bar"
          :style="{ height: `${heightPct(datum.value)}%`, background: color }"
        />
      </div>
      <span class="bar-label">{{ datum.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: var(--space-sm);
  overflow-x: auto;
  padding-bottom: var(--space-xs);
}

.bar-col {
  flex: 1;
  min-width: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.bar-value {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text);
}

.bar-track {
  display: flex;
  align-items: flex-end;
  height: 140px;
  width: 100%;
}

.bar {
  width: 100%;
  border-radius: var(--radius-sm) var(--radius-sm) 4px 4px;
  transition: height 0.3s ease;
}

.bar-label {
  font-size: 11px;
  color: var(--color-text-soft);
  white-space: nowrap;
}
</style>
