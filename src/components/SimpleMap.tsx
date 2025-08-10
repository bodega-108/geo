import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './SimpleMap.css';

// Componente para centrar el mapa automáticamente
function MapCenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

interface Location {
  id: string | number;
  name: string;
  coordinates: [number, number];
  description: string;
}

interface SimpleMapProps {
  center?: [number, number];
  zoom?: number;
  selectedLocation?: Location;
  allLocations?: Location[];
}

const SimpleMap: React.FC<SimpleMapProps> = ({ 
  center = [8.589139, -71.162158],
  zoom = 13,
  selectedLocation,
  allLocations = []
}) => {
  const mapKey = selectedLocation ? `${String(selectedLocation.id)}-${selectedLocation.coordinates[0]}-${selectedLocation.coordinates[1]}` : 'default';
  
  return (
    <div style={{ height: '400px', width: '100%', border: '2px solid #ddd', borderRadius: '8px' }}>
      <MapContainer
        center={selectedLocation ? selectedLocation.coordinates : center}
        zoom={selectedLocation ? 16 : zoom}
        style={{ height: '100%', width: '100%' }}
        key={mapKey}
        scrollWheelZoom={true}
      >
        <MapCenter 
          center={selectedLocation ? selectedLocation.coordinates : center} 
          zoom={selectedLocation ? 16 : zoom} 
        />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Mostrar todos los marcadores de ubicaciones con iconos estándar */}
        {allLocations.map((location) => (
          <Marker 
            key={location.id}
            position={location.coordinates}
          >
            <Popup>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
                  {location.name}
                  {selectedLocation && String(selectedLocation.id) === String(location.id) && 
                    <span style={{ color: '#ff4444', marginLeft: '8px' }}>🎯</span>
                  }
                </h3>
                <p style={{ margin: '0', fontSize: '14px' }}>{location.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SimpleMap;
