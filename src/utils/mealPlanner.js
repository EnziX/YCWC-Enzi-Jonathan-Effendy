/**
 * mealPlanner.js
 * ──────────────────────────────────────────────
 * Meal plan generation engine for Nutri+.
 * Distributes daily macro targets across 4 meals
 * and picks foods that respect dietary preferences.
 */

import foodDatabase, { filterFoodsByTags, getFoodsByMeal } from '../data/foodDatabase';

/**
 * Meal-time calorie distribution ratios.
 */
const MEAL_DISTRIBUTION = {
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.30,
  snack: 0.10,
};

/**
 * Convert user preference strings to tag filters.
 * @param {string[]} preferences – e.g. ['vegetarian', 'lactose-free']
 * @returns {{ required: string[], excluded: string[] }}
 */
function parsePreferences(preferences = []) {
  const required = [];
  const excluded = [];

  preferences.forEach((pref) => {
    switch (pref) {
      case 'vegetarian':
        required.push('vegetarian');
        break;
      case 'vegan':
        required.push('vegan');
        break;
      case 'halal':
        required.push('halal');
        break;
      case 'gluten-free':
        required.push('gluten-free');
        excluded.push('contains-gluten');
        break;
      case 'dairy-free':
      case 'lactose-free':
        required.push('dairy-free');
        excluded.push('contains-lactose');
        break;
      case 'nut-free':
        excluded.push('contains-nuts');
        break;
      case 'soy-free':
        excluded.push('contains-soy');
        break;
      case 'egg-free':
        excluded.push('contains-eggs');
        break;
      default:
        break;
    }
  });

  return { required, excluded };
}

/**
 * Pick a set of foods for a meal slot that roughly matches
 * the calorie target for that slot.
 *
 * Strategy: greedy pick — sort available foods by how close
 * they are to the target, pick best fit, repeat until close.
 *
 * @param {'breakfast'|'lunch'|'dinner'|'snack'} mealType
 * @param {number} calorieTarget – for this meal slot
 * @param {string[]} preferences – dietary preferences
 * @param {string[]} usedIds     – IDs already used in this plan (avoid repeats)
 * @returns {{ foods: object[], totalNutrition: object }}
 */
function pickFoodsForMeal(mealType, calorieTarget, preferences, usedIds = []) {
  const { required, excluded } = parsePreferences(preferences);

  // Get foods suitable for this meal type AND matching dietary prefs
  let available = getFoodsByMeal(mealType).filter((food) => {
    if (usedIds.includes(food.id)) return false;
    const hasRequired = required.every((tag) => food.tags.includes(tag));
    const hasExcluded = excluded.some((tag) => food.tags.includes(tag));
    return hasRequired && !hasExcluded;
  });

  const picked = [];
  let remaining = calorieTarget;

  // Try to pick 1-3 items that sum close to the target
  const maxItems = mealType === 'snack' ? 2 : 3;

  for (let i = 0; i < maxItems && remaining > 30; i++) {
    if (available.length === 0) break;

    // Sort by how close each food's calories are to the remaining target
    available.sort(
      (a, b) => Math.abs(a.calories - remaining) - Math.abs(b.calories - remaining)
    );

    // Pick the best fit, but prefer foods that don't overshoot too much
    const candidate = available.find((f) => f.calories <= remaining * 1.15)
      || available[0];

    picked.push({ ...candidate, portionMultiplier: 1 });
    remaining -= candidate.calories;
    available = available.filter((f) => f.id !== candidate.id);
  }

  // Calculate total nutrition for picked foods
  const totalNutrition = picked.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat,
      fiber: acc.fiber + food.fiber,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  return { foods: picked, totalNutrition };
}

/**
 * Generate a full daily meal plan.
 *
 * @param {{ calories: number, protein: number, carbs: number, fat: number, fiber: number }} macroTargets
 * @param {string[]} preferences – e.g. ['vegetarian', 'halal']
 * @returns {{ meals: object, dailyTotal: object }}
 */
export function generateMealPlan(macroTargets, preferences = []) {
  const usedIds = [];
  const meals = {};

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  mealTypes.forEach((type) => {
    const calorieTarget = Math.round(macroTargets.calories * MEAL_DISTRIBUTION[type]);
    const result = pickFoodsForMeal(type, calorieTarget, preferences, usedIds);

    // Track used IDs to avoid repeats across meals
    result.foods.forEach((f) => usedIds.push(f.id));

    meals[type] = {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      time: getMealTime(type),
      calorieTarget,
      ...result,
    };
  });

  // Sum up actual daily totals
  const dailyTotal = Object.values(meals).reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.totalNutrition.calories,
      protein: acc.protein + meal.totalNutrition.protein,
      carbs: acc.carbs + meal.totalNutrition.carbs,
      fat: acc.fat + meal.totalNutrition.fat,
      fiber: acc.fiber + meal.totalNutrition.fiber,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  return { meals, dailyTotal };
}

/**
 * Get a suggested time string for a meal slot.
 */
function getMealTime(type) {
  const times = {
    breakfast: '07:00 AM',
    lunch: '12:00 PM',
    dinner: '07:00 PM',
    snack: '03:30 PM',
  };
  return times[type] || '12:00 PM';
}

/**
 * Suggest an alternative food for a specific meal slot.
 * Returns a different food from the same meal type that
 * hasn't been used in the current plan.
 *
 * @param {'breakfast'|'lunch'|'dinner'|'snack'} mealType
 * @param {string} currentFoodId – the food being replaced
 * @param {string[]} usedIds      – all food IDs currently in the plan
 * @param {string[]} preferences  – dietary preferences
 * @returns {object|null} replacement food or null if none available
 */
export function suggestAlternative(mealType, currentFoodId, usedIds, preferences = []) {
  const { required, excluded } = parsePreferences(preferences);

  const alternatives = getFoodsByMeal(mealType).filter((food) => {
    if (food.id === currentFoodId) return false;
    if (usedIds.includes(food.id)) return false;
    const hasRequired = required.every((tag) => food.tags.includes(tag));
    const hasExcluded = excluded.some((tag) => food.tags.includes(tag));
    return hasRequired && !hasExcluded;
  });

  if (alternatives.length === 0) return null;

  // Find the current food to match calories roughly
  const current = foodDatabase.find((f) => f.id === currentFoodId);
  if (!current) return alternatives[0];

  // Sort by calorie similarity to the food being replaced
  alternatives.sort(
    (a, b) => Math.abs(a.calories - current.calories) - Math.abs(b.calories - current.calories)
  );

  // Pick a random one from top 3 closest matches for variety
  const topN = alternatives.slice(0, Math.min(3, alternatives.length));
  return topN[Math.floor(Math.random() * topN.length)];
}

/**
 * Calculate total nutrition for an array of food items.
 *
 * @param {object[]} foods – array of food objects
 * @returns {{ calories: number, protein: number, carbs: number, fat: number, fiber: number }}
 */
export function calculateMealNutrition(foods) {
  return foods.reduce(
    (acc, food) => ({
      calories: acc.calories + Math.round(food.calories * (food.portionMultiplier || 1)),
      protein: acc.protein + Math.round(food.protein * (food.portionMultiplier || 1)),
      carbs: acc.carbs + Math.round(food.carbs * (food.portionMultiplier || 1)),
      fat: acc.fat + Math.round(food.fat * (food.portionMultiplier || 1)),
      fiber: acc.fiber + Math.round(food.fiber * (food.portionMultiplier || 1)),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
}

/**
 * Get the meal distribution percentages.
 */
export function getMealDistribution() {
  return { ...MEAL_DISTRIBUTION };
}
