/**
 * script.js
 * ──────────────────────────────────────────────
 * Main entry point for Nutri+ Vanilla JS application.
 * Manages hash routing, layout rendering, mobile navigation, theme application, and offline AI chat agent.
 */

import { getState, subscribe, getTheme, toggleTheme } from './js/state.js';
import { renderSidebar, attachSidebarListeners, openMobileSidebar, closeMobileSidebar } from './js/views/sidebar.js';
import { renderLanding } from './js/views/landing.js';
import { renderOnboarding } from './js/views/onboarding.js';
import { renderDashboard } from './js/views/dashboard.js';
import { renderMealPlanner } from './js/views/mealPlannerView.js';
import { renderFoodLog } from './js/views/foodLogView.js';
import { renderRecipes } from './js/views/recipesView.js';
import { renderPlaces } from './js/views/placesView.js';
import { renderEvents } from './js/views/eventsView.js';
import { renderTips } from './js/views/tipsView.js';
import { renderVideos } from './js/views/videosView.js';
import { renderVloggers } from './js/views/vloggersView.js';
import { renderSettings } from './js/views/settingsView.js';
import { renderChatWidget } from './js/views/chatWidget.js';
import { getIcon } from './js/icons.js';

function navigate(hash) {
  window.location.hash = hash;
}

function getPageTitle(hash) {
  switch (hash) {
    case '#/dashboard': return 'Dashboard';
    case '#/meal-planner': return 'Meal Planner';
    case '#/food-log': return 'Food Log';
    case '#/recipes': return 'Healthy Recipes';
    case '#/places': return 'Healthy Places';
    case '#/events': return 'Community Events';
    case '#/tips': return 'Tips & Edu';
    case '#/videos': return 'Videos';
    case '#/vloggers': return 'Food Vloggers';
    case '#/settings': return 'Settings';
    default: return 'Nutri+';
  }
}

function router() {
  const appRoot = document.getElementById('app');
  if (!appRoot) return;

  const state = getState();
  let hash = window.location.hash || '#/';

  if (hash === '' || hash === '#') hash = '#/';

  // Navigation guards matching original Layout.jsx
  if (!state.isOnboarded && hash !== '#/' && hash !== '#/onboarding') {
    navigate('#/');
    return;
  }

  if (state.isOnboarded && (hash === '#/' || hash === '#/onboarding')) {
    navigate('#/dashboard');
    return;
  }

  // Render view
  if (hash === '#/' || hash === '#/onboarding') {
    appRoot.innerHTML = `
      <div class="app-layout">
        <main class="w-full" id="page-container"></main>
      </div>
    `;
    const container = document.getElementById('page-container');

    if (hash === '#/') {
      container.innerHTML = renderLanding();
    } else if (hash === '#/onboarding') {
      renderOnboarding(container, navigate);
    }
  } else {
    const currentTheme = getTheme();

    appRoot.innerHTML = `
      <!-- Mobile Top Header Bar -->
      <header class="mobile-header">
        <div class="flex items-center gap-3">
          <button id="btn-mobile-menu" class="glass-button p-2" title="Open Drawer Menu" style="padding: 0.4rem; border-radius: 8px;">
            ${getIcon('Menu', 22)}
          </button>
          <div class="flex items-center gap-2">
            <div class="ai-core" style="width: 22px; height: 22px; animation: none;"></div>
            <span class="mobile-header-title font-heading font-bold text-gradient">${getPageTitle(hash)}</span>
          </div>
        </div>
        <button id="btn-mobile-header-theme" class="glass-button p-2" title="Toggle Theme" style="padding: 0.4rem; border-radius: 50%;">
          ${currentTheme === 'light' ? getIcon('Moon', 18) : getIcon('Sun', 18)}
        </button>
      </header>

      <!-- Sidebar Backdrop Overlay -->
      <div id="sidebar-overlay" class="sidebar-overlay"></div>

      <div class="app-layout">
        ${renderSidebar(hash)}
        <main class="main-content" id="page-container"></main>
      </div>

      <!-- Mobile Bottom Navigation Bar -->
      <nav class="mobile-bottom-nav">
        <a href="#/dashboard" class="mobile-nav-item ${hash === '#/dashboard' ? 'active' : ''}">
          ${getIcon('LayoutDashboard', 20)}
          <span>Dashboard</span>
        </a>
        <a href="#/meal-planner" class="mobile-nav-item ${hash === '#/meal-planner' ? 'active' : ''}">
          ${getIcon('Calendar', 20)}
          <span>Planner</span>
        </a>
        <a href="#/food-log" class="mobile-nav-item ${hash === '#/food-log' ? 'active' : ''}">
          ${getIcon('Utensils', 20)}
          <span>Food Log</span>
        </a>
        <a href="#/recipes" class="mobile-nav-item ${hash === '#/recipes' ? 'active' : ''}">
          ${getIcon('ChefHat', 20)}
          <span>Recipes</span>
        </a>
        <button id="btn-mobile-bottom-menu" class="mobile-nav-item">
          ${getIcon('Menu', 20)}
          <span>Menu</span>
        </button>
      </nav>
    `;

    attachSidebarListeners(appRoot);
    const container = document.getElementById('page-container');

    // Attach Mobile Navigation Event Listeners
    const btnMobileMenu = appRoot.querySelector('#btn-mobile-menu');
    const btnMobileBottomMenu = appRoot.querySelector('#btn-mobile-bottom-menu');
    const overlay = appRoot.querySelector('#sidebar-overlay');
    const btnMobileHeaderTheme = appRoot.querySelector('#btn-mobile-header-theme');

    if (btnMobileMenu) btnMobileMenu.addEventListener('click', openMobileSidebar);
    if (btnMobileBottomMenu) btnMobileBottomMenu.addEventListener('click', openMobileSidebar);
    if (overlay) overlay.addEventListener('click', closeMobileSidebar);
    if (btnMobileHeaderTheme) btnMobileHeaderTheme.addEventListener('click', toggleTheme);

    switch (hash) {
      case '#/dashboard':
        container.innerHTML = renderDashboard();
        break;
      case '#/meal-planner':
        renderMealPlanner(container);
        break;
      case '#/food-log':
        renderFoodLog(container);
        break;
      case '#/recipes':
        renderRecipes(container);
        break;
      case '#/places':
        renderPlaces(container);
        break;
      case '#/events':
        renderEvents(container);
        break;
      case '#/tips':
        container.innerHTML = renderTips();
        break;
      case '#/videos':
        renderVideos(container);
        break;
      case '#/vloggers':
        renderVloggers(container);
        break;
      case '#/settings':
        renderSettings(container, navigate);
        break;
      default:
        navigate('#/dashboard');
        break;
    }
  }

  // Always mount AI Floating Chat Widget
  renderChatWidget(appRoot);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

subscribe(() => {
  router();
});

