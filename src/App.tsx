import React from 'react';
import MapComponent from './components/MapComponent';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>App local del microfrontend Geo</h1>
      <p>Mapa con Leaflet integrado:</p>
      <MapComponent />
    </div>
  );
};

export default App;
