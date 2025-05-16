import { create } from 'zustand';
import { formatISO, subHours, parseISO } from 'date-fns';

interface CrimeData {
  id: string;
  type: string;
  location: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  coordinates: [number, number];
}

type FilterType = 'all' | '2025' | '2024' | 'violent' | 'property' | null;

interface CrimeStore {
  incidents: CrimeData[];
  filteredIncidents: CrimeData[];
  currentFilter: FilterType;
  stats: {
    totalCrimes: number;
    highRiskAreas: number;
    crimeHotspots: number;
    casesSolved: number;
  };
  addIncident: (incident: CrimeData) => void;
  updateStats: (newStats: Partial<CrimeStore['stats']>) => void;
  setFilter: (filter: FilterType) => void;
}

const generateInitialData = (): CrimeData[] => {
  const locations = ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'];
  const violentTypes = ['Assault', 'Robbery', 'Violence'];
  const propertyTypes = ['Theft', 'Burglary', 'Vandalism'];
  const types = [...violentTypes, ...propertyTypes];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `incident-${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    timestamp: formatISO(subHours(new Date(), Math.random() * 24)),
    severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
    coordinates: [
      24.6 + Math.random() * 2,
      72 + Math.random() * 4,
    ],
  }));
};

const filterIncidents = (incidents: CrimeData[], filter: FilterType): CrimeData[] => {
  if (!filter || filter === 'all') return incidents;

  return incidents.filter(incident => {
    const date = parseISO(incident.timestamp);
    const year = date.getFullYear().toString();

    switch (filter) {
      case '2025':
      case '2024':
        return year === filter;
      case 'violent':
        return ['Assault', 'Robbery', 'Violence'].includes(incident.type);
      case 'property':
        return ['Theft', 'Burglary', 'Vandalism'].includes(incident.type);
      default:
        return true;
    }
  });
};

export const useCrimeStore = create<CrimeStore>((set) => ({
  incidents: generateInitialData(),
  filteredIncidents: generateInitialData(),
  currentFilter: null,
  stats: {
    totalCrimes: 1524,
    highRiskAreas: 24,
    crimeHotspots: 163,
    casesSolved: 78,
  },
  addIncident: (incident) => set((state) => {
    const newIncidents = [incident, ...state.incidents];
    return {
      incidents: newIncidents,
      filteredIncidents: filterIncidents(newIncidents, state.currentFilter),
    };
  }),
  updateStats: (newStats) => set((state) => ({
    stats: { ...state.stats, ...newStats },
  })),
  setFilter: (filter) => set((state) => ({
    currentFilter: filter,
    filteredIncidents: filterIncidents(state.incidents, filter),
  })),
}));