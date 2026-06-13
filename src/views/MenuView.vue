<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { filterMenuItems, type MenuFilters } from '@/utils/menuFilter'
import { CATEGORY_LABELS, REGION_LABELS, type DrinkCategory, type Region } from '@/types/menu'
import SearchInput from '@/components/SearchInput.vue'
import MenuItemCard from '@/components/MenuItemCard.vue'
import BrandCard from '@/components/BrandCard.vue'

const menu = useMenuStore()

onMounted(() => menu.load())

const filters = reactive<MenuFilters>({
  query: '',
  region: null,
  category: null,
  onlyRegional: false,
  onlySeasonal: false,
})

const regions = Object.keys(REGION_LABELS) as Region[]
const categories = Object.keys(CATEGORY_LABELS) as DrinkCategory[]

const isFiltering = computed(
  () =>
    filters.query.trim() !== '' ||
    filters.region !== null ||
    filters.category !== null ||
    filters.onlyRegional ||
    filters.onlySeasonal,
)

const results = computed(() => filterMenuItems(menu.items, filters))

function brandName(brandId: string): string {
  return menu.getBrand(brandId)?.name ?? ''
}

function toggleRegion(region: Region): void {
  filters.region = filters.region === region ? null : region
}

function toggleCategory(category: DrinkCategory): void {
  filters.category = filters.category === category ? null : category
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">菜單瀏覽 🧋</h1>
    <p class="page-subtitle">查品項、看區域限定，不用再翻官網</p>

    <SearchInput v-model="filters.query" placeholder="搜尋品項，例如：珍奶、楊枝甘露" />

    <div class="filter-block">
      <p class="filter-label">所在區域</p>
      <div class="chips">
        <button
          v-for="region in regions"
          :key="region"
          class="chip"
          :class="{ 'is-on': filters.region === region }"
          @click="toggleRegion(region)"
        >
          {{ REGION_LABELS[region] }}
        </button>
      </div>
    </div>

    <div class="filter-block">
      <p class="filter-label">分類與限定</p>
      <div class="chips">
        <button
          v-for="category in categories"
          :key="category"
          class="chip"
          :class="{ 'is-on': filters.category === category }"
          @click="toggleCategory(category)"
        >
          {{ CATEGORY_LABELS[category] }}
        </button>
        <button
          class="chip is-pink"
          :class="{ 'is-on': filters.onlyRegional }"
          @click="filters.onlyRegional = !filters.onlyRegional"
        >
          📍 區域限定
        </button>
        <button
          class="chip is-mint"
          :class="{ 'is-on': filters.onlySeasonal }"
          @click="filters.onlySeasonal = !filters.onlySeasonal"
        >
          🌸 季節限定
        </button>
      </div>
    </div>

    <!-- 篩選/搜尋結果：跨品牌品項列表 -->
    <section v-if="isFiltering">
      <p class="result-count">找到 {{ results.length }} 款品項</p>
      <div v-if="results.length" class="item-list">
        <MenuItemCard
          v-for="item in results"
          :key="item.id"
          :item="item"
          :brand-name="brandName(item.brandId)"
        />
      </div>
      <div v-else class="empty-state">
        <span class="emoji">🫥</span>
        <p>沒有符合條件的品項</p>
      </div>
    </section>

    <!-- 預設：品牌列表 -->
    <section v-else class="brand-list">
      <RouterLink
        v-for="brand in menu.brands"
        :key="brand.id"
        :to="`/menu/${brand.id}`"
        class="brand-link"
      >
        <BrandCard :brand="brand" :item-count="menu.itemsOfBrand(brand.id).length" />
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.filter-block {
  margin-top: var(--space-md);
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-soft);
  margin-bottom: var(--space-xs);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.chip {
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text-soft);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.12s ease;
}

.chip.is-on {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.chip.is-pink.is-on {
  background: var(--color-pink);
  border-color: var(--color-pink);
}

.chip.is-mint.is-on {
  background: var(--color-mint);
  border-color: var(--color-mint);
}

.result-count {
  margin: var(--space-lg) 0 var(--space-sm);
  font-size: 13px;
  color: var(--color-text-soft);
}

.item-list,
.brand-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.brand-list {
  margin-top: var(--space-lg);
}
</style>
