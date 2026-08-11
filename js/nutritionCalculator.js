/**
 * nutritionCalculator.js
 * ──────────────────────────────────────────────
 * Pure-function calculation engine for Nutri+.
 */

export const ACTIVITY_LEVELS = {
  sedentary:    { label: 'Sedentary',        desc: 'Little or no exercise, desk job',  factor: 1.2   },
  light:        { label: 'Lightly Active',   desc: 'Light exercise 1-3 days/week',     factor: 1.375 },
  moderate:     { label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week',  factor: 1.55  },
  active:       { label: 'Very Active',      desc: 'Hard exercise 6-7 days/week',      factor: 1.725 },
  extra_active: { label: 'Extra Active',     desc: 'Athlete / very hard daily training', factor: 1.9 },
};

export const GOALS = {
  lose:     { label: 'Lose Weight',    calorieAdjust: -500, desc: 'Caloric deficit for fat loss' },
  maintain: { label: 'Maintain Weight', calorieAdjust: 0,   desc: 'Keep current weight stable'  },
  gain:     { label: 'Build Muscle',   calorieAdjust: 300,  desc: 'Caloric surplus for muscle growth' },
};

const MACRO_SPLITS = {
  lose:     { protein: 0.35, carbs: 0.35, fat: 0.30, fiberTarget: 30 },
  maintain: { protein: 0.25, carbs: 0.50, fat: 0.25, fiberTarget: 28 },
  gain:     { protein: 0.30, carbs: 0.45, fat: 0.25, fiberTarget: 32 },
};

export function calculateBMR(weight, height, age, gender) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(gender === 'male' ? base + 5 : base - 161);
}

export function calculateTDEE(bmr, activityLevel) {
  const factor = ACTIVITY_LEVELS[activityLevel]?.factor ?? 1.2;
  return Math.round(bmr * factor);
}

export function calculateTargetCalories(tdee, goal) {
  const adjust = GOALS[goal]?.calorieAdjust ?? 0;
  return Math.max(1200, Math.round(tdee + adjust));
}

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

export function calculateFullProfile(profile) {
  const { weight, height, age, gender, activityLevel, goal } = profile;
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const targetCalories = calculateTargetCalories(tdee, goal);
  const macros = calculateMacros(targetCalories, goal);
  const bmi = calculateBMI(weight, height);

  return { bmr, tdee, targetCalories, macros, bmi };
}

export function calculateWaterIntake(weight, activityLevel) {
  const base = weight * 33; // 33 ml/kg
  const activeBonus = ['active', 'extra_active'].includes(activityLevel) ? 500 : 0;
  return Math.round((base + activeBonus) / 100) * 100;
}
