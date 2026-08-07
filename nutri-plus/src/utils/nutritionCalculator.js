/**
 * nutritionCalculator.js
 * ──────────────────────────────────────────────
 * Pure-function calculation engine for Nutri+.
 * All formulas are decoupled from UI so they can be
 * reused or swapped for AI-driven calculations later.
 */

/* ── Activity level multipliers (Harris-Benedict / Mifflin) ── */
export const ACTIVITY_LEVELS = {
  sedentary:    { label: 'Sedentary',        desc: 'Little or no exercise, desk job',  factor: 1.2   },
  light:        { label: 'Lightly Active',   desc: 'Light exercise 1-3 days/week',     factor: 1.375 },
  moderate:     { label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week',  factor: 1.55  },
  active:       { label: 'Very Active',      desc: 'Hard exercise 6-7 days/week',      factor: 1.725 },
  extra_active: { label: 'Extra Active',     desc: 'Athlete / very hard daily training', factor: 1.9 },
};

/* ── Goal definitions ─────────────────────────── */
export const GOALS = {
  lose:     { label: 'Lose Weight',    calorieAdjust: -500, desc: 'Caloric deficit for fat loss' },
  maintain: { label: 'Maintain Weight', calorieAdjust: 0,   desc: 'Keep current weight stable'  },
  gain:     { label: 'Build Muscle',   calorieAdjust: 300,  desc: 'Caloric surplus for muscle growth' },
};

/**
 * Macro split percentages by goal.
 * Values are [protein%, carbs%, fat%].
 * Fiber targets are absolute grams.
 */
const MACRO_SPLITS = {
  lose:     { protein: 0.35, carbs: 0.35, fat: 0.30, fiberTarget: 30 },
  maintain: { protein: 0.25, carbs: 0.50, fat: 0.25, fiberTarget: 28 },
  gain:     { protein: 0.30, carbs: 0.45, fat: 0.25, fiberTarget: 32 },
};

/**
 * Calculate Basal Metabolic Rate using the Mifflin-St Jeor equation.
 *
 * Male:   BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 5 + 5
 * Female: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161
 *
 * @param {number} weight  – body weight in kg
 * @param {number} height  – height in cm
 * @param {number} age     – age in years
 * @param {'male'|'female'} gender
 * @returns {number} BMR in kcal/day (rounded)
 */
export function calculateBMR(weight, height, age, gender) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(gender === 'male' ? base + 5 : base - 161);
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE).
 * TDEE = BMR × activity factor
 *
 * @param {number} bmr           – result from calculateBMR
 * @param {string} activityLevel – key from ACTIVITY_LEVELS
 * @returns {number} TDEE in kcal/day (rounded)
 */
export function calculateTDEE(bmr, activityLevel) {
  const factor = ACTIVITY_LEVELS[activityLevel]?.factor ?? 1.2;
  return Math.round(bmr * factor);
}

/**
 * Calculate target daily calories after goal adjustment.
 *
 * @param {number} tdee – from calculateTDEE
 * @param {string} goal – key from GOALS ('lose', 'maintain', 'gain')
 * @returns {number} target calories (floored at 1200 for safety)
 */
export function calculateTargetCalories(tdee, goal) {
  const adjust = GOALS[goal]?.calorieAdjust ?? 0;
  return Math.max(1200, Math.round(tdee + adjust));
}

/**
 * Calculate macro targets in grams from target calories.
 *
 * Conversion:
 *   1g protein = 4 kcal
 *   1g carbs   = 4 kcal
 *   1g fat     = 9 kcal
 *
 * @param {number} targetCalories – from calculateTargetCalories
 * @param {string} goal           – key from GOALS
 * @returns {{ protein: number, carbs: number, fat: number, fiber: number, calories: number }}
 */
export function calculateMacros(targetCalories, goal) {
  const split = MACRO_SPLITS[goal] || MACRO_SPLITS.maintain;
  return {
    calories: targetCalories,
    protein: Math.round((targetCalories * split.protein) / 4),
    carbs:   Math.round((targetCalories * split.carbs) / 4),
    fat:     Math.round((targetCalories * split.fat) / 9),
    fiber:   split.fiberTarget,
  };
}

/**
 * Calculate BMI and return value + category.
 *
 * @param {number} weight – kg
 * @param {number} height – cm
 * @returns {{ bmi: number, category: string }}
 */
export function calculateBMI(weight, height) {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const rounded = Math.round(bmi * 10) / 10;

  let category;
  if      (rounded < 18.5) category = 'Underweight';
  else if (rounded < 25)   category = 'Normal';
  else if (rounded < 30)   category = 'Overweight';
  else                      category = 'Obese';

  return { bmi: rounded, category };
}

/**
 * Run the full pipeline: profile → BMR → TDEE → target cals → macros.
 *
 * @param {{ weight: number, height: number, age: number, gender: string, activityLevel: string, goal: string }} profile
 * @returns {{ bmr: number, tdee: number, targetCalories: number, macros: object, bmi: object }}
 */
export function calculateFullProfile(profile) {
  const { weight, height, age, gender, activityLevel, goal } = profile;
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const targetCalories = calculateTargetCalories(tdee, goal);
  const macros = calculateMacros(targetCalories, goal);
  const bmi = calculateBMI(weight, height);

  return { bmr, tdee, targetCalories, macros, bmi };
}

/**
 * Calculate recommended daily water intake in ml.
 * General rule: 30-35 ml per kg of body weight.
 *
 * @param {number} weight – kg
 * @param {string} activityLevel – key from ACTIVITY_LEVELS
 * @returns {number} ml/day (rounded to nearest 100)
 */
export function calculateWaterIntake(weight, activityLevel) {
  const base = weight * 33; // 33 ml/kg
  const activeBonus = ['active', 'extra_active'].includes(activityLevel) ? 500 : 0;
  return Math.round((base + activeBonus) / 100) * 100;
}
