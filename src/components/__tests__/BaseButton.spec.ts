import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
  it('渲染 slot 內容', () => {
    const wrapper = mount(BaseButton, { slots: { default: '送出' } })
    expect(wrapper.text()).toBe('送出')
  })

  it('點擊時 emit click 事件', async () => {
    const wrapper = mount(BaseButton, { slots: { default: '送出' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('disabled 時套用 disabled 屬性', () => {
    const wrapper = mount(BaseButton, { props: { disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('依 variant 套用對應 class', () => {
    const wrapper = mount(BaseButton, { props: { variant: 'danger' } })
    expect(wrapper.classes()).toContain('is-danger')
  })
})
