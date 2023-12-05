const Venta = require('../models/venta');
const DetalleVenta = require('../models/detalleventa');
const Cliente = require('../models/cliente');
const Producto = require('../models/producto');
const User= require('../models/user');
const { Op } = require('sequelize');

async function registrarVenta(req, res) {
  try {
    const data = req.body;

    const venta = await Venta.create({
      idcliente: data.idcliente,
      iduser: data.iduser,
    });

    const detalles = data.detalles;
    for (const element of detalles) {
      const detalleventa = await DetalleVenta.create({
        idproducto: element.idproducto,
        cantidad: element.cantidad,
        venta: venta.id,
      });

      const producto_data = await Producto.findByPk(element.idproducto);
      if (producto_data) {
        await producto_data.update({
          stock: producto_data.stock - element.cantidad,
        });
      } else {
        return res.send({ message: 'No se encontró el producto' });
      }
    }

    res.end();
  } catch (err) {
    res.send({ message: 'No se pudo registrar la venta' });
  }
}

async function obtenerVenta(req, res) {
  try {
    const id = req.params.id;
    const data_venta = await Venta.findOne({
      where: { id },
      include: [
        { model: Cliente },
        { model: User}
      ]
    });
    if (data_venta) {
      const detalle_venta = await DetalleVenta.findAll({
        where: { venta: data_venta.id }, // Assuming 'idventa' is the column name in DetalleVenta table
        include: [{ model: Producto }]
      });
      
      if (detalle_venta.length > 0) {
        res.status(200).send({
          data: {
            venta: data_venta,
            detalles: detalle_venta
          }
        });
      } else {
        res.status(200).send({
          data: {
            venta: data_venta,
            detalles: []
          }
        });
      }         
    }
  } catch (err) {
    console.clear();
    console.log(err);
    res.status(404).send({ message: 'No se encontraron ventas' });
  }
}

async function listadoVentaUser(req, res) {
  try {
    const id = req.params.id;

    const data_venta = await Venta.findAll({
      where: { iduser: id },
      include: [{ model: Cliente }, { model: DetalleVenta, include: [{ model: Producto }] }],
    });

    if (data_venta) {
      res.status(200).send({ ventas: data_venta });
    } else {
      res.status(404).send({ message: 'No se encontraron ventas' });
    }
  } catch (err) {
    res.status(404).send({ message: 'No se encontraron ventas' });
  }
}

async function listadoVentaAdmin(req, res) {
  try {
    const data_venta = await Venta.findAll({
      include: [
        { model: Cliente },
        { model: User}
      ]
    });

    if (data_venta) {
      res.status(200).send({ ventas: data_venta });
    } else {
      res.status(404).send({ message: 'No se encontraron ventas' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function detalleVenta(req, res) {
  try {
    const id = req.params.id;

    const data_detalles = await DetalleVenta.findAll({
      where: { ventaId: id },
      include: [{ model: Producto }],
    });

    if (data_detalles) {
      res.status(200).send({ detalles: data_detalles });
    } else {
      res.status(404).send({ message: 'No se encontraron ventas' });
    }
  } catch (err) {
    res.status(404).send({ message: 'No se encontraron ventas' });
  }
}
async function eliminarVenta(req, res) {
  try {
    const id = req.params['id'];

    const Venta_eliminada = await Venta.destroy({
      where: { id: id }
    });

    if (Venta_eliminada) {
      res.status(200).send({ Venta: Venta_eliminada });
    } else {
      res.status(403).send({ message: 'La categoría no se pudo eliminar' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

module.exports = {

    registrarVenta,
    obtenerVenta,
    listadoVentaUser,
    listadoVentaAdmin,
    detalleVenta,
    eliminarVenta

}