import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRoutes from './routes/AppRoutes';

// Componente para uso standalone (con BrowserRouter)
const GeoApp: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 w-full m-0 p-0">
        <Navigation />
        <main className="w-full">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default GeoApp;
