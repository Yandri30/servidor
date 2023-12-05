const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');
const { Op } = require('sequelize');

async function registrar(req, res) {
  try {
    const params = req.body;

    // const hashedPassword = bcrypt.hash(params.password, 10);
    bcrypt.hash(params.password, null, null, async function (err, hash) {
      if(hash){
        const user = await User.create({
          nombres: params.nombres,
          apellidos: params.apellidos,
          cedula: params.cedula,
          email: params.email,
          telefono: params.telefono,
          role: params.role,
          password: hash,
        });
        res.status(200).send({ user })
      }
    })
    

    ;
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'No se ingresó el usuario' });
  }
}

async function login(req, res) {
  try {
    const data = req.body;

    const user_data = await User.findOne({ where: { cedula: data.cedula } });

    if (user_data) {
      // const check = await bcrypt.compare(data.password, user_data.password);
      bcrypt.compare(data.password, user_data.password, function(err, check) {

        if (check) {
          if (data.gettoken) {
            const token = jwt.createToken(user_data);
            const cookiesOption = {
              expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              httpOnly: true,
            };
            res.cookie('jwt', token, cookiesOption);
            res.cookie('id', user_data.id, cookiesOption);
            res.status(200).send({
              jwt: token,
              user: user_data,
            });
          } else {
            res.status(200).send({
              user: user_data,
              message: 'no token',
              jwt: jwt.createToken(user_data),
            });
          }
        } else {
          res.status(403).send({ message: 'Las credenciales de ingreso no coinciden' });
        }

      })
      
    } else {
      res.status(403).send({ message: 'La identificación no existe' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

function deleteCookiee(req, res) {
  res.clearCookie('id');
  res.clearCookie('jwt');
  res.send('Las Cookies fueron eliminadas');
}

async function listarUser(req, res) {
  try {
    const nombres = req.params.nombres;

    const user_listado = await User.findAll();

    if (user_listado.length > 0) {
      res.status(200).send({ users: user_listado });
    } else {
      res.status(403).send({ message: 'No existe un usuario con ese nombre' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function actualizarUser(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;

    if (data.password) {
      // const hashedPassword = await bcrypt.hash(data.password, 10);
      bcrypt.hash(data.password,null, null, async function(err, hash){
        if(hash){
          let updatedData = {
            nombres: data.nombres,
            cedula: data.cedula,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            role: data.role,
            password: hash
          };
          const user_edit = await User.update(updatedData, {
            where: { id: id },
            returning: true,
          });
      
          if (user_edit[0] > 0) {
            res.status(200).send({ user: user_edit[1][0] });
          } else {
            res.status(403).send({ message: 'No pudo editar el usuario' });
          }
        } else {
          let updatedData = {
            nombres: data.nombres,
            cedula: data.cedula,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            role: data.role,
          };
          const user_edit = await User.update(updatedData, {
            where: { id: id },
            returning: true,
          });
      
          if (user_edit[0] > 0) {
            res.status(200).send({ user: user_edit[1][0] });
          } else {
            res.status(403).send({ message: 'No pudo editar el usuario' });
          }
        }
      })
    }

  } catch (err) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function obtenerUser(req, res) {
  try {
    const id = req.params.id;

    const user_data = await User.findByPk(id);

    if (user_data) {
      res.status(200).send({ user: user_data });
    } else {
      res.status(403).send({ message: 'No existe el usuario' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function obtenerUserRol(req, res) {
  try {
    const role = req.params.role;

    const user_data = await User.findAll({ where: { role: role } });

    if (user_data.length > 0) {
      res.status(200).send({ user: user_data });
    } else {
      res.status(403).send({ message: 'No existe el usuario' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

async function eliminarUser(req, res) {
  try {
    const id = req.params.id;

    const user_eliminado = await User.destroy({ where: { id: id } });

    if (user_eliminado) {
      res.status(200).send({ user: user_eliminado });
    } else {
      res.status(500).send({ message: 'Error en el servidor' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error en el servidor' });
  }
}

module.exports = {
  registrar,
  login,
  listarUser,
  obtenerUser,
  obtenerUserRol,
  actualizarUser,
  eliminarUser,
  deleteCookiee,
};
