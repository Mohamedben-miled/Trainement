import {
  UserProfile,
  WorkoutProgram,
  WorkoutWeek,
  WorkoutDay,
  Workout,
  Exercise,
  ExperienceLevel,
  FitnessGoal
} from '@/types';

// Exercise database - in a real app, this would come from a database
const exerciseDatabase: Record<string, Exercise[]> = {
  chest: [
    {
      id: 'bench-press',
      name: 'Bench Press',
      muscleGroups: ['chest', 'triceps', 'shoulders'],
      sets: 3,
      reps: '8-12',
      restBetweenSets: 90,
      alternatives: ['Push-ups', 'Dumbbell Press']
    },
    {
      id: 'incline-press',
      name: 'Incline Bench Press',
      muscleGroups: ['upper chest', 'shoulders', 'triceps'],
      sets: 3,
      reps: '8-12',
      restBetweenSets: 90,
      alternatives: ['Incline Push-ups', 'Incline Dumbbell Press']
    },
    // More exercises would be added here
  ],
  back: [
    {
      id: 'pull-ups',
      name: 'Pull-ups',
      muscleGroups: ['back', 'biceps'],
      sets: 3,
      reps: '6-10',
      restBetweenSets: 90,
      alternatives: ['Lat Pulldowns', 'Assisted Pull-ups']
    },
    {
      id: 'rows',
      name: 'Bent Over Rows',
      muscleGroups: ['back', 'biceps'],
      sets: 3,
      reps: '8-12',
      restBetweenSets: 90,
      alternatives: ['Dumbbell Rows', 'Cable Rows']
    },
    // More exercises would be added here
  ],
  legs: [
    {
      id: 'squats',
      name: 'Barbell Squats',
      muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
      sets: 3,
      reps: '8-12',
      restBetweenSets: 120,
      alternatives: ['Goblet Squats', 'Leg Press']
    },
    {
      id: 'deadlifts',
      name: 'Deadlifts',
      muscleGroups: ['hamstrings', 'glutes', 'back'],
      sets: 3,
      reps: '6-10',
      restBetweenSets: 120,
      alternatives: ['Romanian Deadlifts', 'Good Mornings']
    },
    // More exercises would be added here
  ],
  // More muscle groups would be added here
};

