<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface FeatureLink {
  to: string
  title: string
  desc: string
  icon: string
  color: string
}

const features: FeatureLink[] = [
  {
    to: '/menu',
    title: '菜單瀏覽',
    desc: '各品牌品項與區域限定',
    icon: '🧋',
    color: 'var(--color-primary-soft)',
  },
  {
    to: '/nearby',
    title: '附近店家',
    desc: '看看附近喝得到什麼',
    icon: '📍',
    color: 'var(--color-mint-soft)',
  },
  {
    to: '/records',
    title: '喝過紀錄',
    desc: '評分、心得與照片',
    icon: '📝',
    color: 'var(--color-pink-soft)',
  },
  {
    to: '/recommend',
    title: 'AI 推薦',
    desc: '依喜好與情境推薦',
    icon: '✨',
    color: '#fff3d4',
  },
  {
    to: '/stats',
    title: '數據總覽',
    desc: '花費與營養統計',
    icon: '📊',
    color: 'var(--color-surface-alt)',
  },
  {
    to: '/settings',
    title: '偏好設定',
    desc: '調整你的口味喜好',
    icon: '⚙️',
    color: 'var(--color-mint-soft)',
  },
]
</script>

<template>
  <div class="page home">
    <section class="hero">
      <p class="hero-hi">嗨～今天</p>
      <h1 class="hero-title">喝啥好呢？🥤</h1>
      <p class="hero-sub">幫你記錄、查詢、還能推薦適合你的飲料</p>
    </section>

    <section class="grid">
      <RouterLink
        v-for="feature in features"
        :key="feature.to"
        :to="feature.to"
        class="feature-card"
        :style="{ background: feature.color }"
      >
        <span class="feature-icon" aria-hidden="true">{{ feature.icon }}</span>
        <span class="feature-title">{{ feature.title }}</span>
        <span class="feature-desc">{{ feature.desc }}</span>
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: var(--space-lg) var(--space-xs) var(--space-xl);
}

.hero-hi {
  color: var(--color-text-soft);
  font-size: 14px;
}

.hero-title {
  font-size: 30px;
  font-weight: 800;
  color: var(--color-primary-strong);
}

.hero-sub {
  margin-top: var(--space-xs);
  color: var(--color-text-soft);
  font-size: 14px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.feature-icon {
  font-size: 30px;
  margin-bottom: var(--space-xs);
}

.feature-title {
  font-weight: 700;
  font-size: 16px;
}

.feature-desc {
  font-size: 12px;
  color: var(--color-text-soft);
}
</style>
