'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { Song } from '@/types';
import { Search, Clock, TrendingUp, X } from 'lucide-react';

interface SearchResult {
  song: Song;
  matchType: 'title' | 'artist' | 'category';
  highlightedText: string;
}

export default function InstantSearch() {
  const { songs, setSearchQuery } = useAppStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Popular searches based on your song collection
  const popularSearches = [
    'Beatles', 'Pink Floyd', 'Bob Dylan', 'John Denver',
    'Kishore Kumar', 'Lata Mangeshkar', 'AR Rahman',
    'Elvis Presley', 'Michael Jackson', 'Queen'
  ];

  // Recent searches (mock data for demo)
  const recentSearches = ['Beatles', 'Bollywood', 'Pink Floyd'];

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    // Algolia-style instant search
    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    songs.forEach(song => {
      // Title match
      if (song.title.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          song,
          matchType: 'title',
          highlightedText: highlightMatch(song.title, query)
        });
      }
      // Artist match
      else if (song.artist.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          song,
          matchType: 'artist',
          highlightedText: highlightMatch(song.artist, query)
        });
      }
      // Category match
      else if (song.category.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          song,
          matchType: 'category',
          highlightedText: highlightMatch(song.category, query)
        });
      }
    });

    // Sort by relevance (title matches first, then artist, then category)
    searchResults.sort((a, b) => {
      const order = { title: 0, artist: 1, category: 2 };
      return order[a.matchType] - order[b.matchType];
    });

    setResults(searchResults.slice(0, 8)); // Limit to 8 results like Algolia
    setSelectedIndex(-1);
  }, [query, songs]);

  const highlightMatch = (text: string, query: string): string => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-purple-500/30 text-purple-200">$1</mark>');
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
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setQuery('');
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
    searchRef.current?.focus();
  };

  return (
    <div className="relative max-w-md">
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
          className="w-full bg-gray-800 border-0 rounded-full py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
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
                        onClick={() => {
                          setQuery(search);
                          setSearchQuery(search);
                          setIsOpen(false);
                        }}
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
                      onClick={() => {
                        setQuery(search);
                        setSearchQuery(search);
                        setIsOpen(false);
                      }}
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
              <div className="text-xs text-gray-500 px-3 py-2 uppercase tracking-wider">
                Songs ({results.length} results)
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
                          __html: result.matchType === 'title' 
                            ? result.highlightedText 
                            : result.song.title 
                        }}
                      />
                      <div className="text-sm text-gray-400 truncate">
                        {result.matchType === 'artist' ? (
                          <span dangerouslySetInnerHTML={{ __html: result.highlightedText }} />
                        ) : (
                          result.song.artist
                        )}
                        {result.song.year && ` • ${result.song.year}`}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.matchType === 'category' ? (
                        <span dangerouslySetInnerHTML={{ __html: result.highlightedText }} />
                      ) : (
                        result.song.category
                      )}
                    </div>
                  </div>
                </button>
              ))}
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