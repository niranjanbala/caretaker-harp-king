'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { themeEngine } from '@/lib/theme-engine';
import songsData from '@/data/songs.json';
import HomePage from '@/components/home/HomePage';
import AdminMode from '@/components/admin/AdminMode';
import AdminAuth from '@/components/admin/AdminAuth';
import ThemeSelector from '@/components/ui/ThemeSelector';
import PWAInstaller from '@/components/PWAInstaller';
import { Settings, Music, Home, Search, Library, Heart, Plus } from 'lucide-react';

export default function RootPage() {
  const {
    currentMode,
    isAdminUnlocked,
    currentTheme,
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

  // Show new home experience for audience mode
  if (currentMode === 'audience') {
    return (
      <div data-testid="app-loaded">
        <HomePage />
        <PWAInstaller />
      </div>
    );
  }

  // Show admin interface
  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row" data-testid="app-loaded">
      {/* Spotify-like Sidebar */}
      <div className="w-full lg:w-64 bg-black border-b lg:border-b-0 lg:border-r border-gray-800 flex flex-col lg:min-h-screen">
        {/* Logo */}
        <div className="p-4 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-full">
              <Music className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
            </div>
            <div>
              <h1 className="text-base lg:text-lg font-bold text-white">
                Caretaker Harp King
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pb-4 lg:pb-0">
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-1 lg:space-y-1 lg:block">
            <button
              onClick={() => setMode('audience')}
              className="w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Home className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="hidden lg:inline">Back to Home</span>
            </button>
            
            <button
              className="w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Search className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="hidden lg:inline">Search</span>
            </button>
            
            <button
              className="w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Library className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="hidden lg:inline">Library</span>
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
            {isAdminUnlocked ? (
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

      {/* PWA Install Prompt */}
      <PWAInstaller />
    </div>
  );
}