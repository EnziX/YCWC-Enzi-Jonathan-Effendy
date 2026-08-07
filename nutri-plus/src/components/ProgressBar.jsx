import React from 'react';

export default function ProgressBar({ label, current, max, colorClass = "bg-primary", unit = "g" }) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted">
          {Math.round(current)} / {Math.round(max)}{unit}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass}`} 
          style={{ width: `${percentage}%`, transition: 'width 1s ease-out', backgroundColor: `var(--color-${colorClass.replace('bg-', '')})` }}
        />
      </div>
    </div>
  );
}
