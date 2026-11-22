// Light/dark theme. Loaded in <head> so the theme is set before the page paints.
// The site follows the system setting until the visitor flips the header switch;
// that choice is kept in localStorage. Without this script, CSS alone follows the system.
(() => {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: dark)');
  let choice = null;
  try { choice = localStorage.getItem('theme'); } catch {}
  if (choice !== 'light' && choice !== 'dark') choice = null;

  function apply() {
    const theme = choice || (system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    // Keep the browser's toolbar color in step with the page.
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.media = meta.dataset.scheme === theme ? 'all' : 'not all';
    }
    document.querySelector('.theme-toggle')?.setAttribute('aria-checked', String(theme === 'dark'));
  }

  apply();
  system.addEventListener('change', () => { if (!choice) apply(); });

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    toggle.hidden = false;
    apply();
    toggle.addEventListener('click', () => {
      choice = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', choice); } catch {}
      apply();
    });
  });
})();
