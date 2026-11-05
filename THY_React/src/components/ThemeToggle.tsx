import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'twy_theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === 'undefined') return THEME_LIGHT;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === THEME_DARK || stored === THEME_LIGHT) return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEME_DARK
      : THEME_LIGHT;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // storage unavailable
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME_DARK ? THEME_LIGHT : THEME_DARK));
  };

  const isDark = theme === THEME_DARK;
  const actionLabel = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  const buttonText = isDark ? 'Claro' : 'Oscuro';

  return (
    <button
      id="themeToggleBtn"
      className="theme-toggle-btn"
      type="button"
      aria-label={actionLabel}
      title={actionLabel}
      onClick={toggleTheme}
    >
      {/* Icono de luna para modo claro */}
      <svg
        className="theme-icon-moon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>

      {/* Icono de sol para modo oscuro */}
      <svg
        className="theme-icon-sun"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>

      <span className="theme-toggle-text d-none d-sm-inline">{buttonText}</span>
    </button>
  );
};

export default ThemeToggle;
