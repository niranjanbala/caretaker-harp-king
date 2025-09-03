'use client';

import { useAppStore } from '@/lib/store';
import { Play, Heart, MessageCircle, Volume2 } from 'lucide-react';

export default function NowPlayingBanner() {
  const { nowPlaying, addClap } = useAppStore();

  if (!nowPlaying) return null;

  const handleClap = () => {
    addClap(nowPlaying.id);
  };

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-green-500/30">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-400 text-sm font-medium uppercase tracking-wider">
          Now Playing
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Album Art Placeholder */}
        <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
          <Play className="w-8 h-8 text-gray-400" />
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-white mb-1 truncate">
            {nowPlaying.song.title}
          </h3>
          <p className="text-gray-400 mb-2 truncate">
            {nowPlaying.song.artist}
            {nowPlaying.song.year && ` • ${nowPlaying.song.year}`}
          </p>

          {nowPlaying.requesterName && (
            <div className="text-sm text-gray-500 mb-2">
              Requested by <span className="text-green-400">{nowPlaying.requesterName}</span>
            </div>
          )}

          {nowPlaying.dedication && (
            <div className="flex items-start gap-2 p-3 bg-gray-800/50 rounded-lg">
              <MessageCircle className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs text-gray-500 mb-1">Dedication:</div>
                <div className="text-sm text-gray-300 italic">
                  "{nowPlaying.dedication}"
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Clap Counter */}
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {nowPlaying.claps}
            </div>
            <div className="text-xs text-gray-500">claps</div>
          </div>

          {/* Clap Button */}
          <button
            onClick={handleClap}
            className="w-12 h-12 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Show appreciation"
          >
            <Heart className="w-5 h-5 text-black" />
          </button>

          {/* Volume Indicator */}
          <div className="flex items-center gap-1">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-3 rounded-full ${
                    i < 3 ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
        <span>1:23</span>
        <div className="flex-1 h-1 bg-gray-700 rounded-full">
          <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
        </div>
        <span>3:45</span>
      </div>
    </div>
  );
}