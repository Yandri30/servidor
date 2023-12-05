const express = require('express');
const productoController = require('../controllers/ProductoController');
const multipart = require('connect-multiparty');
const path = multipart({ uploadDir: './uploads/productos' }) //RUTA PARA GUARDAR LAS IMAGENES DE LOS PRODUCTOS POR FORMULARIO

const api = express.Router();

api.post('/registrar', path, productoController.registrar);
api.get('/listado/:titulo?', productoController.listarProducto);
api.put('/editar/:id', path, productoController.editarProducto);
api.get('/ver/:id', productoController.obtenerProducto);
api.delete('/eliminar/:id', productoController.eliminarProducto);
api.put('/actualizar/stock/:id', productoController.act_stock);
// api.get('/obtenerImg/:img', productoController.obtenerImagen);

module.exports = api