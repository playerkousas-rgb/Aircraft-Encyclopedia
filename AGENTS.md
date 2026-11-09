# AGENTS — Aircraft-Encyclopedia 開工邊界

> Agent 第一行讀呢度。同 README.md 衝突時，以通用安全/防呆底線為先。
> 真理倉：https://github.com/playerkousas-rgb/readme（README＋PLAYBOOK，唔好喺本 repo 複製第二份規則）

## 開工順序

0. **INTAKE 已完成（2026-11-09）**：答案已寫入 [SCOPE.md](SCOPE.md)「已確認決定」，唔好重複問、唔好自己改答案。
1. **PREFLIGHT gate**：`node scripts/preflight_v1.0.mjs . --json` → `ok: true` 先好郁；exit 1 停手。
2. 讀 [README.md](README.md) → [SCOPE.md](SCOPE.md) → [GLOSSARY.md](GLOSSARY.md) → [docs/01-p1-research.md](docs/01-p1-research.md)。
3. 有 UI 改動：讀 `skills/promoted/design-review/SKILL.md` 並跟住做（390/768/1440 望圖；做唔到要老實寫明）。
4. 改資料：跟 [docs/04-data-schema-and-verification.md](docs/04-data-schema-and-verification.md)；未核實唔好上圖卡。
5. 改動前後跑 `node scripts/guard.mjs`；交付前跑 `final_check` ＋ `i18n_check`。

## 可改 / 唔好改

| 可改 | 唔好改（除非用戶明講＋寫例外原因） |
|---|---|
| `web/`（index.html、styles.css、app.js、data/）、文件、測試 | 已確認的 SCOPE 決定（形式/授權/節奏） |
| 新增 `docs/NN-*.md`（要同步更新 README 索引） | 將未核實規格寫上圖卡、將第三方相落 SCOUT 水印 |
| 修 bug、補核實資料（附來源） | 喺前端加任何 API key / 後台 / 帳號系統 |

## 鐵律捷徑（真理倉）

- **S**：唔好用嘅嘢一件都唔部署；網站檔案總量 <5MB，相片唔入 Git。
- **F**：fail closed、白名單、單一真理（分類/欄位定義只寫一次）。
- **A**：本站零 secret；唔好加 key 落前端。
- **W**：每個交付檔有可見版權（頁尾＋meta）；第三方素材標來源（CREDITS.md）。
- **V**：改版 = `APP_VERSION`＋`<title>`＋頁尾＋CHANGELOG 一齊改。
- **L**：右上角語言掣、預設中文、`localStorage` try/catch、缺譯唔空白。

## 做完要留低

- CHANGELOG 一行；難逆轉決定寫 `docs/adr/`。
- 未核實事項寫「資料待核實」＋入 `docs/05-data-issues.md`，唔好當已完成。

---
© SCOUT SYSTEM · COPYRIGHT SCOUT SYSTEM · Aircraft-Encyclopedia v0.1
