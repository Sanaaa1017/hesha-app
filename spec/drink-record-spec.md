# 喝過紀錄 — 功能規劃 Spec

> 對應需求：[`requirements.md`](requirements.md) 功能 ①、開發里程碑 Phase 1a / 1b
> 開發規範依 [`.claude/CLAUDE.md`](../.claude/CLAUDE.md)

---

## 一、目標與範圍

讓使用者記錄喝過的飲料並在列表查看。分兩階段：

- **Phase 1a（MVP）**：飲料名稱 + 店家名稱 → 儲存 → 列表顯示。先跑通最薄流程。
- **Phase 1b（完整版）**：逐項加入星等、心得、日期、照片、編輯／刪除。

本 spec 涵蓋 1a 與 1b；1b 的各欄位需「一次加一個、確認可運作再繼續」。

### 前置依賴（Phase 0，非本功能範圍但需先就位）

- Supabase 專案與 `drink_records` 資料表（含 RLS）
- Supabase client 單例（`src/lib/supabase.ts`）
- Auth 登入流程與 `useAuthStore`（取得 `user_id`）
- 路由骨架與 navigation guard

---

## 二、資料模型

對應 Supabase `drink_records` 表（schema 見 requirements.md 第四節）。

### TypeScript 型別（`src/types/drinkRecord.ts`）

```ts
// 資料庫完整列
export interface DrinkRecord {
  id: string
  userId: string
  drinkName: string
  storeName: string
  rating: number | null        // 1–5
  notes: string | null
  lastDrankAt: string          // ISO timestamp
  photoUrl: string | null
  price: number | null         // 功能⑤，本階段不填
  menuItemId: string | null    // 功能⑥，本階段不填
  createdAt: string
  updatedAt: string
}

// 新增時的輸入（1a 只用前兩欄）
export interface DrinkRecordInput {
  drinkName: string
  storeName: string
  rating?: number | null
  notes?: string | null
  lastDrankAt?: string
  photoUrl?: string | null
}
```

> DB 欄位為 snake_case，前端型別用 camelCase；於 service 層做轉換（或用 Supabase 的 select 別名）。`user_id` 不放進 input，由 service 層帶入當前登入者。

---

## 三、Service 層（`src/services/drinkRecords.ts`）

所有 Supabase 呼叫集中於此，元件與 store 不得直接碰 client。

| 函式 | 說明 | 階段 |
|------|------|------|
| `getAll()` | 取當前使用者所有紀錄，依 `last_drank_at` 倒序 | 1a |
| `create(input: DrinkRecordInput)` | 新增一筆，`user_id` 由 `auth.uid()` 帶入 | 1a |
| `getById(id: string)` | 取單筆（詳情頁用） | 1b |
| `update(id, input)` | 更新一筆 | 1b |
| `remove(id: string)` | 刪除一筆 | 1b |
| `uploadPhoto(file: File)` | 上傳至 Supabase Storage，回傳 URL | 1b |

- 回傳值皆標註明確型別（`DrinkRecord` / `DrinkRecord[]`）。
- 錯誤統一處理：Supabase error 轉成可預期的錯誤型別往上拋。
- 依 RLS，查詢/寫入自動限定在當前使用者，毋需手動加 `where user_id`（但 `create` 仍須帶 `user_id`）。

---

## 四、狀態管理（`src/stores/drinkRecords.ts`）

setup store 寫法：

```ts
export const useDrinkRecordsStore = defineStore('drinkRecords', () => {
  const records = ref<DrinkRecord[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRecords() { /* 呼叫 service.getAll */ }
  async function addRecord(input: DrinkRecordInput) { /* service.create + 更新 records */ }
  // 1b：editRecord、deleteRecord

  return { records, isLoading, error, fetchRecords, addRecord }
})
```

- state 只在 action 內修改。
- 列表資料屬跨頁共用（列表頁、詳情頁），放 store；表單區域狀態用元件內 `ref`。

---

## 五、路由

對應 requirements.md 第五節：

| 路徑 | 頁面元件 | 階段 | meta |
|------|----------|------|------|
| `/records` | `DrinkRecordListView.vue` | 1a | `requiresAuth: true` |
| `/records/new` | `DrinkRecordCreateView.vue` | 1a | `requiresAuth: true` |
| `/records/:id` | `DrinkRecordDetailView.vue`（含編輯） | 1b | `requiresAuth: true` |

頁面元件一律 lazy import。

---

## 六、頁面與元件

### Views（`src/views/`）

- **`DrinkRecordListView.vue`**（1a）
  掛載時 `fetchRecords()`；顯示列表、loading、空狀態；提供「新增」按鈕導向 `/records/new`。
- **`DrinkRecordCreateView.vue`**（1a）
  承載新增表單；送出成功後導回 `/records`。
- **`DrinkRecordDetailView.vue`**（1b）
  顯示單筆詳情，可切換編輯模式、刪除。

### Components（`src/components/`，純 UI，不碰 store/service）

- **`DrinkRecordCard.vue`**（1a）
  Props：`record: DrinkRecord`。顯示飲料名、店家、（1b 後）星等／日期／照片縮圖。
- **`DrinkRecordForm.vue`**（1a，1b 擴充）
  `defineProps<{ modelValue: DrinkRecordInput }>()` + `defineEmits<{ submit: [DrinkRecordInput] }>()`。
  1a：飲料名、店家兩個必填欄位 + 驗證。
  1b：依序加入星等（`StarRating` 元件）、心得、日期、照片上傳。
- **`StarRating.vue`**（1b）
  Props：`modelValue: number`；emit `update:modelValue`。可重用於顯示與輸入。

> UI 採 Element Plus（`el-form` / `el-input` / `el-button` / `el-upload` 等）。

---

## 七、開發步驟（建議順序）

**Phase 1a — MVP**

1. 建立型別 `src/types/drinkRecord.ts`
2. 建立 service `getAll` / `create`
3. 建立 store `fetchRecords` / `addRecord`
4. 建立 `DrinkRecordForm`（兩欄位）、`DrinkRecordCard`
5. 建立 `DrinkRecordListView`、`DrinkRecordCreateView` 並掛上路由
6. 串接驗證：登入 → 新增 → 列表看得到

**Phase 1b — 逐項擴充（每項獨立完成並驗證）**

7. 星等（DB rating 已存在 → `StarRating` + form + card 顯示）
8. 心得 notes
9. 日期 lastDrankAt（預設今天，顯示「最後一次喝」）
10. 照片（`uploadPhoto` + Storage bucket + `el-upload`）
11. 編輯／刪除（`getById` / `update` / `remove` + 詳情頁）

---

## 八、測試

每個元件與 composable 附對應測試（`*.spec.ts` 或同層 `__tests__/`），針對行為而非實作：

- `DrinkRecordForm`：必填驗證、送出 emit 正確 payload
- `DrinkRecordCard`：依 props 正確渲染
- store：`addRecord` 後 `records` 有更新（mock service）
- service：mock Supabase client，驗證查詢參數與排序

---

## 九、待確認

| 項目 | 說明 |
|------|------|
| camelCase 轉換策略 | service 層手動 map，或 Supabase select 別名，二擇一 |
| 照片 Storage bucket | bucket 名稱、public/private、檔名規則（建議 `user_id/uuid`） |
| 日期欄位 UI | 用 `el-date-picker` 或僅日期；`last_drank_at` 是否允許未來時間 |
| 空狀態與錯誤 UI | 列表空白、載入失敗的呈現方式 |
