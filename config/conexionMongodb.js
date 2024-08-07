//mongodb+srv://ebarriosebd:<password>@music.y6sfc.mongodb.net/?retryWrites=true&w=majority&appName=Music
//VfIDvhWsqKMLeHni


const mongoose = require('mongoose'); 
const password = "VfIDvhWsqKMLeHni";
const usuario = "ebarriosebd" 
const dbName = "data_app_music"


const uri = `mongodb+srv://${usuario}:${password}@music.y6sfc.mongodb.net/${dbName}?retryWrites=true&w=majority`; 
// Reemplaza con tu cadena de conexión 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas con Mongoose'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas', err));
