'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('softtap_theme');
    const isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const currentTheme = isDark ? 'dark' : 'light';
    setTheme(currentTheme);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleThemeSync = (e) => {
      if (e.detail?.theme) {
        setTheme(e.detail.theme);
      }
    };

    window.addEventListener('softtap-theme-change', handleThemeSync);
    return () => window.removeEventListener('softtap-theme-change', handleThemeSync);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    try {
      localStorage.setItem('softtap_theme', nextTheme);
    } catch {
      // ignore storage error
    }

    window.dispatchEvent(new CustomEvent('softtap-theme-change', { detail: { theme: nextTheme } }));
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-white/10 ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center gap-1.5 p-1.5 rounded-full transition-all duration-300 active:scale-90 cursor-pointer ${
        isDark
          ? 'bg-slate-800 text-amber-300 border border-amber-400/30 hover:bg-slate-700 shadow-sm'
          : 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-300" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-bold pr-1.5">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
}
