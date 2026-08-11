/**
 * mealPlanner.js
 * ──────────────────────────────────────────────
 * Meal plan generation engine for Nutri+.
 */

import { foodDatabase, getFoodsByMeal } from './data.js';

export const ALL_DIETARY_PREFERENCES = [
  { id: 'vegetarian', label: 'Vegetarian', desc: 'No meat, poultry, or seafood' },
  { id: 'vegan', label: 'Vegan', desc: 'Strictly plant-based' },
  { id: 'halal', label: 'Halal', desc: 'Halal compliant foods' },
  { id: 'gluten-free', label: 'Gluten-Free', desc: 'No wheat or gluten' },
  { id: 'lactose-free', label: 'Lactose-Free', desc: 'No dairy or lactose' },
  { id: 'nut-free', label: 'Nut-Free', desc: 'No peanuts or tree nuts' },
  { id: 'soy-free', label: 'Soy-Free', desc: 'No soybeans, tofu, or tempeh' },
  { id: 'egg-free', label: 'Egg-Free', desc: 'No eggs or egg products' },
];

const MEAL_DISTRIBUTION = {
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.30,
  snack: 0.10,
};

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

function pickFoodsForMeal(mealType, calorieTarget, preferences, usedIds = []) {
  const { required, excluded } = parsePreferences(preferences);

  let available = getFoodsByMeal(mealType).filter((food) => {
    if (usedIds.includes(food.id)) return false;
    const hasRequired = required.every((tag) => food.tags.includes(tag));
    const hasExcluded = excluded.some((tag) => food.tags.includes(tag));
    return hasRequired && !hasExcluded;
  });

  const picked = [];
  let remaining = calorieTarget;

  const maxItems = mealType === 'snack' ? 2 : 3;

  for (let i = 0; i < maxItems && remaining > 30; i++) {
    if (available.length === 0) break;

    available.sort(
      (a, b) => Math.abs(a.calories - remaining) - Math.abs(b.calories - remaining)
    );

    const candidate = available.find((f) => f.calories <= remaining * 1.15)
      || available[0];

    picked.push({ ...candidate, portionMultiplier: 1 });
    remaining -= candidate.calories;
    available = available.filter((f) => f.id !== candidate.id);
  }

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

export function generateMealPlan(macroTargets, preferences = []) {
  const usedIds = [];
  const meals = {};

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  mealTypes.forEach((type) => {
    const calorieTarget = Math.round(macroTargets.calories * MEAL_DISTRIBUTION[type]);
    const result = pickFoodsForMeal(type, calorieTarget, preferences, usedIds);

    result.foods.forEach((f) => usedIds.push(f.id));

    meals[type] = {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      time: getMealTime(type),
      calorieTarget,
      ...result,
    };
  });

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

function getMealTime(type) {
  const times = {
    breakfast: '07:00 AM',
    lunch: '12:00 PM',
    dinner: '07:00 PM',
    snack: '03:30 PM',
  };
  return times[type] || '12:00 PM';
}

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

  const current = foodDatabase.find((f) => f.id === currentFoodId);
  if (!current) return alternatives[0];

  alternatives.sort(
    (a, b) => Math.abs(a.calories - current.calories) - Math.abs(b.calories - current.calories)
  );

  const topN = alternatives.slice(0, Math.min(3, alternatives.length));
  return topN[Math.floor(Math.random() * topN.length)];
}

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

export function getMealDistribution() {
  return { ...MEAL_DISTRIBUTION };
}
