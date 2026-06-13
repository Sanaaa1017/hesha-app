import type { Brand, MenuItem } from '@/types/menu'

/**
 * 台灣常見連鎖手搖品牌假資料。
 * 營養數值為「全糖中杯」的概略估計，僅供 demo，非官方數據。
 */
export const brands: Brand[] = [
  { id: 'wushilan', name: '五十嵐', emoji: '🧋', color: '#2e7d32', description: '國民手搖，珍珠波霸經典' },
  { id: 'milksha', name: '迷客夏', emoji: '🥛', color: '#00695c', description: '自家牧場鮮奶，奶茶控最愛' },
  { id: 'kebuke', name: '可不可熟成紅茶', emoji: '🫖', color: '#5d4037', description: '英式熟成紅茶，茶香濃郁' },
  { id: 'dayungs', name: '大苑子', emoji: '🍊', color: '#ef6c00', description: '台中發跡，現打鮮果茶' },
  { id: 'macu', name: '麻古茶坊', emoji: '🍓', color: '#c2185b', description: '楊枝甘露與水果系話題店' },
  { id: 'coco', name: 'CoCo 都可', emoji: '🍶', color: '#d32f2f', description: '百摳奶茶與三兄弟元老' },
  { id: 'chatime', name: '茶湯會', emoji: '🍯', color: '#6a1b9a', description: '觀光茶飲，波霸奶茶招牌' },
  { id: 'dejheng', name: '得正', emoji: '🍵', color: '#33691e', description: '清爽烏龍與奶蓋專門' },
]

