/**
 * onboarding.js
 * ──────────────────────────────────────────────
 * Onboarding view renderer and controller.
 */

import { ACTIVITY_LEVELS, GOALS } from '../nutritionCalculator.js';
import { completeOnboarding } from '../state.js';

let step = 1;
let loading = false;

let profile = {
  age: '',
  gender: 'male',
  height: '',
  weight: '',
  activityLevel: 'sedentary',
  goal: 'maintain',
};

let preferences = {
  vegetarian: false,
  halal: false,
  lactoseFree: false,
};

export function renderOnboarding(container, onCompleteNavigate) {
  if (loading) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-screen">
        <div class="ai-processing">
          <div class="ai-core"></div>
          <p class="text-gradient animate-fade-in text-lg font-heading">AI is calculating your exact nutritional profile...</p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <div class="glass-panel w-full max-w-md animate-fade-in">
        <h2 class="text-center mb-6 text-gradient">Step ${step} of 3</h2>

        ${step === 1 ? `
          <div class="flex flex-col gap-4">
            <div>
              <label class="block mb-2 text-sm text-muted">Age (years)</label>
              <input type="number" id="input-age" class="glass-input" value="${profile.age}" placeholder="e.g. 25" />
            </div>
            <div>
              <label class="block mb-2 text-sm text-muted">Gender</label>
              <select id="input-gender" class="glass-input">
                <option value="male" class="bg-slate-900" ${profile.gender === 'male' ? 'selected' : ''}>Male</option>
                <option value="female" class="bg-slate-900" ${profile.gender === 'female' ? 'selected' : ''}>Female</option>
              </select>
            </div>
            <div class="flex justify-end mt-4">
              <button id="btn-next-1" class="glass-button primary" ${!profile.age ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        ` : ''}

        ${step === 2 ? `
          <div class="flex flex-col gap-4">
            <div>
              <label class="block mb-2 text-sm text-muted">Height (cm)</label>
              <input type="number" id="input-height" class="glass-input" value="${profile.height}" placeholder="e.g. 170" />
            </div>
            <div>
              <label class="block mb-2 text-sm text-muted">Weight (kg)</label>
              <input type="number" id="input-weight" class="glass-input" value="${profile.weight}" placeholder="e.g. 65" />
            </div>
            <div>
              <label class="block mb-2 text-sm text-muted">Activity Level</label>
              <select id="input-activity" class="glass-input">
                ${Object.entries(ACTIVITY_LEVELS).map(([key, data]) => `
                  <option value="${key}" class="bg-slate-900" ${profile.activityLevel === key ? 'selected' : ''}>
                    ${data.label} - ${data.desc}
                  </option>
                `).join('')}
              </select>
            </div>
            <div class="flex justify-between mt-4">
              <button id="btn-back-2" class="glass-button">Back</button>
              <button id="btn-next-2" class="glass-button primary" ${!profile.height || !profile.weight ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        ` : ''}

        ${step === 3 ? `
          <div class="flex flex-col gap-4">
            <div>
              <label class="block mb-2 text-sm text-muted">Goal</label>
              <select id="input-goal" class="glass-input">
                ${Object.entries(GOALS).map(([key, data]) => `
                  <option value="${key}" class="bg-slate-900" ${profile.goal === key ? 'selected' : ''}>
                    ${data.label} - ${data.desc}
                  </option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="block mb-2 text-sm text-muted">Dietary Preferences</label>
              <div class="flex flex-col gap-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="chk-vegetarian" ${preferences.vegetarian ? 'checked' : ''} />
                  Vegetarian
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="chk-halal" ${preferences.halal ? 'checked' : ''} />
                  Halal
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="chk-lactose" ${preferences.lactoseFree ? 'checked' : ''} />
                  Lactose-Free
                </label>
              </div>
            </div>
            <div class="flex justify-between mt-4">
              <button id="btn-back-3" class="glass-button">Back</button>
              <button id="btn-complete" class="glass-button primary">Calculate My Plan</button>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Attach listeners
  if (step === 1) {
    const ageInput = container.querySelector('#input-age');
    const genderSelect = container.querySelector('#input-gender');
    const nextBtn = container.querySelector('#btn-next-1');

    ageInput.addEventListener('input', (e) => {
      profile.age = e.target.value;
      nextBtn.disabled = !profile.age;
    });
    genderSelect.addEventListener('change', (e) => {
      profile.gender = e.target.value;
    });
    nextBtn.addEventListener('click', () => {
      step = 2;
      renderOnboarding(container, onCompleteNavigate);
    });
  } else if (step === 2) {
    const heightInput = container.querySelector('#input-height');
    const weightInput = container.querySelector('#input-weight');
    const activitySelect = container.querySelector('#input-activity');
    const backBtn = container.querySelector('#btn-back-2');
    const nextBtn = container.querySelector('#btn-next-2');

    const checkValid = () => {
      nextBtn.disabled = !profile.height || !profile.weight;
    };

    heightInput.addEventListener('input', (e) => {
      profile.height = e.target.value;
      checkValid();
    });
    weightInput.addEventListener('input', (e) => {
      profile.weight = e.target.value;
      checkValid();
    });
    activitySelect.addEventListener('change', (e) => {
      profile.activityLevel = e.target.value;
    });
    backBtn.addEventListener('click', () => {
      step = 1;
      renderOnboarding(container, onCompleteNavigate);
    });
    nextBtn.addEventListener('click', () => {
      step = 3;
      renderOnboarding(container, onCompleteNavigate);
    });
  } else if (step === 3) {
    const goalSelect = container.querySelector('#input-goal');
    const vegChk = container.querySelector('#chk-vegetarian');
    const halalChk = container.querySelector('#chk-halal');
    const lacChk = container.querySelector('#chk-lactose');
    const backBtn = container.querySelector('#btn-back-3');
    const completeBtn = container.querySelector('#btn-complete');

    goalSelect.addEventListener('change', (e) => {
      profile.goal = e.target.value;
    });
    vegChk.addEventListener('change', (e) => {
      preferences.vegetarian = e.target.checked;
    });
    halalChk.addEventListener('change', (e) => {
      preferences.halal = e.target.checked;
    });
    lacChk.addEventListener('change', (e) => {
      preferences.lactoseFree = e.target.checked;
    });
    backBtn.addEventListener('click', () => {
      step = 2;
      renderOnboarding(container, onCompleteNavigate);
    });
    completeBtn.addEventListener('click', () => {
      loading = true;
      renderOnboarding(container, onCompleteNavigate);

      setTimeout(() => {
        const prefsArray = Object.keys(preferences).filter((k) => preferences[k]);
        completeOnboarding(
          {
            ...profile,
            age: Number(profile.age),
            height: Number(profile.height),
            weight: Number(profile.weight),
          },
          prefsArray
        );
        loading = false;
        step = 1; // reset step for future
        if (onCompleteNavigate) onCompleteNavigate('#/dashboard');
      }, 2000);
    });
  }
}
