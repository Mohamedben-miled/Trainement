import { WorkoutLog, Exercise } from '@/types';
import exerciseDatabase, { ExerciseData } from '@/data/exerciseDatabase';

// Interface for fatigue metrics
export interface FatigueMetrics {
  currentFatigue: number; // 1-10 scale
  nervousSystemLoad: number; // 1-10 scale
  muscleGroupFatigue: Record<string, number>; // Fatigue level per muscle group (1-10)
  recoveryStatus: Record<string, number>; // Recovery percentage per muscle group (0-100%)
  overtrainingRisk: number; // 1-10 scale
  recommendedRestDays: number;
  warnings: string[];
  recommendations: string[];
}

// Calculate fatigue metrics based on recent workout logs
export function calculateFatigueMetrics(
  recentLogs: WorkoutLog[],
  userExperienceLevel: 'beginner' | 'intermediate' | 'advanced',
  lastRestDay?: string // ISO date string of last rest day
): FatigueMetrics {
  // Initialize metrics
  const metrics: FatigueMetrics = {
    currentFatigue: 0,
    nervousSystemLoad: 0,
    muscleGroupFatigue: {},
    recoveryStatus: {},
    overtrainingRisk: 0,
    recommendedRestDays: 0,
    warnings: [],
    recommendations: []
  };

  // If no logs, return baseline metrics
  if (!recentLogs || recentLogs.length === 0) {
    metrics.recommendations.push('Start logging your workouts to track fatigue and recovery.');
    return metrics;
  }

  // Sort logs by date (newest first)
  const sortedLogs = [...recentLogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate days since last workout
  const lastWorkoutDate = new Date(sortedLogs[0].date);
  const daysSinceLastWorkout = Math.floor(
    (new Date().getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate days since last rest day
  let daysSinceLastRest = 7; // Default to a week if unknown
  if (lastRestDay) {
    daysSinceLastRest = Math.floor(
      (new Date().getTime() - new Date(lastRestDay).getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // Initialize muscle group tracking
  const muscleGroupLastWorked: Record<string, Date> = {};
  const muscleGroupVolume: Record<string, number> = {}; // Sets per muscle group in last 7 days

  // Process each workout log
  sortedLogs.forEach((log, index) => {
    const workoutDate = new Date(log.date);
    const daysAgo = Math.floor(
      (new Date().getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Only consider workouts from the last 7 days for current fatigue
    if (daysAgo <= 7) {
      // Add to overall fatigue based on perceived exertion and recency
      metrics.currentFatigue += (log.perceivedExertion * (8 - daysAgo)) / 8;

      // Process exercises to track muscle groups
      log.exercises.forEach(exercise => {
        // Find exercise in database to get muscle groups
        const exerciseInfo = findExerciseInDatabase(exercise.exerciseName);
        
        if (exerciseInfo) {
          // Track when each muscle group was last worked
          [...exerciseInfo.primaryMuscles, ...exerciseInfo.secondaryMuscles].forEach(muscle => {
            // Update last worked date if this is more recent
            if (!muscleGroupLastWorked[muscle] || workoutDate > muscleGroupLastWorked[muscle]) {
              muscleGroupLastWorked[muscle] = workoutDate;
            }

            // Track volume (sets) per muscle group
            if (daysAgo <= 7) {
              // Primary muscles get full volume, secondary get half
              const volumeMultiplier = exerciseInfo.primaryMuscles.includes(muscle) ? 1 : 0.5;
              muscleGroupVolume[muscle] = (muscleGroupVolume[muscle] || 0) + 
                (exercise.sets.length * volumeMultiplier);
            }
          });

          // Add to nervous system load based on exercise fatigue factor
          if (daysAgo <= 3) { // Only consider last 3 days for CNS fatigue
            metrics.nervousSystemLoad += 
              (exerciseInfo.fatigueFactor * (4 - daysAgo)) / 4 * 
              (exercise.sets.length / 3); // Normalize by typical set count
          }
        }
      });
    }
  });

  // Normalize fatigue scores
  metrics.currentFatigue = Math.min(10, metrics.currentFatigue);
  metrics.nervousSystemLoad = Math.min(10, metrics.nervousSystemLoad);

  // Calculate muscle group fatigue and recovery status
  Object.entries(muscleGroupLastWorked).forEach(([muscle, lastWorkedDate]) => {
    const hoursSinceWorked = 
      (new Date().getTime() - lastWorkedDate.getTime()) / (1000 * 60 * 60);
    
    // Find typical recovery time for this muscle group
    const typicalRecoveryHours = getTypicalRecoveryTime(muscle, userExperienceLevel);
    
    // Calculate recovery percentage (capped at 100%)
    const recoveryPercentage = Math.min(100, (hoursSinceWorked / typicalRecoveryHours) * 100);
    metrics.recoveryStatus[muscle] = Math.round(recoveryPercentage);
    
    // Calculate fatigue level (inverse of recovery, with volume consideration)
    const volumeFactor = (muscleGroupVolume[muscle] || 0) / getOptimalWeeklyVolume(muscle, userExperienceLevel);
    metrics.muscleGroupFatigue[muscle] = Math.round(
      (10 - (recoveryPercentage / 10)) * Math.min(1.5, volumeFactor)
    );
  });

  // Calculate overtraining risk
  metrics.overtrainingRisk = calculateOvertrainingRisk(
    metrics.currentFatigue,
    metrics.nervousSystemLoad,
    daysSinceLastRest,
    userExperienceLevel
  );

  // Generate warnings
  if (metrics.overtrainingRisk >= 8) {
    metrics.warnings.push('HIGH RISK OF OVERTRAINING: Immediate rest is recommended.');
  } else if (metrics.overtrainingRisk >= 6) {
    metrics.warnings.push('Moderate risk of overtraining. Consider reducing workout intensity.');
  }

  if (metrics.nervousSystemLoad >= 8) {
    metrics.warnings.push('Central nervous system fatigue is high. Avoid high-intensity workouts.');
  }

  // Check for overworked muscle groups
  Object.entries(metrics.muscleGroupFatigue).forEach(([muscle, fatigue]) => {
    if (fatigue >= 8) {
      metrics.warnings.push(`${capitalizeFirstLetter(muscle)} is overworked and needs recovery.`);
    }
  });

  // Calculate recommended rest days
  if (metrics.overtrainingRisk >= 8) {
    metrics.recommendedRestDays = 3;
  } else if (metrics.overtrainingRisk >= 6) {
    metrics.recommendedRestDays = 2;
  } else if (metrics.overtrainingRisk >= 4 || metrics.nervousSystemLoad >= 7) {
    metrics.recommendedRestDays = 1;
  } else {
    metrics.recommendedRestDays = 0;
  }

  // Generate recommendations
  if (metrics.recommendedRestDays > 0) {
    metrics.recommendations.push(
      `Take ${metrics.recommendedRestDays} day(s) of rest or active recovery (light walking, stretching).`
    );
  }

  // Recommend deload if sustained high fatigue
  if (sortedLogs.length >= 8 && 
      sortedLogs.slice(0, 8).every(log => log.perceivedExertion >= 8)) {
    metrics.recommendations.push(
      'Consider a deload week with reduced volume and intensity.'
    );
  }

  // Recommend focusing on recovered muscle groups
  const recoveredMuscles = Object.entries(metrics.recoveryStatus)
    .filter(([_, recovery]) => recovery >= 90)
    .map(([muscle, _]) => muscle);
  
  if (recoveredMuscles.length > 0) {
    metrics.recommendations.push(
      `Well-recovered muscle groups: ${recoveredMuscles.map(capitalizeFirstLetter).join(', ')}`
    );
  }

  return metrics;
}

// Helper function to find exercise in database
function findExerciseInDatabase(exerciseName: string): ExerciseData | undefined {
  // Search through all categories
  for (const category in exerciseDatabase) {
    const found = exerciseDatabase[category].find(
      ex => ex.name.toLowerCase() === exerciseName.toLowerCase()
    );
    if (found) return found;
  }
  return undefined;
}

// Helper function to get typical recovery time for a muscle group
function getTypicalRecoveryTime(muscle: string, experienceLevel: string): number {
  // Base recovery times in hours
  const baseRecoveryTimes: Record<string, number> = {
    // Large muscle groups
    'quadriceps': 72,
    'hamstrings': 72,
    'glutes': 72,
    'latissimus dorsi': 72,
    'pectoralis major': 72,
    'erector spinae': 72,
    
    // Medium muscle groups
    'trapezius': 48,
    'deltoids': 48,
    'rhomboids': 48,
    'biceps': 48,
    'triceps': 48,
    'calves': 48,
    
    // Smaller muscle groups
    'forearms': 24,
    'abdominals': 24,
    'obliques': 24
  };

  // Adjust based on experience level
  const experienceMultiplier = {
    'beginner': 1.2, // Beginners need more recovery
    'intermediate': 1.0,
    'advanced': 0.8 // Advanced lifters recover faster
  };

  // Default to 48 hours if muscle not found
  const baseTime = baseRecoveryTimes[muscle.toLowerCase()] || 48;
  return baseTime * (experienceMultiplier[experienceLevel] || 1.0);
}

// Helper function to get optimal weekly volume for a muscle group
function getOptimalWeeklyVolume(muscle: string, experienceLevel: string): number {
  // Base optimal sets per week
  const baseVolume: Record<string, number> = {
    // Large muscle groups
    'quadriceps': 16,
    'hamstrings': 16,
    'glutes': 16,
    'latissimus dorsi': 16,
    'pectoralis major': 16,
    'erector spinae': 12,
    
    // Medium muscle groups
    'trapezius': 12,
    'deltoids': 16,
    'rhomboids': 12,
    'biceps': 14,
    'triceps': 14,
    'calves': 16,
    
    // Smaller muscle groups
    'forearms': 12,
    'abdominals': 16,
    'obliques': 12
  };

  // Adjust based on experience level
  const experienceMultiplier = {
    'beginner': 0.7, // Beginners need less volume
    'intermediate': 1.0,
    'advanced': 1.3 // Advanced lifters can handle more volume
  };

  // Default to 14 sets if muscle not found
  const base = baseVolume[muscle.toLowerCase()] || 14;
  return base * (experienceMultiplier[experienceLevel] || 1.0);
}

// Calculate overtraining risk on a scale of 1-10
function calculateOvertrainingRisk(
  currentFatigue: number,
  nervousSystemLoad: number,
  daysSinceLastRest: number,
  experienceLevel: string
): number {
  // Base calculation
  let risk = (currentFatigue * 0.4) + (nervousSystemLoad * 0.4) + (Math.min(7, daysSinceLastRest) * 0.2);
  
  // Adjust based on experience level
  const experienceMultiplier = {
    'beginner': 1.2, // Beginners are at higher risk
    'intermediate': 1.0,
    'advanced': 0.9 // Advanced lifters can handle more
  };
  
  risk *= experienceMultiplier[experienceLevel] || 1.0;
  
  return Math.min(10, Math.round(risk));
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
