'use client';

import { useState } from 'react';
import { Music, Calendar, MapPin, Clock, Users, Heart, Star, ArrowRight } from 'lucide-react';

interface ArtistIntroProps {
  onCreateProfile?: () => void;
}

export default function ArtistIntro({ onCreateProfile }: ArtistIntroProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-500 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Artist Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
                <Music className="w-16 h-16 text-black" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
                Susmith Louise
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-green-400 mb-4">
                Caretaker Harp King
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-lg">Unique Multi-Instrument Live Performer</span>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
            </div>

            {/* Artist Description */}
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Experience a <span className="text-green-400 font-semibold">very unique music style</span> invented by Susmith Louise in 2013.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <Music className="w-6 h-6" />
                    Multi-Instrument Mastery
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>🎵 Harmonica</li>
                    <li>🎸 Guitar</li>
                    <li>🎤 Vocals</li>
                    <li>🥁 Shakers & Cymbals</li>
                    <li>🔔 Ghungroo</li>
                    <li>🥁 Percussive Elements</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    100% Live & Natural
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>✨ All performed by a single artist</li>
                    <li>🎭 Simultaneous multi-instrument performance</li>
                    <li>🚫 No tech backings or loopers</li>
                    <li>🎵 Pure, authentic live music</li>
                  </ul>
                </div>
              </div>

              {showMore && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-900/30 to-purple-900/30 rounded-lg backdrop-blur-sm">
                  <p className="text-gray-300 italic text-center">
                    &ldquo;All the tones you listen in this music are created 100% Live & Natural 
                    without any tech backings & Loopers. Thanks for Enjoying my Little Music...&rdquo;
                  </p>
                  <p className="text-right text-green-400 mt-2 font-semibold">- Susmith Louise</p>
                </div>
              )}

              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-4 text-green-400 hover:text-green-300 transition-colors underline"
              >
                {showMore ? 'Show Less' : 'Learn More About the Artist'}
              </button>
            </div>
          </div>

          {/* Live Performance Banner */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 md:p-8 shadow-2xl border border-red-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-100 font-semibold uppercase tracking-wider">Live Performance</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Join Us This Sunday!
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4 text-white">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-red-200" />
                  <div>
                    <div className="font-semibold">Sunday</div>
                    <div className="text-red-100 text-sm">This Weekend</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-red-200" />
                  <div>
                    <div className="font-semibold">9:30 - 10:30 AM</div>
                    <div className="text-red-100 text-sm">1 Hour Live Set</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-red-200" />
                  <div>
                    <div className="font-semibold">Zoey&apos;s Bangalore</div>
                    <div className="text-red-100 text-sm">Live Venue</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-black/20 rounded-lg">
                <p className="text-red-100 text-center">
                  Experience the magic of Caretaker Harp King live! 
                  <span className="block mt-2 text-white font-semibold">
                    Create your profile below to join the musical journey
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pb-8">
            <p className="text-gray-400 text-lg mb-6">
              Get ready for an unforgettable live music experience
            </p>
            
            {onCreateProfile && (
              <button
                onClick={onCreateProfile}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto border-2 border-green-400"
              >
                <Users className="w-6 h-6" />
                Create Your Profile & Join the Experience
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}