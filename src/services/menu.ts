import { brands, menuItems } from '@/data/menu'
import type { Brand, MenuItem } from '@/types/menu'

/**
 * 菜單資料存取層。
 * 目前讀取本地假資料；未來改接後端或爬蟲時，只需替換此檔實作。
 */

export function getBrands(): Brand[] {
  return brands.slice()
}

export function getBrandById(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id)
}

export function getMenuItems(): MenuItem[] {
  return menuItems.slice()
}

export function getItemsByBrand(brandId: string): MenuItem[] {
  return menuItems.filter((item) => item.brandId === brandId)
}

export function getItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id)
}
