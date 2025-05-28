const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../db');

const JWT_SECRET = 'estudiante123';

// Login
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    const usuario = usuarios[0];

    if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al autenticar' });
  }
});

// Middleware para verificar token
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Middleware para permitir por rol
function permitirRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ error: 'Acceso denegado: rol no autorizado' });
    }
    next();
  };
}

// Obtener usuarios (restringe esto si quieres solo para admins luego)
router.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
});

module.exports = {
  router,
  verificarToken,
  permitirRoles
};
module.exports = { verificarToken, permitirRoles };