<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { DrinkRecordInput } from '@/types/drinkRecord'
import { todayISODate } from '@/utils/date'
import { fileToCompressedDataUrl } from '@/utils/image'
import StarRating from './StarRating.vue'
import BaseButton from './BaseButton.vue'
import MenuItemPicker, { type MenuItemPick } from './MenuItemPicker.vue'

const props = withDefaults(
  defineProps<{
    initial?: DrinkRecordInput
    submitLabel?: string
  }>(),
  { submitLabel: '儲存' },
)

const emit = defineEmits<{
  submit: [input: DrinkRecordInput]
  cancel: []
}>()

const form = reactive({
  drinkName: props.initial?.drinkName ?? '',
  storeName: props.initial?.storeName ?? '',
  rating: props.initial?.rating ?? 0,
  notes: props.initial?.notes ?? '',
  lastDrankAt: props.initial?.lastDrankAt ?? todayISODate(),
  photoUrl: props.initial?.photoUrl ?? null,
  price: props.initial?.price != null ? String(props.initial.price) : '',
  menuItemId: props.initial?.menuItemId ?? null,
  brandId: props.initial?.brandId ?? null,
})

// 連結菜單後顯示的標籤（編輯既有連結時顯示通用文字）
const linkedLabel = ref<string | null>(props.initial?.menuItemId ? '已連結菜單品項' : null)

const errors = reactive({ drinkName: '', storeName: '' })
const isProcessingPhoto = ref(false)

function onPickMenuItem(pick: MenuItemPick): void {
  form.drinkName = pick.item.name
  form.storeName = pick.brandName
  form.price = String(pick.item.price)
  form.menuItemId = pick.item.id
  form.brandId = pick.item.brandId
  linkedLabel.value = `${pick.brandName} · ${pick.item.name}`
}

function unlinkMenuItem(): void {
  form.menuItemId = null
  form.brandId = null
  linkedLabel.value = null
}

function validate(): boolean {
  errors.drinkName = form.drinkName.trim() ? '' : '請輸入飲料名稱'
  errors.storeName = form.storeName.trim() ? '' : '請輸入店家名稱'
  return !errors.drinkName && !errors.storeName
}

async function onPhotoChange(event: Event): Promise<void> {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  isProcessingPhoto.value = true
  try {
    form.photoUrl = await fileToCompressedDataUrl(file)
  } finally {
    isProcessingPhoto.value = false
  }
}

function removePhoto(): void {
  form.photoUrl = null
}

function parsePrice(): number | null {
  const raw = form.price.trim()
  if (raw === '') return null
  const value = Number(raw)
  return Number.isFinite(value) && value >= 0 ? Math.round(value) : null
}

function onSubmit(): void {
  if (!validate()) return
  emit('submit', {
    drinkName: form.drinkName.trim(),
    storeName: form.storeName.trim(),
    rating: form.rating || null,
    notes: form.notes.trim() || null,
    lastDrankAt: form.lastDrankAt,
    photoUrl: form.photoUrl,
    price: parsePrice(),
    menuItemId: form.menuItemId,
    brandId: form.brandId,
  })
}
</script>

<template>
  <form class="record-form" @submit.prevent="onSubmit">
    <div class="field">
      <MenuItemPicker @select="onPickMenuItem" />
      <div v-if="linkedLabel" class="linked">
        <span class="linked-text">🧋 {{ linkedLabel }}</span>
        <button type="button" class="linked-clear" @click="unlinkMenuItem">取消連結</button>
      </div>
      <p v-else class="linked-hint">連結菜單品項即可自動帶入並計入營養統計</p>
    </div>

    <label class="field">
      <span class="label">飲料名稱 <em>*</em></span>
      <input
        v-model="form.drinkName"
        type="text"
        class="input"
        placeholder="例如：珍珠奶茶"
        :class="{ 'has-error': errors.drinkName }"
      />
      <span v-if="errors.drinkName" class="error">{{ errors.drinkName }}</span>
    </label>

    <label class="field">
      <span class="label">店家名稱 <em>*</em></span>
      <input
        v-model="form.storeName"
        type="text"
        class="input"
        placeholder="例如：五十嵐"
        :class="{ 'has-error': errors.storeName }"
      />
      <span v-if="errors.storeName" class="error">{{ errors.storeName }}</span>
    </label>

    <div class="field">
      <span class="label">評分</span>
      <StarRating v-model="form.rating" :size="30" />
    </div>

    <label class="field">
      <span class="label">心得</span>
      <textarea
        v-model="form.notes"
        class="input textarea"
        rows="3"
        placeholder="今天這杯喝起來如何？"
      />
    </label>

    <div class="field-row">
      <label class="field">
        <span class="label">最後一次喝</span>
        <input v-model="form.lastDrankAt" type="date" class="input" />
      </label>
      <label class="field">
        <span class="label">金額</span>
        <div class="price-input">
          <span class="price-prefix">$</span>
          <input
            v-model="form.price"
            type="number"
            min="0"
            inputmode="numeric"
            class="input"
            placeholder="選填"
          />
        </div>
      </label>
    </div>

    <div class="field">
      <span class="label">照片</span>
      <div v-if="form.photoUrl" class="photo-preview">
        <img :src="form.photoUrl" alt="飲料照片" />
        <button type="button" class="photo-remove" @click="removePhoto">移除照片</button>
      </div>
      <label v-else class="photo-upload">
        <input type="file" accept="image/*" hidden @change="onPhotoChange" />
        <span v-if="isProcessingPhoto">處理中…</span>
        <span v-else>📷 點此上傳照片</span>
      </label>
    </div>

    <div class="actions">
      <BaseButton variant="ghost" @click="emit('cancel')">取消</BaseButton>
      <BaseButton type="submit" :disabled="isProcessingPhoto">{{ submitLabel }}</BaseButton>
    </div>
  </form>
</template>

<style scoped>
.record-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-row {
  display: flex;
  gap: var(--space-md);
}

.field-row .field {
  flex: 1;
}

.price-input {
  position: relative;
}

.price-prefix {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-soft);
  font-weight: 600;
}

.price-input .input {
  padding-left: 28px;
}

.label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-soft);
}

.label em {
  color: var(--color-danger);
  font-style: normal;
}

.input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  font-size: 15px;
  font-family: inherit;
  color: var(--color-text);
  outline: none;
  transition: border-color 0.12s ease;
}

.input:focus {
  border-color: var(--color-primary);
}

.input.has-error {
  border-color: var(--color-danger);
}

.textarea {
  resize: vertical;
}

.error {
  font-size: 12px;
  color: var(--color-danger);
}

.linked {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: 8px 14px;
  background: var(--color-primary-soft);
  border-radius: var(--radius);
}

.linked-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary-strong);
}

.linked-clear {
  border: none;
  background: transparent;
  color: var(--color-text-soft);
  font-size: 12px;
  text-decoration: underline;
  flex-shrink: 0;
}

.linked-hint {
  font-size: 12px;
  color: var(--color-text-soft);
}

.photo-upload {
  display: grid;
  place-items: center;
  padding: var(--space-lg);
  border: 1.5px dashed var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text-soft);
  font-weight: 600;
  cursor: pointer;
}

.photo-preview {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
}

.photo-preview img {
  width: 100%;
  max-height: 280px;
  object-fit: cover;
}

.photo-remove {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  border: none;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}
</style>
