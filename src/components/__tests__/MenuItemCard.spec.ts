import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MenuItemCard from '../MenuItemCard.vue'
import type { MenuItem } from '@/types/menu'

const baseItem: MenuItem = {
  id: 'a',
  brandId: 'b',
  name: '珍珠奶茶',
  category: 'milk-tea',
  price: 50,
  isRegional: false,
  isSeasonal: false,
  sugarG: 42,
  calories: 380,
  caffeineMg: 90,
}

describe('MenuItemCard', () => {
  it('顯示品名與價格', () => {
    const wrapper = mount(MenuItemCard, { props: { item: baseItem } })
    expect(wrapper.text()).toContain('珍珠奶茶')
    expect(wrapper.text()).toContain('$50')
  })

  it('區域限定品項顯示區域標籤', () => {
    const wrapper = mount(MenuItemCard, {
      props: {
        item: { ...baseItem, isRegional: true, region: 'central' },
      },
    })
    expect(wrapper.text()).toContain('中部限定')
  })

  it('季節限定品項顯示季節標籤', () => {
    const wrapper = mount(MenuItemCard, {
      props: { item: { ...baseItem, isSeasonal: true } },
    })
    expect(wrapper.text()).toContain('季節限定')
  })

  it('傳入 brandName 時顯示品牌名', () => {
    const wrapper = mount(MenuItemCard, {
      props: { item: baseItem, brandName: '五十嵐' },
    })
    expect(wrapper.text()).toContain('五十嵐')
  })
})
