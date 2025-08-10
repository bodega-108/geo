import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: 'geo',
      filename: 'remoteEntry.js',
      exposes: {
        './GeoApp': './src/GeoApp.tsx',
        './GeoAppMFE': './src/GeoAppMFE.tsx',
        './MapComponent': './src/components/MapComponent.tsx',
        './Navigation': './src/components/Navigation.tsx',
        './AppRoutes': './src/routes/AppRoutes.tsx',
        './HomePage': './src/pages/HomePage.tsx',
        './MapPage': './src/pages/MapPage.tsx',
        './LocationsPage': './src/pages/LocationsPage.tsx',
        './AboutPage': './src/pages/AboutPage.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'leaflet', 'react-leaflet'],
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3001,
    cors: {
      origin: [
        'https://mfe-host-stage.up.railway.app',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173'
      ],
      credentials: true,
    },
  }
})