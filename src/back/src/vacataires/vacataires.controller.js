const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const logger = require('../modules/logger');

const model = require('./vacataires.model');
require('dotenv').config()
const saltRounds = 10;

class vacatairesController {
    async createVacataire(req, res) {
        if ((req.body['email'] == null)
        || (req.body['password'] == null)) {res.sendStatus(400); return}

        let password = req.body['password'];
        
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            req.body['password'] = hash;
            await model(req.body).save()
                .then((userCreated)=>{
                    delete userCreated.password;
                    logger.info("Création de l'utilisateur" + userCreated['_id']);
                    res.status(201).send(userCreated);
                })
                .catch((err)=>{res.status(400).send(err)})
        });
    }   

    async loginVacataire(req, res) {
        if (req.body['email'] == null | !req.body['email']) res.sendStatus(400)
        if (req.body['password'] == null) res.sendStatus(400)

        let password = req.body['password'];

        let query = await model.find({email: req.body['email']})

        if (!query[0]) {res.status(400).send('Aucun compte existant avec cet email'); return;}
        if (query == []) {res.status(400).send('Aucun compte existant avec cet email'); return;}
        else {
            bcrypt.compare(password, query[0]['password'], function(err, result) {
                if (result) {
                    if (!query[0]['verifie']) {res.status(403).send("Votre compte n'a pas encore été vérifié"); return;}

                    let token = jwt.sign(
                        {
                            userId: query[0]['_id'], 
                            email: query[0]['email'],
                            level: query[0]['level']
                        }, 
                        process.env.TOKEN_GEN_SEED, 
                        {algorithm: 'HS256', expiresIn:'24h'}
                    )

                    logger.info("Connexion de l'utilisateur " + query[0]['_id'] + " réussie");

                    res.status(200).send({
                        userId: query[0]['_id'],
                        token: token,
                        message: 'Connexion réussie'
                    })
                }
                else res.status(401).send('Mot de passe incorrect')
            });
        }

    }

    async updateVacataire(req, res) {
        if (!req.body['_id'] || req.body['_id'] == null) {res.status(400).send('Identifiant manquant'); return}

        try {
            await model.findOneAndUpdate({'_id': req.body['_id']}, req.body)
            res.status(200).send('Vacataire mis à jour avec succès')
        } catch(e) {
            res.status(400).send(e);
        }
    }

    async getVacataires(req, res) {
        try {
            let query = await model.find().select(['-password']);
            res.status(200).send(query);
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async deleteVacataire(req, res) {
        if (!req.body['_id'] || req.body['_id'] == null) {res.status(400).send('Identifiant manquant'); return}

        try {
            await model.findOneAndDelete({'_id': req.body['_id']})
            res.status(200).send('Vacataire supprimé avec succès');
        } catch (e) {
            res.status(400).send(e);
        }
    }

}

module.exports = vacatairesController;