import { MapContainer, TileLayer, ZoomControl, Marker, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// --- ICONOS ---
// Icono de coche
const createCarIcon = (rotation, isDark, isAssigned) => {
    const color = isAssigned ? '#22c55e' : (isDark ? '#FFF' : '#333'); // Green if assigned
    const detailColor = isAssigned ? '#000' : (isDark ? '#AAA' : '#666');

    // Si está asignado, un poco más grande
    const size = isAssigned ? 40 : 32;
    const anchor = isAssigned ? 20 : 16;

    const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" style="transform: rotate(${rotation}deg); transform-origin: center; filter: ${isAssigned ? 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))' : 'none'};">
    <path fill="${color}" stroke="none" d="M12 2L15 4V8L18 9V17H16V19H14V17H10V19H8V17H6V9L9 8V4L12 2Z"/>
    <rect x="7" y="10" width="2" height="4" fill="${detailColor}" rx="1"/>
    <rect x="15" y="10" width="2" height="4" fill="${detailColor}" rx="1"/>
    ${isAssigned ? `<circle cx="12" cy="12" r="2" fill="white" />` : ''} 
  </svg>`;
    return L.divIcon({ html: svg, className: 'car-icon', iconSize: [size, size], iconAnchor: [anchor, anchor] });
};

// Icono de Pin de Destino
const createDestinationIcon = (isDark) => L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isDark ? '#4ade80' : 'black'}" width="32" height="32"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: 'dest-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 30],
});

// Icono de Origen (Usuario)
const createOriginIcon = (isDark) => L.divIcon({
    html: `<div style="background-color: ${isDark ? '#60a5fa' : 'black'}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
    className: 'origin-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

// Componente auxiliar para manejar clicks en el mapa
const MapEvents = ({ active, onClick }) => {
    useMapEvents({
        click(e) {
            if (active) onClick(e.latlng);
        },
    });
    return null;
};

const Map = ({ onMapClick, destination, userLocation, darkMode, rideStatus, onPickup }) => {
    const [cars, setCars] = useState([]);
    const [routePath, setRoutePath] = useState([]);
    const [assignedCarId, setAssignedCarId] = useState(null);

    // Inicializar Coches
    useEffect(() => {
        if (!userLocation) return;
        const initialCars = Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            lat: userLocation[0] + (Math.random() - 0.5) * 0.015,
            lng: userLocation[1] + (Math.random() - 0.5) * 0.015,
            angle: Math.random() * 360,
            speed: 0.00003 + Math.random() * 0.00003,
        }));
        setCars(initialCars);
    }, [userLocation]);

    // Manejar asignación de conductor
    useEffect(() => {
        if (rideStatus === 'assigned' && assignedCarId === null && cars.length > 0) {
            // Elegir el coche más cercano (o uno aleatorio para simplificar)
            const randomCar = cars[Math.floor(Math.random() * cars.length)];
            setAssignedCarId(randomCar.id);
        }
        else if (rideStatus === 'idle') {
            setAssignedCarId(null);
        }
    }, [rideStatus, cars, assignedCarId]);

    // Simulación de Movimiento
    useEffect(() => {
        const interval = setInterval(() => {
            setCars(currentCars => currentCars.map(car => {
                // --- Lógica para Coche ASIGNADO o EN VIAJE ---
                if (car.id === assignedCarId) {
                    let targetLat, targetLng;

                    if (rideStatus === 'assigned') {
                        // Ir hacia el usuario
                        targetLat = userLocation[0];
                        targetLng = userLocation[1];
                    } else if (rideStatus === 'riding') {
                        // Ir hacia el destino
                        if (destination) {
                            targetLat = destination[0];
                            targetLng = destination[1];
                        } else {
                            return car;
                        }
                    } else {
                        // Si no es ninguno de esos estados, no hacer nada especial (o volver a vagar)
                        // Pero aquí asumimos que entra porque el ID coincide
                        // Si está en 'idle' assignedCarId debería ser null, así que no entraría aquí.
                        return car;
                    }

                    // Calcular dirección hacia el objetivo
                    const dLat = targetLat - car.lat;
                    const dLng = targetLng - car.lng;
                    const dist = Math.sqrt(dLat * dLat + dLng * dLng);

                    // Si llegó
                    if (dist < 0.0001) {
                        if (rideStatus === 'assigned') {
                            // Llegó al usuario: Notificar Pickup
                            onPickup();
                        }
                        return car;
                    }

                    // Moverse hacia el objetivo
                    const speed = 0.00020; // Un poco más rápido

                    return {
                        ...car,
                        lat: car.lat + (dLat / dist) * speed,
                        lng: car.lng + (dLng / dist) * speed,
                        angle: (Math.atan2(dLng, dLat) * (180 / Math.PI))
                    };
                }

                // --- Lógica para Otros Coches (Patrullando) ---
                const rad = (car.angle - 90) * (Math.PI / 180);
                let newAngle = car.angle;
                if (Math.random() < 0.02) newAngle += (Math.random() > 0.5 ? 90 : -90);
                return {
                    ...car,
                    lat: car.lat + Math.sin(rad) * car.speed,
                    lng: car.lng + Math.cos(rad) * car.speed,
                    angle: newAngle
                };
            }));
        }, 100);
        return () => clearInterval(interval);
    }, [assignedCarId, userLocation, rideStatus, onPickup, destination]);

    // Mapa follow logic (FlyTo car)
    const MapFollower = ({ carId, cars, active }) => {
        const map = useMapEvents({});
        useEffect(() => {
            if (!active || carId === null) return;
            const car = cars.find(c => c.id === carId);
            if (car) {
                map.setView([car.lat, car.lng], 16, { animate: true, duration: 0.1 });
            }
        }, [cars, carId, active, map]);
        return null;
    };

    if (!userLocation) return null;

    return (
        <MapContainer center={userLocation} zoom={15} zoomControl={false} className="h-full w-full z-0">
            <TileLayer
                attribution='&copy; CARTO'
                url={darkMode
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                }
            />

            <MapEvents active={rideStatus === 'idle'} onClick={onMapClick} />

            {/* Cámara sigue al coche en modo 'riding' */}
            <MapFollower carId={assignedCarId} cars={cars} active={rideStatus === 'riding'} />

            {cars.map(car => (
                <Marker
                    key={car.id}
                    position={[car.lat, car.lng]}
                    icon={createCarIcon(car.angle, darkMode, car.id === assignedCarId)}
                    zIndexOffset={car.id === assignedCarId ? 1000 : 0}
                />
            ))}

            {/* Ocultar marcador de usuario si estamos en el coche (opcional, pero realista) */}
            {rideStatus !== 'riding' && (
                <Marker position={userLocation} icon={createOriginIcon(darkMode)} />
            )}

            {destination && (
                <>
                    <Marker position={destination} icon={createDestinationIcon(darkMode)} />
                    <Polyline
                        positions={routePath}
                        color={darkMode ? "#4ade80" : "black"}
                        weight={4}
                        opacity={0.6}
                        dashArray="10, 10"
                    />
                </>
            )}

            <ZoomControl position="bottomright" />
        </MapContainer>
    );
};

export default Map;
