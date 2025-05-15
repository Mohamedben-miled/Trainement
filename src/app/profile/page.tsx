'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { ExperienceLevel, FitnessGoal, UserProfile, WeeklyAvailability, Injury } from '@/types';

// Define the form validation schema
const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  age: z.number().min(16, { message: 'You must be at least 16 years old' }).optional(),
  gender: z.string().optional(),
  height: z.number().min(100, { message: 'Height must be at least 100 cm' }).optional(),
  weight: z.number().min(30, { message: 'Weight must be at least 30 kg' }).optional(),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  fitnessGoals: z.array(z.enum(['fat_loss', 'muscle_gain', 'endurance', 'strength', 'general_fitness'])).min(1, { message: 'Select at least one fitness goal' }),
  weeklyAvailability: z.object({
    monday: z.array(z.object({
      startTime: z.string(),
      endTime: z.string()
    })).optional(),
    tuesday: z.array(z.object({
      startTime: z.string(),
      endTime: z.string()
    })).optional(),
    wednesday: z.array(z.object({
      startTime: z.string(),
      endTime: z.string()
    })).optional(),
    thursday: z.array(z.object({
      startTime: z.string(),
      endTime: z.string()
    })).optional(),
    friday: z.array(z.object({
      startTime: z.string(),
      endTime: z.string()
    })).optional(),
    saturday: z.array(z.object({
      startTime: z.string(),
      endTime: z.string()
    })).optional(),
    sunday: z.array(z.object({
      startTime: z.string(),
      endTime: z.string()
    })).optional(),
  }),
  injuries: z.array(z.object({
    bodyPart: z.string(),
    description: z.string(),
    severity: z.enum(['mild', 'moderate', 'severe']),
    isRecovered: z.boolean()
  })).optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const [availabilityDays, setAvailabilityDays] = useState<string[]>([]);
  const [injuries, setInjuries] = useState<Injury[]>([]);

  const { register, handleSubmit, control, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      experienceLevel: 'beginner',
      fitnessGoals: ['general_fitness'],
      weeklyAvailability: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      },
      injuries: []
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // In a real app, this would save to the database
      console.log('Form data:', data);
      
      // Navigate to the workout program page
      router.push('/workout-program');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const toggleAvailabilityDay = (day: string) => {
    if (availabilityDays.includes(day)) {
      setAvailabilityDays(availabilityDays.filter(d => d !== day));
    } else {
      setAvailabilityDays([...availabilityDays, day]);
    }
  };

  const addInjury = () => {
    setInjuries([...injuries, {
      bodyPart: '',
      description: '',
      severity: 'mild',
      isRecovered: false
    }]);
  };

  const removeInjury = (index: number) => {
    const newInjuries = [...injuries];
    newInjuries.splice(index, 1);
    setInjuries(newInjuries);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Fitness Profile</h1>
      <p className="mb-8">Complete your profile to get a personalized workout program</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                {...register('name')}
                className="w-full p-2 border rounded-md"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                {...register('age', { valueAsNumber: true })}
                className="w-full p-2 border rounded-md"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select {...register('gender')} className="w-full p-2 border rounded-md">
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Height (cm)</label>
              <input
                type="number"
                {...register('height', { valueAsNumber: true })}
                className="w-full p-2 border rounded-md"
              />
              {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                {...register('weight', { valueAsNumber: true })}
                className="w-full p-2 border rounded-md"
              />
              {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
            </div>
          </div>
        </div>
        
        {/* Fitness Goals & Experience */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Fitness Goals & Experience</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Experience Level</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="beginner"
                  {...register('experienceLevel')}
                  className="mr-2"
                />
                Beginner
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="intermediate"
                  {...register('experienceLevel')}
                  className="mr-2"
                />
                Intermediate
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="advanced"
                  {...register('experienceLevel')}
                  className="mr-2"
                />
                Advanced
              </label>
            </div>
            {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Fitness Goals (select at least one)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="fat_loss"
                  {...register('fitnessGoals')}
                  className="mr-2"
                />
                Fat Loss
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="muscle_gain"
                  {...register('fitnessGoals')}
                  className="mr-2"
                />
                Muscle Gain
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="endurance"
                  {...register('fitnessGoals')}
                  className="mr-2"
                />
                Endurance
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="strength"
                  {...register('fitnessGoals')}
                  className="mr-2"
                />
                Strength
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="general_fitness"
                  {...register('fitnessGoals')}
                  className="mr-2"
                />
                General Fitness
              </label>
            </div>
            {errors.fitnessGoals && <p className="text-red-500 text-sm mt-1">{errors.fitnessGoals.message}</p>}
          </div>
        </div>
        
        {/* Weekly Availability */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Weekly Availability</h2>
          <p className="mb-4">Select the days you're available to workout</p>
          
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-6">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleAvailabilityDay(day)}
                className={`p-2 rounded-md text-center capitalize ${
                  availabilityDays.includes(day)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          
          {availabilityDays.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Set your available time slots</h3>
              
              {availabilityDays.map((day) => (
                <div key={day} className="border-t pt-4">
                  <h4 className="font-medium capitalize mb-2">{day}</h4>
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="block text-sm mb-1">Start Time</label>
                      <input
                        type="time"
                        {...register(`weeklyAvailability.${day}.0.startTime` as any)}
                        className="p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">End Time</label>
                      <input
                        type="time"
                        {...register(`weeklyAvailability.${day}.0.endTime` as any)}
                        className="p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Injuries & Limitations */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Injuries & Limitations</h2>
          <p className="mb-4">Add any injuries or physical limitations we should know about</p>
          
          <button
            type="button"
            onClick={addInjury}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Injury
          </button>
          
          {injuries.map((injury, index) => (
            <div key={index} className="border-t pt-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Injury {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeInjury(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm mb-1">Body Part</label>
                  <input
                    type="text"
                    {...register(`injuries.${index}.bodyPart` as any)}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., Knee, Shoulder, Back"
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Severity</label>
                  <select
                    {...register(`injuries.${index}.severity` as any)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-2">
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  {...register(`injuries.${index}.description` as any)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Describe your injury..."
                  rows={2}
                ></textarea>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register(`injuries.${index}.isRecovered` as any)}
                    className="mr-2"
                  />
                  This injury is fully recovered
                </label>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Generate My Workout Program
          </button>
        </div>
      </form>
    </div>
  );
}
