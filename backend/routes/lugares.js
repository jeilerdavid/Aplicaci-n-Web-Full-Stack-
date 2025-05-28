const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los lugares turísticos
router.get('/', (req, res) => {
  db.query('SELECT * FROM lugares_turisticos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener un lugar turístico por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM lugares_turisticos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json(results[0]);
  });
});

// Crear un nuevo lugar turístico
router.post('/', (req, res) => {
  const { nombre, ciudad, descripcion, imagen_url, recomendaciones, latitud, longitud } = req.body;
  const sql = 'INSERT INTO lugares_turisticos (nombre, ciudad, descripcion, imagen_url, recomendaciones, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, ciudad, descripcion, imagen_url, recomendaciones, latitud, longitud], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId });
  });
});

// Actualizar un lugar turístico
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, ciudad, descripcion, imagen_url, recomendaciones, latitud, longitud } = req.body;
  const sql = 'UPDATE lugares_turisticos SET nombre = ?, ciudad = ?, descripcion = ?, imagen_url = ?, recomendaciones = ?, latitud = ?, longitud = ? WHERE id = ?';
  db.query(sql, [nombre, ciudad, descripcion, imagen_url, recomendaciones, latitud, longitud, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Actualizado con éxito' });
  });
});

// Eliminar un lugar turístico
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM lugares_turisticos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Eliminado con éxito' });
  });
});

// Actualizar solo la imagen del lugar
router.put('/:id/imagen', (req, res) => {
  const id = req.params.id;
  const { imagen_url } = req.body;
  const sql = 'UPDATE lugares_turisticos SET imagen_url = ? WHERE id = ?';
  db.query(sql, [imagen_url, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Imagen actualizada con éxito' });
  });
});

// Obtener reseñas por lugar (más recientes primero)
router.get('/:id/resenas', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM resenas WHERE lugar_id = ? ORDER BY fecha DESC', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Crear nueva reseña
router.post('/:id/resenas', (req, res) => {
  const id = req.params.id;
  const { contenido, estrellas, nombre } = req.body;
  db.query(
    'INSERT INTO resenas (lugar_id, contenido, estrellas, nombre) VALUES (?, ?, ?, ?)',
    [id, contenido, estrellas, nombre],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Reseña guardada con éxito' });
    }
  );
});

module.exports = router;