// Workout templates based on experience level and goals
const workoutTemplates: Record<ExperienceLevel, Record<FitnessGoal, any>> = {
  beginner: {
    fat_loss: {
      daysPerWeek: 3,
      workoutTypes: ['full-body', 'full-body', 'full-body'],
      exercisesPerWorkout: 5,
      setsPerExercise: 3,
      repRanges: '10-15',
      restBetweenSets: 60,
      cardioMinutes: 20,
    },
    muscle_gain: {
      daysPerWeek: 3,
      workoutTypes: ['full-body', 'full-body', 'full-body'],
      exercisesPerWorkout: 6,
      setsPerExercise: 3,
      repRanges: '8-12',
      restBetweenSets: 90,
      cardioMinutes: 10,
    },
    // More goals would be added here
    endurance: {
      daysPerWeek: 4,
      workoutTypes: ['full-body', 'cardio', 'full-body', 'cardio'],
      exercisesPerWorkout: 4,
      setsPerExercise: 2,
      repRanges: '12-20',
      restBetweenSets: 45,
      cardioMinutes: 30,
    },
    strength: {
      daysPerWeek: 3,
      workoutTypes: ['full-body', 'full-body', 'full-body'],
      exercisesPerWorkout: 5,
      setsPerExercise: 4,
      repRanges: '5-8',
      restBetweenSets: 120,
      cardioMinutes: 10,
    },
    general_fitness: {
      daysPerWeek: 3,
      workoutTypes: ['full-body', 'cardio', 'full-body'],
      exercisesPerWorkout: 5,
      setsPerExercise: 3,
      repRanges: '8-15',
      restBetweenSets: 60,
      cardioMinutes: 20,
    }
  },
  intermediate: {
    // Templates for intermediate level would be defined here
    fat_loss: {
      daysPerWeek: 4,
      workoutTypes: ['upper', 'lower', 'upper', 'lower'],
      exercisesPerWorkout: 6,
      setsPerExercise: 3,
      repRanges: '10-15',
      restBetweenSets: 60,
      cardioMinutes: 25,
    },
    muscle_gain: {
      daysPerWeek: 4,
      workoutTypes: ['upper', 'lower', 'push/pull', 'legs'],
      exercisesPerWorkout: 6,
      setsPerExercise: 4,
      repRanges: '8-12',
      restBetweenSets: 90,
      cardioMinutes: 15,
    },
    endurance: {
      daysPerWeek: 5,
      workoutTypes: ['upper', 'lower', 'cardio', 'full-body', 'cardio'],
      exercisesPerWorkout: 5,
      setsPerExercise: 3,
      repRanges: '12-20',
      restBetweenSets: 45,
      cardioMinutes: 40,
    },
    strength: {
      daysPerWeek: 4,
      workoutTypes: ['upper', 'lower', 'upper', 'lower'],
      exercisesPerWorkout: 5,
      setsPerExercise: 5,
      repRanges: '4-8',
      restBetweenSets: 150,
      cardioMinutes: 10,
    },
    general_fitness: {
      daysPerWeek: 4,
      workoutTypes: ['upper', 'lower', 'cardio', 'full-body'],
      exercisesPerWorkout: 6,
      setsPerExercise: 3,
      repRanges: '8-15',
      restBetweenSets: 60,
      cardioMinutes: 20,
    }
  },
  advanced: {
    // Templates for advanced level would be defined here
    fat_loss: {
      daysPerWeek: 5,
      workoutTypes: ['push', 'pull', 'legs', 'upper', 'lower'],
      exercisesPerWorkout: 7,
      setsPerExercise: 4,
      repRanges: '10-15',
      restBetweenSets: 60,
      cardioMinutes: 30,
    },
    muscle_gain: {
      daysPerWeek: 6,
      workoutTypes: ['push', 'pull', 'legs', 'push', 'pull', 'legs'],
      exercisesPerWorkout: 6,
      setsPerExercise: 4,
      repRanges: '6-12',
      restBetweenSets: 90,
      cardioMinutes: 15,
    },
    endurance: {
      daysPerWeek: 6,
      workoutTypes: ['upper', 'lower', 'cardio', 'upper', 'lower', 'cardio'],
      exercisesPerWorkout: 6,
      setsPerExercise: 3,
      repRanges: '15-25',
      restBetweenSets: 30,
      cardioMinutes: 45,
    },
    strength: {
      daysPerWeek: 5,
      workoutTypes: ['push', 'pull', 'legs', 'upper', 'lower'],
      exercisesPerWorkout: 5,
      setsPerExercise: 5,
      repRanges: '3-6',
      restBetweenSets: 180,
      cardioMinutes: 10,
    },
    general_fitness: {
      daysPerWeek: 5,
      workoutTypes: ['push', 'pull', 'legs', 'cardio', 'full-body'],
      exercisesPerWorkout: 6,
      setsPerExercise: 4,
      repRanges: '8-15',
      restBetweenSets: 60,
      cardioMinutes: 25,
    }
  }
};

/**
 * Generate a workout program based on user profile
 */
export function generateWorkoutProgram(userProfile: UserProfile): WorkoutProgram {
  // Get the primary fitness goal
  const primaryGoal = userProfile.fitnessGoal;

  // Get the template based on experience level and primary goal
  const template = workoutTemplates[userProfile.experienceLevel][primaryGoal];

  // Generate a 4-week program
  const weeks: WorkoutWeek[] = [];
  for (let weekNumber = 1; weekNumber <= 4; weekNumber++) {
    weeks.push(generateWorkoutWeek(weekNumber, userProfile, template));
  }

  return {
    id: `program-${Date.now()}`,
    name: `${primaryGoal.replace('_', ' ')} Program`,
    description: `A ${userProfile.experienceLevel} level program focused on ${primaryGoal.replace('_', ' ')}`,
    userProfileId: userProfile.id,
    experienceLevel: userProfile.experienceLevel,
    fitnessGoal: userProfile.fitnessGoal,
    weeks,
    deloadFrequency: 4,
    progressionStrategy: 'progressive overload',
    notes: ['Focus on proper form', 'Increase weight when you can complete all sets and reps with good form']
  };
}

