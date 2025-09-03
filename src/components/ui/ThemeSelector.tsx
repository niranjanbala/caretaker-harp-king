'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { themeEngine } from '@/lib/theme-engine';
import { Palette } from 'lucide-react';

export default function ThemeSelector() {
  const { currentTheme, setTheme } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const availableThemes = themeEngine.getAvailableThemes();

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    themeEngine.applyTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Theme Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
        title="Change Theme"
      >
        <Palette className="w-4 h-4" />
        Themes
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-72 bg-gray-900 rounded-lg shadow-xl border border-gray-700 z-50">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Choose Theme</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Theme Grid */}
            <div className="grid grid-cols-2 gap-3">
              {availableThemes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemeChange(theme.name)}
                  className={`p-3 rounded-lg text-left transition-all ${
                    currentTheme === theme.name
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: theme.colors?.default?.theme_color?.primary || '#1DB954'
                      }}
                    />
                    <span className="text-sm font-medium">{theme.displayName}</span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: theme.colors?.default?.theme_color?.secondary || '#191414'
                      }}
                    />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: theme.colors?.default?.theme_color?.body || '#121212'
                      }}
                    />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: theme.colors?.default?.text_color?.default || '#B3B3B3'
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}