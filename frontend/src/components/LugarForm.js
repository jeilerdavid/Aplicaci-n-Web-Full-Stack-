import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LugarForm({ getLugares, editar, setEditar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    ciudad: '',
    descripcion: '',
    imagen_url: '',
    recomendaciones: ''
  });

  useEffect(() => {
    if (editar) setFormData(editar);
  }, [editar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editar) {
        await axios.put(`http://localhost:3001/api/lugares/${editar.id}`, formData);
        setEditar(null);
      } else {
        await axios.post('http://localhost:3001/api/lugares', formData);
      }
      setFormData({
        nombre: '',
        ciudad: '',
        descripcion: '',
        imagen_url: '',
        recomendaciones: ''
      });
      getLugares();
    } catch (error) {
      console.error('Error al guardar el lugar:', error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>{editar ? 'Editar Lugar' : 'Agregar Lugar Turístico'}</h3>

      <input
        className="input"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        name="ciudad"
        placeholder="Ciudad"
        value={formData.ciudad}
        onChange={handleChange}
        required
      />

      <textarea
        className="textarea"
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />

      <input
        className="input"
        name="imagen_url"
        placeholder="URL de la Imagen"
        value={formData.imagen_url}
        onChange={handleChange}
      />

      <textarea
        className="textarea"
        name="recomendaciones"
        placeholder="Recomendaciones"
        value={formData.recomendaciones}
        onChange={handleChange}
      />

      <button className="button" type="submit">
        {editar ? 'Actualizar Lugar' : 'Crear Lugar'}
      </button>
    </form>
  );
}

export default LugarForm;
