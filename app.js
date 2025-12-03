// Fitness Mentor - Main Application

import { initStorage, hasProfile } from './storage.js';
import { initOnboarding } from './onboarding.js';
import { renderDashboard } from './dashboard.js';
import { renderMeals } from './meals.js';
import { renderWorkout } from './workout.js';
import { renderProgress } from './progress.js';
import { renderSettings } from './settings.js';

/**
 * Current active page
 */
let currentPage = 'dashboard';

/**
 * Page renderers
 */
const pageRenderers = {
    dashboard: renderDashboard,
    meals: renderMeals,
    workout: renderWorkout,
    progress: renderProgress,
    settings: renderSettings
};

/**
 * Initialize the application
 */
function initApp() {
    // Initialize storage
    initStorage();

    // Initialize onboarding
    initOnboarding();

    // Setup navigation
    setupNavigation();

    // Render initial page if user has profile
    if (hasProfile()) {
        renderPage(currentPage);
    }

    // Listen for profile updates
    window.addEventListener('profile-updated', () => {
        renderPage(currentPage);
    });
}

/**
 * Setup navigation event listeners
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

/**
 * Navigate to a specific page
 * @param {string} page - Page name
 */
function navigateToPage(page) {
    // Update current page
    currentPage = page;

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });

    // Hide all pages
    document.querySelectorAll('.page').forEach(pageEl => {
        pageEl.classList.remove('active');
    });

    // Show active page
    const pageElement = document.getElementById(`${page}-page`);
    if (pageElement) {
        pageElement.classList.add('active');
    }

    // Render page content
    renderPage(page);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Render a specific page
 * @param {string} page - Page name
 */
function renderPage(page) {
    const renderer = pageRenderers[page];
    if (renderer) {
        renderer();
    }
}

/**
 * Expose navigateToPage globally for button clicks
 */
window.navigateToPage = navigateToPage;

/**
 * Handle responsive navigation on mobile
 */
function setupResponsiveNav() {
    // Check if we need a mobile menu
    const updateNavLayout = () => {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth < 768) {
            navLinks.style.flexWrap = 'wrap';
        } else {
            navLinks.style.flexWrap = 'nowrap';
        }
    };

    updateNavLayout();
    window.addEventListener('resize', updateNavLayout);
}

/**
 * Setup keyboard shortcuts
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Alt + number keys for quick navigation
        if (e.altKey) {
            switch (e.key) {
                case '1':
                    e.preventDefault();
                    navigateToPage('dashboard');
                    break;
                case '2':
                    e.preventDefault();
                    navigateToPage('meals');
                    break;
                case '3':
                    e.preventDefault();
                    navigateToPage('workout');
                    break;
                case '4':
                    e.preventDefault();
                    navigateToPage('progress');
                    break;
                case '5':
                    e.preventDefault();
                    navigateToPage('settings');
                    break;
            }
        }
    });
}

/**
 * Add loading animation
 */
function showLoadingAnimation() {
    // Add a subtle loading state when switching pages
    const style = document.createElement('style');
    style.textContent = `
    .page {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .page.active {
      opacity: 1;
    }
  `;
    document.head.appendChild(style);
}

/**
 * Setup service worker for offline support (future enhancement)
 */
function setupOfflineSupport() {
    if ('serviceWorker' in navigator) {
        // Future: Register service worker for offline functionality
        console.log('Service Worker support detected - ready for offline mode');
    }
}

/**
 * Add helpful console messages
 */
function addConsoleMessages() {
    console.log('%c💪 Fitness Mentor', 'font-size: 24px; font-weight: bold; color: #667eea;');
    console.log('%cYour Personal Fitness Coach', 'font-size: 14px; color: #94a3b8;');
    console.log('%c\nKeyboard Shortcuts:', 'font-weight: bold; color: #667eea;');
    console.log('Alt + 1: Dashboard');
    console.log('Alt + 2: Meals');
    console.log('Alt + 3: Workout');
    console.log('Alt + 4: Progress');
    console.log('Alt + 5: Settings');
    console.log('%c\nAll data is stored locally in your browser.', 'color: #10b981;');
}

/**
 * Initialize everything when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApp();
        setupResponsiveNav();
        setupKeyboardShortcuts();
        showLoadingAnimation();
        setupOfflineSupport();
        addConsoleMessages();
    });
} else {
    initApp();
    setupResponsiveNav();
    setupKeyboardShortcuts();
    showLoadingAnimation();
    setupOfflineSupport();
    addConsoleMessages();
}

/**
 * Handle errors gracefully
 */
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // Don't show error to user unless critical
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

/**
 * Periodic data backup reminder (every 7 days)
 */
function setupBackupReminder() {
    const lastBackup = localStorage.getItem('last_backup_reminder');
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (!lastBackup || (now - parseInt(lastBackup)) > sevenDays) {
        setTimeout(() => {
            if (hasProfile()) {
                const reminder = confirm(
                    '💾 Backup Reminder\n\n' +
                    'It\'s been a while since your last backup!\n\n' +
                    'Would you like to export your data now?\n\n' +
                    '(You can do this anytime from Settings)'
                );

                if (reminder) {
                    navigateToPage('settings');
                }

                localStorage.setItem('last_backup_reminder', now.toString());
            }
        }, 5000); // Show after 5 seconds
    }
}

// Setup backup reminder
setTimeout(setupBackupReminder, 10000); // Check after 10 seconds

/**
 * Add motivational quotes on page load
 */
const motivationalQuotes = [
    "The only bad workout is the one that didn't happen. 💪",
    "Your body can stand almost anything. It's your mind you have to convince. 🧠",
    "Take care of your body. It's the only place you have to live. 🏠",
    "Fitness is not about being better than someone else. It's about being better than you used to be. 📈",
    "The groundwork for all happiness is good health. ❤️"
];

function showMotivationalQuote() {
    if (hasProfile() && Math.random() > 0.7) { // 30% chance
        const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        console.log(`%c${quote}`, 'font-style: italic; color: #667eea; font-size: 14px;');
    }
}

setTimeout(showMotivationalQuote, 2000);

// Export for debugging
window.FitnessMentor = {
    navigateToPage,
    currentPage: () => currentPage,
    version: '1.0.0'
};

