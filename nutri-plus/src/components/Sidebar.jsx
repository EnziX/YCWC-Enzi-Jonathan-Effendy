import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Utensils, BookOpen, Settings, Flame } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Sidebar() {
  const { streak } = useUser();

  return (
    <aside className="sidebar">
      <div className="flex items-center gap-4 mb-8 px-4">
        <div className="ai-core" style={{ width: 30, height: 30, animation: 'none' }}></div>
        <h2 className="text-gradient">Nutri+</h2>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/meal-planner" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Calendar size={20} />
          <span>Meal Planner</span>
        </NavLink>
        <NavLink to="/food-log" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Utensils size={20} />
          <span>Food Log</span>
        </NavLink>
        <NavLink to="/tips" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>Tips & Edu</span>
        </NavLink>
      </nav>

      <div className="mt-auto">
        <div className="glass-panel p-4 mb-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Flame className={`streak-flame ${streak?.current > 0 ? 'active' : ''}`} size={24} />
            <span className="font-heading" style={{ fontSize: '1.2rem', fontWeight: '700' }}>
              {streak?.current || 0} Days
            </span>
          </div>
          <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Current Streak</p>
        </div>

        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
