import express from 'express';

import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3001;

// Configuración CORS
app.use(cors({
  origin: '*',
  credentials: true
}));

// Servir archivos estáticos desde dist
app.use(express.static(path.join(__dirname, 'dist')));

// Manejar cualquier ruta y servir index.html
app.use('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Microfrontend remoto escuchando en http://localhost:${port}`);
});
