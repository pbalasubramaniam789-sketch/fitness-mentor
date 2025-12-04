// Fitness Mentor - Workout Component
import { loadProfile, addWorkout, getWorkoutsByDate, deleteWorkout, getTotalWorkoutMinutes, getTotalCaloriesBurned } from './storage.js';
import { calculateCaloriesBurned, getTimeString, getFitnessLevel } from './calculations.js';
import { WORKOUT_TYPES, WORKOUT_SUGGESTIONS } from './constants.js';

// Exercise Database with all exercises organized by category and muscle group
const EXERCISE_DATABASE = {
  'Strength Training': {
    'Chest': ['Barbell Bench Press', 'Dumbbell Bench Press', 'Incline Bench Press', 'Decline Bench Press', 'Chest Fly (Dumbbell)', 'Cable Fly', 'Machine Chest Press', 'Push-Ups', 'Weighted Push-Ups', 'Pec Deck Machine'],
    'Back': ['Deadlift', 'Conventional Deadlift', 'Romanian Deadlift', 'Lat Pulldown', 'Pull-Ups', 'Chin-Ups', 'Bent Over Barbell Row', 'Dumbbell Row', 'T-Bar Row', 'Seated Cable Row', 'Hyperextensions'],
    'Shoulders': ['Overhead Shoulder Press', 'Dumbbell Shoulder Press', 'Arnold Press', 'Lateral Raise', 'Front Raise', 'Rear Delt Fly', 'Face Pulls', 'Machine Shoulder Press', 'Shrugs'],
    'Biceps': ['Barbell Curl', 'Dumbbell Curl', 'Hammer Curl', 'Concentration Curl', 'Preacher Curl', 'Cable Curl', 'EZ Bar Curl'],
    'Triceps': ['Tricep Pushdown', 'Overhead Tricep Extension', 'Skull Crushers', 'Close Grip Bench Press', 'Dips', 'Tricep Kickback', 'Cable Rope Extension'],
    'Legs': ['Barbell Squat', 'Front Squat', 'Leg Press', 'Lunges', 'Leg Extension', 'Hamstring Curl', 'Romanian Deadlift', 'Calf Raises', 'Hip Thrusts', 'Glute Bridge', 'Bulgarian Split Squat', 'Hack Squat'],
    'Core': ['Crunches', 'Plank', 'Russian Twist', 'Leg Raise', 'Hanging Knee Raise', 'Cable Woodchoppers', 'Mountain Climbers', 'Bicycle Crunch', 'Side Plank'],
    'Full Body': ['Clean and Press', 'Snatch', 'Kettlebell Swing', 'Burpees', 'Battle Rope Waves', 'Sled Push', 'Thrusters', 'Farmer\'s Walk']
  },
  'Cardio': {
    'Low Intensity': ['Walking (Treadmill/Floor)', 'Light Cycling', 'Elliptical Trainer', 'Row Machine (Low Resistance)', 'Light Stair Climber', 'Slow Jogging'],
    'Moderate Intensity': ['Jogging', 'Outdoor Running', 'Cycling', 'Stair Climber Moderate', 'Rowing Moderate', 'Cross Trainer Workout'],
    'High Intensity HIIT': ['Sprint Intervals', 'Treadmill HIIT (30s/30s)', 'Bike Sprints', 'Jump Rope Intervals', 'Burpee HIIT', 'Tabata Training', 'Battle Rope HIIT']
  },
  'Functional Training': ['Kettlebell Deadlift', 'Kettlebell Clean and Press', 'Kettlebell Goblet Squat', 'TRX Row', 'TRX Push-Up', 'Battle Rope Slams', 'Medicine Ball Slams', 'Box Jumps', 'Sandbag Carry', 'Sled Push', 'Sled Pull', 'Farmer\'s Walk', 'Plyometric Jumps'],
  'Bodyweight': ['Push-Ups', 'Incline Push-Ups', 'Decline Push-Ups', 'Bodyweight Squats', 'Lunges', 'Burpees', 'Plank', 'Pull-Ups', 'Dips', 'Mountain Climbers', 'Jump Squats', 'High Knees'],
  'Flexibility/Mobility': ['Hamstring Stretch', 'Hip Flexor Stretch', 'Calf Stretch', 'Chest Opener Stretch', 'Shoulder Mobility Circles', 'Cat-Cow', 'Foam Rolling (Quads)', 'Foam Rolling (Hamstrings)', 'Foam Rolling (Calves)', 'Full Body Stretch Routine']
};


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
            <label class="form-label required">Exercise Category *</label>
            <select id="exercise-category" class="form-select" required>
              <option value="">Select category</option>
              <option value="Strength Training">💪 Strength Training</option>
              <option value="Cardio">🏃 Cardio</option>
              <option value="Functional Training">⚙️ Functional Training</option>
              <option value="Bodyweight">🤸 Bodyweight</option>
              <option value="Flexibility/Mobility">🧘 Flexibility/Mobility</option>
            </select>
          </div>

          <div class="form-group" id="muscle-group-container" style="display: none;">
            <label class="form-label required">Muscle Group *</label>
            <select id="exercise-muscle-group" class="form-select">
              <option value="">Select muscle group</option>
            </select>
          </div>

          <div class="form-group" id="cardio-intensity-container" style="display: none;">
            <label class="form-label required">Intensity Level *</label>
            <select id="cardio-intensity-level" class="form-select">
              <option value="">Select intensity</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label required">Exercise Name *</label>
            <select id="exercise-name" class="form-select" required>
              <option value="">Select exercise</option>
            </select>

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
 
 // Trigger change event immediately to show/hide sets and reps fields on load
 typeSelect.dispatchEvent(new Event('change'));

 durationInput.addEventListener('input', updateCaloriePreview);
 intensityInputs.forEach(input => input.addEventListener('change', updateCaloriePreview));

 // Form submission
 form.addEventListener('submit', handleAddWorkout);
    setupCascadingExerciseDropdowns();
}

