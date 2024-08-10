//mongodb+srv://ebarriosebd:<password>@music.y6sfc.mongodb.net/?retryWrites=true&w=majority&appName=Music
//VfIDvhWsqKMLeHni

require('dotenv').config();

const mongoose = require('mongoose'); 
const password = process.env.PASSWORD;
const usuario = process.env.USUARIO;
const dbName = process.env.DB_NAME; 

//const uri = `mongodb://localhost:27017/${dbName}`; 
const uri = `mongodb+srv://${usuario}:${password}@music.y6sfc.mongodb.net/${dbName}?retryWrites=true&w=majority`;
console.log(uri)
// Reemplaza con tu cadena de conexión 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas con Mongoose'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas', err));


