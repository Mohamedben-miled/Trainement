'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useWorkoutLogStore } from '@/lib/store';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the form validation schema
const exerciseSchema = z.object({
  exerciseId: z.string(),
  exerciseName: z.string(),
  sets: z.array(z.object({
    weight: z.number().min(0),
    reps: z.number().min(0),
    completed: z.boolean()
  }))
});

const workoutLogSchema = z.object({
  date: z.string(),
  workoutId: z.string(),
  workoutName: z.string(),
  exercises: z.array(exerciseSchema),
  notes: z.string().optional(),
  perceivedExertion: z.number().min(1).max(10),
  energyLevel: z.number().min(1).max(10)
});

type WorkoutLogFormData = z.infer<typeof workoutLogSchema>;

// Sample workout templates
const workoutTemplates = [
  {
    id: 'workout-1',
    name: 'Full Body Workout',
    exercises: [
      {
        exerciseId: 'ex-1',
        exerciseName: 'Barbell Squat',
        sets: [
          { weight: 60, reps: 10, completed: false },
          { weight: 70, reps: 8, completed: false },
          { weight: 80, reps: 6, completed: false }
        ]
      },
      {
        exerciseId: 'ex-2',
        exerciseName: 'Bench Press',
        sets: [
          { weight: 50, reps: 10, completed: false },
          { weight: 60, reps: 8, completed: false },
          { weight: 65, reps: 6, completed: false }
        ]
      },
      {
        exerciseId: 'ex-3',
        exerciseName: 'Bent Over Row',
        sets: [
          { weight: 40, reps: 10, completed: false },
          { weight: 45, reps: 10, completed: false },
          { weight: 50, reps: 8, completed: false }
        ]
      },
      {
        exerciseId: 'ex-4',
        exerciseName: 'Overhead Press',
        sets: [
          { weight: 30, reps: 10, completed: false },
          { weight: 35, reps: 8, completed: false },
          { weight: 40, reps: 6, completed: false }
        ]
      }
    ]
  },
  {
    id: 'workout-2',
    name: 'Upper Body Push',
    exercises: [
      {
        exerciseId: 'ex-5',
        exerciseName: 'Incline Bench Press',
        sets: [
          { weight: 45, reps: 10, completed: false },
          { weight: 50, reps: 8, completed: false },
          { weight: 55, reps: 6, completed: false }
        ]
      },
      {
        exerciseId: 'ex-6',
        exerciseName: 'Dumbbell Shoulder Press',
        sets: [
          { weight: 15, reps: 10, completed: false },
          { weight: 17.5, reps: 8, completed: false },
          { weight: 20, reps: 6, completed: false }
        ]
      },
      {
        exerciseId: 'ex-7',
        exerciseName: 'Tricep Pushdown',
        sets: [
          { weight: 20, reps: 12, completed: false },
          { weight: 25, reps: 10, completed: false },
          { weight: 30, reps: 8, completed: false }
        ]
      }
    ]
  },
  {
    id: 'workout-3',
    name: 'Lower Body',
    exercises: [
      {
        exerciseId: 'ex-8',
        exerciseName: 'Deadlift',
        sets: [
          { weight: 80, reps: 8, completed: false },
          { weight: 90, reps: 6, completed: false },
          { weight: 100, reps: 4, completed: false }
        ]
      },
      {
        exerciseId: 'ex-9',
        exerciseName: 'Leg Press',
        sets: [
          { weight: 100, reps: 12, completed: false },
          { weight: 120, reps: 10, completed: false },
          { weight: 140, reps: 8, completed: false }
        ]
      },
      {
        exerciseId: 'ex-10',
        exerciseName: 'Leg Curl',
        sets: [
          { weight: 40, reps: 12, completed: false },
          { weight: 45, reps: 10, completed: false },
          { weight: 50, reps: 8, completed: false }
        ]
      },
      {
        exerciseId: 'ex-11',
        exerciseName: 'Calf Raise',
        sets: [
          { weight: 60, reps: 15, completed: false },
          { weight: 70, reps: 12, completed: false },
          { weight: 80, reps: 10, completed: false }
        ]
      }
    ]
  }
];

