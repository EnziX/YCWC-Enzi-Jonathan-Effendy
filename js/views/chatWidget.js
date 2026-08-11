/**
 * chatWidget.js
 * ──────────────────────────────────────────────
 * Floating Offline AI Chat Widget.
 * Provides personalized responses based on user profile, macros, and local database.
 */

import { getIcon } from '../icons.js';
import { getOfflineAiResponse } from '../offlineAiAgent.js';

let isChatOpen = false;
let messages = [
  { role: 'ai', content: "Halo! Saya Nutri+ AI Agent (Offline Mode). Ada yang bisa saya bantu terkait nutrisi, sisa kalori, rekomendasi makanan, atau resep hari ini?" }
];

export function renderChatWidget(container) {
  let widgetContainer = document.getElementById('ai-chat-widget-root');
  if (!widgetContainer) {
    widgetContainer = document.createElement('div');
    widgetContainer.id = 'ai-chat-widget-root';
    document.body.appendChild(widgetContainer);
  }

  widgetContainer.innerHTML = `
    <button id="btn-chat-fab" class="chat-fab" title="Chat with Nutri+ AI (Offline)">
      ${isChatOpen ? getIcon('X', 24) : getIcon('Bot', 26)}
    </button>

    ${isChatOpen ? `
      <div class="chat-panel">
        <div class="chat-header">
          <div class="flex items-center gap-2">
            <div class="ai-core" style="width: 20px; height: 20px;"></div>
            <div class="flex flex-col">
              <span class="font-heading font-bold text-sm">Nutri+ AI Agent</span>
              <span class="text-xs text-muted" style="font-size: 0.68rem; color: var(--color-success);">● Offline Engine Active</span>
            </div>
          </div>
          <button id="btn-close-chat" class="glass-button p-1" style="padding: 0.2rem 0.4rem;">
            ${getIcon('X', 16)}
          </button>
        </div>

        <div id="chat-messages" class="chat-messages">
          ${messages.map((msg) => `
            <div class="chat-bubble ${msg.role}">
              ${formatMarkdownText(msg.content)}
            </div>
          `).join('')}
        </div>

        <!-- Quick Prompt Chips -->
        <div class="chat-chips-area">
          <button class="chip-btn" data-query="Berapa sisa kalori saya hari ini?">📊 Sisa Kalori</button>
          <button class="chip-btn" data-query="Rekomendasi makan siang sehat">🥗 Rekomendasi Makan</button>
          <button class="chip-btn" data-query="Makanan tinggi protein">🥩 Tinggi Protein</button>
          <button class="chip-btn" data-query="Tips menurunkan berat badan">💡 Tips Diet</button>
        </div>

        <form id="form-chat-send" class="chat-input-area">
          <input type="text" id="chat-input-text" class="glass-input" placeholder="Tanyakan nutrisi, kalori, resep..." autocomplete="off" />
          <button type="submit" class="glass-button primary p-2" style="padding: 0.5rem 0.8rem;">
            ${getIcon('Send', 18)}
          </button>
        </form>
      </div>
    ` : ''}
  `;

  // Attach event listeners
  const fab = widgetContainer.querySelector('#btn-chat-fab');
  const closeBtn = widgetContainer.querySelector('#btn-close-chat');
  const chatForm = widgetContainer.querySelector('#form-chat-send');
  const chipBtns = widgetContainer.querySelectorAll('.chip-btn');

  if (fab) {
    fab.addEventListener('click', () => {
      isChatOpen = !isChatOpen;
      renderChatWidget(container);
      scrollToBottom();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      isChatOpen = false;
      renderChatWidget(container);
    });
  }

  if (chipBtns) {
    chipBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (query) sendUserMessage(query, container);
      });
    });
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = widgetContainer.querySelector('#chat-input-text');
      const query = input.value.trim();
      if (!query) return;
      input.value = '';
      sendUserMessage(query, container);
    });
  }
}

async function sendUserMessage(query, container) {
  messages.push({ role: 'user', content: query });
  renderChatWidget(container);
  scrollToBottom();

  // Show typing indicator
  messages.push({ role: 'ai', content: 'Memproses kecerdasan nutrisi...' });
  renderChatWidget(container);
  scrollToBottom();

  try {
    const reply = await getOfflineAiResponse(query);
    messages[messages.length - 1] = { role: 'ai', content: reply };
  } catch (err) {
    messages[messages.length - 1] = {
      role: 'ai',
      content: 'Maaf, terjadi kesalahan pada engine lokal. Silakan coba pertanyaan lain.'
    };
  }

  renderChatWidget(container);
  scrollToBottom();
}

function scrollToBottom() {
  const msgDiv = document.getElementById('chat-messages');
  if (msgDiv) {
    msgDiv.scrollTop = msgDiv.scrollHeight;
  }
}

function formatMarkdownText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

