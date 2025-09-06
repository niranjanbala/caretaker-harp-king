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
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Your story<br />
            <span className="text-purple-600">starts here.</span>
          </h1>
          <p className="text-xl text-gray-600">
            Join the Caretaker Harp King experience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-lg font-bold text-gray-900 mb-3">
              Your Name *
            </label>
            <input
              id="name"
              type="text"
              value={profile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className={`w-full bg-white border-2 rounded-xl py-4 px-6 text-black placeholder-gray-400 focus:outline-none focus:ring-4 transition-all text-lg ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 focus:ring-purple-500/20 focus:border-purple-500'
              }`}
              maxLength={50}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-lg font-bold text-gray-900 mb-3">
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
              className={`w-full bg-white border-2 rounded-xl py-4 px-6 text-black placeholder-gray-400 focus:outline-none focus:ring-4 transition-all text-lg ${
                errors.age
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 focus:ring-purple-500/20 focus:border-purple-500'
              }`}
            />
            {errors.age && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.age}</p>
            )}
          </div>

          {/* Gender Field */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-4">
              Gender *
            </label>
            <div className="grid grid-cols-2 gap-4">
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('gender', option.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 text-lg font-medium ${
                    profile.gender === option.value
                      ? 'bg-purple-600 border-purple-500 text-white shadow-lg'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span>{option.label}</span>
                  {profile.gender === option.value && (
                    <Check className="w-5 h-5 ml-auto" />
                  )}
                </button>
              ))}
            </div>
            {errors.gender && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.gender}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-black text-xl py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Profile...
              </>
            ) : (
              <>
                Join the Experience
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg font-medium">
            Your profile helps us personalize your music experience
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              🔒 <strong>Privacy Protected</strong>
            </span>
            <span className="flex items-center gap-1">
              📱 <strong>Mobile Optimized</strong>
            </span>
            <span className="flex items-center gap-1">
              🎵 <strong>Music Ready</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}