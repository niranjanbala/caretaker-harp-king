'use client';

import { useState } from 'react';
import { User, Calendar, Users, ArrowRight, Check, Zap } from 'lucide-react';

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
    { value: 'male', label: 'Male', emoji: '👨', color: 'from-blue-500 to-blue-600' },
    { value: 'female', label: 'Female', emoji: '👩', color: 'from-pink-500 to-pink-600' },
    { value: 'non-binary', label: 'Non-Binary', emoji: '🧑', color: 'from-purple-500 to-purple-600' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say', emoji: '🤐', color: 'from-gray-500 to-gray-600' }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-purple-500 rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <User className="w-16 h-16 text-black" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Your story</span><br />
            <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
              starts here.
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 font-semibold">
            Join the Caretaker Harp King experience
          </p>
        </div>

        {/* High-Contrast Form */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-2xl font-black text-gray-900 mb-4">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full bg-gray-50 border-4 rounded-2xl py-6 px-8 text-black placeholder-gray-400 focus:outline-none focus:ring-4 transition-all text-xl font-semibold ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500/20 bg-red-50' 
                    : 'border-gray-300 focus:ring-green-500/20 focus:border-green-500 focus:bg-white'
                }`}
                maxLength={50}
              />
              {errors.name && (
                <p className="mt-3 text-lg text-red-600 font-bold">{errors.name}</p>
              )}
            </div>

            {/* Age Field */}
            <div>
              <label htmlFor="age" className="block text-2xl font-black text-gray-900 mb-4">
                Your Age *
              </label>
              <input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Enter your age"
                min="1"
                max="120"
                className={`w-full bg-gray-50 border-4 rounded-2xl py-6 px-8 text-black placeholder-gray-400 focus:outline-none focus:ring-4 transition-all text-xl font-semibold ${
                  errors.age 
                    ? 'border-red-500 focus:ring-red-500/20 bg-red-50' 
                    : 'border-gray-300 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white'
                }`}
              />
              {errors.age && (
                <p className="mt-3 text-lg text-red-600 font-bold">{errors.age}</p>
              )}
            </div>

            {/* Gender Field - Big Colorful Buttons */}
            <div>
              <label className="block text-2xl font-black text-gray-900 mb-6">
                Gender *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange('gender', option.value)}
                    className={`p-6 rounded-2xl border-4 transition-all duration-200 flex items-center gap-4 text-xl font-bold ${
                      profile.gender === option.value
                        ? `bg-gradient-to-r ${option.color} text-white border-white shadow-2xl scale-105`
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-lg hover:scale-102'
                    }`}
                  >
                    <span className="text-3xl">{option.emoji}</span>
                    <span className="flex-1">{option.label}</span>
                    {profile.gender === option.value && (
                      <Check className="w-6 h-6" />
                    )}
                  </button>
                ))}
              </div>
              {errors.gender && (
                <p className="mt-3 text-lg text-red-600 font-bold">{errors.gender}</p>
              )}
            </div>

            {/* MASSIVE Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-400 hover:via-green-500 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-500 text-black font-black text-2xl md:text-3xl py-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-6 shadow-2xl hover:shadow-green-500/25 disabled:cursor-not-allowed border-4 border-green-400 hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <div className="w-8 h-8 border-4 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>CREATING PROFILE...</span>
                </>
              ) : (
                <>
                  <Zap className="w-10 h-10" />
                  <span>JOIN THE EXPERIENCE NOW</span>
                  <ArrowRight className="w-10 h-10" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer with Social Proof */}
        <div className="mt-12 text-center">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-gray-300 text-lg font-semibold mb-4">
              🎵 Your profile helps us personalize your music experience
            </p>
            <div className="flex items-center justify-center gap-8 text-green-400 font-bold">
              <span className="flex items-center gap-2">
                🔒 <strong>Privacy Protected</strong>
              </span>
              <span className="flex items-center gap-2">
                📱 <strong>Mobile Optimized</strong>
              </span>
              <span className="flex items-center gap-2">
                🎵 <strong>Music Ready</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}