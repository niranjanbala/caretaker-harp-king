'use client';

import { useAppStore } from '@/lib/store';
import { Clock, User, Heart, MessageCircle, Music, CheckCircle, XCircle } from 'lucide-react';

export default function RequestQueue() {
  const { requests, addClap } = useAppStore();

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const playedRequests = requests.filter(r => r.status === 'played');
  const currentRequest = requests.find(r => r.status === 'playing');

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleClap = (requestId: string) => {
    addClap(requestId);
  };

  return (
    <div className="space-y-6">
      {/* Currently Playing */}
      {currentRequest && (
        <div className="card bg-primary/5 border border-primary/20">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <h3 className="font-bold text-primary">Currently Playing</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-base-content">
                  {currentRequest.song.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <User className="w-3 h-3" />
                  <span>{currentRequest.song.artist}</span>
                  {currentRequest.requesterName && (
                    <>
                      <span>•</span>
                      <span>Requested by {currentRequest.requesterName}</span>
                    </>
                  )}
                </div>
                {currentRequest.dedication && (
                  <div className="mt-2 p-2 bg-base-200/50 rounded text-sm italic">
                    "{currentRequest.dedication}"
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">
                    {currentRequest.claps}
                  </div>
                  <div className="text-xs text-base-content/50">claps</div>
                </div>
                <button
                  onClick={() => handleClap(currentRequest.id)}
                  className="btn btn-primary btn-sm btn-circle"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Queue */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title">
              <Clock className="w-5 h-5" />
              Pending Requests
            </h3>
            <div className="badge badge-primary">
              {pendingRequests.length} in queue
            </div>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="text-center py-8 text-base-content/50">
              <Music className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No pending requests</p>
              <p className="text-sm">Be the first to request a song!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((request, index) => (
                <div
                  key={request.id}
                  className="flex items-center gap-4 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base-content truncate">
                      {request.song.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <User className="w-3 h-3" />
                      <span>{request.song.artist}</span>
                      <span>•</span>
                      <span>{formatTime(request.timestamp)}</span>
                      {request.requesterName && (
                        <>
                          <span>•</span>
                          <span>{request.requesterName}</span>
                        </>
                      )}
                    </div>
                    {request.dedication && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-base-content/60">
                        <MessageCircle className="w-3 h-3" />
                        <span className="truncate">"{request.dedication}"</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="font-medium text-base-content">
                        {request.claps}
                      </div>
                      <div className="text-xs text-base-content/50">claps</div>
                    </div>
                    <button
                      onClick={() => handleClap(request.id)}
                      className="btn btn-ghost btn-sm btn-circle"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recently Played */}
      {playedRequests.length > 0 && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h3 className="card-title">
                <CheckCircle className="w-5 h-5" />
                Recently Played
              </h3>
              <div className="badge badge-success">
                {playedRequests.length} completed
              </div>
            </div>

            <div className="space-y-2">
              {playedRequests
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 5)
                .map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center gap-3 p-2 bg-success/5 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-base-content truncate">
                        {request.song.title}
                      </div>
                      <div className="text-sm text-base-content/70">
                        by {request.song.artist}
                        {request.requesterName && ` • ${request.requesterName}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-base-content/60">
                      <Heart className="w-3 h-3" />
                      <span>{request.claps}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}