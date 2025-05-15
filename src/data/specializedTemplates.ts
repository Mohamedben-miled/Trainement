// Specialized workout templates for different training styles and splits

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
      rest: number; // in seconds
      notes?: string;
    }[];
  }[];
  principles: string[];
  notes: string[];
}

const specializedTemplates: SpecializedTemplate[] = [
  // 2-Day Splits
  {
    id: 'upper-lower-2day',
    name: 'Upper/Lower 2-Day Split',
    category: 'strength',
    split: '2-day',
    level: 'beginner',
    description: 'A simple but effective 2-day split targeting the entire body over two workouts per week. Ideal for beginners or those with limited time.',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Upper Body',
        exercises: [
          { name: 'Barbell Bench Press', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Bent Over Row', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Overhead Press', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Dumbbell Chest Fly', sets: 2, reps: '12-15', rest: 60 },
          { name: 'Bicep Curl', sets: 2, reps: '12-15', rest: 60 },
          { name: 'Tricep Pushdown', sets: 2, reps: '12-15', rest: 60 }
        ]
      },
      {
        day: 'Day 2',
        focus: 'Lower Body',
        exercises: [
          { name: 'Barbell Back Squat', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Romanian Deadlift', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Leg Press', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Leg Curl', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Calf Raise', sets: 3, reps: '15-20', rest: 60 },
          { name: 'Plank', sets: 3, reps: '30-60s', rest: 60 },
          { name: 'Russian Twist', sets: 2, reps: '15 per side', rest: 60 }
        ]
      }
    ],
    principles: [
      'Focus on compound movements for maximum efficiency',
      'Progressive overload by increasing weight or reps each week',
      'Allow 2-3 days between workouts for recovery',
      'Can be performed Monday/Thursday or Tuesday/Friday'
    ],
    notes: [
      'Ideal for beginners or those with limited time',
      'Can be expanded to 4 days by repeating the split twice per week',
      'Warm up properly before each workout with 5-10 minutes of light cardio and dynamic stretching'
    ]
  },
  {
    id: 'push-pull-2day',
    name: 'Push/Pull 2-Day Split',
    category: 'hypertrophy',
    split: '2-day',
    level: 'beginner',
    description: 'A 2-day split that groups pushing and pulling movements. Legs are divided between both days for balanced development.',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Push + Quads',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Overhead Press', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Tricep Pushdown', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Lateral Raise', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Barbell Back Squat', sets: 4, reps: '8-10', rest: 120 },
          { name: 'Leg Extension', sets: 3, reps: '12-15', rest: 60 }
        ]
      },
      {
        day: 'Day 2',
        focus: 'Pull + Hamstrings',
        exercises: [
          { name: 'Deadlift', sets: 4, reps: '6-8', rest: 120 },
          { name: 'Pull-ups or Lat Pulldown', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Bent Over Row', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Face Pull', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Bicep Curl', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Leg Curl', sets: 3, reps: '12-15', rest: 60 }
        ]
      }
    ],
    principles: [
      'Group exercises by movement pattern rather than body part',
      'Distribute leg training across both days to manage fatigue',
      'Focus on quality of movement over weight lifted',
      'Allow 2-3 days between workouts for recovery'
    ],
    notes: [
      'Great for those who prefer to train movement patterns rather than body parts',
      'Can be performed with 2-3 days between sessions',
      'Adjust exercise selection based on equipment availability'
    ]
  },
  
  // 3-Day Splits
  {
    id: 'push-pull-legs-3day',
    name: 'Push/Pull/Legs 3-Day Split',
    category: 'hypertrophy',
    split: '3-day',
    level: 'intermediate',
    description: 'The classic PPL split divided into three focused workouts. Ideal for balanced development and adequate recovery.',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Push (Chest, Shoulders, Triceps)',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '6-10', rest: 120, notes: 'Focus on progressive overload' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '8-12', rest: 90 },
          { name: 'Overhead Press', sets: 3, reps: '8-12', rest: 90 },
          { name: 'Dumbbell Lateral Raise', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Tricep Pushdown', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Overhead Tricep Extension', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Cable Chest Fly', sets: 2, reps: '15-20', rest: 60, notes: 'Focus on contraction' }
        ]
      },
      {
        day: 'Day 2',
        focus: 'Pull (Back, Biceps, Rear Delts)',
        exercises: [
          { name: 'Deadlift', sets: 3, reps: '5-8', rest: 180, notes: 'Focus on form over weight' },
          { name: 'Pull-ups or Lat Pulldown', sets: 4, reps: '8-12', rest: 90 },
          { name: 'Barbell Row', sets: 3, reps: '8-12', rest: 90 },
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Face Pull', sets: 3, reps: '15-20', rest: 60, notes: 'Focus on rear delts and external rotation' },
          { name: 'Barbell Curl', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Hammer Curl', sets: 3, reps: '10-12', rest: 60 }
        ]
      },
      {
        day: 'Day 3',
        focus: 'Legs (Quads, Hamstrings, Calves)',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '6-10', rest: 180, notes: 'Focus on depth and form' },
          { name: 'Romanian Deadlift', sets: 3, reps: '8-12', rest: 120 },
          { name: 'Leg Press', sets: 3, reps: '10-15', rest: 90 },
          { name: 'Walking Lunges', sets: 3, reps: '10-12 per leg', rest: 90 },
          { name: 'Leg Curl', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Calf Raise', sets: 4, reps: '15-20', rest: 60 },
          { name: 'Plank', sets: 3, reps: '30-60s', rest: 60 }
        ]
      }
    ],
    principles: [
      'Train each muscle group once per week with high volume',
      'Focus on progressive overload for compound lifts',
      'Allow 48-72 hours between training the same muscle group',
      'Can be performed Mon/Wed/Fri or any 3 non-consecutive days'
    ],
    notes: [
      'This split can be expanded to 6 days by repeating the cycle twice per week',
      'Adjust volume based on recovery capacity',
      'Include deload weeks every 4-6 weeks to prevent overtraining'
    ]
  },
  {
    id: 'full-body-3day',
    name: 'Full Body 3-Day Split',
    category: 'strength',
    split: '3-day',
    level: 'beginner',
    description: 'A balanced full-body approach performed three times per week. Great for beginners and those focused on strength development.',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Full Body - Squat Focus',
        exercises: [
          { name: 'Barbell Back Squat', sets: 5, reps: '5', rest: 180, notes: 'Main strength movement' },
          { name: 'Bench Press', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Bent Over Row', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Dumbbell Shoulder Press', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Romanian Deadlift', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Tricep Pushdown', sets: 2, reps: '12-15', rest: 60 },
          { name: 'Plank', sets: 3, reps: '30-45s', rest: 60 }
        ]
      },
      {
        day: 'Day 2',
        focus: 'Full Body - Bench Focus',
        exercises: [
          { name: 'Barbell Bench Press', sets: 5, reps: '5', rest: 180, notes: 'Main strength movement' },
          { name: 'Front Squat', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Pull-ups or Lat Pulldown', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Dumbbell Row', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Leg Curl', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Bicep Curl', sets: 2, reps: '12-15', rest: 60 },
          { name: 'Russian Twist', sets: 3, reps: '15 per side', rest: 60 }
        ]
      },
      {
        day: 'Day 3',
        focus: 'Full Body - Deadlift Focus',
        exercises: [
          { name: 'Deadlift', sets: 5, reps: '5', rest: 180, notes: 'Main strength movement' },
          { name: 'Incline Bench Press', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Leg Press', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Lateral Raise', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Tricep Extension', sets: 2, reps: '12-15', rest: 60 },
          { name: 'Calf Raise', sets: 3, reps: '15-20', rest: 60 }
        ]
      }
    ],
    principles: [
      'Focus on one main compound lift per session',
      'Train all major muscle groups each workout',
      'Emphasize progressive overload on the main lifts',
      'Allow 48 hours between workouts for recovery'
    ],
    notes: [
      'Ideal for beginners and intermediate lifters',
      'Great for strength development and general fitness',
      'Can be performed Monday/Wednesday/Friday or any 3 non-consecutive days'
    ]
  },
  
  // 4-Day Splits
  {
    id: 'upper-lower-4day',
    name: 'Upper/Lower 4-Day Split',
    category: 'strength',
    split: '4-day',
    level: 'intermediate',
    description: 'A balanced 4-day split that alternates between upper and lower body workouts. Provides good frequency and volume for each muscle group.',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Upper Body - Strength',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '4-6', rest: 180, notes: 'Focus on strength' },
          { name: 'Weighted Pull-ups', sets: 4, reps: '4-6', rest: 180 },
          { name: 'Overhead Press', sets: 3, reps: '6-8', rest: 120 },
          { name: 'Barbell Row', sets: 3, reps: '6-8', rest: 120 },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Tricep Dips', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Face Pull', sets: 3, reps: '12-15', rest: 60 }
        ]
      },
      {
        day: 'Day 2',
        focus: 'Lower Body - Strength',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '4-6', rest: 180, notes: 'Focus on strength' },
          { name: 'Romanian Deadlift', sets: 4, reps: '6-8', rest: 180 },
          { name: 'Leg Press', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Walking Lunges', sets: 3, reps: '10 per leg', rest: 90 },
          { name: 'Leg Curl', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Standing Calf Raise', sets: 4, reps: '12-15', rest: 60 },
          { name: 'Hanging Leg Raise', sets: 3, reps: '10-15', rest: 60 }
        ]
      },
      {
        day: 'Day 3',
        focus: 'Upper Body - Hypertrophy',
        exercises: [
          { name: 'Incline Bench Press', sets: 4, reps: '8-10', rest: 120, notes: 'Focus on muscle growth' },
          { name: 'Lat Pulldown', sets: 4, reps: '8-10', rest: 120 },
          { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Cable Row', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Dumbbell Chest Fly', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Bicep Curl', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Lateral Raise', sets: 3, reps: '15-20', rest: 60 }
        ]
      },
      {
        day: 'Day 4',
        focus: 'Lower Body - Hypertrophy',
        exercises: [
          { name: 'Deadlift', sets: 4, reps: '6-8', rest: 180, notes: 'Focus on form' },
          { name: 'Front Squat', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12 per leg', rest: 90 },
          { name: 'Leg Extension', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Seated Leg Curl', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Seated Calf Raise', sets: 4, reps: '15-20', rest: 60 },
          { name: 'Ab Rollout', sets: 3, reps: '10-15', rest: 60 }
        ]
      }
    ],
    principles: [
      'Alternate between strength-focused and hypertrophy-focused days',
      'Train each muscle group twice per week with different rep ranges',
      'Focus on progressive overload for all exercises',
      'Allow 72 hours between training the same muscle group'
    ],
    notes: [
      'Ideal for intermediate lifters looking for balanced development',
      'Can be performed Mon/Tue/Thu/Fri with Wed/Sat/Sun as rest days',
      'Adjust volume based on recovery capacity'
    ]
  },
  
  // 5-Day Splits
  {
    id: 'bro-split-5day',
    name: 'Body Part Split (Bro Split)',
    category: 'hypertrophy',
    split: '5-day',
    level: 'intermediate',
    description: 'The classic bodybuilding split that dedicates an entire day to each major muscle group. Allows for high volume and intensity per muscle group.',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Chest',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: 120 },
          { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Decline Bench Press', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Dumbbell Chest Fly', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Cable Crossover', sets: 3, reps: '15-20', rest: 60 },
          { name: 'Push-ups', sets: 2, reps: 'To failure', rest: 60, notes: 'Finisher' }
        ]
      },
      {
        day: 'Day 2',
        focus: 'Back',
        exercises: [
          { name: 'Deadlift', sets: 4, reps: '6-8', rest: 180 },
          { name: 'Pull-ups', sets: 4, reps: '8-10', rest: 120 },
          { name: 'Barbell Row', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: 90 },
          { name: 'Straight Arm Pulldown', sets: 3, reps: '12-15', rest: 60 }
        ]
      },
      {
        day: 'Day 3',
        focus: 'Legs',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '8-10', rest: 180 },
          { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: 120 },
          { name: 'Leg Press', sets: 3, reps: '10-12', rest: 120 },
          { name: 'Walking Lunges', sets: 3, reps: '12 per leg', rest: 90 },
          { name: 'Leg Extension', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Leg Curl', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Standing Calf Raise', sets: 4, reps: '15-20', rest: 60 }
        ]
      },
      {
        day: 'Day 4',
        focus: 'Shoulders',
        exercises: [
          { name: 'Overhead Press', sets: 4, reps: '8-10', rest: 120 },
          { name: 'Dumbbell Shoulder Press', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Lateral Raise', sets: 4, reps: '12-15', rest: 60 },
          { name: 'Front Raise', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Face Pull', sets: 3, reps: '15-20', rest: 60 },
          { name: 'Shrugs', sets: 3, reps: '12-15', rest: 60 }
        ]
      },
      {
        day: 'Day 5',
        focus: 'Arms & Abs',
        exercises: [
          { name: 'Barbell Curl', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Skull Crushers', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Hammer Curl', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Tricep Pushdown', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Preacher Curl', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Cable Crunch', sets: 3, reps: '15-20', rest: 60 },
          { name: 'Hanging Leg Raise', sets: 3, reps: '15-20', rest: 60 }
        ]
      }
    ],
    principles: [
      'High volume for each muscle group once per week',
      'Focus on mind-muscle connection and isolation',
      'Progress from compound to isolation exercises',
      'Allow 5-7 days between training the same muscle group'
    ],
    notes: [
      'Classic bodybuilding approach for hypertrophy',
      'Can be performed Mon-Fri with weekends off',
      'Consider adding a cardio day on Saturday for balanced fitness'
    ]
  },
  
  // Powerlifting Specific
  {
    id: 'powerlifting-4day',
    name: 'Powerlifting 4-Day Split',
    category: 'powerlifting',
    split: '4-day',
    level: 'advanced',
    description: 'A specialized program for powerlifting focused on the three main lifts: squat, bench press, and deadlift. Designed to maximize strength gains.',
    schedule: [
      {
        day: 'Day 1',
        focus: 'Squat Day',
        exercises: [
          { name: 'Barbell Back Squat', sets: 5, reps: '5,3,1,1,1', rest: 240, notes: 'Work up to heavy singles' },
          { name: 'Pause Squat', sets: 3, reps: '5', rest: 180, notes: '3-second pause at bottom' },
          { name: 'Front Squat', sets: 3, reps: '6-8', rest: 180 },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '8-10 per leg', rest: 120 },
          { name: 'Leg Extension', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Standing Calf Raise', sets: 4, reps: '12-15', rest: 60 }
        ]
      },
      {
        day: 'Day 2',
        focus: 'Bench Press Day',
        exercises: [
          { name: 'Barbell Bench Press', sets: 5, reps: '5,3,1,1,1', rest: 240, notes: 'Work up to heavy singles' },
          { name: 'Close Grip Bench Press', sets: 3, reps: '6-8', rest: 180 },
          { name: 'Incline Bench Press', sets: 3, reps: '6-8', rest: 180 },
          { name: 'Weighted Dips', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Tricep Pushdown', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Face Pull', sets: 3, reps: '15-20', rest: 60, notes: 'Shoulder health' }
        ]
      },
      {
        day: 'Day 3',
        focus: 'Deadlift Day',
        exercises: [
          { name: 'Deadlift', sets: 5, reps: '5,3,1,1,1', rest: 240, notes: 'Work up to heavy singles' },
          { name: 'Deficit Deadlift', sets: 3, reps: '5', rest: 180, notes: '2-inch deficit' },
          { name: 'Romanian Deadlift', sets: 3, reps: '6-8', rest: 180 },
          { name: 'Barbell Row', sets: 3, reps: '6-8', rest: 120 },
          { name: 'Pull-ups', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Hammer Curl', sets: 3, reps: '10-12', rest: 60, notes: 'For grip strength' }
        ]
      },
      {
        day: 'Day 4',
        focus: 'Accessory Day',
        exercises: [
          { name: 'Overhead Press', sets: 4, reps: '6-8', rest: 120 },
          { name: 'Pause Bench Press', sets: 3, reps: '5', rest: 120, notes: '3-second pause at bottom' },
          { name: 'Leg Press', sets: 3, reps: '8-10', rest: 120 },
          { name: 'Lat Pulldown', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Dumbbell Row', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Ab Wheel Rollout', sets: 3, reps: '10-15', rest: 60 },
          { name: 'Hanging Leg Raise', sets: 3, reps: '10-15', rest: 60 }
        ]
      }
    ],
    principles: [
      'Focus on the three main powerlifting movements',
      'Use progressive overload with heavy singles',
      'Include variations of the main lifts to address weaknesses',
      'Incorporate accessory work to prevent imbalances'
    ],
    notes: [
      'Designed for competitive powerlifters or those focused on strength',
      'Periodize training with deload weeks every 4-6 weeks',
      'Adjust volume based on proximity to competition',
      'Focus on technique and form over weight'
    ]
  }
];

export default specializedTemplates;
