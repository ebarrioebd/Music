// Definir el esquema del usuario
const mongoose = require('mongoose')
const musics_urlsSchema = new mongoose.Schema({
    nombre: String,
    url: String,
    id: {type:String, default:"music"},
    id_usuario:{type:String,required:true},
    created_at: { type: Date, default: Date.now }
});

// Crear el modelo basado en el esquema
const Musics_urls = mongoose.model('musics_urls', musics_urlsSchema);

// Exportar el modelo
module.exports = Musics_urls;
