/**
 * sidebar.js
 * ──────────────────────────────────────────────
 * Renders the grouped app sidebar navigation component.
 */

import { getState, getTheme, toggleTheme } from '../state.js';
import { getIcon } from '../icons.js';

export function renderSidebar(currentPath) {
  const state = getState();
  const streak = state.streak;
  const currentTheme = getTheme();

  const isActive = (path) => currentPath === path ? 'active' : '';

  return `
    <aside class="sidebar">
      <div class="flex items-center justify-between mb-6 px-2">
        <div class="flex items-center gap-3">
          <div class="ai-core" style="width: 28px; height: 28px; animation: none;"></div>
          <h2 class="text-gradient" style="font-size: 1.3rem;">Nutri+</h2>
        </div>
        <button id="btn-theme-toggle" class="glass-button p-2" title="Toggle Light/Dark Theme" style="padding: 0.4rem; border-radius: 50%;">
          ${currentTheme === 'light' ? getIcon('Moon', 18) : getIcon('Sun', 18)}
        </button>
      </div>

      <nav class="flex flex-col flex-1">
        <div class="nav-section-title">Main</div>
        <a href="#/dashboard" class="nav-link ${isActive('#/dashboard')}">
          ${getIcon('LayoutDashboard', 18)}
          <span>Dashboard</span>
        </a>
        <a href="#/meal-planner" class="nav-link ${isActive('#/meal-planner')}">
          ${getIcon('Calendar', 18)}
          <span>Meal Planner</span>
        </a>
        <a href="#/food-log" class="nav-link ${isActive('#/food-log')}">
          ${getIcon('Utensils', 18)}
          <span>Food Log</span>
        </a>

        <div class="nav-section-title">Explore</div>
        <a href="#/recipes" class="nav-link ${isActive('#/recipes')}">
          ${getIcon('ChefHat', 18)}
          <span>Recipes</span>
        </a>
        <a href="#/places" class="nav-link ${isActive('#/places')}">
          ${getIcon('MapPin', 18)}
          <span>Healthy Places</span>
        </a>
        <a href="#/events" class="nav-link ${isActive('#/events')}">
          ${getIcon('CalendarDays', 18)}
          <span>Events</span>
        </a>

        <div class="nav-section-title">Learn & Community</div>
        <a href="#/tips" class="nav-link ${isActive('#/tips')}">
          ${getIcon('BookOpen', 18)}
          <span>Tips & Edu</span>
        </a>
        <a href="#/videos" class="nav-link ${isActive('#/videos')}">
          ${getIcon('Video', 18)}
          <span>Videos</span>
        </a>
        <a href="#/vloggers" class="nav-link ${isActive('#/vloggers')}">
          ${getIcon('Youtube', 18)}
          <span>Food Vloggers</span>
        </a>

        <div class="nav-section-title">System</div>
        <a href="#/settings" class="nav-link ${isActive('#/settings')}">
          ${getIcon('Settings', 18)}
          <span>Settings</span>
        </a>
      </nav>

      <div class="mt-auto pt-4">
        <div class="glass-panel p-3 text-center">
          <div class="flex items-center justify-center gap-2">
            <span class="streak-flame ${streak?.current > 0 ? 'active' : ''}">
              ${getIcon('Flame', 20)}
            </span>
            <span class="font-heading" style="font-size: 1.1rem; font-weight: 700;">
              ${streak?.current || 0} Days
            </span>
          </div>
          <p class="text-muted" style="font-size: 0.75rem; margin-top: 0.25rem;">Current Streak</p>
        </div>
      </div>
    </aside>
  `;
}

export function attachSidebarListeners(container) {
  const themeBtn = container.querySelector('#btn-theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }
}
