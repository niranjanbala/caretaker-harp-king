import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, Song, SongRequest, Poll, UserFingerprint } from '@/types';

interface AppStore extends AppState {
  // Actions
  setMode: (mode: 'audience' | 'admin') => void;
  unlockAdmin: () => void;
  lockAdmin: () => void;
  setTheme: (theme: string) => void;
  toggleDarkMode: () => void;
  setCustomColors: (colors: Record<string, string>) => void;
  
  // Song actions
  setSongs: (songs: Song[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  filterSongs: () => void;
  
  // Request actions
  addRequest: (request: Omit<SongRequest, 'id' | 'timestamp' | 'claps'>) => void;
  updateRequestStatus: (id: string, status: SongRequest['status']) => void;
  removeRequest: (id: string) => void;
  reorderRequests: (requests: SongRequest[]) => void;
  setNowPlaying: (request: SongRequest | undefined) => void;
  addClap: (requestId?: string) => void;
  
  // Poll actions
  createPoll: (question: string, options: string[]) => void;
  closePoll: (pollId: string) => void;
  vote: (pollId: string, option: string) => void;
  
  // Analytics actions
  updateAnalytics: () => void;
  
  // User fingerprinting
  getUserFingerprint: () => UserFingerprint;
  canMakeRequest: () => boolean;
}

// Generate a simple browser fingerprint
function generateFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx?.fillText('fingerprint', 10, 10);
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentMode: 'audience',
      isAdminUnlocked: false,
      currentTheme: 'default-light',
      isDarkMode: false,
      customColors: {},
      
      songs: [],
      filteredSongs: [],
      searchQuery: '',
      selectedCategory: 'All',
      
      requests: [],
      userRequestCount: 0,
      nowPlaying: undefined,
      
      totalClaps: 0,
      activePoll: undefined,
      polls: [],
      
      analytics: {
        mostRequested: {},
        categoryStats: {},
        engagementStats: {
          totalVotes: 0,
          totalClaps: 0,
          activeUsers: 0,
        },
      },
      
      // Actions
      setMode: (mode) => set({ currentMode: mode }),
      
      unlockAdmin: () => set({ isAdminUnlocked: true }),
      
      lockAdmin: () => set({ isAdminUnlocked: false, currentMode: 'audience' }),
      
      setTheme: (theme) => set({ currentTheme: theme }),
      
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      setCustomColors: (colors) => set({ customColors: colors }),
      
      setSongs: (songs) => {
        set({ songs, filteredSongs: songs });
        get().updateAnalytics();
      },
      
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterSongs();
      },
      
      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
        get().filterSongs();
      },
      
      filterSongs: () => {
        const { songs, searchQuery, selectedCategory } = get();
        
        let filtered = songs;
        
        // Filter by category
        if (selectedCategory !== 'All') {
          filtered = filtered.filter(song => song.category === selectedCategory);
        }
        
        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(song =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
          );
        }
        
        set({ filteredSongs: filtered });
      },
      
      addRequest: (requestData) => {
        const fingerprint = get().getUserFingerprint();
        
        if (!get().canMakeRequest()) {
          throw new Error('Maximum requests reached (3 per user)');
        }
        
        const newRequest: SongRequest = {
          ...requestData,
          id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
          claps: 0,
        };
        
        set((state) => ({
          requests: [...state.requests, newRequest],
          userRequestCount: state.userRequestCount + 1,
        }));
        
        get().updateAnalytics();
      },
      
      updateRequestStatus: (id, status) => {
        set((state) => ({
          requests: state.requests.map(req =>
            req.id === id ? { ...req, status } : req
          ),
        }));
        
        if (status === 'playing') {
          const request = get().requests.find(req => req.id === id);
          if (request) {
            get().setNowPlaying(request);
          }
        }
        
        get().updateAnalytics();
      },
      
      removeRequest: (id) => {
        set((state) => ({
          requests: state.requests.filter(req => req.id !== id),
        }));
        get().updateAnalytics();
      },
      
      reorderRequests: (requests) => {
        set({ requests });
      },
      
      setNowPlaying: (request) => {
        set({ nowPlaying: request });
      },
      
      addClap: (requestId) => {
        if (requestId) {
          set((state) => ({
            requests: state.requests.map(req =>
              req.id === requestId ? { ...req, claps: req.claps + 1 } : req
            ),
          }));
        }
        
        set((state) => ({
          totalClaps: state.totalClaps + 1,
        }));
        
        get().updateAnalytics();
      },
      
      createPoll: (question, options) => {
        const newPoll: Poll = {
          id: `poll-${Date.now()}`,
          question,
          options,
          votes: options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {}),
          isActive: true,
          createdAt: Date.now(),
          totalVotes: 0,
        };
        
        set((state) => ({
          polls: [...state.polls, newPoll],
          activePoll: newPoll,
        }));
      },
      
      closePoll: (pollId) => {
        set((state) => ({
          polls: state.polls.map(poll =>
            poll.id === pollId ? { ...poll, isActive: false } : poll
          ),
          activePoll: state.activePoll?.id === pollId ? undefined : state.activePoll,
        }));
      },
      
      vote: (pollId, option) => {
        set((state) => ({
          polls: state.polls.map(poll =>
            poll.id === pollId
              ? {
                  ...poll,
                  votes: { ...poll.votes, [option]: poll.votes[option] + 1 },
                  totalVotes: poll.totalVotes + 1,
                }
              : poll
          ),
          activePoll: state.activePoll?.id === pollId
            ? {
                ...state.activePoll,
                votes: { ...state.activePoll.votes, [option]: state.activePoll.votes[option] + 1 },
                totalVotes: state.activePoll.totalVotes + 1,
              }
            : state.activePoll,
        }));
        
        get().updateAnalytics();
      },
      
      updateAnalytics: () => {
        const { requests, polls, totalClaps } = get();
        
        // Most requested songs
        const mostRequested = requests.reduce((acc, req) => {
          const key = `${req.song.title} - ${req.song.artist}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        // Category stats
        const categoryStats = requests.reduce((acc, req) => {
          acc[req.song.category] = (acc[req.song.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        // Engagement stats
        const totalVotes = polls.reduce((sum, poll) => sum + poll.totalVotes, 0);
        
        set({
          analytics: {
            mostRequested,
            categoryStats,
            engagementStats: {
              totalVotes,
              totalClaps,
              activeUsers: 1, // Simplified for single-device mode
            },
          },
        });
      },
      
      getUserFingerprint: () => {
        const stored = localStorage.getItem('user-fingerprint');
        if (stored) {
          return JSON.parse(stored);
        }
        
        const fingerprint: UserFingerprint = {
          id: generateFingerprint(),
          requestCount: get().userRequestCount,
          lastRequest: 0,
          clapsGiven: 0,
          votesGiven: 0,
        };
        
        localStorage.setItem('user-fingerprint', JSON.stringify(fingerprint));
        return fingerprint;
      },
      
      canMakeRequest: () => {
        const fingerprint = get().getUserFingerprint();
        return fingerprint.requestCount < 3;
      },
    }),
    {
      name: 'caretaker-harp-king-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        isDarkMode: state.isDarkMode,
        customColors: state.customColors,
        requests: state.requests,
        polls: state.polls,
        totalClaps: state.totalClaps,
        analytics: state.analytics,
        userRequestCount: state.userRequestCount,
      }),
    }
  )
);