<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMenuStore } from '@/stores/menu'
import type { MenuItem } from '@/types/menu'
import SearchInput from './SearchInput.vue'
import BaseButton from './BaseButton.vue'

export interface MenuItemPick {
  item: MenuItem
  brandName: string
}

const emit = defineEmits<{
  select: [pick: MenuItemPick]
}>()

const menu = useMenuStore()
onMounted(() => menu.load())

const open = ref(false)
const query = ref('')
const brandFilter = ref<string | null>(null)

function brandName(brandId: string): string {
  return menu.getBrand(brandId)?.name ?? ''
}

function brandEmoji(brandId: string): string {
  return menu.getBrand(brandId)?.emoji ?? '🥤'
}

const filtered = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  return menu.items.filter((item) => {
    if (brandFilter.value && item.brandId !== brandFilter.value) return false
    if (!keyword) return true
    return (
      item.name.toLowerCase().includes(keyword) ||
      brandName(item.brandId).toLowerCase().includes(keyword)
    )
  })
})

function choose(item: MenuItem): void {
  emit('select', { item, brandName: brandName(item.brandId) })
  open.value = false
}
</script>

<template>
  <div>
    <BaseButton variant="secondary" block @click="open = true">🧋 從菜單帶入品項</BaseButton>

    <Teleport to="body">
      <div v-if="open" class="sheet-backdrop" @click.self="open = false">
        <div class="sheet">
          <div class="sheet-head">
            <p class="sheet-title">選擇菜單品項</p>
            <button class="sheet-close" aria-label="關閉" @click="open = false">✕</button>
          </div>

          <SearchInput v-model="query" placeholder="搜尋品項或品牌" />

          <div class="brand-chips">
            <button
              class="chip"
              :class="{ 'is-on': brandFilter === null }"
              @click="brandFilter = null"
            >
              全部
            </button>
            <button
              v-for="brand in menu.brands"
              :key="brand.id"
              class="chip"
              :class="{ 'is-on': brandFilter === brand.id }"
              @click="brandFilter = brand.id"
            >
              {{ brand.emoji }} {{ brand.name }}
            </button>
          </div>

          <ul class="item-rows">
            <li v-for="item in filtered" :key="item.id">
              <button class="row" @click="choose(item)">
                <span class="row-emoji" aria-hidden="true">{{ brandEmoji(item.brandId) }}</span>
                <span class="row-texts">
                  <span class="row-name">{{ item.name }}</span>
                  <span class="row-brand">{{ brandName(item.brandId) }}</span>
                </span>
                <span class="row-price">${{ item.price }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.sheet-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(92, 74, 61, 0.4);
}

.sheet {
  width: 100%;
  max-width: 720px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-md) calc(var(--space-md) + env(safe-area-inset-bottom));
  background: var(--color-bg);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.sheet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sheet-title {
  font-weight: 700;
  font-size: 16px;
}

.sheet-close {
  border: none;
  background: var(--color-surface-alt);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-pill);
  color: var(--color-text-soft);
}

.brand-chips {
  display: flex;
  gap: var(--space-xs);
  overflow-x: auto;
  padding-bottom: var(--space-xs);
}

.chip {
  flex-shrink: 0;
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text-soft);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.chip.is-on {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.item-rows {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: var(--color-surface);
  border-radius: var(--radius);
  text-align: left;
}

.row-emoji {
  font-size: 20px;
}

.row-texts {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.row-name {
  font-weight: 600;
  font-size: 14px;
}

.row-brand {
  font-size: 12px;
  color: var(--color-text-soft);
}

.row-price {
  font-weight: 700;
  color: var(--color-primary-strong);
}
</style>
