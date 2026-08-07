import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { RefreshCw, CheckCircle, Info } from 'lucide-react';

export default function MealPlanner() {
  const { mealPlan, regeneratePlan, logFood } = useUser();
  const [loggedFoods, setLoggedFoods] = useState(new Set());
  
  if (!mealPlan) return null;

  const handleLogMeal = (mealType, foods) => {
    foods.forEach(food => {
      if (!loggedFoods.has(food.id + mealType)) {
        logFood(food, food.portionMultiplier);
      }
    });
    
    // Mark as logged locally for visual feedback
    const newLogged = new Set(loggedFoods);
    foods.forEach(f => newLogged.add(f.id + mealType));
    setLoggedFoods(newLogged);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-2">Meal Planner</h1>
          <p className="text-muted">Your personalized daily menu.</p>
        </div>
        <button className="glass-button" onClick={regeneratePlan}>
          <RefreshCw size={18} /> Regenerate All
        </button>
      </div>

      <div className="grid gap-6">
        {Object.entries(mealPlan.meals).map(([mealType, data]) => {
          const isLogged = data.foods.every(f => loggedFoods.has(f.id + mealType));
          
          return (
            <div key={mealType} className="glass-panel">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                <h3 className="capitalize text-gradient">{mealType}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted">{data.totalNutrition.calories} kcal</span>
                  <button 
                    className={`glass-button text-sm py-1 px-3 ${isLogged ? 'bg-success border-success' : 'primary'}`}
                    onClick={() => handleLogMeal(mealType, data.foods)}
                    disabled={isLogged}
                  >
                    {isLogged ? <><CheckCircle size={14}/> Logged</> : 'Log Meal'}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                {data.foods.map((food, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-slate-900/40 rounded-lg">
                    <div>
                      <p className="font-medium">{food.name}</p>
                      <p className="text-xs text-muted">Portion: {food.portion} ({(food.portionMultiplier * 100).toFixed(0)}%)</p>
                    </div>
                    <div className="flex gap-4 text-xs text-muted">
                      <span>P: {Math.round(food.protein * food.portionMultiplier)}g</span>
                      <span>C: {Math.round(food.carbs * food.portionMultiplier)}g</span>
                      <span>F: {Math.round(food.fat * food.portionMultiplier)}g</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
