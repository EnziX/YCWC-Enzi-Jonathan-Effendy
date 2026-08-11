/**
 * videosView.js
 * ──────────────────────────────────────────────
 * Nutrition Educational Videos section view renderer.
 */

import { getIcon } from '../icons.js';

const NUTRITION_VIDEOS = [
  {
    id: 'v1',
    youtubeId: 'gA7p4bC1FBE',
    title: 'How to Calculate Your Calories & Macros Explained',
    channel: 'Nutrition Made Simple',
    duration: '12:45',
    category: 'Macros & Calories',
    thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&q=80',
    description: 'Learn the exact math behind Basal Metabolic Rate, TDEE, and ideal protein/carb splits.'
  },
  {
    id: 'v2',
    youtubeId: '3U2zN_v3mS8',
    title: '10 Meal Prep Ideas for Healthy Weight Loss',
    channel: 'Fit Foodie Guide',
    duration: '18:20',
    category: 'Meal Prep',
    thumbnail: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80',
    description: 'Easy batch-cooking recipes for high protein lunches that last the entire week.'
  },
  {
    id: 'v3',
    youtubeId: 'XYZ12345678',
    title: 'The Truth About Fiber & Gut Health',
    channel: 'Dr. Wellness Talk',
    duration: '15:10',
    category: 'Digestion & Health',
    thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80',
    description: 'How soluble and insoluble fiber regulate blood sugar, digestion, and appetite.'
  },
  {
    id: 'v4',
    youtubeId: 'ABC98765432',
    title: 'Hydration 101: How Much Water Do You Really Need?',
    channel: 'Science of Living',
    duration: '09:55',
    category: 'Hydration',
    thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
    description: 'Debunking hydration myths and calculating your personalized daily liquid goal.'
  }
];

let activeVideo = null;

export function renderVideos(container) {
  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="mb-2">Nutrition Videos</h1>
          <p class="text-muted">Watch expert video guides on meal prep, macros, and healthy living.</p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        ${NUTRITION_VIDEOS.map((video) => `
          <div class="glass-panel flex flex-col justify-between">
            <div>
              <div class="relative w-full h-48 rounded-lg overflow-hidden mb-4 group cursor-pointer btn-play-video" data-id="${video.id}">
                <img src="${video.thumbnail}" alt="${video.title}" style="width:100%; height:100%; object-fit:cover;" />
                <div class="absolute inset-0 bg-slate-900/40 flex items-center justify-center transition-opacity hover:bg-slate-900/20">
                  <div class="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg">
                    ${getIcon('Video', 24)}
                  </div>
                </div>
                <span class="absolute bottom-2 right-2 bg-slate-900/80 px-2 py-0.5 rounded text-xs">
                  ${video.duration}
                </span>
              </div>

              <span class="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-medium mb-2 inline-block">
                ${video.category}
              </span>

              <h3 class="text-lg mb-2">${video.title}</h3>
              <p class="text-xs text-muted mb-2">By ${video.channel}</p>
              <p class="text-xs text-muted mb-4">${video.description}</p>
            </div>

            <button class="glass-button primary w-full justify-center text-sm py-2 btn-play-video" data-id="${video.id}">
              ${getIcon('Video', 16)} Watch Video
            </button>
          </div>
        `).join('')}
      </div>

      ${activeVideo ? `
        <div id="modal-video" class="modal-backdrop" style="display: flex;">
          <div class="glass-panel modal-content animate-fade-in" style="max-width: 720px;">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold">${activeVideo.title}</h3>
              <button id="btn-close-video-modal" class="glass-button p-1" style="padding: 0.2rem 0.5rem;">
                ${getIcon('X', 18)}
              </button>
            </div>
            <div class="relative w-full" style="padding-top: 56.25%;">
              <iframe 
                class="absolute inset-0 w-full h-full rounded-lg" 
                src="https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1" 
                title="${activeVideo.title}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Attach event listeners
  container.querySelectorAll('.btn-play-video').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      activeVideo = NUTRITION_VIDEOS.find((v) => v.id === id);
      renderVideos(container);
    });
  });

  const closeBtn = container.querySelector('#btn-close-video-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      activeVideo = null;
      renderVideos(container);
    });
  }
}
