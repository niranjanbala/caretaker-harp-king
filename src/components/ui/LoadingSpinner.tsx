'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text, 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} role="status" aria-live="polite">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-green-500`} aria-hidden="true" />
      {text && (
        <p className="mt-2 text-sm text-gray-400">{text}</p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Skeleton loader for song items
export function SongItemSkeleton() {
  return (
    <div className="lg:grid lg:grid-cols-12 gap-4 px-3 lg:px-4 py-3 animate-pulse">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded"></div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-700 rounded mb-1"></div>
            <div className="h-3 bg-gray-800 rounded w-3/4"></div>
          </div>
          <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:contents">
        <div className="col-span-1 flex items-center">
          <div className="w-6 h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="col-span-6 flex items-center min-w-0">
          <div className="min-w-0 flex-1">
            <div className="h-4 bg-gray-700 rounded mb-1"></div>
            <div className="h-3 bg-gray-800 rounded w-2/3"></div>
          </div>
        </div>
        <div className="col-span-2 flex items-center">
          <div className="h-3 bg-gray-800 rounded w-16"></div>
        </div>
        <div className="col-span-2 flex items-center">
          <div className="h-3 bg-gray-800 rounded w-12"></div>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <div className="h-3 bg-gray-800 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
}

// Loading state for the entire song list
export function SongListSkeleton() {
  return (
    <div className="bg-gray-900/50 rounded-lg overflow-hidden">
      {/* Table Header - Hidden on mobile */}
      <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-800">
        <div className="col-span-1 h-3 bg-gray-800 rounded"></div>
        <div className="col-span-6 h-3 bg-gray-800 rounded"></div>
        <div className="col-span-2 h-3 bg-gray-800 rounded"></div>
        <div className="col-span-2 h-3 bg-gray-800 rounded"></div>
        <div className="col-span-1 h-3 bg-gray-800 rounded"></div>
      </div>

      {/* Song Rows */}
      <div className="divide-y divide-gray-800">
        {Array.from({ length: 8 }).map((_, index) => (
          <SongItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

// Error state component
export function ErrorState({ 
  title = "Something went wrong", 
  message = "Please try again later",
  onRetry,
  className = ""
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}