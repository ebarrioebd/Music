var express = require('express');
var router = express.Router();

var db = require('../controlls/controlls');


/* GET home page. */
router.get('/', function (req, res, next) {
  //res.redirect("/actualizar")
  res.render('index', { title: 'Express' });
});


router.get("/home", (req, res) => {
  res.render("home");
})
//Solicitar datos
router.post("/getMusic", db.buscarDB);
router.post('/getData', db.buscarConfig);
router.post('/getImgs',db.buscarImgs);

router.post('/actualizar_config', db.actualizarConfig);
router.post('/addUrlMusicDropbox',db.addUrlMusicDropbox);
router.post('/addUrlImage',db.addUrlImage);

module.exports = router;
