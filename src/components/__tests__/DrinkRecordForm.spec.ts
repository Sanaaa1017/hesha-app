import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import DrinkRecordForm from '../DrinkRecordForm.vue'

describe('DrinkRecordForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('必填欄位為空時不 emit submit 並顯示錯誤', async () => {
    const wrapper = mount(DrinkRecordForm)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeUndefined()
    expect(wrapper.text()).toContain('請輸入飲料名稱')
    expect(wrapper.text()).toContain('請輸入店家名稱')
  })

  it('填妥必填欄位後 emit 已去除空白的 payload', async () => {
    const wrapper = mount(DrinkRecordForm)
    const inputs = wrapper.findAll('input[type="text"]')
    await inputs[0]!.setValue('  珍珠奶茶  ')
    await inputs[1]!.setValue('五十嵐')
    await wrapper.find('form').trigger('submit')

    const payload = wrapper.emitted('submit')?.[0]?.[0]
    expect(payload).toMatchObject({ drinkName: '珍珠奶茶', storeName: '五十嵐' })
  })

  it('帶 initial 時預先填入欄位', () => {
    const wrapper = mount(DrinkRecordForm, {
      props: { initial: { drinkName: '紅茶', storeName: '清心' } },
    })
    const inputs = wrapper.findAll('input[type="text"]')
    expect((inputs[0]!.element as HTMLInputElement).value).toBe('紅茶')
    expect((inputs[1]!.element as HTMLInputElement).value).toBe('清心')
  })

  it('點取消時 emit cancel', async () => {
    const wrapper = mount(DrinkRecordForm)
    await wrapper.find('button[type="button"]').trigger('click')
    // 第一顆星也是 type=button，因此用文字找取消鍵
    const cancelBtn = wrapper.findAll('button').find((b) => b.text() === '取消')
    await cancelBtn!.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})
