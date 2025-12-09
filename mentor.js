// Fitness Mentor - Intelligent Feedback Engine

import { FEEDBACK_TEMPLATES, BMI_CATEGORIES } from './constants.js';
import { calculateBMI } from './calculations.js';
import {
    getTotalCalories,
    getTotalWorkoutMinutes,
    getWorkoutFrequency
} from './storage.js';

/**
 * Get random item from array
 * @param {Array} array - Array to pick from
 * @returns {*} Random item
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate personalized feedback based on user's daily data
 * @param {Object} profile - User profile
 * @param {number} calorieTarget - Daily calorie target
 * @returns {string} Personalized feedback message
 */
export function generateDailyFeedback(profile, calorieTarget) {
    const todayCalories = getTotalCalories();
    const todayWorkoutMinutes = getTotalWorkoutMinutes();
    const workoutFrequency = getWorkoutFrequency(7);

    const bmiData = calculateBMI(profile.weight, profile.height);
    const calorieRatio = todayCalories / calorieTarget;

    let feedback = [];

    // Primary feedback based on calories and workout
    if (todayCalories > calorieTarget * 1.1) {
        // Over calories
        feedback.push(getRandomItem(FEEDBACK_TEMPLATES.overCalories));
    } else if (todayCalories < calorieTarget * 0.9 && todayWorkoutMinutes > 0) {
        // Under calories with workout - excellent!
        feedback.push(getRandomItem(FEEDBACK_TEMPLATES.underCaloriesWithWorkout));
    } else if (todayCalories < calorieTarget && todayWorkoutMinutes === 0) {
        // Under calories but no workout
        feedback.push(getRandomItem(FEEDBACK_TEMPLATES.underCaloriesNoWorkout));
    } else if (todayWorkoutMinutes === 0) {
        // No workout logged
        feedback.push(getRandomItem(FEEDBACK_TEMPLATES.noWorkout));
    } else {
        // Good balance
        feedback.push(getRandomItem(FEEDBACK_TEMPLATES.goodDay));
    }

    // Secondary feedback based on BMI and patterns
    if (bmiData.category === 'underweight' && todayCalories < calorieTarget) {
        feedback.push(getRandomItem(FEEDBACK_TEMPLATES.underweightLowCalories));
    } else if (bmiData.category === 'overweight' || bmiData.category === 'obese') {
        if (calorieRatio > 1.1) {
            feedback.push(getRandomItem(FEEDBACK_TEMPLATES.overweightHighCalories));
        }
    } else if (bmiData.category === 'normal' && todayWorkoutMinutes > 0) {
        if (Math.random() > 0.7) { // Don't show every time
            feedback.push(getRandomItem(FEEDBACK_TEMPLATES.normalBMIActive));
        }
    }

    // Consistency feedback
    if (workoutFrequency < 3 && profile.goal !== 'maintain') {
        if (Math.random() > 0.6) {
            feedback.push(getRandomItem(FEEDBACK_TEMPLATES.inconsistentWorkout));
        }
    } else if (workoutFrequency >= 5) {
        if (Math.random() > 0.7) {
            feedback.push(getRandomItem(FEEDBACK_TEMPLATES.consistentEffort));
        }
    }

    // Join feedback messages
    return feedback.join(' ');
}

/**
 * Generate progress-based insights
 * @param {Object} profile - User profile
 * @param {Array} progressData - Progress entries
 * @returns {string} Progress insights
 */
export function generateProgressInsights(profile, progressData) {
    if (!progressData || progressData.length < 2) {
        return "Keep logging your weight to track progress over time. Consistency is key! 📊";
    }

    const latest = progressData[0];
    const oldest = progressData[progressData.length - 1];
    const weightChange = parseFloat(latest.weight) - parseFloat(oldest.weight);
    const daysDiff = Math.abs(
        (new Date(latest.date) - new Date(oldest.date)) / (1000 * 60 * 60 * 24)
    );

    let insights = [];

    // Weight change analysis
    if (profile.goal === 'lose') {
        if (weightChange < -2) {
            insights.push(`Excellent progress! You've lost ${Math.abs(weightChange).toFixed(1)} kg. Keep up the great work! 🎉`);
        } else if (weightChange < 0) {
            insights.push(`You're on the right track! Lost ${Math.abs(weightChange).toFixed(1)} kg so far. Stay consistent! 💪`);
        } else if (weightChange > 0) {
            insights.push(`Weight has increased by ${weightChange.toFixed(1)} kg. Review your calorie intake and increase activity. 🎯`);
        } else {
            insights.push(`Weight is stable. To lose weight, maintain a calorie deficit and exercise regularly. 📉`);
        }
    } else if (profile.goal === 'build') {
        if (weightChange > 2) {
            insights.push(`Great muscle building progress! Gained ${weightChange.toFixed(1)} kg. Ensure it's quality mass with proper nutrition. 💪`);
        } else if (weightChange > 0) {
            insights.push(`You've gained ${weightChange.toFixed(1)} kg. Keep focusing on protein and strength training! 🏋️`);
        } else if (weightChange < 0) {
            insights.push(`Weight decreased by ${Math.abs(weightChange).toFixed(1)} kg. Increase calorie intake to support muscle growth. 🍽️`);
        } else {
            insights.push(`Weight is stable. To build muscle, increase calories and protein intake. 📈`);
        }
    } else {
        if (Math.abs(weightChange) < 1) {
            insights.push(`Weight is well maintained! Fluctuation of only ${Math.abs(weightChange).toFixed(1)} kg. Excellent! ✅`);
        } else {
            insights.push(`Weight changed by ${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)} kg. Adjust diet if needed to maintain. ⚖️`);
        }
    }

    // Rate of change
    if (daysDiff > 7) {
        const weeklyChange = (weightChange / daysDiff) * 7;
        if (Math.abs(weeklyChange) > 1) {
            insights.push(`⚠️ Rapid change detected (${weeklyChange.toFixed(1)} kg/week). Aim for 0.5-1 kg per week for healthy progress.`);
        }
    }

    return insights.join(' ');
}

