// Fitness Mentor - Onboarding Component

import { VALIDATION, ERROR_MESSAGES } from '../utils/constants.js';
import { calculateBMI, calculateDailyCalories } from '../utils/calculations.js';
import { saveProfile, hasProfile } from '../utils/storage.js';

/**
 * Initialize onboarding
 */
export function initOnboarding() {
    // Check if user has already completed onboarding
    if (!hasProfile()) {
        showOnboarding();
    }

    // Setup form submission
    const form = document.getElementById('onboarding-form');
    form.addEventListener('submit', handleOnboardingSubmit);
}

/**
 * Show onboarding modal
 */
export function showOnboarding() {
    const modal = document.getElementById('onboarding-modal');
    modal.classList.remove('hidden');
}

/**
 * Hide onboarding modal
 */
function hideOnboarding() {
    const modal = document.getElementById('onboarding-modal');
    modal.classList.add('hidden');
}

/**
 * Validate form field
 * @param {string} fieldId - Field ID
 * @param {*} value - Field value
 * @param {string} fieldName - Field name for error messages
 * @returns {boolean} Is valid
 */
function validateField(fieldId, value, fieldName) {
    const input = document.getElementById(fieldId);
    const errorDiv = document.getElementById(`error-${fieldName}`);

    // Clear previous error
    input.classList.remove('error');
    errorDiv.classList.remove('show');
    errorDiv.textContent = '';

    // Required check
    if (!value || value === '') {
        input.classList.add('error');
        errorDiv.textContent = ERROR_MESSAGES.required;
        errorDiv.classList.add('show');
        return false;
    }

    // Specific validations
    if (fieldName === 'age') {
        const age = parseInt(value);
        if (age < VALIDATION.age.min || age > VALIDATION.age.max) {
            input.classList.add('error');
            errorDiv.textContent = ERROR_MESSAGES.invalidAge;
            errorDiv.classList.add('show');
            return false;
        }
    }

    if (fieldName === 'height') {
        const height = parseInt(value);
        if (height < VALIDATION.height.min || height > VALIDATION.height.max) {
            input.classList.add('error');
            errorDiv.textContent = ERROR_MESSAGES.invalidHeight;
            errorDiv.classList.add('show');
            return false;
        }
    }

    if (fieldName === 'weight') {
        const weight = parseInt(value);
        if (weight < VALIDATION.weight.min || weight > VALIDATION.weight.max) {
            input.classList.add('error');
            errorDiv.textContent = ERROR_MESSAGES.invalidWeight;
            errorDiv.classList.add('show');
            return false;
        }
    }

    return true;
}

/**
 * Handle onboarding form submission
 * @param {Event} e - Submit event
 */
async function handleOnboardingSubmit(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('onboarding-name').value.trim();
    const age = parseInt(document.getElementById('onboarding-age').value);
    const gender = document.getElementById('onboarding-gender').value;
    const height = parseInt(document.getElementById('onboarding-height').value);
    const weight = parseInt(document.getElementById('onboarding-weight').value);
    const activityLevel = document.getElementById('onboarding-activity').value;
    const goal = document.getElementById('onboarding-goal').value;

    // Validate all fields
    let isValid = true;
    isValid = validateField('onboarding-name', name, 'name') && isValid;
    isValid = validateField('onboarding-age', age, 'age') && isValid;
    isValid = validateField('onboarding-gender', gender, 'gender') && isValid;
    isValid = validateField('onboarding-height', height, 'height') && isValid;
    isValid = validateField('onboarding-weight', weight, 'weight') && isValid;
    isValid = validateField('onboarding-activity', activityLevel, 'activity') && isValid;
    isValid = validateField('onboarding-goal', goal, 'goal') && isValid;

    if (!isValid) {
        return;
    }

    // Calculate BMI and daily calories
    const bmiData = calculateBMI(weight, height);
    const dailyCalories = calculateDailyCalories({
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal
    });

    // Create profile object
    const profile = {
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
        createdAt: new Date().toISOString()
    };

    // Save profile
    const saved = saveProfile(profile);

    if (saved) {
        // Show success message
        showWelcomeMessage(profile, bmiData, dailyCalories);

        // Hide modal after a delay
        setTimeout(() => {
            hideOnboarding();
            // Trigger dashboard refresh
            window.dispatchEvent(new CustomEvent('profile-updated'));
        }, 3000);
    } else {
        alert('Error saving profile. Please try again.');
    }
}

/**
 * Show welcome message with calculated values
 * @param {Object} profile - User profile
 * @param {Object} bmiData - BMI data
 * @param {number} dailyCalories - Daily calorie target
 */
function showWelcomeMessage(profile, bmiData, dailyCalories) {
    const modalBody = document.querySelector('#onboarding-modal .modal-body');

    modalBody.innerHTML = `
    <div class="text-center">
      <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
      <h3 class="text-gradient mb-3">Welcome, ${profile.name}!</h3>
      <p class="text-muted mb-4">Your profile has been created successfully.</p>
      
      <div class="grid grid-2" style="margin-bottom: 2rem;">
        <div class="card card-gradient">
          <div class="stat">
            <div class="stat-value" style="color: white;">${bmiData.value}</div>
            <div class="stat-label" style="color: rgba(255,255,255,0.8);">Your BMI</div>
            <div class="badge badge-success mt-2" style="background: rgba(255,255,255,0.2); color: white;">
              ${bmiData.label}
            </div>
          </div>
        </div>
        
        <div class="card card-gradient">
          <div class="stat">
            <div class="stat-value" style="color: white;">${dailyCalories}</div>
            <div class="stat-label" style="color: rgba(255,255,255,0.8);">Daily Calories</div>
            <div class="badge badge-success mt-2" style="background: rgba(255,255,255,0.2); color: white;">
              Target
            </div>
          </div>
        </div>
      </div>
      
      <p style="color: var(--text-secondary);">
        Let's start your fitness journey! 💪
      </p>
    </div>
  `;
}
