import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Mostrar estrellas visuales
const StarRating = ({ rating }) => {
  const estrellas = [];
  for (let i = 1; i <= 5; i++) {
    estrellas.push(
      <span key={i} style={{ color: i <= rating ? '#f1c40f' : '#ccc' }}>★</span>
    );
  }
  return <span>{estrellas}</span>;
};

function LugarList({ lugares, getLugares, setEditar, user }) {
  const [reseñas, setReseñas] = useState({});
  const [ratings, setRatings] = useState({});
  const [resenasDB, setResenasDB] = useState({});

  const eliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/lugares/${id}`);
      getLugares();
    } catch (error) {
      console.error('Error eliminando:', error);
    }
  };

  const handleReseña = async (id) => {
    const texto = reseñas[id];
    const estrellas = ratings[id] || 0;
    if (!texto || estrellas === 0) return alert("Debes escribir una reseña y calificar con estrellas.");
    try {
      await axios.post(`http://localhost:3001/api/lugares/${id}/resenas`, {
        contenido: texto,
        estrellas,
        nombre: user.nombre
      });
      alert("¡Reseña guardada con éxito!");
      setReseñas({ ...reseñas, [id]: '' });
      setRatings({ ...ratings, [id]: 0 });
      fetchResenas(id);
    } catch (error) {
      console.error("Error guardando reseña:", error);
    }
  };

  const fetchResenas = async (lugarId) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/lugares/${lugarId}/resenas`);
      setResenasDB(prev => ({ ...prev, [lugarId]: res.data }));
    } catch (error) {
      console.error("Error obteniendo reseñas:", error);
    }
  };

  useEffect(() => {
    lugares.forEach((lugar) => fetchResenas(lugar.id));
  }, [lugares]);

  const handleCambiarImagen = async (id) => {
    const nuevaImg = reseñas[`img-${id}`];
    if (!nuevaImg) return alert("Debes ingresar una URL válida para la imagen.");
    try {
      await axios.put(`http://localhost:3001/api/lugares/${id}/imagen`, { imagen_url: nuevaImg });
      alert("Imagen actualizada exitosamente");
      setReseñas({ ...reseñas, [`img-${id}`]: '' });
      getLugares();
    } catch (error) {
      console.error('Error actualizando imagen:', error);
      alert("Error al actualizar la imagen.");
    }
  };

  return (
    <div>
      <h3>Lugares Turísticos</h3>
      <ul className="card-container">
        {lugares.map(lugar => (
          <li key={lugar.id} className="card">
            <h4>{lugar.nombre} - {lugar.ciudad}</h4>
            <p>{lugar.descripcion}</p>
            {lugar.imagen_url && <img src={lugar.imagen_url} alt={lugar.nombre} width="100%" style={{ borderRadius: '8px' }} />}
            <p><strong>Tips:</strong> {lugar.recomendaciones}</p>

            {user?.rol === 'admin' && (
              <>
                <button onClick={() => setEditar(lugar)}>Editar</button>
                <button onClick={() => eliminar(lugar.id)}>Eliminar</button>
              </>
            )}

            {user?.rol === 'guia' && (
              <div style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Nueva URL de imagen"
                  value={reseñas[`img-${lugar.id}`] || ''}
                  onChange={(e) =>
                    setReseñas({ ...reseñas, [`img-${lugar.id}`]: e.target.value })
                  }
                />
                <button onClick={() => handleCambiarImagen(lugar.id)}>Cambiar Imagen</button>
              </div>
            )}

            {user?.rol === 'publico' && (
              <div style={{ marginTop: '10px' }}>
                <textarea
                  placeholder="Escribe tu reseña..."
                  value={reseñas[lugar.id] || ''}
                  onChange={(e) => setReseñas({ ...reseñas, [lugar.id]: e.target.value })}
                />
                <div>
                  Calificación:&nbsp;
                  {[1, 2, 3, 4, 5].map(num => (
                    <span
                      key={num}
                      style={{ cursor: 'pointer', color: num <= (ratings[lugar.id] || 0) ? '#f1c40f' : '#ccc' }}
                      onClick={() => setRatings({ ...ratings, [lugar.id]: num })}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <button onClick={() => handleReseña(lugar.id)}>Enviar reseña</button>
              </div>
            )}

            {resenasDB[lugar.id]?.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <strong>Reseñas de otros usuarios:</strong>
                <ul>
                  {resenasDB[lugar.id].map(resena => (
                    <li key={resena.id}>
                      <StarRating rating={resena.estrellas} /> – {resena.contenido}
                      <br />
                      <em>por {resena.nombre}</em>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ratings[lugar.id] > 0 && (
              <p><strong>Tu calificación:</strong> <StarRating rating={ratings[lugar.id]} /></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LugarList;
