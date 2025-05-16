import { io } from 'socket.io-client';
import { useCrimeStore } from '../store/crimeStore';

const WEBSOCKET_URL = 'wss://api.example.com'; // Replace with your actual WebSocket server

export const initializeWebSocket = () => {
  const socket = io(WEBSOCKET_URL, {
    transports: ['websocket'],
  });

  const store = useCrimeStore.getState();

  socket.on('new-incident', (incident) => {
    store.addIncident(incident);
  });

  socket.on('stats-update', (stats) => {
    store.updateStats(stats);
  });

  // Simulate real-time updates for demo
  setInterval(() => {
    const locations = ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'];
    const types = ['Theft', 'Assault', 'Fraud', 'Vandalism'];
    
    const newIncident = {
      id: `incident-${Date.now()}`,
      type: types[Math.floor(Math.random() * types.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: new Date().toISOString(),
      severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
      coordinates: [
        24.6 + Math.random() * 2,
        72 + Math.random() * 4,
      ],
    };

    store.addIncident(newIncident);
  }, 5000);

  return socket;
};