import { ThemeConfig } from '@/types';
import themesData from '@/data/themes.json';

export class ThemeEngine {
  private static instance: ThemeEngine;
  private currentTheme: ThemeConfig | null = null;
  private customColors: Record<string, string> = {};
  private isDarkMode: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  static getInstance(): ThemeEngine {
    if (!ThemeEngine.instance) {
      ThemeEngine.instance = new ThemeEngine();
    }
    return ThemeEngine.instance;
  }

  getAvailableThemes(): ThemeConfig[] {
    return Object.values(themesData as any);
  }

  getTheme(themeName: string): ThemeConfig | null {
    const themes = themesData as any;
    return themes[themeName] || null;
  }

  getCurrentTheme(): ThemeConfig | null {
    return this.currentTheme;
  }

  applyTheme(themeName: string, customizations?: Record<string, string>): void {
    const theme = this.getTheme(themeName);
    if (!theme) {
      console.warn(`Theme "${themeName}" not found`);
      return;
    }

    this.currentTheme = theme;
    this.customColors = customizations || {};

    this.updateCSSVariables();
    this.updateDaisyUITheme(themeName);
    this.updateGoogleFonts();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.updateCSSVariables();
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode = isDark;
    this.updateCSSVariables();
  }

  customizeColors(colorOverrides: Record<string, string>): void {
    this.customColors = { ...this.customColors, ...colorOverrides };
    this.updateCSSVariables();
  }

  private updateCSSVariables(): void {
    if (!this.currentTheme || typeof document === 'undefined') return;

    const root = document.documentElement;
    const colors = this.isDarkMode 
      ? this.currentTheme.colors.darkmode 
      : this.currentTheme.colors.default;

    // Apply theme colors with custom overrides
    const finalColors = {
      ...colors.theme_color,
      ...colors.text_color,
      ...this.customColors,
    };

    // Set CSS custom properties
    Object.entries(finalColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Set font variables
    const fonts = this.currentTheme.fonts;
    root.style.setProperty('--font-primary', this.extractFontFamily(fonts.font_family.primary));
    root.style.setProperty('--font-secondary', this.extractFontFamily(fonts.font_family.secondary));
    root.style.setProperty('--font-size-base', fonts.font_size.base + 'px');
    root.style.setProperty('--font-scale', fonts.font_size.scale);

    // Calculate heading sizes
    const baseSize = parseInt(fonts.font_size.base);
    const scale = parseFloat(fonts.font_size.scale);
    
    for (let i = 1; i <= 6; i++) {
      const size = baseSize * Math.pow(scale, 7 - i);
      root.style.setProperty(`--font-size-h${i}`, size + 'px');
    }

    // Update body class for dark mode
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  private updateDaisyUITheme(themeName: string): void {
    if (typeof document === 'undefined') return;

    // Set DaisyUI theme
    document.documentElement.setAttribute('data-theme', themeName);
  }

  private updateGoogleFonts(): void {
    if (!this.currentTheme || typeof document === 'undefined') return;

    const fonts = this.currentTheme.fonts;
    const primaryFont = fonts.font_family.primary;
    const secondaryFont = fonts.font_family.secondary;

    // Create Google Fonts link
    const fontFamilies = [primaryFont, secondaryFont]
      .filter(font => font && font.includes(':'))
      .map(font => font.replace(/\s/g, '+'))
      .join('&family=');

    if (fontFamilies) {
      const existingLink = document.querySelector('link[data-theme-fonts]');
      if (existingLink) {
        existingLink.remove();
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
      link.setAttribute('data-theme-fonts', 'true');
      document.head.appendChild(link);
    }
  }

  private extractFontFamily(fontString: string): string {
    // Extract font family name from Google Fonts format
    // e.g., "Inter:wght@400;500;600" -> "Inter"
    return fontString.split(':')[0].replace(/\+/g, ' ');
  }

  // Utility methods for components
  getThemeColor(colorName: string): string {
    if (!this.currentTheme) return '#000000';

    const colors = this.isDarkMode 
      ? this.currentTheme.colors.darkmode 
      : this.currentTheme.colors.default;

    // Check custom colors first
    if (this.customColors[colorName]) {
      return this.customColors[colorName];
    }

    // Check theme colors
    if (colors.theme_color[colorName as keyof typeof colors.theme_color]) {
      return colors.theme_color[colorName as keyof typeof colors.theme_color];
    }

    // Check text colors
    if (colors.text_color[colorName as keyof typeof colors.text_color]) {
      return colors.text_color[colorName as keyof typeof colors.text_color];
    }

    return '#000000';
  }

  exportThemeConfig(): string {
    return JSON.stringify({
      currentTheme: this.currentTheme?.name,
      isDarkMode: this.isDarkMode,
      customColors: this.customColors,
    }, null, 2);
  }

  importThemeConfig(configString: string): void {
    try {
      const config = JSON.parse(configString);
      
      if (config.currentTheme) {
        this.applyTheme(config.currentTheme, config.customColors);
      }
      
      if (typeof config.isDarkMode === 'boolean') {
        this.setDarkMode(config.isDarkMode);
      }
    } catch (error) {
      console.error('Error importing theme config:', error);
    }
  }

  // Generate CSS for theme preview
  generatePreviewCSS(themeName: string): string {
    const theme = this.getTheme(themeName);
    if (!theme) return '';

    const colors = theme.colors.default;
    
    return `
      .theme-preview-${themeName} {
        --primary: ${colors.theme_color.primary};
        --secondary: ${colors.theme_color.secondary};
        --accent: ${colors.theme_color.primary};
        --neutral: ${colors.text_color.default};
        --base-100: ${colors.theme_color.body};
        --base-200: ${colors.theme_color.secondary};
        --base-300: ${colors.theme_color.border};
      }
    `;
  }
}

// Export singleton instance
export const themeEngine = ThemeEngine.getInstance();

// React hook for theme management
export function useTheme() {
  const engine = ThemeEngine.getInstance();
  
  return {
    currentTheme: engine.getCurrentTheme(),
    availableThemes: engine.getAvailableThemes(),
    applyTheme: (name: string, customizations?: Record<string, string>) => 
      engine.applyTheme(name, customizations),
    toggleDarkMode: () => engine.toggleDarkMode(),
    customizeColors: (colors: Record<string, string>) => engine.customizeColors(colors),
    getThemeColor: (colorName: string) => engine.getThemeColor(colorName),
    exportConfig: () => engine.exportThemeConfig(),
    importConfig: (config: string) => engine.importThemeConfig(config),
  };
}