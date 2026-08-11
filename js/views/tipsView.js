/**
 * tipsView.js
 * ──────────────────────────────────────────────
 * Tips & Education view renderer.
 */

import { educationData } from '../data.js';

export function renderTips() {
  return `
    <div class="animate-fade-in">
      <h1 class="mb-2">Tips & Education</h1>
      <p class="text-muted mb-8">Learn more about nutrition and healthy habits.</p>

      <div class="grid md:grid-cols-2 gap-6">
        ${educationData ? educationData.map((article) => `
          <div class="glass-panel">
            <h3 class="mb-2 text-glow">${article.title}</h3>
            <p class="text-sm text-muted mb-4">${article.content.replace(/\n/g, '<br/>')}</p>
            <div class="flex flex-wrap gap-2">
              ${article.tags ? article.tags.map((tag) => `
                <span class="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                  #${tag}
                </span>
              `).join('') : `
                <span class="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                  #${article.category.toLowerCase()}
                </span>
              `}
            </div>
          </div>
        `).join('') : `
          <p class="text-muted">Loading educational content...</p>
        `}
      </div>
    </div>
  `;
}
