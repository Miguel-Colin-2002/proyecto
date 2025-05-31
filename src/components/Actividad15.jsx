import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

function RoutingMachine({ from, to, mode }) {
  const map = useMap();
  const routingControl = useRef(null);

  useEffect(() => {
    if (!from || !to) return;
    if (!map) return;

    if (routingControl.current) {
      map.removeControl(routingControl.current);
    }

    routingControl.current = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      geocoder: L.Control.Geocoder.nominatim(),
      router: L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/${mode}`,
      }),
    }).addTo(map);

    return () => {
      if (routingControl.current) {
        map.removeControl(routingControl.current);
      }
    };
  }, [from, to, map, mode]);

  return null;
}

export default function Actividad15() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [coordsFrom, setCoordsFrom] = useState(null);
  const [coordsTo, setCoordsTo] = useState(null);
  const [mode, setMode] = useState('driving');

  const geocode = async (query) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  };

  const handleRoute = async () => {
    const fromCoords = await geocode(origin);
    const toCoords = await geocode(destination);
    if (fromCoords && toCoords) {
      setCoordsFrom(fromCoords);
      setCoordsTo(toCoords);
    } else {
      alert("No se encontraron coordenadas para alguna dirección.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Actividad 15 – Rutas con direcciones y transporte</h2>

      {/* Explicación requerida */}
      <div className="bg-white p-4 rounded shadow mb-4 text-sm">
        <p><strong>¿Qué se hizo?</strong> Se desarrolló una herramienta que permite ingresar direcciones de origen y destino, trazar la ruta en el mapa y cambiar el modo de transporte entre coche, caminando y bicicleta.</p>
        <p><strong>Herramientas utilizadas:</strong> React, Leaflet, Leaflet Routing Machine, Nominatim, OSRM API.</p>
        <p><strong>¿Qué aprendí?</strong> Aprendí a geocodificar direcciones usando Nominatim, trazar rutas dinámicamente con Leaflet y cambiar entre modos de transporte usando OSRM.</p>
        <p><strong>¿Qué desafíos enfrenté?</strong> El principal reto fue integrar correctamente el sistema de geocodificación y actualizar la ruta al cambiar el modo de transporte sin recargar el mapa.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Dirección de origen"
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Dirección de destino"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleRoute}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Trazar Ruta
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${mode === 'driving' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('driving')}
        >
          🚗 Coche
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'walking' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('walking')}
        >
          🚶 Caminando
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'cycling' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('cycling')}
        >
          🚴 Bicicleta
        </button>
      </div>

      <MapContainer
        center={[23.2494, -106.4111]} // Mazatlán
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordsFrom && coordsTo && <RoutingMachine from={coordsFrom} to={coordsTo} mode={mode} />}
      </MapContainer>
    </div>
  );
}




