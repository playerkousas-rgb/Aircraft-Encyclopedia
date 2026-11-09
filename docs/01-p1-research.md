# P1 研究紀錄 — 真理倉、AVIANDEX 與外部參考

> 日期：2026-11-09 · 狀態：待用戶確認設計方向，未開始施工
> 依真理倉 PLAYBOOK P1：記錄搜尋日期、來源、相同／不同、授權、未核實事項；無法查證要如實寫低。
> 本 repo 原始需求見根目錄 `README`（飛機圖鑑 brief）。

---

## 1. 真理倉（SCOUT SYSTEM 唯一入口）

來源：<https://github.com/playerkousas-rgb/readme.git>（2026-11-09 clone 讀取，HEAD `367f481`）

已讀：`README.md`、`PLAYBOOK.md`、`AGENTS.md`、`templates/repo-starter/INTAKE.md`、
`START.md`、`PREFLIGHT.md`、`skills/promoted/repo-setup/SKILL.md`、
`skills/promoted/design-review/SKILL.md`、`docs/44-bilingual-ui.md`、
`docs/12-copyright-scout-system.md`、`docs/24-similar-products.md`。

### 對本專案有直接影響的規則

| ID | 規則 | 在飛機圖鑑的落地（建議） |
|---|---|---|
| 分類 | PLAYBOOK §0 三分類：工具（stateless）／App（有資料）／系統（多層多身份） | 本站已確認：無帳號、無後台、純靜態、本機使用 → 屬**輕量靜態 App／工具類**。因此**不需要**設定層、隱藏超管、registry、審計鏈（嗰啲係系統級先要）。 |
| S 瘦身 | `dist < 5MB`、bundle `< 2MB`、單檔 `<500KB`（圖）、Git 每檔原則 `<1MB` | 相片不入 Git：用 Wikimedia Commons 外連或外部圖床；本站不打包大圖。 |
| F 防呆 | fail closed、白名單、單一真理 | 分類／欄位用白名單；查無資料顯示「資料待核實」，唔估、唔補字。 |
| A 安全 | secret 只留 server；前端假設已被攻陷 | 本站零 secret、零 API key；v1 不接即時 API（adsb.lol 只作日後擴充）。 |
| W 版權 | W1 可見標示、W8 第三方素材標來源；第三方素材**唔落自己水印** | 頁尾＋meta 落 `© SCOUT SYSTEM`；每張相逐張記作者／授權／來源連結（CREDITS）；Wikimedia 相不加 SCOUT 水印。日後如有 AI 示意圖，先至跟 W2 水印＋清楚標示「示意圖」。 |
| V 雙版號 | 檔名版號＝內文版號（meta/title/常數/頁尾） | 交付時 `APP_VERSION` 常數、`<title>`、頁尾、CHANGELOG 同步；如採單一 HTML 先跟 `_vX.Y` 檔名規則。 |
| L1–L6 雙語 | 雙閘都達標要做：體積過 S 閘＋UI 字串 ≤300 條；右上角一鍵切換顯示目標語言；`data-lang`＋`<html lang>`＋`localStorage` try/catch、key 帶 app 前綴；預設中文；螢幕一次一種語言、缺譯 fallback 中文唔空白；唔引入 i18n 套件 | 本站初步估算 UI 字串遠低於 300 條、體積可控 → **要做雙語**。key 建議 `aircraft-encyclopedia.lang`。 |
| G11 圖標 | 開工即出齊 9 個 PNG/ICO、合計 ≤260KB、`og:image` 絕對網址 | 起手階段做，唔留到最後。 |
| P1 | 研發前查相近產品＋自己現有方案，記錄差異與決策 | 本文件即 P1 紀錄；外部參考見 §3。 |
| INTAKE 第 0 步 | 一輪問晒 frontier、每條俾建議答案、fact 自己查、用戶確認先郁手；答案寫入 SCOPE | 已完成第一輪（名稱／讀者／圖片／圖卡／功能／儲存）；剩餘問題見文末「待確認」。 |
| repo-setup | 12 樣起手檔＋按形式加 13a design-review；PREFLIGHT 8 check 未過唔好 commit | 用戶確認形式與授權後先抄起手包，跑 `preflight_v1.0.mjs`。 |
| design-review | 分清「頁面 vs app 屏幕」；390/768/1440 望圖；做唔到要老實寫 | 本沙盒無真機截圖能力，屆時望圖紀錄要寫明限制，唔扮做咗。 |

