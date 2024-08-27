const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    usuario :{type:String, required:true,unique:true},
    password : {type : String, required:true}
});

module.exports = mongoose.model('User',UserSchema); 
