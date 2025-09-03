'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { themeEngine } from '@/lib/theme-engine';
import songsData from '@/data/songs.json';
import AudienceMode from '@/components/audience/AudienceMode';
import AdminMode from '@/components/admin/AdminMode';
import AdminAuth from '@/components/admin/AdminAuth';
import ThemeSelector from '@/components/ui/ThemeSelector';
import { Settings, Music, Home, Search, Library, Heart, Plus } from 'lucide-react';

export default function HomePage() {
  const {
    currentMode,
    isAdminUnlocked,
    currentTheme,
    isDarkMode,
    songs,
    setSongs,
    setMode,
    unlockAdmin,
    totalClaps,
    requests,
    activePoll,
  } = useAppStore();

  // Initialize app data
  useEffect(() => {
    // Load songs data
    if (songs.length === 0) {
      setSongs(songsData as any);
    }

    // Apply saved theme - force dark mode for Spotify-like experience
    themeEngine.applyTheme(currentTheme);
    themeEngine.setDarkMode(true);
  }, [songs.length, setSongs, currentTheme]);

  const handleAdminAuth = (pin: string) => {
    if (pin === '1234') {
      unlockAdmin();
      setMode('admin');
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Spotify-like Sidebar */}
      <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-full">
              <Music className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                Caretaker Harp King
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            <button
              onClick={() => setMode('audience')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentMode === 'audience'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Home className="w-5 h-5" />
              Home
            </button>
            
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
            
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Library className="w-5 h-5" />
              Your Library
            </button>
          </div>

          <div className="mt-8 space-y-1">
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Plus className="w-5 h-5" />
              Create Playlist
            </button>
            
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Heart className="w-5 h-5" />
              Liked Songs
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 px-3">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
              Live Stats
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Claps</span>
                <span className="text-green-400 font-medium">{totalClaps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pending</span>
                <span className="text-yellow-400 font-medium">
                  {requests.filter(r => r.status === 'pending').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Polls</span>
                <span className="text-blue-400 font-medium">
                  {activePoll ? 1 : 0}
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Admin Access */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={() => {
              if (isAdminUnlocked) {
                setMode('admin');
              } else {
                const modal = document.getElementById('admin-auth-modal') as HTMLDialogElement;
                modal?.showModal();
              }
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              currentMode === 'admin'
                ? 'bg-green-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            {isAdminUnlocked ? 'Admin Panel' : 'Admin Access'}
          </button>
          
          <div className="mt-2">
            <ThemeSelector />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-gradient-to-b from-gray-900 to-black flex items-center px-6">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-black/40 text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-black/40 text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-auto">
          <div className="p-6">
            {currentMode === 'audience' ? (
              <AudienceMode />
            ) : isAdminUnlocked ? (
              <AdminMode />
            ) : (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <div className="p-8 bg-gray-800 rounded-lg mb-6">
                    <Settings className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">
                      Admin Access Required
                    </h2>
                    <p className="text-gray-400">
                      Enter your PIN to access the admin dashboard
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const modal = document.getElementById('admin-auth-modal') as HTMLDialogElement;
                      modal?.showModal();
                    }}
                    className="bg-green-500 hover:bg-green-600 text-black font-medium px-8 py-3 rounded-full transition-colors"
                  >
                    Enter Admin PIN
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Admin Auth Modal */}
      <AdminAuth
        onAuth={handleAdminAuth}
        modalId="admin-auth-modal"
      />
    </div>
  );
}