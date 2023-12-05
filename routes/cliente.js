const express = require('express');
const ClienteController = require('../controllers/ClienteController');

const api = express.Router();

api.post('/registrar', ClienteController.registrar);
api.get('/listar/', ClienteController.listar);
api.get('/ver/:id', ClienteController.obtenerCliente);
api.put('/editar/:id', ClienteController.editarCliente);
api.delete('/eliminar/:id', ClienteController.eliminarCliente);



module.exports = api