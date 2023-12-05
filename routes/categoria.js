const express = require('express');
const CategoriaController = require('../controllers/CategoriaController');

const api = express.Router();

api.post('/registrar', CategoriaController.registrar);
api.get('/ver/:id', CategoriaController.obtenerCategoria);
api.put('/editar/:id', CategoriaController.editarCategoria);
api.delete('/eliminar/:id', CategoriaController.eliminarCategoria);
api.get('/listado', CategoriaController.listarCategoria)

module.exports = api