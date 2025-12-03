// Fitness Mentor - LocalStorage Manager

import { getDateString } from './calculations.js';

const STORAGE_KEYS = {
    PROFILE: 'fitness_mentor_profile',
    MEALS: 'fitness_mentor_meals',
    WORKOUTS: 'fitness_mentor_workouts',
    PROGRESS: 'fitness_mentor_progress',
    VERSION: 'fitness_mentor_version'
};

const CURRENT_VERSION = '1.0.0';

/**
 * Initialize storage with version check
 */
export function initStorage() {
    const version = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (!version) {
        localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
    }
    // Future: Handle migrations here if version changes
}

// ==================== PROFILE ====================

/**
 * Save user profile
 * @param {Object} profile - User profile data
 */
export function saveProfile(profile) {
    try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
        return true;
    } catch (error) {
        console.error('Error saving profile:', error);
        return false;
    }
}

/**
 * Load user profile
 * @returns {Object|null} User profile or null
 */
export function loadProfile() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading profile:', error);
        return null;
    }
}

/**
 * Check if user has completed onboarding
 * @returns {boolean}
 */
export function hasProfile() {
    return loadProfile() !== null;
}

// ==================== MEALS ====================

/**
 * Get all meals data
 * @returns {Object} Meals organized by date
 */
function getAllMeals() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.MEALS);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading meals:', error);
        return {};
    }
}

/**
 * Save all meals data
 * @param {Object} meals - Meals data
 */
function saveAllMeals(meals) {
    try {
        localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
        return true;
    } catch (error) {
        console.error('Error saving meals:', error);
        return false;
    }
}

/**
 * Add a meal entry
 * @param {Object} meal - Meal data
 * @returns {Object} Added meal with ID and timestamp
 */
export function addMeal(meal) {
    const meals = getAllMeals();
    const today = getDateString();

    if (!meals[today]) {
        meals[today] = [];
    }

    const mealEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...meal
    };

    meals[today].push(mealEntry);
    saveAllMeals(meals);

    return mealEntry;
}

/**
 * Get meals for a specific date
 * @param {string} date - Date string (YYYY-MM-DD)
 * @returns {Array} Array of meals
 */
export function getMealsByDate(date = getDateString()) {
    const meals = getAllMeals();
    return meals[date] || [];
}

/**
 * Delete a meal by ID
 * @param {string} mealId - Meal ID
 * @param {string} date - Date string
 * @returns {boolean} Success status
 */
export function deleteMeal(mealId, date = getDateString()) {
    const meals = getAllMeals();

    if (meals[date]) {
        meals[date] = meals[date].filter(meal => meal.id !== mealId);
        return saveAllMeals(meals);
    }

    return false;
}

/**
 * Get total calories for a date
 * @param {string} date - Date string
 * @returns {number} Total calories
 */
export function getTotalCalories(date = getDateString()) {
    const meals = getMealsByDate(date);
    return meals.reduce((total, meal) => total + (parseFloat(meal.calories) || 0), 0);
}

// ==================== WORKOUTS ====================

/**
 * Get all workouts data
 * @returns {Object} Workouts organized by date
 */
function getAllWorkouts() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading workouts:', error);
        return {};
    }
}

/**
 * Save all workouts data
 * @param {Object} workouts - Workouts data
 */
function saveAllWorkouts(workouts) {
    try {
        localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
        return true;
    } catch (error) {
        console.error('Error saving workouts:', error);
        return false;
    }
}

/**
 * Add a workout entry
 * @param {Object} workout - Workout data
 * @returns {Object} Added workout with ID and timestamp
 */
export function addWorkout(workout) {
    const workouts = getAllWorkouts();
    const today = getDateString();

    if (!workouts[today]) {
        workouts[today] = [];
    }

    const workoutEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...workout
    };

    workouts[today].push(workoutEntry);
    saveAllWorkouts(workouts);

    return workoutEntry;
}

/**
 * Get workouts for a specific date
 * @param {string} date - Date string (YYYY-MM-DD)
 * @returns {Array} Array of workouts
 */
export function getWorkoutsByDate(date = getDateString()) {
    const workouts = getAllWorkouts();
    return workouts[date] || [];
}

/**
 * Delete a workout by ID
 * @param {string} workoutId - Workout ID
 * @param {string} date - Date string
 * @returns {boolean} Success status
 */
