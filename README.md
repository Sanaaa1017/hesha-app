# 喝啥 Hesha 🧋

你的飲料夥伴——彙整台灣手搖菜單、依位置找店家、記錄喝過的每一杯，還能依口味與情境做 AI 推薦。

> 目前以**前端假資料 + localStorage** 實作，尚未接後端與資料庫；爬蟲彙整真實菜單為後續規劃。

## 功能

| 功能 | 說明 |
|------|------|
| 🧋 菜單瀏覽 | 各品牌品項、**區域限定／季節限定**標示、糖分／熱量／咖啡因，可搜尋與依區域篩選 |
| 📍 附近店家 | 瀏覽器定位 + 距離排序，附 Google Maps、foodpanda、Uber Eats 連結 |
| 📝 喝過紀錄 | 星等、心得、照片、日期，支援編輯／刪除，資料存於 localStorage |
| 📊 數據總覽 | 每月消費（總額／杯數／平均）與營養攝取（糖／熱量／咖啡因）統計圖表 |
| ✨ AI 推薦 | 規則式推薦引擎，依口味偏好、當下情境（天熱／解膩／提神）與歷史紀錄推薦，可收藏 |

## 技術棧

Vue 3（`<script setup>`）、Vite、TypeScript（strict）、Pinia、Vue Router、Vitest + Vue Test Utils、ESLint + Prettier。套件管理使用 **pnpm**。

## 開發指令

```sh
pnpm install      # 安裝相依
pnpm dev          # 啟動開發伺服器
pnpm build        # 建構正式版（含型別檢查）
pnpm test         # 執行測試
pnpm lint         # 執行 lint
```

> commit 前請通過：`pnpm lint && pnpm test`

## 目錄結構

```
src/
  assets/        靜態資源與設計系統 CSS
  components/    可重用 UI 元件
  views/         路由對應頁面
  composables/   組合式函式（如 useGeolocation）
  stores/        Pinia stores
  services/      資料存取層（localStorage／假資料，未來可替換為後端）
  data/          假資料（品牌、菜單、店家）
  types/         共用型別
  utils/         純函式工具（篩選、統計、推薦引擎等）
```

開發規範詳見 [`.claude/CLAUDE.md`](.claude/CLAUDE.md)，需求與規格見 [`spec/`](spec/)。
