import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

// Fix para los iconos por defecto de Leaflet con Vite/React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  width?: string;
  markers?: Array<{
    position: [number, number];
    popup?: string;
    color?: string;
  }>;
  selectedMarker?: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({
  center = [8.589139, -71.162158], // Mérida Venezuela
  zoom = 13,
  height = '400px',
  width = '100%',
  markers = []
}) => {
  const mapStyle = {
    height,
    width,
  };

  // Si no hay marcadores personalizados, usar el marcador por defecto
  const defaultMarkers = markers.length === 0 ? [{ position: center, popup: 'Marcador de ejemplo' }] : markers;

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={mapStyle}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Renderizar marcadores simples sin iconos personalizados */}
        {defaultMarkers.map((marker, index) => (
          <Marker 
            key={`marker-${index}`} 
            position={marker.position}
          >
            <Popup>
              {marker.popup || `Marcador ${index + 1}`}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
