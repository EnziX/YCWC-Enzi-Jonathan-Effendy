import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2 } from 'lucide-react';

export default function Settings() {
  const { profile, preferences, resetAll } = useUser();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all your data? This cannot be undone.")) {
      resetAll();
      navigate('/');
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-2">Settings</h1>
      <p className="text-muted mb-8">Manage your profile and app preferences.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel">
          <h3 className="mb-4">Profile Info</h3>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-muted">Age</span>
              <span>{profile.age} years</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-muted">Gender</span>
              <span className="capitalize">{profile.gender}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-muted">Height</span>
              <span>{profile.height} cm</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-muted">Weight</span>
              <span>{profile.weight} kg</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-muted">Goal</span>
              <span className="capitalize">{profile.goal}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted">Activity Level</span>
              <span className="capitalize">{profile.activityLevel?.replace('_', ' ')}</span>
            </div>
          </div>
          <button className="glass-button w-full mt-4" onClick={() => {
            // In a real app, this would open edit mode
            alert("Edit profile coming soon!");
          }}>Edit Profile</button>
        </div>

        <div className="glass-panel flex flex-col justify-between">
          <div>
            <h3 className="mb-4">Dietary Preferences</h3>
            {preferences?.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {preferences.map((pref, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 rounded-full text-sm capitalize">
                    {pref.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted mb-6">No specific dietary preferences set.</p>
            )}
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <button className="glass-button text-danger hover:border-danger hover:bg-danger/10 w-full justify-center" onClick={handleReset}>
              <Trash2 size={18} /> Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
