/**
 * mealPlannerView.js
 * ──────────────────────────────────────────────
 * Meal Planner view renderer and controller.
 */

import { getState, regeneratePlan, logFood } from '../state.js';
import { getIcon } from '../icons.js';

const loggedFoods = new Set();

export function renderMealPlanner(container) {
  const state = getState();
  const mealPlan = state.mealPlan;

  if (!mealPlan) {
    container.innerHTML = `
      <div class="animate-fade-in">
        <h1 class="mb-2">Meal Planner</h1>
        <p class="text-muted">No meal plan generated yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="mb-2">Meal Planner</h1>
          <p class="text-muted">Your personalized daily menu.</p>
        </div>
        <button id="btn-regenerate" class="glass-button">
          ${getIcon('RefreshCw', 18)} Regenerate All
        </button>
      </div>

      <div class="grid gap-6">
        ${Object.entries(mealPlan.meals).map(([mealType, data]) => {
          const isLogged = data.foods.every((f) => loggedFoods.has(f.id + mealType));

          return `
            <div class="glass-panel">
              <div class="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                <h3 class="capitalize text-gradient">${mealType}</h3>
                <div class="flex items-center gap-4">
                  <span class="text-sm text-muted">${data.totalNutrition.calories} kcal</span>
                  <button 
                    class="glass-button text-sm py-1 px-3 btn-log-meal ${isLogged ? 'bg-success border-success' : 'primary'}"
                    data-meal-type="${mealType}"
                    ${isLogged ? 'disabled' : ''}
                  >
                    ${isLogged ? `${getIcon('CheckCircle', 14)} Logged` : 'Log Meal'}
                  </button>
                </div>
              </div>
              
              <div class="flex flex-col gap-3">
                ${data.foods.map((food) => `
                  <div class="flex justify-between items-center p-3 bg-slate-900/40 rounded-lg">
                    <div>
                      <p class="font-medium">${food.name}</p>
                      <p class="text-xs text-muted">Portion: ${food.portion || food.servingUnit} (${((food.portionMultiplier || 1) * 100).toFixed(0)}%)</p>
                    </div>
                    <div class="flex gap-4 text-xs text-muted">
                      <span>P: ${Math.round(food.protein * (food.portionMultiplier || 1))}g</span>
                      <span>C: ${Math.round(food.carbs * (food.portionMultiplier || 1))}g</span>
                      <span>F: ${Math.round(food.fat * (food.portionMultiplier || 1))}g</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Attach event listeners
  const regenBtn = container.querySelector('#btn-regenerate');
  if (regenBtn) {
    regenBtn.addEventListener('click', () => {
      regeneratePlan();
      renderMealPlanner(container);
    });
  }

  container.querySelectorAll('.btn-log-meal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const mealType = e.currentTarget.getAttribute('data-meal-type');
      const data = mealPlan.meals[mealType];
      if (!data) return;

      data.foods.forEach((food) => {
        if (!loggedFoods.has(food.id + mealType)) {
          logFood(food, food.portionMultiplier || 1);
          loggedFoods.add(food.id + mealType);
        }
      });

      renderMealPlanner(container);
    });
  });
}
