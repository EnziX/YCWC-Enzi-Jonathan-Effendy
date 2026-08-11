/**
 * landing.js
 * ──────────────────────────────────────────────
 * Landing page view renderer.
 */

import { getIcon } from '../icons.js';

export function renderLanding() {
  return `
    <div class="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div class="ai-processing mb-8">
        <div class="ai-core"></div>
      </div>
      
      <h1 class="text-gradient mb-4" style="font-size: 3rem;">Nutri+</h1>
      <p class="text-muted mb-8 max-w-lg mx-auto" style="font-size: 1.2rem; line-height: 1.6;">
        Your intelligent nutrition agent. We calculate your exact nutritional needs and build personalized meal plans to help you reach your goals.
      </p>

      <div class="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
        <div class="glass-panel text-left flex gap-4">
          <span class="text-primary mt-1">${getIcon('Brain', 24)}</span>
          <div>
            <h3 class="mb-2">Smart Analysis</h3>
            <p class="text-muted text-sm">AI-driven calculations for your unique body profile.</p>
          </div>
        </div>
        <div class="glass-panel text-left flex gap-4">
          <span class="text-primary mt-1">${getIcon('Target', 24)}</span>
          <div>
            <h3 class="mb-2">Goal Oriented</h3>
            <p class="text-muted text-sm">Whether you want to lose, maintain, or gain weight.</p>
          </div>
        </div>
        <div class="glass-panel text-left flex gap-4">
          <span class="text-primary mt-1">${getIcon('Utensils', 24)}</span>
          <div>
            <h3 class="mb-2">Meal Planning</h3>
            <p class="text-muted text-sm">Daily menus mapped to your macro and micro needs.</p>
          </div>
        </div>
        <div class="glass-panel text-left flex gap-4">
          <span class="text-primary mt-1">${getIcon('Activity', 24)}</span>
          <div>
            <h3 class="mb-2">Progress Tracking</h3>
            <p class="text-muted text-sm">Build streaks and log foods to stay on track.</p>
          </div>
        </div>
      </div>

      <a href="#/onboarding" class="glass-button primary animate-pulse-glow" style="font-size: 1.2rem; padding: 1rem 3rem;">
        Start Now
      </a>
    </div>
  `;
}
