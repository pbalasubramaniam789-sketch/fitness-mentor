// Fitness Mentor - Meals Component

import { loadProfile, addMeal, getMealsByDate, deleteMeal, getTotalCalories } from './storage.js';
import { getTimeString } from './calculations.js';
import { MEAL_TYPES, FOOD_SUGGESTIONS, VALIDATION, ERROR_MESSAGES } from './constants.js';

/**
 * Render meals page
 */
export function renderMeals() {
    const container = document.getElementById('meals-content');
    const profile = loadProfile();

    if (!profile) {
        container.innerHTML = '<p>Please complete onboarding first.</p>';
        return;
    }

    const meals = getMealsByDate();
    const totalCalories = getTotalCalories();
    const remainingCalories = profile.dailyCalories - totalCalories;

    // Get food suggestions based on goal
    const suggestions = FOOD_SUGGESTIONS[profile.goal] || FOOD_SUGGESTIONS.maintain;

    container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">🍽️ Meal & Food Tracker</h1>
      <p class="page-subtitle">Track your daily nutrition and get personalized food suggestions</p>
    </div>

    <div class="grid grid-2">
      <!-- Add Meal Form -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span>➕</span>
            Log a Meal
          </h3>
        </div>
        <div class="card-body">
          <form id="add-meal-form">
            <div class="form-group">
              <label class="form-label required">Meal Type</label>
              <select id="meal-type" class="form-select" required>
                <option value="">Select meal type</option>
                ${MEAL_TYPES.map(type => `<option value="${type}">${type}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label required">Food Name</label>
              <input type="text" id="meal-food" class="form-input" placeholder="e.g., Grilled chicken salad" required>
            </div>

            <div class="form-group">
              <label class="form-label required">Calories</label>
              <input type="number" id="meal-calories" class="form-input" placeholder="250" min="0" max="5000" required>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Protein (g)</label>
                <input type="number" id="meal-protein" class="form-input" placeholder="20" min="0">
              </div>
              <div class="form-group">
                <label class="form-label">Carbs (g)</label>
                <input type="number" id="meal-carbs" class="form-input" placeholder="30" min="0">
              </div>
              <div class="form-group">
                <label class="form-label">Fats (g)</label>
                <input type="number" id="meal-fats" class="form-input" placeholder="10" min="0">
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block">
              Add Meal
            </button>
          </form>
        </div>
      </div>

      <!-- Calorie Summary -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span>📊</span>
            Today's Nutrition
          </h3>
        </div>
        <div class="card-body">
          <div class="stat text-center mb-3">
            <div class="stat-value">${totalCalories}</div>
            <div class="stat-label">Total Calories</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-top: var(--spacing-lg);">
            <div style="text-align: center; padding: var(--spacing-md); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius);">
              <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.25rem;">Target</div>
              <div style="font-size: var(--font-size-xl); font-weight: 700; color: var(--primary);">
                ${profile.dailyCalories}
              </div>
            </div>
            <div style="text-align: center; padding: var(--spacing-md); background: ${remainingCalories >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; border-radius: var(--radius);">
              <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.25rem;">Remaining</div>
              <div style="font-size: var(--font-size-xl); font-weight: 700; color: ${remainingCalories >= 0 ? 'var(--success)' : 'var(--danger)'};">
                ${remainingCalories}
              </div>
            </div>
          </div>

          <div style="margin-top: var(--spacing-lg);">
            <div class="progress-label">
              <span>Daily Progress</span>
              <span>${Math.round((totalCalories / profile.dailyCalories) * 100)}%</span>
            </div>
            <div class="progress">
              <div class="progress-bar" style="width: ${Math.min((totalCalories / profile.dailyCalories) * 100, 100)}%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Today's Meals -->
    <div class="card mt-4">
      <div class="card-header">
        <h3 class="card-title">
          <span>📝</span>
          Today's Meals
        </h3>
        <span class="badge badge-primary">${meals.length} meals logged</span>
      </div>
      <div class="card-body">
        ${meals.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">🍽️</div>
            <div class="empty-state-text">No meals logged yet today</div>
            <p class="text-muted">Start tracking your nutrition by adding your first meal above!</p>
          </div>
        ` : `
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Food</th>
                  <th>Calories</th>
                  <th>Macros</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${meals.map(meal => `
                  <tr>
                    <td>${getTimeString(new Date(meal.timestamp))}</td>
                    <td><span class="badge badge-primary">${meal.type}</span></td>
                    <td style="font-weight: 600;">${meal.food}</td>
                    <td style="font-weight: 700; color: var(--primary);">${meal.calories} cal</td>
                    <td style="font-size: var(--font-size-sm); color: var(--text-muted);">
                      ${meal.protein ? `P: ${meal.protein}g ` : ''}
                      ${meal.carbs ? `C: ${meal.carbs}g ` : ''}
                      ${meal.fats ? `F: ${meal.fats}g` : ''}
                      ${!meal.protein && !meal.carbs && !meal.fats ? '-' : ''}
                    </td>
                    <td>
                      <button class="btn btn-sm btn-danger" onclick="window.handleDeleteMeal('${meal.id}')">
                        🗑️
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>

    <!-- Food Suggestions -->
    <div class="card mt-4" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%); border-color: rgba(16, 185, 129, 0.3);">
      <div class="card-header">
        <h3 class="card-title">
          <span>💡</span>
          ${suggestions.title}
        </h3>
      </div>
      <div class="card-body">
        <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
          <strong style="color: var(--success);">Tip:</strong> ${suggestions.tip}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md);">
          ${suggestions.items.map(item => `
            <div style="padding: var(--spacing-md); background: rgba(16, 185, 129, 0.1); border-radius: var(--radius); border-left: 3px solid var(--success);">
              <span style="color: var(--text-primary);">${item}</span>
            </div>
          `).join('')}
        </div>
        ${remainingCalories > 0 ? `
          <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius); text-align: center;">
            <span style="color: var(--text-primary);">
              💡 You have <strong style="color: var(--primary);">${remainingCalories} calories</strong> remaining today. Choose wisely!
            </span>
          </div>
        ` : ''}
      </div>
    </div>
  `;

    // Setup form handler
    setupMealForm();
}

/**
 * Setup meal form submission
 */
function setupMealForm() {
    const form = document.getElementById('add-meal-form');
    form.addEventListener('submit', handleAddMeal);
}

/**
 * Handle add meal form submission
 * @param {Event} e - Submit event
 */
function handleAddMeal(e) {
    e.preventDefault();

    const type = document.getElementById('meal-type').value;
    const food = document.getElementById('meal-food').value.trim();
    const calories = parseInt(document.getElementById('meal-calories').value);
    const protein = document.getElementById('meal-protein').value;
    const carbs = document.getElementById('meal-carbs').value;
    const fats = document.getElementById('meal-fats').value;

    // Validate
    if (!type || !food || !calories) {
        alert('Please fill in all required fields');
        return;
    }

    if (calories < 0 || calories > VALIDATION.calories.max) {
        alert(ERROR_MESSAGES.invalidCalories);
        return;
    }

    // Create meal object
    const meal = {
        type,
        food,
        calories,
        protein: protein ? parseInt(protein) : null,
        carbs: carbs ? parseInt(carbs) : null,
        fats: fats ? parseInt(fats) : null
    };

    // Add meal
    addMeal(meal);

    // Reset form
    e.target.reset();

    // Re-render
    renderMeals();
}

/**
 * Handle delete meal
 * @param {string} mealId - Meal ID
 */
window.handleDeleteMeal = function (mealId) {
    if (confirm('Are you sure you want to delete this meal?')) {
        deleteMeal(mealId);
        renderMeals();
    }
};

