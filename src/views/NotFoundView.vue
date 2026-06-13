<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page">
    <div class="empty-state">
      <span class="emoji">🥡</span>
      <p>找不到這一頁</p>
      <RouterLink to="/" class="back-link">回首頁</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  margin-top: var(--space-md);
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: 600;
}
</style>
