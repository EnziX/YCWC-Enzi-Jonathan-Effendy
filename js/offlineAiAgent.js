/**
 * offlineAiAgent.js
 * ──────────────────────────────────────────────
 * 100% Offline AI Agent Engine for Nutri+.
 * Operates without external API keys or network requests.
 * Uses local state, user profile, macro calculators, and database knowledge.
 */

import { getState, getTodayConsumed } from './state.js';
import { foodDatabase } from './data.js';
import { calculateWaterIntake, calculateBMI } from './nutritionCalculator.js';

// Curated Healthy Places knowledge base
const MOCK_PLACES_SUMMARY = [
  { name: 'Aiola Eatery - Slamet', category: 'Pujasera & Traditional', city: 'Surabaya', rating: 4.8 },
  { name: 'Spesial Soto Boyolali (SSB) Hj. Hesti', category: 'Soto & Soup', city: 'Surabaya', rating: 4.7 },
  { name: 'Green Healthy Bowl', category: 'Salad & Poke', city: 'Jakarta', rating: 4.9 },
  { name: 'SaladStop! - Grand Indonesia', category: 'Salad & Wraps', city: 'Jakarta', rating: 4.7 },
  { name: 'Berrywell Smoothie Bar', category: 'Smoothie Bowls', city: 'Jakarta', rating: 4.8 },
  { name: 'FitBites Healthy Catering & Diner', category: 'Healthy Dining', city: 'Surabaya', rating: 4.8 },
];

// Curated Recipes knowledge base
const MOCK_RECIPES_SUMMARY = [
  { name: 'Grilled Chicken Salad Bowl', calories: 350, protein: 35, meal: 'lunch', prep: '15 min', tags: ['halal', 'gluten-free'] },
  { name: 'Overnight Oats with Berries & Chia', calories: 280, protein: 12, meal: 'breakfast', prep: '5 min', tags: ['vegetarian', 'vegan'] },
  { name: 'Baked Salmon with Quinoa & Asparagus', calories: 420, protein: 34, meal: 'dinner', prep: '25 min', tags: ['halal', 'gluten-free'] },
  { name: 'High-Protein Tempeh Stir-Fry', calories: 310, protein: 22, meal: 'lunch', prep: '15 min', tags: ['vegan', 'vegetarian'] },
  { name: 'Avocado Egg Toast', calories: 290, protein: 14, meal: 'breakfast', prep: '10 min', tags: ['vegetarian'] },
];

/**
 * Main entry point for Offline AI queries.
 * Simulates a fast intelligent response.
 */
