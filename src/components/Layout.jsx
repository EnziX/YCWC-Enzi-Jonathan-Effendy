import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useUser } from '../context/UserContext';

export default function Layout() {
  const { isOnboarded } = useUser();
  const location = useLocation();

  // If not onboarded and trying to access app routes, redirect to landing or onboarding
  if (!isOnboarded && location.pathname !== '/' && location.pathname !== '/onboarding') {
    return <Navigate to="/" replace />;
  }

  // If onboarded and trying to access landing/onboarding, redirect to dashboard
  if (isOnboarded && (location.pathname === '/' || location.pathname === '/onboarding')) {
    return <Navigate to="/dashboard" replace />;
  }

  // No sidebar for landing and onboarding pages
  if (location.pathname === '/' || location.pathname === '/onboarding') {
    return (
      <div className="app-layout">
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
