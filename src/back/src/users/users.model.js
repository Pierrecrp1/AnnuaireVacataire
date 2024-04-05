const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "nom": {type: String, required: true},
    "prenom": {type: String, required: true},
    "email": {type:String, unique:true, required: true},
    "password": {type: String, required: true},
    "level": {type: Number, required: false, default: 0},
    "verifie": {type: Boolean, required: true, default: false},
},
{ collection : 'users' })

const model = mongoose.model('users', schema)

module.exports = model;