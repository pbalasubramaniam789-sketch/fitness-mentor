// Fitness Mentor - Dashboard Component

import { loadProfile, getTotalCalories, getTotalWorkoutMinutes, getTotalCaloriesBurned } from './storage.js';
import { calculateBMI, getFriendlyDate, calculateProgress } from './calculations.js';
import { generateDailyFeedback, getMotivationalMessage } from './mentor.js';
import { GOALS } from './constants.js';
