import React from 'react';
import { useUser } from '../context/UserContext';
import { Trash2, Droplet } from 'lucide-react';

export default function FoodLog() {
  const { todayLog, removeLoggedFood, logWater } = useUser();

  return (
    <div className="animate-fade-in">
      <h1 className="mb-2">Food Log</h1>
      <p className="text-muted mb-8">Track your daily consumption.</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2 glass-panel">
          <h3 className="mb-4">Logged Foods</h3>
          
          {todayLog.foods.length === 0 ? (
            <p className="text-muted text-center py-8">No foods logged today.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {todayLog.foods.map((food, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="font-medium">{food.name}</p>
                    <p className="text-xs text-muted">
                      {Math.round(food.calories * (food.portionMultiplier || 1))} kcal
                    </p>
                  </div>
                  <button className="text-danger hover:text-red-400 transition-colors" onClick={() => removeLoggedFood(idx)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-panel flex flex-col h-fit">
          <h3 className="mb-4 flex items-center gap-2"><Droplet className="text-glow" size={20} /> Water Intake</h3>
          
          <div className="flex flex-col items-center justify-center py-6 gap-4">
            <h2 className="text-3xl text-gradient">{todayLog.waterIntake} ml</h2>
            
            <div className="flex gap-2 w-full">
              <button className="glass-button flex-1 py-2 text-sm" onClick={() => logWater(250)}>+ 250ml</button>
              <button className="glass-button flex-1 py-2 text-sm" onClick={() => logWater(500)}>+ 500ml</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
