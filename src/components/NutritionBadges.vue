<script setup lang="ts">
withDefaults(
  defineProps<{
    sugarG: number
    calories: number
    caffeineMg: number
    size?: 'sm' | 'md'
  }>(),
  { size: 'sm' },
)
</script>

<template>
  <ul :class="['nutrition', `is-${size}`]">
    <li class="nutrition-item" title="含糖量">
      <span aria-hidden="true">🍬</span>{{ sugarG }}<small>g</small>
    </li>
    <li class="nutrition-item" title="熱量">
      <span aria-hidden="true">🔥</span>{{ calories }}<small>kcal</small>
    </li>
    <li class="nutrition-item" title="咖啡因">
      <span aria-hidden="true">☕</span>{{ caffeineMg }}<small>mg</small>
    </li>
  </ul>
</template>

<style scoped>
.nutrition {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  color: var(--color-text-soft);
}

.nutrition-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-weight: 600;
}

.nutrition-item small {
  font-weight: 500;
  opacity: 0.8;
}

.is-sm {
  font-size: 12px;
}

.is-md {
  font-size: 14px;
}
</style>