**未核實／限制**：真理倉 scripts（guard/final_check 等）尚未喺本 repo 實跑；要等起手包抄入後先跑到 PREFLIGHT。

---

## 2. 相近朋友：AVIANDEX（同帳戶鳥類圖鑑）

來源：<https://github.com/playerkousas-rgb/AvianDex>（2026-11-09 clone 讀取，HEAD `60164c7`，v1.9.0）
性質：React + Vite + Tailwind + TensorFlow.js 的香港鳥類圖鑑（569 種），
「用寶可夢圖鑑的方式，讓小朋友愛上香港的鳥」。同飛機圖鑑一樣係**圖鑑＋圖卡＋學習**，
係最相近的自有方案，所以逐項對照；只借體驗與資料方法，**唔抄佢嘅設計、文字或圖片**。

### 2.1 值得借鑑（建議採用）

| AVIANDEX 做法 | 出處 | 飛機圖鑑點改用 |
|---|---|---|
| 一張卡只答三個問題，順序即版面順序：「呢隻係咩？→ 有咩特別？→ 我可唔可以見到佢？」 | `docs/CARD_CONTENT_GOALS.md` §2 | 圖卡三問改成：「**呢架係乜？→ 有咩辨認特徵？→ 下次點認得佢？**」（同 brief §4.2 完全吻合） |
| 編號永遠不變（`NO. NNNN`＝圖檔名），排序只影響畫面次序 | README、`docs/MAINTENANCE.md` | 以 **ICAO 機型代碼**（如 `A359`）做永久 ID，另加圖鑑序號；排序／篩選唔改 ID。 |
| 「寧願醜，唔可以錯」：抽唔到就印「資料待查」，文字唔經 AI 生成 | `docs/CARD_SOURCING.md` | 規格只用製造商／可信來源原文數字＋來源連結＋核實日期＋適用子型號；AI 只寫程式同排版，唔寫規格。 |
| 三類資料分清楚：權威分類／可追溯原文／編者主觀（主觀必須印聲明） | `docs/CARD_LAYOUT.md` §3 | 飛機分：①製造商/ICAO 權威 ②可追溯規格（附來源）③編者撮寫（辨認貼士、難度分級）——③要在卡上標明係編者意見。 |
| 欄位降級：缺相唔畫圓圈特寫、缺欄印「資料待查」、其餘照印，唔因缺一欄成張卡空白 | `docs/CARD_LAYOUT.md` §5.5、`CARD_FIELDS.md`「15 揀 7」 | 詳情頁逐格降級：冇相就唔顯示標註熱點；規格缺就顯示「資料未有」；欄位按完整度揀選顯示，唔砌空盒。 |
| 特寫圓圈座標 `callouts[].fx/fy` 只喺有相時先填（測試會擋） | `docs/CARD_SOURCING.md` §8 | 標註座標逐張相對該張已核實照片人手定，唔硬套同一組座標落所有機型（brief §4.2 明文要求）。 |
| 圖卡只負責吸引，深度交俾權威來源「六宮格」外連（Cornell/eBird/Xeno-canto…） | README「六宮格科研終端」 | 正合用戶要求「有連結畀資深領袖或成員查找」：每款飛機設**深度連結格**——製造商官方規格、中文/英文維基、Flightradar24 機型頁、Wikimedia Commons 圖庫、辨認指南。 |
| 中英分開資料檔；英文缺資料印 `Data pending`，唔塞中文、唔機翻 | `src/components/BirdDetailPage.tsx`、`docs/CARD_FIELDS.md` | 跟 L4/L5：英文模式缺譯 fallback 或 `Data pending`，唔可以空白、唔中英硬塞。 |
| 資料錯漏獨立清單（逐項「現況→應為→依據」） | `docs/DATA_ISSUES.md` | 本 repo 建 `docs/data-issues.md`：例如航程數字各來源唔同，要記低取捨同依據，唔靜靜揀個靚數字。 |
| 大圖唔入 Git（R2 外置）、單一設定入口 `src/config.ts`、版號常數 | README、`src/config.ts` | 相片外連 Wikimedia；本站設定（版本、分類清單）集中一處（F1 單一真理）。 |
| 語言狀態：`localStorage` try/catch、預設中文、切換改 `<html lang>` | `src/App.tsx` | 直接跟 L3 形狀做（key 改本站前綴）。 |

### 2.2 唔採用（同飛機圖鑑定位唔合 / 違反已確認方向）