/**
 * Handle add workout form submission
 * @param {Event} e - Submit event
 */
function handleAddWorkout(e) {
 e.preventDefault();
 const profile = loadProfile();
 const type = document.getElementById('workout-type').value;
 const duration = parseInt(document.getElementById('workout-duration').value);
 const intensity = document.querySelector('input[name="intensity"]:checked')?.value;
 const selectedType = WORKOUT_TYPES[type]?.label;
 const gymWorkoutTypes = ['Strength Training', 'HIIT'];
 const sets = gymWorkoutTypes.includes(selectedType) ? parseInt(document.getElementById('workout-sets').value) : null;
 const reps = gymWorkoutTypes.includes(selectedType) ? parseInt(document.getElementById('workout-reps').value) : null;

 // Validate
 if (!type || !duration || !intensity) {
 alert('Please fill in all required fields');
 return;
 }

 if (gymWorkoutTypes.includes(selectedType) && (!sets || !reps)) {
 alert('Please fill in sets and reps');
 return;
 }

 if (duration < 1 || duration > 300) {
 alert('Duration must be between 1 and 300 minutes');
 return;
 }

 // Calculate calories burned
 const caloriesBurned = calculateCaloriesBurned(type, duration, intensity, profile.weight);

 // Create workout object
 const workout = {
 type,
 duration,
 intensity,
 caloriesBurned,
 sets,
 reps
 };

 // Add workout
 addWorkout(workout);

 // Reset form
 e.target.reset();
 document.getElementById('calories-preview').style.display = 'none';
 document.getElementById('sets-group').style.display = 'none';
 document.getElementById('reps-group').style.display = 'none';

 // Re-render
 renderWorkout();
}

/**
 * Handle delete workout
 * @param {string} workoutId - Workout ID
 */
window.handleDeleteWorkout = function (workoutId) {
 if (confirm('Are you sure you want to delete this workout?')) {
 deleteWorkout(workoutId);
 renderWorkout();
 }
};

