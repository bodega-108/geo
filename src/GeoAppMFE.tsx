import React from 'react';
import Navigation from './components/Navigation';
import AppRoutes from './routes/AppRoutes';

// Componente específico para uso como microfrontend (sin BrowserRouter)
const GeoAppMFE: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="w-full">
        <AppRoutes />
      </main>
    </div>
  );
};

export default GeoAppMFE;
