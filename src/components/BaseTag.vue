<script setup lang="ts">
type TagColor = 'primary' | 'pink' | 'mint' | 'lemon' | 'neutral'

withDefaults(
  defineProps<{
    color?: TagColor
  }>(),
  {
    color: 'neutral',
  },
)
</script>

<template>
  <span :class="['base-tag', `is-${color}`]">
    <slot />
  </span>
</template>

<style scoped>
.base-tag {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 10px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.is-primary {
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
}

.is-pink {
  background: var(--color-pink-soft);
  color: #d6607a;
}

.is-mint {
  background: var(--color-mint-soft);
  color: #3f9b8c;
}

.is-lemon {
  background: #fff3d4;
  color: #c79420;
}

.is-neutral {
  background: var(--color-surface-alt);
  color: var(--color-text-soft);
}
</style>
