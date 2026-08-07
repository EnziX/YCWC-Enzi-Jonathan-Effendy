/**
 * UserContext.jsx
 * ──────────────────────────────────────────────
 * Global state management for Nutri+ using React Context + useReducer.
 * Handles user profile, nutrition targets, food log, meal plans,
 * streak tracking, and water intake.
 * All data is persisted to localStorage.
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { calculateFullProfile, calculateWaterIntake } from '../utils/nutritionCalculator';
import { generateMealPlan } from '../utils/mealPlanner';

/* ── Storage key ──────────────────────────────── */
const STORAGE_KEY = 'nutri-plus-state';

/* ── Initial state ────────────────────────────── */
const initialState = {
  /** Whether onboarding has been completed */
  isOnboarded: false,

  /** User profile data */
  profile: {
    age: null,
    gender: null,      // 'male' | 'female'
    height: null,      // cm
    weight: null,      // kg
    activityLevel: null, // key from ACTIVITY_LEVELS
    goal: null,        // 'lose' | 'maintain' | 'gain'
  },

  /** Dietary preferences/restrictions */
  preferences: [],     // e.g. ['vegetarian', 'halal', 'lactose-free']

  /** Calculated nutrition data */
  nutrition: {
    bmr: 0,
    tdee: 0,
    targetCalories: 0,
    macros: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    bmi: { bmi: 0, category: '' },
    waterTarget: 0,
  },

  /** Today's generated meal plan */
  mealPlan: null,

  /**
   * Daily food log.
   * Structure: { [dateString]: { foods: [...], waterIntake: number } }
   */
  foodLog: {},

  /**
   * Streak tracking.
   * { current: number, best: number, lastDate: string|null }
   */
  streak: { current: 0, best: 0, lastDate: null },
};

/* ── Action types ─────────────────────────────── */
const ACTIONS = {
  SET_PROFILE:        'SET_PROFILE',
  SET_PREFERENCES:    'SET_PREFERENCES',
  SET_NUTRITION:      'SET_NUTRITION',
  SET_MEAL_PLAN:      'SET_MEAL_PLAN',
  REGENERATE_PLAN:    'REGENERATE_PLAN',
  SWAP_FOOD:          'SWAP_FOOD',
  LOG_FOOD:           'LOG_FOOD',
  REMOVE_LOGGED_FOOD: 'REMOVE_LOGGED_FOOD',
  LOG_WATER:          'LOG_WATER',
  UPDATE_STREAK:      'UPDATE_STREAK',
  COMPLETE_ONBOARDING:'COMPLETE_ONBOARDING',
  RESET_ALL:          'RESET_ALL',
  LOAD_STATE:         'LOAD_STATE',
};

/* ── Helper: today's date key ─────────────────── */
function todayKey() {
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

/* ── Reducer ──────────────────────────────────── */
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_STATE:
      return { ...initialState, ...action.payload };

    case ACTIONS.SET_PROFILE:
      return { ...state, profile: { ...state.profile, ...action.payload } };

    case ACTIONS.SET_PREFERENCES:
      return { ...state, preferences: action.payload };

    case ACTIONS.SET_NUTRITION:
      return { ...state, nutrition: { ...state.nutrition, ...action.payload } };

    case ACTIONS.SET_MEAL_PLAN:
      return { ...state, mealPlan: action.payload };

    case ACTIONS.SWAP_FOOD: {
      // Replace a food in a specific meal slot
      const { mealType, oldFoodId, newFood } = action.payload;
      if (!state.mealPlan?.meals?.[mealType]) return state;

      const updatedFoods = state.mealPlan.meals[mealType].foods.map((f) =>
        f.id === oldFoodId ? { ...newFood, portionMultiplier: 1 } : f
      );

      // Recalculate meal nutrition
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

      // Recalculate daily total
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

      return { ...state, mealPlan: { meals: updatedMeals, dailyTotal } };
    }

    case ACTIONS.LOG_FOOD: {
      const date = todayKey();
      const existing = state.foodLog[date] || { foods: [], waterIntake: 0 };
      return {
        ...state,
        foodLog: {
          ...state.foodLog,
          [date]: {
            ...existing,
            foods: [...existing.foods, { ...action.payload, loggedAt: new Date().toISOString() }],
          },
        },
      };
    }

    case ACTIONS.REMOVE_LOGGED_FOOD: {
      const date = todayKey();
      const existing = state.foodLog[date];
      if (!existing) return state;
      return {
        ...state,
        foodLog: {
          ...state.foodLog,
          [date]: {
            ...existing,
            foods: existing.foods.filter((_, i) => i !== action.payload),
          },
        },
      };
    }

    case ACTIONS.LOG_WATER: {
      const date = todayKey();
      const existing = state.foodLog[date] || { foods: [], waterIntake: 0 };
      return {
        ...state,
        foodLog: {
          ...state.foodLog,
          [date]: {
            ...existing,
            waterIntake: existing.waterIntake + action.payload,
          },
        },
      };
    }

    case ACTIONS.UPDATE_STREAK: {
      const today = todayKey();
      const { lastDate, current, best } = state.streak;

      if (lastDate === today) return state; // Already updated today

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().slice(0, 10);

      let newCurrent;
      if (lastDate === yesterdayKey) {
        newCurrent = current + 1; // Consecutive day
      } else {
        newCurrent = 1; // Streak broken or first day
      }

      return {
        ...state,
        streak: {
          current: newCurrent,
          best: Math.max(best, newCurrent),
          lastDate: today,
        },
      };
    }

    case ACTIONS.COMPLETE_ONBOARDING:
      return { ...state, isOnboarded: true };

    case ACTIONS.RESET_ALL:
      return { ...initialState };

    default:
      return state;
  }
}