/**
 * Generate a workout week
 */
function generateWorkoutWeek(weekNumber: number, userProfile: UserProfile, template: any): WorkoutWeek {
  const days: WorkoutDay[] = [];
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  // Use the user's preferred number of workout days per week
  const workoutDaysCount = Math.min(userProfile.daysPerWeek, 7);

  // For simplicity, we'll just use the first N days of the week
  // In a real app, we would use the user's preferred days
  const workoutDays = daysOfWeek.slice(0, workoutDaysCount);

  // Create workout days
  daysOfWeek.forEach(dayOfWeek => {
    const isWorkoutDay = workoutDays.includes(dayOfWeek);

    days.push({
      dayOfWeek,
      workouts: isWorkoutDay ? [generateWorkout(dayOfWeek, weekNumber, userProfile, template)] : [],
      isRestDay: !isWorkoutDay
    });
  });

  return {
    weekNumber,
    days
  };
}

/**
 * Generate a single workout
 */
function generateWorkout(dayOfWeek: string, weekNumber: number, userProfile: UserProfile, template: any): Workout {
  // Determine the workout type for this day
  const dayIndex = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].indexOf(dayOfWeek);
  const workoutTypeIndex = dayIndex % template.workoutTypes.length;
  const workoutType = template.workoutTypes[workoutTypeIndex];

  // Generate exercises based on workout type
  const exercises = generateExercisesForWorkout(workoutType, userProfile, template);

  return {
    id: `workout-${Date.now()}-${dayOfWeek}`,
    name: `${workoutType.charAt(0).toUpperCase() + workoutType.slice(1)} Workout`,
    type: workoutType.includes('cardio') ? 'cardio' : 'strength',
    exercises,
    duration: calculateWorkoutDuration(exercises, template),
    intensity: determineWorkoutIntensity(weekNumber, userProfile.experienceLevel)
  };
}

/**
 * Generate exercises for a workout
 */
function generateExercisesForWorkout(workoutType: string, userProfile: UserProfile, template: any): Exercise[] {
  const exercises: Exercise[] = [];

  // Select exercises based on workout type
  if (workoutType === 'full-body') {
    // Add exercises for major muscle groups
    addExercisesFromMuscleGroup(exercises, 'chest', 1, template);
    addExercisesFromMuscleGroup(exercises, 'back', 1, template);
    addExercisesFromMuscleGroup(exercises, 'legs', 2, template);
    // Add more muscle groups as needed
  } else if (workoutType === 'upper') {
    // Add upper body exercises
    addExercisesFromMuscleGroup(exercises, 'chest', 2, template);
    addExercisesFromMuscleGroup(exercises, 'back', 2, template);
    // Add more upper body muscle groups
  } else if (workoutType === 'lower') {
    // Add lower body exercises
    addExercisesFromMuscleGroup(exercises, 'legs', 4, template);
    // Add more lower body muscle groups
  } else if (workoutType === 'push') {
    // Add pushing exercises
    addExercisesFromMuscleGroup(exercises, 'chest', 3, template);
    // Add more pushing muscle groups
  } else if (workoutType === 'pull') {
    // Add pulling exercises
    addExercisesFromMuscleGroup(exercises, 'back', 3, template);
    // Add more pulling muscle groups
  } else if (workoutType === 'legs') {
    // Add leg exercises
    addExercisesFromMuscleGroup(exercises, 'legs', 5, template);
  } else if (workoutType === 'cardio') {
    // Add cardio exercises (this would be expanded in a real app)
    exercises.push({
      id: 'cardio-1',
      name: 'Treadmill Running',
      muscleGroups: ['cardiovascular'],
      sets: 1,
      reps: `${template.cardioMinutes} minutes`,
      restBetweenSets: 0,
      notes: 'Maintain a moderate pace that allows you to speak in short sentences'
    });
  }

  // Adjust exercises based on injuries
  adjustExercisesForInjuries(exercises, userProfile.injuries);

  return exercises;
}

