const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2404', 
  port: 3306, 
  database: 'turismo_colombia'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

module.exports = connection;