export default function LogWorkoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { addLog } = useWorkoutLogStore();
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const { register, handleSubmit, control, setValue, watch, reset, formState: { errors } } = useForm<WorkoutLogFormData>({
    resolver: zodResolver(workoutLogSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      workoutId: '',
      workoutName: '',
      exercises: [],
      notes: '',
      perceivedExertion: 7,
      energyLevel: 7
    }
  });

  const { fields, replace } = useFieldArray({
    control,
    name: 'exercises'
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  // Load template when selected
  useEffect(() => {
    if (selectedTemplate) {
      const template = workoutTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        setValue('workoutId', template.id);
        setValue('workoutName', template.name);
        replace(template.exercises);
      }
    }
  }, [selectedTemplate, setValue, replace]);

  const onSubmit = (data: WorkoutLogFormData) => {
    // Add the workout log
    addLog({
      id: `log-${Date.now()}`,
      date: data.date,
      workoutId: data.workoutId,
      workoutName: data.workoutName,
      exercises: data.exercises,
      notes: data.notes || '',
      perceivedExertion: data.perceivedExertion,
      energyLevel: data.energyLevel
    });

    // Redirect to dashboard
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Log Your Workout</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Workout Template</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {workoutTemplates.map(template => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-4 border rounded-lg text-left transition-colors ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {template.exercises.length} exercises
              </p>
            </button>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select a template or create a custom workout
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTemplate(null);
              reset({
                date: new Date().toISOString().split('T')[0],
                workoutId: `custom-${Date.now()}`,
                workoutName: 'Custom Workout',
                exercises: [{
                  exerciseId: `ex-custom-${Date.now()}`,
                  exerciseName: '',
                  sets: [{ weight: 0, reps: 0, completed: false }]
                }],
                notes: '',
                perceivedExertion: 7,
                energyLevel: 7
              });
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Create Custom Workout
          </button>
        </div>
      </div>
      
      {(selectedTemplate || watch('workoutId')) && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="w-full md:w-auto flex-1">
                <label className="block text-sm font-medium mb-1">Workout Name</label>
                <input
                  type="text"
                  {...register('workoutName')}
                  className="w-full p-2 border rounded-md"
                />
                {errors.workoutName && <p className="text-red-500 text-sm mt-1">{errors.workoutName.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  {...register('date')}
                  className="w-full p-2 border rounded-md"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>
            </div>
            
            <input type="hidden" {...register('workoutId')} />
            
            <h3 className="font-medium text-lg mb-4">Exercises</h3>
            
            {fields.map((exercise, exerciseIndex) => (
              <div key={exercise.id} className="mb-6 border-b pb-6 last:border-b-0">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Exercise Name</label>
                  <input
                    type="text"
                    {...register(`exercises.${exerciseIndex}.exerciseName` as const)}
                    className="w-full p-2 border rounded-md"
                  />
                  <input
                    type="hidden"
                    {...register(`exercises.${exerciseIndex}.exerciseId` as const)}
                  />
                </div>
                
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Set</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weight (kg)</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reps</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completed</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {exercise.sets.map((set, setIndex) => (
                      <tr key={setIndex}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {setIndex + 1}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            step="0.5"
                            {...register(`exercises.${exerciseIndex}.sets.${setIndex}.weight` as const, { valueAsNumber: true })}
                            className="w-20 p-1 border rounded-md"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            {...register(`exercises.${exerciseIndex}.sets.${setIndex}.reps` as const, { valueAsNumber: true })}
                            className="w-16 p-1 border rounded-md"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="checkbox"
                            {...register(`exercises.${exerciseIndex}.sets.${setIndex}.completed` as const)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <button
                  type="button"
                  onClick={() => {
                    const currentSets = watch(`exercises.${exerciseIndex}.sets`);
                    const lastSet = currentSets[currentSets.length - 1];
                    setValue(`exercises.${exerciseIndex}.sets`, [
                      ...currentSets,
                      { weight: lastSet.weight, reps: lastSet.reps, completed: false }
                    ]);
                  }}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Set
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => {
                const currentExercises = watch('exercises');
                setValue('exercises', [
                  ...currentExercises,
                  {
                    exerciseId: `ex-custom-${Date.now()}`,
                    exerciseName: '',
                    sets: [{ weight: 0, reps: 0, completed: false }]
                  }
                ]);
              }}
              className="mb-6 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              + Add Exercise
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="font-medium text-lg mb-4">Workout Feedback</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Perceived Exertion (1-10)</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    {...register('perceivedExertion', { valueAsNumber: true })}
                    className="w-full"
                  />
                  <span className="ml-2 font-medium">{watch('perceivedExertion')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Easy</span>
                  <span>Moderate</span>
                  <span>Very Hard</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    {...register('energyLevel', { valueAsNumber: true })}
                    className="w-full"
                  />
                  <span className="ml-2 font-medium">{watch('energyLevel')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="w-full p-2 border rounded-md"
                  placeholder="How did the workout feel? Any challenges or achievements?"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
            >
              Save Workout
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
