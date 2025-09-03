const themes = require('./src/data/themes.json');

// Extract theme colors for Tailwind
function generateThemeColors() {
  const themeColors = {};
  
  Object.values(themes).forEach(theme => {
    const themeName = theme.name;
    themeColors[themeName] = {
      primary: theme.colors.default.theme_color.primary,
      secondary: theme.colors.default.theme_color.secondary,
      accent: theme.colors.default.theme_color.primary,
      neutral: theme.colors.default.text_color.default,
      'base-100': theme.colors.default.theme_color.body,
      'base-200': theme.colors.default.theme_color.secondary,
      'base-300': theme.colors.default.theme_color.border,
      info: '#3ABFF8',
      success: '#36D399',
      warning: '#FBBD23',
      error: '#F87272',
    };
  });
  
  return themeColors;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'light',
      'dark',
      ...Object.keys(generateThemeColors()).map(themeName => ({
        [themeName]: generateThemeColors()[themeName]
      }))
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};