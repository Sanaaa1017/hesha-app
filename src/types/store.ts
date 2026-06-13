/** 地理座標 */
export interface Coords {
  lat: number
  lng: number
}

/** 飲料店家（假資料） */
export interface DrinkStore {
  id: string
  name: string
  /** 關聯品牌 id；獨立店家為 null */
  brandId: string | null
  lat: number
  lng: number
  address: string
  /** 營業起始時間（0–24） */
  openHour: number
  /** 營業結束時間（0–24） */
  closeHour: number
}

/** 帶距離與營業狀態的店家（給附近列表用） */
export interface NearbyStore extends DrinkStore {
  /** 與使用者的距離（公尺） */
  distanceMeters: number
  isOpenNow: boolean
}
