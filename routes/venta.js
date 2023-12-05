const express = require('express');
const ventaController = require('../controllers/VentaController');

const api = express.Router();

api.post('/nuevaVenta', ventaController.registrarVenta)
api.get('/obtenerVenta/:id', ventaController.obtenerVenta)
api.get('/listado/user/:id', ventaController.listadoVentaUser)
api.get('/listadoAdmin', ventaController.listadoVentaAdmin)
api.get('/detalle/:id', ventaController.detalleVenta)
api.delete('/eliminar/:id', ventaController.eliminarVenta)

module.exports = api