/**
 * Add exercises from a specific muscle group
 */
function addExercisesFromMuscleGroup(exercises: Exercise[], muscleGroup: string, count: number, template: any): void {
  const muscleExercises = exerciseDatabase[muscleGroup] || [];

  // Randomly select 'count' exercises from this muscle group
  const selectedExercises = muscleExercises
    .sort(() => 0.5 - Math.random())
    .slice(0, count);

  // Adjust sets and reps based on the template
  selectedExercises.forEach(exercise => {
    exercises.push({
      ...exercise,
      sets: template.setsPerExercise,
      reps: template.repRanges,
      restBetweenSets: template.restBetweenSets
    });
  });
}

/**
 * Adjust exercises based on user injuries
 */
function adjustExercisesForInjuries(exercises: Exercise[], injuries: any[]): void {
  if (!injuries || injuries.length === 0) return;

  // Map of body parts to affected exercises
  const bodyPartExerciseMap: Record<string, string[]> = {
    'shoulder': ['Bench Press', 'Overhead Press', 'Incline Bench Press'],
    'knee': ['Squats', 'Lunges', 'Leg Extensions'],
    'back': ['Deadlifts', 'Bent Over Rows', 'Good Mornings'],
    // Add more mappings as needed
  };

  // Check each injury
  injuries.forEach(injury => {
    if (injury.isRecovered) return; // Skip if recovered

    const affectedExercises = bodyPartExerciseMap[injury.bodyPart] || [];

    // Replace affected exercises with alternatives
    exercises.forEach((exercise, index) => {
      if (affectedExercises.includes(exercise.name)) {
        // If there's an alternative, use it
        if (exercise.alternatives && exercise.alternatives.length > 0) {
          const alternative = exercise.alternatives[0];
          exercises[index] = {
            ...exercise,
            name: alternative,
            notes: `Modified due to ${injury.bodyPart} injury. Use lighter weight and focus on form.`
          };
        } else {
          // If no alternative, add a note to be careful
          exercises[index] = {
            ...exercise,
            notes: `Be cautious due to ${injury.bodyPart} injury. Use lighter weight and stop if pain occurs.`
          };
        }
      }
    });
  });
}

/**
 * Calculate the total duration of a workout
 */
function calculateWorkoutDuration(exercises: Exercise[], template: any): number {
  if (exercises.length === 0) return 0;

  // If it's a cardio workout with just one exercise
  if (exercises.length === 1 && exercises[0].name.includes('Running')) {
    return template.cardioMinutes + 10; // Add 10 minutes for warm-up/cool-down
  }

  // For strength workouts, calculate based on sets, reps, and rest times
  let totalMinutes = 10; // 10 minutes for warm-up

  exercises.forEach(exercise => {
    // Estimate 45 seconds per set plus rest time
    const setTime = 45 + exercise.restBetweenSets / 60;
    totalMinutes += exercise.sets * setTime;
  });

  totalMinutes += 5; // 5 minutes for cool-down

  return Math.round(totalMinutes);
}

/**
 * Determine workout intensity based on week number and experience level
 */
function determineWorkoutIntensity(weekNumber: number, experienceLevel: ExperienceLevel): 'low' | 'moderate' | 'high' {
  // For beginners, start with low intensity and gradually increase
  if (experienceLevel === 'beginner') {
    if (weekNumber === 1) return 'low';
    if (weekNumber === 2 || weekNumber === 3) return 'moderate';
    return 'high';
  }

  // For intermediate, start with moderate and increase
  if (experienceLevel === 'intermediate') {
    if (weekNumber === 1) return 'moderate';
    return 'high';
  }

  // For advanced, always high intensity with deload on week 4
  if (weekNumber === 4) return 'moderate'; // Deload week
  return 'high';
}

/**
 * Check for overtraining risks
 */
