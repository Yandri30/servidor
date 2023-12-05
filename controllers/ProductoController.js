const Producto = require('../models/producto');
const Categoria = require('../models/categoria');


const fs = require('fs');
const path = require('path');

async function registrar(req, res) {
  try {
    const data = req.body;

    // let imagen_name = null;

    // if (req.files && req.files.imagen) {
    //   const imagen_path = req.files.imagen.path;
    //   const name = imagen_path.split('\\');
    //   imagen_name = name[2];
    // }

    const producto = await Producto.create({
      titulo: data.titulo,
      descripcion: data.descripcion,
      precio_compra: data.precio_compra,
      precio_venta: data.precio_venta,
      stock: data.stock,
      idcategoria: data.idcategoria,
      puntos: data.puntos,
    });

    res.status(200).send({ producto });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function listarProducto(req, res) {
  try {
    const titulo = req.params.titulo;

    if (titulo) {
      const producto_listado = await Producto.findAll({
        where: { titulo: { [Op.iLike]: `%${titulo}%` } },
        include: [{ model: Categoria, as: 'Categorium' }],
      });
      if (producto_listado.length > 0) {
        res.status(200).send({ productos: producto_listado });
      } else {
        res.status(403).send({ message: 'No existe un producto con ese título' });
      }
    } else {
      const producto_listado = await Producto.findAll({
        include: [{ model: Categoria, as: 'Categorium' }],
      });
      if (producto_listado.length > 0) {
        res.status(200).send({ productos: producto_listado });
      } else {
        res.status(403).send({ message: 'No existe un producto con ese título' });
      }
    }

    
  } catch (err) {
    console.clear()
    console.log(err);
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function editarProducto(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;

    const producto_edit = await Producto.update(
      {
        titulo: data.titulo,
        descripcion: data.descripcion,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
        idcategoria: data.idcategoria,
        puntos: data.puntos,
      },
      {
        where: { id: id },
        returning: true,
      }
    );

    if (producto_edit[0] > 0) {
      res.status(200).send({ productos: producto_edit[1][0] });
    } else {
      res.status(403).send({ message: 'No pudo editar el producto' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function obtenerProducto(req, res) {
  try {
    const id = req.params.id;

    const producto_data = await Producto.findByPk(id);

    if (producto_data) {
      res.status(200).send({ producto: producto_data });
    } else {
      res.status(403).send({ message: 'No existe el producto' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function eliminarProducto(req, res) {
  try {
    const id = req.params.id;

    const producto_eliminado = await Producto.destroy({ where: { id: id } });

    if (producto_eliminado) {
      res.status(200).send({ producto: producto_eliminado });
    } else {
      res.status(403).send({ message: 'El producto no se pudo eliminar' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function act_stock(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    const producto_data = await Producto.findByPk(id);

    if (producto_data) {
      const producto_edit = await Producto.update(
        {
          stock: parseInt(producto_data.stock) + parseInt(data.stock),
        },
        {
          where: { id: id },
          returning: true,
        }
      );

      if (producto_edit[0] > 0) {
        res.status(200).send({ producto: producto_edit[1][0] });
      } else {
        res.status(403).send({ message: 'No pudo actualizar el stock del producto' });
      }
    }
  } catch (err) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

// function obtenerImagen(req, res) {
//   try {
//     const img = req.params.img;

//     if (img !== 'null') {
//       const path_img = path.join('./uploads/productos', img);
//       res.status(200).sendFile(path.resolve(path_img));
//     } else {
//       const path_img = path.join('./uploads/productos/default.png');
//       res.status(200).sendFile(path.resolve(path_img));
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: 'Error en el servidor' });
//   }
// }

module.exports = {
  registrar,
  listarProducto,
  editarProducto,
  obtenerProducto,
  eliminarProducto,
  act_stock,
};
