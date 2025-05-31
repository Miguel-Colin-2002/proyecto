import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

const ClusterMap = () => {
  const map = useMap();

  useEffect(() => {
    const markers = L.markerClusterGroup();

    for (let i = 0; i < 100; i++) {
      const lat = 19 + Math.random() * 2;
      const lng = -100 + Math.random() * 2;
      const marker = L.marker([lat, lng]);
      marker.bindPopup(`Marcador ${i + 1}`);
      markers.addLayer(marker);
    }

    map.addLayer(markers);

    return () => {
      map.removeLayer(markers);
    };
  }, [map]);

  return null;
};

export default function Actividad13() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Actividad 13 – Agrupación de Marcadores</h2>

      {/* Explicación requerida */}
      <div className="bg-white p-4 rounded shadow mb-4 text-sm">
        <p><strong>¿Qué se hizo?</strong> Se generaron 100 marcadores aleatorios y se agruparon usando la funcionalidad de clustering de Leaflet para evitar la saturación del mapa.</p>
        <p><strong>Herramientas utilizadas:</strong> React, Leaflet, React-Leaflet, Leaflet.markercluster.</p>
        <p><strong>¿Qué aprendí?</strong> Aprendí a integrar `leaflet.markercluster` con React y a mejorar el rendimiento visual agrupando múltiples marcadores en zonas densas.</p>
        <p><strong>¿Qué desafíos enfrenté?</strong> La principal dificultad fue importar correctamente los estilos y scripts de la librería de agrupamiento para que funcionaran con React.</p>
      </div>

      <MapContainer center={[20, -99]} zoom={6} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <ClusterMap />
      </MapContainer>
    </div>
  );
}



