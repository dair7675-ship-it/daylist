"use strict";

// DayList 使用瀏覽器的 localStorage 保存待辦事項，無須後端或登入。
const STORAGE_KEY = "daylist.tasks.v1";
const INITIAL_TASKS = [
  { id: "demo-1", text: "閱讀 20 分鐘", done: false },
  { id: "demo-2", text: "整理上課筆記", done: false },
  { id: "demo-3", text: "散步 10 分鐘", done: true }
];

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const progressLabel = document.querySelector("#progress-label");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector("#progress-track");
const clearButton = document.querySelector("#clear-completed");

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return INITIAL_TASKS.map(task => ({ ...task }));
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(task => task && typeof task.id === "string" &&
      typeof task.text === "string" && typeof task.done === "boolean");
  } catch (error) {
    console.warn("無法讀取待辦紀錄，改為載入示範事項。", error);
    return INITIAL_TASKS.map(task => ({ ...task }));
  }
}

let tasks = loadTasks();

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("此瀏覽器無法儲存待辦事項。", error);
  }
}

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return String(Date.now()) + "-" + String(Math.random());
}

function render() {
  list.replaceChildren();

  tasks.forEach(task => {
    const item = document.createElement("li");
    item.className = "task-item" + (task.done ? " is-done" : "");

    const label = document.createElement("label");
    label.className = "task-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      render();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text; // 使用 textContent，避免把輸入當作 HTML 執行。

    label.append(checkbox, text);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-button";
    del.textContent = "刪除";
    del.setAttribute("aria-label", "刪除事項：" + task.text);
    del.addEventListener("click", () => {
      tasks = tasks.filter(existing => existing.id !== task.id);
      saveTasks();
      render();
    });

    item.append(label, del);
    list.append(item);
  });

  const done = tasks.filter(task => task.done).length;
  const total = tasks.length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  progressLabel.textContent = `已完成 ${done} / ${total} 項`;
  progressFill.style.width = percent + "%";
  progressTrack.setAttribute("aria-valuenow", String(percent));
  emptyState.hidden = total > 0;
  clearButton.disabled = done === 0;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.unshift({ id: makeId(), text, done: false });
  saveTasks();
  render();
  form.reset();
  input.focus();
});

clearButton.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  render();
});

const dateLabel = document.querySelector("#today-label");
dateLabel.textContent = new Intl.DateTimeFormat("zh-TW", {
  month: "long", day: "numeric", weekday: "long"
}).format(new Date());

render();
