/**
 * state.js
 * ──────────────────────────────────────────────
 * Global state management for Nutri+ using Vanilla JavaScript.
 * Persists to localStorage under 'nutri-plus-state'.
 */

import { calculateFullProfile, calculateWaterIntake } from './nutritionCalculator.js';
import { generateMealPlan } from './mealPlanner.js';

const STORAGE_KEY = 'nutri-plus-state';
const THEME_KEY = 'nutri-plus-theme';

const initialState = {
  isOnboarded: false,
  theme: 'dark',
  profile: {
    age: null,
    gender: null,
    height: null,
    weight: null,
    activityLevel: null,
    goal: null,
  },
  preferences: [],
  nutrition: {
    bmr: 0,
    tdee: 0,
    targetCalories: 0,
    macros: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    bmi: { bmi: 0, category: '' },
    waterTarget: 0,
  },
  mealPlan: null,
  foodLog: {},
  streak: { current: 0, best: 0, lastDate: null },
  attendingEvents: [],
};

let state = { ...initialState };
const listeners = new Set();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...initialState, ...parsed };
    }
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      state.theme = savedTheme;
    }
    applyTheme(state.theme);
  } catch (err) {
    console.warn('Nutri+: Could not load saved state', err);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(THEME_KEY, state.theme);
  } catch (err) {
    console.warn('Nutri+: Could not save state', err);
  }
  notify();
}

function applyTheme(themeMode) {
  document.documentElement.setAttribute('data-theme', themeMode);
}

function notify() {
  listeners.forEach((listener) => listener(state));
}

loadState();

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getState() {
  return state;
}

export function getTheme() {
  return state.theme || 'dark';
}

export function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(state.theme);
  saveState();
}

export function setTheme(mode) {
  state.theme = mode;
  applyTheme(state.theme);
  saveState();
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getTodayLog() {
  return state.foodLog[todayKey()] || { foods: [], waterIntake: 0 };
}

export function getTodayConsumed() {
  const log = getTodayLog();
  return log.foods.reduce(
    (acc, food) => {
      const mult = food.portionMultiplier || 1;
      return {
        calories: acc.calories + Math.round(food.calories * mult),
        protein: acc.protein + Math.round(food.protein * mult),
        carbs: acc.carbs + Math.round(food.carbs * mult),
        fat: acc.fat + Math.round(food.fat * mult),
        fiber: acc.fiber + Math.round(food.fiber * mult),
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
}

export function completeOnboarding(profile, preferences) {
  state.profile = { ...state.profile, ...profile };
  state.preferences = preferences;

  const result = calculateFullProfile(state.profile);
  const waterTarget = calculateWaterIntake(state.profile.weight, state.profile.activityLevel);
  state.nutrition = { ...result, waterTarget };

  state.mealPlan = generateMealPlan(result.macros, preferences);
  state.isOnboarded = true;

  updateStreakInternal();
  saveState();
}

export function recalculate(profile, preferences) {
  state.profile = { ...state.profile, ...profile };
  state.preferences = preferences;

  const result = calculateFullProfile(state.profile);
  const waterTarget = calculateWaterIntake(state.profile.weight, state.profile.activityLevel);
  state.nutrition = { ...result, waterTarget };

  state.mealPlan = generateMealPlan(result.macros, preferences);
  saveState();
}

export function regeneratePlan() {
  state.mealPlan = generateMealPlan(state.nutrition.macros, state.preferences);
  saveState();
}

export function swapFood(mealType, oldFoodId, newFood) {
  if (!state.mealPlan?.meals?.[mealType]) return;

  const updatedFoods = state.mealPlan.meals[mealType].foods.map((f) =>
    f.id === oldFoodId ? { ...newFood, portionMultiplier: 1 } : f
  );

  const totalNutrition = updatedFoods.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat,
      fiber: acc.fiber + food.fiber,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  const updatedMeals = {
    ...state.mealPlan.meals,
    [mealType]: { ...state.mealPlan.meals[mealType], foods: updatedFoods, totalNutrition },
  };

  const dailyTotal = Object.values(updatedMeals).reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.totalNutrition.calories,
      protein: acc.protein + meal.totalNutrition.protein,
      carbs: acc.carbs + meal.totalNutrition.carbs,
      fat: acc.fat + meal.totalNutrition.fat,
      fiber: acc.fiber + meal.totalNutrition.fiber,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  state.mealPlan = { meals: updatedMeals, dailyTotal };
  saveState();
}

export function logFood(food, portionMultiplier = 1) {
  const date = todayKey();
  const existing = state.foodLog[date] || { foods: [], waterIntake: 0 };
  state.foodLog = {
    ...state.foodLog,
    [date]: {
      ...existing,
      foods: [...existing.foods, { ...food, portionMultiplier, loggedAt: new Date().toISOString() }],
    },
  };
  saveState();
}

export function removeLoggedFood(index) {
  const date = todayKey();
  const existing = state.foodLog[date];
  if (!existing) return;
  state.foodLog = {
    ...state.foodLog,
    [date]: {
      ...existing,
      foods: existing.foods.filter((_, i) => i !== index),
    },
  };
  saveState();
}

export function logWater(ml) {
  const date = todayKey();
  const existing = state.foodLog[date] || { foods: [], waterIntake: 0 };
  state.foodLog = {
    ...state.foodLog,
    [date]: {
      ...existing,
      waterIntake: existing.waterIntake + ml,
    },
  };
  saveState();
}

export function toggleAttendEvent(eventId) {
  const attending = state.attendingEvents || [];
  if (attending.includes(eventId)) {
    state.attendingEvents = attending.filter((id) => id !== eventId);
  } else {
    state.attendingEvents = [...attending, eventId];
  }
  saveState();
}

function updateStreakInternal() {
  const today = todayKey();
  const { lastDate, current, best } = state.streak;

  if (lastDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  let newCurrent;
  if (lastDate === yesterdayKey) {
    newCurrent = current + 1;
  } else {
    newCurrent = 1;
  }

  state.streak = {
    current: newCurrent,
    best: Math.max(best, newCurrent),
    lastDate: today,
  };
}

export function updateStreak() {
  updateStreakInternal();
  saveState();
}

export function resetAll() {
  localStorage.removeItem(STORAGE_KEY);
  state = JSON.parse(JSON.stringify(initialState));
  applyTheme(state.theme);
  notify();
}
