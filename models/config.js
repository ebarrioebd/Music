 
// Definir el esquema 
const mongoose = require('mongoose')
const configSchema = new mongoose.Schema({
    colorFrecuencia:String,
    imgFondo:String,
    blurFondo:String,
    id: String,
    created_at: { type: Date, default: Date.now}
});

// Crear el modelo basado en el esquema
const Config = mongoose.model('config', configSchema);

// Exportar el modelo
module.exports = Config;
