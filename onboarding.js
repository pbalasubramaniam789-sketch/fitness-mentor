// Fitness Mentor - Onboarding Component

import { VALIDATION, ERROR_MESSAGES } from './constants.js';
import { calculateBMI, calculateDailyCalories } from './calculations.js';
import { saveProfile, hasProfile } from './storage.js';

export function initOnboarding() {
    const modal = document.getElementById('onboarding-modal');
    const form = document.getElementById('onboarding-form');

    if (hasProfile()) {
        modal.classList.add('hidden');
        return;
    }

    modal.classList.remove('hidden');

    form.addEventListener('submit', handleOnboardingSubmit);
}

function handleOnboardingSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('onboarding-name');
    const ageInput = document.getElementById('onboarding-age');
    const genderSelect = document.getElementById('onboarding-gender');
    const heightInput = document.getElementById('onboarding-height');
    const weightInput = document.getElementById('onboarding-weight');
    const activitySelect = document.getElementById('onboarding-activity');
    const goalSelect = document.getElementById('onboarding-goal');

    clearErrors();

    let isValid = true;

    if (!nameInput.value.trim()) {
        showError('name', ERROR_MESSAGES.required);
        isValid = false;
    }

    const age = parseInt(ageInput.value);
    if (!age || age < VALIDATION.age.min || age > VALIDATION.age.max) {
        showError('age', ERROR_MESSAGES.invalidAge);
        isValid = false;
    }

    if (!genderSelect.value) {
        showError('gender', ERROR_MESSAGES.required);
        isValid = false;
    }

    const height = parseInt(heightInput.value);
    if (!height || height < VALIDATION.height.min || height > VALIDATION.height.max) {
        showError('height', ERROR_MESSAGES.invalidHeight);
        isValid = false;
    }

    const weight = parseFloat(weightInput.value);
    if (!weight || weight < VALIDATION.weight.min || weight > VALIDATION.weight.max) {
        showError('weight', ERROR_MESSAGES.invalidWeight);
        isValid = false;
    }

    if (!activitySelect.value) {
        showError('activity', ERROR_MESSAGES.required);
        isValid = false;
    }

    if (!goalSelect.value) {
        showError('goal', ERROR_MESSAGES.required);
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
        createdAt: new Date().toISOString(),
        dailyCalorieTarget: 0
    };

    profile.dailyCalorieTarget = calculateDailyCalories(profile);

    if (saveProfile(profile)) {
        const modal = document.getElementById('onboarding-modal');
        modal.classList.add('hidden');
        window.dispatchEvent(new CustomEvent('profile-updated'));
    }
}

function showError(fieldName, message) {
    const errorEl = document.getElementById(`error-${fieldName}`);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}
