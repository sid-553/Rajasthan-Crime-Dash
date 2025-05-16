import React, { useEffect } from 'react';
import { CrimeChart } from './components/CrimeChart';
import { CrimeMap } from './components/CrimeMap';
import { StatsGrid } from './components/StatsGrid';
import { FilterBar } from './components/FilterBar';
import { initializeWebSocket } from './services/websocket';

function App() {
  useEffect(() => {
    const socket = initializeWebSocket();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-6xl font-bold tracking-tighter mb-2">Rajasthan</h1>
        <h2 className="text-6xl font-bold tracking-tighter text-orange-500 mb-8">Crime Dashboard</h2>
        <FilterBar />
      </header>

      <main className="space-y-6">
        <StatsGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="chart-container rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Crime by Location</h3>
            <CrimeChart />
          </div>
          
          <div className="chart-container rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Crime Distribution</h3>
            <CrimeMap />
          </div>
        </div>

        <div className="chart-container rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Crime Rate Timeline</h3>
          <CrimeChart type="line" />
        </div>
      </main>
    </div>
  );
}

export default App;