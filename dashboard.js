// Fitness Mentor - Dashboard Component

import { loadProfile, getTotalCalories, getTotalWorkoutMinutes, getTotalCaloriesBurned } from '../utils/storage.js';
import { calculateBMI, getFriendlyDate, calculateProgress } from '../utils/calculations.js';
import { generateDailyFeedback, getMotivationalMessage } from '../utils/mentor.js';
import { GOALS } from '../utils/constants.js';

/**
 * Render dashboard page
 */
export function renderDashboard() {
    const container = document.getElementById('dashboard-content');
    const profile = loadProfile();

    if (!profile) {
        container.innerHTML = '<p>Please complete onboarding first.</p>';
        return;
    }

    // Get today's data
    const todayCalories = getTotalCalories();
    const todayWorkoutMinutes = getTotalWorkoutMinutes();
    const todayCaloriesBurned = getTotalCaloriesBurned();
    const caloriesRemaining = profile.dailyCalories - todayCalories;
    const calorieProgress = calculateProgress(todayCalories, profile.dailyCalories);

    // Get BMI data
    const bmiData = calculateBMI(profile.weight, profile.height);

    // Get mentor feedback
    const feedback = generateDailyFeedback(profile, profile.dailyCalories);
    const motivation = getMotivationalMessage(profile.goal);

    // Get goal label
    const goalLabel = GOALS[profile.goal]?.label || 'Unknown';

    container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Hi, ${profile.name}! 👋</h1>
      <p class="page-subtitle">${getFriendlyDate()}</p>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-3 mb-4">
      <div class="card">
        <div class="stat">
          <div class="stat-value">${todayCalories}</div>
          <div class="stat-label">Calories Today</div>
          <div class="badge ${caloriesRemaining >= 0 ? 'badge-success' : 'badge-warning'} mt-2">
            ${caloriesRemaining >= 0 ? `${caloriesRemaining} remaining` : `${Math.abs(caloriesRemaining)} over`}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="stat">
          <div class="stat-value">${todayWorkoutMinutes}</div>
          <div class="stat-label">Workout Minutes</div>
          <div class="badge ${todayWorkoutMinutes > 0 ? 'badge-success' : 'badge-warning'} mt-2">
            ${todayWorkoutMinutes > 0 ? 'Completed ✅' : 'Pending ⏳'}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="stat">
          <div class="stat-value">${todayCaloriesBurned}</div>
          <div class="stat-label">Calories Burned</div>
          <div class="badge badge-primary mt-2">
            From Exercise 🔥
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-2">
      <!-- BMI & Goal Card -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span>📊</span>
            Your Health Profile
          </h3>
        </div>
        <div class="card-body">
          <div class="flex justify-between items-center mb-3">
            <div>
              <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.25rem;">BMI</div>
              <div style="font-size: var(--font-size-3xl); font-weight: 800; color: ${bmiData.color};">
                ${bmiData.value}
              </div>
            </div>
            <div class="badge" style="background: ${bmiData.color}20; color: ${bmiData.color};">
              ${bmiData.label}
            </div>
          </div>
          
          <div style="height: 1px; background: var(--border); margin: var(--spacing-lg) 0;"></div>
          
          <div>
            <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.5rem;">Fitness Goal</div>
            <div style="font-size: var(--font-size-xl); font-weight: 600; color: var(--text-primary);">
              ${goalLabel}
            </div>
            <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-top: 0.5rem;">
              Daily Target: ${profile.dailyCalories} calories
            </div>
          </div>
        </div>
      </div>

      <!-- Today's Summary -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span>📈</span>
            Today's Summary
          </h3>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <div class="progress-label">
              <span>Calorie Intake</span>
              <span>${todayCalories} / ${profile.dailyCalories}</span>
            </div>
            <div class="progress">
              <div class="progress-bar" style="width: ${Math.min(calorieProgress, 100)}%;"></div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-top: var(--spacing-lg);">
            <div>
              <div style="font-size: var(--font-size-sm); color: var(--text-muted);">Consumed</div>
              <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--primary);">
                ${todayCalories}
              </div>
            </div>
            <div>
              <div style="font-size: var(--font-size-sm); color: var(--text-muted);">Burned</div>
              <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--success);">
                ${todayCaloriesBurned}
              </div>
            </div>
          </div>

          <div style="margin-top: var(--spacing-lg); padding-top: var(--spacing-lg); border-top: 1px solid var(--border);">
            <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.5rem;">
              Net Calories
            </div>
            <div style="font-size: var(--font-size-2xl); font-weight: 800;" class="text-gradient">
              ${todayCalories - todayCaloriesBurned}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mentor Feedback -->
    <div class="card mt-4" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border-color: rgba(102, 126, 234, 0.3);">
      <div class="card-header">
        <h3 class="card-title">
          <span>🧠</span>
          Your Mentor Says
        </h3>
      </div>
      <div class="card-body">
        <p style="font-size: var(--font-size-lg); line-height: 1.8; color: var(--text-primary); margin-bottom: var(--spacing-lg);">
          ${feedback}
        </p>
        <div style="padding: var(--spacing-md); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius); border-left: 3px solid var(--primary);">
          <strong style="color: var(--primary);">💡 Motivation:</strong>
          <span style="color: var(--text-secondary); margin-left: var(--spacing-sm);">${motivation}</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-2 mt-4">
      <button class="btn btn-primary btn-lg" onclick="window.navigateToPage('meals')">
        🍽️ Log a Meal
      </button>
      <button class="btn btn-success btn-lg" onclick="window.navigateToPage('workout')">
        💪 Log a Workout
      </button>
    </div>
  `;
}
