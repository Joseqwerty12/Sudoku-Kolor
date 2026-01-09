import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Map from './components/Map';
import RideRequestPanel from './components/RideRequestPanel';

function App() {
  const [userLocation] = useState([-33.4489, -70.6693]); // Santiago Centro
  const [destination, setDestination] = useState(null);

  // Status: 'idle' | 'searching' | 'assigned' | 'riding'
  const [rideStatus, setRideStatus] = useState('idle');
  const [darkMode, setDarkMode] = useState(false);

  const handleMapClick = (latlng) => {
    if (rideStatus !== 'idle') return;
    setDestination([latlng.lat, latlng.lng]);
  };

  const handleConfirmRide = () => {
    setRideStatus('searching');

    // Simular búsqueda de conductor por 3 segundos
    setTimeout(() => {
      setRideStatus('assigned');
    }, 3000);
  };

  const handlePickup = () => {
    setRideStatus('riding');
  };

  return (
    <div className={`h-screen w-screen relative overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="h-full w-full absolute top-0 left-0 z-0">
        <Map
          userLocation={userLocation}
          destination={destination}
          onMapClick={handleMapClick}
          darkMode={darkMode}
          rideStatus={rideStatus}
          onPickup={handlePickup}
        />
      </div>

      {/* Header Overlay */}
      <div className={`absolute top-4 left-4 z-[900] ${darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-100'} backdrop-blur-sm px-4 py-2 rounded-full shadow-md border flex items-center gap-2 transition-colors duration-300`}>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <h1 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Humango</h1>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 z-[900] p-3 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300 ${darkMode
          ? 'bg-gray-800/90 text-yellow-400 border-gray-700 hover:bg-gray-700'
          : 'bg-white/90 text-gray-600 border-gray-100 hover:bg-gray-50'
          }`}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <RideRequestPanel
        destination={destination}
        status={rideStatus}
        onConfirm={handleConfirmRide}
        darkMode={darkMode}
      />
    </div>
  )
}

export default App
