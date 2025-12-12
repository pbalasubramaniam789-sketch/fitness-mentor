// Fitness Mentor - Settings Component

import { loadProfile, saveProfile, clearAllData, exportData } from './storage.js';
import { calculateBMI, calculateDailyCalories } from './calculations.js';
import { ACTIVITY_LEVELS, GOALS, VALIDATION, ERROR_MESSAGES } from './constants.js';

export function renderSettings() {
    const profile = loadProfile();
    if (!profile) return;

    const contentEl = document.getElementById('settings-content');
    const bmi = calculateBMI(profile.weight, profile.height);

    contentEl.innerHTML = `
        <div class="page-header">
            <h2>⚙️ Settings & Profile</h2>
        </div>

        <div class="form-card">
            <h3>Profile Information</h3>
            <form id="settings-form">
                <div class="form-group">
                    <label class="form-label required">Name</label>
                    <input type="text" id="settings-name" class="form-input" value="${profile.name}" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">Age</label>
                        <input type="number" id="settings-age" class="form-input" value="${profile.age}" min="${VALIDATION.age.min}" max="${VALIDATION.age.max}" required>
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
                        <input type="number" id="settings-height" class="form-input" value="${profile.height}" min="${VALIDATION.height.min}" max="${VALIDATION.height.max}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Weight (kg)</label>
                        <input type="number" id="settings-weight" class="form-input" value="${profile.weight}" step="0.1" min="${VALIDATION.weight.min}" max="${VALIDATION.weight.max}" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label required">Activity Level</label>
                    <select id="settings-activity" class="form-select" required>
                        ${Object.entries(ACTIVITY_LEVELS).map(([key, data]) => `
                            <option value="${key}" ${profile.activityLevel === key ? 'selected' : ''}>${data.label}</option>
                        `).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label required">Primary Goal</label>
                    <select id="settings-goal" class="form-select" required>
                        ${Object.entries(GOALS).map(([key, data]) => `
                            <option value="${key}" ${profile.goal === key ? 'selected' : ''}>${data.label}</option>
                        `).join('')}
                    </select>
                </div>

                <button type="submit" class="btn btn-primary btn-block">
                    ✓ Save Changes
                </button>
            </form>
        </div>

        <div class="info-card">
            <h3>Health Metrics</h3>
            <div class="metric-item">
                <span class="metric-label">BMI</span>
                <span class="metric-value">${bmi.value} (${bmi.label})</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Daily Calorie Target</span>
                <span class="metric-value">${profile.dailyCalorieTarget} kcal</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Account Created</span>
                <span class="metric-value">${new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>

        <div class="action-card">
            <h3>Data Management</h3>
            <button class="btn btn-secondary btn-block mb-2" onclick="exportDataHandler()">
                📥 Export My Data
            </button>
            <button class="btn btn-secondary btn-block" onclick="resetDataHandler()">
                🔄 Reset App
            </button>
        </div>
    `;

    document.getElementById('settings-form').addEventListener('submit', handleSaveSettings);
}

function handleSaveSettings(e) {
    e.preventDefault();

    const nameInput = document.getElementById('settings-name');
    const ageInput = document.getElementById('settings-age');
    const genderSelect = document.getElementById('settings-gender');
    const heightInput = document.getElementById('settings-height');
    const weightInput = document.getElementById('settings-weight');
    const activitySelect = document.getElementById('settings-activity');
    const goalSelect = document.getElementById('settings-goal');

    let isValid = true;

    if (!nameInput.value.trim()) {
        alert(ERROR_MESSAGES.required);
        isValid = false;
    }

    const age = parseInt(ageInput.value);
    if (!age || age < VALIDATION.age.min || age > VALIDATION.age.max) {
        alert(ERROR_MESSAGES.invalidAge);
        isValid = false;
    }

    const height = parseInt(heightInput.value);
    if (!height || height < VALIDATION.height.min || height > VALIDATION.height.max) {
        alert(ERROR_MESSAGES.invalidHeight);
        isValid = false;
    }

    const weight = parseFloat(weightInput.value);
    if (!weight || weight < VALIDATION.weight.min || weight > VALIDATION.weight.max) {
        alert(ERROR_MESSAGES.invalidWeight);
        isValid = false;
    }

    if (!isValid) return;

    const profile = {
        name: nameInput.value.trim(),
        age,
        gender: genderSelect.value,
        height,
        weight,
        activityLevel: activitySelect.value,
        goal: goalSelect.value,
        createdAt: loadProfile().createdAt,
        dailyCalorieTarget: 0
    };

    profile.dailyCalorieTarget = calculateDailyCalories(profile);

    if (saveProfile(profile)) {
        alert('Profile updated successfully!');
        window.dispatchEvent(new CustomEvent('profile-updated'));
    }
}

window.exportDataHandler = function() {
    const data = exportData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fitness-mentor-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

window.resetDataHandler = function() {
    if (confirm('Are you sure? This will delete all your data and require you to set up your profile again.\n\nThis action cannot be undone.')) {
        if (confirm('Last chance! Delete everything?')) {
            clearAllData();
            alert('All data has been cleared. The app will reload now.');
            window.location.reload();
        }
    }
};
