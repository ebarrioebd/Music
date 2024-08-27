const UrlImg = require("../models/user");
const User = require('../models/user');


async function registrarUsuario(req, res) {
  console.log(req.body);
  const { usuario, password } = req.body;
  await User({ usuario, password }).save();
  res.send("Usuario Registrado...")
}

async function buscarUsuario(req, res) {
  console.log(req.body);
  const { usuario, password } = req.body;
  const user = await User.findOne({ usuario });
  console.log(user);
  if (user) {
    if (user.password === password) {
      req.session.datosUsuario = { usuario: user.usuario, _id: user._id }
      res.redirect('/home');
    } else {
      res.render('login',{msg:"Error Password/User"});
    }
  } else {
    res.render('login',{msg:"Usuario no encontrado"});
  }
}

module.exports = { registrarUsuario, buscarUsuario }
