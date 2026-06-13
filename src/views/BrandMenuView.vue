<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { CATEGORY_LABELS, type DrinkCategory, type MenuItem } from '@/types/menu'
import MenuItemCard from '@/components/MenuItemCard.vue'

const route = useRoute()
const menu = useMenuStore()

onMounted(() => menu.load())

const brandId = computed(() => String(route.params.brandId))
const brand = computed(() => menu.getBrand(brandId.value))
const items = computed(() => menu.itemsOfBrand(brandId.value))

const regionalCount = computed(() => items.value.filter((item) => item.isRegional).length)

interface CategoryGroup {
  category: DrinkCategory
  label: string
  items: MenuItem[]
}

const groups = computed<CategoryGroup[]>(() => {
  const categories = Object.keys(CATEGORY_LABELS) as DrinkCategory[]
  return categories
    .map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      items: items.value.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0)
})
</script>

<template>
  <div class="page">
    <RouterLink to="/menu" class="back">‹ 所有品牌</RouterLink>

    <template v-if="brand">
      <header class="brand-head">
        <span class="brand-emoji" :style="{ background: brand.color }" aria-hidden="true">
          {{ brand.emoji }}
        </span>
        <div>
          <h1 class="page-title">{{ brand.name }}</h1>
          <p class="page-subtitle">{{ brand.description }}</p>
        </div>
      </header>

      <p v-if="regionalCount" class="regional-hint">
        📍 本店有 {{ regionalCount }} 款區域限定品項，記得看標籤！
      </p>

      <section v-for="group in groups" :key="group.category" class="group">
        <h2 class="group-title">{{ group.label }}</h2>
        <div class="item-list">
          <MenuItemCard v-for="item in group.items" :key="item.id" :item="item" />
        </div>
      </section>
    </template>

    <div v-else class="empty-state">
      <span class="emoji">🤔</span>
      <p>找不到這個品牌</p>
    </div>
  </div>
</template>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: var(--space-md);
  color: var(--color-text-soft);
  font-size: 14px;
  font-weight: 600;
}

.brand-head {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.brand-emoji {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius);
  font-size: 28px;
  color: #fff;
}

.regional-hint {
  padding: 10px 14px;
  background: var(--color-pink-soft);
  color: #d6607a;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: var(--space-lg);
}

.group {
  margin-bottom: var(--space-lg);
}

.group-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: var(--space-sm);
  padding-left: var(--space-xs);
  border-left: 4px solid var(--color-primary);
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
