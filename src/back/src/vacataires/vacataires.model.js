const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    "nom": {type: String, required: true},
    "prenom": {type: String, required: true},
    "email": {type:String, unique:true, required: true},
    "telephone": {type: Number, unique: true, required: true},
    "password": {type: String, required: true},
    "verifie": {type: Boolean, required: true, default: false},
    "nb_annees_exp": {type: Number, default: 0},
    "entreprise_actuelle": {type: String, default: ''},
    "competences": {type: Array, default: []},
    "historique_vacation": {type: Array, default: []},
    "diplome": {type: String, default: ''},
    "disponibilite": {type: String, default: 'neutre'},
    "poste_entreprise": {type: String, default: ''},
    "commentaire": {type: String, default: ''}
},
{ collection : 'vacataires' })

const model = mongoose.model('vacataires', schema)

module.exports = model;
