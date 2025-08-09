import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', width: '100%', boxSizing: 'border-box' }}>
      <h1>ℹ️ Acerca del Microfrontend Geo</h1>
      
      <div style={{ marginTop: '30px' }}>
        <section style={{ marginBottom: '30px' }}>
          <h2>🎯 Propósito</h2>
          <p>
            Este microfrontend está diseñado para proporcionar funcionalidades de geolocalización 
            y mapas interactivos a otras aplicaciones dentro del ecosistema de microfrontends.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>🛠️ Tecnologías Utilizadas</h2>
          <ul>
            <li><strong>React 19:</strong> Framework principal</li>
            <li><strong>TypeScript:</strong> Tipado estático</li>
            <li><strong>Vite:</strong> Build tool y servidor de desarrollo</li>
            <li><strong>Leaflet:</strong> Biblioteca de mapas interactivos</li>
            <li><strong>React-Leaflet:</strong> Wrapper de React para Leaflet</li>
            <li><strong>React Router DOM:</strong> Enrutamiento</li>
            <li><strong>Module Federation:</strong> Microfrontend architecture</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>📦 Componentes Exportados</h2>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            fontFamily: 'monospace'
          }}>
            <p><strong>geo/MapComponent</strong> - Componente de mapa reutilizable</p>
            <p><strong>geo/GeoApp</strong> - Aplicación completa con routing</p>
          </div>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>🌍 Ubicación por Defecto</h2>
          <p>
            Los mapas están configurados por defecto para mostrar <strong>Mérida, Venezuela</strong>, 
            conocida como "La Ciudad de los Caballeros" y ubicada en los Andes venezolanos.
          </p>
          <div style={{ 
            backgroundColor: '#e7f3ff', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #007bff'
          }}>
            <p><strong>Coordenadas:</strong> 8.589139, -71.162158</p>
            <p><strong>Altitud:</strong> ~1,600 metros sobre el nivel del mar</p>
          </div>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>🚀 Cómo Usar</h2>
          <p>
            Este microfrontend puede ser consumido por otras aplicaciones usando Module Federation. 
            Consulta la documentación en <code>FEDERATION.md</code> para detalles de implementación.
          </p>
        </section>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link 
            to="/"
            style={{ 
              background: '#007bff', 
              color: 'white', 
              padding: '12px 24px', 
              textDecoration: 'none', 
              borderRadius: '8px',
              display: 'inline-block'
            }}
          >
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
