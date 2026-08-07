import React from 'react';
import { useUser } from '../context/UserContext';
import ProgressBar from '../components/ProgressBar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { profile, nutrition, todayConsumed, mealPlan, streak } = useUser();
  const navigate = useNavigate();

  const calsPercent = Math.min(100, Math.round((todayConsumed.calories / nutrition.macros.calories) * 100)) || 0;

  return (
    <div className="animate-fade-in">
      <h1 className="mb-2">Dashboard</h1>
      <p className="text-muted mb-8">Welcome back! Here's your nutrition overview for today.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel col-span-1 md:col-span-2 flex flex-col justify-center">
          <h3 className="mb-4">Calorie Progress</h3>
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  stroke="var(--color-primary)"
                  strokeDasharray={`${calsPercent}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{calsPercent}%</text>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted mb-1">Consumed</p>
              <h2 className="text-2xl mb-4">{todayConsumed.calories} <span className="text-sm text-muted">/ {nutrition.macros.calories} kcal</span></h2>
              <p className="text-sm text-muted">Goal: {profile.goal === 'lose' ? 'Caloric Deficit' : profile.goal === 'gain' ? 'Caloric Surplus' : 'Maintain Weight'}</p>
            </div>
          </div>
        </div>

        <div className="glass-panel flex flex-col justify-center">
          <h3 className="mb-4">Macros</h3>
          <ProgressBar label="Protein" current={todayConsumed.protein} max={nutrition.macros.protein} colorClass="bg-glow" />
          <ProgressBar label="Carbs" current={todayConsumed.carbs} max={nutrition.macros.carbs} colorClass="bg-warning" />
          <ProgressBar label="Fat" current={todayConsumed.fat} max={nutrition.macros.fat} colorClass="bg-danger" />
          <ProgressBar label="Fiber" current={todayConsumed.fiber} max={nutrition.macros.fiber} colorClass="bg-success" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel">
          <div className="flex justify-between items-center mb-4">
            <h3>Today's Plan</h3>
            <button className="text-primary text-sm hover:underline" onClick={() => navigate('/meal-planner')}>View All</button>
          </div>
          {mealPlan?.meals ? (
            <div className="flex flex-col gap-3">
              {Object.keys(mealPlan.meals).map((mealType) => (
                <div key={mealType} className="p-3 bg-slate-900/50 rounded-lg flex justify-between items-center border border-slate-800">
                  <span className="capitalize font-medium">{mealType}</span>
                  <span className="text-sm text-muted">{mealPlan.meals[mealType].totalNutrition.calories} kcal</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">No meal plan generated.</p>
          )}
        </div>

        <div className="glass-panel flex flex-col justify-center items-center text-center">
          <h3 className="mb-2">Consistency is Key</h3>
          <p className="text-sm text-muted mb-6">Log your foods and hit your targets to build your streak!</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-4xl text-gradient font-heading font-bold">{streak?.current || 0}</span>
            <span className="text-xl">Days</span>
          </div>
          <p className="text-xs text-muted">Personal Best: {streak?.best || 0} days</p>
        </div>
      </div>
    </div>
  );
}
