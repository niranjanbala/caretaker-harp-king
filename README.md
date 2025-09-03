# 🎵 Caretaker Harp King - Progressive Web App

A modern Progressive Web App for live music performances, featuring **Spotify-style UX**, **Algolia-powered search**, and **dual-mode functionality** for audience engagement and admin management.

## ✨ Features

### 🎨 **Spotify-Style Interface**
- Dark theme with professional sidebar navigation
- Song table with hover interactions and green accent buttons
- "Good evening" personalized greeting
- Category pills and instant search functionality

### 🔍 **Algolia-Powered Search**
- Lightning-fast search across 119 songs
- Instant results with highlighting
- Recent and popular search suggestions
- Advanced filtering by category, artist, and year

### 👥 **Dual Mode System**
- **Audience Mode**: Browse songs, make requests, vote on polls, show appreciation
- **Admin Mode**: Manage requests, create polls, view analytics (PIN: 1234)

### 🎭 **Theme System**
- 7 available themes including "Wakanda Forever" (Black Panther inspired)
- Integration with external theme collection
- Customizable primary and accent colors
- Dark/light mode support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn package manager
- Algolia account (configured)

### Installation

```bash
# Clone and setup
git clone <repository>
cd caretaker-harp-king

# Install dependencies
yarn install

# Setup data and themes
yarn setup

# Start development server
yarn dev --port 8080
```

### Environment Setup

Create `.env.local`:
```env
NEXT_PUBLIC_ALGOLIA_APP_ID=MH2OFHTWPG
ALGOLIA_ADMIN_KEY=1a6035ba25f1e3b05397ac6d65cf48f2
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=f060130fcc0fdd98989ef15ede022955
```

## 📚 Song Collection

### 119 Songs Across Categories
- **84 Western songs**: Pink Floyd, Beatles, Bob Dylan, John Denver, Elvis, Queen, etc.
- **28 Bollywood songs**: Kishore Kumar, Lata Mangeshkar, AR Rahman, KK, etc.
- **7 Regional songs**: Kannada, Malayalam, Tamil classics

### Data Sources
- Parsed from `reference/songlist.pdf`
- Structured into searchable JSON format
- Uploaded to Algolia for instant search

## 🛠 Available Scripts

```bash
# Development
yarn dev                 # Start development server with theme building
yarn build              # Build for production
yarn start              # Start production server

# Data Management
yarn setup              # Parse songs, build themes, upload to Algolia
yarn algolia:upload     # Upload songs to Algolia search index

# Theme Management
yarn theme:sync         # Sync with external theme collection
yarn theme:select       # Interactive theme selection
```

## 🏗 Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + DaisyUI
- **Search**: Algolia
- **State**: Zustand with persistence
- **Database**: IndexedDB via Dexie.js
- **Icons**: Lucide React

### Project Structure
```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── audience/       # Audience mode components
│   └── admin/          # Admin mode components
├── lib/                # Utilities and services
├── data/               # Static data and themes
├── types/              # TypeScript definitions
└── styles/             # Global styles

scripts/                # Build and utility scripts
public/                 # Static assets and PWA files
```

## 🎯 Usage

### For Audiences
1. **Browse Songs**: Search and filter through the complete song collection
2. **Make Requests**: Request up to 3 songs with optional name and dedication
3. **Engage**: Clap for performances and vote on polls
4. **Track Queue**: See pending requests and currently playing songs

### For Performers (Admin)
1. **Access Admin**: Click "Admin Access" and enter PIN: `1234`
2. **Manage Queue**: View, reorder, and update request status
3. **Create Polls**: Engage audience with live polls
4. **View Analytics**: Track most requested songs and engagement stats

## 🎨 Themes

### Available Themes
1. **Bigspring Nextjs** - Professional blue theme
2. **Clarity Nextjs** - Clean and minimal
3. **Copper Nextjs** - Warm copper tones
4. **Darkrise Nextjs** - Dark and modern
5. **Default Light** - Clean light theme
6. **Caretaker Harp King** - Custom orange theme
7. **Wakanda Forever** - Black Panther inspired purple theme

### Theme Integration
- Themes are extracted from external collection at build time
- Only selected themes are included in production bundle
- Runtime color customization available
- Automatic Google Fonts integration

## 📱 PWA Features

### Installation
- Installable on mobile and desktop
- Offline functionality with service worker
- App-like experience with proper manifest

### Performance
- Code splitting and lazy loading
- Optimized bundle size
- Fast loading with Next.js 15 optimizations

## 🔒 Security & Privacy

### Local-First Architecture
- All data stored locally in IndexedDB
- No external server dependencies (except Algolia search)
- User fingerprinting for request limiting
- PIN-based admin authentication

### Data Management
- Automatic backup/restore capabilities
- Export/import functionality
- Clear data options for privacy

## 🎵 Live Performance Integration

### Audience Engagement
- Real-time clap counter
- Live poll voting
- Request queue visibility
- "Now Playing" banner with dedications

### Performance Management
- Request queue with drag & drop reordering
- Status management (pending, playing, played)
- Analytics dashboard
- Engagement metrics

## 🌟 Special Features

### Black Panther Tribute
- "Wakanda Forever" theme with royal purple colors
- Vibranium-inspired UI elements
- Mystical dark backgrounds

### Algolia Integration
- 119 songs indexed with advanced search settings
- Instant search with highlighting
- Popular and recent search suggestions
- Category-based filtering

## 📞 Support

Created for **Susmith Louise** and the **Caretaker Harp King** music style.

### Contact
- **Artist**: Susmith Louise
- **Phone**: +91 9562180666 (PhonePe/GPay)
- **Instagram**: @Susmith Louise

---

**Wakanda Forever!** 🖤💜 **Long Live the King!** 👑🎵

*Progressive Web App for Music Requests & Audience Engagement*