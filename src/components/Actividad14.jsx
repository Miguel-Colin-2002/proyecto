// src/components/Actividad14.jsx
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

function DrawControl({ onDrawn }) {
  const map = useMap();
  const drawnItems = useRef(new L.FeatureGroup());

  useEffect(() => {
    map.addLayer(drawnItems.current);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        rectangle: true,
        polyline: true,
        circle: false,
        circlemarker: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItems.current,
        remove: true,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e) => {
      drawnItems.current.addLayer(e.layer);
      const coords = e.layer.getLatLngs?.() || [e.layer.getLatLng?.()];
      const flatCoords = coords.flat(1);
      onDrawn(drawnItems.current.getLayers());
    });

    map.on(L.Draw.Event.DELETED, () => {
      onDrawn(drawnItems.current.getLayers());
    });

    return () => {
      map.off();
      map.removeControl(drawControl);
    };
  }, [map, onDrawn]);

  return null;
}

export default function Actividad14() {
  const [features, setFeatures] = useState([]);

  const handleDrawn = (layers) => {
    const result = layers.map((layer) => {
      const latlngs = layer.getLatLngs?.() || [layer.getLatLng?.()];
      return latlngs.flat(1);
    });
    setFeatures(result);
  };

  const handleClearAll = () => {
    location.reload();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Contenido principal del mapa y explicaciones */}
      <div className="w-full lg:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Actividad 14 – Dibujo sobre el Mapa</h2>
        
        {/* Explicación requerida */}
        <div className="bg-white p-4 rounded shadow mb-4 text-sm">
          <p><strong>¿Qué se hizo?</strong> Esta actividad permite al usuario dibujar figuras como polígonos, rectángulos y líneas sobre el mapa, visualizar sus coordenadas, y borrar figuras de forma individual o completamente.</p>
          <p><strong>Herramientas utilizadas:</strong> React, Leaflet, Leaflet Draw, OpenStreetMap.</p>
          <p><strong>¿Qué aprendí?</strong> Aprendí a usar el plugin Leaflet Draw para agregar controles de dibujo en el mapa y capturar datos geoespaciales como coordenadas de los objetos.</p>
          <p><strong>¿Qué desafíos enfrenté?</strong> Integrar la obtención de coordenadas de diferentes tipos de figuras y lograr que el panel lateral se mantuviera sincronizado con las acciones del mapa.</p>
        </div>

        <MapContainer
          center={[19.4, -99.15]}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <DrawControl onDrawn={handleDrawn} />
        </MapContainer>

        <button
          onClick={handleClearAll}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Limpiar mapa
        </button>
      </div>

      {/* Panel lateral de coordenadas */}
      <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded shadow max-h-[540px] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-3">Coordenadas de las figuras</h3>
        {features.length === 0 ? (
          <p className="text-gray-600">No hay figuras dibujadas.</p>
        ) : (
          features.map((shape, i) => (
            <div key={i} className="mb-4 text-sm">
              <strong>Figura {i + 1}:</strong>
              <ul className="list-disc list-inside ml-2">
                {shape.map((point, j) => (
                  <li key={j}>
                    {point.lat.toFixed(5)}, {point.lng.toFixed(5)}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}







