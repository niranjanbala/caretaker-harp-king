'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { AlgoliaService } from '@/lib/algolia';
import { Song } from '@/types';
import { Search, Clock, TrendingUp, X, Loader2 } from 'lucide-react';

interface AlgoliaSearchResult {
  song: Song;
  _highlightResult: {
    title?: { value: string };
    artist?: { value: string };
    category?: { value: string };
  };
}

export default function InstantSearch() {
  const { songs, setSearchQuery } = useAppStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AlgoliaSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [useLocalSearch, setUseLocalSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Popular searches based on your song collection
  const popularSearches = [
    'Beatles', 'Pink Floyd', 'Bob Dylan', 'John Denver',
    'Kishore Kumar', 'Lata Mangeshkar', 'AR Rahman',
    'Elvis Presley', 'Michael Jackson', 'Queen'
  ];

  // Recent searches (stored in localStorage)
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const stored = localStorage.getItem('recent-searches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const performLocalSearch = useCallback((searchQuery: string): AlgoliaSearchResult[] => {
    const searchResults: AlgoliaSearchResult[] = [];
    const lowerQuery = searchQuery.toLowerCase();

    songs.forEach(song => {
      let matchType: 'title' | 'artist' | 'category' | null = null;
      let highlightedText = '';

      // Title match
      if (song.title.toLowerCase().includes(lowerQuery)) {
        matchType = 'title';
        highlightedText = highlightMatch(song.title, searchQuery);
      }
      // Artist match
      else if (song.artist.toLowerCase().includes(lowerQuery)) {
        matchType = 'artist';
        highlightedText = highlightMatch(song.artist, searchQuery);
      }
      // Category match
      else if (song.category.toLowerCase().includes(lowerQuery)) {
        matchType = 'category';
        highlightedText = highlightMatch(song.category, searchQuery);
      }

      if (matchType) {
        searchResults.push({
          song,
          _highlightResult: {
            [matchType]: { value: highlightedText }
          }
        });
      }
    });

    // Sort by relevance (title matches first, then artist, then category)
    searchResults.sort((a, b) => {
      const getMatchType = (result: AlgoliaSearchResult) => {
        if (result._highlightResult.title) return 0;
        if (result._highlightResult.artist) return 1;
        if (result._highlightResult.category) return 2;
        return 3;
      };
      return getMatchType(a) - getMatchType(b);
    });

    return searchResults.slice(0, 8);
  }, [songs]);

  const performSearch = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    
    try {
      if (useLocalSearch || !process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
        // Fallback to local search
        const searchResults = performLocalSearch(searchQuery);
        setResults(searchResults);
      } else {
        // Use Algolia search
        const algoliaResults = await AlgoliaService.searchSongs(searchQuery);
        setResults(algoliaResults.hits.map(hit => ({
          song: hit as Song,
          _highlightResult: hit._highlightResult || {}
        })));
      }
    } catch (error) {
      console.warn('Algolia search failed, falling back to local search:', error);
      setUseLocalSearch(true);
      const searchResults = performLocalSearch(searchQuery);
      setResults(searchResults);
    } finally {
      setIsLoading(false);
      setSelectedIndex(-1);
    }
  }, [useLocalSearch, performLocalSearch]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    performSearch(query);
  }, [query, performSearch]);


  const highlightMatch = (text: string, query: string): string => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-purple-500/30 text-purple-200">$1</mark>');
  };

  const saveRecentSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelectSong(results[selectedIndex].song);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectSong = (song: Song) => {
    setQuery(song.title);
    setSearchQuery(song.title);
    saveRecentSearch(song.title);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handlePopularSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setSearchQuery(searchTerm);
    saveRecentSearch(searchTerm);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
    searchRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={searchRef}
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-800 border-0 rounded-full py-3 pl-10 pr-12 text-white placeholder-gray-400 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isLoading && (
            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
          )}
          {query && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-50 max-h-96 overflow-auto">
          {query.trim().length < 2 ? (
            <div className="p-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Recent searches
                  </h4>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handlePopularSearch(search)}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Popular searches
                </h4>
                <div className="space-y-1">
                  {popularSearches.slice(0, 5).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearch(search)}
                      className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 uppercase tracking-wider flex items-center gap-2">
                Songs ({results.length} results)
                {useLocalSearch && (
                  <span className="text-yellow-400 text-xs">(Local Search)</span>
                )}
              </div>
              {results.map((result, index) => (
                <button
                  key={result.song.id}
                  onClick={() => handleSelectSong(result.song)}
                  className={`w-full text-left px-3 py-3 rounded transition-colors ${
                    selectedIndex === index
                      ? 'bg-purple-600/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-medium truncate"
                        dangerouslySetInnerHTML={{
                          __html: result._highlightResult.title?.value || result.song.title
                        }}
                      />
                      <div className="text-sm text-gray-400 truncate">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: result._highlightResult.artist?.value || result.song.artist
                          }}
                        />
                        {result.song.year && ` • ${result.song.year}`}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: result._highlightResult.category?.value || result.song.category
                        }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 text-gray-400 mx-auto mb-3 animate-spin" />
              <p className="text-gray-400">Searching...</p>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-gray-500 mt-1">
                Try searching for an artist, song title, or genre
              </p>
            </div>
          )}
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