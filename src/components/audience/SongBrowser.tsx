'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Song } from '@/types';
import InstantSearch from '@/components/ui/InstantSearch';
import LoadingSpinner, { SongListSkeleton, ErrorState } from '@/components/ui/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Search, Play, Plus, Heart, Clock, MoreHorizontal } from 'lucide-react';

export default function SongBrowser() {
  const {
    filteredSongs,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    addRequest,
    canMakeRequest,
    userRequestCount,
    songs,
  } = useAppStore();

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [requesterName, setRequesterName] = useState('');
  const [dedication, setDedication] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [hoveredSong, setHoveredSong] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Western', 'Bollywood', 'Regional', 'Kids', 'Christmas'];

  // Simulate loading state for initial data
  useEffect(() => {
    if (songs.length > 0) {
      setIsLoading(false);
    } else {
      // Set a timeout to show loading state
      const timer = setTimeout(() => {
        if (songs.length === 0) {
          setError('Failed to load songs. Please try again.');
        }
        setIsLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [songs.length]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // In a real app, you would refetch the data here
    window.location.reload();
  };

  const handleSongRequest = (song: Song) => {
    if (!canMakeRequest()) {
      // Show Spotify-style toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg z-50';
      toast.textContent = 'Maximum requests reached (3 per user)';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
      return;
    }

    setSelectedSong(song);
    setIsRequestModalOpen(true);
  };

  const handleSubmitRequest = () => {
    if (!selectedSong) return;

    try {
      addRequest({
        songId: selectedSong.id,
        song: selectedSong,
        requesterName: requesterName.trim() || undefined,
        dedication: dedication.trim() || undefined,
        status: 'pending',
      });

      // Reset form
      setRequesterName('');
      setDedication('');
      setSelectedSong(null);
      setIsRequestModalOpen(false);

      // Show Spotify-style success toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg z-50';
      toast.textContent = 'Song requested successfully!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (error) {
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg z-50';
      toast.textContent = error instanceof Error ? error.message : 'Failed to submit request';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const formatDuration = (year?: number) => {
    if (!year) return '3:45'; // Default duration
    // Generate pseudo-duration based on year for visual appeal
    const minutes = 2 + (year % 4);
    const seconds = (year % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <ErrorBoundary>
      <div>
        {/* Algolia-Style Instant Search */}
        <div className="mb-4 lg:mb-6">
          <InstantSearch />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-4 lg:mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Request Status */}
        <div className="mb-4 lg:mb-6 p-2 lg:p-3 bg-blue-600/20 border border-blue-600/30 rounded-lg">
          <div className="flex items-center gap-2 text-blue-400">
            <Heart className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="text-xs lg:text-sm">
              {userRequestCount}/3 requests used
            </span>
          </div>
        </div>

        {/* Song List Header */}
        <div className="mb-3 lg:mb-4">
          <h2 className="text-xl lg:text-2xl font-bold mb-1 lg:mb-2">
            {selectedCategory === 'All' ? 'All Songs' : selectedCategory}
          </h2>
          <p className="text-gray-400 text-xs lg:text-sm">
            {isLoading ? 'Loading...' : `${filteredSongs.length} songs available`}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && <SongListSkeleton />}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorState
            title="Failed to load songs"
            message={error}
            onRetry={handleRetry}
          />
        )}

        {/* Song List - Spotify Table Style */}
        {!isLoading && !error && (
          <div className="bg-gray-900/50 rounded-lg overflow-hidden">
            {/* Table Header - Hidden on mobile */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-6">Title</div>
              <div className="col-span-2">Album</div>
              <div className="col-span-2">Year</div>
              <div className="col-span-1">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            {/* Song Rows */}
            <div className="divide-y divide-gray-800">
              {filteredSongs.map((song, index) => (
                <div
                  key={song.id}
                  onMouseEnter={() => setHoveredSong(song.id)}
                  onMouseLeave={() => setHoveredSong(null)}
                  className="lg:grid lg:grid-cols-12 gap-4 px-3 lg:px-4 py-3 hover:bg-gray-800/50 transition-colors group cursor-pointer"
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-400">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm truncate">
                          {song.title}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {song.artist} • {song.year || '—'}
                        </div>
                      </div>
                      <button
                        onClick={() => handleSongRequest(song)}
                        disabled={!canMakeRequest()}
                        className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4 text-black" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:contents">
                    {/* Track Number / Play Button */}
                    <div className="col-span-1 flex items-center">
                      {hoveredSong === song.id ? (
                        <button
                          onClick={() => handleSongRequest(song)}
                          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-black" />
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">{index + 1}</span>
                      )}
                    </div>

                    {/* Title and Artist */}
                    <div className="col-span-6 flex items-center min-w-0">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-white truncate">
                          {song.title}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                          {song.artist}
                        </div>
                      </div>
                    </div>

                    {/* Album/Category */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-400 truncate">
                        {song.subcategory || song.category}
                      </span>
                    </div>

                    {/* Year */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-400">
                        {song.year || '—'}
                      </span>
                    </div>

                    {/* Duration / Actions */}
                    <div className="col-span-1 flex items-center justify-end">
                      {hoveredSong === song.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSongRequest(song)}
                            disabled={!canMakeRequest()}
                            className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
                            title="Request song"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">
                          {formatDuration(song.year)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredSongs.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-400">
              Try searching for something else or browse all songs
            </p>
          </div>
        )}

      {/* Request Modal - Spotify Style */}
      {isRequestModalOpen && selectedSong && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-6">Request Song</h3>
            
            <div className="space-y-4">
              {/* Selected Song Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                  <Play className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">{selectedSong.title}</div>
                  <div className="text-sm text-gray-400 truncate">
                    {selectedSong.artist} • {selectedSong.year}
                  </div>
                </div>
              </div>

              {/* Requester Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  maxLength={50}
                />
              </div>

              {/* Dedication */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Dedication (Optional)
                </label>
                <textarea
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  placeholder="Add a special message or dedication"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none resize-none"
                  rows={3}
                  maxLength={200}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {dedication.length}/200 characters
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="flex-1 bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-medium py-3 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                className="flex-1 bg-green-500 hover:bg-green-600 text-black font-medium py-3 rounded-full transition-colors"
              >
                Request Song
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </ErrorBoundary>
  );
}