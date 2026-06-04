# hesha — 需求規格文件

> 版本：v0.1　最後更新：2026-06-04

---

## 一、專案概述

**hesha**（喝啥？）是一款個人飲料消費追蹤與推薦 app，功能涵蓋：

- 記錄每次喝過的飲料
- 查詢附近手搖飲料店
- 瀏覽連鎖品牌菜單（含營養資訊）
- 依個人偏好與歷史紀錄產生 AI 推薦

### 技術棧

| 層級 | 技術 |
|------|------|
| 前端 | Vue 3 + Vite + TypeScript |
| 狀態管理 | Pinia |
| 路由 | Vue Router 4 |
| 後端 / 資料庫 | Supabase（PostgreSQL + Auth + Storage） |
| 部署 | Vercel |

---

## 二、使用者驗證

- 使用 **Supabase Auth**，初期支援 Email / Password 登入；可後補 Google OAuth。
- 除「附近店家」可匿名瀏覽外，所有功能都需登入。
- 所有個人資料表一律啟用 **Row Level Security（RLS）**，以 `user_id = auth.uid()` 過濾。
- 登入後支援多裝置同步。

---

## 三、功能需求

### ① 喝過紀錄

依賴：無（最先開發）

#### 第一輪（MVP）

目標：跑通最薄流程。

- 新增表單：飲料名稱（必填）、店家名稱（必填）
- 儲存至 Supabase `drink_records` 表
- 列表頁顯示所有紀錄（依 `last_drank_at` 倒序）

#### 第二輪（逐步擴充）

依序加入以下欄位，每次只加一個、確認可運作再繼續：

1. 星等（1–5 顆星）
2. 心得文字
3. 日期（預設今天；顯示為「最後一次喝：YYYY-MM-DD」）
4. 照片（上傳至 Supabase Storage，儲存 URL）
5. 編輯 / 刪除功能

---

### ② 附近店家

依賴：Phase 0 基礎建設

- 點擊「定位」後呼叫瀏覽器 **Geolocation API** 取得使用者座標。
- 帶入座標呼叫 **Google Places API**（Nearby Search），關鍵字：飲料、手搖、珍奶。
- 列出搜尋結果，每筆顯示：
  - 店名
  - 距離（公尺）
  - 目前營業狀態
- 每筆附快捷連結：
  - Google Maps 導航連結
  - foodpanda 搜尋連結
  - Uber Eats 搜尋連結

> Google Places API Key 透過環境變數管理，不寫死在程式碼中。

---

### ③ 菜單資料

依賴：Phase 0 基礎建設

- **範圍**：10–15 家台灣常見連鎖手搖品牌（由使用者決定清單）。
- **資料欄位**：品牌、品項名稱、價格、是否區域限定、是否季節限定、糖(g)、熱量(kcal)、咖啡因(mg)。
- **開發流程**：
  1. 設計資料表結構（`brands` + `menu_items`）
  2. 手動建立第一家品牌的完整菜單，作為樣板驗證流程
  3. 補齊其餘品牌資料
  4. 前端瀏覽查詢頁 + 品牌篩選 + 品項搜尋

---

### ④ AI 推薦

依賴：功能 ① 和 ③ 都完成後才開始

**流程：**

1. **偏好設定頁**：使用者勾選喜好（茶感 / 奶感 / 嘗鮮 / 低糖 / 低咖啡因等）
2. 組合 prompt，帶入：
   - 使用者偏好
   - 近期喝過紀錄（最近 10 筆）
   - 可用菜單品項
   - 使用者選擇的情境
3. 呼叫 **LLM API**（模型待定，預留 Claude / OpenAI 介面）
4. 顯示推薦結果（品牌、品項名稱、推薦理由）
5. 可將推薦結果收藏至 `saved_recommendations`

**情境篩選選項：**
- 天氣很熱
- 吃完油膩想解膩
- 想提神
- 隨便推（預設）

---

### ⑤ 消費金額分析

依賴：功能 ①

- `drink_records` 表新增 `price`（金額）欄位，新增紀錄時可選填。
- 統計頁：
  - 每月總花費
  - 每月筆數
  - 平均每杯費用
- 簡單長條圖或折線圖（圖表套件待討論，候選：Chart.js、echarts）

---

### ⑥ 糖分 / 熱量 / 咖啡因統計

依賴：功能 ③

- 若紀錄有關聯到 `menu_items`（`menu_item_id` 非空），在紀錄詳情頁顯示該品項的營養資訊。
- 統計頁：
  - 每月糖分攝取總量（g）
  - 每月熱量攝取總量（kcal）
  - 每月咖啡因攝取總量（mg）
- 可與功能 ⑤ 統計頁合併為同一「數據總覽」頁。

---

## 四、資料庫設計（Supabase）

### `drink_records`（喝過紀錄）

