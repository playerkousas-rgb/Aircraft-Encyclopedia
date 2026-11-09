# CONTRIBUTING — Aircraft-Encyclopedia

> 改嘢之前先讀 [SCOPE.md](SCOPE.md)；所有 issue 都按嗰條 bar 判斷。

## 去邊

| 你有 | 去 |
|---|---|
| Bug / 資料錯誤 | Issue：寫明機型代碼、邊一格、你對過的來源連結 |
| 新機型提議 | Issue：附製造商或可信來源，唔好只貼參考網站截圖 |
| 相片提議 | Issue：必須附 Wikimedia Commons 檔案頁（作者/授權），無授權資料唔收 |
| 想直接改 | PR；每個 PR 只做一件事，附檢查輸出 |

## 資料 PR 額外要求

- 每項新/改規格：來源連結＋適用子型號＋核實日期（格式見 docs/04）。
- 來源矛盾唔好靜靜揀一個：記入 `docs/05-data-issues.md`，畫面顯示「資料待核實」。
- 相片：更新 `CREDITS.md` 同資料檔的 credit 欄位；唔好將第三方相落 SCOUT 水印（W8）。

## PR 最低要求

```
[ ] node scripts/guard.mjs 全綠
[ ] node scripts/final_check_v1.0.mjs --json -> ok: true
[ ] node scripts/i18n_check_v1.0.mjs web 無 FAIL
[ ] CHANGELOG.md 加咗一行
[ ] 難逆轉決定有 ADR（docs/adr/）
[ ] 無真 key / .env / 大檔入 Git
```

## 授權

本 repo 程式與自家文字用 MIT（見 `LICENSE`）；第三方素材逐項標來源（W8）。

---
© SCOUT SYSTEM · COPYRIGHT SCOUT SYSTEM · Aircraft-Encyclopedia v0.1
