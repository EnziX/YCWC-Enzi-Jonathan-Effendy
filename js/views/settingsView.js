/**
 * settingsView.js
 * ──────────────────────────────────────────────
 * Settings & Edit Profile view renderer and controller.
 */

import { getState, resetAll, recalculate, getTheme, toggleTheme } from '../state.js';
import { ACTIVITY_LEVELS, GOALS } from '../nutritionCalculator.js';
import { ALL_DIETARY_PREFERENCES } from '../mealPlanner.js';
import { getIcon } from '../icons.js';

export function renderSettings(container, onResetNavigate) {
  const { profile, preferences } = getState();
  const currentTheme = getTheme();

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="mb-2">Settings</h1>
          <p class="text-muted">Manage your profile, preferences, and theme.</p>
        </div>
        <button id="btn-theme-toggle-settings" class="glass-button">
          ${currentTheme === 'light' ? `${getIcon('Moon', 18)} Dark Theme` : `${getIcon('Sun', 18)} Light Theme`}
        </button>
      </div>

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
          <button id="btn-open-edit-profile" class="glass-button primary w-full mt-6">
            ${getIcon('Edit3', 18)} Edit Profile
          </button>
        </div>

        <div class="glass-panel flex flex-col justify-between">
          <div>
            <h3 class="mb-4">Dietary Preferences</h3>
            ${preferences?.length > 0 ? `
              <div class="flex flex-wrap gap-2 mb-6">
                ${preferences.map((pref) => `
                  <span class="px-3 py-1 bg-slate-800 rounded-full text-sm capitalize border border-slate-800">
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

      <!-- Edit Profile Modal Container -->
      <div id="modal-edit-profile" class="modal-backdrop" style="display: none;">
        <div class="glass-panel modal-content animate-fade-in">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-gradient">Edit Profile & Preferences</h3>
            <button id="btn-close-edit-modal" class="glass-button p-1" style="padding: 0.2rem 0.5rem;">
              ${getIcon('X', 18)}
            </button>
          </div>

          <form id="form-edit-profile" class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-xs text-muted">Age (years)</label>
                <input type="number" id="edit-age" class="glass-input" value="${profile.age || ''}" required min="1" max="120" />
              </div>
              <div>
                <label class="block mb-1 text-xs text-muted">Gender</label>
                <select id="edit-gender" class="glass-input">
                  <option value="male" class="bg-slate-900" ${profile.gender === 'male' ? 'selected' : ''}>Male</option>
                  <option value="female" class="bg-slate-900" ${profile.gender === 'female' ? 'selected' : ''}>Female</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-xs text-muted">Height (cm)</label>
                <input type="number" id="edit-height" class="glass-input" value="${profile.height || ''}" required min="50" max="250" />
              </div>
              <div>
                <label class="block mb-1 text-xs text-muted">Weight (kg)</label>
                <input type="number" id="edit-weight" class="glass-input" value="${profile.weight || ''}" required min="20" max="300" />
              </div>
            </div>

            <div>
              <label class="block mb-1 text-xs text-muted">Activity Level</label>
              <select id="edit-activity" class="glass-input">
                ${Object.entries(ACTIVITY_LEVELS).map(([key, data]) => `
                  <option value="${key}" class="bg-slate-900" ${profile.activityLevel === key ? 'selected' : ''}>
                    ${data.label} - ${data.desc}
                  </option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block mb-1 text-xs text-muted">Goal</label>
              <select id="edit-goal" class="glass-input">
                ${Object.entries(GOALS).map(([key, data]) => `
                  <option value="${key}" class="bg-slate-900" ${profile.goal === key ? 'selected' : ''}>
                    ${data.label} - ${data.desc}
                  </option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block mb-2 text-xs text-muted">Dietary Preferences & Allergies</label>
              <div class="grid grid-cols-2 gap-2" style="max-height: 150px; overflow-y: auto;">
                ${ALL_DIETARY_PREFERENCES.map((pref) => `
                  <label class="flex items-center gap-2 cursor-pointer text-xs p-2 bg-slate-900/40 rounded border border-slate-800">
                    <input type="checkbox" class="edit-chk-pref" data-id="${pref.id}" ${preferences?.includes(pref.id) ? 'checked' : ''} />
                    <span>${pref.label}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-4">
              <button type="button" id="btn-cancel-edit" class="glass-button">Cancel</button>
              <button type="submit" class="glass-button primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  const openModalBtn = container.querySelector('#btn-open-edit-profile');
  const closeModalBtn = container.querySelector('#btn-close-edit-modal');
  const cancelEditBtn = container.querySelector('#btn-cancel-edit');
  const modal = container.querySelector('#modal-edit-profile');
  const editForm = container.querySelector('#form-edit-profile');
  const resetBtn = container.querySelector('#btn-reset-data');
  const themeToggleBtn = container.querySelector('#btn-theme-toggle-settings');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      toggleTheme();
      renderSettings(container, onResetNavigate);
    });
  }

  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  const hideModal = () => {
    modal.style.display = 'none';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
  if (cancelEditBtn) cancelEditBtn.addEventListener('click', hideModal);

  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = Number(container.querySelector('#edit-age').value);
      const gender = container.querySelector('#edit-gender').value;
      const height = Number(container.querySelector('#edit-height').value);
      const weight = Number(container.querySelector('#edit-weight').value);
      const activityLevel = container.querySelector('#edit-activity').value;
      const goal = container.querySelector('#edit-goal').value;

      if (!age || age <= 0 || !height || height <= 0 || !weight || weight <= 0) {
        alert('Please enter valid positive numbers for age, height, and weight.');
        return;
      }

      const selectedPrefs = [];
      container.querySelectorAll('.edit-chk-pref:checked').forEach((chk) => {
        selectedPrefs.push(chk.getAttribute('data-id'));
      });

      recalculate(
        { age, gender, height, weight, activityLevel, goal },
        selectedPrefs
      );

      hideModal();
      renderSettings(container, onResetNavigate);
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
