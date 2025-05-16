import React from 'react';
import { Shield, Users, AlertTriangle, MapPin } from 'lucide-react';
import { useCrimeStore } from '../store/crimeStore';

export function StatsGrid() {
  const stats = useCrimeStore((state) => state.stats);

  const statCards = [
    { label: 'Total Crime Rate', value: `${stats.totalCrimes}`, icon: Shield, change: -2.4 },
    { label: 'High Risk Areas', value: stats.highRiskAreas.toString(), icon: AlertTriangle, change: 1.2 },
    { label: 'Crime Hotspots', value: stats.crimeHotspots.toString(), icon: MapPin, change: -0.4 },
    { label: 'Cases Solved', value: `${stats.casesSolved}%`, icon: Users, change: 4.1 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <div key={stat.label} className="stats-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className="text-orange-500" size={24} />
            <span className={`text-sm ${
              stat.change > 0 ? 'text-red-400' : 'text-green-400'
            }`}>
              {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
          <p className="text-slate-400 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}