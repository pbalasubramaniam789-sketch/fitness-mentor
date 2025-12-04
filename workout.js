// Fitness Mentor - Workout Component
import { loadProfile, addWorkout, getWorkoutsByDate, deleteWorkout, getTotalWorkoutMinutes, getTotalCaloriesBurned } from './storage.js';
import { calculateCaloriesBurned, getTimeString, getFitnessLevel } from './calculations.js';
import { WORKOUT_TYPES, WORKOUT_SUGGESTIONS } from './constants.js';

/**
 * Render workout page
 */
export function renderWorkout() {
 const container = document.getElementById('workout-content');
 const profile = loadProfile();

 if (!profile) {
 container.innerHTML = '<p>Please complete onboarding first.</p>';
 return;
 }

 const workouts = getWorkoutsByDate();
 const totalMinutes = getTotalWorkoutMinutes();
 const totalBurned = getTotalCaloriesBurned();

 // Get workout suggestions based on goal and fitness level
 const fitnessLevel = getFitnessLevel(profile.activityLevel);
 const suggestions = WORKOUT_SUGGESTIONS[profile.goal]?.[fitnessLevel] || WORKOUT_SUGGESTIONS.maintain.beginner;

 container.innerHTML = `
 <div class="page-header">
 <h1 class="page-title">💪 Workout Tracker</h1>
 <p class="page-subtitle">Log your exercises and track calories burned</p>
 </div>

 <div class="grid grid-2">
 <!-- Add Workout Form -->
 <div class="card">
 <div class="card-header">
 <h3 class="card-title">
 <span>➕</span>
 Log a Workout
 </h3>
 </div>
 <div class="card-body">
 <form id="add-workout-form">
 <div class="form-group">
 <label class="form-label required">Workout Type</label>
 <select id="workout-type" class="form-select" required>
 <option value="">Select workout type</option>
 ${Object.entries(WORKOUT_TYPES).map(([key, data]) =>
 `<option value="${key}">${data.label}</option>`
 ).join('')}
 </select>
 </div>

 <div class="form-group">
 <label class="form-label required">Duration (minutes)</label>
 <input type="number" id="workout-duration" class="form-input" placeholder="30" min="1" max="300" required>
 </div>

 <!-- Sets Input (shown only for gym workouts) -->
 <div class="form-group" id="sets-group" style="display: none;">
 <label class="form-label required">Sets</label>
 <input type="number" id="workout-sets" class="form-input" placeholder="3" min="1" max="10">
 </div>

 <!-- Reps Input (shown only for gym workouts) -->
 <div class="form-group" id="reps-group" style="display: none;">
 <label class="form-label required">Reps</label>
 <input type="number" id="workout-reps" class="form-input" placeholder="10" min="1" max="50">
 </div>

 <div class="form-group">
 <label class="form-label required">Intensity</label>
 <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-sm);">
 <label class="intensity-option">
 <input type="radio" name="intensity" value="low" required>
 <span class="intensity-label">Low</span>
 </label>
 <label class="intensity-option">
 <input type="radio" name="intensity" value="medium" required checked>
 <span class="intensity-label">Medium</span>
 </label>
 <label class="intensity-option">
 <input type="radio" name="intensity" value="high" required>
 <span class="intensity-label">High</span>
 </label>
 </div>
 </div>

 <div id="calories-preview" class="mb-3" style="padding: var(--spacing-md); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius); text-align: center; display: none;">
 <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.25rem;">Estimated Calories Burned</div>
 <div style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--primary);" id="calories-estimate">0</div>
 </div>

 <button type="submit" class="btn btn-success btn-block">
 Log Workout
 </button>
 </form>
 </div>
 </div>

 <!-- Workout Summary -->
 <div class="card">
 <div class="card-header">
 <h3 class="card-title">
 <span>📊</span>
 Today's Activity
 </h3>
 </div>
 <div class="card-body">
 <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
 <div class="stat text-center">
 <div class="stat-value">${totalMinutes}</div>
 <div class="stat-label">Total Minutes</div>
 </div>
 <div class="stat text-center">
 <div class="stat-value">${totalBurned}</div>
 <div class="stat-label">Calories Burned</div>
 </div>
 </div>

 ${totalMinutes > 0 ? `
 <div style="padding: var(--spacing-lg); background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.2) 100%); border-radius: var(--radius); text-align: center;">
 <div style="font-size: var(--font-size-2xl); margin-bottom: var(--spacing-sm);">🎉</div>
 <div style="font-weight: 600; color: var(--success); margin-bottom: 0.25rem;">Great Job!</div>
 <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">
 You've completed ${totalMinutes} minutes of exercise today
 </div>
 </div>
 ` : `
 <div style="padding: var(--spacing-lg); background: rgba(245, 158, 11, 0.1); border-radius: var(--radius); text-align: center;">
 <div style="font-size: var(--font-size-2xl); margin-bottom: var(--spacing-sm);">⏰</div>
 <div style="font-weight: 600; color: var(--warning); margin-bottom: 0.25rem;">No Workout Yet</div>
 <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">
 Start your day with some exercise!
 </div>
 </div>
 `}

 <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius);">
 <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.5rem;">
 Recommended: 30-60 minutes daily
 </div>
 <div class="progress">
 <div class="progress-bar" style="width: ${Math.min((totalMinutes / 30) * 100, 100)}%;"></div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Today's Workouts -->
 <div class="card mt-4">
 <div class="card-header">
 <h3 class="card-title">
 <span>📝</span>
 Today's Workouts
 </h3>
 <span class="badge badge-success">${workouts.length} workouts logged</span>
 </div>
 <div class="card-body">
 ${workouts.length === 0 ? `
 <div class="empty-state">
 <div class="empty-state-icon">💪</div>
 <div class="empty-state-text">No workouts logged yet today</div>
 <p class="text-muted">Start tracking your fitness by logging your first workout above!</p>
 </div>
 ` : `
 <div class="table-container">
 <table class="table">
 <thead>
 <tr>
 <th>Time</th>
 <th>Type</th>
 <th>Duration</th>
 <th>Sets x Reps</th>
 <th>Intensity</th>
 <th>Calories Burned</th>
 <th></th>
 </tr>
 </thead>
 <tbody>
 ${workouts.map(workout => `
 <tr>
 <td>${getTimeString(new Date(workout.timestamp))}</td>
 <td style="font-weight: 600;">${WORKOUT_TYPES[workout.type]?.label || workout.type}</td>
 <td><span class="badge badge-primary">${workout.duration} min</span></td>
 <td>${workout.sets && workout.reps ? `${workout.sets} x ${workout.reps}` : '-'}</td>
 <td>
 <span class="badge ${workout.intensity === 'high' ? 'badge-danger' :
 workout.intensity === 'medium' ? 'badge-warning' :
 'badge-success'
 }">
 ${workout.intensity.charAt(0).toUpperCase() + workout.intensity.slice(1)}
 </span>
 </td>
 <td style="font-weight: 700; color: var(--success);">${workout.caloriesBurned} cal</td>
 <td>
 <button class="btn btn-sm btn-danger" onclick="window.handleDeleteWorkout('${workout.id}')">
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

 <!-- Workout Suggestions -->
 <div class="card mt-4" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(248, 113, 113, 0.1) 100%); border-color: rgba(239, 68, 68, 0.3);">
 <div class="card-header">
 <h3 class="card-title">
 <span>💡</span>
 Recommended Workouts
 </h3>
 <span class="badge" style="background: rgba(239, 68, 68, 0.2); color: var(--danger);">
 ${fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1)} Level
 </span>
 </div>
 <div class="card-body">
 <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
 Based on your goal (<strong style="color: var(--danger);">${profile.goal === 'lose' ? 'Weight Loss' : profile.goal === 'build' ? 'Muscle Building' : profile.goal === 'stamina' ? 'Stamina' : 'Maintenance'}</strong>) and fitness level, here are some recommended workouts:
 </p>
 <div style="display: grid; gap: var(--spacing-md);">
 ${suggestions.map(suggestion => `
 <div style="padding: var(--spacing-lg); background: rgba(239, 68, 68, 0.1); border-radius: var(--radius); border-left: 3px solid var(--danger);">
 <span style="font-size: var(--font-size-lg); color: var(--text-primary);">${suggestion}</span>
 </div>
 `).join('')}
 </div>
 <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius); text-align: center;">
 <span style="color: var(--text-primary);">
 💡 <strong style="color: var(--primary);">Pro Tip:</strong> Consistency is more important than intensity. Start small and build up gradually!
 </span>
 </div>
 </div>
 </div>
 `;

 // Setup form handler
 setupWorkoutForm(profile);
}

/**
 * Setup workout form submission and preview
 */
function setupWorkoutForm(profile) {
 const form = document.getElementById('add-workout-form');
 const typeSelect = document.getElementById('workout-type');
 const durationInput = document.getElementById('workout-duration');
 const intensityInputs = document.querySelectorAll('input[name="intensity"]');

 // Define gym workout types
 const gymWorkoutTypes = ['Strength Training', 'HIIT'];

 // Update calorie preview on input change
 function updateCaloriePreview() {
 const type = typeSelect.value;
 const duration = parseInt(durationInput.value) || 0;
 const intensity = document.querySelector('input[name="intensity"]:checked')?.value || 'medium';

 if (type && duration > 0) {
 const calories = calculateCaloriesBurned(type, duration, intensity, profile.weight);
 document.getElementById('calories-estimate').textContent = calories;
 document.getElementById('calories-preview').style.display = 'block';
 } else {
 document.getElementById('calories-preview').style.display = 'none';
 }
 }

 // Show/hide sets and reps fields based on workout type
 typeSelect.addEventListener('change', function() {
 const selectedType = WORKOUT_TYPES[this.value]?.label;
 const setsGroup = document.getElementById('sets-group');
 const repsGroup = document.getElementById('reps-group');
 const setsInput = document.getElementById('workout-sets');
 const repsInput = document.getElementById('workout-reps');

 if (gymWorkoutTypes.includes(selectedType)) {
 setsGroup.style.display = 'block';
 repsGroup.style.display = 'block';
 setsInput.required = true;
 repsInput.required = true;
 } else {
 setsGroup.style.display = 'none';
 repsGroup.style.display = 'none';
 setsInput.required = false;
 repsInput.required = false;
 setsInput.value = '';
 repsInput.value = '';
 }
 updateCaloriePreview();
 });

 durationInput.addEventListener('input', updateCaloriePreview);
 intensityInputs.forEach(input => input.addEventListener('change', update
