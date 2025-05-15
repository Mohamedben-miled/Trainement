import { ExperienceLevel, FitnessGoal } from '@/types';

// Define the workout template interface
export interface WorkoutTemplate {
  name: string;
  description: string;
  daysPerWeek: number;
  workoutTypes: string[];
  exercisesPerWorkout: number;
  setsPerExercise: number;
  repRanges: string;
  restBetweenSets: number; // in seconds
  cardioMinutes: number;
  deloadFrequency: number; // in weeks
  fatigueManagement: {
    maxWeeklyVolume: number; // maximum sets per muscle group per week
    maxDailyFatigue: number; // maximum fatigue score per workout (1-10 scale)
    minRecoveryBetweenMuscleGroups: number; // in hours
    nervousSystemRecoveryDays: number; // days of low intensity after high intensity days
  };
  notes: string[];
}

// Create workout templates based on experience level and goals
const workoutTemplates: Record<ExperienceLevel, Record<FitnessGoal, WorkoutTemplate>> = {
  beginner: {
    fat_loss: {
      name: "Beginner Fat Loss Program",
      description: "A balanced program focused on building basic strength while creating a caloric deficit for fat loss.",
      daysPerWeek: 3,
      workoutTypes: ['full-body', 'cardio', 'full-body'],
      exercisesPerWorkout: 5,
      setsPerExercise: 3,
      repRanges: '10-15',
      restBetweenSets: 60,
      cardioMinutes: 20,
      deloadFrequency: 6,
      fatigueManagement: {
        maxWeeklyVolume: 12, // 12 sets per muscle group per week
        maxDailyFatigue: 6, // moderate fatigue per workout
        minRecoveryBetweenMuscleGroups: 48, // 48 hours between training the same muscle group
        nervousSystemRecoveryDays: 1 // 1 day of low intensity after high intensity
      },
      notes: [
        "Focus on proper form and technique before increasing weight",
        "Include 5-10 minutes of dynamic warm-up before each workout",
        "Aim for a caloric deficit of 300-500 calories per day",
        "Stay hydrated and prioritize protein intake"
      ]
    },
    muscle_gain: {
      name: "Beginner Muscle Building Program",
      description: "A progressive program designed to build muscle and strength foundations.",
      daysPerWeek: 3,
      workoutTypes: ['full-body', 'full-body', 'full-body'],
      exercisesPerWorkout: 6,
      setsPerExercise: 3,
      repRanges: '8-12',
      restBetweenSets: 90,
      cardioMinutes: 10,
      deloadFrequency: 8,
      fatigueManagement: {
        maxWeeklyVolume: 15, // 15 sets per muscle group per week
        maxDailyFatigue: 7, // moderate-high fatigue per workout
        minRecoveryBetweenMuscleGroups: 48, // 48 hours between training the same muscle group
        nervousSystemRecoveryDays: 1 // 1 day of low intensity after high intensity
      },
      notes: [
        "Focus on progressive overload - gradually increasing weight or reps",
        "Ensure adequate protein intake (1.6-2.2g per kg of bodyweight)",
        "Prioritize compound movements for maximum muscle stimulation",
        "Aim for a caloric surplus of 250-500 calories per day"
      ]
    },
    endurance: {
      name: "Beginner Endurance Program",
      description: "A program focused on building cardiovascular fitness and muscular endurance.",
      daysPerWeek: 4,
      workoutTypes: ['full-body', 'cardio', 'full-body', 'cardio'],
      exercisesPerWorkout: 4,
      setsPerExercise: 2,
      repRanges: '12-20',
      restBetweenSets: 45,
      cardioMinutes: 30,
      deloadFrequency: 6,
      fatigueManagement: {
        maxWeeklyVolume: 10, // 10 sets per muscle group per week
        maxDailyFatigue: 5, // moderate fatigue per workout
        minRecoveryBetweenMuscleGroups: 24, // 24 hours between training the same muscle group
        nervousSystemRecoveryDays: 1 // 1 day of low intensity after high intensity
      },
      notes: [
        "Focus on maintaining good form even when fatigued",
        "Gradually increase duration before intensity",
        "Stay well-hydrated before, during, and after workouts",
        "Include a mix of steady-state and interval training for cardio"
      ]
    },
    strength: {
      name: "Beginner Strength Foundation Program",
      description: "A program focused on building fundamental strength and proper technique.",
      daysPerWeek: 3,
      workoutTypes: ['full-body', 'full-body', 'full-body'],
      exercisesPerWorkout: 5,
      setsPerExercise: 4,
      repRanges: '5-8',
      restBetweenSets: 120,
      cardioMinutes: 10,
      deloadFrequency: 6,
      fatigueManagement: {
        maxWeeklyVolume: 12, // 12 sets per muscle group per week
        maxDailyFatigue: 7, // moderate-high fatigue per workout
        minRecoveryBetweenMuscleGroups: 48, // 48 hours between training the same muscle group
        nervousSystemRecoveryDays: 2 // 2 days of low intensity after high intensity
      },
      notes: [
        "Master proper form before increasing weight",
        "Focus on the main compound lifts: squat, bench press, deadlift, overhead press",
        "Ensure adequate recovery between workouts",
        "Track your lifts to ensure progressive overload"
      ]
    },
    general_fitness: {
      name: "Beginner General Fitness Program",
      description: "A balanced program to improve overall fitness, strength, and health.",
      daysPerWeek: 3,
      workoutTypes: ['full-body', 'cardio', 'full-body'],
      exercisesPerWorkout: 5,
      setsPerExercise: 3,
      repRanges: '8-15',
      restBetweenSets: 60,
      cardioMinutes: 20,
      deloadFrequency: 8,
      fatigueManagement: {
        maxWeeklyVolume: 10, // 10 sets per muscle group per week
        maxDailyFatigue: 5, // moderate fatigue per workout
        minRecoveryBetweenMuscleGroups: 48, // 48 hours between training the same muscle group
        nervousSystemRecoveryDays: 1 // 1 day of low intensity after high intensity
      },
      notes: [
        "Focus on consistency rather than intensity",
        "Include a variety of exercises for balanced development",
        "Incorporate flexibility and mobility work",
        "Listen to your body and adjust intensity as needed"
      ]
    }
  },
  intermediate: {
    fat_loss: {
      name: "Intermediate Fat Loss Program",
      description: "A structured program combining resistance training and cardio for optimal fat loss.",
      daysPerWeek: 4,
      workoutTypes: ['upper', 'lower', 'cardio/HIIT', 'full-body'],
      exercisesPerWorkout: 6,
      setsPerExercise: 3,
      repRanges: '10-15',
      restBetweenSets: 60,
      cardioMinutes: 25,
      deloadFrequency: 6,
      fatigueManagement: {
        maxWeeklyVolume: 16, // 16 sets per muscle group per week
        maxDailyFatigue: 7, // moderate-high fatigue per workout
        minRecoveryBetweenMuscleGroups: 48, // 48 hours between training the same muscle group
        nervousSystemRecoveryDays: 1 // 1 day of low intensity after high intensity
      },
      notes: [
        "Incorporate both strength training and cardio for optimal fat loss",
        "Consider adding metabolic conditioning circuits",
        "Maintain protein intake to preserve muscle mass",
        "Adjust caloric deficit based on progress (500-700 calories)"
      ]
    },
    muscle_gain: {
      name: "Intermediate Hypertrophy Program",
      description: "A split routine designed to maximize muscle growth with adequate recovery.",
      daysPerWeek: 5,
      workoutTypes: ['push', 'pull', 'legs', 'upper', 'lower'],
      exercisesPerWorkout: 5,
      setsPerExercise: 4,
      repRanges: '8-12',
      restBetweenSets: 90,
      cardioMinutes: 15,
      deloadFrequency: 8,
      fatigueManagement: {
        maxWeeklyVolume: 20, // 20 sets per muscle group per week
        maxDailyFatigue: 8, // high fatigue per workout
        minRecoveryBetweenMuscleGroups: 72, // 72 hours between training the same muscle group
        nervousSystemRecoveryDays: 2 // 2 days of low intensity after high intensity
      },
      notes: [
        "Focus on mind-muscle connection and controlled eccentrics",
        "Incorporate both compound and isolation exercises",
        "Ensure adequate protein intake and caloric surplus",
        "Prioritize sleep for optimal recovery and growth"
      ]
    },
    endurance: {
      name: "Intermediate Endurance Program",
      description: "A program designed to improve cardiovascular capacity and muscular endurance.",
      daysPerWeek: 5,
      workoutTypes: ['upper', 'cardio', 'lower', 'cardio', 'full-body'],
      exercisesPerWorkout: 5,
      setsPerExercise: 3,
      repRanges: '15-20',
      restBetweenSets: 45,
      cardioMinutes: 40,
      deloadFrequency: 6,
      fatigueManagement: {
        maxWeeklyVolume: 15, // 15 sets per muscle group per week
        maxDailyFatigue: 6, // moderate fatigue per workout
        minRecoveryBetweenMuscleGroups: 48, // 48 hours between training the same muscle group
        nervousSystemRecoveryDays: 1 // 1 day of low intensity after high intensity
      },
      notes: [
        "Incorporate interval training for improved cardiovascular capacity",
        "Focus on maintaining form during high-rep sets",
        "Include both steady-state and high-intensity cardio",
        "Pay attention to nutrition for optimal energy levels"
      ]
    },
    strength: {
      name: "Intermediate Strength Program",
      description: "A program focused on building maximal strength using periodization.",
      daysPerWeek: 4,
      workoutTypes: ['upper', 'lower', 'upper', 'lower'],
      exercisesPerWorkout: 5,
      setsPerExercise: 5,
      repRanges: '4-6',
      restBetweenSets: 180,
      cardioMinutes: 10,
      deloadFrequency: 4,
      fatigueManagement: {
        maxWeeklyVolume: 15, // 15 sets per muscle group per week
        maxDailyFatigue: 9, // very high fatigue per workout
        minRecoveryBetweenMuscleGroups: 72, // 72 hours between training the same muscle group
        nervousSystemRecoveryDays: 2 // 2 days of low intensity after high intensity
      },
      notes: [
        "Focus on progressive overload with the main compound lifts",
        "Incorporate regular deload weeks to prevent overtraining",
        "Prioritize technique and form over weight",
        "Consider using RPE (Rate of Perceived Exertion) to manage intensity"
      ]
    },
    general_fitness: {
      name: "Intermediate Balanced Fitness Program",
      description: "A well-rounded program to improve strength, endurance, and overall fitness.",
      daysPerWeek: 4,
      workoutTypes: ['upper', 'lower', 'cardio/HIIT', 'full-body'],
      exercisesPerWorkout: 6,
      setsPerExercise: 3,
      repRanges: '8-15',
      restBetweenSets: 60,
      cardioMinutes: 20,
      deloadFrequency: 8,
      fatigueManagement: {
        maxWeeklyVolume: 16, // 16 sets per muscle group per week
        maxDailyFatigue: 7, // moderate-high fatigue per workout
        minRecoveryBetweenMuscleGroups: 48, // 48 hours between training the same muscle group
        nervousSystemRecoveryDays: 1 // 1 day of low intensity after high intensity
      },
      notes: [
        "Balance strength, hypertrophy, and endurance training",
        "Include mobility work and flexibility training",
        "Vary intensity and volume throughout the program",
        "Focus on overall health markers beyond just physical performance"
      ]
    }
  },
  advanced: {
    fat_loss: {
      name: "Advanced Fat Loss Program",
      description: "A high-frequency program designed for maximum fat loss while preserving muscle mass.",
      daysPerWeek: 6,
      workoutTypes: ['push', 'pull', 'legs', 'upper', 'lower', 'HIIT'],
      exercisesPerWorkout: 6,
      setsPerExercise: 4,
      repRanges: '10-15',
      restBetweenSets: 45,
      cardioMinutes: 30,
      deloadFrequency: 4,
      fatigueManagement: {
        maxWeeklyVolume: 20, // 20 sets per muscle group per week
        maxDailyFatigue: 8, // high fatigue per workout
        minRecoveryBetweenMuscleGroups: 48, // 48 hours between training the same muscle group
        nervousSystemRecoveryDays: 1 // 1 day of low intensity after high intensity
      },
      notes: [
        "Incorporate strategic refeeds to maintain performance",
        "Use advanced techniques like drop sets and supersets",
        "Monitor recovery markers closely",
        "Adjust training volume based on energy levels"
      ]
    },
    muscle_gain: {
      name: "Advanced Hypertrophy Program",
      description: "A high-volume program using advanced techniques for maximum muscle growth.",
      daysPerWeek: 6,
      workoutTypes: ['push', 'pull', 'legs', 'push', 'pull', 'legs'],
      exercisesPerWorkout: 6,
      setsPerExercise: 4,
      repRanges: '6-12',
      restBetweenSets: 90,
      cardioMinutes: 15,
      deloadFrequency: 6,
      fatigueManagement: {
        maxWeeklyVolume: 24, // 24 sets per muscle group per week
        maxDailyFatigue: 9, // very high fatigue per workout
        minRecoveryBetweenMuscleGroups: 72, // 72 hours between training the same muscle group
        nervousSystemRecoveryDays: 2 // 2 days of low intensity after high intensity
      },
      notes: [
        "Incorporate advanced techniques like drop sets, rest-pause, and mechanical drop sets",
        "Vary rep ranges to target different muscle fibers",
        "Use periodization to manage fatigue and continue progress",
        "Focus on weak points and lagging muscle groups"
      ]
    },
    endurance: {
      name: "Advanced Endurance Program",
      description: "A comprehensive program for maximizing cardiovascular and muscular endurance.",
      daysPerWeek: 6,
      workoutTypes: ['upper', 'cardio', 'lower', 'cardio', 'full-body', 'long cardio'],
      exercisesPerWorkout: 6,
      setsPerExercise: 3,
      repRanges: '15-25',
      restBetweenSets: 30,
      cardioMinutes: 45,
      deloadFrequency: 4,
      fatigueManagement: {
        maxWeeklyVolume: 18, // 18 sets per muscle group per week
        maxDailyFatigue: 7, // moderate-high fatigue per workout
        minRecoveryBetweenMuscleGroups: 48, // 48 hours between training the same muscle group
        nervousSystemRecoveryDays: 1 // 1 day of low intensity after high intensity
      },
      notes: [
        "Incorporate periodized training with varying intensities",
        "Include both high-intensity intervals and long steady-state sessions",
        "Monitor heart rate recovery and resting heart rate",
        "Pay special attention to nutrition timing for optimal energy"
      ]
    },
    strength: {
      name: "Advanced Strength Program",
      description: "A specialized program focused on maximizing strength gains using advanced periodization.",
      daysPerWeek: 5,
      workoutTypes: ['squat focus', 'bench focus', 'deadlift focus', 'overhead press focus', 'accessory'],
      exercisesPerWorkout: 5,
      setsPerExercise: 5,
      repRanges: '1-5',
      restBetweenSets: 180,
      cardioMinutes: 10,
      deloadFrequency: 4,
      fatigueManagement: {
        maxWeeklyVolume: 15, // 15 sets per muscle group per week (lower volume, higher intensity)
        maxDailyFatigue: 10, // extremely high fatigue per workout
        minRecoveryBetweenMuscleGroups: 96, // 96 hours between training the same muscle group
        nervousSystemRecoveryDays: 3 // 3 days of low intensity after high intensity
      },
      notes: [
        "Use block periodization to focus on specific strength qualities",
        "Incorporate regular deload weeks to manage fatigue",
        "Monitor CNS fatigue through grip strength and jump performance",
        "Consider using RPE to autoregulate training intensity"
      ]
    },
    general_fitness: {
      name: "Advanced Comprehensive Fitness Program",
      description: "A high-level program balancing strength, hypertrophy, endurance, and functional fitness.",
      daysPerWeek: 6,
      workoutTypes: ['push/pull', 'legs/core', 'cardio/HIIT', 'upper', 'lower', 'functional'],
      exercisesPerWorkout: 6,
      setsPerExercise: 4,
      repRanges: '6-15',
      restBetweenSets: 60,
      cardioMinutes: 25,
      deloadFrequency: 6,
      fatigueManagement: {
        maxWeeklyVolume: 20, // 20 sets per muscle group per week
        maxDailyFatigue: 8, // high fatigue per workout
        minRecoveryBetweenMuscleGroups: 72, // 72 hours between training the same muscle group
        nervousSystemRecoveryDays: 2 // 2 days of low intensity after high intensity
      },
      notes: [
        "Incorporate a variety of training modalities (weights, bodyweight, cardio)",
        "Use periodization to focus on different fitness qualities throughout the year",
        "Include mobility work, flexibility, and recovery sessions",
        "Monitor various performance metrics to ensure balanced progress"
      ]
    }
  }
};

export default workoutTemplates;
