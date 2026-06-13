import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Brand, MenuItem } from '@/types/menu'
import { getBrands, getMenuItems } from '@/services/menu'

export const useMenuStore = defineStore('menu', () => {
  const brands = ref<Brand[]>([])
  const items = ref<MenuItem[]>([])
  const isLoaded = ref(false)

  const brandCount = computed(() => brands.value.length)
  const itemCount = computed(() => items.value.length)

  function load(): void {
    if (isLoaded.value) return
    brands.value = getBrands()
    items.value = getMenuItems()
    isLoaded.value = true
  }

  function getBrand(id: string): Brand | undefined {
    return brands.value.find((brand) => brand.id === id)
  }

  function itemsOfBrand(brandId: string): MenuItem[] {
    return items.value.filter((item) => item.brandId === brandId)
  }

  function getItem(id: string): MenuItem | undefined {
    return items.value.find((item) => item.id === id)
  }

  return {
    brands,
    items,
    isLoaded,
    brandCount,
    itemCount,
    load,
    getBrand,
    itemsOfBrand,
    getItem,
  }
})
