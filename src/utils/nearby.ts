import type { Coords, DrinkStore, NearbyStore } from '@/types/store'
import { haversineMeters, isOpenAt } from './geo'

/** 依與使用者的距離由近到遠排序，並標註營業狀態 */
export function rankStoresByDistance(
  stores: DrinkStore[],
  userCoords: Coords,
  now: Date = new Date(),
): NearbyStore[] {
  return stores
    .map((store) => ({
      ...store,
      distanceMeters: haversineMeters(userCoords, { lat: store.lat, lng: store.lng }),
      isOpenNow: isOpenAt(store.openHour, store.closeHour, now),
    }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
}
