'use client';

import { useState } from 'react';
import { User, Calendar, Users, ArrowRight, Check } from 'lucide-react';

interface ProfileData {
  name: string;
  age: string;
  gender: string;
}

interface ProfileFormProps {
  onProfileComplete: (profile: ProfileData) => void;
}

export default function ProfileForm({ onProfileComplete }: ProfileFormProps) {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    age: '',
    gender: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ProfileData>>({});

  const genderOptions = [
    { value: 'male', label: 'Male', emoji: '👨' },
    { value: 'female', label: 'Female', emoji: '👩' },
    { value: 'non-binary', label: 'Non-Binary', emoji: '🧑' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say', emoji: '🤐' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileData> = {};

    if (!profile.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (profile.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!profile.age.trim()) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = parseInt(profile.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = 'Please enter a valid age (1-120)';
      }
    }

    if (!profile.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onProfileComplete(profile);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <User className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
          <p className="text-gray-400">
            Join the Caretaker Harp King experience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Your Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full bg-gray-800 border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-gray-600 focus:ring-green-500/50 focus:border-green-500'
                }`}
                maxLength={50}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
              Your Age *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Enter your age"
                min="1"
                max="120"
                className={`w-full bg-gray-800 border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.age 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-gray-600 focus:ring-green-500/50 focus:border-green-500'
                }`}
              />
            </div>
            {errors.age && (
              <p className="mt-1 text-sm text-red-400">{errors.age}</p>
            )}
          </div>

          {/* Gender Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Gender *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('gender', option.value)}
                  className={`p-3 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                    profile.gender === option.value
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                  {profile.gender === option.value && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-400">{errors.gender}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Creating Profile...
              </>
            ) : (
              <>
                Join the Experience
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Your profile helps us personalize your music experience
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-600">
            <span>🔒 Privacy Protected</span>
            <span>•</span>
            <span>📱 Mobile Optimized</span>
            <span>•</span>
            <span>🎵 Music Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}