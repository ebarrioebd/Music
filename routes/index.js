var express = require('express');
var router = express.Router(); 

var db = require('../controlls/controlls');


/* GET home page. */
router.get('/', function(req, res, next) {  
  //res.redirect("/actualizar")
  res.render('index', { title: 'Express' });
});  

router.post('/actualizar',db.actualizarDB);
router.post('/registrar',db.insertDB);
router.post('/getData',db.buscarDB);

router.post("/addMusic",db.insertDB);
router.post("/getMusic",db.buscarDB);

router.post("/addImg",db.insertDB);
router.post("/getImgs",db.buscarDB);

module.exports = router;
