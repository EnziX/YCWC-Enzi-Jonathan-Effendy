/**
 * educationData.js
 * ──────────────────────────────────────────────
 * Tips & educational content for Nutri+.
 * Each entry has an icon name (Lucide), category, title, short summary,
 * and full content for the detail view.
 */

const educationData = [
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

export default educationData;
