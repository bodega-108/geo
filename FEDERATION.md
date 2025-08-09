# Microfrontend Geo - Module Federation

Este microfrontend expone componentes de mapas usando Leaflet para ser consumidos por otros microfrontends.

## Componentes Expuestos

### GeoApp (Aplicación Completa)

Aplicación completa del microfrontend con React Router y navegación incluida.

**Exposición en Module Federation:**
```
'geo/GeoApp'
```

### MapComponent

Componente de mapa interactivo basado en Leaflet.

**Exposición en Module Federation:**
```
'geo/MapComponent'
```

**Props disponibles:**
```typescript
interface MapComponentProps {
  center?: [number, number];  // Coordenadas [lat, lng] - Por defecto: Mérida, Venezuela
  zoom?: number;              // Nivel de zoom - Por defecto: 13
  height?: string;            // Altura del mapa - Por defecto: '400px'
  width?: string;             // Ancho del mapa - Por defecto: '100%'
}
```

### Componentes de Navegación y Routing

**Navigation**: `'geo/Navigation'` - Barra de navegación con estilos incluidos
**AppRoutes**: `'geo/AppRoutes'` - Configuración de rutas React Router

### Páginas Individuales

**HomePage**: `'geo/HomePage'` - Página de inicio con grid de navegación
**MapPage**: `'geo/MapPage'` - Página dedicada al mapa interactivo
**LocationsPage**: `'geo/LocationsPage'` - Página de ubicaciones con selector interactivo
**AboutPage**: `'geo/AboutPage'` - Página informativa del microfrontend

## Ejemplos de Uso

### 1. Usar la aplicación completa:
```typescript
import React from 'react';

const GeoApp = React.lazy(() => import('geo/GeoApp'));

const MyApp = () => (
  <React.Suspense fallback={<div>Cargando aplicación geo...</div>}>
    <GeoApp />
  </React.Suspense>
);
```

### 2. Usar solo el componente MapComponent:
```typescript
import React from 'react';

const MapComponent = React.lazy(() => import('geo/MapComponent'));

const MyPage = () => (
  <div>
    <h1>Mi Aplicación</h1>
    <React.Suspense fallback={<div>Cargando mapa...</div>}>
      <MapComponent 
        center={[8.589139, -71.162158]} // Mérida Venezuela
        zoom={15}
        height="600px"
      />
    </React.Suspense>
  </div>
);
```

### 3. Usar páginas individuales en tu router:
```typescript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const MapPage = React.lazy(() => import('geo/MapPage'));
const LocationsPage = React.lazy(() => import('geo/LocationsPage'));

const MyAppWithRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/maps" element={
        <React.Suspense fallback={<div>Cargando...</div>}>
          <MapPage />
        </React.Suspense>
      } />
      <Route path="/locations" element={
        <React.Suspense fallback={<div>Cargando...</div>}>
          <LocationsPage />
        </React.Suspense>
      } />
    </Routes>
  </BrowserRouter>
);
```

### 4. Configuración de Module Federation (microfrontend consumidor):
```javascript
// vite.config.ts
federation({
  name: 'consumer-app',
  remotes: {
    geo: 'http://localhost:3001/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom', 'leaflet', 'react-leaflet'],
})
```

## Dependencias Compartidas

Las siguientes dependencias están configuradas como compartidas:
- react
- react-dom  
- react-router-dom
- leaflet
- react-leaflet

## URLs de Desarrollo

- **Servidor de desarrollo:** http://localhost:3001
- **Remote Entry:** http://localhost:3001/assets/remoteEntry.js

## Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Notas Importantes

1. **Leaflet CSS**: El componente MapComponent ya incluye los estilos CSS de Leaflet automáticamente.

2. **Iconos de marcadores**: Se incluye un fix para los iconos por defecto que funciona correctamente con Vite/React.

3. **Responsivo**: El mapa es completamente responsivo y se adapta al contenedor padre.

4. **Interactividad**: Incluye zoom con rueda del mouse, arrastrar para mover, y marcadores con popups.
