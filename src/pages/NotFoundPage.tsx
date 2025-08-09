import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ 
      padding: '60px 20px', 
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ fontSize: '6em', marginBottom: '20px' }}>🗺️</div>
      <h1 style={{ fontSize: '3em', color: '#e74c3c', marginBottom: '20px' }}>404</h1>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>¡Oops! Te has perdido en el mapa</h2>
      <p style={{ 
        fontSize: '1.2em', 
        color: '#7f8c8d', 
        marginBottom: '40px',
        lineHeight: '1.6'
      }}>
        La página que buscas no existe en nuestro sistema de geolocalización.
        <br />
        Parece que esta coordenada no está en nuestros mapas.
      </p>
      
      <div style={{ marginBottom: '40px' }}>
        <Link 
          to="/"
          style={{ 
            background: '#3498db', 
            color: 'white', 
            padding: '15px 30px', 
            textDecoration: 'none', 
            borderRadius: '8px',
            display: 'inline-block',
            fontSize: '1.1em',
            margin: '0 10px',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
        >
          🏠 Volver al Inicio
        </Link>
        
        <Link 
          to="/map"
          style={{ 
            background: '#27ae60', 
            color: 'white', 
            padding: '15px 30px', 
            textDecoration: 'none', 
            borderRadius: '8px',
            display: 'inline-block',
            fontSize: '1.1em',
            margin: '0 10px',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#229954'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
        >
          🗺️ Ver Mapa
        </Link>
      </div>

      <div style={{ 
        backgroundColor: '#ecf0f1', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '30px'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>¿Necesitas ayuda para navegar?</h3>
        <p style={{ color: '#7f8c8d', margin: '0' }}>
          Usa la navegación superior para explorar nuestras funcionalidades de mapas 
          y geolocalización en Mérida, Venezuela.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
