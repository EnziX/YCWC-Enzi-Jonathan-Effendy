import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ACTIVITY_LEVELS, GOALS } from '../utils/nutritionCalculator';

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useUser();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'sedentary',
    goal: 'maintain',
  });
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    halal: false,
    lactoseFree: false,
  });

  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleComplete = () => {
    setLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      const prefsArray = Object.keys(preferences).filter(k => preferences[k]);
      completeOnboarding({
        ...profile,
        age: Number(profile.age),
        height: Number(profile.height),
        weight: Number(profile.weight),
      }, prefsArray);
      navigate('/dashboard');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="ai-processing">
          <div className="ai-core"></div>
          <p className="text-gradient animate-fade-in text-lg font-heading">AI is calculating your exact nutritional profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="glass-panel w-full max-w-md animate-fade-in">
        <h2 className="text-center mb-6 text-gradient">Step {step} of 3</h2>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-sm text-muted">Age (years)</label>
              <input type="number" className="glass-input" value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} placeholder="e.g. 25" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-muted">Gender</label>
              <select className="glass-input" value={profile.gender} onChange={e => setProfile({...profile, gender: e.target.value})}>
                <option value="male" className="bg-slate-900">Male</option>
                <option value="female" className="bg-slate-900">Female</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button className="glass-button primary" onClick={handleNext} disabled={!profile.age}>Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-sm text-muted">Height (cm)</label>
              <input type="number" className="glass-input" value={profile.height} onChange={e => setProfile({...profile, height: e.target.value})} placeholder="e.g. 170" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-muted">Weight (kg)</label>
              <input type="number" className="glass-input" value={profile.weight} onChange={e => setProfile({...profile, weight: e.target.value})} placeholder="e.g. 65" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-muted">Activity Level</label>
              <select className="glass-input" value={profile.activityLevel} onChange={e => setProfile({...profile, activityLevel: e.target.value})}>
                {Object.entries(ACTIVITY_LEVELS).map(([key, data]) => (
                  <option key={key} value={key} className="bg-slate-900">{data.label} - {data.desc}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-between mt-4">
              <button className="glass-button" onClick={handleBack}>Back</button>
              <button className="glass-button primary" onClick={handleNext} disabled={!profile.height || !profile.weight}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-sm text-muted">Goal</label>
              <select className="glass-input" value={profile.goal} onChange={e => setProfile({...profile, goal: e.target.value})}>
                {Object.entries(GOALS).map(([key, data]) => (
                  <option key={key} value={key} className="bg-slate-900">{data.label} - {data.desc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm text-muted">Dietary Preferences</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={preferences.vegetarian} onChange={e => setPreferences({...preferences, vegetarian: e.target.checked})} />
                  Vegetarian
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={preferences.halal} onChange={e => setPreferences({...preferences, halal: e.target.checked})} />
                  Halal
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={preferences.lactoseFree} onChange={e => setPreferences({...preferences, lactoseFree: e.target.checked})} />
                  Lactose-Free
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button className="glass-button" onClick={handleBack}>Back</button>
              <button className="glass-button primary" onClick={handleComplete}>Calculate My Plan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
