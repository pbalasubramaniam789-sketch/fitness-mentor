// Fitness Mentor - Health Calculations

import { BMI_CATEGORIES, ACTIVITY_LEVELS, GOALS, WORKOUT_TYPES } from './constants.js';

/**
 * Calculate BMI and return value with category
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {Object} { value, category, label, color }
 */
export function calculateBMI(weight, height) {
    if (!weight || !height || weight <= 0 || height <= 0) {
        return { value: 0, category: 'unknown', label: 'Unknown', color: '#6b7280' };
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiValue = Math.round(bmi * 10) / 10;

    // Determine category
    let category = 'unknown';
    let categoryData = { label: 'Unknown', color: '#6b7280' };

    for (const [key, data] of Object.entries(BMI_CATEGORIES)) {
        if (bmiValue >= data.min && bmiValue < data.max) {
            category = key;
            categoryData = data;
            break;
        }
    }

    return {
        value: bmiValue,
        category,
        label: categoryData.label,
        color: categoryData.color
    };
}

/**
 * Calculate daily calorie needs using Mifflin-St Jeor equation
 * @param {Object} profile - User profile
 * @returns {number} Daily calorie target
 */
export function calculateDailyCalories(profile) {
    const { age, gender, height, weight, activityLevel, goal } = profile;

    if (!age || !height || !weight) {
        return 2000; // Default fallback
    }

    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Apply activity level multiplier
    const activityMultiplier = ACTIVITY_LEVELS[activityLevel]?.multiplier || 1.2;
    let tdee = bmr * activityMultiplier;

    // Apply goal adjustment
    const goalAdjustment = GOALS[goal]?.calorieAdjustment || 0;
    tdee += goalAdjustment;

    return Math.round(tdee);
}

/**
 * Calculate calories burned during workout
 * @param {string} type - Workout type
 * @param {number} duration - Duration in minutes
 * @param {string} intensity - low, medium, high
 * @param {number} weight - User weight in kg
 * @returns {number} Estimated calories burned
 */
export function calculateCaloriesBurned(type, duration, intensity, weight) {
    if (!type || !duration || !intensity || !weight) {
        return 0;
    }

    const workoutData = WORKOUT_TYPES[type];
    if (!workoutData) {
        return 0;
    }

    const burnRate = workoutData.burnRate[intensity] || 0.05;
    const caloriesBurned = duration * burnRate * weight;

    return Math.round(caloriesBurned);
}

/**
 * Calculate macronutrient targets based on calories and goal
 * @param {number} calories - Daily calorie target
 * @param {string} goal - Fitness goal
 * @returns {Object} { protein, carbs, fats } in grams
 */
export function calculateMacros(calories, goal) {
    let proteinPercent, carbsPercent, fatsPercent;

    switch (goal) {
        case 'lose':
            // Higher protein, moderate carbs, lower fats
            proteinPercent = 0.35;
            carbsPercent = 0.40;
            fatsPercent = 0.25;
            break;
        case 'build':
            // High protein, moderate carbs, moderate fats
            proteinPercent = 0.30;
            carbsPercent = 0.45;
            fatsPercent = 0.25;
            break;
        case 'stamina':
            // Moderate protein, higher carbs, lower fats
            proteinPercent = 0.25;
            carbsPercent = 0.50;
            fatsPercent = 0.25;
            break;
        default: // maintain
            // Balanced
            proteinPercent = 0.30;
            carbsPercent = 0.40;
            fatsPercent = 0.30;
    }

    return {
        protein: Math.round((calories * proteinPercent) / 4), // 4 cal per gram
        carbs: Math.round((calories * carbsPercent) / 4),
        fats: Math.round((calories * fatsPercent) / 9) // 9 cal per gram
    };
}

/**
 * Get fitness level based on activity level and workout frequency
 * @param {string} activityLevel - User's activity level
 * @param {number} avgWorkoutsPerWeek - Average workouts per week
 * @returns {string} beginner, intermediate, or advanced
 */
export function getFitnessLevel(activityLevel, avgWorkoutsPerWeek = 0) {
    if (activityLevel === 'sedentary' || avgWorkoutsPerWeek < 2) {
        return 'beginner';
    } else if (activityLevel === 'very' || avgWorkoutsPerWeek >= 5) {
        return 'advanced';
    } else {
        return 'intermediate';
    }
}

/**
 * Calculate percentage of goal achieved
 * @param {number} current - Current value
 * @param {number} target - Target value
 * @returns {number} Percentage (0-100)
 */
export function calculateProgress(current, target) {
    if (!target || target === 0) return 0;
    const percentage = (current / target) * 100;
    return Math.min(Math.round(percentage), 100);
}

/**
 * Calculate average from array of numbers
 * @param {Array} values - Array of numbers
 * @returns {number} Average value
 */
export function calculateAverage(values) {
    if (!values || values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / values.length);
}

/**
 * Get date string in YYYY-MM-DD format
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export function getDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Get friendly date string
 * @param {Date} date - Date object
 * @returns {string} Friendly date string
 */
export function getFriendlyDate(date = new Date()) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get time string in HH:MM format
 * @param {Date} date - Date object
 * @returns {string} Time string
 */
export function getTimeString(date = new Date()) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
