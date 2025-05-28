// Mapa.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icono personalizado
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Coordenadas de lugares turísticos
const lugares = [
  {
    nombre: 'Medellín',
    descripcion: 'Ciudad de la eterna primavera.',
    coords: [6.2442, -75.5812],
  },
  {
    nombre: 'Cali',
    descripcion: 'Capital de la salsa.',
    coords: [3.4516, -76.5320],
  },
  {
    nombre: 'Cartagena',
    descripcion: 'Ciudad amurallada con playas hermosas.',
    coords: [10.3910, -75.4794],
  },
  {
    nombre: 'San Andrés',
    descripcion: 'Isla del mar de los siete colores.',
    coords: [12.5847, -81.7006],
  },
  {
    nombre: 'Santa Marta',
    descripcion: 'Conexión con la Sierra Nevada y el mar.',
    coords: [11.2408, -74.1990],
  },
  {
    nombre: 'Amazonas',
    descripcion: 'Selva, biodiversidad y culturas indígenas.',
    coords: [-3.7763, -70.2970],
  },
  {
    nombre: 'Puente de los Esclavos',
    descripcion: 'Lugar histórico de importancia nacional.',
    coords: [4.5921, -74.1001],
  },
];

export default function Mapa() {
  return (
    <div style={{ height: '90vh', padding: '20px' }}>
      <h2>Mapa Turístico de Colombia</h2>
      <MapContainer center={[5.5, -74.0]} zoom={5.5} style={{ height: '80vh', borderRadius: '10px' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lugares.map((lugar, index) => (
          <Marker key={index} position={lugar.coords}>
            <Popup>
              <strong>{lugar.nombre}</strong><br />
              {lugar.descripcion}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
