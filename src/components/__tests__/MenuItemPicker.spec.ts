import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import MenuItemPicker from '../MenuItemPicker.vue'

describe('MenuItemPicker', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('點擊按鈕後開啟選擇面板', async () => {
    const wrapper = mount(MenuItemPicker, {
      attachTo: document.body,
      global: { stubs: { Teleport: true } },
    })
    expect(wrapper.find('.sheet').exists()).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.sheet').exists()).toBe(true)
    expect(wrapper.findAll('.row').length).toBeGreaterThan(0)
    wrapper.unmount()
  })

  it('選擇品項時 emit select 帶 item 與 brandName', async () => {
    const wrapper = mount(MenuItemPicker, {
      attachTo: document.body,
      global: { stubs: { Teleport: true } },
    })
    await wrapper.find('button').trigger('click')
    await wrapper.find('.row').trigger('click')

    const payload = wrapper.emitted('select')?.[0]?.[0] as
      | { item: { id: string }; brandName: string }
      | undefined
    expect(payload?.item.id).toBeTruthy()
    expect(payload?.brandName).toBeTruthy()
    wrapper.unmount()
  })
})
