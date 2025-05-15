'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { WorkoutProgram, WorkoutDay, Workout, Exercise } from '@/types';
import { generateWorkoutProgram, checkOvertrainingRisks } from '@/lib/workoutGenerator';
import { calculateFatigueMetrics, FatigueMetrics } from '@/lib/fatigueManager';
import { useWorkoutLogStore } from '@/lib/store';
import exerciseDatabase from '@/data/exerciseDatabase';

// Mock user profile for demonstration
const mockUserProfile = {
  id: 'user-1',
  email: 'user@example.com',
  name: 'John Doe',
  age: 30,
  gender: 'male' as const,
  height: 180,
  weight: 80,
  experienceLevel: 'intermediate' as const,
  fitnessGoal: 'muscle_gain' as const,
  daysPerWeek: 4,
  timePerWorkout: 60,
  injuries: [],
  equipment: ['barbell', 'dumbbell', 'bench', 'pull-up bar'],
  preferences: {
    preferredExercises: ['bench press', 'squats', 'deadlifts'],
    dislikedExercises: [],
    focusAreas: ['chest', 'back']
  }
};

export default function WorkoutProgramPage() {
  const [program, setProgram] = useState<WorkoutProgram | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [safetyRecommendations, setSafetyRecommendations] = useState<string[]>([]);
  const [fatigueMetrics, setFatigueMetrics] = useState<FatigueMetrics | null>(null);
  const [showExerciseDetails, setShowExerciseDetails] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { logs } = useWorkoutLogStore();

  useEffect(() => {
    // In a real app, we would fetch the user profile and workout program from the database
    const generatedProgram = generateWorkoutProgram(mockUserProfile);
    setProgram(generatedProgram);

    // Check for overtraining risks
    const { recommendations } = checkOvertrainingRisks(mockUserProfile, logs);
    setSafetyRecommendations(recommendations);

    // Calculate fatigue metrics
    const metrics = calculateFatigueMetrics(logs, mockUserProfile.experienceLevel);
    setFatigueMetrics(metrics);

    setIsLoading(false);

    // Set the first non-rest day as the selected day
    if (generatedProgram) {
      const firstWeek = generatedProgram.weeks.find(week => week.weekNumber === 1);
      if (firstWeek) {
        const firstNonRestDay = firstWeek.days.find(day => !day.isRestDay);
        if (firstNonRestDay) {
          setSelectedDay(firstNonRestDay.dayOfWeek);
        }
      }
    }
  }, [logs]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">Generating your personalized workout program...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Failed to generate workout program. Please try again.</p>
        </div>
      </div>
    );
  }

  const currentWeek = program.weeks.find(week => week.weekNumber === selectedWeek);
  const selectedDayWorkouts = currentWeek?.days.find(day => day.dayOfWeek === selectedDay);

  const handleWeekChange = (weekNumber: number) => {
    setSelectedWeek(weekNumber);

    // Reset the selected day when changing weeks
    const week = program.weeks.find(w => w.weekNumber === weekNumber);
    if (week) {
      const firstNonRestDay = week.days.find(day => !day.isRestDay);
      if (firstNonRestDay) {
        setSelectedDay(firstNonRestDay.dayOfWeek);
      } else {
        setSelectedDay(week.days[0].dayOfWeek);
      }
    }
  };

  // Helper function to find exercise details from our database
  const findExerciseDetails = (exerciseName: string) => {
    for (const category in exerciseDatabase) {
      const found = exerciseDatabase[category].find(
        ex => ex.name.toLowerCase() === exerciseName.toLowerCase()
      );
      if (found) return found;
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{program.description}</p>

      {/* Fatigue Metrics */}
      {fatigueMetrics && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Recovery Status</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current Fatigue</span>
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  fatigueMetrics.currentFatigue > 7 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  fatigueMetrics.currentFatigue > 4 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {fatigueMetrics.currentFatigue}/10
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                <div
                  className={`h-2.5 rounded-full ${
                    fatigueMetrics.currentFatigue > 7 ? 'bg-red-500' :
                    fatigueMetrics.currentFatigue > 4 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${fatigueMetrics.currentFatigue * 10}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Nervous System</span>
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  fatigueMetrics.nervousSystemLoad > 7 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  fatigueMetrics.nervousSystemLoad > 4 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {fatigueMetrics.nervousSystemLoad}/10
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                <div
                  className={`h-2.5 rounded-full ${
                    fatigueMetrics.nervousSystemLoad > 7 ? 'bg-red-500' :
                    fatigueMetrics.nervousSystemLoad > 4 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${fatigueMetrics.nervousSystemLoad * 10}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overtraining Risk</span>
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  fatigueMetrics.overtrainingRisk > 7 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  fatigueMetrics.overtrainingRisk > 4 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {fatigueMetrics.overtrainingRisk}/10
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                <div
                  className={`h-2.5 rounded-full ${
                    fatigueMetrics.overtrainingRisk > 7 ? 'bg-red-500' :
                    fatigueMetrics.overtrainingRisk > 4 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${fatigueMetrics.overtrainingRisk * 10}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Muscle Group Recovery */}
          {Object.keys(fatigueMetrics.recoveryStatus).length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Muscle Group Recovery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(fatigueMetrics.recoveryStatus).map(([muscle, recovery]) => (
                  <div key={muscle} className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{muscle.charAt(0).toUpperCase() + muscle.slice(1)}</span>
                      <span className={`${
                        recovery >= 90 ? 'text-green-600 dark:text-green-400' :
                        recovery >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {recovery}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          recovery >= 90 ? 'bg-green-500' :
                          recovery >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${recovery}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Safety Recommendations */}
      {(safetyRecommendations.length > 0 || (fatigueMetrics && fatigueMetrics.warnings.length > 0)) && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">Safety Recommendations</h2>
          <ul className="list-disc pl-5 space-y-1">
            {safetyRecommendations.map((recommendation, index) => (
              <li key={`rec-${index}`} className="text-blue-700 dark:text-blue-400">{recommendation}</li>
            ))}
            {fatigueMetrics && fatigueMetrics.warnings.map((warning, index) => (
              <li key={`warn-${index}`} className="text-red-700 dark:text-red-400 font-medium">{warning}</li>
            ))}
            {fatigueMetrics && fatigueMetrics.recommendations.map((rec, index) => (
              <li key={`fatigue-rec-${index}`} className="text-blue-700 dark:text-blue-400">{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Week Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Week</h2>
        <div className="flex flex-wrap gap-2">
          {program.weeks.map(week => (
            <button
              key={week.weekNumber}
              onClick={() => handleWeekChange(week.weekNumber)}
              className={`px-4 py-2 rounded-md ${
                selectedWeek === week.weekNumber
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Week {week.weekNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Day Selection and Workout Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Day Selection */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {currentWeek?.days.map(day => (
              <button
                key={day.dayOfWeek}
                onClick={() => setSelectedDay(day.dayOfWeek)}
                className={`w-full text-left p-4 border-b last:border-b-0 flex justify-between items-center ${
                  selectedDay === day.dayOfWeek
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-l-blue-600'
                    : ''
                }`}
              >
                <div>
                  <span className="capitalize font-medium">{day.dayOfWeek}</span>
                  {day.isRestDay ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Rest Day</p>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {day.workouts.map(w => w.name).join(', ')}
                    </p>
                  )}
                </div>
                {!day.isRestDay && (
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {day.workouts[0]?.duration} min
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Workout Display */}
        <div className="lg:col-span-2">
          {selectedDayWorkouts?.isRestDay ? (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
              <h2 className="text-2xl font-semibold mb-2 text-green-800 dark:text-green-300">Rest Day</h2>
              <p className="text-green-700 dark:text-green-400">
                Today is a scheduled rest day. Rest is crucial for recovery and muscle growth.
                Consider light activities like walking, stretching, or yoga.
              </p>
            </div>
          ) : (
            <>
              {selectedDayWorkouts?.workouts.map(workout => (
                <div key={workout.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{workout.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        workout.intensity === 'high'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : workout.intensity === 'moderate'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                        {workout.intensity.charAt(0).toUpperCase() + workout.intensity.slice(1)} Intensity
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-sm">
                        {workout.duration} min
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-lg mb-2">Warm-up (5-10 minutes)</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Light cardio to increase heart rate, followed by dynamic stretches for the muscle groups you'll be working.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-lg mb-4">Main Workout</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exercise</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sets</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reps</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rest</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {workout.exercises.map((exercise, index) => (
                            <tr
                              key={exercise.id}
                              className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/20' : ''} cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10`}
                              onClick={() => setShowExerciseDetails(exercise.name)}
                            >
                              <td className="px-4 py-4">
                                <div className="font-medium flex items-center">
                                  {exercise.name}
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {exercise.muscleGroups.join(', ')}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">{exercise.sets}</td>
                              <td className="px-4 py-4 whitespace-nowrap">{exercise.reps}</td>
                              <td className="px-4 py-4 whitespace-nowrap">{exercise.restBetweenSets}s</td>
                              <td className="px-4 py-4">
                                {exercise.notes && <p className="text-sm">{exercise.notes}</p>}
                                {exercise.alternatives && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Alternatives: {exercise.alternatives.join(', ')}
                                  </p>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-2">Cool-down (5 minutes)</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Static stretches for the muscles worked, holding each stretch for 20-30 seconds.
                    </p>
                  </div>
                </div>
              ))}

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="font-medium text-lg mb-4">Workout Feedback</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  How did this workout feel? Your feedback helps us adjust your program.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Perceived Exertion (1-10)</label>
                    <input type="range" min="1" max="10" className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Easy</span>
                      <span>Moderate</span>
                      <span>Very Hard</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Energy Level (1-10)</label>
                    <input type="range" min="1" max="10" className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Any pain or discomfort?</label>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      placeholder="Describe any pain or discomfort you experienced..."
                      rows={3}
                    ></textarea>
                  </div>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Submit Feedback
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Exercise Details Modal */}
      {showExerciseDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {(() => {
                const exerciseDetails = findExerciseDetails(showExerciseDetails);
                if (!exerciseDetails) {
                  return (
                    <div className="text-center py-8">
                      <p>Exercise details not found.</p>
                      <button
                        onClick={() => setShowExerciseDetails(null)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Close
                      </button>
                    </div>
                  );
                }

                return (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold">{exerciseDetails.name}</h2>
                      <button
                        onClick={() => setShowExerciseDetails(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        {exerciseDetails.imageUrl && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img
                              src={exerciseDetails.imageUrl}
                              alt={exerciseDetails.name}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}

                        <div className="mb-4">
                          <h3 className="font-medium text-lg mb-2">Description</h3>
                          <p className="text-gray-700 dark:text-gray-300">{exerciseDetails.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Difficulty</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              exerciseDetails.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              exerciseDetails.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            }`}>
                              {exerciseDetails.difficulty.charAt(0).toUpperCase() + exerciseDetails.difficulty.slice(1)}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Fatigue Factor</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              exerciseDetails.fatigueFactor <= 4 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              exerciseDetails.fatigueFactor <= 7 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            }`}>
                              {exerciseDetails.fatigueFactor}/10
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <h3 className="font-medium text-lg mb-2">Instructions</h3>
                          <ol className="list-decimal pl-5 space-y-1">
                            {exerciseDetails.instructions.map((instruction, index) => (
                              <li key={index} className="text-gray-700 dark:text-gray-300">{instruction}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-medium text-lg mb-2">Tips</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {exerciseDetails.tips.map((tip, index) => (
                              <li key={index} className="text-gray-700 dark:text-gray-300">{tip}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-medium text-lg mb-2">Muscles Worked</h3>
                          <div className="mb-2">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {exerciseDetails.primaryMuscles.map(muscle => (
                                <span key={muscle} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs">
                                  {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Secondary</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {exerciseDetails.secondaryMuscles.map(muscle => (
                                <span key={muscle} className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
                                  {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-lg mb-2">Equipment</h3>
                          <div className="flex flex-wrap gap-1">
                            {exerciseDetails.equipment.map(item => (
                              <span key={item} className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                              </span>
                            ))}
                          </div>
                        </div>

                        {exerciseDetails.videoUrl && (
                          <div className="mt-4">
                            <a
                              href={exerciseDetails.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Watch Video Tutorial
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setShowExerciseDetails(null)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
