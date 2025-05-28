const express = require('express');
const cors = require('cors');
const connection = require('./db'); 
const lugaresRoutes = require('./routes/lugares');

const app = express();

app.use(cors());
app.use(express.json());

// Usar las rutas definidas en rutas/lugares.js
app.use('/api/lugares', lugaresRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
