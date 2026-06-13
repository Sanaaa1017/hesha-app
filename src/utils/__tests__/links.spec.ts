import { describe, it, expect } from 'vitest'
import { googleMapsLink, foodpandaLink, uberEatsLink } from '../links'
import type { DrinkStore } from '@/types/store'

const store: DrinkStore = {
  id: 's1',
  name: '五十嵐 信義店',
  brandId: 'wushilan',
  lat: 25.034,
  lng: 121.567,
  address: '台北市信義區',
  openHour: 10,
  closeHour: 22,
}

describe('外部連結工具', () => {
  it('Google Maps 連結帶座標', () => {
    expect(googleMapsLink(store)).toBe(
      'https://www.google.com/maps/dir/?api=1&destination=25.034,121.567',
    )
  })

  it('foodpanda 連結帶 encode 後的店名', () => {
    expect(foodpandaLink(store)).toContain(encodeURIComponent('五十嵐 信義店'))
  })

  it('Uber Eats 連結帶 encode 後的店名', () => {
    expect(uberEatsLink(store)).toContain('ubereats.com/tw/search')
  })
})
