const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Reemplaza '../config/db' con la ruta correcta a tu archivo de configuración de Sequelize
const Cliente = require('./cliente');
const User = require('./user');

const Venta = sequelize.define('Venta', {
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Venta.belongsTo(Cliente, { foreignKey: 'idcliente' });
Venta.belongsTo(User, { foreignKey: 'iduser' });

module.exports = Venta;