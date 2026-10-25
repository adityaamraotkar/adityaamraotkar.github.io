(function () {
  var root = document.documentElement, btn = document.getElementById("theme-btn"), label = document.getElementById("theme-label");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function isDark() { var t = root.getAttribute("data-theme"); return t ? t === "dark" : mq.matches; }
  function sync() { var d = isDark(); label.textContent = d ? "Light mode" : "Dark mode"; btn.setAttribute("aria-pressed", d ? "true" : "false"); }
  btn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
  });
  if (mq.addEventListener) mq.addEventListener("change", sync);
  sync();
})();
