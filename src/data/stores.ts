import type { Coords, DrinkStore } from '@/types/store'

/** 示範用的預設位置（台北 101 周邊），定位失敗時的退路 */
export const DEMO_LOCATION: Coords = { lat: 25.033, lng: 121.5654 }

/**
 * 假店家資料，座標散布於台北市。
 * 距離由使用者實際定位即時計算；定位失敗時改用 DEMO_LOCATION。
 */
export const stores: DrinkStore[] = [
  { id: 's1', name: '五十嵐 信義店', brandId: 'wushilan', lat: 25.034, lng: 121.567, address: '台北市信義區松壽路 11 號', openHour: 10, closeHour: 22 },
  { id: 's2', name: '麻古茶坊 信義威秀店', brandId: 'macu', lat: 25.0355, lng: 121.5675, address: '台北市信義區松壽路 18 號', openHour: 11, closeHour: 22 },
  { id: 's3', name: '迷客夏 市府店', brandId: 'milksha', lat: 25.041, lng: 121.565, address: '台北市信義區忠孝東路五段 8 號', openHour: 10, closeHour: 21 },
  { id: 's4', name: '可不可熟成紅茶 國父紀念館店', brandId: 'kebuke', lat: 25.041, lng: 121.56, address: '台北市信義區光復南路 100 號', openHour: 11, closeHour: 22 },
  { id: 's5', name: '得正 忠孝復興店', brandId: 'dejheng', lat: 25.0415, lng: 121.553, address: '台北市大安區忠孝東路四段 45 號', openHour: 11, closeHour: 21 },
  { id: 's6', name: '大苑子 大安店', brandId: 'dayungs', lat: 25.0265, lng: 121.543, address: '台北市大安區信義路四段 1 號', openHour: 10, closeHour: 22 },
  { id: 's7', name: '五十嵐 大安店', brandId: 'wushilan', lat: 25.027, lng: 121.544, address: '台北市大安區大安路一段 50 號', openHour: 10, closeHour: 22 },
  { id: 's8', name: 'CoCo 都可 永春店', brandId: 'coco', lat: 25.031, lng: 121.576, address: '台北市信義區忠孝東路五段 790 號', openHour: 10, closeHour: 22 },
  { id: 's9', name: '茶湯會 松山店', brandId: 'chatime', lat: 25.05, lng: 121.578, address: '台北市松山區八德路四段 10 號', openHour: 11, closeHour: 21 },
  { id: 's10', name: '阿姨手搖飲（巷口店）', brandId: null, lat: 25.0325, lng: 121.5645, address: '台北市信義區市府路 1 號', openHour: 9, closeHour: 18 },
  { id: 's11', name: '清心福全 信義店', brandId: null, lat: 25.0375, lng: 121.5705, address: '台北市信義區永吉路 30 號', openHour: 10, closeHour: 23 },
  { id: 's12', name: '迷客夏 松仁店', brandId: 'milksha', lat: 25.036, lng: 121.5685, address: '台北市信義區松仁路 28 號', openHour: 10, closeHour: 21 },
]
