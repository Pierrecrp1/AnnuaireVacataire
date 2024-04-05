const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const logger = require('../modules/logger');

const model = require('./competences.model');
require('dotenv').config()

class competencesController {
    async createCompetence(req, res) {
        if ((req.body['nom'] == null)
        || (req.body['color'] == null)
        || (req.body['text'] == null)) { res.sendStatus(400); return }
        
        await model(req.body).save()
            .then((competencesCreate)=>{
                logger.info("Création de la compétence" + competencesCreate['_id']);
                res.status(201).send('Votre compétence ' + competencesCreate['nom'] + ' a bien été créée')
            })
            .catch((err)=>{
                res.status(400).send(err)
            })
    }


    async updateCompetence(req, res) {
        if (!req.body['_id'] || req.body['_id'] == null) {res.status(400).send('Identifiant manquant'); return}

        try {
            await model.findOneAndUpdate({'_id': req.body['_id']}, req.body)
            res.status(200).send('Compétence modifiée avec succès');
        } catch(e) {
            res.status(400).send(e);
        }
    }

    async getCompetences(req, res) {
        try {
            let query = await model.find().select();
            res.send(query)
        } catch(e) {
            res.status(400).send(e);
        }
    }

    async deleteCompetences(req, res) {
        if (!req.body['_id'] || req.body['_id'] == null) {res.status(400).send('Identifiant manquant'); return}

        try {
            let query = await model.find().deleteOne({'_id': req.body['_id']});
            res.status(200).send('Compétence supprimée avec succès');
        } catch(e) {
            res.status(400).send(e);
        }
    }

}

module.exports = competencesController;