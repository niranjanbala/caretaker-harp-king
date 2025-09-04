import { renderHook, act } from '@testing-library/react'
import { useAppStore } from '../store'
import { Song, SongRequest } from '@/types'

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

// Mock song data
const mockSong: Song = {
  id: 'test-song-1',
  title: 'Test Song',
  artist: 'Test Artist',
  year: 2023,
  category: 'Western',
  subcategory: 'Instrumental',
}

const mockSongs: Song[] = [
  mockSong,
  {
    id: 'test-song-2',
    title: 'Another Song',
    artist: 'Another Artist',
    year: 2022,
    category: 'Bollywood',
  },
]

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({
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
    })
    jest.clearAllMocks()
  })

  describe('Mode Management', () => {
    it('should set mode correctly', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.setMode('admin')
      })

      expect(result.current.currentMode).toBe('admin')
    })

    it('should unlock admin correctly', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.unlockAdmin()
      })

      expect(result.current.isAdminUnlocked).toBe(true)
    })

    it('should lock admin and reset mode', () => {
      const { result } = renderHook(() => useAppStore())

      // First unlock and set admin mode
      act(() => {
        result.current.unlockAdmin()
        result.current.setMode('admin')
      })

      // Then lock admin
      act(() => {
        result.current.lockAdmin()
      })

      expect(result.current.isAdminUnlocked).toBe(false)
      expect(result.current.currentMode).toBe('audience')
    })
  })

  describe('Song Management', () => {
    it('should set songs and update filtered songs', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.setSongs(mockSongs)
      })

      expect(result.current.songs).toEqual(mockSongs)
      expect(result.current.filteredSongs).toEqual(mockSongs)
    })

    it('should filter songs by search query', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.setSongs(mockSongs)
        result.current.setSearchQuery('Test')
      })

      expect(result.current.filteredSongs).toHaveLength(1)
      expect(result.current.filteredSongs[0].title).toBe('Test Song')
    })

    it('should filter songs by category', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.setSongs(mockSongs)
        result.current.setSelectedCategory('Bollywood')
      })

      expect(result.current.filteredSongs).toHaveLength(1)
      expect(result.current.filteredSongs[0].category).toBe('Bollywood')
    })

    it('should filter songs by both search query and category', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.setSongs(mockSongs)
        result.current.setSelectedCategory('Western')
        result.current.setSearchQuery('Test')
      })

      expect(result.current.filteredSongs).toHaveLength(1)
      expect(result.current.filteredSongs[0].title).toBe('Test Song')
    })
  })

  describe('Request Management', () => {
    it('should add a request successfully', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addRequest({
          songId: mockSong.id,
          song: mockSong,
          requesterName: 'Test User',
          dedication: 'Test dedication',
          status: 'pending',
        })
      })

      expect(result.current.requests).toHaveLength(1)
      expect(result.current.requests[0].song).toEqual(mockSong)
      expect(result.current.requests[0].requesterName).toBe('Test User')
      expect(result.current.userRequestCount).toBe(1)
    })

    it('should prevent adding more than 3 requests', () => {
      const { result } = renderHook(() => useAppStore())

      // Add 3 requests
      act(() => {
        for (let i = 0; i < 3; i++) {
          result.current.addRequest({
            songId: mockSong.id,
            song: mockSong,
            status: 'pending',
          })
        }
      })

      expect(result.current.canMakeRequest()).toBe(false)

      // Try to add a 4th request
      expect(() => {
        act(() => {
          result.current.addRequest({
            songId: mockSong.id,
            song: mockSong,
            status: 'pending',
          })
        })
      }).toThrow('Maximum requests reached (3 per user)')
    })

    it('should update request status', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addRequest({
          songId: mockSong.id,
          song: mockSong,
          status: 'pending',
        })
      })

      const requestId = result.current.requests[0].id

      act(() => {
        result.current.updateRequestStatus(requestId, 'playing')
      })

      expect(result.current.requests[0].status).toBe('playing')
    })

    it('should set now playing when status changes to playing', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addRequest({
          songId: mockSong.id,
          song: mockSong,
          status: 'pending',
        })
      })

      const requestId = result.current.requests[0].id

      act(() => {
        result.current.updateRequestStatus(requestId, 'playing')
      })

      expect(result.current.nowPlaying).toEqual(result.current.requests[0])
    })

    it('should remove request', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addRequest({
          songId: mockSong.id,
          song: mockSong,
          status: 'pending',
        })
      })

      const requestId = result.current.requests[0].id

      act(() => {
        result.current.removeRequest(requestId)
      })

      expect(result.current.requests).toHaveLength(0)
    })

    it('should reorder requests', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addRequest({
          songId: 'song-1',
          song: { ...mockSong, id: 'song-1', title: 'Song 1' },
          status: 'pending',
        })
        result.current.addRequest({
          songId: 'song-2',
          song: { ...mockSong, id: 'song-2', title: 'Song 2' },
          status: 'pending',
        })
      })

      const originalRequests = [...result.current.requests]
      const reorderedRequests = [originalRequests[1], originalRequests[0]]

      act(() => {
        result.current.reorderRequests(reorderedRequests)
      })

      expect(result.current.requests[0].song.title).toBe('Song 2')
      expect(result.current.requests[1].song.title).toBe('Song 1')
    })
  })

  describe('Clap Management', () => {
    it('should add claps to total', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addClap()
      })

      expect(result.current.totalClaps).toBe(1)
    })

    it('should add claps to specific request', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addRequest({
          songId: mockSong.id,
          song: mockSong,
          status: 'pending',
        })
      })

      const requestId = result.current.requests[0].id

      act(() => {
        result.current.addClap(requestId)
      })

      expect(result.current.requests[0].claps).toBe(1)
      expect(result.current.totalClaps).toBe(1)
    })
  })

  describe('Poll Management', () => {
    it('should create a poll', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.createPoll('What should we play next?', ['Option 1', 'Option 2'])
      })

      expect(result.current.polls).toHaveLength(1)
      expect(result.current.activePoll).toBeDefined()
      expect(result.current.activePoll?.question).toBe('What should we play next?')
      expect(result.current.activePoll?.options).toEqual(['Option 1', 'Option 2'])
    })

    it('should vote on a poll', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.createPoll('Test poll?', ['Yes', 'No'])
      })

      const pollId = result.current.activePoll!.id

      act(() => {
        result.current.vote(pollId, 'Yes')
      })

      expect(result.current.activePoll?.votes['Yes']).toBe(1)
      expect(result.current.activePoll?.totalVotes).toBe(1)
    })

    it('should close a poll', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.createPoll('Test poll?', ['Yes', 'No'])
      })

      const pollId = result.current.activePoll!.id

      act(() => {
        result.current.closePoll(pollId)
      })

      expect(result.current.activePoll).toBeUndefined()
      expect(result.current.polls[0].isActive).toBe(false)
    })
  })

  describe('Analytics', () => {
    it('should update analytics when requests are added', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addRequest({
          songId: mockSong.id,
          song: mockSong,
          status: 'pending',
        })
      })

      const expectedKey = `${mockSong.title} - ${mockSong.artist}`
      expect(result.current.analytics.mostRequested[expectedKey]).toBe(1)
      expect(result.current.analytics.categoryStats[mockSong.category]).toBe(1)
    })
  })

  describe('User Fingerprinting', () => {
    it('should generate user fingerprint', () => {
      const { result } = renderHook(() => useAppStore())

      const fingerprint = result.current.getUserFingerprint()

      expect(fingerprint).toHaveProperty('id')
      expect(fingerprint).toHaveProperty('requestCount')
      expect(fingerprint).toHaveProperty('lastRequest')
      expect(fingerprint).toHaveProperty('clapsGiven')
      expect(fingerprint).toHaveProperty('votesGiven')
    })

    it('should check if user can make request', () => {
      const { result } = renderHook(() => useAppStore())

      expect(result.current.canMakeRequest()).toBe(true)

      // Add 3 requests
      act(() => {
        for (let i = 0; i < 3; i++) {
          result.current.addRequest({
            songId: mockSong.id,
            song: mockSong,
            status: 'pending',
          })
        }
      })

      expect(result.current.canMakeRequest()).toBe(false)
    })
  })
})