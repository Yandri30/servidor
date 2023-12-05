const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Reemplaza '../config/db' con la ruta correcta a tu archivo de configuración de Sequelize

const Categoria = sequelize.define('Categoria', {
  titulo: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
});

module.exports = Categoria;