const fs = require('fs');
const path = require('path');

const THEME_SOURCE_PATH = '/Users/niranjanbala/ideas/my-philosophy/my-themes';
const SELECTED_THEMES = [
  'bigspring-nextjs',
  'clarity-nextjs', 
  'copper-nextjs',
  'darkrise-nextjs'
];

function extractThemeConfig(themeName) {
  const possiblePaths = [
    path.join(THEME_SOURCE_PATH, themeName, 'themes', themeName, 'src/config/theme.json'),
    path.join(THEME_SOURCE_PATH, themeName, 'src/config/theme.json'),
    path.join(THEME_SOURCE_PATH, themeName, 'config/theme.json'),
    path.join(THEME_SOURCE_PATH, themeName, 'theme.json')
  ];

  for (const configPath of possiblePaths) {
    if (fs.existsSync(configPath)) {
      try {
        const themeConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return {
          name: themeName,
          displayName: themeName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          colors: themeConfig.colors,
          fonts: themeConfig.fonts,
          customizable: ['primary', 'secondary'], // Allow customization of these colors
          source: configPath
        };
      } catch (error) {
        console.warn(`Error parsing theme config for ${themeName}:`, error.message);
      }
    }
  }
  
  return null;
}

function createFallbackThemes() {
  return {
    'default-light': {
      name: 'default-light',
      displayName: 'Default Light',
      colors: {
        default: {
          theme_color: {
            primary: '#3B82F6',
            secondary: '#F3F4F6',
            body: '#FFFFFF',
            border: '#E5E7EB',
            theme_light: '#EFF6FF',
            theme_dark: '#1F2937'
          },
          text_color: {
            default: '#6B7280',
            dark: '#111827',
            light: '#9CA3AF'
          }
        },
        darkmode: {
          theme_color: {
            primary: '#3B82F6',
            secondary: '#1F2937',
            body: '#111827',
            border: '#374151',
            theme_light: '#1F2937',
            theme_dark: '#0F172A'
          },
          text_color: {
            default: '#D1D5DB',
            dark: '#F9FAFB',
            light: '#9CA3AF'
          }
        }
      },
      fonts: {
        font_family: {
          primary: 'Inter:wght@400;500;600;700',
          primary_type: 'sans-serif',
          secondary: 'Inter:wght@400;500',
          secondary_type: 'sans-serif'
        },
        font_size: {
          base: '16',
          scale: '1.250'
        }
      },
      customizable: ['primary', 'secondary']
    },
    'caretaker-theme': {
      name: 'caretaker-theme',
      displayName: 'Caretaker Harp King',
      colors: {
        default: {
          theme_color: {
            primary: '#D97706',
            secondary: '#FEF3C7',
            body: '#FFFBEB',
            border: '#FDE68A',
            theme_light: '#FEF3C7',
            theme_dark: '#92400E'
          },
          text_color: {
            default: '#78716C',
            dark: '#1C1917',
            light: '#A8A29E'
          }
        },
        darkmode: {
          theme_color: {
            primary: '#F59E0B',
            secondary: '#451A03',
            body: '#1C1917',
            border: '#78716C',
            theme_light: '#451A03',
            theme_dark: '#0C0A09'
          },
          text_color: {
            default: '#D6D3D1',
            dark: '#F5F5F4',
            light: '#A8A29E'
          }
        }
      },
      fonts: {
        font_family: {
          primary: 'Poppins:wght@400;500;600;700',
          primary_type: 'sans-serif',
          secondary: 'Inter:wght@400;500',
          secondary_type: 'sans-serif'
        },
        font_size: {
          base: '16',
          scale: '1.200'
        }
      },
      customizable: ['primary', 'secondary']
    },
    'nthora-theme': {
      name: 'nthora-theme',
      displayName: 'N-th\'ora Forever',
      colors: {
        default: {
          theme_color: {
            primary: '#9333EA',
            secondary: '#1F1B24',
            body: '#0F0C15',
            border: '#2D1B69',
            theme_light: '#4C1D95',
            theme_dark: '#0C0A0F'
          },
          text_color: {
            default: '#C4B5FD',
            dark: '#F3F4F6',
            light: '#A78BFA'
          }
        },
        darkmode: {
          theme_color: {
            primary: '#A855F7',
            secondary: '#1E1B3A',
            body: '#0F0C15',
            border: '#2D1B69',
            theme_light: '#4C1D95',
            theme_dark: '#0C0A0F'
          },
          text_color: {
            default: '#C4B5FD',
            dark: '#F3F4F6',
            light: '#A78BFA'
          }
        }
      },
      fonts: {
        font_family: {
          primary: 'Inter:wght@400;500;600;700',
          primary_type: 'sans-serif',
          secondary: 'Roboto:wght@400;500',
          secondary_type: 'sans-serif'
        },
        font_size: {
          base: '16',
          scale: '1.250'
        }
      },
      customizable: ['primary', 'secondary']
    }
  };
}

function buildThemes() {
  console.log('🎨 Building themes...');
  
  const themes = {};
  let extractedCount = 0;

  // Try to extract themes from your collection
  SELECTED_THEMES.forEach(themeName => {
    const themeConfig = extractThemeConfig(themeName);
    if (themeConfig) {
      themes[themeName] = themeConfig;
      extractedCount++;
      console.log(`✅ Extracted theme: ${themeConfig.displayName}`);
    } else {
      console.warn(`⚠️  Could not find theme config for: ${themeName}`);
    }
  });

  // Add fallback themes
  const fallbackThemes = createFallbackThemes();
  Object.assign(themes, fallbackThemes);

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write themes to build
  const outputPath = path.join(outputDir, 'themes.json');
  fs.writeFileSync(outputPath, JSON.stringify(themes, null, 2));
  
  console.log(`🎉 Built ${Object.keys(themes).length} themes (${extractedCount} extracted, ${Object.keys(fallbackThemes).length} fallback)`);
  console.log(`📁 Themes saved to: ${outputPath}`);
  
  return themes;
}

// Run if called directly
if (require.main === module) {
  buildThemes();
}

module.exports = { buildThemes, extractThemeConfig };