export function deleteWorkout(workoutId, date = getDateString()) {
    const workouts = getAllWorkouts();

    if (workouts[date]) {
        workouts[date] = workouts[date].filter(workout => workout.id !== workoutId);
        return saveAllWorkouts(workouts);
    }

    return false;
}

/**
 * Get total workout minutes for a date
 * @param {string} date - Date string
 * @returns {number} Total minutes
 */
export function getTotalWorkoutMinutes(date = getDateString()) {
    const workouts = getWorkoutsByDate(date);
    return workouts.reduce((total, workout) => total + (parseInt(workout.duration) || 0), 0);
}

/**
 * Get total calories burned for a date
 * @param {string} date - Date string
 * @returns {number} Total calories burned
 */
export function getTotalCaloriesBurned(date = getDateString()) {
    const workouts = getWorkoutsByDate(date);
    return workouts.reduce((total, workout) => total + (parseInt(workout.caloriesBurned) || 0), 0);
}

// ==================== PROGRESS ====================

/**
 * Get all progress entries
 * @returns {Array} Array of progress entries
 */
export function getAllProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading progress:', error);
        return [];
    }
}

/**
 * Save all progress data
 * @param {Array} progress - Progress data
 */
function saveAllProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
        return true;
    } catch (error) {
        console.error('Error saving progress:', error);
        return false;
    }
}

/**
 * Add a progress entry
 * @param {Object} entry - Progress entry (date, weight, waist)
 * @returns {Object} Added entry with ID
 */
export function addProgressEntry(entry) {
    const progress = getAllProgress();

    const progressEntry = {
        id: Date.now().toString(),
        ...entry
    };

    progress.push(progressEntry);

    // Sort by date (newest first)
    progress.sort((a, b) => new Date(b.date) - new Date(a.date));

    saveAllProgress(progress);

    return progressEntry;
}

/**
 * Delete a progress entry by ID
 * @param {string} entryId - Entry ID
 * @returns {boolean} Success status
 */
export function deleteProgressEntry(entryId) {
    let progress = getAllProgress();
    progress = progress.filter(entry => entry.id !== entryId);
    return saveAllProgress(progress);
}

/**
 * Get latest weight
 * @returns {number|null} Latest weight or null
 */
export function getLatestWeight() {
    const progress = getAllProgress();
    if (progress.length === 0) return null;
    return parseFloat(progress[0].weight);
}

/**
 * Get starting weight (oldest entry)
 * @returns {number|null} Starting weight or null
 */
export function getStartingWeight() {
    const progress = getAllProgress();
    if (progress.length === 0) return null;
    return parseFloat(progress[progress.length - 1].weight);
}

// ==================== ANALYTICS ====================

/**
 * Get average daily calories over last N days
 * @param {number} days - Number of days to average
 * @returns {number} Average calories
 */
export function getAverageCalories(days = 7) {
    const meals = getAllMeals();
    const dates = Object.keys(meals).sort().slice(-days);

    if (dates.length === 0) return 0;

    const totalCalories = dates.reduce((sum, date) => {
        return sum + getTotalCalories(date);
    }, 0);

    return Math.round(totalCalories / dates.length);
}

/**
 * Get average workout minutes over last N days
 * @param {number} days - Number of days to average
 * @returns {number} Average minutes
 */
export function getAverageWorkoutMinutes(days = 7) {
    const workouts = getAllWorkouts();
    const dates = Object.keys(workouts).sort().slice(-days);

    if (dates.length === 0) return 0;

    const totalMinutes = dates.reduce((sum, date) => {
        return sum + getTotalWorkoutMinutes(date);
    }, 0);

    return Math.round(totalMinutes / dates.length);
}

/**
 * Get workout frequency (days with workouts in last N days)
 * @param {number} days - Number of days to check
 * @returns {number} Number of days with workouts
 */
export function getWorkoutFrequency(days = 7) {
    const workouts = getAllWorkouts();
    const dates = Object.keys(workouts).sort().slice(-days);
    return dates.filter(date => workouts[date].length > 0).length;
}

// ==================== UTILITY ====================

/**
 * Clear all data (for reset/logout)
 */
export function clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
        if (key !== STORAGE_KEYS.VERSION) {
            localStorage.removeItem(key);
        }
    });
}

/**
 * Export all data as JSON
 * @returns {Object} All app data
 */
export function exportData() {
    return {
        version: CURRENT_VERSION,
        profile: loadProfile(),
        meals: getAllMeals(),
        workouts: getAllWorkouts(),
        progress: getAllProgress(),
        exportDate: new Date().toISOString()
    };
}
