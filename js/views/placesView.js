/**
 * placesView.js
 * ──────────────────────────────────────────────
 * Healthy Food Places Finder view renderer.
 * Curated healthy food spots with operating hours & Google Maps integration.
 */

import { getIcon } from '../icons.js';
import { getState } from '../state.js';

const MOCK_PLACES = [
  {
    id: 'p01',
    name: 'Aiola Eatery - Slamet',
    category: 'Pujasera & Traditional Eatery',
    rating: 4.8,
    raterCount: '10K++',
    address: 'Jl. Slamet No.16, Ketabang, Kec. Genteng, Surabaya, Jawa Timur 60272',
    description: 'Pujasera santai yang menawarkan beragam masakan tradisional Indonesia hingga hidangan klasik Italia.',
    tags: ['halal', 'traditional', 'pujasera', 'surabaya'],
    googleMapUrl: 'https://maps.google.com/?q=Aiola+Eatery+Slamet+Surabaya',
    image: './assets/aiola-eatery.png',
    hours: [
      { day: 'Senin', time: '09.00–22.00' },
      { day: 'Selasa', time: '09.00–22.00' },
      { day: 'Rabu', time: '09.00–22.00' },
      { day: 'Kamis', time: '09.00–22.00' },
      { day: 'Jumat', time: '09.00–22.00' },
      { day: 'Sabtu', time: '09.00–22.00' },
      { day: 'Minggu', time: '09.00–22.00' }
    ]
  },
  {
    id: 'p02',
    name: 'Spesial Soto Boyolali (SSB) Hj. Hesti Widodo, Surabaya',
    category: 'Soto & Traditional Soup',
    rating: 4.7,
    raterCount: '2,323',
    address: 'Jl. Slamet No.31, Ketabang, Kec. Genteng, Surabaya, Jawa Timur 60272',
    phone: '0811-2650-705',
    description: 'Soto ayam kampung & soto daging sapi khas Boyolali yang segar, lezat, dan kaya akan nutrisi protein.',
    tags: ['halal', 'soto', 'traditional', 'surabaya'],
    googleMapUrl: 'https://maps.google.com/?q=Spesial+Soto+Boyolali+Hj+Hesti+Widodo+Surabaya',
    image: './assets/soto-boyolali.png',
    hours: [
      { day: 'Senin', time: '06.00–21.00' },
      { day: 'Selasa', time: '06.00–21.00' },
      { day: 'Rabu', time: '06.00–21.00' },
      { day: 'Kamis', time: '06.00–21.00' },
      { day: 'Jumat', time: '06.00–21.00' },
      { day: 'Sabtu', time: '06.00–21.00' },
      { day: 'Minggu', time: '06.00–21.00' }
    ]
  }
];

let activeFilter = 'all';
let searchQuery = '';
let activeHoursModalId = null;