export async function getOfflineAiResponse(userQuery) {
  // Simulate tiny delay for natural UI feel (300ms)
  await new Promise((res) => setTimeout(res, 300));

  const query = userQuery.toLowerCase().trim();
  const state = getState();
  const todayConsumed = getTodayConsumed();
  const { profile, nutrition } = state;

  const targetCal = nutrition.macros?.calories || 2000;
  const targetProt = nutrition.macros?.protein || 120;
  const targetCarb = nutrition.macros?.carbs || 250;
  const targetFat = nutrition.macros?.fat || 60;

  const remCal = Math.max(0, targetCal - todayConsumed.calories);
  const remProt = Math.max(0, targetProt - todayConsumed.protein);
  const remCarb = Math.max(0, targetCarb - todayConsumed.carbs);
  const remFat = Math.max(0, targetFat - todayConsumed.fat);

  const bmiInfo = profile.weight && profile.height ? calculateBMI(profile.weight, profile.height) : null;
  const waterTarget = profile.weight ? calculateWaterIntake(profile.weight, profile.activityLevel) : 2000;

  // Intent 1: Sisa Kalori & Progress Makro Hari Ini
  if (
    query.includes('sisa') ||
    query.includes('kalori') ||
    query.includes('rem') ||
    query.includes('macro') ||
    query.includes('makro') ||
    query.includes('progres') ||
    query.includes('progress') ||
    query.includes('target') ||
    query.includes('how many calories')
  ) {
    let statusMsg = '';
    if (todayConsumed.calories === 0) {
      statusMsg = 'Anda belum mencatat makanan hari ini. Yuk mulai log makanan Anda!';
    } else if (todayConsumed.calories > targetCal) {
      statusMsg = `⚠️ Anda sudah melebihi target kalori hari ini sebesar **${todayConsumed.calories - targetCal} kcal**. Tetap semangat dan imbangi dengan aktivitas fisik!`;
    } else {
      statusMsg = `👍 Konsumsi Anda sudah **${Math.round((todayConsumed.calories / targetCal) * 100)}%** dari target harian.`;
    }

    return `📊 **Status & Sisa Nutrisi Hari Ini:**

- **Kalori Terpakai:** ${todayConsumed.calories} / ${targetCal} kcal (Sisa: **${remCal} kcal**)
- **Protein:** ${todayConsumed.protein}g / ${targetProt}g (Sisa: **${remProt}g**)
- **Karbohidrat:** ${todayConsumed.carbs}g / ${targetCarb}g (Sisa: **${remCarb}g**)
- **Lemak:** ${todayConsumed.fat}g / ${targetFat}g (Sisa: **${remFat}g**)

${statusMsg}

💡 *Tips Nutri+: Gunakan fitur Meal Planner atau Food Log untuk mencatat konsumsi Anda dengan mudah.*`;
  }

  // Intent 2: Rekomendasi Makanan
  if (
    query.includes('rekomendasi makan') ||
    query.includes('makan apa') ||
    query.includes('menu') ||
    query.includes('sarapan') ||
    query.includes('makan siang') ||
    query.includes('makan malam') ||
    query.includes('snack') ||
    query.includes('camilan') ||
    query.includes('suggest meal') ||
    query.includes('what to eat')
  ) {
    let mealCategory = 'lunch';
    if (query.includes('sarapan') || query.includes('breakfast')) mealCategory = 'breakfast';
    if (query.includes('malam') || query.includes('dinner')) mealCategory = 'dinner';
    if (query.includes('snack') || query.includes('camilan')) mealCategory = 'snack';

    const suitableFoods = foodDatabase
      .filter((f) => f.meals.includes(mealCategory))
      .filter((f) => f.calories <= (remCal > 0 ? remCal : 500))
      .slice(0, 4);

    const itemsList = (suitableFoods.length > 0 ? suitableFoods : foodDatabase.slice(0, 4))
      .map(
        (f) =>
          `• **${f.name}** (${f.servingUnit})\n  🔥 ${f.calories} kcal | 🥩 Protein ${f.protein}g | 🍞 Karbo ${f.carbs}g`
      )
      .join('\n\n');

    return `🥗 **Rekomendasi Menu ${mealCategory.toUpperCase()}** (Sisa Target: ${remCal} kcal):

${itemsList}

💡 *Menu di atas telah disesuaikan dengan profil dan toleransi kalori harian Anda!*`;
  }

  // Intent 3: Makanan Tinggi Protein / Rendah Karbo
  if (
    query.includes('protein') ||
    query.includes('karbo') ||
    query.includes('rendah karbo') ||
    query.includes('low carb') ||
    query.includes('high protein') ||
    query.includes('tinggi protein')
  ) {
    if (query.includes('karbo') || query.includes('low carb')) {
      const lowCarbFoods = foodDatabase
        .concat()
        .sort((a, b) => a.carbs - b.carbs)
        .slice(0, 4);

      const list = lowCarbFoods
        .map((f) => `• **${f.name}**: ${f.carbs}g Karbo (${f.calories} kcal, ${f.protein}g Protein)`)
        .join('\n');

      return `🥦 **Pilihan Makanan Rendah Karbohidrat Terbaik:**

${list}

Sangat cocok untuk diet ketogenic atau pembatasan karbohidrat!`;
    }

    const highProteinFoods = foodDatabase
      .concat()
      .sort((a, b) => b.protein - a.protein)
      .slice(0, 5);

    const list = highProteinFoods
      .map((f) => `• **${f.name}**: **${f.protein}g Protein** per ${f.servingUnit} (${f.calories} kcal)`)
      .join('\n');

    return `🥩 **Sumber Makanan Tinggi Protein Terbaik di Nutri+:**

${list}

Memenuhi target protein harian penting untuk menjaga dan membangun massa otot!`;
  }

  // Intent 4: Resep Sehat
  if (
    query.includes('resep') ||
    query.includes('recipe') ||
    query.includes('masak') ||
    query.includes('cook') ||
    query.includes('ayam') ||
    query.includes('salmon') ||
    query.includes('oat')
  ) {
    let matches = MOCK_RECIPES_SUMMARY;
    if (query.includes('ayam')) matches = matches.filter((r) => r.name.toLowerCase().includes('chicken') || r.name.toLowerCase().includes('ayam'));
    if (query.includes('salmon')) matches = matches.filter((r) => r.name.toLowerCase().includes('salmon'));
    if (query.includes('oat')) matches = matches.filter((r) => r.name.toLowerCase().includes('oats'));

    const recipeText = matches
      .map(
        (r) =>
          `🍳 **${r.name}**\n  ⏱️ Waktu: ${r.prep} | 🔥 ${r.calories} kcal | 🥩 Protein ${r.protein}g\n  🏷️ Tag: ${r.tags.join(', ')}`
      )
      .join('\n\n');

    return `👨‍🍳 **Rekomendasi Resep Sehat Nutri+:**

${recipeText}

Buka halaman **Recipes** di menu untuk melihat bahan & langkah pembuatan selengkapnya!`;
  }

  // Intent 5: Tempat Makan Sehat
  if (
    query.includes('tempat') ||
    query.includes('restoran') ||
    query.includes('kuliner') ||
    query.includes('makan luar') ||
    query.includes('place') ||
    query.includes('surabaya') ||
    query.includes('jakarta')
  ) {
    const list = MOCK_PLACES_SUMMARY.map(
      (p) => `📍 **${p.name}** (${p.city})\n  ⭐ ${p.rating} | Kategori: ${p.category}`
    ).join('\n\n');

    return `🏬 **Rekomendasi Tempat Makan Sehat:**

${list}

Anda bisa melihat lokasi peta Google Maps dan jam buka di menu **Healthy Places**!`;
  }

  // Intent 6: Tips Kesehatan, Air Putih, & Diet
  if (
    query.includes('tips') ||
    query.includes('air') ||
    query.includes('minum') ||
    query.includes('turun') ||
    query.includes('berat') ||
    query.includes('otot') ||
    query.includes('fat loss') ||
    query.includes('weight loss')
  ) {
    return `💡 **Tips Nutrisi & Kesehatan Nutri+:**

💧 **Target Hidrasi Air Putih:**
Berdasarkan berat badan Anda (${profile.weight || 60} kg), kebutuhan air harian Anda adalah sekitar **${(waterTarget / 1000).toFixed(1)} Liter** per hari.

🎯 **Panduan Target (${(profile.goal || 'lose').toUpperCase()}):**
- **Defisit/Surplus Kalori:** Kunci utama penurunan berat badan adalah konsistensi defisit kalori, bukan menghindari makanan tertentu.
- **Asupan Protein:** Pastikan mengonsumsi setidaknya 1.6 - 2.0g protein per kg berat badan untuk efisiensi pembentukan/penjagaan otot.
- **Istirahat Cukup:** Tidur 7-8 jam per malam mengoptimalkan pemulihan dan hormon pencernaan.

Periksa menu **Tips & Edu** untuk artikel kesehatan lebih lengkap!`;
  }

  // Intent 7: Profil Saya & BMI
  if (query.includes('profil') || query.includes('profile') || query.includes('bmi') || query.includes('bmr') || query.includes('tdee')) {
    return `👤 **Ringkasan Profil Nutrisi Anda:**

- **Usia:** ${profile.age || '-'} tahun | **Gender:** ${profile.gender || '-'}
- **Tinggi / Berat:** ${profile.height || '-'} cm / ${profile.weight || '-'} kg
- **Kategori BMI:** ${bmiInfo ? `${bmiInfo.bmi} (${bmiInfo.category})` : 'Belum diisi'}
- **Target Utama:** ${(profile.goal || 'maintain').toUpperCase()}
- **Target Kalori Harian:** ${targetCal} kcal
- **Target Makro:** Protein ${targetProt}g | Karbo ${targetCarb}g | Lemak ${targetFat}g

Anda dapat mengubah data ini kapan saja melalui menu **Settings**!`;
  }

  // Default Fallback Response
  return `🤖 **Nutri+ AI Agent (Offline Mode)**

Halo! Saya adalah asisten nutrisi pribadi Anda yang beroperasi secara offline. 

Berikut beberapa hal yang bisa Anda tanyakan kepada saya:
1. 📊 *"Berapa sisa kalori saya?"*
2. 🥗 *"Rekomendasi makan siang hari ini"*
3. 🥩 *"Makanan tinggi protein"*
4. 🍳 *"Resep dada ayam"*
5. 📍 *"Tempat makan sehat di Surabaya"*
6. 💡 *"Tips menurunkan berat badan"*

Ada yang ingin Anda tanyakan tentang jurnal nutrisi Anda hari ini?`;
}
