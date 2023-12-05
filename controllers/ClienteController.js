const Cliente = require('../models/cliente');

async function registrar(req, res) {
    try {
      const data = req.body;
  
      const cliente = await Cliente.create({
        nombres: data.nombres,
        cedula: data.cedula,
        correo: data.correo,
        telefono: data.telefono,
        direccion: data.direccion
      });
  
      res.status(200).send({ cliente });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async function listar(req, res) {
    try {
      const clientes_data = await Cliente.findAll();
  
      if (clientes_data.length > 0) {
        res.status(200).send({ clientes: clientes_data });
      } else {
        res.status(403).send({ message: 'No existe el cliente en el sistema' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  async function obtenerCliente(req, res) {
    try {
      const id = req.params['id'];
  
      const cliente_data = await Cliente.findByPk(id);
  
      if (cliente_data) {
        res.status(200).send({ cliente: cliente_data });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
  

  async function editarCliente(req, res) {
    try {
      const id = req.params['id'];
      const data = req.body;
  
      const cliente_edit = await Cliente.update(
        {
          nombres: data.nombres,
          cedula: data.cedula,
          correo: data.correo,
          telefono: data.telefono,
          direccion: data.direccion,
        },
        { where: { id: id } }
      );
  
      if (cliente_edit) {
        res.status(200).send({ cliente: cliente_edit });
      } else {
        res.status(500).send(err);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async function eliminarCliente(req, res) {
    try {
      const id = req.params['id'];
  
      const cliente_eliminado = await Cliente.destroy({
        where: { id: id }
      });
  
      if (cliente_eliminado) {
        res.status(200).send({ cliente: cliente_eliminado });
      } else {
        res.status(500).send(err);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
  

module.exports = {

    registrar,
    editarCliente,
    obtenerCliente,
    listar,
    eliminarCliente

}
