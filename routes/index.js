var express = require('express');
var router = express.Router();

var db = require('../controlls/controlls');
const dbUser = require('../controlls/userControlls')



const isLogged = (req, res, next) => {
  // Aquí suponemos que la información del usuario está en req.session.user
  if (req.session && req.session.datosUsuario) {
    // El usuario está autenticado
    return next();
  } else {
    // El usuario no está autenticado
    res.redirect('/login'); // Redirige al usuario a la página de login
  }
};
/* GET home page. */
router.get('/', isLogged, function (req, res, next) {
  res.render('index');
});
router.get('/imgs_admins', isLogged, db.buscarImgsAdmind);
router.get('/music_admins',isLogged,db.buscarMusicAdmind)
router.get("/home", isLogged, (req, res) => {
  res.render("home", req.session.datosUsuario);
})
router.get("/login", (req, res) => {
  if (req.session.datosUsuario) {
    res.redirect('/home')
  } else {
    res.render('login', { msg: "" });
  }
});
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/login");
})
router.get("/registrar", (req, res) => {
  res.render('registrar');
});
//loging de registro
router.post('/login', dbUser.buscarUsuario);
router.post('/registrar', dbUser.registrarUsuario)

router.post("/getMusic", db.buscarDB);
router.post('/getData', db.buscarConfig);
router.post('/getImgs', db.buscarImgs);

router.post('/actualizar_config', db.actualizarConfig);
router.post('/addUrlMusicDropbox', db.addUrlMusicDropbox);
router.post('/addUrlImage', db.addUrlImage);

router.post('/eliminarImg', isLogged, db.borrarImg);
router.post('/eliminarMusic',isLogged, db.borrarMusic);

module.exports = router;
