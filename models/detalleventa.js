const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Producto = require('./producto');
const Venta = require('./venta');

const DetalleVenta = sequelize.define('DetalleVenta', {
  cantidad: {
    type: DataTypes.INTEGER,
  },
});

DetalleVenta.belongsTo(Producto, { foreignKey: 'idproducto' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'venta' });

module.exports = DetalleVenta;