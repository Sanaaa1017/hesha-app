import { ref } from 'vue'
import type { Coords } from '@/types/store'

/** 封裝瀏覽器 Geolocation API 的組合式函式 */
export function useGeolocation() {
  const coords = ref<Coords | null>(null)
  const error = ref<string | null>(null)
  const isLocating = ref(false)

  function locate(): Promise<Coords | null> {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        error.value = '此裝置不支援定位功能'
        resolve(null)
        return
      }
      isLocating.value = true
      error.value = null
      navigator.geolocation.getCurrentPosition(
        (position) => {
          coords.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          isLocating.value = false
          resolve(coords.value)
        },
        (geoError) => {
          error.value =
            geoError.code === geoError.PERMISSION_DENIED
              ? '你拒絕了定位權限，可改用示範位置'
              : '無法取得目前位置'
          isLocating.value = false
          resolve(null)
        },
        { enableHighAccuracy: false, timeout: 10_000 },
      )
    })
  }

  /** 手動設定座標（例如改用示範位置） */
  function setCoords(value: Coords): void {
    coords.value = value
    error.value = null
  }

  return { coords, error, isLocating, locate, setCoords }
}
