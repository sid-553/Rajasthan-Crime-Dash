import React from 'react';
import { Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield size={32} className="text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold">Rajasthan Crime Analytics</h1>
              <p className="text-indigo-200">Real-time Crime Statistics Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select className="bg-indigo-800 text-white px-4 py-2 rounded-lg border border-indigo-700">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-indigo-900 font-semibold px-4 py-2 rounded-lg transition-colors">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}