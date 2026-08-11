/**
 * sidebar.js
 * ──────────────────────────────────────────────
 * Renders the app sidebar navigation component.
 */

import { getState } from '../state.js';
import { getIcon } from '../icons.js';

export function renderSidebar(currentPath) {
  const state = getState();
  const streak = state.streak;

  const isActive = (path) => currentPath === path ? 'active' : '';

  return `
    <aside className="sidebar" class="sidebar">
      <div class="flex items-center gap-4 mb-8 px-4">
        <div class="ai-core" style="width: 30px; height: 30px; animation: none;"></div>
        <h2 class="text-gradient">Nutri+</h2>
      </div>

      <nav class="flex flex-col gap-2 flex-1">
        <a href="#/dashboard" class="nav-link ${isActive('#/dashboard')}">
          ${getIcon('LayoutDashboard', 20)}
          <span>Dashboard</span>
        </a>
        <a href="#/meal-planner" class="nav-link ${isActive('#/meal-planner')}">
          ${getIcon('Calendar', 20)}
          <span>Meal Planner</span>
        </a>
        <a href="#/food-log" class="nav-link ${isActive('#/food-log')}">
          ${getIcon('Utensils', 20)}
          <span>Food Log</span>
        </a>
        <a href="#/tips" class="nav-link ${isActive('#/tips')}">
          ${getIcon('BookOpen', 20)}
          <span>Tips & Edu</span>
        </a>
      </nav>

      <div class="mt-auto">
        <div class="glass-panel p-4 mb-4 text-center">
          <div class="flex items-center justify-center gap-2">
            <span class="streak-flame ${streak?.current > 0 ? 'active' : ''}">
              ${getIcon('Flame', 24)}
            </span>
            <span class="font-heading" style="font-size: 1.2rem; font-weight: 700;">
              ${streak?.current || 0} Days
            </span>
          </div>
          <p class="text-muted" style="font-size: 0.8rem; margin-top: 0.5rem;">Current Streak</p>
        </div>

        <a href="#/settings" class="nav-link ${isActive('#/settings')}">
          ${getIcon('Settings', 20)}
          <span>Settings</span>
        </a>
      </div>
    </aside>
  `;
}
