import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, Utensils, Activity } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="ai-processing mb-8">
        <div className="ai-core"></div>
      </div>
      
      <h1 className="text-gradient mb-4" style={{ fontSize: '3rem' }}>Nutri+</h1>
      <p className="text-muted mb-8 max-w-lg mx-auto" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
        Your intelligent nutrition agent. We calculate your exact nutritional needs and build personalized meal plans to help you reach your goals.
      </p>

      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
        <div className="glass-panel text-left flex gap-4">
          <Brain className="text-primary mt-1" size={24} />
          <div>
            <h3 className="mb-2">Smart Analysis</h3>
            <p className="text-muted text-sm">AI-driven calculations for your unique body profile.</p>
          </div>
        </div>
        <div className="glass-panel text-left flex gap-4">
          <Target className="text-primary mt-1" size={24} />
          <div>
            <h3 className="mb-2">Goal Oriented</h3>
            <p className="text-muted text-sm">Whether you want to lose, maintain, or gain weight.</p>
          </div>
        </div>
        <div className="glass-panel text-left flex gap-4">
          <Utensils className="text-primary mt-1" size={24} />
          <div>
            <h3 className="mb-2">Meal Planning</h3>
            <p className="text-muted text-sm">Daily menus mapped to your macro and micro needs.</p>
          </div>
        </div>
        <div className="glass-panel text-left flex gap-4">
          <Activity className="text-primary mt-1" size={24} />
          <div>
            <h3 className="mb-2">Progress Tracking</h3>
            <p className="text-muted text-sm">Build streaks and log foods to stay on track.</p>
          </div>
        </div>
      </div>

      <button className="glass-button primary animate-pulse-glow" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }} onClick={() => navigate('/onboarding')}>
        Start Now
      </button>
    </div>
  );
}
