/** 取得今天的日期字串（YYYY-MM-DD，本地時區） */
export function todayISODate(): string {
  const now = new Date()
  const offsetMs = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10)
}

/** 將 YYYY-MM-DD 轉為「YYYY/MM/DD」顯示格式 */
export function formatDate(iso: string): string {
  return iso.replaceAll('-', '/')
}

/** 從日期字串取出「YYYY-MM」月份 key（功能⑤⑥統計用） */
export function monthKey(iso: string): string {
  return iso.slice(0, 7)
}

/** 將 YYYY-MM 轉為「YYYY 年 M 月」顯示 */
export function formatMonth(key: string): string {
  const [year, month] = key.split('-')
  return `${year} 年 ${Number(month)} 月`
}
