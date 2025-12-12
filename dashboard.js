// Fitness Mentor - Dashboard Component

import { loadProfile, getTotalCalories, getTotalWorkoutMinutes, getTotalCaloriesBurned } from './storage.js';
import { calculateBMI, getFriendlyDate, calculateProgress } from './calculations.js';
import { generateDailyFeedback, getMotivationalMessage } from './mentor.js';
import { GOALS } from './constants.js';

export function renderDashboard() {
    const profile = loadProfile();
    if (!profile) return;

    const contentEl = document.getElementById('dashboard-content');

    const todayCalories = getTotalCalories();
    const todayWorkout = getTotalWorkoutMinutes();
    const todayBurned = getTotalCaloriesBurned();
    const bmiData = calculateBMI(profile.weight, profile.height);
    const calorieProgress = calculateProgress(todayCalories, profile.dailyCalorieTarget);
    const workoutProgress = calculateProgress(todayBurned, 500);

    const feedback = generateDailyFeedback(profile, profile.dailyCalorieTarget);
    const motivation = getMotivationalMessage(profile);

    const goalLabel = GOALS[profile.goal]?.label || 'Unknown';

    contentEl.innerHTML = `
        <div class="dashboard-header">
            <div class="greeting-card">
                <h1>Welcome back, ${profile.name}! 👋</h1>
                <p class="date-display">${getFriendlyDate()}</p>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background-color: ${bmiData.color};">📊</div>
                <div class="stat-content">
                    <div class="stat-label">BMI</div>
                    <div class="stat-value">${bmiData.value}</div>
                    <div class="stat-category">${bmiData.label}</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon" style="background-color: #667eea;">🎯</div>
                <div class="stat-content">
                    <div class="stat-label">Daily Goal</div>
                    <div class="stat-value">${profile.goal === 'lose' ? 'Lose' : profile.goal === 'build' ? 'Build' : profile.goal === 'maintain' ? 'Maintain' : 'Stamina'}</div>
                    <div class="stat-category">${goalLabel}</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon" style="background-color: #10b981;">⚡</div>
                <div class="stat-content">
                    <div class="stat-label">Calories</div>
                    <div class="stat-value">${todayCalories}</div>
                    <div class="stat-category">of ${profile.dailyCalorieTarget}</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon" style="background-color: #f59e0b;">🏃</div>
                <div class="stat-content">
                    <div class="stat-label">Workout</div>
                    <div class="stat-value">${todayWorkout}</div>
                    <div class="stat-category">minutes today</div>
                </div>
            </div>
        </div>

        <div class="progress-section">
            <div class="progress-card">
                <div class="progress-header">
                    <span class="progress-title">Daily Calories</span>
                    <span class="progress-percentage">${calorieProgress}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${Math.min(calorieProgress, 100)}%;"></div>
                </div>
                <div class="progress-footer">
                    <span>${todayCalories} / ${profile.dailyCalorieTarget} kcal</span>
                </div>
            </div>

            <div class="progress-card">
                <div class="progress-header">
                    <span class="progress-title">Calories Burned</span>
                    <span class="progress-percentage">${workoutProgress}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${Math.min(workoutProgress, 100)}%;"></div>
                </div>
                <div class="progress-footer">
                    <span>${todayBurned} / 500 kcal</span>
                </div>
            </div>
        </div>

        <div class="feedback-section">
            <div class="feedback-card">
                <div class="feedback-header">💪 Your Coach Says</div>
                <p class="feedback-message">${feedback}</p>
            </div>

            <div class="feedback-card motivation-card">
                <div class="feedback-header">✨ Motivation</div>
                <p class="feedback-message">${motivation}</p>
            </div>
        </div>

        <div class="quick-actions">
            <button class="btn btn-primary" onclick="window.navigateToPage('meals')">
                🍽️ Log Meal
            </button>
            <button class="btn btn-primary" onclick="window.navigateToPage('workout')">
                🏋️ Log Workout
            </button>
            <button class="btn btn-primary" onclick="window.navigateToPage('progress')">
                📈 View Progress
            </button>
        </div>
    `;
}
