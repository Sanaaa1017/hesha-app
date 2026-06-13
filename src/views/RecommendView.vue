<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { useDrinkRecordsStore } from '@/stores/drinkRecords'
import { usePreferencesStore } from '@/stores/preferences'
import { useSavedRecommendationsStore } from '@/stores/savedRecommendations'
import { recommend } from '@/utils/recommend'
import {
  ALL_CONTEXTS,
  CONTEXT_LABELS,
  PREFERENCE_LABELS,
  type RecommendContext,
  type Recommendation,
} from '@/types/recommend'
import RecommendationCard from '@/components/RecommendationCard.vue'

const menu = useMenuStore()
const records = useDrinkRecordsStore()
const prefs = usePreferencesStore()
const saved = useSavedRecommendationsStore()

const context = ref<RecommendContext>('any')
const results = ref<Recommendation[]>([])

function generate(): void {
  results.value = recommend(
    {
      items: menu.items,
      prefs: prefs.types,
      context: context.value,
      history: records.records,
      limit: 4,
      randomFn: Math.random,
    },
    (brandId) => menu.getBrand(brandId)?.name ?? '',
  )
}

function selectContext(value: RecommendContext): void {
  context.value = value
  generate()
}

function brandEmoji(brandId: string): string | undefined {
  return menu.getBrand(brandId)?.emoji
}

onMounted(() => {
  menu.load()
  records.fetchRecords()
  prefs.load()
  saved.load()
  generate()
})
</script>

<template>
  <div class="page">
    <h1 class="page-title">AI 推薦 ✨</h1>
    <p class="page-subtitle">依你的口味與當下情境，幫你選一杯</p>

    <RouterLink v-if="!prefs.types.length" to="/settings" class="pref-hint">
      還沒設定口味偏好，點此設定推薦更準 →
    </RouterLink>
    <div v-else class="pref-tags">
      <span class="pref-tags-label">你的口味：</span>
      {{ prefs.types.map((t) => PREFERENCE_LABELS[t]).join('、') }}
    </div>

    <div class="context-block">
      <p class="block-label">現在的情境</p>
      <div class="chips">
        <button
          v-for="ctx in ALL_CONTEXTS"
          :key="ctx"
          class="chip"
          :class="{ 'is-on': context === ctx }"
          @click="selectContext(ctx)"
        >
          {{ CONTEXT_LABELS[ctx] }}
        </button>
      </div>
    </div>

    <div class="results">
      <RecommendationCard
        v-for="rec in results"
        :key="rec.menuItemId"
        :recommendation="rec"
        :brand-emoji="brandEmoji(rec.brandId)"
        :is-saved="saved.isSaved(rec.menuItemId)"
        @save="saved.save(rec, context)"
      />
    </div>

    <button class="reroll" @click="generate">🔄 換一批推薦</button>

    <!-- 收藏清單 -->
    <section v-if="saved.items.length" class="saved-section">
      <h2 class="section-title">💛 我的收藏</h2>
      <ul class="saved-list">
        <li v-for="item in saved.items" :key="item.id" class="saved-item card">
          <div class="saved-info">
            <p class="saved-name">{{ item.itemName }}</p>
            <p class="saved-meta">{{ item.brandName }} · {{ CONTEXT_LABELS[item.context] }}</p>
          </div>
          <button class="saved-remove" aria-label="移除收藏" @click="saved.remove(item.id)">
            ✕
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.pref-hint {
  display: block;
  padding: 10px 14px;
  background: var(--color-pink-soft);
  color: #d6607a;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.pref-tags {
  font-size: 13px;
  color: var(--color-text);
  margin-bottom: var(--space-md);
}

.pref-tags-label {
  color: var(--color-text-soft);
}

.context-block {
  margin-bottom: var(--space-lg);
}

.block-label {
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
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text-soft);
  font-size: 14px;
  font-weight: 600;
}

.chip.is-on {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.results {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.reroll {
  display: block;
  margin: var(--space-lg) auto 0;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 10px 24px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 14px;
}

.saved-section {
  margin-top: var(--space-xl);
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: var(--space-sm);
}

.saved-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.saved-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
}

.saved-name {
  font-weight: 600;
}

.saved-meta {
  font-size: 12px;
  color: var(--color-text-soft);
}

.saved-remove {
  border: none;
  background: var(--color-surface-alt);
  width: 26px;
  height: 26px;
  border-radius: var(--radius-pill);
  color: var(--color-text-soft);
  flex-shrink: 0;
}
</style>
