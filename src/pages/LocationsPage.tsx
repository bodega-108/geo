import React, { useState, useEffect } from 'react';
import SimpleMap from '../components/SimpleMap';
import { trackingClient } from '../clients/trackingClient';
import type { Location as ApiLocation } from '../clients/trackingClient';

interface Location {
  id: string | number;
  name: string;
  coordinates: [number, number];
  description: string;
}

const LocationsPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [apiLocations, setApiLocations] = useState<ApiLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ubicaciones estáticas de ejemplo
  const staticLocations: Location[] = [
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

  // Obtener ubicaciones de la API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const locations = await trackingClient.getLocations();
        setApiLocations(locations);
        setError(null);
      } catch (err) {
        setError('Error al cargar las ubicaciones de la API');
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Obtener la última ubicación de la API
  const getLastApiLocation = (): [number, number] | null => {
    if (apiLocations.length === 0) return null;
    
    const lastLocation = apiLocations[apiLocations.length - 1];
    return [parseFloat(lastLocation.latitude), parseFloat(lastLocation.longitude)];
  };

  const defaultLocation = staticLocations[0];
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
          <h3>Ubicaciones de la API:</h3>
          
          {loading && (
            <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', marginBottom: '10px' }}>
              <p>Cargando ubicaciones...</p>
            </div>
          )}
          
          {error && (
            <div style={{ padding: '15px', backgroundColor: '#ffebee', borderRadius: '8px', marginBottom: '10px' }}>
              <p style={{ color: '#c62828' }}>{error}</p>
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {apiLocations.length > 0 ? (
              apiLocations.map((apiLocation) => {
                const coordinates: [number, number] = [
                  parseFloat(apiLocation.latitude), 
                  parseFloat(apiLocation.longitude)
                ];
                
                return (
                  <button
                    key={apiLocation.id}
                    onClick={() => {
                      // Crear un objeto Location compatible con el estado
                      const location: Location = {
                        id: `api-${apiLocation.id}`, // Usar la misma clave que en el mapa
                        name: `Ubicación ${apiLocation.id}`,
                        coordinates: coordinates,
                        description: `Ubicación obtenida de la API - ${new Date(apiLocation.createdAt).toLocaleString()}`
                      };
                      setSelectedLocation(location);
                    }}
                    style={{
                      padding: '15px',
                      border: selectedLocation?.id === apiLocation.id ? '2px solid #007bff' : '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: selectedLocation?.id === apiLocation.id ? '#e7f3ff' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <strong>📍 Ubicación {apiLocation.id}</strong>
                    <br />
                    <small style={{ color: '#666' }}>
                      API ID: {apiLocation.id}
                    </small>
                    <br />
                    <small style={{ color: '#888' }}>
                      Lat: {coordinates[0]}, Lng: {coordinates[1]}
                    </small>
                    <br />
                    <small style={{ color: '#666', fontStyle: 'italic' }}>
                      {new Date(apiLocation.createdAt).toLocaleString()}
                    </small>
                  </button>
                );
              })
            ) : !loading && !error ? (
              <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
                <p style={{ color: '#856404', margin: 0 }}>No hay ubicaciones disponibles en la API</p>
              </div>
            ) : null}
          </div>
          
          {/* Ubicaciones estáticas como respaldo */}
          {apiLocations.length === 0 && !loading && !error && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#666', marginBottom: '10px' }}>Ubicaciones de Ejemplo:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {staticLocations.map((location) => (
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
          )}
        </div>

        {/* Mapa */}
        <div>
          <h3>Mapa - {currentLocation.name}</h3>
          
          {/* Indicador de ubicación seleccionada */}
          {selectedLocation && (
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#e3f2fd', 
              borderRadius: '8px', 
              marginBottom: '10px',
              border: '1px solid #2196f3'
            }}>
              <p style={{ margin: '0', color: '#1976d2', fontWeight: '500' }}>
                🎯 <strong>{selectedLocation.name}</strong> seleccionada en el mapa
              </p>
            </div>
          )}
          
          {/* Estado de carga y error */}
          {loading && (
            <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', marginBottom: '10px' }}>
              <p>Cargando ubicaciones de la API...</p>
            </div>
          )}
          
          {error && (
            <div style={{ padding: '15px', backgroundColor: '#ffebee', borderRadius: '8px', marginBottom: '10px' }}>
              <p style={{ color: '#c62828' }}>{error}</p>
            </div>
          )}
          
          {/* Mapa con marcadores dinámicos */}
          <SimpleMap 
            center={getLastApiLocation() || currentLocation.coordinates}
            zoom={15}
            selectedLocation={selectedLocation || undefined}
            allLocations={[
              ...staticLocations.map(location => ({
                ...location,
                id: `static-${location.id}` // Prefijo para ubicaciones estáticas
              })),
              ...(apiLocations.length > 0 ? apiLocations.map(apiLocation => ({
                id: `api-${apiLocation.id}`, // Prefijo para ubicaciones de la API
                name: `Ubicación ${apiLocation.id}`,
                coordinates: [parseFloat(apiLocation.latitude), parseFloat(apiLocation.longitude)] as [number, number],
                description: `Ubicación obtenida de la API - ${new Date(apiLocation.createdAt).toLocaleString()}`
              })) : [])
            ]}
          />
          
          {/* Comentado temporalmente para pruebas
          <MapComponent 
            center={getLastApiLocation() || currentLocation.coordinates}
            zoom={15}
            height="400px"
            width="100%"
            markers={[
              // Marcador de la ubicación seleccionada
              ...(selectedLocation ? [{
                position: selectedLocation.coordinates,
                popup: `${selectedLocation.name} - ${selectedLocation.description}`,
                color: '#007bff'
              }] : []),
              // Marcador de la última ubicación de la API
              ...(getLastApiLocation() ? [{
                position: getLastApiLocation()!,
                popup: 'Última ubicación de la API',
                color: '#28a745'
              }] : [])
            ]}
            selectedMarker={selectedLocation?.coordinates}
          />
          */}
          
          {/* Información de la ubicación actual */}
          <div style={{ 
            marginTop: '10px', 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px' 
          }}>
            <h4>{currentLocation.name}</h4>
            <p>{currentLocation.description}</p>
            <p><strong>Coordenadas:</strong> {currentLocation.coordinates[0]}, {currentLocation.coordinates[1]}</p>
            
            {/* Información de la última ubicación de la API */}
            {getLastApiLocation() && (
              <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px', border: '1px solid #4caf50' }}>
                <h5 style={{ color: '#2e7d32', margin: '0 0 10px 0' }}>📍 Última Ubicación de la API</h5>
                <p style={{ margin: '5px 0' }}><strong>Latitud:</strong> {getLastApiLocation()![0]}</p>
                <p style={{ margin: '5px 0' }}><strong>Longitud:</strong> {getLastApiLocation()![1]}</p>
                <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#666' }}>
                  <strong>Actualizado:</strong> {apiLocations.length > 0 ? new Date(apiLocations[apiLocations.length - 1].createdAt).toLocaleString() : 'N/A'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
