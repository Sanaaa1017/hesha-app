<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number
    readonly?: boolean
    size?: number
  }>(),
  { readonly: false, size: 24 },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function setRating(value: number): void {
  if (props.readonly) return
  // 再次點同一顆星可取消評分
  emit('update:modelValue', value === props.modelValue ? 0 : value)
}
</script>

<template>
  <div class="star-rating" :class="{ 'is-readonly': readonly }">
    <button
      v-for="n in 5"
      :key="n"
      type="button"
      class="star"
      :class="{ 'is-filled': n <= modelValue }"
      :style="{ fontSize: `${size}px` }"
      :disabled="readonly"
      :aria-label="`${n} 顆星`"
      @click="setRating(n)"
    >
      ★
    </button>
  </div>
</template>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 2px;
}

.star {
  border: none;
  background: transparent;
  padding: 0;
  line-height: 1;
  color: var(--color-border);
  transition: transform 0.1s ease;
}

.star.is-filled {
  color: var(--color-star);
}

.star-rating:not(.is-readonly) .star:active {
  transform: scale(1.2);
}

.is-readonly .star {
  cursor: default;
}
</style>
