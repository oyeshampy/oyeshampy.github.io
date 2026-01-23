const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

const media = globalThis.matchMedia?.("(prefers-color-scheme: dark)");
const matchToTheme = (matches) => (matches ? "dark" : "light");
const systemTheme = () =>
  media ? matchToTheme(media.matches) : null;

root.dataset.theme =
  localStorage.getItem("theme") || systemTheme() || "dark";

media?.addEventListener?.("change", (event) => {
  localStorage.removeItem("theme");
  if (typeof event?.matches === "boolean") {
    root.dataset.theme = matchToTheme(event.matches);
    return;
  }

  root.dataset.theme = systemTheme() || "dark";
});

toggle.addEventListener("click", () => {
  const current = root.dataset.theme || systemTheme() || "dark";
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});
