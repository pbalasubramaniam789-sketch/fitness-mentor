// Fitness Mentor - Settings Component

import { loadProfile, saveProfile, clearAllData, exportData } from './storage.js';
import { calculateBMI, calculateDailyCalories } from './calculations.js';
import { ACTIVITY_LEVELS, GOALS, VALIDATION, ERROR_MESSAGES } from './constants.js';

/**
 * Render settings page
 */
export function renderSettings() {
    const container = document.getElementById('settings-content');
    const profile = loadProfile();

    if (!profile) {
        container.innerHTML = '<p>Please complete onboarding first.</p>';
        return;
    }

    const bmiData = calculateBMI(profile.weight, profile.height);

    container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">⚙️ Settings</h1>
      <p class="page-subtitle">Manage your profile and preferences</p>
    </div>

    <div class="grid grid-2">
      <!-- Edit Profile -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span>👤</span>
            Edit Profile
          </h3>
        </div>
        <div class="card-body">
          <form id="edit-profile-form">
            <div class="form-group">
              <label class="form-label required">Name</label>
              <input type="text" id="settings-name" class="form-input" value="${profile.name}" required>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label required">Age</label>
                <input type="number" id="settings-age" class="form-input" value="${profile.age}" min="10" max="120" required>
              </div>

              <div class="form-group">
                <label class="form-label required">Gender</label>
                <select id="settings-gender" class="form-select" required>
                  <option value="male" ${profile.gender === 'male' ? 'selected' : ''}>Male</option>
                  <option value="female" ${profile.gender === 'female' ? 'selected' : ''}>Female</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label required">Height (cm)</label>
                <input type="number" id="settings-height" class="form-input" value="${profile.height}" min="100" max="250" required>
              </div>

              <div class="form-group">
                <label class="form-label required">Weight (kg)</label>
                <input type="number" id="settings-weight" class="form-input" value="${profile.weight}" min="30" max="300" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label required">Activity Level</label>
              <select id="settings-activity" class="form-select" required>
                ${Object.entries(ACTIVITY_LEVELS).map(([key, data]) =>
        `<option value="${key}" ${profile.activityLevel === key ? 'selected' : ''}>
                    ${data.label} - ${data.description}
                  </option>`
    ).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label required">Primary Goal</label>
              <select id="settings-goal" class="form-select" required>
                ${Object.entries(GOALS).map(([key, data]) =>
        `<option value="${key}" ${profile.goal === key ? 'selected' : ''}>
                    ${data.label}
                  </option>`
    ).join('')}
              </select>
            </div>

            <div class="flex gap-2">
              <button type="submit" class="btn btn-primary" style="flex: 1;">
                Save Changes
              </button>
              <button type="button" class="btn btn-secondary" onclick="window.handleRecalculate()">
                🔄 Recalculate
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Current Stats -->
      <div>
        <div class="card mb-3">
          <div class="card-header">
            <h3 class="card-title">
              <span>📊</span>
              Current Stats
            </h3>
          </div>
          <div class="card-body">
            <div style="display: grid; gap: var(--spacing-lg);">
              <div style="padding: var(--spacing-lg); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius); text-align: center;">
                <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.5rem;">
                  BMI
                </div>
                <div style="font-size: var(--font-size-3xl); font-weight: 800; color: ${bmiData.color};">
                  ${bmiData.value}
                </div>
                <div class="badge mt-2" style="background: ${bmiData.color}20; color: ${bmiData.color};">
                  ${bmiData.label}
                </div>
              </div>

              <div style="padding: var(--spacing-lg); background: rgba(16, 185, 129, 0.1); border-radius: var(--radius); text-align: center;">
                <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.5rem;">
                  Daily Calorie Target
                </div>
                <div style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--success);">
                  ${profile.dailyCalories}
                </div>
                <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-top: 0.25rem;">
                  calories per day
                </div>
              </div>

              <div style="padding: var(--spacing-md); background: rgba(245, 158, 11, 0.1); border-radius: var(--radius);">
                <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.5rem;">
                  Goal
                </div>
                <div style="font-size: var(--font-size-lg); font-weight: 700; color: var(--warning);">
                  ${GOALS[profile.goal]?.label || 'Unknown'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Management -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              <span>💾</span>
              Data Management
            </h3>
          </div>
          <div class="card-body">
            <div style="display: grid; gap: var(--spacing-md);">
              <button class="btn btn-secondary btn-block" onclick="window.handleExportData()">
                📥 Export Data
              </button>
              <button class="btn btn-danger btn-block" onclick="window.handleClearData()">
                🗑️ Clear All Data
              </button>
            </div>
            <p style="font-size: var(--font-size-sm); color: var(--text-muted); margin-top: var(--spacing-md); margin-bottom: 0;">
              ⚠️ Clearing data will remove all your meals, workouts, and progress entries. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- About -->
    <div class="card mt-4" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border-color: rgba(102, 126, 234, 0.3);">
      <div class="card-header">
        <h3 class="card-title">
          <span>ℹ️</span>
          About Fitness Mentor
        </h3>
      </div>
      <div class="card-body">
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: var(--spacing-md);">
          <strong style="color: var(--primary);">Fitness Mentor</strong> is your personal fitness coach that helps you track your health data, 
          monitor nutrition, log workouts, and achieve your fitness goals. All your data is stored locally in your browser 
          for privacy and convenience.
        </p>
        <div style="padding: var(--spacing-md); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius); border-left: 3px solid var(--primary);">
          <strong style="color: var(--primary);">💡 Tips for Success:</strong>
          <ul style="margin: var(--spacing-sm) 0 0 var(--spacing-lg); color: var(--text-secondary);">
            <li>Log your meals and workouts consistently</li>
            <li>Track your weight weekly for best results</li>
            <li>Listen to your mentor's feedback and adjust accordingly</li>
            <li>Stay patient and celebrate small victories</li>
          </ul>
        </div>
      </div>
    </div>
  `;

    // Setup form handler
    setupSettingsForm();
}

/**
 * Setup settings form submission
 */
function setupSettingsForm() {
    const form = document.getElementById('edit-profile-form');
    form.addEventListener('submit', handleSaveProfile);
}

/**
 * Handle save profile form submission
 * @param {Event} e - Submit event
 */
function handleSaveProfile(e) {
    e.preventDefault();

    const name = document.getElementById('settings-name').value.trim();
    const age = parseInt(document.getElementById('settings-age').value);
    const gender = document.getElementById('settings-gender').value;
    const height = parseInt(document.getElementById('settings-height').value);
    const weight = parseInt(document.getElementById('settings-weight').value);
    const activityLevel = document.getElementById('settings-activity').value;
    const goal = document.getElementById('settings-goal').value;

    // Validate
    if (!name || !age || !gender || !height || !weight || !activityLevel || !goal) {
        alert('Please fill in all required fields');
        return;
    }

    if (age < VALIDATION.age.min || age > VALIDATION.age.max) {
        alert(ERROR_MESSAGES.invalidAge);
        return;
    }

    if (height < VALIDATION.height.min || height > VALIDATION.height.max) {
        alert(ERROR_MESSAGES.invalidHeight);
        return;
    }

    if (weight < VALIDATION.weight.min || weight > VALIDATION.weight.max) {
        alert(ERROR_MESSAGES.invalidWeight);
        return;
    }

    // Calculate new BMI and calories
    const bmiData = calculateBMI(weight, height);
    const dailyCalories = calculateDailyCalories({
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal
    });

    // Get existing profile
    const existingProfile = loadProfile();

    // Update profile
    const updatedProfile = {
        ...existingProfile,
        name,
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal,
        bmi: bmiData.value,
        bmiCategory: bmiData.category,
        dailyCalories,
        updatedAt: new Date().toISOString()
    };

    // Save profile
    const saved = saveProfile(updatedProfile);

    if (saved) {
        alert('✅ Profile updated successfully!');
        // Trigger refresh
        window.dispatchEvent(new CustomEvent('profile-updated'));
        renderSettings();
    } else {
        alert('❌ Error saving profile. Please try again.');
    }
}

/**
 * Handle recalculate button
 */
window.handleRecalculate = function () {
    const height = parseInt(document.getElementById('settings-height').value);
    const weight = parseInt(document.getElementById('settings-weight').value);
    const age = parseInt(document.getElementById('settings-age').value);
    const gender = document.getElementById('settings-gender').value;
    const activityLevel = document.getElementById('settings-activity').value;
    const goal = document.getElementById('settings-goal').value;

    if (!height || !weight || !age || !gender || !activityLevel || !goal) {
        alert('Please fill in all fields before recalculating');
        return;
    }

    const bmiData = calculateBMI(weight, height);
    const dailyCalories = calculateDailyCalories({
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal
    });

    alert(`📊 Recalculated Values:\n\nBMI: ${bmiData.value} (${bmiData.label})\nDaily Calories: ${dailyCalories}\n\nClick "Save Changes" to update your profile.`);
};

/**
 * Handle export data
 */
window.handleExportData = function () {
    const data = exportData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `fitness-mentor-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('✅ Data exported successfully!');
};

/**
 * Handle clear all data
 */
window.handleClearData = function () {
    const confirmed = confirm(
        '⚠️ WARNING: This will delete ALL your data including:\n\n' +
        '• Profile information\n' +
        '• All meal logs\n' +
        '• All workout logs\n' +
        '• All progress entries\n\n' +
        'This action CANNOT be undone!\n\n' +
        'Are you absolutely sure you want to continue?'
    );

    if (confirmed) {
        const doubleConfirm = confirm('Last chance! Are you really sure you want to delete everything?');

        if (doubleConfirm) {
            clearAllData();
            alert('✅ All data has been cleared. The page will now reload.');
            window.location.reload();
        }
    }
};

