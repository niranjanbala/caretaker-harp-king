'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { SongRequest } from '@/types';
import { GripVertical, Play, Pause, Check, X, Clock, User } from 'lucide-react';

export default function DragDropQueue() {
  const { requests, updateRequestStatus, removeRequest, reorderRequests, setNowPlaying } = useAppStore();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const playingRequest = requests.find(r => r.status === 'playing');

  const handleDragStart = (e: React.DragEvent, requestId: string) => {
    setDraggedItem(requestId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', requestId);
  };

  const handleDragOver = (e: React.DragEvent, requestId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(requestId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = pendingRequests.findIndex(r => r.id === draggedItem);
    const targetIndex = pendingRequests.findIndex(r => r.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newRequests = [...requests];
    const draggedRequest = pendingRequests[draggedIndex];
    const targetRequest = pendingRequests[targetIndex];

    // Find actual indices in the full requests array
    const actualDraggedIndex = newRequests.findIndex(r => r.id === draggedItem);
    const actualTargetIndex = newRequests.findIndex(r => r.id === targetId);

    // Remove dragged item and insert at target position
    newRequests.splice(actualDraggedIndex, 1);
    const newTargetIndex = actualTargetIndex > actualDraggedIndex ? actualTargetIndex - 1 : actualTargetIndex;
    newRequests.splice(newTargetIndex, 0, draggedRequest);

    reorderRequests(newRequests);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handlePlayRequest = (request: SongRequest) => {
    // Stop current playing song
    if (playingRequest) {
      updateRequestStatus(playingRequest.id, 'played');
    }
    
    // Start new song
    updateRequestStatus(request.id, 'playing');
    setNowPlaying(request);
  };

  const handleCompleteRequest = (requestId: string) => {
    updateRequestStatus(requestId, 'played');
    setNowPlaying(undefined);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Currently Playing */}
      {playingRequest && (
        <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-400">Now Playing</h3>
              <p className="text-sm text-gray-300">Live performance in progress</p>
            </div>
            <button
              onClick={() => handleCompleteRequest(playingRequest.id)}
              className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Complete
            </button>
          </div>
          
          <div className="bg-black/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">{playingRequest.song.title}</h4>
                <p className="text-sm text-gray-300">by {playingRequest.song.artist}</p>
              </div>
              <div className="text-right text-sm text-gray-400">
                {playingRequest.requesterName && (
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {playingRequest.requesterName}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTime(playingRequest.timestamp)}
                </div>
              </div>
            </div>
            {playingRequest.dedication && (
              <div className="mt-2 p-2 bg-gray-800/50 rounded text-sm text-gray-300">
                <strong>Dedication:</strong> {playingRequest.dedication}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Queue Management */}
      <div className="bg-gray-900 rounded-lg">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Request Queue</h2>
          <p className="text-sm text-gray-400">
            {pendingRequests.length} pending requests • Drag to reorder
          </p>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No pending requests</p>
            <p className="text-sm">Requests will appear here as they come in</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {pendingRequests.map((request, index) => (
              <div
                key={request.id}
                draggable
                onDragStart={(e) => handleDragStart(e, request.id)}
                onDragOver={(e) => handleDragOver(e, request.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, request.id)}
                onDragEnd={handleDragEnd}
                className={`p-4 transition-all duration-200 ${
                  draggedItem === request.id
                    ? 'opacity-50 scale-95'
                    : dragOverItem === request.id
                    ? 'bg-gray-700 scale-105'
                    : 'hover:bg-gray-800'
                } ${index === 0 ? 'bg-blue-600/10 border-l-4 border-blue-500' : ''}`}
              >
                <div className="flex items-center gap-3">
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Queue Position */}
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium text-gray-300">
                    {index + 1}
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{request.song.title}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      by {request.song.artist} • {request.song.category}
                    </p>
                    {request.requesterName && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <User className="w-3 h-3" />
                        {request.requesterName}
                      </div>
                    )}
                  </div>

                  {/* Request Time */}
                  <div className="text-xs text-gray-500 text-right">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(request.timestamp)}
                    </div>
                    {request.claps > 0 && (
                      <div className="mt-1 text-yellow-400">
                        👏 {request.claps}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayRequest(request)}
                      className="bg-green-500 hover:bg-green-600 text-black p-2 rounded-lg transition-colors"
                      title="Play now"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeRequest(request.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                      title="Remove request"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Dedication */}
                {request.dedication && (
                  <div className="mt-3 ml-16 p-2 bg-gray-800/50 rounded text-sm text-gray-300">
                    <strong>Dedication:</strong> {request.dedication}
                  </div>
                )}

                {/* Next Up Indicator */}
                {index === 0 && (
                  <div className="mt-2 ml-16">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                      <Play className="w-3 h-3" />
                      Next up
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}