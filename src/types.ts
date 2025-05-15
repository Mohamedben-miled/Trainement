// User profile types
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type FitnessGoal = 'fat_loss' | 'muscle_gain' | 'strength' | 'endurance' | 'general_fitness';
export type Gender = 'male' | 'female' | 'other';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  experienceLevel: ExperienceLevel;
  fitnessGoal: FitnessGoal;
  daysPerWeek: number;
  timePerWorkout: number; // in minutes
  injuries: string[];
  equipment: string[];
  preferences: {
    preferredExercises: string[];
    dislikedExercises: string[];
    focusAreas: string[];
  };
}

// Workout program types
export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  userProfileId: string;
  experienceLevel: ExperienceLevel;
  fitnessGoal: FitnessGoal;
  weeks: WorkoutWeek[];
  deloadFrequency: number;
  progressionStrategy: string;
  notes: string[];
}

export interface WorkoutWeek {
  weekNumber: number;
  days: WorkoutDay[];
  notes?: string;
}

export interface WorkoutDay {
  dayOfWeek: string;
  isRestDay: boolean;
  workout?: Workout;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  type: string;
  targetMuscleGroups: string[];
  exercises: Exercise[];
  warmup?: Exercise[];
  cooldown?: Exercise[];
  estimatedDuration: number; // in minutes
  intensity: 'low' | 'moderate' | 'high';
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  sets: number;
  reps: string;
  restBetweenSets: number; // in seconds
  tempo?: string;
  notes?: string;
  alternatives?: string[];
}

// Workout log types
export interface WorkoutLog {
  id: string;
  date: string;
  workoutId: string;
  workoutName: string;
  exercises: ExerciseLog[];
  notes: string;
  perceivedExertion: number; // 1-10 scale
  energyLevel: number; // 1-10 scale
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
}

export interface SetLog {
  weight: number;
  reps: number;
  completed: boolean;
}

// Progress tracking types
export interface ProgressEntry {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  photoUrl?: string;
}

// Notes/journal types
export interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

// Workout template types
export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  experienceLevel: ExperienceLevel;
  fitnessGoal: FitnessGoal;
  daysPerWeek: number;
  workoutTypes: string[];
  exercises: {
    [key: string]: {
      name: string;
      sets: number;
      reps: string;
      restBetweenSets: number;
    }[];
  };
  principles: string[];
  notes: string[];
}

// Specialized template types
export interface SpecializedTemplate {
  id: string;
  name: string;
  category: 'powerlifting' | 'bodybuilding' | 'strength' | 'hypertrophy' | 'functional' | 'athletic';
  split: '2-day' | '3-day' | '4-day' | '5-day' | '6-day' | 'full-body';
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  schedule: {
    day: string;
    focus: string;
    exercises: {
      name: string;
      sets: number;
      reps: string;
      rest: number;
      notes?: string;
    }[];
  }[];
  principles: string[];
  notes: string[];
}

// Exercise database types
export interface ExerciseData {
  id: string;
  name: string;
  muscleGroups: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  instructions: string[];
  tips: string[];
  imageUrl: string;
  videoUrl?: string;
  alternatives: string[];
  fatigueFactor: number;
  recoveryTime: number;
}
