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
## 💝 Support the Project

If this Progressive Web App helps enhance your live music performances or inspires your own projects, consider supporting our work! Your contributions help us maintain and improve this app for the music community.

### 🎵 Support Susmith Louise - Caretaker Harp King

**Support the Artist & Original Creator** 🎤

The unique **Caretaker Harp King** music style and song collection are the heart of this app. Support Susmith Louise's musical journey:

- **UPI/PhonePe/GPay**: `+91 9562180666`
- **Instagram**: [@Susmith Louise](https://instagram.com/susmithlouise)
- **Note**: "Caretaker Harp King PWA Support"

*Susmith Louise performs harmonica, guitar, vocals, shakers, cymbals, ghungroo, and percussive elements all together as a single performer - 100% live and natural without any tech backings or loopers!*

### 💻 Support Niranjan Bala - Developer

**Support the Technical Implementation** 👨‍💻

**Quick & Easy UPI Payment for Indians** 🇮🇳

Send your support directly via UPI:
- **UPI ID**: `niranjan.veerasekara@niyoicici`
- **Payment Apps**: Google Pay, PhonePe, Paytm, BHIM, or any UPI app
- **Amount**: Any amount you see fit based on the value you received

**How to pay via UPI:**
1. Open your preferred UPI app (GPay, PhonePe, Paytm, etc.)
2. Send money to UPI ID: **niranjan.veerasekara@niyoicici**
3. Add a note: "Caretaker Harp King PWA Support"
4. Send any amount you feel the app is worth!

*UPI payments are instant, secure, and perfect for quick appreciation payments!*

---
### 💳 Get ₹250 + Send Donations via Niyo! 

Hey 👋, I'm here to give you **₹250💰** when you sign up with Niyo using my referral code!

**Niyo cards have been a game-changer for my international travel. You could experience the same benefits.**

**Most loved benefits of Niyo:**
🌟 Zero forex markup  
🌍 Accepted globally in 180+ countries  
🏧 Get access to travel tools  

**How to get your ₹250 bonus:**
1. Use my referral code: **HAONZLAQIH**
2. Sign up via this link: [Get Niyo Card + ₹250 Bonus](https://ctr.niyo.me/start?utm_campaign_id=WqeSX5gu&utm_source=goniyo_app_referral&utm_campaign=Referral&utm_adgroup=mobile_app&utm_medium=mobile_app_referral&ref_label=HAONZLAQIH)
3. Complete your KYC and get your card
4. **Bonus:** You can also send me donations through Niyo once you're set up!

**Important Note:** By signing up to Niyo itself - we both will receive some value. You can choose to pay me any amount you see fit as a token of appreciation for this PWA. It's completely optional and based on how much value you found in this resource.

### 🙏 Why Your Support Matters

**For Susmith Louise:**
- **Live Performances**: Continue creating unique Caretaker Harp King music
- **Equipment**: Maintain and upgrade musical instruments
- **Travel**: Perform at different venues and reach more audiences
- **Music Development**: Create new songs and arrangements

**For Niranjan Bala:**
- **Open Source Maintenance**: Keep this PWA updated with latest technologies
- **New Features**: Add more functionality and improvements
- **Documentation**: Improve guides and add tutorials
- **Community Support**: Help other developers using this framework

*Every contribution, no matter how small, is greatly appreciated and helps keep this project alive!*

## 🤝 Connect with Us

- **Niranjan Bala**: [@niranjanbala](https://github.com/niranjanbala) | [LinkedIn](https://linkedin.com/in/niranjanbala)
- **Susmith Louise**: [@Susmith Louise](https://instagram.com/susmithlouise)

---

**N-th'ora Forever!** 🖤💜 **Long Live the King!** 👑🎵

*Progressive Web App for Music Requests & Audience Engagement*

*Built with ❤️ by [Niranjan Bala](https://github.com/niranjanbala) for [Susmith Louise - Caretaker Harp King](https://instagram.com/susmithlouise)*