/**
 * script.js
 * ──────────────────────────────────────────────
 * Main entry point for Nutri+ Vanilla JS application.
 * Manages hash routing, layout rendering, theme application, and AI chat agent.
 */

import { getState, subscribe } from './js/state.js';
import { renderSidebar, attachSidebarListeners } from './js/views/sidebar.js';
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

function navigate(hash) {
  window.location.hash = hash;
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
    appRoot.innerHTML = `
      <div class="app-layout">
        ${renderSidebar(hash)}
        <main class="main-content" id="page-container"></main>
      </div>
    `;
    attachSidebarListeners(appRoot);
    const container = document.getElementById('page-container');

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
