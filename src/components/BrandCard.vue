<script setup lang="ts">
import type { Brand } from '@/types/menu'

defineProps<{
  brand: Brand
  itemCount: number
}>()
</script>

<template>
  <article class="brand-card card">
    <span class="brand-emoji" :style="{ background: brand.color }" aria-hidden="true">
      {{ brand.emoji }}
    </span>
    <div class="brand-info">
      <p class="brand-name">{{ brand.name }}</p>
      <p class="brand-desc">{{ brand.description }}</p>
      <p class="brand-count">{{ itemCount }} 款品項</p>
    </div>
    <span class="brand-arrow" aria-hidden="true">›</span>
  </article>
</template>

<style scoped>
.brand-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  transition: transform 0.12s ease;
}

.brand-card:hover {
  transform: translateY(-2px);
}

.brand-emoji {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  font-size: 24px;
  color: #fff;
}

.brand-info {
  flex: 1;
  min-width: 0;
}

.brand-name {
  font-weight: 700;
  font-size: 16px;
}

.brand-desc {
  font-size: 12px;
  color: var(--color-text-soft);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.brand-count {
  font-size: 12px;
  color: var(--color-primary-strong);
  font-weight: 600;
  margin-top: 2px;
}

.brand-arrow {
  flex-shrink: 0;
  font-size: 22px;
  color: var(--color-text-soft);
}
</style>
