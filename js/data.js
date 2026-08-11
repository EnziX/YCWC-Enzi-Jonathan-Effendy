/**
 * data.js
 * ──────────────────────────────────────────────
 * Mock data for Nutri+: foodDatabase, recipeData, educationData.
 */

export const foodDatabase = [
  // ─── GRAINS & CEREALS ────────────────────────
  {
    id: 'g01',
    name: 'Brown Rice',
    category: 'grains',
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 1.8,
    fiber: 3.5,
    servingSize: 195,
    servingUnit: '1 cup cooked',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'g02',
    name: 'White Rice',
    category: 'grains',
    calories: 206,
    protein: 4.3,
    carbs: 45,
    fat: 0.4,
    fiber: 0.6,
    servingSize: 186,
    servingUnit: '1 cup cooked',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'g03',
    name: 'Oatmeal',
    category: 'grains',
    calories: 154,
    protein: 5.4,
    carbs: 27,
    fat: 2.6,
    fiber: 4,
    servingSize: 234,
    servingUnit: '1 cup cooked',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast'],
  },
  {
    id: 'g04',
    name: 'Whole Wheat Bread',
    category: 'grains',
    calories: 128,
    protein: 5,
    carbs: 24,
    fat: 1.8,
    fiber: 3.4,
    servingSize: 56,
    servingUnit: '2 slices',
    tags: ['vegetarian', 'halal', 'dairy-free', 'contains-gluten'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'g05',
    name: 'Quinoa',
    category: 'grains',
    calories: 222,
    protein: 8.1,
    carbs: 39,
    fat: 3.6,
    fiber: 5.2,
    servingSize: 185,
    servingUnit: '1 cup cooked',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'g06',
    name: 'Sweet Potato',
    category: 'grains',
    calories: 180,
    protein: 4,
    carbs: 41,
    fat: 0.3,
    fiber: 6.6,
    servingSize: 200,
    servingUnit: '1 medium',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner', 'snack'],
  },
  {
    id: 'g07',
    name: 'Whole Wheat Pasta',
    category: 'grains',
    calories: 174,
    protein: 7.5,
    carbs: 37,
    fat: 0.8,
    fiber: 6.3,
    servingSize: 140,
    servingUnit: '1 cup cooked',
    tags: ['vegetarian', 'vegan', 'halal', 'contains-gluten', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },

  // ─── PROTEINS ─────────────────────────────────
  {
    id: 'p01',
    name: 'Chicken Breast (grilled)',
    category: 'protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    servingSize: 100,
    servingUnit: '100g',
    tags: ['halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'p02',
    name: 'Salmon Fillet (baked)',
    category: 'protein',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    fiber: 0,
    servingSize: 100,
    servingUnit: '100g',
    tags: ['halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'p03',
    name: 'Boiled Eggs',
    category: 'protein',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    fiber: 0,
    servingSize: 100,
    servingUnit: '2 large eggs',
    tags: ['vegetarian', 'halal', 'gluten-free', 'dairy-free', 'contains-eggs'],
    meals: ['breakfast', 'lunch', 'snack'],
  },
  {
    id: 'p04',
    name: 'Tempeh',
    category: 'protein',
    calories: 192,
    protein: 20,
    carbs: 7.6,
    fat: 11,
    fiber: 0,
    servingSize: 100,
    servingUnit: '100g',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free', 'contains-soy'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'p05',
    name: 'Tofu (firm)',
    category: 'protein',
    calories: 144,
    protein: 17,
    carbs: 3,
    fat: 8.7,
    fiber: 2.3,
    servingSize: 126,
    servingUnit: '½ block',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free', 'contains-soy'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'p06',
    name: 'Lean Beef Steak',
    category: 'protein',
    calories: 217,
    protein: 26,
    carbs: 0,
    fat: 12,
    fiber: 0,
    servingSize: 100,
    servingUnit: '100g',
    tags: ['halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'p07',
    name: 'Tuna (canned in water)',
    category: 'protein',
    calories: 116,
    protein: 26,
    carbs: 0,
    fat: 0.8,
    fiber: 0,
    servingSize: 100,
    servingUnit: '1 can drained',
    tags: ['halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'p08',
    name: 'Shrimp (steamed)',
    category: 'protein',
    calories: 99,
    protein: 24,
    carbs: 0.2,
    fat: 0.3,
    fiber: 0,
    servingSize: 100,
    servingUnit: '100g',
    tags: ['halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'p09',
    name: 'Lentils (cooked)',
    category: 'protein',
    calories: 230,
    protein: 18,
    carbs: 40,
    fat: 0.8,
    fiber: 15.6,
    servingSize: 198,
    servingUnit: '1 cup cooked',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'p10',
    name: 'Chickpeas (cooked)',
    category: 'protein',
    calories: 269,
    protein: 14.5,
    carbs: 45,
    fat: 4.2,
    fiber: 12.5,
    servingSize: 164,
    servingUnit: '1 cup cooked',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },

  // ─── VEGETABLES ───────────────────────────────
  {
    id: 'v01',
    name: 'Broccoli (steamed)',
    category: 'vegetables',
    calories: 55,
    protein: 3.7,
    carbs: 11,
    fat: 0.6,
    fiber: 5.1,
    servingSize: 156,
    servingUnit: '1 cup chopped',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'v02',
    name: 'Spinach (fresh)',
    category: 'vegetables',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    servingSize: 100,
    servingUnit: '2 cups raw',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'v03',
    name: 'Mixed Salad Greens',
    category: 'vegetables',
    calories: 18,
    protein: 1.5,
    carbs: 3.2,
    fat: 0.2,
    fiber: 1.8,
    servingSize: 85,
    servingUnit: '2 cups',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'v04',
    name: 'Carrot (raw)',
    category: 'vegetables',
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fat: 0.2,
    fiber: 2.8,
    servingSize: 100,
    servingUnit: '1 medium',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner', 'snack'],
  },
  {
    id: 'v05',
    name: 'Tomato',
    category: 'vegetables',
    calories: 22,
    protein: 1.1,
    carbs: 4.8,
    fat: 0.2,
    fiber: 1.5,
    servingSize: 123,
    servingUnit: '1 medium',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'v06',
    name: 'Bell Pepper (red)',
    category: 'vegetables',
    calories: 31,
    protein: 1,
    carbs: 6,
    fat: 0.3,
    fiber: 2.1,
    servingSize: 119,
    servingUnit: '1 medium',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner', 'snack'],
  },
  {
    id: 'v07',
    name: 'Cucumber',
    category: 'vegetables',
    calories: 16,
    protein: 0.7,
    carbs: 3.6,
    fat: 0.1,
    fiber: 0.5,
    servingSize: 100,
    servingUnit: '½ medium',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner', 'snack'],
  },
  {
    id: 'v08',
    name: 'Avocado',
    category: 'vegetables',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 15,
    fiber: 6.7,
    servingSize: 100,
    servingUnit: '½ medium',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast', 'lunch', 'snack'],
  },
  {
    id: 'v09',
    name: 'Green Beans (steamed)',
    category: 'vegetables',
    calories: 35,
    protein: 2,
    carbs: 7,
    fat: 0.2,
    fiber: 3.4,
    servingSize: 125,
    servingUnit: '1 cup',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },

  // ─── FRUITS ───────────────────────────────────
  {
    id: 'f01',
    name: 'Banana',
    category: 'fruits',
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    fiber: 3.1,
    servingSize: 118,
    servingUnit: '1 medium',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'f02',
    name: 'Apple',
    category: 'fruits',
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    fiber: 4.4,
    servingSize: 182,
    servingUnit: '1 medium',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['snack'],
  },
  {
    id: 'f03',
    name: 'Orange',
    category: 'fruits',
    calories: 62,
    protein: 1.2,
    carbs: 15,
    fat: 0.2,
    fiber: 3.1,
    servingSize: 131,
    servingUnit: '1 medium',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['snack'],
  },
  {
    id: 'f04',
    name: 'Blueberries',
    category: 'fruits',
    calories: 84,
    protein: 1.1,
    carbs: 21,
    fat: 0.5,
    fiber: 3.6,
    servingSize: 148,
    servingUnit: '1 cup',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'f05',
    name: 'Strawberries',
    category: 'fruits',
    calories: 49,
    protein: 1,
    carbs: 12,
    fat: 0.5,
    fiber: 3,
    servingSize: 152,
    servingUnit: '1 cup',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'f06',
    name: 'Mango',
    category: 'fruits',
    calories: 99,
    protein: 1.4,
    carbs: 25,
    fat: 0.6,
    fiber: 2.6,
    servingSize: 165,
    servingUnit: '1 cup sliced',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'f07',
    name: 'Papaya',
    category: 'fruits',
    calories: 62,
    protein: 0.7,
    carbs: 16,
    fat: 0.4,
    fiber: 2.5,
    servingSize: 145,
    servingUnit: '1 cup cubed',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast', 'snack'],
  },

  // ─── DAIRY & ALTERNATIVES ────────────────────
  {
    id: 'd01',
    name: 'Greek Yogurt (plain, low-fat)',
    category: 'dairy',
    calories: 100,
    protein: 17,
    carbs: 6,
    fat: 0.7,
    fiber: 0,
    servingSize: 170,
    servingUnit: '1 container',
    tags: ['vegetarian', 'halal', 'gluten-free', 'contains-lactose'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'd02',
    name: 'Skim Milk',
    category: 'dairy',
    calories: 83,
    protein: 8.3,
    carbs: 12,
    fat: 0.2,
    fiber: 0,
    servingSize: 245,
    servingUnit: '1 cup',
    tags: ['vegetarian', 'halal', 'gluten-free', 'contains-lactose'],
    meals: ['breakfast'],
  },
  {
    id: 'd03',
    name: 'Cheddar Cheese',
    category: 'dairy',
    calories: 113,
    protein: 7,
    carbs: 0.4,
    fat: 9.3,
    fiber: 0,
    servingSize: 28,
    servingUnit: '1 slice (28g)',
    tags: ['vegetarian', 'halal', 'gluten-free', 'contains-lactose'],
    meals: ['breakfast', 'lunch', 'snack'],
  },
  {
    id: 'd04',
    name: 'Almond Milk (unsweetened)',
    category: 'dairy',
    calories: 30,
    protein: 1,
    carbs: 1,
    fat: 2.5,
    fiber: 0.5,
    servingSize: 240,
    servingUnit: '1 cup',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free', 'contains-nuts'],
    meals: ['breakfast'],
  },
  {
    id: 'd05',
    name: 'Cottage Cheese (low-fat)',
    category: 'dairy',
    calories: 163,
    protein: 28,
    carbs: 6.2,
    fat: 2.3,
    fiber: 0,
    servingSize: 226,
    servingUnit: '1 cup',
    tags: ['vegetarian', 'halal', 'gluten-free', 'contains-lactose'],
    meals: ['breakfast', 'snack'],
  },

  // ─── NUTS & SEEDS ─────────────────────────────
  {
    id: 'n01',
    name: 'Almonds',
    category: 'nuts',
    calories: 164,
    protein: 6,
    carbs: 6,
    fat: 14,
    fiber: 3.5,
    servingSize: 28,
    servingUnit: '1 oz (23 almonds)',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free', 'contains-nuts'],
    meals: ['snack'],
  },
  {
    id: 'n02',
    name: 'Peanut Butter',
    category: 'nuts',
    calories: 188,
    protein: 8,
    carbs: 6,
    fat: 16,
    fiber: 1.9,
    servingSize: 32,
    servingUnit: '2 tbsp',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free', 'contains-nuts'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'n03',
    name: 'Chia Seeds',
    category: 'nuts',
    calories: 138,
    protein: 4.7,
    carbs: 12,
    fat: 8.7,
    fiber: 9.8,
    servingSize: 28,
    servingUnit: '2 tbsp',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'n04',
    name: 'Walnuts',
    category: 'nuts',
    calories: 185,
    protein: 4.3,
    carbs: 3.9,
    fat: 18.5,
    fiber: 1.9,
    servingSize: 28,
    servingUnit: '1 oz (7 halves)',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free', 'contains-nuts'],
    meals: ['snack'],
  },
  {
    id: 'n05',
    name: 'Sunflower Seeds',
    category: 'nuts',
    calories: 165,
    protein: 5.5,
    carbs: 6.5,
    fat: 14,
    fiber: 3,
    servingSize: 28,
    servingUnit: '1 oz',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['snack'],
  },

  // ─── SNACKS & EXTRAS ─────────────────────────
  {
    id: 's01',
    name: 'Protein Bar',
    category: 'snacks',
    calories: 200,
    protein: 20,
    carbs: 22,
    fat: 7,
    fiber: 3,
    servingSize: 60,
    servingUnit: '1 bar',
    tags: ['vegetarian', 'halal', 'contains-gluten', 'contains-soy'],
    meals: ['snack'],
  },
  {
    id: 's02',
    name: 'Dark Chocolate (70%)',
    category: 'snacks',
    calories: 170,
    protein: 2.2,
    carbs: 13,
    fat: 12,
    fiber: 3.1,
    servingSize: 28,
    servingUnit: '1 oz (3 squares)',
    tags: ['vegetarian', 'halal', 'gluten-free', 'contains-lactose'],
    meals: ['snack'],
  },
  {
    id: 's03',
    name: 'Rice Cakes',
    category: 'snacks',
    calories: 70,
    protein: 1.4,
    carbs: 15,
    fat: 0.5,
    fiber: 0.4,
    servingSize: 18,
    servingUnit: '2 cakes',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['snack'],
  },
  {
    id: 's04',
    name: 'Hummus',
    category: 'snacks',
    calories: 166,
    protein: 8,
    carbs: 14,
    fat: 9.6,
    fiber: 6,
    servingSize: 100,
    servingUnit: '½ cup',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['snack', 'lunch'],
  },
  {
    id: 's05',
    name: 'Trail Mix',
    category: 'snacks',
    calories: 173,
    protein: 5,
    carbs: 17,
    fat: 11,
    fiber: 2,
    servingSize: 28,
    servingUnit: '1 oz',
    tags: ['vegetarian', 'halal', 'gluten-free', 'dairy-free', 'contains-nuts'],
    meals: ['snack'],
  },

  // ─── COMPLETE MEALS / PREPARED ────────────────
  {
    id: 'm01',
    name: 'Grilled Chicken Salad',
    category: 'meals',
    calories: 350,
    protein: 35,
    carbs: 15,
    fat: 18,
    fiber: 5,
    servingSize: 300,
    servingUnit: '1 bowl',
    tags: ['halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'm02',
    name: 'Veggie Stir-Fry with Tofu',
    category: 'meals',
    calories: 280,
    protein: 18,
    carbs: 25,
    fat: 12,
    fiber: 6,
    servingSize: 300,
    servingUnit: '1 plate',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free', 'contains-soy'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'm03',
    name: 'Overnight Oats with Berries',
    category: 'meals',
    calories: 320,
    protein: 12,
    carbs: 48,
    fat: 8,
    fiber: 7,
    servingSize: 300,
    servingUnit: '1 jar',
    tags: ['vegetarian', 'halal', 'contains-lactose'],
    meals: ['breakfast'],
  },
  {
    id: 'm04',
    name: 'Turkey & Avocado Wrap',
    category: 'meals',
    calories: 380,
    protein: 28,
    carbs: 32,
    fat: 16,
    fiber: 8,
    servingSize: 250,
    servingUnit: '1 wrap',
    tags: ['halal', 'dairy-free', 'contains-gluten'],
    meals: ['lunch'],
  },
  {
    id: 'm05',
    name: 'Salmon Bowl with Quinoa',
    category: 'meals',
    calories: 450,
    protein: 32,
    carbs: 40,
    fat: 16,
    fiber: 6,
    servingSize: 350,
    servingUnit: '1 bowl',
    tags: ['halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'm06',
    name: 'Egg & Spinach Omelette',
    category: 'meals',
    calories: 250,
    protein: 20,
    carbs: 3,
    fat: 18,
    fiber: 1.5,
    servingSize: 200,
    servingUnit: '1 omelette',
    tags: ['vegetarian', 'halal', 'gluten-free', 'dairy-free', 'contains-eggs'],
    meals: ['breakfast'],
  },
  {
    id: 'm07',
    name: 'Chicken & Brown Rice Bowl',
    category: 'meals',
    calories: 420,
    protein: 35,
    carbs: 45,
    fat: 8,
    fiber: 4,
    servingSize: 350,
    servingUnit: '1 bowl',
    tags: ['halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'm08',
    name: 'Lentil Soup',
    category: 'meals',
    calories: 230,
    protein: 18,
    carbs: 40,
    fat: 0.8,
    fiber: 15,
    servingSize: 250,
    servingUnit: '1 bowl',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['lunch', 'dinner'],
  },
  {
    id: 'm09',
    name: 'Smoothie Bowl (Tropical)',
    category: 'meals',
    calories: 290,
    protein: 8,
    carbs: 52,
    fat: 6,
    fiber: 7,
    servingSize: 350,
    servingUnit: '1 bowl',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast'],
  },
  {
    id: 'm10',
    name: 'Beef & Vegetable Stew',
    category: 'meals',
    calories: 380,
    protein: 30,
    carbs: 28,
    fat: 15,
    fiber: 5,
    servingSize: 350,
    servingUnit: '1 bowl',
    tags: ['halal', 'gluten-free', 'dairy-free'],
    meals: ['dinner'],
  },

  // ─── BEVERAGES ────────────────────────────────
  {
    id: 'b01',
    name: 'Green Smoothie',
    category: 'beverages',
    calories: 150,
    protein: 4,
    carbs: 30,
    fat: 2,
    fiber: 5,
    servingSize: 350,
    servingUnit: '1 glass',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'b02',
    name: 'Protein Shake',
    category: 'beverages',
    calories: 200,
    protein: 30,
    carbs: 10,
    fat: 4,
    fiber: 1,
    servingSize: 350,
    servingUnit: '1 shake',
    tags: ['vegetarian', 'halal', 'gluten-free', 'contains-lactose'],
    meals: ['breakfast', 'snack'],
  },
  {
    id: 'b03',
    name: 'Black Coffee',
    category: 'beverages',
    calories: 2,
    protein: 0.3,
    carbs: 0,
    fat: 0,
    fiber: 0,
    servingSize: 240,
    servingUnit: '1 cup',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast'],
  },
  {
    id: 'b04',
    name: 'Green Tea',
    category: 'beverages',
    calories: 2,
    protein: 0.5,
    carbs: 0,
    fat: 0,
    fiber: 0,
    servingSize: 240,
    servingUnit: '1 cup',
    tags: ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free'],
    meals: ['breakfast', 'snack'],
  },
];

export function filterFoodsByTags(allowedTags = [], excludedTags = []) {
  return foodDatabase.filter((food) => {
    const hasRequired = allowedTags.every((tag) => food.tags.includes(tag));
    const hasExcluded = excludedTags.some((tag) => food.tags.includes(tag));
    return hasRequired && !hasExcluded;
  });
}

export function getFoodsByMeal(mealType) {
  return foodDatabase.filter((food) => food.meals.includes(mealType));
}

export function getFoodById(id) {
  return foodDatabase.find((food) => food.id === id);
}

export const educationData = [
  {
    id: 'edu01',
    icon: 'Flame',
    category: 'Calories',
    title: 'Understanding Calories',
    summary: 'Calories are units of energy your body needs to function — from breathing to running.',
    content: `Calories measure the energy your body gets from food. Your body uses calories for everything — breathing, digesting, walking, and even sleeping. The key is balance: consume roughly the same number of calories you burn to maintain weight.

**Basal Metabolic Rate (BMR)** is the number of calories your body needs at complete rest. It accounts for about 60-75% of your daily energy expenditure.

**Total Daily Energy Expenditure (TDEE)** is your BMR multiplied by an activity factor. This is your actual daily calorie need.

**Tips:**
• Track your intake for a week to understand your habits
• A deficit of ~500 kcal/day leads to roughly 0.5 kg loss per week
• Never go below 1,200 kcal/day (women) or 1,500 kcal/day (men) without medical supervision`,
  },
  {
    id: 'edu02',
    icon: 'Beef',
    category: 'Macros',
    title: 'Protein: The Building Block',
    summary: 'Protein repairs muscles, supports immunity, and keeps you full longer.',
    content: `Protein is essential for building and repairing tissues, making enzymes and hormones, and supporting immune function. It also has the highest satiety factor among macronutrients.

**How much do you need?**
• Sedentary adults: 0.8g per kg of body weight
• Active individuals: 1.2–1.6g per kg
• Muscle building: 1.6–2.2g per kg

**Best sources:**
• Animal: chicken breast, fish, eggs, Greek yogurt
• Plant: lentils, chickpeas, tofu, tempeh, quinoa

**Tips:**
• Spread protein intake across all meals for optimal absorption
• Aim for 20-30g per meal
• Combine plant proteins for complete amino acid profiles`,
  },
  {
    id: 'edu03',
    icon: 'Wheat',
    category: 'Macros',
    title: 'Carbohydrates: Your Energy Source',
    summary: 'Carbs fuel your brain and muscles — choose complex carbs for sustained energy.',
    content: `Carbohydrates are your body's primary and preferred energy source. They break down into glucose, which fuels your brain, muscles, and organs.

**Simple vs. Complex:**
• Simple carbs (sugar, white bread) digest quickly → energy spike and crash
• Complex carbs (whole grains, sweet potato) digest slowly → sustained energy

**Recommended intake:** 45-65% of total calories for most adults.

**Best sources:**
• Whole grains: brown rice, oats, quinoa, whole wheat pasta
• Starchy vegetables: sweet potatoes, corn
• Legumes: beans, lentils

**Tips:**
• Choose whole grains over refined grains
• Pair carbs with protein or fat to slow digestion
• Time your carb intake around workouts for better performance`,
  },
  {
    id: 'edu04',
    icon: 'Droplets',
    category: 'Macros',
    title: 'Healthy Fats Are Essential',
    summary: 'Fats support hormone production, brain function, and nutrient absorption.',
    content: `Dietary fat is essential for absorbing fat-soluble vitamins (A, D, E, K), producing hormones, protecting organs, and supporting brain health.

**Types of fat:**
• **Unsaturated (good):** olive oil, avocado, nuts, fatty fish — protect heart health
• **Saturated (moderate):** butter, cheese, coconut oil — limit to <10% of calories
• **Trans fats (avoid):** fried foods, packaged snacks — raise bad cholesterol

**Recommended intake:** 20-35% of total calories.

**Best sources:**
• Avocado, olive oil, nuts and seeds
• Fatty fish (salmon, mackerel)
• Chia seeds, flaxseeds

**Tips:**
• Replace saturated fats with unsaturated when possible
• Eat fatty fish at least 2x per week for omega-3s
• Use olive oil for cooking instead of butter`,
  },
  {
    id: 'edu05',
    icon: 'Leaf',
    category: 'Fiber',
    title: 'Fiber: The Unsung Hero',
    summary: 'Fiber supports digestion, helps control blood sugar, and keeps you full.',
    content: `Fiber is a type of carbohydrate your body can't digest. It passes through your digestive system largely intact, providing numerous health benefits.

**Two types:**
• **Soluble fiber:** dissolves in water, forms gel — helps lower cholesterol and blood sugar. Found in oats, beans, apples.
• **Insoluble fiber:** doesn't dissolve — adds bulk to stool, prevents constipation. Found in whole wheat, vegetables, nuts.

**Recommended intake:** 25-30g per day for adults.

**Best sources:**
• Lentils (15.6g per cup), chia seeds (9.8g per 2 tbsp)
• Avocado (6.7g per half), broccoli (5.1g per cup)
• Sweet potato (6.6g per medium)

**Tips:**
• Increase fiber gradually to avoid bloating
• Drink plenty of water when eating high-fiber foods
• Aim for fiber at every meal`,
  },
  {
    id: 'edu06',
    icon: 'GlassWater',
    category: 'Hydration',
    title: 'Stay Hydrated',
    summary: 'Water regulates body temperature, transports nutrients, and aids digestion.',
    content: `Water makes up about 60% of your body weight. Even mild dehydration (1-2%) can impair cognitive function, mood, and physical performance.

**How much water?**
• General guideline: 8 cups (2 liters) per day minimum
• Active individuals: 2.5-3.5 liters
• A good rule: drink 30-35 ml per kg of body weight

**Signs of dehydration:**
• Dark yellow urine
• Headache, fatigue, dizziness
• Dry mouth and skin

**Tips:**
• Start your day with a glass of water
• Carry a water bottle everywhere
• Eat water-rich foods: cucumber, watermelon, oranges
• Drink before you feel thirsty — thirst means you're already slightly dehydrated`,
  },
  {
    id: 'edu07',
    icon: 'Clock',
    category: 'Meal Timing',
    title: 'When You Eat Matters',
    summary: 'Consistent meal timing supports metabolism and prevents overeating.',
    content: `While total daily intake matters most, meal timing can influence energy levels, performance, and hunger management.

**General guidelines:**
• Eat within 1-2 hours of waking up
• Space meals 3-4 hours apart
• Avoid large meals within 2-3 hours of bedtime

**Meal distribution:**
• Breakfast: 25% of daily calories — kickstart metabolism
• Lunch: 35% — largest meal for sustained afternoon energy
• Dinner: 30% — moderate, lighter than lunch
• Snacks: 10% — bridge between meals

**Pre/Post workout:**
• Pre: light carb + protein snack 30-60 min before
• Post: protein-rich meal within 30-60 min after

**Tips:**
• Consistency matters more than exact timing
• Don't skip meals — it leads to overeating later
• Listen to your hunger and fullness cues`,
  },
  {
    id: 'edu08',
    icon: 'Scale',
    category: 'Portions',
    title: 'Portion Control Made Easy',
    summary: 'Use simple hand-based measurements to estimate proper portion sizes.',
    content: `You don't need a food scale everywhere. Use your hand as a portable portion guide:

**Hand-based portions:**
• **Protein:** palm-sized portion ≈ 100g (chicken, fish, tofu)
• **Carbs:** cupped hand ≈ 1 serving of grains or pasta
• **Vegetables:** fist-sized or larger — eat generously
• **Fats:** thumb-sized ≈ 1 tablespoon of oil, butter, or nut butter

**Plate method (simplest approach):**
• ½ plate: vegetables and salad
• ¼ plate: lean protein
• ¼ plate: whole grains or starchy carbs
• Small side: healthy fat (olive oil, avocado)

**Tips:**
• Use smaller plates to naturally reduce portions
• Serve food on the plate rather than eating from containers
• Eat slowly — it takes 20 minutes for your brain to register fullness
• Put your fork down between bites`,
  },
  {
    id: 'edu09',
    icon: 'Apple',
    category: 'Balanced Diet',
    title: 'The Balanced Plate',
    summary: 'A balanced diet includes all food groups in the right proportions.',
    content: `A balanced diet provides all the nutrients your body needs without excess. No single food contains all essential nutrients, so variety is key.

**Daily food group targets:**
• **Vegetables:** 5+ servings (aim for rainbow colors)
• **Fruits:** 2-3 servings
• **Whole grains:** 3-5 servings
• **Protein:** 2-3 servings (mix plant and animal sources)
• **Dairy/alternatives:** 2-3 servings
• **Healthy fats:** 2-3 servings

**The 80/20 Rule:**
Eat nutritious whole foods 80% of the time, and allow yourself treats 20%. This is sustainable long-term and prevents feelings of deprivation.

**Tips:**
• Eat the rainbow — different colored foods provide different nutrients
• Plan meals ahead to ensure balanced nutrition throughout the day
• Cook at home more often — you control ingredients and portions`,
  },
  {
    id: 'edu10',
    icon: 'Moon',
    category: 'Lifestyle',
    title: 'Sleep & Nutrition Connection',
    summary: 'Poor sleep increases hunger hormones and cravings for high-calorie foods.',
    content: `Sleep and nutrition are deeply connected. Poor sleep disrupts the hormones that regulate hunger and appetite.

**How sleep affects eating:**
• **Ghrelin** (hunger hormone) increases with poor sleep
• **Leptin** (fullness hormone) decreases
• Result: you feel hungrier and crave high-calorie, sugary foods

**Sleep recommendations:**
• Adults: 7-9 hours per night
• Consistent sleep/wake times improve sleep quality

**Foods that help sleep:**
• Tryptophan-rich: turkey, eggs, cheese, nuts
• Magnesium-rich: almonds, spinach, dark chocolate
• Melatonin-containing: tart cherries, walnuts

**Foods that hurt sleep:**
• Caffeine after 2pm
• Large meals within 2-3 hours of bedtime
• Alcohol (disrupts sleep cycles despite making you drowsy)

**Tips:**
• Prioritize sleep as much as diet and exercise
• Have a light, protein-rich snack if hungry before bed
• Avoid screens 1 hour before bedtime`,
  },
  {
    id: 'edu11',
    icon: 'Dumbbell',
    category: 'Fitness',
    title: 'Fueling Your Workouts',
    summary: 'What you eat before and after exercise impacts performance and recovery.',
    content: `Proper nutrition around workouts maximizes performance and accelerates recovery.

**Pre-workout (30-60 min before):**
• Focus: easily digestible carbs + moderate protein
• Examples: banana + peanut butter, oatmeal, rice cakes + hummus
• Avoid: heavy fats, high fiber (slow digestion)

**During workout:**
• Sessions <60 min: water is sufficient
• Sessions >60 min: sports drink or quick carbs (dates, energy gel)

**Post-workout (within 30-60 min):**
• Focus: protein (20-40g) + carbs for recovery
• Examples: protein shake + banana, chicken + rice, Greek yogurt + berries
• The "anabolic window" is real but wider than previously thought (2-3 hours)

**Tips:**
• Hydrate before, during, and after exercise
• Don't train on an empty stomach for high-intensity sessions
• Adjust calories on rest days vs. training days
• Protein timing matters less than total daily intake`,
  },
  {
    id: 'edu12',
    icon: 'Brain',
    category: 'Mindful Eating',
    title: 'Eat Mindfully',
    summary: 'Paying attention to what you eat improves satisfaction and prevents overeating.',
    content: `Mindful eating means paying full attention to the experience of eating — the taste, texture, smell, and your body's hunger signals.

**Principles of mindful eating:**
1. Eat without distractions (no phone, TV, computer)
2. Chew slowly and thoroughly (aim for 20-30 chews per bite)
3. Notice flavors and textures
4. Stop eating when 80% full
5. Distinguish between physical hunger and emotional hunger

**Benefits:**
• Reduced overeating and binge eating
• Better digestion
• Greater meal satisfaction
• Improved relationship with food

**Physical vs. Emotional hunger:**
• Physical: builds gradually, any food satisfies, stops when full
• Emotional: sudden, craves specific foods, doesn't stop when full

**Tips:**
• Put your phone away during meals
• Use smaller plates and bowls
• Take 5 deep breaths before eating
• Ask: "Am I truly hungry or just bored/stressed/tired?"`,
  },
];
