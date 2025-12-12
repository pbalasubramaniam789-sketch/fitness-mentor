// Comprehensive Exercise Database with Reps and Sets
// This file contains all workout exercises organized by category

export const EXERCISES_DATABASE = {
  // 1. STRENGTH TRAINING
  strength_training: {
    label: 'Strength Training',
    icon: '💪',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8 },
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: 10 },
      { name: 'Barbell Squats', sets: 4, reps: 8 },
      { name: 'Deadlift', sets: 3, reps: 5 },
      { name: 'Lat Pulldown', sets: 3, reps: 10 },
      { name: 'Seated Row', sets: 3, reps: 10 },
      { name: 'Bicep Curls', sets: 3, reps: 12 },
      { name: 'Tricep Pushdown', sets: 3, reps: 12 }
    ]
  },
  
  // 2. CARDIO
  cardio: {
    label: 'Cardio',
    icon: '🏃',
    exercises: [
      { name: 'Treadmill Walking', sets: 1, reps: '20-30 min' },
      { name: 'Treadmill Running', sets: 1, reps: '20-30 min' },
      { name: 'Cycling', sets: 1, reps: '30-45 min' },
      { name: 'Rowing Machine', sets: 1, reps: '20-30 min' },
      { name: 'Elliptical', sets: 1, reps: '20-30 min' },
      { name: 'Stair Climber', sets: 1, reps: '15-20 min' },
      { name: 'Jump Rope', sets: 3, reps: '30-60 sec' }
    ]
  },
  
  // 3. HIIT (High-Intensity Interval Training)
  hiit: {
    label: 'HIIT',
    icon: '🔥',
    exercises: [
      { name: 'Sprint Intervals', sets: 8, reps: '30 sec on/30 sec off' },
      { name: 'Burpees', sets: 4, reps: 15 },
      { name: 'Battle Ropes', sets: 3, reps: '30 sec' },
      { name: 'Kettlebell Swings', sets: 3, reps: 20 },
      { name: 'Jump Squats', sets: 3, reps: 15 },
      { name: 'Mountain Climbers', sets: 3, reps: 20 },
      { name: 'Tabata Circuits', sets: 8, reps: '20 sec on/10 sec off' }
    ]
  },
  
  // 4. FUNCTIONAL TRAINING
  functional_training: {
    label: 'Functional Training',
    icon: '⚡',
    exercises: [
      { name: 'TRX Rows', sets: 3, reps: 12 },
      { name: 'Kettlebell Deadlifts', sets: 3, reps: 10 },
      { name: 'Medicine Ball Slams', sets: 3, reps: 12 },
      { name: 'Sled Push', sets: 3, reps: '30-50 meters' },
      { name: 'Farmer\'s Carry', sets: 3, reps: '30-50 meters' },
      { name: 'Box Step-ups', sets: 3, reps: 12 },
      { name: 'Sandbag Squats', sets: 3, reps: 10 }
    ]
  },
  
  // 5. CORE TRAINING
  core_training: {
    label: 'Core Training',
    icon: '🎯',
    exercises: [
      { name: 'Plank', sets: 3, reps: '30-60 sec' },
      { name: 'Russian Twist', sets: 3, reps: 20 },
      { name: 'Leg Raises', sets: 3, reps: 12 },
      { name: 'Bicycle Crunches', sets: 3, reps: 20 },
      { name: 'Cable Woodchoppers', sets: 3, reps: 15 },
      { name: 'Ab Wheel Rollouts', sets: 3, reps: 10 },
      { name: 'Side Plank', sets: 3, reps: '30-45 sec' }
    ]
  },
  
  // 6. FLEXIBILITY & MOBILITY
  flexibility_mobility: {
    label: 'Flexibility & Mobility',
    icon: '🧘',
    exercises: [
      { name: 'Full Body Stretch', sets: 1, reps: '10-15 min' },
      { name: 'Hamstring Stretch', sets: 3, reps: '30 sec each leg' },
      { name: 'Hip Mobility Routine', sets: 1, reps: '10-15 min' },
      { name: 'Shoulder Mobility Drills', sets: 3, reps: '10 per arm' },
      { name: 'Yoga Flow', sets: 1, reps: '20-30 min' },
      { name: 'Pilates Core Stretch', sets: 1, reps: '15-20 min' },
      { name: 'Foam Rolling', sets: 1, reps: '10-15 min' }
    ]
  },
  
  // 7. POWER TRAINING
  power_training: {
    label: 'Power Training',
    icon: '💥',
    exercises: [
      { name: 'Box Jumps', sets: 5, reps: 5 },
      { name: 'Plyometric Push-ups', sets: 3, reps: 8 },
      { name: 'Medicine Ball Throws', sets: 3, reps: 10 },
      { name: 'Olympic Clean', sets: 5, reps: 3 },
      { name: 'Explosive Lunges', sets: 3, reps: 10 },
      { name: 'Speed Ladder Drills', sets: 3, reps: '2x the length' }
    ]
  },
  
  // 8. BODYWEIGHT TRAINING
  bodyweight_training: {
    label: 'Bodyweight Training',
    icon: '🤸',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: 15 },
      { name: 'Squats', sets: 3, reps: 20 },
      { name: 'Lunges', sets: 3, reps: 12 },
      { name: 'Pull-ups', sets: 3, reps: 8 },
      { name: 'Dips', sets: 3, reps: 10 },
      { name: 'Burpees', sets: 3, reps: 10 },
      { name: 'Mountain Climbers', sets: 3, reps: 20 }
    ]
  },
  
  // 9. MACHINE WORKOUTS
  machine_workouts: {
    label: 'Machine Workouts',
    icon: '⚙️',
    exercises: [
      { name: 'Leg Press', sets: 3, reps: 12 },
      { name: 'Chest Press Machine', sets: 3, reps: 12 },
      { name: 'Lat Pulldown Machine', sets: 3, reps: 12 },
      { name: 'Leg Extension', sets: 3, reps: 12 },
      { name: 'Leg Curl', sets: 3, reps: 12 },
      { name: 'Smith Machine Squats', sets: 3, reps: 10 },
      { name: 'Pec Deck Fly', sets: 3, reps: 12 }
    ]
  },
  
  // 10. FULL-BODY / SPLIT ROUTINES
  split_routines: {
    label: 'Split Routines',
    icon: '🗓️',
    exercises: [
      { name: 'Push Day (Chest/Shoulders/Triceps)', sets: 4, reps: '8-12' },
      { name: 'Pull Day (Back/Biceps)', sets: 4, reps: '8-12' },
      { name: 'Legs Day', sets: 4, reps: '8-12' },
      { name: 'Upper Body Day', sets: 4, reps: '8-12' },
      { name: 'Lower Body Day', sets: 4, reps: '8-12' },
      { name: 'Full Body Strength Day', sets: 3, reps: '8-10' },
      { name: 'Glutes & Core Day', sets: 3, reps: '10-15' }
    ]
  }
};

// Helper function to get all exercises
export function getAllExercises() {
  const allExercises = [];
  Object.values(EXERCISES_DATABASE).forEach(category => {
    allExercises.push(...category.exercises);
  });
  return allExercises;
}

// Helper function to get exercises by category
export function getExercisesByCategory(categoryKey) {
  return EXERCISES_DATABASE[categoryKey]?.exercises || [];
}

// Helper function to search exercises
export function searchExercises(query) {
  const allExercises = getAllExercises();
  return allExercises.filter(ex => 
    ex.name.toLowerCase().includes(query.toLowerCase())
  );
}
