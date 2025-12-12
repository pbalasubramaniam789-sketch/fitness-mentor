// Fitness Mentor - Meals Component

import { loadProfile, addMeal, getMealsByDate, deleteMeal, getTotalCalories } from './storage.js';
import { getTimeString, getDateString } from './calculations.js';
import { MEAL_TYPES, FOOD_SUGGESTIONS, VALIDATION, ERROR_MESSAGES } from './constants.js';

export function renderMeals() {
    const profile = loadProfile();
    if (!profile) return;

    const contentEl = document.getElementById('meals-content');
    const meals = getMealsByDate();
    const totalCalories = getTotalCalories();
    const remaining = Math.max(0, profile.dailyCalorieTarget - totalCalories);

    const suggestions = FOOD_SUGGESTIONS[profile.goal];

    contentEl.innerHTML = `
        <div class="page-header">
            <h2>🍽️ Meal & Food Tracking</h2>
        </div>

        <div class="stats-row">
            <div class="stat-box">
                <div class="stat-label">Today's Calories</div>
                <div class="stat-number">${totalCalories}</div>
                <div class="stat-detail">of ${profile.dailyCalorieTarget}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Remaining</div>
                <div class="stat-number">${remaining}</div>
                <div class="stat-detail">kcal</div>
            </div>
        </div>

        <div class="form-card">
            <h3>Add Meal</h3>
            <form id="meal-form">
                <div class="form-group">
                    <label class="form-label required">Meal Type</label>
                    <select id="meal-type" class="form-select" required>
                        <option value="">Select meal type</option>
                        ${MEAL_TYPES.map(t => `<option value="${t.toLowerCase()}">${t}</option>`).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label required">Food Name</label>
                    <input type="text" id="meal-name" class="form-input" placeholder="e.g., Grilled Chicken" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">Calories</label>
                        <input type="number" id="meal-calories" class="form-input" placeholder="200" min="${VALIDATION.calories.min}" max="${VALIDATION.calories.max}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Protein (g)</label>
                        <input type="number" id="meal-protein" class="form-input" placeholder="25" min="0" max="${VALIDATION.macros.max}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Carbs (g)</label>
                        <input type="number" id="meal-carbs" class="form-input" placeholder="30" min="0" max="${VALIDATION.macros.max}">
                    </div>
                </div>

                <button type="submit" class="btn btn-primary btn-block">
                    ➕ Add Meal
                </button>
            </form>
        </div>

        <div class="suggestions-card">
            <h3>${suggestions.title}</h3>
            <p class="suggestion-tip">${suggestions.tip}</p>
            <div class="suggestion-items">
                ${suggestions.items.map(item => `<div class="suggestion-item">${item}</div>`).join('')}
            </div>
        </div>

        <div class="meals-list">
            <h3>Today's Meals</h3>
            ${meals.length === 0 ? `
                <div class="empty-state">
                    <p>No meals logged yet. Start by adding your first meal! 🍴</p>
                </div>
            ` : `
                ${meals.map(meal => `
                    <div class="meal-item">
                        <div class="meal-info">
                            <div class="meal-name">${meal.name}</div>
                            <div class="meal-type">${meal.type}</div>
                            <div class="meal-time">${new Date(meal.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <div class="meal-calories">${Math.round(meal.calories)} kcal</div>
                        <button class="btn-delete" onclick="deleteMealEntry('${meal.id}', '${getDateString()}')">✕</button>
                    </div>
                `).join('')}
            `}
        </div>
    `;

    document.getElementById('meal-form').addEventListener('submit', handleAddMeal);
}

function handleAddMeal(e) {
    e.preventDefault();

    const typeInput = document.getElementById('meal-type');
    const nameInput = document.getElementById('meal-name');
    const caloriesInput = document.getElementById('meal-calories');
    const proteinInput = document.getElementById('meal-protein');
    const carbsInput = document.getElementById('meal-carbs');

    const calories = parseFloat(caloriesInput.value);
    if (!calories || calories < VALIDATION.calories.min || calories > VALIDATION.calories.max) {
        alert(ERROR_MESSAGES.invalidCalories);
        return;
    }

    const meal = {
        type: typeInput.value,
        name: nameInput.value,
        calories,
        protein: parseFloat(proteinInput.value) || 0,
        carbs: parseFloat(carbsInput.value) || 0
    };

    addMeal(meal);
    renderMeals();
}

window.deleteMealEntry = function(mealId, date) {
    if (confirm('Delete this meal?')) {
        deleteMeal(mealId, date);
        renderMeals();
    }
};
