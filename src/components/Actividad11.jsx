import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Actividad11() {
  const position = [19.4326, -99.1332]; // Ciudad de México

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Actividad 11 – Marcador Básico</h2>

      {/* Explicación requerida */}
      <div className="bg-white p-4 rounded shadow mb-4 text-sm">
        <p><strong>¿Qué se hizo?</strong> Se colocó un mapa centrado en la Ciudad de México y se añadió un marcador con un popup descriptivo usando Leaflet y React.</p>
        <p><strong>Herramientas utilizadas:</strong> React, Leaflet, React-Leaflet.</p>
        <p><strong>¿Qué aprendí?</strong> Aprendí a inicializar un mapa con Leaflet, centrarlo en una ubicación específica y agregar un marcador con un mensaje emergente.</p>
        <p><strong>¿Qué desafíos enfrenté?</strong> No hubo grandes dificultades, pero fue importante entender cómo funcionan los componentes básicos de Leaflet en React.</p>
      </div>

      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={position}>
          <Popup>Ciudad de México</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