/* ── Context ──────────────────────────────────── */
const UserContext = createContext(null);

/**
 * Provider component — wraps the app and provides global state.
 */
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: ACTIONS.LOAD_STATE, payload: parsed });
      }
    } catch (err) {
      console.warn('Nutri+: Could not load saved state', err);
    }
  }, []);

  // Persist state on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Nutri+: Could not save state', err);
    }
  }, [state]);

  /* ── Action dispatchers ──────────────────── */

  /**
   * Complete the onboarding process.
   * Calculates nutrition targets and generates first meal plan.
   */
  const completeOnboarding = (profile, preferences) => {
    dispatch({ type: ACTIONS.SET_PROFILE, payload: profile });
    dispatch({ type: ACTIONS.SET_PREFERENCES, payload: preferences });

    // Calculate nutrition
    const result = calculateFullProfile(profile);
    const waterTarget = calculateWaterIntake(profile.weight, profile.activityLevel);
    dispatch({
      type: ACTIONS.SET_NUTRITION,
      payload: { ...result, waterTarget },
    });

    // Generate meal plan
    const plan = generateMealPlan(result.macros, preferences);
    dispatch({ type: ACTIONS.SET_MEAL_PLAN, payload: plan });

    // Mark onboarded
    dispatch({ type: ACTIONS.COMPLETE_ONBOARDING });

    // Start streak
    dispatch({ type: ACTIONS.UPDATE_STREAK });
  };

  /**
   * Recalculate everything (used when profile is edited).
   */
  const recalculate = (profile, preferences) => {
    dispatch({ type: ACTIONS.SET_PROFILE, payload: profile });
    dispatch({ type: ACTIONS.SET_PREFERENCES, payload: preferences });

    const result = calculateFullProfile(profile);
    const waterTarget = calculateWaterIntake(profile.weight, profile.activityLevel);
    dispatch({ type: ACTIONS.SET_NUTRITION, payload: { ...result, waterTarget } });

    const plan = generateMealPlan(result.macros, preferences);
    dispatch({ type: ACTIONS.SET_MEAL_PLAN, payload: plan });
  };

  /**
   * Regenerate the meal plan with the same targets.
   */
  const regeneratePlan = () => {
    const plan = generateMealPlan(state.nutrition.macros, state.preferences);
    dispatch({ type: ACTIONS.SET_MEAL_PLAN, payload: plan });
  };

  /**
   * Swap a food item in a meal slot.
   */
  const swapFood = (mealType, oldFoodId, newFood) => {
    dispatch({
      type: ACTIONS.SWAP_FOOD,
      payload: { mealType, oldFoodId, newFood },
    });
  };

  /**
   * Log a consumed food.
   */
  const logFood = (food, portionMultiplier = 1) => {
    dispatch({
      type: ACTIONS.LOG_FOOD,
      payload: { ...food, portionMultiplier },
    });
  };

  /**
   * Remove a logged food by index.
   */
  const removeLoggedFood = (index) => {
    dispatch({ type: ACTIONS.REMOVE_LOGGED_FOOD, payload: index });
  };

  /**
   * Log water intake in ml.
   */
  const logWater = (ml) => {
    dispatch({ type: ACTIONS.LOG_WATER, payload: ml });
  };

  /**
   * Update streak (call daily when user logs food or meets targets).
   */
  const updateStreak = () => {
    dispatch({ type: ACTIONS.UPDATE_STREAK });
  };

  /**
   * Reset all data.
   */
  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: ACTIONS.RESET_ALL });
  };

  /* ── Computed values ─────────────────────── */

  /** Get today's food log */
  const todayLog = state.foodLog[todayKey()] || { foods: [], waterIntake: 0 };

  /** Calculate today's consumed totals */
  const todayConsumed = todayLog.foods.reduce(
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

  const value = {
    ...state,
    todayLog,
    todayConsumed,
    completeOnboarding,
    recalculate,
    regeneratePlan,
    swapFood,
    logFood,
    removeLoggedFood,
    logWater,
    updateStreak,
    resetAll,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

/**
 * Custom hook to access global state.
 * Must be used inside <UserProvider>.
 */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
