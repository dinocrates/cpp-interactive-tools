(function () {
  'use strict';

  const STORAGE_KEY = 'cppInteractiveToolsTheme';
  const MODES = ['auto', 'dark', 'light'];
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function readStoredMode() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function writeStoredMode(mode) {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch (error) {
      // Some embedded contexts block storage; the current page can still switch.
    }
  }

  function normalizeMode(value) {
    return MODES.includes(value) ? value : 'auto';
  }

  function getRequestedMode() {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = normalizeMode(params.get('theme'));
    if (params.has('theme')) return urlTheme;
    return normalizeMode(readStoredMode());
  }

  function resolveTheme(mode) {
    if (mode === 'dark' || mode === 'light') return mode;
    return media && media.matches ? 'dark' : 'light';
  }

  function applyTheme(mode) {
    const normalized = normalizeMode(mode);
    const resolved = resolveTheme(normalized);
    document.documentElement.dataset.themeMode = normalized;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
    updateToggle(normalized);
  }

  function saveTheme(mode) {
    const normalized = normalizeMode(mode);
    writeStoredMode(normalized);
    applyTheme(normalized);
  }

  function updateToggle(mode) {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    toggle.querySelectorAll('button[data-theme-choice]').forEach((button) => {
      const isActive = button.dataset.themeChoice === mode;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function buildToggle() {
    if (document.querySelector('[data-theme-toggle]')) return;

    const toggle = document.createElement('div');
    toggle.className = 'theme-toggle';
    toggle.dataset.themeToggle = '';
    toggle.setAttribute('aria-label', 'Theme');

    [
      ['auto', 'Auto'],
      ['dark', 'Dark'],
      ['light', 'Light']
    ].forEach(([mode, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.themeChoice = mode;
      button.textContent = label;
      button.addEventListener('click', () => saveTheme(mode));
      toggle.appendChild(button);
    });

    document.body.appendChild(toggle);
    updateToggle(normalizeMode(document.documentElement.dataset.themeMode));
  }

  applyTheme(getRequestedMode());

  if (media) {
    const onChange = () => {
      if (normalizeMode(document.documentElement.dataset.themeMode) === 'auto') {
        applyTheme('auto');
      }
    };

    if (media.addEventListener) media.addEventListener('change', onChange);
    else if (media.addListener) media.addListener(onChange);
  }

  window.addEventListener('message', (event) => {
    const data = event.data || {};
    const mode = typeof data === 'string' ? data : data.theme;
    if (
      MODES.includes(mode) &&
      (data.type === 'cpp-tools-theme' || data.type === 'theme' || typeof data === 'string')
    ) {
      applyTheme(mode);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildToggle);
  } else {
    buildToggle();
  }
})();
