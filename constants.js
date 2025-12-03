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

// Food database with nutritional information per unit
export const FOOD_DATABASE = {
  'idly': { calories: 38, protein: 1.5, carbs: 8, fats: 0.2 },
  'dosa': { calories: 133, protein: 2, carbs: 20, fats: 5 },
  'rice': { calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
  'dal': { calories: 45, protein: 3, carbs: 8, fats: 0.3 },
  'chicken': { calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  'paneer': { calories: 265, protein: 28, carbs: 3, fats: 17 },
  'egg': { calories: 70, protein: 6, carbs: 0.4, fats: 5 },
  'milk': { calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3 },
  'banana': { calories: 89, protein: 1.1, carbs: 23, fats: 0.3 },
  'apple': { calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
  'fish': { calories: 100, protein: 20, carbs: 0, fats: 1 },
  'bread': { calories: 79, protein: 2.7, carbs: 14, fats: 1 },
  'roti': { calories: 104, protein: 3.2, carbs: 20, fats: 1 }
};

// Function to search and calculate food nutrition
export function searchFoodNutrition(foodInput) {
  const input = foodInput.toLowerCase().trim();
  let match = null;
  let quantity = 1;
  
  // Try to extract quantity and food name (e.g., '2 idly')
  const parts = input.split(' ');
  if (parts.length > 1 && !isNaN(parts[0])) {
    quantity = parseFloat(parts[0]);
    const foodName = parts.slice(1).join(' ').toLowerCase();
    match = Object.keys(FOOD_DATABASE).find(key => key.includes(foodName) || foodName.includes(key));
  } else {
    match = Object.keys(FOOD_DATABASE).find(key => key.includes(input) || input.includes(key));
  }
  
  if (match) {
    const food = FOOD_DATABASE[match];
    return {
      foodName: match,
      quantity: quantity,
      calories: Math.round(food.calories * quantity * 10) / 10,
      protein: Math.round(food.protein * quantity * 10) / 10,
      carbs: Math.round(food.carbs * quantity * 10) / 10,
      fats: Math.round(food.fats * quantity * 10) / 10
    };
  }
  return null;
}

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

