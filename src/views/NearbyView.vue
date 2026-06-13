<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGeolocation } from '@/composables/useGeolocation'
import { useMenuStore } from '@/stores/menu'
import { getStores } from '@/services/stores'
import { rankStoresByDistance } from '@/utils/nearby'
import { DEMO_LOCATION } from '@/data/stores'
import StoreCard from '@/components/StoreCard.vue'
import BaseButton from '@/components/BaseButton.vue'

const { coords, error, isLocating, locate, setCoords } = useGeolocation()
const menu = useMenuStore()

onMounted(() => menu.load())

const nearby = computed(() =>
  coords.value ? rankStoresByDistance(getStores(), coords.value) : [],
)

function brandEmoji(brandId: string | null): string | undefined {
  if (!brandId) return undefined
  return menu.getBrand(brandId)?.emoji
}

function useDemoLocation(): void {
  setCoords(DEMO_LOCATION)
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">附近店家 📍</h1>
    <p class="page-subtitle">看看你附近喝得到什麼</p>

    <!-- 尚未定位 -->
    <div v-if="!coords && !isLocating" class="locate-block">
      <div v-if="error" class="error-hint">{{ error }}</div>
      <div v-else class="empty-state">
        <span class="emoji">🧭</span>
        <p>按一下定位，找出最近的飲料店</p>
      </div>
      <BaseButton block @click="locate">📍 定位我的位置</BaseButton>
      <button class="demo-link" @click="useDemoLocation">改用示範位置（台北 101）</button>
    </div>

    <!-- 定位中 -->
    <div v-else-if="isLocating" class="empty-state">
      <span class="emoji">🛰</span>
      <p>定位中…</p>
    </div>

    <!-- 已取得位置 -->
    <template v-else>
      <p class="result-count">附近有 {{ nearby.length }} 家店，依距離排序</p>
      <div class="list">
        <StoreCard
          v-for="store in nearby"
          :key="store.id"
          :store="store"
          :brand-emoji="brandEmoji(store.brandId)"
        />
      </div>
      <button class="relocate" @click="locate">🔄 重新定位</button>
    </template>
  </div>
</template>

<style scoped>
.locate-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.error-hint {
  padding: 12px 16px;
  background: var(--color-pink-soft);
  color: #d6607a;
  border-radius: var(--radius);
  font-size: 14px;
  text-align: center;
}

.demo-link {
  border: none;
  background: transparent;
  color: var(--color-text-soft);
  font-size: 13px;
  text-decoration: underline;
}

.result-count {
  margin: var(--space-md) 0;
  font-size: 13px;
  color: var(--color-text-soft);
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.relocate {
  display: block;
  margin: var(--space-lg) auto 0;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-soft);
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 13px;
}
</style>
