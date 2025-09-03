export interface Song {
  id: string;
  title: string;
  artist: string;
  year?: number;
  category: 'Western' | 'Bollywood' | 'Regional' | 'Kids' | 'Christmas';
  subcategory?: string; // e.g., 'Instrumental', 'Singing', 'Kannada', 'Malayalam', 'Tamil'
}

export interface SongRequest {
  id: string;
  songId: string;
  song: Song;
  requesterName?: string;
  dedication?: string;
  timestamp: number;
  status: 'pending' | 'playing' | 'played' | 'removed';
  claps: number;
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: Record<string, number>; // option -> vote count
  isActive: boolean;
  createdAt: number;
  totalVotes: number;
}

export interface ThemeColors {
  theme_color: {
    primary: string;
    secondary: string;
    body: string;
    border: string;
    theme_light: string;
    theme_dark: string;
  };
  text_color: {
    default: string;
    dark: string;
    light: string;
  };
}

export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    default: ThemeColors;
    darkmode: ThemeColors;
  };
  fonts: {
    font_family: {
      primary: string;
      primary_type: string;
      secondary: string;
      secondary_type: string;
    };
    font_size: {
      base: string;
      scale: string;
    };
  };
  customizable: string[];
  source?: string;
}

export interface AppState {
  // UI State
  currentMode: 'audience' | 'admin';
  isAdminUnlocked: boolean;
  currentTheme: string;
  isDarkMode: boolean;
  customColors: Record<string, string>;
  
  // Song Data
  songs: Song[];
  filteredSongs: Song[];
  searchQuery: string;
  selectedCategory: string;
  
  // Request System
  requests: SongRequest[];
  userRequestCount: number;
  nowPlaying?: SongRequest;
  
  // Engagement
  totalClaps: number;
  activePoll?: Poll;
  polls: Poll[];
  
  // Analytics
  analytics: {
    mostRequested: Record<string, number>;
    categoryStats: Record<string, number>;
    engagementStats: {
      totalVotes: number;
      totalClaps: number;
      activeUsers: number;
    };
  };
}

export interface UserFingerprint {
  id: string;
  requestCount: number;
  lastRequest: number;
  clapsGiven: number;
  votesGiven: number;
}

export type AppMode = 'audience' | 'admin';
export type RequestStatus = 'pending' | 'playing' | 'played' | 'removed';
export type SongCategory = 'Western' | 'Bollywood' | 'Regional' | 'Kids' | 'Christmas';