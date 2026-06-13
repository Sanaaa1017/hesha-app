<script setup lang="ts">
import type { Recommendation } from '@/types/recommend'
import NutritionBadges from './NutritionBadges.vue'

defineProps<{
  recommendation: Recommendation
  brandEmoji?: string
  isSaved: boolean
}>()

defineEmits<{
  save: []
}>()
</script>

<template>
  <article class="rec-card card">
    <div class="head">
      <span class="emoji" aria-hidden="true">{{ brandEmoji ?? '🥤' }}</span>
      <div class="title">
        <p class="name">{{ recommendation.itemName }}</p>
        <p class="brand">{{ recommendation.brandName }}</p>
      </div>
      <span class="price">${{ recommendation.price }}</span>
    </div>

    <p class="reason">✨ {{ recommendation.reason }}</p>

    <NutritionBadges
      :sugar-g="recommendation.sugarG"
      :calories="recommendation.calories"
      :caffeine-mg="recommendation.caffeineMg"
    />

    <button
      type="button"
      class="save-btn"
      :class="{ 'is-saved': isSaved }"
      :disabled="isSaved"
      @click="$emit('save')"
    >
      {{ isSaved ? '💛 已收藏' : '🤍 收藏這杯' }}
    </button>
  </article>
</template>

<style scoped>
.rec-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.head {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.emoji {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  background: var(--color-surface-alt);
  font-size: 20px;
}

.title {
  flex: 1;
  min-width: 0;
}

.name {
  font-weight: 700;
  font-size: 16px;
}

.brand {
  font-size: 12px;
  color: var(--color-text-soft);
}

.price {
  font-weight: 800;
  color: var(--color-primary-strong);
}

.reason {
  padding: 8px 12px;
  background: #fff3d4;
  color: #c79420;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
}

.save-btn {
  align-self: flex-start;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 6px 16px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}

.save-btn.is-saved {
  background: var(--color-primary-soft);
  border-color: var(--color-primary-soft);
  color: var(--color-primary-strong);
}
</style>
