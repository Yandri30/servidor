const Categoria = require('../models/categoria');
const { Op } = require('sequelize');
async function registrar(req, res) {
    try {
      const data = req.body; // Aquí van todos los datos del formulario
  
      const categoria = await Categoria.create({
        titulo: data.titulo,
        descripcion: data.descripcion
      });
  
      res.status(200).send({ categoria });
    } catch (error) {
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }
async function obtenerCategoria(req, res) {
  try {
    const id = req.params['id'];
    
    const categoria_data = await Categoria.findByPk(id);

    if (categoria_data) {
      res.status(200).send({ categoria: categoria_data });
    } else {
      res.status(500).send({ message: 'La categoría no existe' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function editarCategoria(req, res) {
    try {
      const id = req.params['id'];
      const data = req.body;
  
      const [affectedRows] = await Categoria.update(
        { titulo: data.titulo, descripcion: data.descripcion },
        { where: { id: id } }
      );
  
      if (affectedRows > 0) {
        const categoria_edit = await Categoria.findByPk(id);
        res.status(200).send({ categoria: categoria_edit });
      } else {
        res.status(403).send({ message: 'La categoría no se pudo actualizar' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error en el servidor' });
    }
}

async function eliminarCategoria(req, res) {
    try {
      const id = req.params['id'];
  
      const categoria_eliminada = await Categoria.destroy({
        where: { id: id }
      });
  
      if (categoria_eliminada) {
        res.status(200).send({ categoria: categoria_eliminada });
      } else {
        res.status(403).send({ message: 'La categoría no se pudo eliminar' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

  async function listarCategoria(req, res) {
    try {
  
      const categoria_listado = await Categoria.findAll();
  
      if (categoria_listado.length > 0) {
        res.status(200).send({ categorias: categoria_listado });
      } else {
        res.status(403).send({ message: 'No hay categorías con ese título' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error en el servidor' });
    }
  }

module.exports = {

    registrar,
    obtenerCategoria,
    editarCategoria,
    eliminarCategoria,
    listarCategoria

}