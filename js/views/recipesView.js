/**
 * recipesView.js
 * ──────────────────────────────────────────────
 * Dedicated Healthy Recipe Catalog view renderer.
 */

import { getIcon } from '../icons.js';
import { foodDatabase } from '../data.js';

const MOCK_RECIPES = [
  {
    id: 'r01',
    name: 'Grilled Chicken Salad Bowl',
    category: 'lunch',
    prepTime: '15 min',
    cookTime: '10 min',
    difficulty: 'Easy',
    calories: 350,
    protein: 35,
    carbs: 15,
    fat: 18,
    fiber: 5,
    tags: ['halal', 'gluten-free', 'dairy-free'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80',
    ingredients: [
      '150g chicken breast',
      '2 cups mixed greens',
      '½ cucumber, sliced',
      '1 medium tomato, diced',
      '¼ avocado, sliced',
      '1 tbsp olive oil',
      '1 tbsp lemon juice'
    ],
    instructions: [
      'Season chicken breast with salt, pepper, and olive oil.',
      'Grill on medium heat for 5-6 minutes per side.',
      'Slice chicken and toss with fresh salad greens and vegetables.',
      'Drizzle with olive oil and fresh lemon juice before serving.'
    ]
  },
  {
    id: 'r02',
    name: 'Veggie Tofu Stir-Fry',
    category: 'dinner',
    prepTime: '10 min',
    cookTime: '12 min',
    difficulty: 'Easy',
    calories: 280,
    protein: 18,
    carbs: 25,
    fat: 12,
    fiber: 6,
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
    ingredients: [
      '150g firm tofu, cubed',
      '1 cup broccoli florets',
      '1 red bell pepper, sliced',
      '2 cloves garlic, minced',
      '1 tbsp soy sauce',
      '1 tsp sesame oil'
    ],
    instructions: [
      'Press tofu to remove excess water, then cube into bite-sized pieces.',
      'Sauté tofu in sesame oil until light golden.',
      'Add broccoli, bell pepper, and minced garlic; stir-fry for 4-5 minutes.',
      'Add soy sauce and serve hot over brown rice or quinoa.'
    ]
  },
  {
    id: 'r03',
    name: 'Overnight Oats with Chia & Berries',
    category: 'breakfast',
    prepTime: '5 min',
    cookTime: '0 min',
    difficulty: 'Easy',
    calories: 320,
    protein: 12,
    carbs: 48,
    fat: 8,
    fiber: 7,
    tags: ['vegetarian', 'halal', 'lactose-free'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80',
    ingredients: [
      '½ cup rolled oats',
      '½ cup almond milk',
      '1 tbsp chia seeds',
      '1 tbsp honey',
      '½ cup blueberries and strawberries'
    ],
    instructions: [
      'Combine oats, almond milk, chia seeds, and honey in a mason jar.',
      'Refrigerate overnight (at least 6 hours).',
      'Top with fresh blueberries and sliced strawberries before eating.'
    ]
  },
  {
    id: 'r04',
    name: 'Salmon Quinoa Power Bowl',
    category: 'lunch',
    prepTime: '10 min',
    cookTime: '20 min',
    difficulty: 'Medium',
    calories: 450,
    protein: 32,
    carbs: 40,
    fat: 16,
    fiber: 6,
    tags: ['halal', 'gluten-free', 'dairy-free'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80',
    ingredients: [
      '150g salmon fillet',
      '½ cup cooked quinoa',
      '1 cup steamed broccoli',
      '½ avocado, sliced',
      '1 tbsp soy sauce'
    ],
    instructions: [
      'Pan-sear salmon fillet skin-side down for 4 minutes, flip and cook 3 minutes.',
      'Assemble fluffy quinoa as the bowl base.',
      'Top with salmon, steamed broccoli, and avocado slices.',
      'Drizzle with soy sauce.'
    ]
  }
];

let selectedCategory = 'all';
let selectedTag = 'all';
let selectedRecipe = null;

export function renderRecipes(container) {
  const filteredRecipes = MOCK_RECIPES.filter((r) => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (selectedTag !== 'all' && !r.tags.includes(selectedTag)) return false;
    return true;
  });

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="mb-2">Healthy Recipes</h1>
          <p class="text-muted">Explore nutritious, chef-crafted recipes with full ingredient & macro details.</p>
        </div>
      </div>

      <!-- Filters Bar -->
      <div class="glass-panel mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div class="flex flex-wrap gap-2">
          <button class="glass-button text-xs py-1 px-3 btn-cat-filter ${selectedCategory === 'all' ? 'primary' : ''}" data-cat="all">All Meals</button>
          <button class="glass-button text-xs py-1 px-3 btn-cat-filter ${selectedCategory === 'breakfast' ? 'primary' : ''}" data-cat="breakfast">Breakfast</button>
          <button class="glass-button text-xs py-1 px-3 btn-cat-filter ${selectedCategory === 'lunch' ? 'primary' : ''}" data-cat="lunch">Lunch</button>
          <button class="glass-button text-xs py-1 px-3 btn-cat-filter ${selectedCategory === 'dinner' ? 'primary' : ''}" data-cat="dinner">Dinner</button>
        </div>

        <div class="flex flex-wrap gap-2">
          <button class="glass-button text-xs py-1 px-3 btn-tag-filter ${selectedTag === 'all' ? 'primary' : ''}" data-tag="all">All Diets</button>
          <button class="glass-button text-xs py-1 px-3 btn-tag-filter ${selectedTag === 'halal' ? 'primary' : ''}" data-tag="halal">Halal</button>
          <button class="glass-button text-xs py-1 px-3 btn-tag-filter ${selectedTag === 'vegetarian' ? 'primary' : ''}" data-tag="vegetarian">Vegetarian</button>
          <button class="glass-button text-xs py-1 px-3 btn-tag-filter ${selectedTag === 'vegan' ? 'primary' : ''}" data-tag="vegan">Vegan</button>
        </div>
      </div>

      <!-- Recipes Grid -->
      <div class="grid md:grid-cols-2 gap-6">
        ${filteredRecipes.map((recipe) => `
          <div class="glass-panel flex flex-col justify-between">
            <div>
              <div class="relative w-full h-44 rounded-lg overflow-hidden mb-4">
                <img src="${recipe.image}" alt="${recipe.name}" style="width:100%; height:100%; object-fit:cover;" />
                <span class="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded text-xs text-glow">
                  ${recipe.calories} kcal
                </span>
              </div>

              <h3 class="text-lg mb-1">${recipe.name}</h3>
              <p class="text-xs text-muted mb-3">Prep: ${recipe.prepTime} • Cook: ${recipe.cookTime} • ${recipe.difficulty}</p>

              <div class="flex gap-4 text-xs text-muted mb-4 bg-slate-900/40 p-2 rounded">
                <span>P: ${recipe.protein}g</span>
                <span>C: ${recipe.carbs}g</span>
                <span>F: ${recipe.fat}g</span>
                <span>Fiber: ${recipe.fiber}g</span>
              </div>
            </div>

            <button class="glass-button primary w-full justify-center text-sm py-2 btn-view-recipe" data-id="${recipe.id}">
              ${getIcon('ChefHat', 16)} View Recipe Details
            </button>
          </div>
        `).join('')}
      </div>

      ${selectedRecipe ? `
        <div id="modal-recipe" class="modal-backdrop" style="display: flex;">
          <div class="glass-panel modal-content animate-fade-in" style="max-width: 600px;">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-gradient">${selectedRecipe.name}</h3>
              <button id="btn-close-recipe-modal" class="glass-button p-1" style="padding: 0.2rem 0.5rem;">
                ${getIcon('X', 18)}
              </button>
            </div>

            <div class="mb-4">
              <img src="${selectedRecipe.image}" alt="${selectedRecipe.name}" style="width:100%; height:200px; object-fit:cover; border-radius: 8px;" />
            </div>

            <div class="flex justify-between text-xs text-muted mb-4 bg-slate-900/40 p-3 rounded">
              <span>Calories: <strong>${selectedRecipe.calories} kcal</strong></span>
              <span>Protein: <strong>${selectedRecipe.protein}g</strong></span>
              <span>Carbs: <strong>${selectedRecipe.carbs}g</strong></span>
              <span>Fat: <strong>${selectedRecipe.fat}g</strong></span>
            </div>

            <div class="mb-4">
              <h4 class="text-sm font-bold mb-2">Ingredients</h4>
              <ul class="text-xs text-muted list-disc pl-4 flex flex-col gap-1">
                ${selectedRecipe.ingredients.map((ing) => `<li>${ing}</li>`).join('')}
              </ul>
            </div>

            <div class="mb-6">
              <h4 class="text-sm font-bold mb-2">Instructions</h4>
              <ol class="text-xs text-muted list-decimal pl-4 flex flex-col gap-2">
                ${selectedRecipe.instructions.map((inst) => `<li>${inst}</li>`).join('')}
              </ol>
            </div>

            <button id="btn-done-recipe" class="glass-button primary w-full">Close</button>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Attach event listeners
  container.querySelectorAll('.btn-cat-filter').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      selectedCategory = e.currentTarget.getAttribute('data-cat');
      renderRecipes(container);
    });
  });

  container.querySelectorAll('.btn-tag-filter').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      selectedTag = e.currentTarget.getAttribute('data-tag');
      renderRecipes(container);
    });
  });

  container.querySelectorAll('.btn-view-recipe').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      selectedRecipe = MOCK_RECIPES.find((r) => r.id === id);
      renderRecipes(container);
    });
  });

  const closeBtn = container.querySelector('#btn-close-recipe-modal');
  const doneBtn = container.querySelector('#btn-done-recipe');

  const closeModal = () => {
    selectedRecipe = null;
    renderRecipes(container);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);
}
