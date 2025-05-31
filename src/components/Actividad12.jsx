import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const origin = [23.232769, -106.424426]; // UAS Mazatlán
const destination = [23.202040, -106.424441]; // Plazuela Machado

function RoutingControl() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const control = L.Routing.control({
      waypoints: [
        L.latLng(origin[0], origin[1]),
        L.latLng(destination[0], destination[1])
      ],
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      show: true,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }]
      },
      createMarker: (i, wp) => {
        return L.marker(wp.latLng, {
          draggable: false
        }).bindPopup(i === 0 ? 'Origen: UAS' : 'Destino: Plazuela Machado');
      }
    }).addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
}

export default function Actividad12() {
  return (
    <div className="p-4">
      <div className="mb-4 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">Actividad 12 – Ruta desde UAS hasta Plazuela Machado</h2>
        <p className="mt-2">
          <strong>¿Qué se hizo?</strong> Se implementó una visualización de la ruta desde la Universidad Autónoma de Sinaloa (UAS) hasta la Plazuela Machado en Mazatlán utilizando Leaflet.
        </p>
        <p>
          <strong>Herramientas:</strong> React, Leaflet, Leaflet Routing Machine, OpenStreetMap.
        </p>
        <p>
          <strong>Aprendizaje:</strong> Cómo representar rutas entre dos puntos usando herramientas de código abierto, evitando la necesidad de claves API como en Google Maps.
        </p>
        <p>
          <strong>Desafíos:</strong> Encontrar alternativas sin clave para `DirectionsService` y `DirectionsRenderer`, y comprender la API de `leaflet-routing-machine`.
        </p>
      </div>

      <MapContainer
        center={origin}
        zoom={14}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <RoutingControl />
      </MapContainer>
    </div>
  );
}
