// Theme Switcher
const THEME_KEY = 'siteTheme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? DARK_THEME : LIGHT_THEME);
    
    applyTheme(theme);
}

function applyTheme(theme) {
    if (theme === DARK_THEME) {
        document.documentElement.setAttribute('data-theme', DARK_THEME);
        updateToggleButton(true);
    } else {
        document.documentElement.removeAttribute('data-theme');
        updateToggleButton(false);
    }
    localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
}

function updateToggleButton(isDark) {
    const button = document.querySelector('.theme-toggle');
    if (button) {
        button.textContent = isDark ? '☀️' : '🌙';
        button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
    }
});
