import { describe, it, expect } from 'vitest'
import { todayISODate, formatDate, monthKey, formatMonth } from '../date'

describe('date 工具', () => {
  it('todayISODate 回傳 YYYY-MM-DD 格式', () => {
    expect(todayISODate()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('formatDate 將連字號轉成斜線', () => {
    expect(formatDate('2026-06-13')).toBe('2026/06/13')
  })

  it('monthKey 取出 YYYY-MM', () => {
    expect(monthKey('2026-06-13')).toBe('2026-06')
  })

  it('formatMonth 轉成中文月份', () => {
    expect(formatMonth('2026-06')).toBe('2026 年 6 月')
  })
})
