<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface NavItem {
  to: string
  label: string
  icon: string
}

const items: NavItem[] = [
  { to: '/', label: '首頁', icon: '🏠' },
  { to: '/menu', label: '菜單', icon: '🧋' },
  { to: '/nearby', label: '附近', icon: '📍' },
  { to: '/records', label: '紀錄', icon: '📝' },
  { to: '/recommend', label: '推薦', icon: '✨' },
]
</script>

<template>
  <nav class="app-nav">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="nav-item"
      :active-class="item.to === '/' ? '' : 'is-active'"
      exact-active-class="is-active"
    >
      <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.app-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  max-width: 720px;
  margin: 0 auto;
  padding: 6px 4px calc(6px + env(safe-area-inset-bottom));
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -4px 20px rgba(92, 74, 61, 0.06);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex: 1;
  padding: 6px 0;
  border-radius: var(--radius);
  color: var(--color-text-soft);
  transition: color 0.12s ease;
}

.nav-icon {
  font-size: 20px;
  line-height: 1;
  filter: grayscale(0.4);
  transition: filter 0.12s ease;
}

.nav-label {
  font-size: 11px;
  font-weight: 600;
}

.nav-item.is-active {
  color: var(--color-primary-strong);
}

.nav-item.is-active .nav-icon {
  filter: grayscale(0);
}
</style>
