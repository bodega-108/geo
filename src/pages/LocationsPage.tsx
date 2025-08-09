import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';

interface Location {
  id: number;
  name: string;
  coordinates: [number, number];
  description: string;
}

const LocationsPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const locations: Location[] = [
    {
      id: 1,
      name: "Mérida Centro",
      coordinates: [8.589139, -71.162158],
      description: "Centro histórico de Mérida, Venezuela"
    },
    {
      id: 2,
      name: "Universidad de los Andes",
      coordinates: [8.606389, -71.156111],
      description: "Campus principal de la ULA"
    },
    {
      id: 3,
      name: "Teleférico de Mérida",
      coordinates: [8.596944, -71.144722],
      description: "Estación base del teleférico más alto del mundo"
    },
    {
      id: 4,
      name: "Plaza Bolívar",
      coordinates: [8.588889, -71.156667],
      description: "Plaza principal de la ciudad"
    }
  ];

  const defaultLocation = locations[0];
  const currentLocation = selectedLocation || defaultLocation;

  return (
    <div style={{ padding: '20px', width: '100%', boxSizing: 'border-box' }}>
      <h1>📍 Ubicaciones de Interés</h1>
      <p>Explora diferentes ubicaciones importantes en Mérida, Venezuela.</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr', 
        gap: '20px', 
        marginTop: '20px' 
      }}>
        {/* Lista de ubicaciones */}
        <div>
          <h3>Ubicaciones Disponibles:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                style={{
                  padding: '15px',
                  border: selectedLocation?.id === location.id ? '2px solid #007bff' : '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: selectedLocation?.id === location.id ? '#e7f3ff' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <strong>{location.name}</strong>
                <br />
                <small style={{ color: '#666' }}>{location.description}</small>
                <br />
                <small style={{ color: '#888' }}>
                  Lat: {location.coordinates[0]}, Lng: {location.coordinates[1]}
                </small>
              </button>
            ))}
          </div>
        </div>

        {/* Mapa */}
        <div>
          <h3>Mapa - {currentLocation.name}</h3>
          <MapComponent 
            center={currentLocation.coordinates}
            zoom={15}
            height="400px"
            width="100%"
          />
          <div style={{ 
            marginTop: '10px', 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px' 
          }}>
            <h4>{currentLocation.name}</h4>
            <p>{currentLocation.description}</p>
            <p><strong>Coordenadas:</strong> {currentLocation.coordinates[0]}, {currentLocation.coordinates[1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
