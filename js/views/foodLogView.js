/**
 * foodLogView.js
 * ──────────────────────────────────────────────
 * Food Log view renderer and controller.
 */

import { getTodayLog, removeLoggedFood, logWater } from '../state.js';
import { getIcon } from '../icons.js';

export function renderFoodLog(container) {
  const todayLog = getTodayLog();

  container.innerHTML = `
    <div class="animate-fade-in">
      <h1 class="mb-2">Food Log</h1>
      <p class="text-muted mb-8">Track your daily consumption.</p>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="col-span-2 glass-panel">
          <h3 class="mb-4">Logged Foods</h3>
          
          ${todayLog.foods.length === 0 ? `
            <p class="text-muted text-center py-8">No foods logged today.</p>
          ` : `
            <div class="flex flex-col gap-3">
              ${todayLog.foods.map((food, idx) => `
                <div class="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <p class="font-medium">${food.name}</p>
                    <p class="text-xs text-muted">
                      ${Math.round(food.calories * (food.portionMultiplier || 1))} kcal
                    </p>
                  </div>
                  <button class="text-danger hover:text-red-400 transition-colors btn-remove-food" data-index="${idx}">
                    ${getIcon('Trash2', 18)}
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <div class="glass-panel flex flex-col h-fit">
          <h3 class="mb-4 flex items-center gap-2">
            <span class="text-glow">${getIcon('Droplet', 20)}</span> Water Intake
          </h3>
          
          <div class="flex flex-col items-center justify-center py-6 gap-4">
            <h2 class="text-3xl text-gradient">${todayLog.waterIntake || 0} ml</h2>
            
            <div class="flex gap-2 w-full">
              <button id="btn-water-250" class="glass-button flex-1 py-2 text-sm">+ 250ml</button>
              <button id="btn-water-500" class="glass-button flex-1 py-2 text-sm">+ 500ml</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  container.querySelectorAll('.btn-remove-food').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idx = Number(e.currentTarget.getAttribute('data-index'));
      removeLoggedFood(idx);
      renderFoodLog(container);
    });
  });

  const water250Btn = container.querySelector('#btn-water-250');
  const water500Btn = container.querySelector('#btn-water-500');

  if (water250Btn) {
    water250Btn.addEventListener('click', () => {
      logWater(250);
      renderFoodLog(container);
    });
  }
  if (water500Btn) {
    water500Btn.addEventListener('click', () => {
      logWater(500);
      renderFoodLog(container);
    });
  }
}
