'use client';

import { useState } from 'react';
import { Music, Calendar, MapPin, Clock, Users, Heart, Star, ArrowRight, Play } from 'lucide-react';
import KimoyoButton from '@/components/ui/KimoyoButton';

interface ArtistIntroProps {
  onCreateProfile?: () => void;
}

export default function ArtistIntro({ onCreateProfile }: ArtistIntroProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        {/* Single Fold Content - Perfectly Centered */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Hero Typography */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-white">Music isn&apos;t just</span><br />
              <span className="text-white">entertainment.</span><br />
              <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                It&apos;s connection.
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-400">
              Susmith Louise sets the tone.
            </h2>
          </div>

          {/* Live Performance - Compact */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse"></div>
              <span className="text-red-100 font-bold uppercase tracking-wider">🔴 LIVE THIS SUNDAY</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
              Join the Musical Revolution
            </h3>
            
            <div className="flex items-center justify-center gap-8 md:gap-12 text-white">
              <div className="text-center">
                <Calendar className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <div className="text-lg font-bold">SUNDAY</div>
              </div>
              
              <div className="text-center">
                <Clock className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <div className="text-lg font-bold">9:30 - 10:30 AM</div>
              </div>
              
              <div className="text-center">
                <MapPin className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <div className="text-lg font-bold">ZOEY&apos;S BANGALORE</div>
              </div>
            </div>
          </div>

          {/* Value Proposition - Compact */}
          <div className="text-center space-y-4">
            <p className="text-xl md:text-2xl text-gray-300 font-semibold">
              <span className="text-green-400">One Artist.</span> 
              <span className="text-purple-400 mx-2">Six Instruments.</span> 
              <span className="text-yellow-400">Pure Magic.</span>
            </p>
            <p className="text-lg text-gray-400">
              100% Live • 100% Natural • 100% Authentic
            </p>
          </div>

          {/* MASSIVE Kimoyo CTA */}
          <div className="pt-4">
            {onCreateProfile && (
              <KimoyoButton
                onClick={onCreateProfile}
                variant="primary"
                size="xl"
                intensity="bold"
                beads={24}
                orbitDuration={12}
                className="text-xl md:text-2xl lg:text-3xl py-6 md:py-8 px-8 md:px-12 font-black"
              >
                <Users className="w-8 h-8 md:w-10 md:h-10" />
                <span>CREATE YOUR PROFILE</span>
                <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
              </KimoyoButton>
            )}
            
            <p className="mt-6 text-green-400 text-lg md:text-xl font-bold">
              ⚡ Join 100+ music lovers • 🎵 Free to join • 🔥 Limited spots
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}