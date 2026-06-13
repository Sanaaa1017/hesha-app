import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BarChart from '../BarChart.vue'

describe('BarChart', () => {
  const data = [
    { label: '5月', value: 100 },
    { label: '6月', value: 200 },
  ]

  it('每筆資料渲染一個長條', () => {
    const wrapper = mount(BarChart, { props: { data } })
    expect(wrapper.findAll('.bar-col')).toHaveLength(2)
  })

  it('顯示數值與標籤', () => {
    const wrapper = mount(BarChart, { props: { data, unit: '元' } })
    expect(wrapper.text()).toContain('100元')
    expect(wrapper.text()).toContain('6月')
  })

  it('最大值的長條高度為 100%', () => {
    const wrapper = mount(BarChart, { props: { data } })
    const bars = wrapper.findAll('.bar')
    expect((bars[1]!.element as HTMLElement).style.height).toBe('100%')
  })
})
