'use client';

import { useState } from 'react';
import { User, Calendar, Users, ArrowRight, Check, Zap } from 'lucide-react';
import KimoyoButton from '@/components/ui/KimoyoButton';

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
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        {/* Single Fold Profile Form - Perfectly Centered */}
        <div className="max-w-2xl mx-auto">
          
          {/* Hero Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">Your story</span><br />
              <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                starts here.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-semibold">
              Join the Caretaker Harp King experience
            </p>
          </div>

          {/* Compact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Age - Side by Side */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-lg font-bold text-white mb-2">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter name"
                    className={`w-full bg-white/90 border-2 rounded-xl py-3 px-4 text-black placeholder-gray-500 focus:outline-none focus:ring-4 transition-all font-semibold ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-white/20 focus:ring-green-500/20 focus:border-green-500'
                    }`}
                    maxLength={50}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 font-medium">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="age" className="block text-lg font-bold text-white mb-2">
                    Your Age *
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Age"
                    min="1"
                    max="120"
                    className={`w-full bg-white/90 border-2 rounded-xl py-3 px-4 text-black placeholder-gray-500 focus:outline-none focus:ring-4 transition-all font-semibold ${
                      errors.age 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-white/20 focus:ring-purple-500/20 focus:border-purple-500'
                    }`}
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-400 font-medium">{errors.age}</p>
                  )}
                </div>
              </div>

              {/* Gender - Compact Grid */}
              <div>
                <label className="block text-lg font-bold text-white mb-3 text-center">
                  Gender *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {genderOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('gender', option.value)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 font-medium ${
                        profile.gender === option.value
                          ? `bg-gradient-to-r ${option.color} text-white border-white shadow-lg scale-105`
                          : 'bg-white/10 border-white/20 text-white hover:border-white/40 hover:bg-white/20'
                      }`}
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="text-sm">{option.label}</span>
                      {profile.gender === option.value && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
                {errors.gender && (
                  <p className="mt-2 text-sm text-red-400 font-medium text-center">{errors.gender}</p>
                )}
              </div>

            </form>
          </div>

          {/* MASSIVE Kimoyo CTA */}
          <div>
            <KimoyoButton
              onClick={handleSubmit}
              variant="primary"
              size="xl"
              intensity="bold"
              beads={20}
              orbitDuration={10}
              className="text-xl md:text-2xl lg:text-3xl py-6 md:py-8 px-8 md:px-12 font-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>CREATING PROFILE...</span>
                </>
              ) : (
                <>
                  <Zap className="w-8 h-8" />
                  <span>JOIN THE EXPERIENCE NOW</span>
                  <ArrowRight className="w-8 h-8" />
                </>
              )}
            </KimoyoButton>
            
            <p className="mt-4 text-green-400 text-lg font-bold">
              ⚡ Free to join • 🔥 Limited spots • 🎵 Ready for Sunday
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}