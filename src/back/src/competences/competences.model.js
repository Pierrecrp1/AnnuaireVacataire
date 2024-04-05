const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "nom": {type: String, required: true},
    "color": {type: String, required: true},
    "text": {type: String, required: true}
},
{ collection : 'competences' })

const model = mongoose.model('competences', schema)

module.exports = model;