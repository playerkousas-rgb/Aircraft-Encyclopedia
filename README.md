# ✈️ 飛機圖鑑｜Aircraft Encyclopedia

> **一句話**：一眼見到飛機，用一張圖認識飛機，再透過比較和小測驗學識辨認。
> 類型：輕量靜態 App（無帳號、無後台）· 技術棧：純靜態多檔（HTML/CSS/原生 JS＋JSON）· 授權：MIT
> 原始需求 brief 保留喺根目錄 `README` 檔；本檔係 5 分鐘入口。

更新日期：2026-11-09 · 版本：v0.11 · 負責：playerkousas-rgb

---

## 5 分鐘

| 我想… | 去 |
|---|---|
| 即刻開嚟睇 | 開 `web/index.html`（或用靜態伺服器開 `web/` 目錄） |
| 知規矩 | [AGENTS.md](AGENTS.md) · [SCOPE.md](SCOPE.md) · [GLOSSARY.md](GLOSSARY.md) |
| 睇研究同設計 | [docs/01-p1-research.md](docs/01-p1-research.md) · [docs/02-design-proposal.md](docs/02-design-proposal.md) |
| 睇機型大清單/核實進度 | [docs/03-fleet-master-list.md](docs/03-fleet-master-list.md) · `web/data/aircraft-inventory.json` |
| 睇童軍章規點定第一批 | [docs/06-scout-badge-aircraft.md](docs/06-scout-badge-aircraft.md) |
| 加/核實一款飛機 | [docs/04-data-schema-and-verification.md](docs/04-data-schema-and-verification.md) |
| 交付前檢查 | `node scripts/preflight_v1.0.mjs . --json` ＋ `node scripts/guard.mjs` |
| 改版紀錄 | [CHANGELOG.md](CHANGELOG.md) · [CONTRIBUTING.md](CONTRIBUTING.md) |

## 呢個 repo 而家係邊個階段？

**v0.11**：第八批新增 20 款中國國產機型（MA60、運-12、AG600 鯤龍、運-20 鯤鵬、運-9、空警-500、殲-11、殲-15、殲-16、JF-17 梟龍、殲轟-7 飛豹、殲-7、殲-35、直-10、直-19、直-20、L-15／教-10、K-8、初教-6、翼龍 II），總數 145 款全數完成八項核實並出圖卡。
**v0.10**：第七批新增 30 款世界常見機型（不論客機、貨機、直升機、戰機：A319-100、A321-200、737-700、767-300ER、A220-100、ERJ 145、CRJ700、ATR 42-600、747-400F、737-800BCF、S-76、AW109、Bell 412、Bell 429、S-92、Mi-8/17、飆風、JAS 39、MiG-29、殲-10、A-10、B-52、P-8、KC-390、Phenom 300、挑戰者 350、獎狀緯度、獵鷹 2000、SR22、DA40），總數 125 款全數完成八項核實並出圖卡。
**v0.8**：第五批新增 12 款今日常見／香港常見機型（A350-1000、A321neo、737 MAX 8、787-10、A330-900、A220-300、C919、E195-E2、H125、H145、G650、Global 7500），總數 83 款全數完成八項核實並出圖卡。
**v0.7**：按用戶定案「先收大清單、逐款核實晒先出圖卡」——71 款機型已全數完成八項核實並出圖卡（初級／中級／高級航空活動章各 18 款 ＋ 其餘 17 款），
每張卡有授權相片連標註、WEFT 辨認特徵、逐項附來源的規格（貨機／軍用運輸機加「載重」欄）同特徵標籤（定翼／旋翼、引擎數、廣窄體等）；
比較、小測驗同考試模式覆蓋全部圖卡。本站轉入維護期，只作修訂同圖片維護。

## 呢個 repo 唔係乜

- 唔係航班追蹤器（無即時地圖/adsb.lol，第一版唔做）
- 唔係規格數字庫（數字要有來源、子型號同核實日期先收）
- 詳細界線：[SCOPE.md](SCOPE.md) · [docs/out-of-scope/](docs/out-of-scope/)

## 目錄

```
README             原始需求 brief（用戶原文，保留）
README.md          本入口
AGENTS.md          Agent 開工順序/邊界
SCOPE.md           做乜/唔做乜＋已確認決定
GLOSSARY.md        共用語言
CONTRIBUTING.md    點提 issue/PR
CHANGELOG.md       改版紀錄
LICENSE            MIT
CREDITS.md         第三方素材來源（W8）
web/               網站（資料收集版）：index.html＋styles.css＋app.js
web/data/          機型總清單 JSON（單一真理）
web/icons/         G11 站台圖標 9 檔
docs/              研究、設計、清單、核實流程（NN-kebab-case.md）
scripts/           真理倉檢查 scripts
skills/            repo-setup / design-review 等（見 skills/CATALOG.md）
.github/workflows/ guard CI
```

## 驗收（交付前）

```
[ ] 五大通用鐵律 S/F/A/W/V（見真理倉 PLAYBOOK）
[ ] P1 研究已記錄（docs/01），未核實項老實列出
[ ] 無真 key、無 .env、無大檔入 Git；相片唔入 Git
[ ] node scripts/preflight_v1.0.mjs . --json -> ok: true
```

---

© SCOUT SYSTEM · COPYRIGHT SCOUT SYSTEM · Aircraft-Encyclopedia v0.9
