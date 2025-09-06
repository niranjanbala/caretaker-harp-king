'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import ArtistIntro from './ArtistIntro';
import ProfileForm from './ProfileForm';
import AudienceMode from '@/components/audience/AudienceMode';
import { ArrowLeft, Music, User, Users, ArrowRight } from 'lucide-react';

interface ProfileData {
  name: string;
  age: string;
  gender: string;
}

export default function HomePage() {
  const { currentMode, setMode } = useAppStore();
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);
  const [currentView, setCurrentView] = useState<'intro' | 'profile' | 'app'>('intro');

  const handleProfileComplete = (profile: ProfileData) => {
    setUserProfile(profile);
    setCurrentView('app');
    setMode('audience');
    
    // Store profile in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-profile', JSON.stringify(profile));
    }
    
    // Show welcome message
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg z-50 shadow-lg';
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Welcome ${profile.name}! Ready for the music experience?
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  const handleBackToIntro = () => {
    setCurrentView('intro');
  };

  const handleCreateProfile = () => {
    setCurrentView('profile');
  };

  // Check if user already has a profile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('user-profile');
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          setUserProfile(profile);
          setCurrentView('app');
          setMode('audience');
        } catch (error) {
          console.error('Error loading saved profile:', error);
          localStorage.removeItem('user-profile');
        }
      }
    }
  }, [setMode]);

  if (currentView === 'app' && userProfile) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* User Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="font-semibold text-white">Welcome, {userProfile.name}!</div>
                <div className="text-sm text-gray-400">
                  {userProfile.age} years old • Ready for live music
                </div>
              </div>
            </div>
            <button
              onClick={handleBackToIntro}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Intro</span>
            </button>
          </div>
        </div>

        {/* Live Performance Reminder */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-3">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-white">
              <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse"></div>
              <span className="font-semibold">
                Live Performance: Sunday 9:30-10:30 AM at Zoey&apos;s Bangalore
              </span>
              <Music className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Main App */}
        <AudienceMode />
      </div>
    );
  }

  if (currentView === 'profile') {
    return (
      <div className="relative">
        {/* Back Button */}
        <button
          onClick={handleBackToIntro}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        <ProfileForm onProfileComplete={handleProfileComplete} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ArtistIntro onCreateProfile={handleCreateProfile} />
    </div>
  );
}