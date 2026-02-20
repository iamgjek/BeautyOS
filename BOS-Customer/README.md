# BOS-Customer（BeautyOS 客戶預約系統）

名留／BeautyOS 客戶端會員系統，供消費者登入、預約服務、查詢預約紀錄、使用優惠券與票券、管理個人資料與消費紀錄等。

---

## 專案目的

- **客戶預約入口**：提供單一入口讓客戶選擇門市、設計師、服務項目與預約時段，完成預約後由設計師端（BOS-Designer）審核與排程。
- **會員服務整合**：登入後可查看預約紀錄、優惠券、票券、消費紀錄、獎金、儲值與個人設定，支援 PWA 安裝至手機桌面。
- **與設計師端協作**：與 BOS-Designer（設計師／店務後台）搭配，預約資料同步至後台供門市與設計師管理。

---

## 主要用途與功能

| 功能模組 | 說明 |
|----------|------|
| **登入** | 手機號碼 + 驗證碼登入，登入後導向會員首頁 |
| **預約** | 選擇門市 → 設計師 → 服務項目 → 預約日期／時段 → 確認送出；預約單送設計師端審核 |
| **預約紀錄** | 查詢個人預約與訂單狀態 |
| **優惠券** | 查看與使用可用優惠券 |
| **票券** | 票券列表與使用狀態 |
| **個人資料** | 會員資料檢視與編輯 |
| **設定** | 帳號與偏好設定 |
| **消費** | 消費紀錄查詢 |
| **獎金／儲值** | 客戶獎金與儲值相關功能 |

---

## 操作介紹

### 登入

1. 開啟系統後，首頁為「會員登入」。
2. 輸入**手機號碼**，點擊「取得驗證碼」，再輸入**驗證碼**後點擊「登入」。
3. 登入成功後進入會員首頁，可進行預約、查看紀錄等操作。

### 預約流程

1. 進入「預約」：確認或選擇**門市**（顯示門市名稱與地址）。
2. **選擇設計師**：從門市設計師清單中選擇一位（必填）。
3. **選擇服務**：勾選欲預約的服務項目。
4. **選擇日期／時段**：依行事曆與可預約時段選擇，完成後進入確認頁。
5. **確認送出**：檢查預約內容後送出；預約單會送至設計師端，由門市／設計師審核。

### 會員功能

- **預約紀錄**：可查看每筆預約的狀態（待審核、預約成功、已完成等）。
- **優惠券／票券**：在對應頁面查看可用張數與使用方式。
- **個人資料與設定**：可修改個人資訊與帳號相關設定。

---

## 技術與環境

- **框架**：Nuxt 2（Vue 2）、Vuex、Vue Router  
- **API**：透過 `@/plugins/api.js` 與後端溝通；SSR 使用 `$api.xxx()`，SPA 使用 `this.api.xxx()`（可帶入需回傳的 key，如 `'name, cellphone, gender'`）  
- **樣式**：Tailwind CSS、Font Awesome（Pro）、v-calendar、VeeValidate  
- **其他**：PWA（可安裝至手機）、cookie-universal-nuxt（登入 token 等）、SweetAlert2、AOS 動畫  

---

## 專案起手式

### 1. 安裝依賴

```bash
npm install
```

### 2. 開發模式（熱重載）

```bash
npm run dev
```

- 預設為 **http://localhost:3000**（`nuxt --port 3000`）。

### 3. 打包／產出靜態站

```bash
npm run generate
```

- 使用 `NODE_ENV=prod` 進行 `nuxt generate`，產出靜態檔案供部署。

### 4. 生產環境運行（需先 build）

```bash
npm run build
npm run start
```

- 先 `nuxt build` 再 `nuxt start`，用於已建置後的 SSR 運行。

---

## 開發參考

### API 使用方式

```javascript
// SSR asyncData
$api.xxx();

// SPA mounted — 可帶入需回傳的 key，例：'name, cellphone, gender'
this.api.xxx();
```

### Font Awesome 引入

在 `nuxt.config.js` 的 `fontawesome.proIcons` 中設定 solid / regular / light 圖示後，於模板使用：

```html
<fa icon="fa-regular fa-user" />
```

### 全域 Loading

```javascript
// SSR
store.dispatch("loading/isLoading", true);
store.dispatch("loading/isLoading", false);

// SPA
this.$store.dispatch("loading/isLoading", true);
this.$store.dispatch("loading/isLoading", false);
```

### 小範圍 Loading

```javascript
// SSR
store.dispatch("itemLoading/isLoading", true);
store.dispatch("itemLoading/isLoading", false);

// SPA
this.$store.dispatch("itemLoading/isLoading", true);
this.$store.dispatch("itemLoading/isLoading", false);
```

### Cookies（登入 token 等）

```javascript
// SSR
async asyncData({ app }) {
  const token = app.$cookies.get('customeraccesstoken');
}

// SPA
this.$cookieMethods.getToken();
this.$cookieMethods.setToken('xxx');
this.$cookieMethods.removeToken();
```

---

## 注意事項

- **Node 版本**：建議使用 Node 14～18；若使用 Node 20+，可能出現 engine 警告，若遇建置問題可改用建議版本。
- 開發時請勿將敏感設定（API 網址、金鑰等）提交版控；可善用 `.env` 與 `@nuxtjs/dotenv`（依 `process.env.NODE_ENV` 讀取 `.env.dev` / `.env.prod` 等）。
- 與 BOS-Designer 共用後端 API 時，需確認 CORS、cookie 與 API base URL 設定正確。
