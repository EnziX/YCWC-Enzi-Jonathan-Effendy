/**
 * dashboard.js
 * ──────────────────────────────────────────────
 * Dashboard view renderer.
 */

import { getState, getTodayConsumed } from '../state.js';
import { renderProgressBar } from './progressBar.js';

export function renderDashboard() {
  const state = getState();
  const { profile, nutrition, mealPlan, streak } = state;
  const todayConsumed = getTodayConsumed();

  const calsPercent = Math.min(100, Math.round((todayConsumed.calories / (nutrition.macros.calories || 1)) * 100)) || 0;

  return `
    <div class="animate-fade-in">
      <h1 class="mb-2">Dashboard</h1>
      <p class="text-muted mb-8">Welcome back! Here's your nutrition overview for today.</p>

      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="glass-panel col-span-1 md:col-span-2 flex flex-col justify-center">
          <h3 class="mb-4">Calorie Progress</h3>
          <div class="flex items-center gap-8">
            <div class="relative w-32 h-32">
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path class="circle"
                  stroke="var(--color-primary)"
                  stroke-dasharray="${calsPercent}, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" class="percentage">${calsPercent}%</text>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-muted mb-1">Consumed</p>
              <h2 class="text-2xl mb-4">${todayConsumed.calories} <span class="text-sm text-muted">/ ${nutrition.macros.calories} kcal</span></h2>
              <p class="text-sm text-muted">Goal: ${profile.goal === 'lose' ? 'Caloric Deficit' : profile.goal === 'gain' ? 'Caloric Surplus' : 'Maintain Weight'}</p>
            </div>
          </div>
        </div>

        <div class="glass-panel flex flex-col justify-center">
          <h3 class="mb-4">Macros</h3>
          ${renderProgressBar({ label: 'Protein', current: todayConsumed.protein, max: nutrition.macros.protein, colorClass: 'bg-glow' })}
          ${renderProgressBar({ label: 'Carbs', current: todayConsumed.carbs, max: nutrition.macros.carbs, colorClass: 'bg-warning' })}
          ${renderProgressBar({ label: 'Fat', current: todayConsumed.fat, max: nutrition.macros.fat, colorClass: 'bg-danger' })}
          ${renderProgressBar({ label: 'Fiber', current: todayConsumed.fiber, max: nutrition.macros.fiber, colorClass: 'bg-success' })}
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="glass-panel">
          <div class="flex justify-between items-center mb-4">
            <h3>Today's Plan</h3>
            <a href="#/meal-planner" class="text-primary text-sm hover:underline">View All</a>
          </div>
          ${mealPlan?.meals ? `
            <div class="flex flex-col gap-3">
              ${Object.keys(mealPlan.meals).map((mealType) => `
                <div class="p-3 bg-slate-900/50 rounded-lg flex justify-between items-center border border-slate-800">
                  <span class="capitalize font-medium">${mealType}</span>
                  <span class="text-sm text-muted">${mealPlan.meals[mealType].totalNutrition.calories} kcal</span>
                </div>
              `).join('')}
            </div>
          ` : `
            <p class="text-muted text-sm">No meal plan generated.</p>
          `}
        </div>

        <div class="glass-panel flex flex-col justify-center items-center text-center">
          <h3 class="mb-2">Consistency is Key</h3>
          <p class="text-sm text-muted mb-6">Log your foods and hit your targets to build your streak!</p>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-4xl text-gradient font-heading font-bold">${streak?.current || 0}</span>
            <span class="text-xl">Days</span>
          </div>
          <p class="text-xs text-muted">Personal Best: ${streak?.best || 0} days</p>
        </div>
      </div>
    </div>
  `;
}
