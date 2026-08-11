/**
 * settingsView.js
 * ──────────────────────────────────────────────
 * Settings view renderer and controller.
 */

import { getState, resetAll } from '../state.js';
import { getIcon } from '../icons.js';

export function renderSettings(container, onResetNavigate) {
  const { profile, preferences } = getState();

  container.innerHTML = `
    <div class="animate-fade-in">
      <h1 class="mb-2">Settings</h1>
      <p class="text-muted mb-8">Manage your profile and app preferences.</p>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="glass-panel">
          <h3 class="mb-4">Profile Info</h3>
          <div class="flex flex-col gap-3 text-sm">
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-muted">Age</span>
              <span>${profile.age || '-'} years</span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-muted">Gender</span>
              <span class="capitalize">${profile.gender || '-'}</span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-muted">Height</span>
              <span>${profile.height || '-'} cm</span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-muted">Weight</span>
              <span>${profile.weight || '-'} kg</span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-2">
              <span class="text-muted">Goal</span>
              <span class="capitalize">${profile.goal || '-'}</span>
            </div>
            <div class="flex justify-between pb-2">
              <span class="text-muted">Activity Level</span>
              <span class="capitalize">${profile.activityLevel ? profile.activityLevel.replace('_', ' ') : '-'}</span>
            </div>
          </div>
          <button id="btn-edit-profile" class="glass-button w-full mt-4">Edit Profile</button>
        </div>

        <div class="glass-panel flex flex-col justify-between">
          <div>
            <h3 class="mb-4">Dietary Preferences</h3>
            ${preferences?.length > 0 ? `
              <div class="flex flex-wrap gap-2 mb-6">
                ${preferences.map((pref) => `
                  <span class="px-3 py-1 bg-slate-800 rounded-full text-sm capitalize">
                    ${pref.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                `).join('')}
              </div>
            ` : `
              <p class="text-sm text-muted mb-6">No specific dietary preferences set.</p>
            `}
          </div>

          <div class="flex flex-col gap-4 mt-auto">
            <button id="btn-reset-data" class="glass-button text-danger hover:border-danger hover:bg-danger/10 w-full justify-center">
              ${getIcon('Trash2', 18)} Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  const editBtn = container.querySelector('#btn-edit-profile');
  const resetBtn = container.querySelector('#btn-reset-data');

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      alert("Edit profile coming soon!");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (window.confirm("Are you sure you want to reset all your data? This cannot be undone.")) {
        resetAll();
        if (onResetNavigate) onResetNavigate('#/');
      }
    });
  }
}
