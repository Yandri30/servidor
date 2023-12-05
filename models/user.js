const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Reemplaza '../config/db' con la ruta correcta a tu archivo de configuración de Sequelize

const User = sequelize.define('User', {
  nombres: {
    type: DataTypes.STRING,
  },
  apellidos: {
    type: DataTypes.STRING,
  },
  cedula: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
});

module.exports = User;