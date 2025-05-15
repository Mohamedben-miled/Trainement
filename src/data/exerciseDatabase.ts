// Exercise database with detailed information including images and targeted muscles

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
  fatigueFactor: number; // 1-10 scale, how taxing the exercise is on the nervous system
  recoveryTime: number; // in hours, estimated recovery time needed
}

const exerciseDatabase: Record<string, ExerciseData[]> = {
  chest: [
    {
      id: 'bench-press',
      name: 'Barbell Bench Press',
      muscleGroups: ['chest', 'push'],
      primaryMuscles: ['pectoralis major'],
      secondaryMuscles: ['anterior deltoids', 'triceps'],
      equipment: ['barbell', 'bench'],
      difficulty: 'intermediate',
      description: 'A compound exercise that targets the chest, shoulders, and triceps.',
      instructions: [
        'Lie on a flat bench with your feet flat on the floor.',
        'Grip the barbell slightly wider than shoulder-width apart.',
        'Unrack the barbell and lower it to your mid-chest.',
        'Press the barbell back up to the starting position.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Keep your wrists straight and elbows at about a 45-degree angle from your body.',
        'Maintain a slight arch in your lower back.',
        'Don\'t bounce the bar off your chest.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/barbell-bench-press-benefits.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
      alternatives: ['Dumbbell Bench Press', 'Push-ups', 'Machine Chest Press'],
      fatigueFactor: 8,
      recoveryTime: 48
    },
    {
      id: 'incline-press',
      name: 'Incline Bench Press',
      muscleGroups: ['chest', 'push'],
      primaryMuscles: ['upper pectoralis major'],
      secondaryMuscles: ['anterior deltoids', 'triceps'],
      equipment: ['barbell', 'incline bench'],
      difficulty: 'intermediate',
      description: 'A variation of the bench press that emphasizes the upper chest.',
      instructions: [
        'Set an adjustable bench to a 30-45 degree incline.',
        'Lie on the bench with your feet flat on the floor.',
        'Grip the barbell slightly wider than shoulder-width apart.',
        'Unrack the barbell and lower it to your upper chest.',
        'Press the barbell back up to the starting position.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Don\'t set the incline too high (above 45 degrees) as it shifts emphasis to the shoulders.',
        'Keep your elbows at about a 45-degree angle from your body.',
        'Maintain contact between your lower back and the bench.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/04/incline-barbell-bench-press.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=SrqOu55lrYU',
      alternatives: ['Incline Dumbbell Press', 'Incline Push-ups', 'Cable Chest Fly'],
      fatigueFactor: 7,
      recoveryTime: 48
    },
    {
      id: 'dumbbell-fly',
      name: 'Dumbbell Chest Fly',
      muscleGroups: ['chest', 'push'],
      primaryMuscles: ['pectoralis major'],
      secondaryMuscles: ['anterior deltoids'],
      equipment: ['dumbbells', 'bench'],
      difficulty: 'beginner',
      description: 'An isolation exercise that stretches and contracts the chest muscles.',
      instructions: [
        'Lie on a flat bench holding a dumbbell in each hand above your chest.',
        'With a slight bend in your elbows, lower the dumbbells out to the sides.',
        'When you feel a stretch in your chest, bring the dumbbells back together.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Maintain a slight bend in your elbows throughout the movement.',
        'Focus on the stretch and contraction of your chest muscles.',
        'Use lighter weights to avoid shoulder strain.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/08/dumbbell-chest-fly.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
      alternatives: ['Cable Fly', 'Machine Fly', 'Push-ups'],
      fatigueFactor: 5,
      recoveryTime: 24
    }
  ],
  back: [
    {
      id: 'pull-ups',
      name: 'Pull-ups',
      muscleGroups: ['back', 'pull'],
      primaryMuscles: ['latissimus dorsi', 'rhomboids'],
      secondaryMuscles: ['biceps', 'rear deltoids'],
      equipment: ['pull-up bar'],
      difficulty: 'intermediate',
      description: 'A compound bodyweight exercise that targets the back and biceps.',
      instructions: [
        'Hang from a pull-up bar with your hands slightly wider than shoulder-width apart.',
        'Pull yourself up until your chin is over the bar.',
        'Lower yourself back down with control.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Engage your core and avoid swinging.',
        'Focus on pulling with your back muscles, not just your arms.',
        'For beginners, use assisted pull-up machines or resistance bands.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up-variations.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
      alternatives: ['Lat Pulldown', 'Assisted Pull-ups', 'Inverted Rows'],
      fatigueFactor: 8,
      recoveryTime: 48
    },
    {
      id: 'bent-over-row',
      name: 'Barbell Bent Over Row',
      muscleGroups: ['back', 'pull'],
      primaryMuscles: ['latissimus dorsi', 'rhomboids', 'trapezius'],
      secondaryMuscles: ['biceps', 'rear deltoids', 'erector spinae'],
      equipment: ['barbell'],
      difficulty: 'intermediate',
      description: 'A compound exercise that targets the middle back, lats, and rear shoulders.',
      instructions: [
        'Stand with your feet shoulder-width apart, holding a barbell with an overhand grip.',
        'Bend at your hips and knees, keeping your back straight.',
        'Pull the barbell towards your lower ribcage.',
        'Lower the barbell back down with control.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Keep your back flat and core engaged throughout the movement.',
        'Pull the barbell to your lower ribcage, not your waist.',
        'Avoid using momentum to lift the weight.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/03/barbell-bent-over-row.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
      alternatives: ['Dumbbell Row', 'T-Bar Row', 'Seated Cable Row'],
      fatigueFactor: 7,
      recoveryTime: 48
    },
    {
      id: 'lat-pulldown',
      name: 'Lat Pulldown',
      muscleGroups: ['back', 'pull'],
      primaryMuscles: ['latissimus dorsi'],
      secondaryMuscles: ['biceps', 'rhomboids', 'rear deltoids'],
      equipment: ['cable machine', 'lat pulldown bar'],
      difficulty: 'beginner',
      description: 'A machine exercise that targets the lats and upper back.',
      instructions: [
        'Sit at a lat pulldown machine with your thighs secured under the pads.',
        'Grasp the bar with a wide overhand grip.',
        'Pull the bar down to your upper chest.',
        'Slowly return the bar to the starting position.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Keep your chest up and shoulders back.',
        'Focus on pulling with your back muscles, not your arms.',
        'Avoid leaning back excessively.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/01/lat-pulldown.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
      alternatives: ['Pull-ups', 'Straight-Arm Pulldown', 'Single-Arm Lat Pulldown'],
      fatigueFactor: 6,
      recoveryTime: 24
    }
  ],
  legs: [
    {
      id: 'squat',
      name: 'Barbell Back Squat',
      muscleGroups: ['legs', 'lower body'],
      primaryMuscles: ['quadriceps', 'glutes'],
      secondaryMuscles: ['hamstrings', 'calves', 'lower back', 'core'],
      equipment: ['barbell', 'squat rack'],
      difficulty: 'intermediate',
      description: 'A compound exercise that primarily targets the quadriceps and glutes.',
      instructions: [
        'Position a barbell on your upper back, resting on your trapezius muscles.',
        'Stand with feet shoulder-width apart, toes slightly turned out.',
        'Bend at your knees and hips to lower your body, keeping your chest up.',
        'Lower until your thighs are parallel to the ground or slightly below.',
        'Push through your heels to return to the starting position.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Keep your knees in line with your toes.',
        'Maintain a neutral spine throughout the movement.',
        'Push through your heels, not your toes.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/10/barbell-back-squat-form.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=bEv6CCg2BC8',
      alternatives: ['Front Squat', 'Goblet Squat', 'Leg Press'],
      fatigueFactor: 9,
      recoveryTime: 72
    },
    {
      id: 'deadlift',
      name: 'Conventional Deadlift',
      muscleGroups: ['legs', 'back', 'full body'],
      primaryMuscles: ['hamstrings', 'glutes', 'erector spinae'],
      secondaryMuscles: ['quadriceps', 'trapezius', 'forearms', 'core'],
      equipment: ['barbell'],
      difficulty: 'advanced',
      description: 'A compound exercise that works almost the entire body, with emphasis on the posterior chain.',
      instructions: [
        'Stand with feet hip-width apart, barbell over mid-foot.',
        'Bend at the hips and knees to grip the bar with hands shoulder-width apart.',
        'Keeping your back flat, lift the bar by extending your hips and knees.',
        'Stand tall at the top, shoulders back and hips fully extended.',
        'Return the bar to the ground with control.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Keep the bar close to your body throughout the movement.',
        'Engage your lats before lifting to protect your lower back.',
        'Think of pushing the floor away rather than pulling the bar up.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/01/deadlift-muscles-worked.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
      alternatives: ['Romanian Deadlift', 'Trap Bar Deadlift', 'Sumo Deadlift'],
      fatigueFactor: 10,
      recoveryTime: 72
    },
    {
      id: 'leg-press',
      name: 'Leg Press',
      muscleGroups: ['legs', 'lower body'],
      primaryMuscles: ['quadriceps', 'glutes'],
      secondaryMuscles: ['hamstrings', 'calves'],
      equipment: ['leg press machine'],
      difficulty: 'beginner',
      description: 'A machine-based compound exercise that targets the quadriceps, hamstrings, and glutes.',
      instructions: [
        'Sit on the leg press machine with your back against the pad.',
        'Place your feet on the platform, hip-width apart.',
        'Release the safety handles and lower the platform by bending your knees.',
        'Push through your heels to extend your legs without locking your knees.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Don\'t let your lower back round or lift off the pad.',
        'Avoid locking your knees at the top of the movement.',
        'Adjust foot position to target different muscles.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/01/leg-press-machine.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
      alternatives: ['Squats', 'Hack Squat', 'Lunges'],
      fatigueFactor: 7,
      recoveryTime: 48
    }
  ],
  shoulders: [
    {
      id: 'overhead-press',
      name: 'Overhead Press',
      muscleGroups: ['shoulders', 'push'],
      primaryMuscles: ['deltoids'],
      secondaryMuscles: ['triceps', 'upper chest', 'trapezius'],
      equipment: ['barbell'],
      difficulty: 'intermediate',
      description: 'A compound exercise that targets the shoulders and triceps.',
      instructions: [
        'Stand with feet shoulder-width apart, holding a barbell at shoulder height.',
        'Press the barbell overhead, fully extending your arms.',
        'Lower the barbell back to shoulder height with control.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Keep your core tight and avoid arching your lower back.',
        'Press the bar in a slight arc around your face, not straight up.',
        'Fully lock out your arms at the top of the movement.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/04/overhead-press.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
      alternatives: ['Dumbbell Shoulder Press', 'Arnold Press', 'Machine Shoulder Press'],
      fatigueFactor: 7,
      recoveryTime: 48
    },
    {
      id: 'lateral-raise',
      name: 'Dumbbell Lateral Raise',
      muscleGroups: ['shoulders', 'push'],
      primaryMuscles: ['lateral deltoids'],
      secondaryMuscles: ['anterior deltoids', 'trapezius'],
      equipment: ['dumbbells'],
      difficulty: 'beginner',
      description: 'An isolation exercise that targets the lateral (side) deltoids.',
      instructions: [
        'Stand with feet shoulder-width apart, holding dumbbells at your sides.',
        'Keeping a slight bend in your elbows, raise the dumbbells out to the sides.',
        'Lift until your arms are parallel to the floor.',
        'Lower the dumbbells back to your sides with control.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Avoid using momentum to swing the weights up.',
        'Keep your wrists neutral, not flexed or extended.',
        'Focus on lifting with your deltoids, not your traps.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/03/dumbbell-lateral-raise.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
      alternatives: ['Cable Lateral Raise', 'Machine Lateral Raise', 'Upright Row'],
      fatigueFactor: 5,
      recoveryTime: 24
    }
  ],
  arms: [
    {
      id: 'bicep-curl',
      name: 'Barbell Bicep Curl',
      muscleGroups: ['arms', 'pull'],
      primaryMuscles: ['biceps brachii'],
      secondaryMuscles: ['brachialis', 'brachioradialis', 'forearms'],
      equipment: ['barbell'],
      difficulty: 'beginner',
      description: 'An isolation exercise that targets the biceps.',
      instructions: [
        'Stand with feet shoulder-width apart, holding a barbell with an underhand grip.',
        'Keeping your elbows close to your sides, curl the barbell up to your shoulders.',
        'Squeeze your biceps at the top of the movement.',
        'Lower the barbell back down with control.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Keep your upper arms stationary throughout the movement.',
        'Avoid swinging or using momentum to lift the weight.',
        'Focus on a full range of motion.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/03/barbell-curl.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo',
      alternatives: ['Dumbbell Curl', 'Hammer Curl', 'Cable Curl'],
      fatigueFactor: 5,
      recoveryTime: 24
    },
    {
      id: 'tricep-pushdown',
      name: 'Tricep Pushdown',
      muscleGroups: ['arms', 'push'],
      primaryMuscles: ['triceps brachii'],
      secondaryMuscles: ['forearms'],
      equipment: ['cable machine'],
      difficulty: 'beginner',
      description: 'An isolation exercise that targets the triceps.',
      instructions: [
        'Stand facing a cable machine with a straight or V-bar attachment at chest height.',
        'Grip the bar with your palms facing down.',
        'Keeping your elbows close to your sides, push the bar down until your arms are fully extended.',
        'Slowly return to the starting position.',
        'Repeat for the desired number of repetitions.'
      ],
      tips: [
        'Keep your elbows stationary and close to your body.',
        'Focus on using your triceps, not your shoulders or back.',
        'Maintain an upright posture throughout the movement.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/01/tricep-pushdown.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
      alternatives: ['Tricep Dips', 'Skull Crushers', 'Overhead Tricep Extension'],
      fatigueFactor: 4,
      recoveryTime: 24
    }
  ],
  core: [
    {
      id: 'plank',
      name: 'Plank',
      muscleGroups: ['core', 'abs'],
      primaryMuscles: ['rectus abdominis', 'transverse abdominis'],
      secondaryMuscles: ['shoulders', 'glutes', 'quadriceps'],
      equipment: ['none'],
      difficulty: 'beginner',
      description: 'A static exercise that strengthens the core, shoulders, and back.',
      instructions: [
        'Start in a push-up position, then bend your elbows and rest your weight on your forearms.',
        'Your body should form a straight line from your head to your feet.',
        'Engage your core and hold the position.',
        'Hold for the desired amount of time.'
      ],
      tips: [
        'Don\'t let your hips sag or pike up.',
        'Keep your neck in a neutral position, looking at the floor.',
        'Breathe normally throughout the hold.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/03/plank-exercise.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
      alternatives: ['Side Plank', 'Ab Rollout', 'Dead Bug'],
      fatigueFactor: 6,
      recoveryTime: 24
    },
    {
      id: 'russian-twist',
      name: 'Russian Twist',
      muscleGroups: ['core', 'abs'],
      primaryMuscles: ['obliques', 'rectus abdominis'],
      secondaryMuscles: ['hip flexors'],
      equipment: ['weight plate', 'dumbbell', 'medicine ball'],
      difficulty: 'beginner',
      description: 'A dynamic exercise that targets the obliques and rotational strength.',
      instructions: [
        'Sit on the floor with your knees bent and feet elevated slightly.',
        'Lean back slightly to engage your core.',
        'Hold a weight with both hands in front of your chest.',
        'Rotate your torso to the right, then to the left.',
        'Each rotation to both sides counts as one repetition.'
      ],
      tips: [
        'Keep your back straight, not rounded.',
        'Rotate from your ribcage, not just your arms.',
        'For more challenge, lift your feet higher off the ground.'
      ],
      imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/04/russian-twist.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
      alternatives: ['Bicycle Crunches', 'Woodchoppers', 'Side Plank Rotations'],
      fatigueFactor: 5,
      recoveryTime: 24
    }
  ]
};

export default exerciseDatabase;
