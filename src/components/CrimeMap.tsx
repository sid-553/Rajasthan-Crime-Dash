import React, { useState } from 'react';
import { useCrimeStore } from '../store/crimeStore';

interface CityData {
  name: string;
  coordinates: [number, number];
  stats: {
    crimeRate: number;
    solved: number;
    trend: number;
  };
}

const RAJASTHAN_CITIES: CityData[] = [
  {
    name: 'Jaipur',
    coordinates: [26.9124, 75.7873],
    stats: { crimeRate: 156, solved: 82, trend: -5 }
  },
  {
    name: 'Jodhpur',
    coordinates: [26.2389, 73.0243],
    stats: { crimeRate: 124, solved: 75, trend: -2 }
  },
  {
    name: 'Udaipur',
    coordinates: [24.5854, 73.7125],
    stats: { crimeRate: 98, solved: 79, trend: -8 }
  },
  {
    name: 'Kota',
    coordinates: [25.2138, 75.8648],
    stats: { crimeRate: 112, solved: 71, trend: 3 }
  },
  {
    name: 'Ajmer',
    coordinates: [26.4499, 74.6399],
    stats: { crimeRate: 87, solved: 68, trend: -1 }
  },
  {
    name: 'Bikaner',
    coordinates: [28.0229, 73.3119],
    stats: { crimeRate: 76, solved: 73, trend: -4 }
  },
  {
    name: 'Alwar',
    coordinates: [27.5530, 76.6346],
    stats: { crimeRate: 92, solved: 70, trend: -3 }
  },
  {
    name: 'Bharatpur',
    coordinates: [27.2152, 77.5030],
    stats: { crimeRate: 83, solved: 72, trend: -6 }
  },
  {
    name: 'Sri Ganganagar',
    coordinates: [29.9094, 73.8801],
    stats: { crimeRate: 68, solved: 77, trend: -7 }
  },
  {
    name: 'Sikar',
    coordinates: [27.6094, 75.1398],
    stats: { crimeRate: 71, solved: 74, trend: -2 }
  },
  {
    name: 'Pali',
    coordinates: [25.7781, 73.3311],
    stats: { crimeRate: 65, solved: 76, trend: -5 }
  },
  {
    name: 'Tonk',
    coordinates: [26.1659, 75.7962],
    stats: { crimeRate: 58, solved: 78, trend: -4 }
  },
  {
    name: 'Kishangarh',
    coordinates: [26.5947, 74.8541],
    stats: { crimeRate: 62, solved: 75, trend: -3 }
  },
  {
    name: 'Sawai Madhopur',
    coordinates: [26.0214, 76.3452],
    stats: { crimeRate: 54, solved: 80, trend: -8 }
  },
  {
    name: 'Chittorgarh',
    coordinates: [24.8887, 74.6269],
    stats: { crimeRate: 59, solved: 77, trend: -6 }
  }
];

export function CrimeMap() {
  const incidents = useCrimeStore((state) => state.incidents);
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);

  const handleCityClick = (city: CityData) => {
    setSelectedCity(selectedCity?.name === city.name ? null : city);
  };

  return (
    <div className="relative h-[300px] bg-slate-800/50 rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        {/* Futuristic map background with grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,138,76,0.1)_0%,rgba(30,41,59,0.2)_100%)]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,138,76,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,138,76,0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>

        {/* City markers */}
        {RAJASTHAN_CITIES.map((city) => (
          <div
            key={city.name}
            className={`absolute cursor-pointer transition-all duration-300 ${
              selectedCity?.name === city.name ? 'z-30' : 'z-20'
            }`}
            style={{
              left: `${((city.coordinates[1] - 72) / 4) * 100}%`,
              top: `${((city.coordinates[0] - 24.6) / 2) * 100}%`,
            }}
            onMouseEnter={() => setHoveredCity(city)}
            onMouseLeave={() => setHoveredCity(null)}
            onClick={() => handleCityClick(city)}
          >
            <div className={`relative group ${
              selectedCity?.name === city.name ? 'scale-125' : ''
            }`}>
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full relative z-10">
                <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse opacity-75"></div>
              </div>
              
              {/* City name label */}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-medium bg-slate-800/90 px-1.5 py-0.5 rounded whitespace-nowrap">
                {city.name}
              </span>
            </div>

            {/* Hover stats popup */}
            {hoveredCity?.name === city.name && !selectedCity && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-50 w-48">
                <h4 className="font-semibold text-orange-500 mb-2">{city.name}</h4>
                <div className="space-y-1 text-sm">
                  <p>Crime Rate: {city.stats.crimeRate}/100k</p>
                  <p>Cases Solved: {city.stats.solved}%</p>
                  <p className={city.stats.trend < 0 ? 'text-green-400' : 'text-red-400'}>
                    Trend: {city.stats.trend > 0 ? '+' : ''}{city.stats.trend}%
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Real-time incidents */}
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`absolute w-2 h-2 rounded-full incident-point ${
              incident.severity === 'high' 
                ? 'bg-red-500' 
                : incident.severity === 'medium'
                ? 'bg-orange-500'
                : 'bg-yellow-500'
            }`}
            style={{
              left: `${((incident.coordinates[1] - 72) / 4) * 100}%`,
              top: `${((incident.coordinates[0] - 24.6) / 2) * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Selected city detailed view */}
      {selectedCity && (
        <div className="absolute inset-0 bg-slate-900/95 p-4 z-40">
          <button 
            onClick={() => setSelectedCity(null)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold text-orange-500 mb-4">{selectedCity.name} Analytics</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-sm text-slate-400">Crime Rate</p>
                <p className="text-2xl font-bold">{selectedCity.stats.crimeRate}</p>
                <p className="text-xs text-slate-500">per 100k population</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-sm text-slate-400">Cases Solved</p>
                <p className="text-2xl font-bold">{selectedCity.stats.solved}%</p>
                <p className="text-xs text-slate-500">resolution rate</p>
              </div>
            </div>
            <div className="flex-1 bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Recent Incidents</h4>
              <div className="space-y-2">
                {incidents
                  .filter(incident => incident.location === selectedCity.name)
                  .slice(0, 5)
                  .map(incident => (
                    <div key={incident.id} className="flex items-center justify-between text-sm">
                      <span>{incident.type}</span>
                      <span className="text-slate-400">{new Date(incident.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-slate-800/90 p-3 rounded-lg">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}