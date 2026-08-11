/**
 * chatWidget.js
 * ──────────────────────────────────────────────
 * Floating AI Chat Widget using Gemini API.
 * Provides personalized responses based on user profile, macros, and food log.
 */

import { getState, getTodayConsumed } from '../state.js';
import { getIcon } from '../icons.js';

// Default key for local dev/testing as provided by user
const DEFAULT_GEMINI_KEY = 'XXX';

let isChatOpen = false;
let messages = [
  { role: 'ai', content: "Hello! I am your Nutri+ AI assistant. Ask me anything about your nutrition targets, meal recommendations, or health tips!" }
];

export function renderChatWidget(container) {
  let widgetContainer = document.getElementById('ai-chat-widget-root');
  if (!widgetContainer) {
    widgetContainer = document.createElement('div');
    widgetContainer.id = 'ai-chat-widget-root';
    document.body.appendChild(widgetContainer);
  }

  widgetContainer.innerHTML = `
    <button id="btn-chat-fab" class="chat-fab" title="Chat with Nutri+ AI">
      ${isChatOpen ? getIcon('X', 24) : getIcon('Bot', 26)}
    </button>

    ${isChatOpen ? `
      <div class="chat-panel">
        <div class="chat-header">
          <div class="flex items-center gap-2">
            <div class="ai-core" style="width: 20px; height: 20px;"></div>
            <span class="font-heading font-bold text-sm">Nutri+ AI Agent</span>
          </div>
          <button id="btn-close-chat" class="glass-button p-1" style="padding: 0.2rem 0.4rem;">
            ${getIcon('X', 16)}
          </button>
        </div>

        <div id="chat-messages" class="chat-messages">
          ${messages.map((msg) => `
            <div class="chat-bubble ${msg.role}">
              ${msg.content.replace(/\n/g, '<br/>')}
            </div>
          `).join('')}
        </div>

        <form id="form-chat-send" class="chat-input-area">
          <input type="text" id="chat-input-text" class="glass-input" placeholder="Ask Nutri+ AI..." autocomplete="off" />
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

  if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = widgetContainer.querySelector('#chat-input-text');
      const query = input.value.trim();
      if (!query) return;

      // Add user message
      messages.push({ role: 'user', content: query });
      input.value = '';
      renderChatWidget(container);
      scrollToBottom();

      // Show typing indicator
      messages.push({ role: 'ai', content: 'Thinking...' });
      renderChatWidget(container);
      scrollToBottom();

      try {
        const reply = await callGeminiAPI(query);
        // Replace typing indicator with reply
        messages[messages.length - 1] = { role: 'ai', content: reply };
      } catch (err) {
        messages[messages.length - 1] = {
          role: 'ai',
          content: 'Sorry, I encountered an issue connecting to Gemini. Please verify your API key or connection.'
        };
      }

      renderChatWidget(container);
      scrollToBottom();
    });
  }
}

function scrollToBottom() {
  const msgDiv = document.getElementById('chat-messages');
  if (msgDiv) {
    msgDiv.scrollTop = msgDiv.scrollHeight;
  }
}

async function callGeminiAPI(userQuery) {
  const state = getState();
  const todayConsumed = getTodayConsumed();
  const { profile, nutrition, preferences } = state;

  const systemContext = `
You are Nutri+ AI, a smart nutrition and health agent assistant.
User Profile context:
- Age: ${profile.age || 'N/A'}, Gender: ${profile.gender || 'N/A'}, Height: ${profile.height || 'N/A'}cm, Weight: ${profile.weight || 'N/A'}kg
- Goal: ${profile.goal || 'N/A'}, Activity Level: ${profile.activityLevel || 'N/A'}
- Dietary Preferences: ${preferences?.join(', ') || 'None'}
- Target Calories: ${nutrition.macros?.calories || 0} kcal (Protein: ${nutrition.macros?.protein}g, Carbs: ${nutrition.macros?.carbs}g, Fat: ${nutrition.macros?.fat}g)
- Consumed Today: ${todayConsumed.calories} kcal (Protein: ${todayConsumed.protein}g, Carbs: ${todayConsumed.carbs}g, Fat: ${todayConsumed.fat}g)

Provide concise, friendly, encouraging, and accurate nutritional advice matching their goals and preferences. Keep answers clear and actionable.
  `;

  const apiKey = DEFAULT_GEMINI_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: systemContext },
          { text: `User Question: ${userQuery}` }
        ]
      }
    ]
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || "I'm here to help with your nutrition! Could you rephrase your question?";
}
