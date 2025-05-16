import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  Icon: LucideIcon;
}

export function StatCard({ title, value, change, Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Icon className="text-indigo-600" size={24} />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
        <span className="text-gray-500 text-sm ml-1">vs last year</span>
      </div>
    </div>
  );
}