import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/MenuView.vue'),
    },
    {
      path: '/menu/:brandId',
      name: 'brand-menu',
      component: () => import('@/views/BrandMenuView.vue'),
    },
    {
      path: '/nearby',
      name: 'nearby',
      component: () => import('@/views/NearbyView.vue'),
    },
    {
      path: '/records',
      name: 'records',
      component: () => import('@/views/DrinkRecordListView.vue'),
    },
    {
      path: '/records/new',
      name: 'record-create',
      component: () => import('@/views/DrinkRecordCreateView.vue'),
    },
    {
      path: '/records/:id',
      name: 'record-detail',
      component: () => import('@/views/DrinkRecordDetailView.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('@/views/StatsView.vue'),
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/views/RecommendView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