/**
 * Get motivational message based on goal
 * @param {string} goal - User's fitness goal
 * @returns {string} Motivational message
 */
export function getMotivationalMessage(goal) {
    const messages = {
        lose: [
            "Every healthy choice brings you closer to your goal! 🎯",
            "Small steps lead to big changes. Keep going! 🚶",
            "You're stronger than your cravings! 💪",
            "Progress, not perfection. You've got this! ⭐"
        ],
        build: [
            "Muscles are built with consistency and dedication! 💪",
            "Every rep counts. Keep pushing! 🏋️",
            "Fuel your body, train your muscles, see results! 🔥",
            "Strength doesn't come from what you can do, but from overcoming what you thought you couldn't! 🌟"
        ],
        maintain: [
            "Balance is the key to sustainable health! ⚖️",
            "Maintaining is just as important as achieving! ✅",
            "You're doing great keeping your healthy lifestyle! 🌟",
            "Consistency in maintenance shows true discipline! 💫"
        ],
        stamina: [
            "Endurance is built one workout at a time! 🏃",
            "Push your limits, expand your capacity! ⚡",
            "Stamina grows with every challenge you overcome! 🔥",
            "Keep moving, keep improving! 🚀"
        ]
    };

    const goalMessages = messages[goal] || messages.maintain;
    return getRandomItem(goalMessages);
}

/**
 * Get meal timing advice
 * @param {number} currentHour - Current hour (0-23)
 * @param {number} caloriesConsumed - Calories consumed so far
 * @param {number} calorieTarget - Daily calorie target
 * @returns {string} Meal timing advice
 */
export function getMealTimingAdvice(currentHour, caloriesConsumed, calorieTarget) {
    const remaining = calorieTarget - caloriesConsumed;
    const percentConsumed = (caloriesConsumed / calorieTarget) * 100;

    if (currentHour < 12) {
        // Morning
        if (percentConsumed < 20) {
            return "Don't skip breakfast! It kickstarts your metabolism. 🌅";
        } else if (percentConsumed > 40) {
            return "You've had a big breakfast. Keep lunch and dinner lighter. 🥗";
        }
    } else if (currentHour < 17) {
        // Afternoon
        if (percentConsumed < 40) {
            return "Make sure to have a proper lunch to maintain energy levels. 🍽️";
        } else if (percentConsumed > 70) {
            return "You've consumed most of your calories. Keep dinner light and healthy. 🥗";
        }
    } else {
        // Evening
        if (remaining < 300) {
            return "You have limited calories left. Choose a light, protein-rich dinner. 🌙";
        } else if (remaining > 800) {
            return "You have calories to spare. Have a balanced dinner but avoid late-night snacking. 🍽️";
        }
    }

    return "";
}

/**
 * Get workout timing suggestion
 * @param {number} currentHour - Current hour (0-23)
 * @param {boolean} hasWorkedOut - Whether user has worked out today
 * @returns {string} Workout timing suggestion
 */
export function getWorkoutTimingSuggestion(currentHour, hasWorkedOut) {
    if (hasWorkedOut) {
        return "Great job completing your workout today! 💪";
    }

    if (currentHour < 12) {
        return "Morning workouts boost energy for the whole day! 🌅";
    } else if (currentHour < 17) {
        return "Afternoon is a great time for a workout. Your body is warmed up! ☀️";
    } else if (currentHour < 21) {
        return "Evening workout can help relieve stress. Just don't exercise too close to bedtime! 🌙";
    } else {
        return "It's getting late. A light walk or stretching would be perfect! 🌙";
    }
}
