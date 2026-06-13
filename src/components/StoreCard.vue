<script setup lang="ts">
import type { NearbyStore } from '@/types/store'
import { formatDistance } from '@/utils/geo'
import { googleMapsLink, foodpandaLink, uberEatsLink } from '@/utils/links'

defineProps<{
  store: NearbyStore
  brandEmoji?: string
}>()
</script>

<template>
  <article class="store-card card">
    <div class="top">
      <span class="emoji" aria-hidden="true">{{ brandEmoji ?? '🥤' }}</span>
      <div class="info">
        <p class="name">{{ store.name }}</p>
        <p class="meta">
          <span class="dist">{{ formatDistance(store.distanceMeters) }}</span>
          <span class="dot">·</span>
          <span :class="store.isOpenNow ? 'open' : 'closed'">
            {{ store.isOpenNow ? '營業中' : '已打烊' }}
          </span>
        </p>
        <p class="addr">{{ store.address }}</p>
      </div>
    </div>

    <div class="links">
      <a :href="googleMapsLink(store)" target="_blank" rel="noopener" class="link-btn map">
        🗺 地圖
      </a>
      <a :href="foodpandaLink(store)" target="_blank" rel="noopener" class="link-btn panda">
        🛵 foodpanda
      </a>
      <a :href="uberEatsLink(store)" target="_blank" rel="noopener" class="link-btn uber">
        🚗 Uber Eats
      </a>
    </div>
  </article>
</template>

<style scoped>
.store-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.top {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.emoji {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius);
  background: var(--color-surface-alt);
  font-size: 22px;
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  font-weight: 700;
  font-size: 16px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
  font-size: 13px;
}

.dist {
  font-weight: 600;
  color: var(--color-primary-strong);
}

.dot {
  color: var(--color-text-soft);
}

.open {
  color: var(--color-success);
  font-weight: 600;
}

.closed {
  color: var(--color-text-soft);
}

.addr {
  margin-top: 2px;
  font-size: 12px;
  color: var(--color-text-soft);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.link-btn {
  flex: 1;
  min-width: 96px;
  text-align: center;
  padding: 8px 10px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
}

.link-btn.map {
  background: var(--color-mint-soft);
  color: #3f9b8c;
}

.link-btn.panda {
  background: var(--color-pink-soft);
  color: #d6607a;
}

.link-btn.uber {
  background: var(--color-surface-alt);
  color: var(--color-text);
}
</style>
