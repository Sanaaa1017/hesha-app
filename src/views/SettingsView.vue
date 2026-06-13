<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { usePreferencesStore } from '@/stores/preferences'
import { ALL_PREFERENCES, PREFERENCE_LABELS } from '@/types/recommend'

const prefs = usePreferencesStore()

onMounted(() => prefs.load())
</script>

<template>
  <div class="page">
    <h1 class="page-title">偏好設定 ⚙️</h1>
    <p class="page-subtitle">選擇你的口味，推薦會更準喔</p>

    <div class="chips">
      <button
        v-for="pref in ALL_PREFERENCES"
        :key="pref"
        class="pref-chip"
        :class="{ 'is-on': prefs.has(pref) }"
        @click="prefs.toggle(pref)"
      >
        {{ PREFERENCE_LABELS[pref] }}
      </button>
    </div>

    <div class="summary card">
      <template v-if="prefs.types.length">
        <p class="summary-title">目前的口味標籤</p>
        <p class="summary-text">
          {{ prefs.types.map((t) => PREFERENCE_LABELS[t]).join('、') }}
        </p>
      </template>
      <p v-else class="summary-empty">還沒選擇任何偏好，先挑幾個吧！</p>
    </div>

    <RouterLink to="/recommend" class="go-recommend">✨ 立即看 AI 推薦</RouterLink>
  </div>
</template>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.pref-chip {
  padding: 10px 18px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.12s ease;
}

.pref-chip.is-on {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.summary {
  text-align: center;
}

.summary-title {
  font-size: 12px;
  color: var(--color-text-soft);
  margin-bottom: var(--space-xs);
}

.summary-text {
  font-weight: 600;
}

.summary-empty {
  color: var(--color-text-soft);
  font-size: 14px;
}

.go-recommend {
  display: block;
  margin-top: var(--space-lg);
  text-align: center;
  padding: 12px;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}
</style>
