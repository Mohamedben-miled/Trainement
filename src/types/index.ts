// Types for the AI Gym Coach application

// User profile types
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type FitnessGoal = 'fat_loss' | 'muscle_gain' | 'endurance' | 'strength' | 'general_fitness';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age?: number;
  gender?: string;
  height?: number; // in cm
  weight?: number; // in kg
  experienceLevel: ExperienceLevel;
  fitnessGoals: FitnessGoal[];
  weeklyAvailability: WeeklyAvailability;
  injuries: Injury[];
  created_at: string;
  updated_at: string;
}

export interface WeeklyAvailability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface Injury {
  bodyPart: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  isRecovered: boolean;
}

// Workout program types
export interface WorkoutProgram {
  id: string;
  userId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  weeks: WorkoutWeek[];
  created_at: string;
  updated_at: string;
}

export interface WorkoutWeek {
  weekNumber: number;
  days: WorkoutDay[];
}

export interface WorkoutDay {
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  workouts: Workout[];
  isRestDay: boolean;
}

export interface Workout {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'recovery';
  exercises: Exercise[];
  duration: number; // in minutes
  intensity: 'low' | 'moderate' | 'high';
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  sets: number;
  reps: number | string; // Can be a range like "8-12" or a specific number
  weight?: number | string; // Can be "bodyweight" or a specific weight
  restBetweenSets: number; // in seconds
  notes?: string;
  alternatives?: string[]; // Alternative exercises if equipment is not available
}

// User feedback types
export interface WorkoutFeedback {
  id: string;
  userId: string;
  workoutId: string;
  completionDate: string;
  perceivedExertion: number; // Scale of 1-10
  energyLevel: number; // Scale of 1-10
  enjoymentLevel: number; // Scale of 1-10
  painPoints?: PainPoint[];
  notes?: string;
  created_at: string;
}

export interface PainPoint {
  bodyPart: string;
  painLevel: number; // Scale of 1-10
  description?: string;
}
