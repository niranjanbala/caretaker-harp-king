'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import SongBrowser from './SongBrowser';
import NowPlayingBanner from './NowPlayingBanner';
import PollVoting from './PollVoting';
import RequestQueue from './RequestQueue';
import { Play, Clock, Vote } from 'lucide-react';

export default function AudienceMode() {
  const [activeView, setActiveView] = useState<'browse' | 'queue' | 'polls'>('browse');
  const { nowPlaying, activePoll } = useAppStore();

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Good evening</h1>
        <p className="text-gray-400">Ready to make some music requests?</p>
      </div>

      {/* Now Playing Section */}
      {nowPlaying && <NowPlayingBanner />}

      {/* Active Poll Alert */}
      {activePoll && (
        <div className="mb-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Vote className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-semibold text-blue-400">Live Poll Active</h3>
              <p className="text-sm text-gray-300">{activePoll.question}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setActiveView('browse')}
          className={`p-4 rounded-lg transition-colors ${
            activeView === 'browse'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
          }`}
        >
          <Play className="w-6 h-6 mb-2" />
          <div className="text-sm font-medium">Browse Songs</div>
        </button>
        
        <button
          onClick={() => setActiveView('queue')}
          className={`p-4 rounded-lg transition-colors ${
            activeView === 'queue'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
          }`}
        >
          <Clock className="w-6 h-6 mb-2" />
          <div className="text-sm font-medium">Request Queue</div>
        </button>
        
        <button
          onClick={() => setActiveView('polls')}
          className={`p-4 rounded-lg transition-colors ${
            activeView === 'polls'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
          }`}
        >
          <Vote className="w-6 h-6 mb-2" />
          <div className="text-sm font-medium">Polls</div>
        </button>
      </div>

      {/* Content */}
      <div>
        {activeView === 'browse' && <SongBrowser />}
        {activeView === 'queue' && <RequestQueue />}
        {activeView === 'polls' && <PollVoting />}
      </div>
    </div>
  );
}