export function checkOvertrainingRisks(userProfile: UserProfile, recentFeedback: any[]): { isOvertraining: boolean, recommendations: string[] } {
  const recommendations: string[] = [];
  let isOvertraining = false;

  // If we have recent feedback, analyze it
  if (recentFeedback && recentFeedback.length > 0) {
    // Calculate average perceived exertion
    const avgExertion = recentFeedback.reduce((sum, feedback) => sum + feedback.perceivedExertion, 0) / recentFeedback.length;

    // Calculate average energy level
    const avgEnergy = recentFeedback.reduce((sum, feedback) => sum + feedback.energyLevel, 0) / recentFeedback.length;

    // Check for signs of overtraining
    if (avgExertion > 8 && avgEnergy < 4) {
      isOvertraining = true;
      recommendations.push('Your recent workouts have been very intense while your energy levels are low. Consider taking an extra rest day this week.');
    }

    // Check for consistent pain points
    const painPoints = recentFeedback.flatMap(feedback => feedback.painPoints || []);
    const painBodyParts = painPoints.map(pain => pain.bodyPart);

    // Count occurrences of each body part
    const painCounts: Record<string, number> = {};
    painBodyParts.forEach(part => {
      painCounts[part] = (painCounts[part] || 0) + 1;
    });

    // Check if any body part is consistently causing pain
    Object.entries(painCounts).forEach(([part, count]) => {
      if (count >= 2) { // If pain in same area reported multiple times
        recommendations.push(`You've reported pain in your ${part} multiple times. Consider seeing a healthcare professional and avoiding exercises that target this area.`);
      }
    });
  }

  // Add general recommendations based on experience level
  if (userProfile.experienceLevel === 'beginner') {
    recommendations.push('As a beginner, focus on proper form rather than lifting heavy weights. This will build a foundation for future progress.');
  } else if (userProfile.experienceLevel === 'intermediate') {
    recommendations.push('Make sure to include deload weeks every 4-6 weeks to allow your body to recover fully.');
  } else if (userProfile.experienceLevel === 'advanced') {
    recommendations.push('Consider tracking your heart rate variability (HRV) to better monitor recovery and prevent overtraining.');
  }

  return { isOvertraining, recommendations };
}

/**
 * Adapt workout program based on user feedback
 */
export function adaptWorkoutProgram(program: WorkoutProgram, feedback: any[]): WorkoutProgram {
  // Clone the program to avoid modifying the original
  const adaptedProgram = JSON.parse(JSON.stringify(program)) as WorkoutProgram;

  // If no feedback, return the original program
  if (!feedback || feedback.length === 0) return adaptedProgram;

  // Calculate average perceived exertion
  const avgExertion = feedback.reduce((sum, item) => sum + item.perceivedExertion, 0) / feedback.length;

  // Adjust workout intensity based on feedback
  adaptedProgram.weeks.forEach(week => {
    week.days.forEach(day => {
      day.workouts.forEach(workout => {
        // If perceived exertion is too high, reduce intensity
        if (avgExertion > 8) {
          workout.intensity = lowerIntensity(workout.intensity);

          // Reduce sets or reps for exercises
          workout.exercises.forEach(exercise => {
            if (typeof exercise.sets === 'number' && exercise.sets > 2) {
              exercise.sets -= 1;
            }
          });
        }
        // If perceived exertion is too low, increase intensity
        else if (avgExertion < 5) {
          workout.intensity = higherIntensity(workout.intensity);

          // Increase sets or reps for exercises
          workout.exercises.forEach(exercise => {
            if (typeof exercise.sets === 'number') {
              exercise.sets += 1;
            }
          });
        }
      });
    });
  });

  return adaptedProgram;
}

/**
 * Lower the intensity level
 */
function lowerIntensity(intensity: 'low' | 'moderate' | 'high'): 'low' | 'moderate' | 'high' {
  if (intensity === 'high') return 'moderate';
  if (intensity === 'moderate') return 'low';
  return 'low';
}

/**
 * Higher the intensity level
 */
function higherIntensity(intensity: 'low' | 'moderate' | 'high'): 'low' | 'moderate' | 'high' {
  if (intensity === 'low') return 'moderate';
  if (intensity === 'moderate') return 'high';
  return 'high';
}
