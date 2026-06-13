<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="search-input">
    <span class="search-icon" aria-hidden="true">🔍</span>
    <input
      :value="modelValue"
      :placeholder="placeholder ?? '搜尋…'"
      type="search"
      class="search-field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      type="button"
      class="search-clear"
      aria-label="清除"
      @click="$emit('update:modelValue', '')"
    >
      ✕
    </button>
  </div>
</template>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 10px 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-sm);
}

.search-icon {
  font-size: 15px;
}

.search-field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  color: var(--color-text);
}

.search-field::placeholder {
  color: var(--color-text-soft);
}

.search-clear {
  border: none;
  background: var(--color-surface-alt);
  color: var(--color-text-soft);
  width: 22px;
  height: 22px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  line-height: 1;
}
</style>
