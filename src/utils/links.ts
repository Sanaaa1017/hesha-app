import type { DrinkStore } from '@/types/store'

/** Google Maps 導航連結（以座標為目的地） */
export function googleMapsLink(store: DrinkStore): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`
}

/** foodpanda 搜尋連結（以店名關鍵字） */
export function foodpandaLink(store: DrinkStore): string {
  return `https://www.foodpanda.com.tw/?q=${encodeURIComponent(store.name)}`
}

/** Uber Eats 搜尋連結（以店名關鍵字） */
export function uberEatsLink(store: DrinkStore): string {
  return `https://www.ubereats.com/tw/search?q=${encodeURIComponent(store.name)}`
}
