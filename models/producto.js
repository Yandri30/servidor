const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./categoria'); // Asegúrate de que la ruta sea correcta

const Producto = sequelize.define('Producto', {
  titulo: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  imagen: {
    type: DataTypes.STRING,
  },
  precio_compra: {
    type: DataTypes.FLOAT,
  },
  precio_venta: {
    type: DataTypes.FLOAT,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  puntos: {
    type: DataTypes.INTEGER,
  },
});

Producto.belongsTo(Categoria, { foreignKey: 'idcategoria' });

module.exports = Producto;
