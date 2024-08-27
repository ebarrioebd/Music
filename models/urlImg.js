 
// Definir el esquema 
const mongoose = require('mongoose')
const urlImgSchema = new mongoose.Schema({
    urlImg:String, 
    id: { type: String, default:"img"},
    id_usuario:{type:String,required:true},
    created_at: { type: Date, default: Date.now}
});

// Crear el modelo basado en el esquema
const UrlImg = mongoose.model('imgs_urls', urlImgSchema);

// Exportar el modelo
module.exports = UrlImg;
