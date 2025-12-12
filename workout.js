// Fitness Mentor - Workout Component

import { loadProfile, addWorkout, getWorkoutsByDate, deleteWorkout, getTotalWorkoutMinutes, getTotalCaloriesBurned } from './storage.js';
import { calculateCaloriesBurned, getTimeString, getFitnessLevel, getDateString } from './calculations.js';
import { WORKOUT_TYPES, WORKOUT_SUGGESTIONS, EXERCISE_DATABASE, EXERCISE_CATEGORIES, VALIDATION, ERROR_MESSAGES } from './constants.js';

export function renderWorkout() {
    const profile = loadProfile();
    if (!profile) return;

    const contentEl = document.getElementById('workout-content');
    const workouts = getWorkoutsByDate();
    const totalMinutes = getTotalWorkoutMinutes();
    const totalBurned = getTotalCaloriesBurned();
    const fitnessLevel = getFitnessLevel(profile.activityLevel, totalMinutes / 7);

    const suggestions = WORKOUT_SUGGESTIONS[profile.goal][fitnessLevel];

    contentEl.innerHTML = `
        <div class="page-header">
            <h2>🏋️ Workout Tracking</h2>
        </div>

        <div class="stats-row">
            <div class="stat-box">
                <div class="stat-label">Today's Duration</div>
                <div class="stat-number">${totalMinutes}</div>
                <div class="stat-detail">minutes</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Calories Burned</div>
                <div class="stat-number">${totalBurned}</div>
                <div class="stat-detail">kcal</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Fitness Level</div>
                <div class="stat-number">${fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1)}</div>
                <div class="stat-detail">your level</div>
            </div>
        </div>

        <div class="form-card">
            <h3>Log Workout</h3>
            <form id="workout-form">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">Type</label>
                        <select id="workout-type" class="form-select" required>
                            <option value="">Select workout type</option>
                            ${Object.entries(WORKOUT_TYPES).map(([key, data]) => `<option value="${key}">${data.label}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Duration (min)</label>
                        <input type="number" id="workout-duration" class="form-input" placeholder="30" min="${VALIDATION.duration.min}" max="${VALIDATION.duration.max}" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label required">Intensity</label>
                    <select id="workout-intensity" class="form-select" required>
                        <option value="">Select intensity</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Exercise Name</label>
                    <input type="text" id="workout-name" class="form-input" placeholder="e.g., Morning Run, Gym Session">
                </div>

                <button type="submit" class="btn btn-primary btn-block">
                    ➕ Log Workout
                </button>
            </form>
        </div>

        <div class="suggestions-card">
            <h3>Recommended for You</h3>
            <div class="suggestion-items">
                ${suggestions.map(suggestion => `<div class="suggestion-item">${suggestion}</div>`).join('')}
            </div>
        </div>

        <div class="workouts-list">
            <h3>Today's Workouts</h3>
            ${workouts.length === 0 ? `
                <div class="empty-state">
                    <p>No workouts logged yet. Let's get moving! 💪</p>
                </div>
            ` : `
                ${workouts.map(workout => `
                    <div class="workout-item">
                        <div class="workout-info">
                            <div class="workout-name">${workout.name || WORKOUT_TYPES[workout.type]?.label || 'Workout'}</div>
                            <div class="workout-type">${workout.type} • ${workout.intensity}</div>
                            <div class="workout-time">${new Date(workout.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <div class="workout-stats">
                            <div>${workout.duration} min</div>
                            <div>${workout.caloriesBurned} kcal</div>
                        </div>
                        <button class="btn-delete" onclick="deleteWorkoutEntry('${workout.id}', '${getDateString()}')">✕</button>
                    </div>
                `).join('')}
            `}
        </div>
    `;

    document.getElementById('workout-form').addEventListener('submit', handleAddWorkout);
}

function handleAddWorkout(e) {
    e.preventDefault();

    const profile = loadProfile();
    const typeInput = document.getElementById('workout-type');
    const durationInput = document.getElementById('workout-duration');
    const intensityInput = document.getElementById('workout-intensity');
    const nameInput = document.getElementById('workout-name');

    const duration = parseInt(durationInput.value);
    if (!duration || duration < VALIDATION.duration.min || duration > VALIDATION.duration.max) {
        alert(ERROR_MESSAGES.invalidDuration);
        return;
    }

    const caloriesBurned = calculateCaloriesBurned(
        typeInput.value,
        duration,
        intensityInput.value,
        profile.weight
    );

    const workout = {
        type: typeInput.value,
        duration,
        intensity: intensityInput.value,
        name: nameInput.value || WORKOUT_TYPES[typeInput.value]?.label,
        caloriesBurned
    };

    addWorkout(workout);
    renderWorkout();
}

window.deleteWorkoutEntry = function(workoutId, date) {
    if (confirm('Delete this workout?')) {
        deleteWorkout(workoutId, date);
        renderWorkout();
    }
};
