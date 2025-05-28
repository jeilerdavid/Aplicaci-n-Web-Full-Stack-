import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LugarForm from './components/LugarForm';
import LugarList from './components/LugarList';
import Mapa from './Mapa'; 
import Login from './components/Login'; 
import './App.css';
import './style.css';


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Para las rutas

const obtenerFondoPorCiudad = (ciudad) => {
  if (!ciudad) return '/backgrounds/default.jpg';
  
  const fondos = {
    "medellin": "medellin.jpg",
    "cali": "cali.jpg",
    "cartagena": "cartagena.png",
    "san andres": "sanandres.jpg",
    "santa marta": "santamarta.jpg",
    "amazonas": "amazonas.jpg",
    "puente de los esclavos": "puentedelosesclavos.jpg"
  };

  
  const clave = ciudad.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return `/backgrounds/${fondos[clave] || 'default.jpg'}`;
};

function App() {
  const [lugares, setLugares] = useState([]);
  const [editar, setEditar] = useState(null);

  //  Manejo de usuario como objeto con rol y nombre
  const [user, setUser] = useState(() => {
    const rol = localStorage.getItem('rol');
    const nombre = localStorage.getItem('nombre');
    return rol && nombre ? { rol, nombre } : null;
  });

  const getLugares = async () => {
    const res = await axios.get('http://localhost:3001/api/lugares');
    setLugares(res.data);
  };

  useEffect(() => {
    getLugares();
  }, []);

  useEffect(() => {
    const ciudadActual = editar?.ciudad || lugares[0]?.ciudad || null;
    const fondo = obtenerFondoPorCiudad(ciudadActual);
    document.body.style.backgroundImage = `url(${fondo})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
  }, [editar, lugares]);

  const handleLogout = () => {
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {/* Header con logout, nombre y rol */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Turismo en Colombia</h1>
          {user && (
            <div>
              <span style={{ marginRight: '10px' }}>
                {user.nombre} ({user.rol})
              </span>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>

        {/* Login si no hay sesión */}
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <>
            {/* Navegación */}
            <nav>
              <Link to="/">Inicio</Link> | <Link to="/mapa">Mapa Turístico</Link>
            </nav>

            <Routes>
              {/* Ruta principal con el CRUD */}
              <Route path="/" element={
                <>
                  {user.rol === 'admin' && (
                    <LugarForm getLugares={getLugares} editar={editar} setEditar={setEditar} />
                  )}

                  <LugarList
                    lugares={lugares}
                    getLugares={getLugares}
                    setEditar={setEditar}
                    user={user} // ✅ pasamos el objeto con rol y nombre
                  />
                </>
              } />

              {/* Ruta para el mapa */}
              <Route path="/mapa" element={<Mapa />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