export function renderPlaces(container) {
  const userPrefs = getState().preferences || [];

  const filteredPlaces = MOCK_PLACES.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    return place.tags.includes(activeFilter);
  });

  const selectedPlaceForModal = MOCK_PLACES.find((p) => p.id === activeHoursModalId);

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="mb-2">Healthy Food Places</h1>
          <p class="text-muted">Find nutrition-friendly restaurants and authentic eateries near you.</p>
        </div>
      </div>

      <!-- Search & Filter Bar -->
      <div class="glass-panel mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div class="relative w-full md:w-1/2">
          <input type="text" id="input-places-search" class="glass-input" placeholder="Search eatery by name, description, or location..." value="${searchQuery}" />
        </div>
        <div class="flex flex-wrap gap-2 w-full md:w-auto">
          <button class="glass-button text-xs py-1 px-3 btn-places-filter ${activeFilter === 'all' ? 'primary' : ''}" data-filter="all">All</button>
          <button class="glass-button text-xs py-1 px-3 btn-places-filter ${activeFilter === 'halal' ? 'primary' : ''}" data-filter="halal">Halal</button>
          <button class="glass-button text-xs py-1 px-3 btn-places-filter ${activeFilter === 'traditional' ? 'primary' : ''}" data-filter="traditional">Traditional</button>
          <button class="glass-button text-xs py-1 px-3 btn-places-filter ${activeFilter === 'soto' ? 'primary' : ''}" data-filter="soto">Soto</button>
          <button class="glass-button text-xs py-1 px-3 btn-places-filter ${activeFilter === 'pujasera' ? 'primary' : ''}" data-filter="pujasera">Pujasera</button>
        </div>
      </div>

      <!-- Grid of Places -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        ${filteredPlaces.map((place) => `
          <div class="glass-panel flex flex-col justify-between">
            <div>
              <div class="relative w-full h-52 rounded-lg overflow-hidden mb-4 bg-slate-900">
                <img src="${place.image}" alt="${place.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80'" />
                <span class="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 px-2.5 py-1 rounded-full text-xs text-glow flex items-center gap-1 font-medium shadow-md">
                  ${getIcon('Star', 12)} ${place.rating} / 5 (${place.raterCount})
                </span>
              </div>

              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-bold mb-1">${place.name}</h3>
                  <p class="text-xs text-glow font-medium mb-2">${place.category}</p>
                </div>
              </div>

              <p class="text-xs text-muted mb-3 leading-relaxed">
                ${place.description}
              </p>

              <p class="text-xs text-muted mb-2 flex items-start gap-1.5">
                <span class="mt-0.5 text-glow">${getIcon('MapPin', 14)}</span> ${place.address}
              </p>

              ${place.phone ? `
                <p class="text-xs text-muted mb-3 flex items-center gap-1.5">
                  <span class="text-glow">${getIcon('Phone', 14)}</span> ${place.phone}
                </p>
              ` : ''}

              <div class="flex flex-wrap gap-1 mb-6">
                ${place.tags.map((tag) => `
                  <span class="text-xs px-2.5 py-0.5 rounded-full ${userPrefs.includes(tag) ? 'bg-success/20 text-success font-medium' : 'bg-slate-800 text-muted'}">
                    #${tag}
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="flex gap-3 mt-2">
              <button class="glass-button text-xs py-2 px-3 flex-1 btn-see-hours" data-place-id="${place.id}">
                ${getIcon('Clock', 14)} See Hours
              </button>
              <a href="${place.googleMapUrl}" target="_blank" rel="noopener noreferrer" class="glass-button primary text-xs py-2 px-3 flex-1 justify-center">
                ${getIcon('ExternalLink', 14)} Open in Google
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      ${filteredPlaces.length === 0 ? `
        <div class="glass-panel text-center py-12 mb-8">
          <p class="text-muted">No healthy places matched your search or filters.</p>
        </div>
      ` : ''}

      <!-- Bottom Explore More Banner -->
      <div class="glass-panel text-center p-8 flex flex-col items-center justify-center gap-3 border border-primary/30 rounded-2xl shadow-lg">
        <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-glow mb-1">
          ${getIcon('Search', 24)}
        </div>
        <h3 class="text-xl font-bold">Want to explore more places?</h3>
        <p class="text-sm text-muted max-w-md">Discover additional healthy eateries, traditional food spots, and cafes near your location on Google Maps.</p>
        <a href="https://www.google.com/maps/search/healthy+eatery+places+nearby" target="_blank" rel="noopener noreferrer" class="glass-button primary py-2.5 px-6 mt-2 flex items-center gap-2">
          ${getIcon('ExternalLink', 16)} Explore on Google
        </a>
      </div>

      <!-- Hours Modal -->
      ${selectedPlaceForModal ? `
        <div class="modal-backdrop" id="hours-modal-backdrop">
          <div class="glass-panel modal-content relative animate-fade-in max-w-md w-full p-6">
            <div class="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <span class="text-glow">${getIcon('Clock', 20)}</span>
                <h3 class="text-base font-bold">Operating Hours</h3>
              </div>
              <button class="glass-button py-1 px-2 text-xs" id="btn-close-hours">
                ${getIcon('X', 16)}
              </button>
            </div>

            <h4 class="text-lg font-bold mb-1">${selectedPlaceForModal.name}</h4>
            <p class="text-xs text-muted mb-4 flex items-center gap-1">
              ${getIcon('MapPin', 12)} ${selectedPlaceForModal.address}
            </p>

            <div class="bg-slate-900/60 rounded-xl p-4 mb-4 border border-slate-800">
              <div class="space-y-2 text-sm">
                ${selectedPlaceForModal.hours.map((h) => `
                  <div class="flex justify-between items-center py-1 border-b border-slate-800/50 last:border-0">
                    <span class="font-medium text-muted">${h.day}</span>
                    <span class="font-mono text-xs text-glow">${h.time}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            ${selectedPlaceForModal.phone ? `
              <div class="mb-4 text-xs text-muted flex items-center justify-between bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
                <span class="flex items-center gap-1.5">${getIcon('Phone', 14)} ${selectedPlaceForModal.phone}</span>
                <a href="tel:${selectedPlaceForModal.phone}" class="text-primary font-medium hover:underline">Call Now</a>
              </div>
            ` : ''}

            <div class="flex gap-2">
              <a href="${selectedPlaceForModal.googleMapUrl}" target="_blank" rel="noopener noreferrer" class="glass-button primary w-full justify-center text-xs py-2">
                ${getIcon('ExternalLink', 14)} Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Attach event listeners
  const searchInput = container.querySelector('#input-places-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPlaces(container);
    });
  }

  container.querySelectorAll('.btn-places-filter').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      activeFilter = e.currentTarget.getAttribute('data-filter');
      renderPlaces(container);
    });
  });

  container.querySelectorAll('.btn-see-hours').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      activeHoursModalId = e.currentTarget.getAttribute('data-place-id');
      renderPlaces(container);
    });
  });

  const closeBtn = container.querySelector('#btn-close-hours');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      activeHoursModalId = null;
      renderPlaces(container);
    });
  }

  const modalBackdrop = container.querySelector('#hours-modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        activeHoursModalId = null;
        renderPlaces(container);
      }
    });
  }
}
