<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useDrinkRecordsStore } from '@/stores/drinkRecords'
import { useMenuStore } from '@/stores/menu'
import type { DrinkRecordInput } from '@/types/drinkRecord'
import { formatDate } from '@/utils/date'
import StarRating from '@/components/StarRating.vue'
import DrinkRecordForm from '@/components/DrinkRecordForm.vue'
import NutritionBadges from '@/components/NutritionBadges.vue'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const store = useDrinkRecordsStore()
const menu = useMenuStore()

const id = computed(() => String(route.params.id))
const record = computed(() => store.getRecord(id.value))
const isEditing = ref(false)
const showDeleteConfirm = ref(false)

const linkedItem = computed(() =>
  record.value?.menuItemId ? menu.getItem(record.value.menuItemId) : undefined,
)

onMounted(() => {
  if (!store.records.length) store.fetchRecords()
  menu.load()
})

const editInitial = computed<DrinkRecordInput | undefined>(() => {
  if (!record.value) return undefined
  const r = record.value
  return {
    drinkName: r.drinkName,
    storeName: r.storeName,
    rating: r.rating,
    notes: r.notes,
    lastDrankAt: r.lastDrankAt,
    photoUrl: r.photoUrl,
    price: r.price,
    menuItemId: r.menuItemId,
    brandId: r.brandId,
  }
})

function onUpdate(input: DrinkRecordInput): void {
  store.editRecord(id.value, input)
  isEditing.value = false
}

function onDelete(): void {
  store.deleteRecord(id.value)
  router.push('/records')
}
</script>

<template>
  <div class="page">
    <RouterLink to="/records" class="back">‹ 紀錄列表</RouterLink>

    <template v-if="record">
      <!-- 編輯模式 -->
      <template v-if="isEditing">
        <h1 class="page-title">編輯紀錄</h1>
        <DrinkRecordForm
          :initial="editInitial"
          submit-label="儲存"
          @submit="onUpdate"
          @cancel="isEditing = false"
        />
      </template>

      <!-- 檢視模式 -->
      <template v-else>
        <div v-if="record.photoUrl" class="hero-photo">
          <img :src="record.photoUrl" :alt="record.drinkName" />
        </div>

        <div class="detail-head">
          <h1 class="page-title">{{ record.drinkName }}</h1>
          <span v-if="record.price !== null" class="price">${{ record.price }}</span>
        </div>
        <p class="store">📍 {{ record.storeName }}</p>

        <StarRating
          v-if="record.rating"
          :model-value="record.rating"
          readonly
          :size="24"
          class="stars"
        />

        <div v-if="record.notes" class="notes card">{{ record.notes }}</div>

        <div v-if="linkedItem" class="nutrition-card card">
          <p class="nutrition-title">營養資訊（{{ linkedItem.name }}）</p>
          <NutritionBadges
            :sugar-g="linkedItem.sugarG"
            :calories="linkedItem.calories"
            :caffeine-mg="linkedItem.caffeineMg"
            size="md"
          />
        </div>

        <p class="date">最後一次喝：{{ formatDate(record.lastDrankAt) }}</p>

        <div class="actions">
          <BaseButton variant="secondary" @click="isEditing = true">✏️ 編輯</BaseButton>
          <BaseButton variant="ghost" @click="showDeleteConfirm = true">🗑 刪除</BaseButton>
        </div>
      </template>
    </template>

    <div v-else class="empty-state">
      <span class="emoji">🤔</span>
      <p>找不到這筆紀錄</p>
    </div>

    <!-- 刪除確認 -->
    <div v-if="showDeleteConfirm" class="confirm-backdrop" @click.self="showDeleteConfirm = false">
      <div class="confirm-box card">
        <p class="confirm-title">確定要刪除這筆紀錄嗎？</p>
        <p class="confirm-sub">刪除後就找不回來囉</p>
        <div class="confirm-actions">
          <BaseButton variant="ghost" @click="showDeleteConfirm = false">取消</BaseButton>
          <BaseButton variant="danger" @click="onDelete">刪除</BaseButton>
        </div>
      </div>
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

.hero-photo {
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-md);
}

.hero-photo img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
}

.detail-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-sm);
}

.price {
  font-weight: 800;
  color: var(--color-primary-strong);
  font-size: 18px;
}

.store {
  color: var(--color-text-soft);
  margin-top: var(--space-xs);
}

.stars {
  margin-top: var(--space-sm);
}

.notes {
  margin-top: var(--space-md);
  white-space: pre-wrap;
  line-height: 1.7;
}

.nutrition-card {
  margin-top: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.nutrition-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-soft);
}

.date {
  margin-top: var(--space-md);
  font-size: 13px;
  color: var(--color-text-soft);
}

.actions {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}

.confirm-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: var(--space-lg);
  background: rgba(92, 74, 61, 0.4);
}

.confirm-box {
  width: 100%;
  max-width: 320px;
  text-align: center;
}

.confirm-title {
  font-weight: 700;
  font-size: 16px;
}

.confirm-sub {
  margin-top: var(--space-xs);
  font-size: 13px;
  color: var(--color-text-soft);
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}
</style>
