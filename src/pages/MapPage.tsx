import React from 'react';
import MapComponent from '../components/MapComponent';

const MapPage: React.FC = () => {
  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">🗺️ Mapa Interactivo</h1>
      <p className="text-gray-600 mb-6">Mapa centrado en Mérida, Venezuela con funcionalidades interactivas.</p>
      
      <div className="mt-6">
        <MapComponent 
          center={[8.589139, -71.162158]} // Mérida Venezuela
          zoom={13}
          height="600px"
          width="100%"
        />
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Características del Mapa:</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <span className="mr-2">📍</span>
            <span>Centrado en Mérida, Venezuela</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">🔍</span>
            <span>Zoom interactivo con rueda del mouse</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">🖱️</span>
            <span>Arrastrar para mover el mapa</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">📌</span>
            <span>Marcador con popup informativo</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">📱</span>
            <span>Completamente responsivo</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MapPage;
