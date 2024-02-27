const storageKey = "theme-preference";

const onClick = () => {
  // 轉換主題
  theme.value = theme.value === "light" ? "dark" : "light";

  setPreference();
};

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.documentElement.setAttribute("data-theme", theme.value);

  document
    .querySelector("#theme-toggle")
    ?.setAttribute("aria-label", theme.value);
};

const theme = {
  value: getColorPreference(),
};

// 確保在頁面加載完成之前就已經將正確的主題模式應用到網頁上
reflectPreference();

window.onload = () => {
  //確保當頁面完全加載後，應用正確的主題模式
  reflectPreference();

  // 找到id為theme-toggle的button，設置監聽器監聽botton的點擊事件
  document.querySelector("#theme-toggle").addEventListener("click", onClick);
};

// 同步更新
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    theme.value = isDark ? "dark" : "light";
    setPreference();
  });
