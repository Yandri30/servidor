const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Reemplaza '../config/db' con la ruta correcta a tu archivo de configuración de Sequelize

const Cliente = sequelize.define('Cliente', {
  nombres: {
    type: DataTypes.STRING,
  },
  cedula: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },
});

module.exports = Cliente;