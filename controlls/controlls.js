

const Musics_url = require("../models/music_url");
const Config = require("../models/config");
const UrlImg = require("../models/urlImg");

async function buscarDB(req, res) {
  const data = await Musics_url.find({ id_usuario: req.session.datosUsuario._id });

  res.send(data);
}
async function buscarConfig(req, res) {
  const configDeafault = [{
    colorFrecuencia: "#ffffff",
    imgFondo: "https://dl.dropboxusercontent.com/scl/fi/7xhxjrrmr2s4gb92d8tj1/cyberpunk-girl-sword.jpg?rlkey=3uhxzvtjqiay9zs5qykzl8d0h&st=74c0qwpd",
    blurFondo: "5"
  }];
  const data = await Config.find({ id_usuario: req.session.datosUsuario._id });
  let configDatos = data.length === 0 ? configDeafault : data; 
  res.send(configDatos);
}
async function buscarImgs(req, res) {
  const data = await UrlImg.find({ id_usuario: req.session.datosUsuario._id });
  res.send(data);
}

async function buscarImgsAdmind(req, res) {
  const data = await UrlImg.find({ id_usuario: req.session.datosUsuario._id }); 
  res.render('imgs_adm', { array: data });
}

async function buscarMusicAdmind(req, res){
  const data = await Musics_url.find({ id_usuario: req.session.datosUsuario._id});
  res.render('music_adm', { array: data });
}


async function actualizarConfig(req, res) {
  await Config.findOneAndUpdate({ id_usuario: req.session.datosUsuario._id }, req.body)
    .then((user) => {
      console.log('Dato actualizado:', user);
      res.send({ msg: "Echo" })
    })
    .catch((err) => {
      console.error('Error al actualizar usuario', err)
      res.send({ err: err })
    });
}
async function addUrlMusicDropbox(req, res) {
  const data = {
    url: req.body.url,
    nombre: req.body.nombre,
    id: "music",
    id_usuario: req.session.datosUsuario._id
  }
  await Musics_url(data).save()
    .then(() => {
      console.log('Url music agregada...', req.body);
      res.send({ msg: "Echo" })
    })
    .catch(err => {
      console.error('Error al crear Musics_url', err);
      res.send({ msg: err })
    });
}
async function addUrlImage(req, res) {
  const data = {
    urlImg: req.body.urlImg,
    id: "img",
    id_usuario: req.session.datosUsuario._id
  }
  await UrlImg(data).save()
    .then(() => {
      console.log('Url UrlImg agregada...', req.body);
      res.send({ msg: "Echo" })
    })
    .catch(err => {
      console.error('Error al crear UrlImg', err);
      res.send({ msg: err })
    });
}
async function borrarImg(req, res) {
  const id_usuario_session = req.session.datosUsuario._id;
  const { id_usuario, _id } = req.body;
  console.log(id_usuario, _id);
  if (id_usuario_session === id_usuario) {
    await UrlImg({ id_usuario: id_usuario, _id: _id }).deleteOne();
    res.status(202).send({msg:"Eliminda"})
  } else {
    res.status(401).send({msg:"no pudo eliminarse"})
  }
    
}
async function borrarMusic(req, res) {
  const id_usuario_session = req.session.datosUsuario._id;
  const { id_usuario, _id } = req.body;
  console.log(id_usuario, _id);
  if (id_usuario_session === id_usuario) {
    await Musics_url({ id_usuario: id_usuario, _id: _id }).deleteOne();
    res.status(202).send({msg:"Eliminda"})
  } else {
    res.status(401).send({msg:"no pudo eliminarse"})
  }
    
}
module.exports = {borrarImg,borrarMusic,buscarMusicAdmind,buscarImgsAdmind, buscarDB, buscarConfig, buscarImgs, actualizarConfig, addUrlMusicDropbox, addUrlImage };