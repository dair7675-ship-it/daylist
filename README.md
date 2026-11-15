# DayList｜日常待辦清單

一個簡單的日常待辦清單網站，可以新增事項、勾選完成、刪除事項、清除已完成，並顯示完成進度。

## 功能
- 新增待辦事項
- 勾選與取消完成
- 刪除單一事項
- 清除已完成事項
- 自動計算完成進度
- 將紀錄保存在同一個瀏覽器的 localStorage

## 使用技術
HTML、CSS、JavaScript，不需要安裝任何套件或 API 金鑰。

## 如何執行
直接在瀏覽器開啟 `index.html`，或使用 GitHub Pages 發布。

## 如何部署到 GitHub Pages
1. 建立一個公開的 GitHub Repository，例如 `daylist`。
2. 將 `index.html`、`style.css`、`script.js`、`AGENTS.md`、`README.md` 放在 Repository 根目錄。
3. 在 Settings → Pages 選擇 Deploy from a branch，設定 `main` 和 `/(root)` 並儲存。
4. 等待 GitHub Pages 顯示成功發布，再點選 Visit site 檢查網頁。

## AGENTS.md 的作用
此文件規範專案架構、網頁風格、資料儲存方式與修改後的測試項目。未來可以請 AI 先閱讀 `AGENTS.md`，再增加任務分類、搜尋或篩選功能。

## 注意
紀錄保存在瀏覽器本機。清除瀏覽器網站資料，或改用其他裝置時，原有紀錄可能無法保留。
