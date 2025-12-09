// Fitness Mentor - Constants and Configuration

// Activity level multipliers for calorie calculation (Mifflin-St Jeor)
export const ACTIVITY_LEVELS = {
    sedentary: { label: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
    lightly: { label: 'Lightly Active', multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
    moderately: { label: 'Moderately Active', multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
    very: { label: 'Very Active', multiplier: 1.725, description: 'Hard exercise 6-7 days/week' }
};

// BMI categories
export const BMI_CATEGORIES = {
    underweight: { min: 0, max: 18.5, label: 'Underweight', color: '#3b82f6' },
    normal: { min: 18.5, max: 24.9, label: 'Normal', color: '#10b981' },
    overweight: { min: 25, max: 29.9, label: 'Overweight', color: '#f59e0b' },
    obese: { min: 30, max: 100, label: 'Obese', color: '#ef4444' }
};

// Fitness goals
export const GOALS = {
    lose: { label: 'Lose Weight', calorieAdjustment: -500 },
    maintain: { label: 'Maintain Weight', calorieAdjustment: 0 },
    build: { label: 'Build Muscle', calorieAdjustment: 300 },
    stamina: { label: 'Improve Stamina', calorieAdjustment: 0 }
};

// Workout types and calorie burn rates (calories per minute per kg)
export const WORKOUT_TYPES = {
    walking: { label: 'Walking', burnRate: { low: 0.03, medium: 0.045, high: 0.06 } },
    running: { label: 'Running', burnRate: { low: 0.08, medium: 0.1, high: 0.12 } },
    yoga: { label: 'Yoga', burnRate: { low: 0.025, medium: 0.035, high: 0.045 } },
    strength: { label: 'Strength Training', burnRate: { low: 0.04, medium: 0.06, high: 0.08 } },
    hiit: { label: 'HIIT', burnRate: { low: 0.09, medium: 0.12, high: 0.15 } },
    cycling: { label: 'Cycling', burnRate: { low: 0.05, medium: 0.08, high: 0.11 } },
    custom: { label: 'Custom', burnRate: { low: 0.04, medium: 0.06, high: 0.08 } }
};

// Detailed Exercise Database
export const EXERCISE_DATABASE = {
    strength_training: {
        chest: [
            "Barbell Bench Press",
            "Dumbbell Bench Press",
            "Incline Bench Press",
            "Decline Bench Press",
            "Chest Fly (Dumbbell)",
            "Cable Fly",
            "Machine Chest Press",
            "Push-Ups",
            "Weighted Push-Ups",
            "Pec Deck Machine"
        ],
        back: [
            "Deadlift",
            "Conventional Deadlift",
            "Romanian Deadlift",
            "Lat Pulldown",
            "Pull-Ups",
            "Chin-Ups",
            "Bent Over Barbell Row",
            "Dumbbell Row",
            "T-Bar Row",
            "Seated Cable Row",
            "Hyperextensions"
        ],
        shoulders: [
            "Overhead Shoulder Press",
            "Dumbbell Shoulder Press",
            "Arnold Press",
            "Lateral Raise",
            "Front Raise",
            "Rear Delt Fly",
            "Face Pulls",
            "Machine Shoulder Press",
            "Shrugs"
        ],
        arms: {
            biceps: [
                "Barbell Curl",
                "Dumbbell Curl",
                "Hammer Curl",
                "Concentration Curl",
                "Preacher Curl",
                "Cable Curl",
                "EZ Bar Curl"
            ],
            triceps: [
                "Tricep Pushdown",
                "Overhead Tricep Extension",
                "Skull Crushers",
                "Close Grip Bench Press",
                "Dips",
                "Tricep Kickback",
                "Cable Rope Extension"
            ]
        },
        legs: [
            "Barbell Squat",
            "Front Squat",
            "Leg Press",
            "Lunges",
            "Leg Extension",
            "Hamstring Curl",
            "Romanian Deadlift",
            "Calf Raises",
            "Hip Thrusts",
            "Glute Bridge",
            "Bulgarian Split Squat",
            "Hack Squat"
        ],
        core: [
            "Crunches",
            "Plank",
            "Russian Twist",
            "Leg Raise",
            "Hanging Knee Raise",
            "Cable Woodchoppers",
            "Mountain Climbers",
            "Bicycle Crunch",
            "Side Plank"
        ],
        full_body: [
            "Clean and Press",
            "Snatch",
            "Kettlebell Swing",
            "Burpees",
            "Battle Rope Waves",
            "Sled Push",
            "Thrusters",
            "Farmer's Walk"
        ]
    },
    cardio: {
        low_intensity: [
            "Walking (Treadmill/Floor)",
            "Light Cycling",
            "Elliptical Trainer",
            "Row Machine (Low Resistance)",
            "Light Stair Climber",
            "Slow Jogging"
        ],
        moderate_intensity: [
            "Jogging",
            "Outdoor Running",
            "Cycling",
            "Stair Climber Moderate",
            "Rowing Moderate",
            "Cross Trainer Workout"
        ],
        high_intensity_HIIT: [
            "Sprint Intervals",
            "Treadmill HIIT (30s/30s)",
            "Bike Sprints",
            "Jump Rope Intervals",
            "Burpee HIIT",
            "Tabata Training",
            "Battle Rope HIIT"
        ]
    },
    functional_training: [
        "Kettlebell Deadlift",
        "Kettlebell Clean and Press",
        "Kettlebell Goblet Squat",
        "TRX Row",
        "TRX Push-Up",
        "Battle Rope Slams",
        "Medicine Ball Slams",
        "Box Jumps",
        "Sandbag Carry",
        "Sled Push",
        "Sled Pull",
        "Farmer's Walk",
        "Plyometric Jumps"
    ],
    bodyweight: [
        "Push-Ups",
        "Incline Push-Ups",
        "Decline Push-Ups",
        "Bodyweight Squats",
        "Lunges",
        "Burpees",
        "Plank",
        "Pull-Ups",
        "Dips",
        "Mountain Climbers",
        "Jump Squats",
        "High Knees"
    ],
    flexibility_mobility: [
        "Hamstring Stretch",
        "Hip Flexor Stretch",
        "Calf Stretch",
        "Chest Opener Stretch",
        "Shoulder Mobility Circles",
        "Cat-Cow",
        "Foam Rolling (Quads)",
        "Foam Rolling (Hamstrings)",
        "Foam Rolling (Calves)",
        "Full Body Stretch Routine"
    ]
};

// Exercise category labels for UI
export const EXERCISE_CATEGORIES = {
    strength_training: {
        label: 'Strength Training',
        icon: '💪',
        subcategories: {
            chest: { label: 'Chest', icon: '🏋️' },
            back: { label: 'Back', icon: '🔙' },
            shoulders: { label: 'Shoulders', icon: '💪' },
            arms: {
                label: 'Arms',
                icon: '💪',
                subcategories: {
                    biceps: { label: 'Biceps', icon: '💪' },
                    triceps: { label: 'Triceps', icon: '💪' }
                }
            },
            legs: { label: 'Legs', icon: '🦵' },
            core: { label: 'Core', icon: '🔥' },
            full_body: { label: 'Full Body', icon: '🏋️' }
        }
    },
    cardio: {
        label: 'Cardio',
        icon: '🏃',
        subcategories: {
            low_intensity: { label: 'Low Intensity', icon: '🚶' },
            moderate_intensity: { label: 'Moderate Intensity', icon: '🏃' },
            high_intensity_HIIT: { label: 'High Intensity (HIIT)', icon: '🔥' }
        }
    },
    functional_training: {
        label: 'Functional Training',
        icon: '⚡'
    },
    bodyweight: {
        label: 'Bodyweight',
        icon: '🤸'
    },
    flexibility_mobility: {
        label: 'Flexibility & Mobility',
        icon: '🧘'
    }
};

// Meal types
export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

// Food suggestions by goal
export const FOOD_SUGGESTIONS = {
    lose: {
        title: 'Weight Loss Foods 🥗',
        items: [
            'Vegetable salad with lemon dressing',
            'Grilled chicken breast or paneer',
            'Boiled eggs (2-3)',
            'Greek yogurt with berries',
            'Steamed broccoli and carrots',
            'Lentil soup (dal)',
            'Cucumber and tomato salad',
            'Grilled fish with vegetables'
        ],
        tip: 'Focus on high-fiber, low-calorie foods that keep you full longer.'
    },
    build: {
        title: 'Muscle Building Foods 💪',
        items: [
            'Grilled chicken or turkey breast',
            'Paneer (cottage cheese)',
            'Chickpeas and lentils',
            'Greek yogurt or hung curd',
            'Eggs (whole or whites)',
            'Quinoa or brown rice',
            'Almonds and mixed nuts',
            'Protein smoothie with banana'
        ],
        tip: 'Aim for high-protein foods to support muscle growth and recovery.'
    },
    maintain: {
        title: 'Balanced Nutrition 🍽️',
        items: [
            'Whole grain roti with vegetables',
            'Brown rice with dal',
            'Mixed vegetable curry',
            'Grilled chicken or fish',
            'Fresh fruit salad',
            'Oatmeal with nuts',
            'Paneer tikka',
            'Vegetable khichdi'
        ],
        tip: 'Maintain a balanced diet with adequate proteins, carbs, and healthy fats.'
    },
    stamina: {
        title: 'Energy Boosting Foods ⚡',
        items: [
            'Oatmeal with banana',
            'Sweet potato',
            'Whole grain bread with peanut butter',
            'Brown rice with vegetables',
            'Dates and dried fruits',
            'Quinoa salad',
            'Smoothie with berries',
            'Trail mix with nuts and seeds'
        ],
        tip: 'Choose complex carbs and nutrient-dense foods for sustained energy.'
    }
};

// Workout suggestions by goal and level
export const WORKOUT_SUGGESTIONS = {
    lose: {
        beginner: [
            '🚶 20-30 min brisk walking',
            '🧘 15 min beginner yoga',
            '🚴 20 min light cycling'
        ],
        intermediate: [
            '🏃 25-30 min jogging',
            '💪 20 min bodyweight circuit (squats, push-ups, lunges)',
            '🚴 30 min moderate cycling'
        ],
        advanced: [
            '🔥 30 min HIIT workout',
            '🏃 40 min running',
            '💪 45 min strength + cardio combo'
        ]
    },
    build: {
        beginner: [
            '💪 3 sets of squats, push-ups, planks (10-12 reps)',
            '🏋️ Resistance band exercises (20 min)',
            '🧘 Yoga with strength focus (25 min)'
        ],
        intermediate: [
            '💪 4 sets of compound exercises (squats, deadlifts, rows)',
            '🏋️ Dumbbell workout (30-40 min)',
            '💪 Upper/lower body split routine'
        ],
        advanced: [
            '🏋️ Progressive overload strength training (45-60 min)',
            '💪 5x5 compound lifts',
            '🔥 Strength + HIIT combination'
        ]
    },
    maintain: {
        beginner: [
            '🚶 30 min daily walk',
            '🧘 20 min yoga or stretching',
            '🚴 25 min easy cycling'
        ],
        intermediate: [
            '🏃 30 min jogging 3x/week',
            '💪 Full body workout 2x/week',
            '🚴 40 min cycling'
        ],
        advanced: [
            '🏃 Mix of cardio and strength (40-50 min)',
            '💪 Balanced workout routine 4-5x/week',
            '🔥 Varied intensity training'
        ]
    },
    stamina: {
        beginner: [
            '🚶 25 min brisk walking with intervals',
            '🚴 20-30 min steady cycling',
            '🏊 15-20 min swimming (if available)'
        ],
        intermediate: [
            '🏃 30-40 min steady-state running',
            '🚴 45 min cycling with intervals',
            '🔥 25 min cardio circuit'
        ],
        advanced: [
            '🏃 50-60 min long-distance running',
            '🚴 60+ min endurance cycling',
            '🔥 40 min high-intensity cardio'
        ]
    }
};

// Mentor feedback templates
export const FEEDBACK_TEMPLATES = {
    // Calorie-based feedback
    overCalories: [
        "You've exceeded your calorie target today. Try to reduce portion sizes and avoid sugary drinks. 🥤",
        "Calorie intake is above target. Consider lighter dinner options and skip late-night snacks. 🌙",
        "You're over your daily calorie goal. Focus on vegetables and lean proteins for remaining meals. 🥗"
    ],
    underCaloriesWithWorkout: [
        "Excellent discipline today! Calorie intake is under control and you completed your workout. Keep it up! 💪",
        "Great job! You're maintaining a calorie deficit and staying active. This is the path to success! ✨",
        "Perfect balance today! Your nutrition and exercise are aligned with your goals. Well done! 🎯"
    ],
    underCaloriesNoWorkout: [
        "Good calorie control, but don't forget to exercise! Even a 20-minute walk counts. 🚶",
        "You're eating well, but your body needs movement too. Try to fit in some activity today. 💪",
        "Nutrition is on track, but add some physical activity to maximize results. 🏃"
    ],
    noWorkout: [
        "No workout logged yet. A 20-minute walk after dinner will still make today count. 🌙",
        "Haven't exercised today? It's not too late! Even 15 minutes of activity helps. ⏰",
        "Missing your workout today? Try some light stretching or a quick walk. Every bit counts! 🧘"
    ],
    goodDay: [
        "Fantastic day! Your calories and workout are perfectly balanced. This is how champions are made! 🏆",
        "You're crushing it today! Great nutrition and solid workout. Keep this momentum going! 🔥",
        "Perfect execution today! You're setting a great example of consistency. Proud of you! ⭐"
    ],

    // BMI-based feedback
    underweightLowCalories: [
        "Your BMI indicates you're underweight. Increase your calorie intake with healthy foods like nuts, dairy, and whole grains. 🥜",
        "You need to gain weight healthily. Add calorie-dense nutritious foods to your meals. 🍽️"
    ],
    overweightHighCalories: [
        "Your BMI is on the higher side and your calorie intake is frequently above target. Focus on portion control. ⚖️",
        "To improve your BMI, maintain a consistent calorie deficit and increase physical activity. 💪"
    ],
    normalBMIActive: [
        "You're maintaining a healthy BMI and staying active. Great job maintaining your lifestyle! ✅",
        "Perfect health markers! Your BMI is normal and you're consistently active. Keep it up! 🌟"
    ],

    // Consistency feedback
    inconsistentWorkout: [
        "For best results, consistency matters. Try to exercise at least 4-5 days a week. 📅",
        "Your workout frequency could improve. Aim for regular activity throughout the week. 🎯"
    ],
    consistentEffort: [
        "Your consistency is impressive! Regular effort leads to lasting results. 🌟",
        "You're building great habits! Consistent nutrition and exercise will transform your health. 🚀"
    ]
};

// Validation rules
export const VALIDATION = {
    age: { min: 10, max: 120 },
    height: { min: 100, max: 250 }, // cm
    weight: { min: 30, max: 300 }, // kg
    calories: { min: 0, max: 5000 },
    duration: { min: 1, max: 300 }, // minutes
    macros: { min: 0, max: 500 } // grams
};

// Error messages
export const ERROR_MESSAGES = {
    required: 'This field is required',
    invalidAge: `Age must be between ${VALIDATION.age.min} and ${VALIDATION.age.max}`,
    invalidHeight: `Height must be between ${VALIDATION.height.min} and ${VALIDATION.height.max} cm`,
    invalidWeight: `Weight must be between ${VALIDATION.weight.min} and ${VALIDATION.weight.max} kg`,
    invalidCalories: `Calories must be between ${VALIDATION.calories.min} and ${VALIDATION.calories.max}`,
    invalidDuration: `Duration must be between ${VALIDATION.duration.min} and ${VALIDATION.duration.max} minutes`,
    invalidNumber: 'Please enter a valid number',
    negativeValue: 'Value cannot be negative'
};
