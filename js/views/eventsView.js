/**
 * eventsView.js
 * ──────────────────────────────────────────────
 * NutriPlus Community Events section view renderer.
 */

import { getIcon } from '../icons.js';
import { getState, toggleAttendEvent } from '../state.js';

const MOCK_EVENTS = [
  {
    id: 'evt-01',
    title: 'NutriPlus Healthy Meal Prep Workshop',
    date: 'Saturday, 24 August 2026 • 10:00 AM WIB',
    location: 'NutriPlus Studio & Online Stream',
    description: 'Join our master chef for a hands-on session preparing 5 high-protein meals under 30 minutes.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80',
    participants: 142
  },
  {
    id: 'evt-02',
    title: 'Calorie Deficit & Macro Tracking Masterclass',
    date: 'Wednesday, 28 August 2026 • 07:00 PM WIB',
    location: 'Zoom Webinar',
    description: 'Learn how to accurately track your macros without feeling restricted or hungry.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&q=80',
    participants: 289
  },
  {
    id: 'evt-03',
    title: 'Morning 5K Fitness Walk & Healthy Breakfast',
    date: 'Sunday, 1 September 2026 • 06:30 AM WIB',
    location: 'GBK Senayan Park, Jakarta',
    description: 'Community walk followed by a complimentary organic smoothie bowl for all attendees.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&q=80',
    participants: 95
  }
];

export function renderEvents(container) {
  const attendingEvents = getState().attendingEvents || [];

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="mb-2">NutriPlus Events</h1>
          <p class="text-muted">Join exclusive community workshops, fitness meetups, and live sessions.</p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        ${MOCK_EVENTS.map((event) => {
          const isAttending = attendingEvents.includes(event.id);
          const count = event.participants + (isAttending ? 1 : 0);

          return `
            <div class="glass-panel flex flex-col justify-between">
              <div>
                <div class="relative w-full h-44 rounded-lg overflow-hidden mb-4">
                  <img src="${event.image}" alt="${event.title}" style="width:100%; height:100%; object-fit:cover;" />
                  <span class="absolute bottom-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                    ${getIcon('Users', 12)} ${count} Attending
                  </span>
                </div>

                <h3 class="text-lg mb-2">${event.title}</h3>
                <p class="text-xs text-glow mb-1 font-medium flex items-center gap-1">
                  ${getIcon('Calendar', 14)} ${event.date}
                </p>
                <p class="text-xs text-muted mb-3 flex items-center gap-1">
                  ${getIcon('MapPin', 14)} ${event.location}
                </p>
                <p class="text-xs text-muted mb-4">${event.description}</p>
              </div>

              <button 
                class="glass-button w-full justify-center text-sm py-2 btn-attend-event ${isAttending ? 'bg-success border-success' : 'primary'}"
                data-id="${event.id}"
              >
                ${isAttending ? `${getIcon('Check', 16)} Attending` : 'Attend This Event'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Attach event listeners
  container.querySelectorAll('.btn-attend-event').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      toggleAttendEvent(id);
      renderEvents(container);
    });
  });
}
