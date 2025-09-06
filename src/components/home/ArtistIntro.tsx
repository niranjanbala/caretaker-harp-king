'use client';

import { useState } from 'react';
import { Music, Calendar, MapPin, Clock, Users, Heart, Star, ArrowRight, Play } from 'lucide-react';

interface ArtistIntroProps {
  onCreateProfile?: () => void;
}

export default function ArtistIntro({ onCreateProfile }: ArtistIntroProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16">
          {/* Bold Hero */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-purple-500 rounded-full flex items-center justify-center mb-8 shadow-2xl">
                <Music className="w-12 h-12 text-black" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="text-white">Music isn&apos;t just</span><br />
                <span className="text-white">entertainment.</span><br />
                <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                  It&apos;s connection.
                </span>
              </h1>
              
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-6">
                  Susmith Louise sets the tone.
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Experience the revolutionary <span className="text-purple-400 font-bold">Caretaker Harp King</span> style - 
                  where one artist becomes an entire orchestra.
                </p>
              </div>
            </div>
          </div>

          {/* What Makes It Special - High Contrast Cards */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Card */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-4xl font-black mb-8 leading-tight">
                  One Artist.<br />
                  Six Instruments.<br />
                  <span className="text-green-200">Pure Magic.</span>
                </h3>
                <div className="space-y-4 text-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <span className="font-semibold">🎵 Harmonica mastery</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-green-200 rounded-full"></div>
                    <span className="font-semibold">🎸 Guitar excellence</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <span className="font-semibold">🎤 Vocal artistry</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-green-200 rounded-full"></div>
                    <span className="font-semibold">🥁 Rhythmic percussion</span>
                  </div>
                </div>
              </div>

              {/* Right Card */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-4xl font-black mb-8 leading-tight">
                  100% Live.<br />
                  100% Natural.<br />
                  <span className="text-purple-200">100% Authentic.</span>
                </h3>
                <div className="space-y-4 text-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <span className="font-semibold">🚫 No backing tracks</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-purple-200 rounded-full"></div>
                    <span className="font-semibold">🔄 No digital loops</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <span className="font-semibold">✨ Pure human talent</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-purple-200 rounded-full"></div>
                    <span className="font-semibold">🎭 Live performance art</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Performance - High Impact Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl p-12 text-white shadow-2xl border-4 border-red-500">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-full mb-8 shadow-lg">
                  <div className="w-4 h-4 bg-red-200 rounded-full animate-pulse"></div>
                  <span className="font-black uppercase tracking-wider text-lg">🔴 LIVE THIS SUNDAY</span>
                </div>
                
                <h3 className="text-5xl md:text-6xl font-black mb-12 leading-tight">
                  Join the<br />
                  <span className="text-yellow-300">Musical Revolution</span>
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-10 h-10 text-yellow-300" />
                    </div>
                    <div className="text-3xl font-black mb-2">SUNDAY</div>
                    <div className="text-red-200 text-lg">This Weekend</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-yellow-300" />
                    </div>
                    <div className="text-3xl font-black mb-2">9:30 - 10:30 AM</div>
                    <div className="text-red-200 text-lg">One Hour Live Set</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-10 h-10 text-yellow-300" />
                    </div>
                    <div className="text-3xl font-black mb-2">ZOEY&apos;S</div>
                    <div className="text-red-200 text-lg">Bangalore Live Venue</div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-2xl p-8 mb-8">
                  <p className="text-2xl font-bold text-yellow-300 mb-4">
                    🎵 Be part of something extraordinary
                  </p>
                  <p className="text-xl text-white">
                    Create your profile below to secure your spot in this unique musical experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MASSIVE Call to Action */}
          <div className="text-center pb-16">
            {onCreateProfile && (
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={onCreateProfile}
                  className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-400 hover:via-green-500 hover:to-green-600 text-black font-black text-2xl md:text-3xl px-12 py-8 rounded-3xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-green-500/25 flex items-center justify-center gap-6 border-4 border-green-400"
                >
                  <Users className="w-12 h-12" />
                  <span>CREATE YOUR PROFILE</span>
                  <ArrowRight className="w-12 h-12" />
                </button>
                
                <p className="mt-8 text-green-400 text-xl font-bold">
                  ⚡ Join 100+ music lovers • 🎵 Free to join • 🔥 Limited spots
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}