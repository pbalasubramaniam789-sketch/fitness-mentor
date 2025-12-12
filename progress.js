// Fitness Mentor - Progress Component

import { loadProfile, getAllProgress, addProgressEntry, deleteProgressEntry, getAverageCalories, getAverageWorkoutMinutes, getLatestWeight, getStartingWeight } from './storage.js';
import { getDateString } from './calculations.js';

export function renderProgress() {
    const profile = loadProfile();
    if (!profile) return;

    const contentEl = document.getElementById('progress-content');
    const progressData = getAllProgress();
    const avgCalories = getAverageCalories(7);
    const avgWorkout = getAverageWorkoutMinutes(7);
    const latestWeight = getLatestWeight();
    const startingWeight = getStartingWeight();
    const weightLoss = startingWeight && latestWeight ? Math.round((startingWeight - latestWeight) * 10) / 10 : 0;

    contentEl.innerHTML = `
        <div class="page-header">
            <h2>📈 Progress Tracking</h2>
        </div>

        <div class="stats-row">
            <div class="stat-box">
                <div class="stat-label">Current Weight</div>
                <div class="stat-number">${latestWeight ? latestWeight : 'N/A'}</div>
                <div class="stat-detail">kg</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Weight Change</div>
                <div class="stat-number" style="color: ${weightLoss > 0 ? '#10b981' : '#ef4444'};">${weightLoss > 0 ? '-' : ''}${weightLoss}</div>
                <div class="stat-detail">kg</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Avg Calories/Day</div>
                <div class="stat-number">${avgCalories}</div>
                <div class="stat-detail">7-day avg</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Avg Workout/Day</div>
                <div class="stat-number">${avgWorkout}</div>
                <div class="stat-detail">7-day avg</div>
            </div>
        </div>

        <div class="form-card">
            <h3>Log Weight Entry</h3>
            <form id="progress-form">
                <div class="form-group">
                    <label class="form-label required">Weight (kg)</label>
                    <input type="number" id="progress-weight" class="form-input" placeholder="${latestWeight || profile.weight}" step="0.1" min="30" max="300" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Waist (cm)</label>
                    <input type="number" id="progress-waist" class="form-input" placeholder="Optional" step="0.1" min="40" max="200">
                </div>

                <div class="form-group">
                    <label class="form-label">Notes</label>
                    <input type="text" id="progress-notes" class="form-input" placeholder="How are you feeling?">
                </div>

                <button type="submit" class="btn btn-primary btn-block">
                    ➕ Log Entry
                </button>
            </form>
        </div>

        <div class="progress-chart">
            <h3>Weight History</h3>
            ${progressData.length === 0 ? `
                <div class="empty-state">
                    <p>No weight entries yet. Start tracking your progress! 📊</p>
                </div>
            ` : `
                <div class="chart-container">
                    <div class="mini-chart">
                        ${progressData.slice().reverse().map((entry, idx) => {
                            const minWeight = Math.min(...progressData.map(e => parseFloat(e.weight)));
                            const maxWeight = Math.max(...progressData.map(e => parseFloat(e.weight)));
                            const range = maxWeight - minWeight || 1;
                            const height = ((parseFloat(entry.weight) - minWeight) / range) * 100;
                            return `<div class="chart-bar" style="height: ${Math.max(height, 20)}%;" title="${entry.weight}kg on ${entry.date}"></div>`;
                        }).join('')}
                    </div>
                </div>
            `}
        </div>

        <div class="progress-entries">
            <h3>Progress Entries</h3>
            ${progressData.length === 0 ? `
                <div class="empty-state">
                    <p>No entries yet. Start tracking today! 💪</p>
                </div>
            ` : `
                ${progressData.map(entry => `
                    <div class="progress-entry">
                        <div class="entry-info">
                            <div class="entry-date">${new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                            <div class="entry-weight">${entry.weight} kg</div>
                            ${entry.waist ? `<div class="entry-waist">Waist: ${entry.waist} cm</div>` : ''}
                            ${entry.notes ? `<div class="entry-notes">${entry.notes}</div>` : ''}
                        </div>
                        <button class="btn-delete" onclick="deleteProgressEntry('${entry.id}')">✕</button>
                    </div>
                `).join('')}
            `}
        </div>
    `;

    document.getElementById('progress-form').addEventListener('submit', handleAddProgress);
}

function handleAddProgress(e) {
    e.preventDefault();

    const weightInput = document.getElementById('progress-weight');
    const waistInput = document.getElementById('progress-waist');
    const notesInput = document.getElementById('progress-notes');

    const weight = parseFloat(weightInput.value);
    if (!weight || weight <= 0) {
        alert('Please enter a valid weight');
        return;
    }

    const entry = {
        date: getDateString(),
        weight,
        waist: waistInput.value ? parseFloat(waistInput.value) : null,
        notes: notesInput.value || ''
    };

    addProgressEntry(entry);
    renderProgress();
}

window.deleteProgressEntry = function(entryId) {
    if (confirm('Delete this entry?')) {
        deleteProgressEntry(entryId);
        renderProgress();
    }
};
