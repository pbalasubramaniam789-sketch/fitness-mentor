// Fitness Mentor - Progress Component

import { loadProfile, getAllProgress, addProgressEntry, deleteProgressEntry, getAverageCalories, getAverageWorkoutMinutes, getLatestWeight, getStartingWeight } from '../utils/storage.js';
import { generateProgressInsights } from '../utils/mentor.js';
import { getDateString } from '../utils/calculations.js';

/**
 * Render progress page
 */
export function renderProgress() {
    const container = document.getElementById('progress-content');
    const profile = loadProfile();

    if (!profile) {
        container.innerHTML = '<p>Please complete onboarding first.</p>';
        return;
    }

    const progressData = getAllProgress();
    const avgCalories = getAverageCalories(7);
    const avgWorkout = getAverageWorkoutMinutes(7);
    const latestWeight = getLatestWeight() || profile.weight;
    const startingWeight = getStartingWeight() || profile.weight;
    const weightChange = latestWeight - startingWeight;

    // Get progress insights
    const insights = generateProgressInsights(profile, progressData);

    container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">📈 Progress Tracker</h1>
      <p class="page-subtitle">Monitor your fitness journey over time</p>
    </div>

    <!-- Progress Stats -->
    <div class="grid grid-3 mb-4">
      <div class="card">
        <div class="stat text-center">
          <div class="stat-value">${startingWeight.toFixed(1)}</div>
          <div class="stat-label">Starting Weight (kg)</div>
        </div>
      </div>

      <div class="card">
        <div class="stat text-center">
          <div class="stat-value">${latestWeight.toFixed(1)}</div>
          <div class="stat-label">Current Weight (kg)</div>
        </div>
      </div>

      <div class="card">
        <div class="stat text-center">
          <div class="stat-value" style="color: ${weightChange < 0 ? 'var(--success)' : weightChange > 0 ? 'var(--warning)' : 'var(--primary)'};">
            ${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)}
          </div>
          <div class="stat-label">Total Change (kg)</div>
        </div>
      </div>
    </div>

    <div class="grid grid-2">
      <!-- Add Weight Entry -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span>➕</span>
            Log Weight
          </h3>
        </div>
        <div class="card-body">
          <form id="add-progress-form">
            <div class="form-group">
              <label class="form-label required">Date</label>
              <input type="date" id="progress-date" class="form-input" value="${getDateString()}" required>
            </div>

            <div class="form-group">
              <label class="form-label required">Weight (kg)</label>
              <input type="number" id="progress-weight" class="form-input" placeholder="70.5" step="0.1" min="30" max="300" required>
            </div>

            <div class="form-group">
              <label class="form-label">Waist (cm)</label>
              <input type="number" id="progress-waist" class="form-input" placeholder="80" step="0.1" min="40" max="200">
            </div>

            <button type="submit" class="btn btn-primary btn-block">
              Add Entry
            </button>
          </form>
        </div>
      </div>

      <!-- Averages -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span>📊</span>
            7-Day Averages
          </h3>
        </div>
        <div class="card-body">
          <div style="display: grid; gap: var(--spacing-lg);">
            <div style="padding: var(--spacing-lg); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius); text-align: center;">
              <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.5rem;">
                Average Daily Calories
              </div>
              <div style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--primary);">
                ${avgCalories}
              </div>
              <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-top: 0.25rem;">
                Target: ${profile.dailyCalories}
              </div>
            </div>

            <div style="padding: var(--spacing-lg); background: rgba(16, 185, 129, 0.1); border-radius: var(--radius); text-align: center;">
              <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: 0.5rem;">
                Average Workout Minutes
              </div>
              <div style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--success);">
                ${avgWorkout}
              </div>
              <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-top: 0.25rem;">
                Recommended: 30-60 min/day
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weight Chart -->
    <div class="card mt-4">
      <div class="card-header">
        <h3 class="card-title">
          <span>📉</span>
          Weight Trend
        </h3>
        <span class="badge badge-primary">${progressData.length} entries</span>
      </div>
      <div class="card-body">
        ${progressData.length < 2 ? `
          <div class="empty-state">
            <div class="empty-state-icon">📊</div>
            <div class="empty-state-text">Not enough data to show chart</div>
            <p class="text-muted">Add at least 2 weight entries to see your progress trend</p>
          </div>
        ` : `
          <canvas id="weight-chart" style="max-height: 400px;"></canvas>
        `}
      </div>
    </div>

    <!-- Progress History -->
    <div class="card mt-4">
      <div class="card-header">
        <h3 class="card-title">
          <span>📝</span>
          Weight History
        </h3>
      </div>
      <div class="card-body">
        ${progressData.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">📋</div>
            <div class="empty-state-text">No weight entries yet</div>
            <p class="text-muted">Start tracking your weight to monitor your progress!</p>
          </div>
        ` : `
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weight (kg)</th>
                  <th>Waist (cm)</th>
                  <th>Change</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${progressData.map((entry, index) => {
        const prevEntry = progressData[index + 1];
        const change = prevEntry ? entry.weight - prevEntry.weight : 0;
        return `
                    <tr>
                      <td style="font-weight: 600;">${new Date(entry.date).toLocaleDateString()}</td>
                      <td style="font-size: var(--font-size-lg); font-weight: 700; color: var(--primary);">
                        ${parseFloat(entry.weight).toFixed(1)}
                      </td>
                      <td style="color: var(--text-muted);">
                        ${entry.waist ? parseFloat(entry.waist).toFixed(1) : '-'}
                      </td>
                      <td>
                        ${prevEntry ? `
                          <span class="badge ${change < 0 ? 'badge-success' : change > 0 ? 'badge-warning' : 'badge-primary'}">
                            ${change > 0 ? '+' : ''}${change.toFixed(1)} kg
                          </span>
                        ` : '-'}
                      </td>
                      <td>
                        <button class="btn btn-sm btn-danger" onclick="window.handleDeleteProgress('${entry.id}')">
                          🗑️
                        </button>
                      </td>
                    </tr>
                  `;
    }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>

    <!-- Progress Insights -->
    <div class="card mt-4" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border-color: rgba(102, 126, 234, 0.3);">
      <div class="card-header">
        <h3 class="card-title">
          <span>🧠</span>
          Progress Insights
        </h3>
      </div>
      <div class="card-body">
        <p style="font-size: var(--font-size-lg); line-height: 1.8; color: var(--text-primary);">
          ${insights}
        </p>
      </div>
    </div>
  `;

    // Setup form handler
    setupProgressForm();

    // Draw chart if enough data
    if (progressData.length >= 2) {
        setTimeout(() => drawWeightChart(progressData), 100);
    }
}

/**
 * Setup progress form submission
 */
function setupProgressForm() {
    const form = document.getElementById('add-progress-form');
    form.addEventListener('submit', handleAddProgress);
}

/**
 * Handle add progress form submission
 * @param {Event} e - Submit event
 */
function handleAddProgress(e) {
    e.preventDefault();

    const date = document.getElementById('progress-date').value;
    const weight = parseFloat(document.getElementById('progress-weight').value);
    const waist = document.getElementById('progress-waist').value;

    // Validate
    if (!date || !weight) {
        alert('Please fill in all required fields');
        return;
    }

    if (weight < 30 || weight > 300) {
        alert('Weight must be between 30 and 300 kg');
        return;
    }

    // Create entry object
    const entry = {
        date,
        weight: weight.toFixed(1),
        waist: waist ? parseFloat(waist).toFixed(1) : null
    };

    // Add entry
    addProgressEntry(entry);

    // Reset form
    e.target.reset();
    document.getElementById('progress-date').value = getDateString();

    // Re-render
    renderProgress();
}

/**
 * Handle delete progress entry
 * @param {string} entryId - Entry ID
 */
window.handleDeleteProgress = function (entryId) {
    if (confirm('Are you sure you want to delete this entry?')) {
        deleteProgressEntry(entryId);
        renderProgress();
    }
};

/**
 * Draw weight chart using Canvas
 * @param {Array} data - Progress data
 */
function drawWeightChart(data) {
    const canvas = document.getElementById('weight-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '400px';
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = 400;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Sort data by date (oldest first for chart)
    const sortedData = [...data].reverse();

    // Get min and max weights
    const weights = sortedData.map(d => parseFloat(d.weight));
    const minWeight = Math.min(...weights) - 2;
    const maxWeight = Math.max(...weights) + 2;
    const weightRange = maxWeight - minWeight;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw Y-axis labels
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const weight = maxWeight - (weightRange / 5) * i;
        const y = padding + (chartHeight / 5) * i;
        ctx.fillText(weight.toFixed(1) + ' kg', padding - 10, y + 4);
    }

    // Calculate points
    const points = sortedData.map((entry, index) => {
        const x = padding + (chartWidth / (sortedData.length - 1)) * index;
        const weight = parseFloat(entry.weight);
        const y = padding + chartHeight - ((weight - minWeight) / weightRange) * chartHeight;
        return { x, y, weight, date: entry.date };
    });

    // Draw line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    ctx.stroke();

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw points
    points.forEach(point => {
        ctx.fillStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Draw X-axis labels
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    points.forEach((point, index) => {
        if (index % Math.ceil(points.length / 6) === 0 || index === points.length - 1) {
            const date = new Date(point.date);
            const label = `${date.getMonth() + 1}/${date.getDate()}`;
            ctx.fillText(label, point.x, height - padding + 20);
        }
    });
}
