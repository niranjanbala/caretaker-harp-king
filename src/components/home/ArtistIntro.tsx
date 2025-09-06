'use client';

import { useState } from 'react';
import { Music, Calendar, MapPin, Clock, Users, Heart, Star, ArrowRight } from 'lucide-react';

interface ArtistIntroProps {
  onCreateProfile?: () => void;
}

export default function ArtistIntro({ onCreateProfile }: ArtistIntroProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          {/* Bold Typography Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Music isn&apos;t just<br />
              entertainment.<br />
              <span className="text-purple-600">It&apos;s connection.</span>
            </h1>
            
            <div className="max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Susmith Louise sets the tone.
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience the revolutionary <strong>Caretaker Harp King</strong> style - 
                where one artist becomes an entire orchestra.
              </p>
            </div>
          </div>

          {/* What Makes It Special */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-black mb-6 text-gray-900">
                  One Artist.<br />
                  Six Instruments.<br />
                  <span className="text-green-600">Pure Magic.</span>
                </h3>
                <div className="space-y-3 text-lg text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Harmonica mastery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Guitar excellence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Vocal artistry</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Rhythmic percussion</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-black mb-6 text-gray-900">
                  100% Live.<br />
                  100% Natural.<br />
                  <span className="text-green-600">100% Authentic.</span>
                </h3>
                <div className="space-y-3 text-lg text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>No backing tracks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>No digital loops</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Pure human talent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Live performance art</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Performance Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-black text-white rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6">
                  <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse"></div>
                  <span className="font-bold uppercase tracking-wider">Live This Sunday</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black mb-8">
                  Join the<br />
                  <span className="text-green-400">Musical Journey</span>
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <Calendar className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">Sunday</div>
                  <div className="text-gray-300">This Weekend</div>
                </div>
                
                <div>
                  <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">9:30 - 10:30 AM</div>
                  <div className="text-gray-300">One Hour Live Set</div>
                </div>
                
                <div>
                  <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">Zoey&apos;s Bangalore</div>
                  <div className="text-gray-300">Live Venue</div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-xl text-gray-300 mb-8">
                  Be part of something extraordinary.<br />
                  <span className="text-white font-bold">Create your profile to join the experience.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pb-8">
            {onCreateProfile && (
              <button
                onClick={onCreateProfile}
                className="bg-black hover:bg-gray-800 text-white font-black text-xl px-12 py-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-4 mx-auto"
              >
                <Users className="w-8 h-8" />
                Create Your Profile
                <ArrowRight className="w-6 h-6" />
              </button>
            )}
            
            <p className="mt-6 text-gray-600 text-lg">
              Ready for an unforgettable live music experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}