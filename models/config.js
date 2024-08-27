
// Definir el esquema 
const mongoose = require('mongoose')
const configSchema = new mongoose.Schema({
    colorFrecuencia: { type: String, default: "#ffffff" },
    imgFondo: { type: String, default: "https://dl.dropboxusercontent.com/scl/fi/7xhxjrrmr2s4gb92d8tj1/cyberpunk-girl-sword.jpg?rlkey=3uhxzvtjqiay9zs5qykzl8d0h&st=74c0qwpd" },
    blurFondo: { type: String, default: "5" },
    id: String,
    id_usuario: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Crear el modelo basado en el esquema
const Config = mongoose.model('config', configSchema);

// Exportar el modelo
module.exports = Config;
