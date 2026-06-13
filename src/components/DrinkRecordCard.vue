<script setup lang="ts">
import type { DrinkRecord } from '@/types/drinkRecord'
import { formatDate } from '@/utils/date'
import StarRating from './StarRating.vue'

defineProps<{
  record: DrinkRecord
}>()
</script>

<template>
  <article class="record-card card">
    <div v-if="record.photoUrl" class="thumb">
      <img :src="record.photoUrl" :alt="record.drinkName" />
    </div>
    <div v-else class="thumb thumb-placeholder" aria-hidden="true">🥤</div>

    <div class="body">
      <div class="head">
        <p class="drink-name">{{ record.drinkName }}</p>
        <span v-if="record.price !== null" class="price">${{ record.price }}</span>
      </div>
      <p class="store">{{ record.storeName }}</p>

      <StarRating
        v-if="record.rating"
        :model-value="record.rating"
        readonly
        :size="15"
        class="stars"
      />

      <p v-if="record.notes" class="notes">{{ record.notes }}</p>

      <p class="date">最後一次喝：{{ formatDate(record.lastDrankAt) }}</p>
    </div>
  </article>
</template>

<style scoped>
.record-card {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
  transition: transform 0.12s ease;
}

.record-card:hover {
  transform: translateY(-2px);
}

.thumb {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: var(--radius);
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-placeholder {
  display: grid;
  place-items: center;
  background: var(--color-surface-alt);
  font-size: 28px;
}

.body {
  flex: 1;
  min-width: 0;
}

.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-sm);
}

.drink-name {
  font-weight: 700;
  font-size: 16px;
}

.price {
  flex-shrink: 0;
  font-weight: 700;
  color: var(--color-primary-strong);
}

.store {
  font-size: 13px;
  color: var(--color-text-soft);
}

.stars {
  margin-top: 2px;
}

.notes {
  margin-top: var(--space-xs);
  font-size: 13px;
  color: var(--color-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.date {
  margin-top: var(--space-xs);
  font-size: 12px;
  color: var(--color-text-soft);
}
</style>
