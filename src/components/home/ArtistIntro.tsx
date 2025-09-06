'use client';

import { useState } from 'react';
import { Music, Calendar, MapPin, Clock, Users, Heart, Star, ArrowRight, Play, ChevronDown } from 'lucide-react';
import KimoyoButton from '@/components/ui/KimoyoButton';

interface ArtistIntroProps {
  onCreateProfile?: () => void;
}

export default function ArtistIntro({ onCreateProfile }: ArtistIntroProps) {
  return (
    <div className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Apple-style Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Apple-style Centered Content - Perfectly Fitted */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 flex flex-col justify-center h-full py-12">
        
        {/* Hero Typography - Apple Style - Compact */}
        <div className="space-y-6 mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-white leading-tight tracking-tight">
            1 Artist,<br />
            1 Organizer,<br />
            <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent font-light">
              1 Fan
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
            Experience the revolutionary Caretaker Harp King.<br />
            <span className="text-green-400">Live this Sunday at Zoey&apos;s Bangalore.</span>
          </p>
        </div>

        {/* Apple-style Feature Highlights - Compact */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 max-w-4xl mx-auto">
          
          {/* Artist */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl">
              <Music className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-white">The Artist</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Susmith Louise<br />
              <span className="text-green-400">Multi-instrument mastery</span>
            </p>
          </div>

          {/* Organizer */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">The Experience</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sunday 9:30-10:30 AM<br />
              <span className="text-purple-400">Zoey&apos;s Bangalore</span>
            </p>
          </div>

          {/* Fan */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl">
              <Users className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-white">You</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create your profile<br />
              <span className="text-yellow-400">Join the magic</span>
            </p>
          </div>

        </div>

        {/* Apple-style CTA - Compact */}
        <div className="space-y-4">
          {onCreateProfile && (
            <KimoyoButton
              onClick={onCreateProfile}
              variant="primary"
              size="lg"
              intensity="medium"
              beads={16}
              orbitDuration={15}
              className="text-lg md:text-xl py-3 md:py-4 px-6 md:px-8 font-semibold"
            >
              <span>Know more</span>
              <ArrowRight className="w-5 h-5" />
            </KimoyoButton>
          )}
          
          <p className="text-gray-500 text-base">
            Free to join • Limited spots available
          </p>
        </div>

      </div>
    </div>
  );
}