| 欄位 | 型別 | 約束 | 說明 |
|------|------|------|------|
| id | uuid | PK, default gen_random_uuid() | |
| user_id | uuid | FK → auth.users, NOT NULL | RLS 依此欄位過濾 |
| drink_name | text | NOT NULL | 飲料名稱 |
| store_name | text | NOT NULL | 店家名稱 |
| rating | smallint | CHECK (1–5) | 星等，nullable |
| notes | text | | 心得，nullable |
| last_drank_at | timestamptz | NOT NULL, default now() | 最後一次喝的時間 |
| photo_url | text | | Supabase Storage URL，nullable |
| price | numeric(8,0) | | 金額（功能 ⑤），nullable |
| menu_item_id | uuid | FK → menu_items | 關聯菜單品項（功能 ⑥），nullable |
| created_at | timestamptz | NOT NULL, default now() | |
| updated_at | timestamptz | NOT NULL, default now() | |

RLS 原則：使用者只能 SELECT / INSERT / UPDATE / DELETE 自己的紀錄（`user_id = auth.uid()`）。

---

### `brands`（飲料品牌）

| 欄位 | 型別 | 約束 | 說明 |
|------|------|------|------|
| id | uuid | PK | |
| name | text | NOT NULL, UNIQUE | 品牌名稱 |
| logo_url | text | | nullable |
| created_at | timestamptz | NOT NULL, default now() | |

> 公開資料，不需 RLS（所有登入使用者均可讀取）。

---

### `menu_items`（菜單品項）

| 欄位 | 型別 | 約束 | 說明 |
|------|------|------|------|
| id | uuid | PK | |
| brand_id | uuid | FK → brands, NOT NULL | |
| name | text | NOT NULL | 品項名稱 |
| price | numeric(6,0) | NOT NULL | 售價（元） |
| is_regional | boolean | NOT NULL, default false | 區域限定 |
| is_seasonal | boolean | NOT NULL, default false | 季節限定 |
| sugar_g | numeric(5,1) | | 含糖量(g)，nullable |
| calories | numeric(6,1) | | 熱量(kcal)，nullable |
| caffeine_mg | numeric(6,1) | | 咖啡因(mg)，nullable |
| created_at | timestamptz | NOT NULL, default now() | |

> 公開資料，不需 RLS。

---

### `user_preferences`（個人偏好，功能 ④）

| 欄位 | 型別 | 約束 | 說明 |
|------|------|------|------|
| id | uuid | PK | |
| user_id | uuid | FK → auth.users, UNIQUE | 每人只有一筆 |
| preference_types | text[] | NOT NULL, default '{}' | 如 `['tea','low_sugar']` |
| updated_at | timestamptz | NOT NULL, default now() | |

---

### `saved_recommendations`（收藏的 AI 推薦，功能 ④）

| 欄位 | 型別 | 約束 | 說明 |
|------|------|------|------|
| id | uuid | PK | |
| user_id | uuid | FK → auth.users, NOT NULL | |
| recommendation_data | jsonb | NOT NULL | LLM 回傳的推薦結果 |
| context | text | | 情境文字，nullable |
| created_at | timestamptz | NOT NULL, default now() | |

---

## 五、前端路由規劃

```
/                    首頁 / Dashboard（登入後）
/login               登入頁
/register            註冊頁

/records             喝過紀錄列表
/records/new         新增紀錄
/records/:id         紀錄詳情（含編輯）

/nearby              附近店家

/menu                菜單瀏覽（品牌列表）
/menu/:brandId       品牌菜單（品項列表）

/stats               數據總覽（消費 + 營養統計）

/recommend           AI 推薦
/settings            個人偏好設定
```

---

## 六、開發里程碑

| Phase | 項目 | 依賴 | 對應功能 |
|-------|------|------|----------|
| 0 | 基礎建設：Supabase 設置、Auth 流程、統一 axios instance / Supabase client、路由骨架、共用型別 | — | — |
| 1a | 喝過紀錄 MVP（飲料名 + 店家 + 儲存 + 列表） | Phase 0 | ① |
| 1b | 喝過紀錄完整版（星等、心得、日期、照片、編輯/刪除） | Phase 1a | ① |
| 2 | 附近店家（Geolocation + Google Places API） | Phase 0 | ② |
| 3 | 菜單資料（資料結構 + 第一家品牌樣板 + 查詢頁） | Phase 0 | ③ |
| 4 | 消費金額分析（price 欄位 + 統計頁 + 圖表） | Phase 1a | ⑤ |
| 5 | 糖分/熱量/咖啡因統計 | Phase 3 | ⑥ |
| 6 | AI 推薦（偏好設定 + LLM 串接 + 收藏） | Phase 1a + Phase 3 | ④ |

Phase 0 → 1a → 1b 需依序進行；Phase 2、3 可與 Phase 1b 並行。

---

## 七、待決事項

| 項目 | 說明 |
|------|------|
| 圖表套件 | 功能 ⑤/⑥ 需要圖表，候選：Chart.js、echarts，待確認後加入相依 |
| LLM 選擇 | 功能 ④ 的 LLM 供應商（Claude API / OpenAI），預留抽象介面 |
| 連鎖品牌清單 | 功能 ③ 的 10–15 家品牌由使用者確認 |
| Google Places API | 費用與用量限制需確認，Key 以環境變數管理 |
| 外送連結格式 | foodpanda / Uber Eats 搜尋連結的 URL 格式需實測 |
