<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { DrinkRecordInput } from '@/types/drinkRecord'
import { todayISODate } from '@/utils/date'
import { fileToCompressedDataUrl } from '@/utils/image'
import StarRating from './StarRating.vue'
import BaseButton from './BaseButton.vue'

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
})

const errors = reactive({ drinkName: '', storeName: '' })
const isProcessingPhoto = ref(false)

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

function onSubmit(): void {
  if (!validate()) return
  emit('submit', {
    drinkName: form.drinkName.trim(),
    storeName: form.storeName.trim(),
    rating: form.rating || null,
    notes: form.notes.trim() || null,
    lastDrankAt: form.lastDrankAt,
    photoUrl: form.photoUrl,
  })
}
</script>

<template>
  <form class="record-form" @submit.prevent="onSubmit">
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

    <label class="field">
      <span class="label">最後一次喝</span>
      <input v-model="form.lastDrankAt" type="date" class="input" />
    </label>

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
