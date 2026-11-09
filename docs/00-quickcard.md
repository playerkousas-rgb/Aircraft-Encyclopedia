# Aircraft-Encyclopedia — 一頁紙速查

> 完整版：[../README.md](../README.md) · 邊界：[../SCOPE.md](../SCOPE.md) · 術語：[../GLOSSARY.md](../GLOSSARY.md)

## 開工三步

1. 開 `web/index.html` 或用靜態伺服器開 `web/`
2. `node scripts/guard.mjs`
3. 改完 `node scripts/final_check_v1.0.mjs --json` ＋ `node scripts/i18n_check_v1.0.mjs web`

## 五大鐵律（一句版）

| | 一句 |
|---|---|
| S 瘦身 | 唔好用嘅嘢唔部署；相片唔入 Git |
| F 防呆 | fail closed；未核實顯示「資料待核實」 |
| A 安全 | 本站零 secret、零後台 |
| W 版權 | 頁尾/meta 有 © SCOUT SYSTEM；第三方素材標來源 |
| V 雙版號 | APP_VERSION ↔ title ↔ 頁尾 ↔ CHANGELOG 一致 |

## 加一款飛機

跟 [04-data-schema-and-verification.md](./04-data-schema-and-verification.md) 八項清單，逐項附來源；全過先改 `dataStatus` 做 `verified`。

## 出事

| 情況 | 第一步 |
|---|---|
| 資料畀人指出錯 | 對返該格 source，錯就改並記入 docs/05 |
| 圖片授權唔清 | 即刻落相，換已核實 Commons 相 |
| 連結壞 | `node scripts/guard.mjs` 查 |

---
© SCOUT SYSTEM · COPYRIGHT SCOUT SYSTEM · Aircraft-Encyclopedia v0.1
