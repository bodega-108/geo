import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">🗺️ Microfrontend Geo - Inicio</h1>
      <p className="text-gray-600 mb-8">Bienvenido al sistema de geolocalización y mapas.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="card text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🗺️ Mapa Interactivo</h3>
          <p className="text-gray-600 mb-4">Explora mapas interactivos con Leaflet</p>
          <Link 
            to="/map" 
            className="btn-primary inline-block"
          >
            Ver Mapa
          </Link>
        </div>

        <div className="card text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">📍 Ubicaciones</h3>
          <p className="text-gray-600 mb-4">Gestiona y visualiza ubicaciones</p>
          <Link 
            to="/locations" 
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors duration-200 inline-block"
          >
            Ver Ubicaciones
          </Link>
        </div>

        <div className="card text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">ℹ️ Acerca de</h3>
          <p className="text-gray-600 mb-4">Información sobre este microfrontend</p>
          <Link 
            to="/about" 
            className="btn-secondary inline-block"
          >
            Más Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
