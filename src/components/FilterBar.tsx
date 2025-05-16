import React from 'react';
import { useCrimeStore } from '../store/crimeStore';

export function FilterBar() {
  const { currentFilter, setFilter } = useCrimeStore();

  const filters = [
    { id: 'all', label: 'All' },
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' },
    { id: 'violent', label: 'Violent' },
    { id: 'property', label: 'Property' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setFilter(id as any)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${currentFilter === id
              ? 'bg-orange-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          {label}
        </button>
      ))}
      <button
        onClick={() => setFilter(null)}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-slate-800 text-slate-300 hover:bg-slate-700"
      >
        Reset
      </button>
    </div>
  );
}