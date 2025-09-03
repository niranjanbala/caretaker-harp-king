const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // PWA configuration
  async generateBuildId() {
    return 'caretaker-harp-king-build';
  },
  
  // Development theme reference
  webpack: (config, { dev }) => {
    if (dev) {
      // Development: Create alias for theme reference
      config.resolve.alias['@themes'] = '/Users/niranjanbala/ideas/my-philosophy/my-themes';
    }
    return config;
  },
  
  // Enable static exports for GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/caretaker-harp-king' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/caretaker-harp-king/' : '',
};

module.exports = nextConfig;