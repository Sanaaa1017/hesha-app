<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md'

withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    block?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    block: false,
    type: 'button',
    disabled: false,
  },
)

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['base-button', `is-${variant}`, `is-${size}`, { 'is-block': block }]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  border: none;
  border-radius: var(--radius-pill);
  font-weight: 600;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background 0.12s ease;
}

.base-button:active:not(:disabled) {
  transform: scale(0.96);
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.is-md {
  padding: 10px 20px;
  font-size: 15px;
}

.is-sm {
  padding: 6px 14px;
  font-size: 13px;
}

.is-block {
  display: flex;
  width: 100%;
}

.is-primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-sm);
}

.is-primary:hover:not(:disabled) {
  background: var(--color-primary-strong);
}

.is-secondary {
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
}

.is-ghost {
  background: transparent;
  color: var(--color-text-soft);
}

.is-ghost:hover:not(:disabled) {
  background: var(--color-surface-alt);
}

.is-danger {
  background: var(--color-danger);
  color: var(--color-text-inverse);
}
</style>
