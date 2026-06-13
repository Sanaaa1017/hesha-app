import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StarRating from '../StarRating.vue'

describe('StarRating', () => {
  it('點第 n 顆星 emit n', async () => {
    const wrapper = mount(StarRating, { props: { modelValue: 0 } })
    await wrapper.findAll('.star')[3]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('再次點目前星等可取消（emit 0）', async () => {
    const wrapper = mount(StarRating, { props: { modelValue: 3 } })
    await wrapper.findAll('.star')[2]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it('readonly 時點擊不 emit', async () => {
    const wrapper = mount(StarRating, { props: { modelValue: 2, readonly: true } })
    await wrapper.findAll('.star')[4]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('依 modelValue 填滿對應星數', () => {
    const wrapper = mount(StarRating, { props: { modelValue: 3 } })
    expect(wrapper.findAll('.star.is-filled')).toHaveLength(3)
  })
})