export const menuItems: MenuItem[] = [
  // ── 五十嵐 ──
  { id: 'wushilan-zhuzhi', brandId: 'wushilan', name: '珍珠奶茶', category: 'milk-tea', price: 50, isRegional: false, isSeasonal: false, sugarG: 42, calories: 380, caffeineMg: 90 },
  { id: 'wushilan-boba', brandId: 'wushilan', name: '波霸奶茶', category: 'milk-tea', price: 50, isRegional: false, isSeasonal: false, sugarG: 45, calories: 410, caffeineMg: 90 },
  { id: 'wushilan-hongcha', brandId: 'wushilan', name: '紅茶', category: 'tea', price: 30, isRegional: false, isSeasonal: false, sugarG: 35, calories: 150, caffeineMg: 80 },
  { id: 'wushilan-sijigreen', brandId: 'wushilan', name: '四季春青茶', category: 'tea', price: 30, isRegional: false, isSeasonal: false, sugarG: 33, calories: 140, caffeineMg: 60 },
  { id: 'wushilan-bobamilk', brandId: 'wushilan', name: '阿華田', category: 'special', price: 55, isRegional: false, isSeasonal: false, sugarG: 48, calories: 430, caffeineMg: 25 },
  { id: 'wushilan-jin', brandId: 'wushilan', name: '8 冰茶（北部限定）', category: 'tea', price: 35, isRegional: true, region: 'north', regionalNote: '北部 KOI 系統限定品名', isSeasonal: false, sugarG: 34, calories: 145, caffeineMg: 70 },
  { id: 'wushilan-mango', brandId: 'wushilan', name: '夏季芒果青', category: 'fruit-tea', price: 60, isRegional: false, isSeasonal: true, sugarG: 50, calories: 220, caffeineMg: 30 },

  // ── 迷客夏 ──
  { id: 'milksha-zhennaicha', brandId: 'milksha', name: '珍珠鮮奶茶', category: 'fresh-tea', price: 65, isRegional: false, isSeasonal: false, sugarG: 38, calories: 420, caffeineMg: 70 },
  { id: 'milksha-greenmilk', brandId: 'milksha', name: '綠光牧場鮮奶茶', category: 'fresh-tea', price: 60, isRegional: false, isSeasonal: false, sugarG: 30, calories: 300, caffeineMg: 50 },
  { id: 'milksha-puremilk', brandId: 'milksha', name: '綠光鮮奶', category: 'milk', price: 70, isRegional: false, isSeasonal: false, sugarG: 18, calories: 260, caffeineMg: 0 },
  { id: 'milksha-yangzhi', brandId: 'milksha', name: '楊枝甘露', category: 'special', price: 80, isRegional: false, isSeasonal: true, sugarG: 46, calories: 320, caffeineMg: 0 },
  { id: 'milksha-tainan', brandId: 'milksha', name: '台南古早味紅茶', category: 'tea', price: 35, isRegional: true, region: 'south', regionalNote: '台南創始店周邊限定', isSeasonal: false, sugarG: 40, calories: 160, caffeineMg: 75 },
  { id: 'milksha-matcha', brandId: 'milksha', name: '抹茶歐蕾', category: 'milk', price: 75, isRegional: false, isSeasonal: false, sugarG: 32, calories: 340, caffeineMg: 45 },

  // ── 可不可熟成紅茶 ──
  { id: 'kebuke-juhua', brandId: 'kebuke', name: '熟成紅茶', category: 'tea', price: 30, isRegional: false, isSeasonal: false, sugarG: 36, calories: 150, caffeineMg: 95 },
  { id: 'kebuke-naicha', brandId: 'kebuke', name: '白玉歐蕾', category: 'milk-tea', price: 60, isRegional: false, isSeasonal: false, sugarG: 40, calories: 390, caffeineMg: 85 },
  { id: 'kebuke-hokkaido', brandId: 'kebuke', name: '北海道熟成奶茶', category: 'milk-tea', price: 65, isRegional: false, isSeasonal: false, sugarG: 44, calories: 420, caffeineMg: 85 },
  { id: 'kebuke-luteguo', brandId: 'kebuke', name: '麗春紅茶', category: 'tea', price: 35, isRegional: false, isSeasonal: false, sugarG: 35, calories: 150, caffeineMg: 90 },
  { id: 'kebuke-orange', brandId: 'kebuke', name: '柳橙熟成紅茶', category: 'fruit-tea', price: 55, isRegional: false, isSeasonal: true, sugarG: 42, calories: 200, caffeineMg: 70 },

  // ── 大苑子 ──
  { id: 'dayungs-jin', brandId: 'dayungs', name: '津輕蘋果茶', category: 'fruit-tea', price: 75, isRegional: false, isSeasonal: false, sugarG: 44, calories: 210, caffeineMg: 30 },
  { id: 'dayungs-taizhong', brandId: 'dayungs', name: '台中限定｜大甲芋頭鮮奶', category: 'milk', price: 85, isRegional: true, region: 'central', regionalNote: '台中大甲芋頭產地直送', isSeasonal: false, sugarG: 38, calories: 360, caffeineMg: 0 },
  { id: 'dayungs-lemon', brandId: 'dayungs', name: '黃金鮮檸檬', category: 'fruit-tea', price: 70, isRegional: false, isSeasonal: false, sugarG: 40, calories: 180, caffeineMg: 0 },
  { id: 'dayungs-strawberry', brandId: 'dayungs', name: '草莓鮮果飲', category: 'fruit-tea', price: 90, isRegional: false, isSeasonal: true, sugarG: 48, calories: 250, caffeineMg: 0 },
  { id: 'dayungs-tieguanyin', brandId: 'dayungs', name: '鐵觀音奶茶', category: 'milk-tea', price: 55, isRegional: false, isSeasonal: false, sugarG: 39, calories: 380, caffeineMg: 65 },

  // ── 麻古茶坊 ──
  { id: 'macu-yangzhi', brandId: 'macu', name: '楊枝甘露', category: 'special', price: 80, isRegional: false, isSeasonal: false, sugarG: 47, calories: 330, caffeineMg: 0 },
  { id: 'macu-strawberry', brandId: 'macu', name: '草莓多多', category: 'fruit-tea', price: 75, isRegional: false, isSeasonal: true, sugarG: 50, calories: 270, caffeineMg: 0 },
  { id: 'macu-fenyuan', brandId: 'macu', name: '芋頭粉圓鮮奶', category: 'milk', price: 80, isRegional: false, isSeasonal: false, sugarG: 42, calories: 400, caffeineMg: 0 },
  { id: 'macu-greentea', brandId: 'macu', name: '翡翠檸檬', category: 'fruit-tea', price: 60, isRegional: false, isSeasonal: false, sugarG: 38, calories: 170, caffeineMg: 40 },
  { id: 'macu-blackmilk', brandId: 'macu', name: '黑糖珍珠鮮奶', category: 'milk', price: 70, isRegional: false, isSeasonal: false, sugarG: 46, calories: 430, caffeineMg: 0 },

  // ── CoCo 都可 ──
  { id: 'coco-sanxiongdi', brandId: 'coco', name: '珍珠奶茶三兄弟', category: 'milk-tea', price: 55, isRegional: false, isSeasonal: false, sugarG: 45, calories: 420, caffeineMg: 80 },
  { id: 'coco-baikou', brandId: 'coco', name: '百摳鮮奶茶', category: 'fresh-tea', price: 60, isRegional: false, isSeasonal: false, sugarG: 36, calories: 360, caffeineMg: 60 },
  { id: 'coco-qingcha', brandId: 'coco', name: '清檸茶王', category: 'fruit-tea', price: 50, isRegional: false, isSeasonal: false, sugarG: 37, calories: 160, caffeineMg: 45 },
  { id: 'coco-yakult', brandId: 'coco', name: '優多綠', category: 'fruit-tea', price: 50, isRegional: false, isSeasonal: false, sugarG: 41, calories: 200, caffeineMg: 35 },
  { id: 'coco-hualian', brandId: 'coco', name: '花蓮蜜香紅茶（東部限定）', category: 'tea', price: 45, isRegional: true, region: 'east', regionalNote: '花蓮在地蜜香茶葉', isSeasonal: false, sugarG: 34, calories: 150, caffeineMg: 70 },

  // ── 茶湯會 ──
  { id: 'chatime-boba', brandId: 'chatime', name: '波霸奶茶', category: 'milk-tea', price: 55, isRegional: false, isSeasonal: false, sugarG: 46, calories: 420, caffeineMg: 85 },
  { id: 'chatime-guanyin', brandId: 'chatime', name: '觀音拿鐵', category: 'milk', price: 65, isRegional: false, isSeasonal: false, sugarG: 34, calories: 350, caffeineMg: 55 },
  { id: 'chatime-jingxuan', brandId: 'chatime', name: '輕烏龍', category: 'tea', price: 35, isRegional: false, isSeasonal: false, sugarG: 30, calories: 130, caffeineMg: 55 },
  { id: 'chatime-mango', brandId: 'chatime', name: '芒果鮮奶酪', category: 'special', price: 80, isRegional: false, isSeasonal: true, sugarG: 49, calories: 310, caffeineMg: 0 },

  // ── 得正 ──
  { id: 'dejheng-wulong', brandId: 'dejheng', name: '得正烏龍', category: 'tea', price: 30, isRegional: false, isSeasonal: false, sugarG: 30, calories: 120, caffeineMg: 60 },
  { id: 'dejheng-wulongnai', brandId: 'dejheng', name: '烏龍鮮奶', category: 'milk', price: 65, isRegional: false, isSeasonal: false, sugarG: 28, calories: 320, caffeineMg: 50 },
  { id: 'dejheng-naigai', brandId: 'dejheng', name: '熟烏龍奶蓋', category: 'special', price: 60, isRegional: false, isSeasonal: false, sugarG: 35, calories: 340, caffeineMg: 55 },
  { id: 'dejheng-grape', brandId: 'dejheng', name: '冷露葡萄', category: 'fruit-tea', price: 70, isRegional: false, isSeasonal: true, sugarG: 44, calories: 230, caffeineMg: 20 },
]
