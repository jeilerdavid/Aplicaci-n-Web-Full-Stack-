import React, { useState } from 'react';

const Login = ({ setUser }) => {
  const [rol, setRol] = useState('publico');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!nombre.trim()) {
      return alert('Por favor, ingresa tu nombre');
    }

    // Validación de contraseña para admin y guía
    if ((rol === 'admin') && password !== '1234') {
      return alert('Contraseña incorrecta');
    }
    if ((rol === 'guia') && password !== '2404') {
      return alert('Contraseña incorrecta');
    }

    // Guardar en localStorage y pasar al estado global
    localStorage.setItem('rol', rol);
    localStorage.setItem('nombre', nombre);
    setUser({ rol, nombre });
  };

  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <h2>Iniciar Sesión</h2>

      <label>Nombre:</label>
      <input
        className="input"
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <label>Rol:</label>
      <select
        className="input"
        value={rol}
        onChange={(e) => setRol(e.target.value)}
      >
        <option value="admin">Administrador</option>
        <option value="guia">Guía Turístico</option>
        <option value="publico">Público General</option>
      </select>

      {/* Campo de contraseña visible solo si no es público */}
      {(rol === 'admin' || rol === 'guia') && (
        <>
          <label>Contraseña:</label>
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}

      <button className="button" type="submit">Ingresar</button>
    </form>
  );
};

export default Login;
