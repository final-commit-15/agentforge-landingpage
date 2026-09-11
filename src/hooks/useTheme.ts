'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Shared theme contract for AgentForge.
 *
 * - Persisted under localStorage key 'theme' with values 'light' | 'dark'.
 * - Applied as a class on <html> ('.light' / '.dark') + color-scheme.
 * - Same-tab listeners get a 'agentforge:theme-change' CustomEvent.
 * - Other tabs (landing page, dashboard, settings, …) stay in sync via the
 *   native 'storage' event.
 *
 * Any app surface (landing, dashboard, sprint journal, …) that reads this
 * same key on boot and subscribes to these events will stay synchronized.
 */
export const THEME_STORAGE_KEY = 'theme';
export const THEME_CHANGE_EVENT = 'agentforge:theme-change';
export const DEFAULT_THEME: Theme = 'dark';

export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable — theme still applies to this tab */
  }
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setThemeState(getStoredTheme());

    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeState(e.newValue);
      }
    };
    const onCustom = (e: Event) => {
      const next = (e as CustomEvent<Theme>).detail;
      if (next === 'light' || next === 'dark') setThemeState(next);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(THEME_CHANGE_EVENT, onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(THEME_CHANGE_EVENT, onCustom);
    };
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    applyTheme(next);
  };

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    applyTheme(next);
  };

  return { theme, setTheme, toggleTheme, mounted };
}
