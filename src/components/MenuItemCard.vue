<script setup lang="ts">
import { computed } from 'vue'
import type { MenuItem } from '@/types/menu'
import { CATEGORY_LABELS, REGION_LABELS } from '@/types/menu'
import BaseTag from './BaseTag.vue'
import NutritionBadges from './NutritionBadges.vue'

const props = defineProps<{
  item: MenuItem
  /** 在跨品牌搜尋結果中顯示品牌名 */
  brandName?: string
}>()

const categoryLabel = computed(() => CATEGORY_LABELS[props.item.category])
const regionLabel = computed(() =>
  props.item.region ? REGION_LABELS[props.item.region] : '',
)
</script>

<template>
  <article class="menu-item card">
    <div class="head">
      <div class="title">
        <p class="name">{{ item.name }}</p>
        <p v-if="brandName" class="brand">{{ brandName }}</p>
      </div>
      <span class="price">${{ item.price }}</span>
    </div>

    <div class="tags">
      <BaseTag color="primary">{{ categoryLabel }}</BaseTag>
      <BaseTag v-if="item.isRegional" color="pink">📍 {{ regionLabel }}</BaseTag>
      <BaseTag v-if="item.isSeasonal" color="mint">🌸 季節限定</BaseTag>
    </div>

    <p v-if="item.regionalNote" class="note">{{ item.regionalNote }}</p>

    <NutritionBadges
      :sugar-g="item.sugarG"
      :calories="item.calories"
      :caffeine-mg="item.caffeineMg"
    />
  </article>
</template>

<style scoped>
.menu-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-sm);
}

.name {
  font-weight: 700;
  font-size: 16px;
}

.brand {
  font-size: 12px;
  color: var(--color-text-soft);
  margin-top: 2px;
}

.price {
  flex-shrink: 0;
  font-weight: 800;
  color: var(--color-primary-strong);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.note {
  font-size: 12px;
  color: var(--color-text-soft);
}
</style>
