/**
 * progressBar.js
 * ──────────────────────────────────────────────
 * Progress bar component renderer.
 */

export function renderProgressBar({ label, current, max, colorClass = "bg-primary", unit = "g" }) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  
  return `
    <div class="mb-4">
      <div class="flex justify-between items-end mb-1">
        <span class="text-sm font-medium">${label}</span>
        <span class="text-xs text-muted">
          ${Math.round(current)} / ${Math.round(max)}${unit}
        </span>
      </div>
      <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          class="h-full ${colorClass}" 
          style="width: ${percentage}%; transition: width 1s ease-out; background-color: var(--color-${colorClass.replace('bg-', '')});"
        ></div>
      </div>
    </div>
  `;
}