| AVIANDEX 做法 | 唔採用原因 |
|---|---|
| 紅色寶可夢圖鑑機造型、未發現剪影收藏、「解鎖」玩法 | 飛機圖鑑係開放學習：所有機型一入嚟就睇到。剪影只適合用喺**小測驗**（睇圖估機型），唔用嚟遮住圖鑑內容。會唔會加「已學識」本機標記，另請用戶決定（見待確認）。 |
| AI 插畫／AI 一次過生成成張卡文字 | 用戶已揀**真實照片＋標註**；AI 卡文字會錯字，AVIANDEX 自己亦列為風險。 |
| React+Vite+Tailwind+TensorFlow.js、BirdNET 聲辨、`/api` 後端、R2、eBird API key | 違反瘦身同「無後台、免費輕量」已確認方向；飛機 v1 唔做相片/聲音辨識。 |
| 一嚟就 569 種 | 用戶明言「慢慢做、先把資料收全」：先種子機型跑通完整體驗，逐款核實先上架，未核實唔扮完成。 |
| 生態價值 5 星主觀評分 | 飛機如要分級（例如「辨認難度」）必須標明編者主觀；v1 是否需要，設計提案再定，唔照搬評分卡。 |
| eBird/Clements 分類權威 | 飛機權威改用：製造商官方資料（規格）＋ ICAO 機型代碼（ID）＋ 維基（背景/中文名，逐項核實）。 |

**AVIANDEX 本身未完成的地方（借鑑時要知）**：真雀相目前只有示範卡、英語資料仍待抽取、
部分卡資料留空。教訓係：**唔好宣稱資料齊**，覆蓋率要逐款老實標示。

---

## 3. 外部參考（brief §2，2026-11-09 已查）

| 參考 | 借鑑 | 唔採用 |
|---|---|---|
| Who That Plane?!（whothatplane.com） | 一開就見到飛機圖、細分類標籤（類型/用途/狀態）、搜尋篩選、並排比較、每日估機型測驗嘅趣味 | 5,000+ 數量行先、即時 ADS-B 雷達（brief 明言 v1 唔做）、英文為主的密集規格寫法 |
| PlaneFYI 機型比較（如 787 vs A350） | 兩款並排規格表＋白話結論（邊款大啲/遠啲） | 只堆數字：我哋比較要**先講睇得到的外觀差別**，再落規格 |
| The Aviation Wiki | 按機型、製造商、年代分類的組織方式 | 直接搬資料/分類文字（授權要逐項查） |
| Flightradar24 A350 機型頁 | 機型介紹寫法、子型號並列規格表（如 -900 vs -1000 分開列） | 將成個系列數字混為一談（brief 明文禁止） |
| Airbus A350 官方資料 | 規格核實的最高優先來源（長/翼展/航程/座位連適用型號） | —（官方數字都要記核實日期，官方都會改版） |
| 中文維基 A350 | 中文名稱與背景參考 | 文字/圖片授權逐項檢查，唔假設可自由複製 |

**版權總原則**（brief §6＋真理倉 W8）：規格記來源連結＋適用型號＋核實日期；
圖片逐張記作者/來源/授權/標示；參考網站圖片一律唔搬。

---

## 4. 待確認（INTAKE 未答完的 frontier）

以下係開工前最後一輪問題，喺對話中用選項問用戶：

1. **交付形式**（INTAKE Q1）：建議純靜態多檔（無框架、無 build）／單一 HTML／跟 AVIANDEX 用 React+Vite。
2. **授權**（INTAKE Q6，真理倉要求一定要用戶自己揀，AGENT 唔准代揀）：MIT／Apache-2.0／私人保留／其他。
   注意：程式授權同相片授權分開——Wikimedia 相片跟返各自 CC 條款逐張標示，唔受本站授權影響。
3. **收藏感要幾多**：只借 AVIANDEX 的編號/三問/深度連結（輕借鑑）／加本機「已學識」標記／完全唔要收集元素。
4. **首批節奏**：先 12 款完整種子跑通全流程再慢慢擴充／先收大清單資料核實晒先出卡。
5. **圖卡形態**：v1 只做網頁互動圖卡／同時做可列印的滿版圖卡圖（AVIANDEX 式 1200×1600）。

其餘 INTAKE 已定：Q2 有 UI（要 design-review）、Q3 無登入、Q4 無後台、Q5 唔係 Gemini/Canvas app、
Q7 一句定位沿用 brief：「一眼見到飛機，用一張圖認識飛機，再透過比較和小測驗學識辨認。」
