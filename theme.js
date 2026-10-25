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

/* Load-in animation, in the spirit of apple.com: each block fades up in sequence when it enters the screen */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains("reveal-on")) return;
  window.__reveal = true;
  var SEL = [
    ".home-hero h1", ".home-hero .tagline",
    ".hero h1", ".hero .tagline", ".hero .meta", ".hero .links",
    ".photo-hero h1", ".photo-hero .meta", ".photo-hero .chips",
    ".door", ".planner", "section .split > *", ".gallery-head", ".g-item", "footer .wrap"
  ].join(",");
  function init() {
    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left; });
      batch.forEach(function (e, i) {
        var el = e.target;
        io.unobserve(el);
        el.style.setProperty("--d", Math.min(i * 90, 720) + "ms");
        el.classList.add("in");
        setTimeout(function () { el.classList.remove("rv", "in"); el.style.removeProperty("--d"); }, 1000 + Math.min(i * 90, 720));
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
    document.querySelectorAll(SEL).forEach(function (el) { el.classList.add("rv"); io.observe(el); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
