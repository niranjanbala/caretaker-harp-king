'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface AdminAuthProps {
  onAuth: (pin: string) => boolean;
  modalId: string;
}

export default function AdminAuth({ onAuth, modalId }: AdminAuthProps) {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const isValid = onAuth(pin);
      
      if (isValid) {
        setPin('');
        const modal = document.getElementById(modalId) as HTMLDialogElement;
        modal?.close();
      } else {
        setError('Invalid PIN. Please try again.');
        setPin('');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPin('');
    setError('');
    setShowPin(false);
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.close();
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box w-96 max-w-md">
        <form method="dialog">
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-base-content">Admin Access</h3>
          <p className="text-base-content/70 mt-2">
            Enter the admin PIN to access management features
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content/70 mb-2">
              Admin PIN
            </label>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className={`input input-bordered w-full pr-12 ${
                  error ? 'input-error' : ''
                }`}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                pattern="[0-9]{4}"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-error text-sm mt-1">{error}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost flex-1"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isLoading || pin.length !== 4}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Unlock'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 p-3 bg-info/10 rounded-lg">
          <p className="text-xs text-info text-center">
            <Lock className="w-3 h-3 inline mr-1" />
            Admin access allows you to manage song requests, create polls, and view analytics
          </p>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
}