// Add CSS for intensity radio buttons
const style = document.createElement('style');
style.textContent = `
 .intensity-option {
 display: flex;
 align-items: center;
 justify-content: center;
 padding: var(--spacing-md);
 background: var(--bg-secondary);
 border: 2px solid var(--border);
 border-radius: var(--radius);
 cursor: pointer;
 transition: all var(--transition);
 }
 
 .intensity-option:hover {
 border-color: var(--primary);
 background: var(--bg-tertiary);
 }
 
 .intensity-option input {
 display: none;
 }
 
 .intensity-option input:checked + .intensity-label {
 color: var(--primary);
 font-weight: 700;
 }
 
 .intensity-option:has(input:checked) {
 border-color: var(--primary);
 background: rgba(102, 126, 234, 0.1);
 }
 
 .intensity-label {
 color: var(--text-secondary);
 font-weight: 600;
 font-size: var(--font-size-sm);
 }
`;
document.head.appendChild(style);

// Helper functions for cascading exercise dropdowns
function setupCascadingExerciseDropdowns() {
  const categorySelect = document.getElementById('exercise-category');
  const muscleGroupContainer = document.getElementById('muscle-group-container');
  const muscleGroupSelect = document.getElementById('exercise-muscle-group');
  const cardioIntensityContainer = document.getElementById('cardio-intensity-container');
  const cardioIntensitySelect = document.getElementById('cardio-intensity-level');
  const exerciseNameSelect = document.getElementById('exercise-name');

  categorySelect.addEventListener('change', function() {
    const category = this.value;
    muscleGroupContainer.style.display = 'none';
    cardioIntensityContainer.style.display = 'none';
    exerciseNameSelect.innerHTML = '<option value="">Select exercise</option>';
    
    if (category === 'Strength Training') {
      muscleGroupContainer.style.display = 'block';
      populateMuscleGroups();
    } else if (category === 'Cardio') {
      cardioIntensityContainer.style.display = 'block';
      populateCardioIntensity();
    } else if (category) {
      updateExerciseDropdown();
    }
  });

  muscleGroupSelect.addEventListener('change', updateExerciseDropdown);
  cardioIntensitySelect.addEventListener('change', updateExerciseDropdown);
}

function populateMuscleGroups() {
  const muscleGroupSelect = document.getElementById('exercise-muscle-group');
  const exercises = EXERCISE_DATABASE['Strength Training'];
  muscleGroupSelect.innerHTML = '<option value="">Select muscle group</option>';
  Object.keys(exercises).forEach(muscle => {
    const option = document.createElement('option');
    option.value = muscle;
    option.textContent = muscle;
    muscleGroupSelect.appendChild(option);
  });
}

function populateCardioIntensity() {
  const cardioIntensitySelect = document.getElementById('cardio-intensity-level');
  const exercises = EXERCISE_DATABASE['Cardio'];
  cardioIntensitySelect.innerHTML = '<option value="">Select intensity</option>';
  Object.keys(exercises).forEach(intensity => {
    const option = document.createElement('option');
    option.value = intensity;
    option.textContent = intensity;
    cardioIntensitySelect.appendChild(option);
  });
}

function updateExerciseDropdown() {
  const categorySelect = document.getElementById('exercise-category');
  const muscleGroupSelect = document.getElementById('exercise-muscle-group');
  const cardioIntensitySelect = document.getElementById('cardio-intensity-level');
  const exerciseNameSelect = document.getElementById('exercise-name');
  
  const category = categorySelect.value;
  exerciseNameSelect.innerHTML = '<option value="">Select exercise</option>';
  
  if (!category) return;
  
  let exercises = [];
  
  if (category === 'Strength Training') {
    const muscle = muscleGroupSelect.value;
    if (muscle && EXERCISE_DATABASE['Strength Training'][muscle]) {
      exercises = EXERCISE_DATABASE['Strength Training'][muscle];
    }
  } else if (category === 'Cardio') {
    const intensity = cardioIntensitySelect.value;
    if (intensity && EXERCISE_DATABASE['Cardio'][intensity]) {
      exercises = EXERCISE_DATABASE['Cardio'][intensity];
    }
  } else if (EXERCISE_DATABASE[category]) {
    exercises = EXERCISE_DATABASE[category];
  }
  
  exercises.forEach(exercise => {
    const option = document.createElement('option');
    option.value = exercise;
    option.textContent = exercise;
    exerciseNameSelect.appendChild(option);
  });
}




