/**
 * vloggersView.js
 * ──────────────────────────────────────────────
 * Food Vlogger Recommendations section view renderer.
 */

import { getIcon } from '../icons.js';

const MOCK_VLOGGERS = [
  {
    id: 'vlog-01',
    channelName: 'Yulia Baltschun',
    badge: '1.8M Subscribers',
    description: 'Diet & fitness educator sharing scientifically grounded nutrition advice, fitness routines, and healthy meal preps.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    youtubeUrl: 'https://www.youtube.com/@YuliaBaltschun'
  },
  {
    id: 'vlog-02',
    channelName: 'Pick Up Limes',
    badge: '4.2M Subscribers',
    description: 'Sadia Badiei (Registered Dietitian) crafting vibrant, plant-based recipes and mindful living tips.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
    youtubeUrl: 'https://www.youtube.com/@PickUpLimes'
  },
  {
    id: 'vlog-03',
    channelName: 'Fit Men Cook',
    badge: '1.2M Subscribers',
    description: 'Kevin Curry proving that healthy, high-protein meals do not have to be boring or complicated.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    youtubeUrl: 'https://www.youtube.com/@fitmencook'
  },
  {
    id: 'vlog-04',
    channelName: 'Elaine Health Journal',
    badge: '450K Subscribers',
    description: 'Asian healthy recipe creator specializing in low-calorie, high-nutrient traditional dishes.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80',
    youtubeUrl: 'https://www.youtube.com'
  }
];

export function renderVloggers(container) {
  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="mb-2">Recommended Food Vloggers</h1>
          <p class="text-muted">Discover top health & nutrition creators for daily inspiration and cooking tips.</p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        ${MOCK_VLOGGERS.map((vlogger) => `
          <div class="glass-panel flex flex-col justify-between">
            <div class="flex gap-4 items-start mb-4">
              <img src="${vlogger.avatar}" alt="${vlogger.channelName}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-glass-border);" />
              <div>
                <h3 class="text-lg mb-1">${vlogger.channelName}</h3>
                <span class="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-medium inline-block mb-2">
                  ${vlogger.badge}
                </span>
                <p class="text-xs text-muted">${vlogger.description}</p>
              </div>
            </div>

            <a href="${vlogger.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="glass-button primary w-full justify-center text-sm py-2">
              ${getIcon('Youtube', 18)} Visit YouTube Channel
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
