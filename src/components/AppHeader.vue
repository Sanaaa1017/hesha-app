<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="brand">
      <span class="brand-logo" aria-hidden="true">🧋</span>
      <span class="brand-text">
        <strong>喝啥</strong>
        <small>Hesha</small>
      </span>
    </RouterLink>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
}

.brand-logo {
  font-size: 26px;
}

.brand-text {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
}

.brand-text strong {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-primary-strong);
}

.brand-text small {
  font-size: 12px;
  letter-spacing: 1px;
  color: var(--color-text-soft);
}
</style>
