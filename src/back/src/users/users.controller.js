const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const model = require('./users.model');
require('dotenv').config()
const saltRounds = 10;

class usersController {
    async createUser(req, res) {
        if ((req.body['email'] == null)
        || (req.body['password'] == null)) { res.sendStatus(400); return }

        let password = req.body['password'];
        
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            req.body['password'] = hash;
            await model(req.body).save()
                .then((userCreated)=>{res.status(201).send('Utilisateur créé avec succès, vous pourrez vous connecter une fois votre compte validé')})
                .catch((err)=>{res.status(400).send(err)})
        });
    }   

    async loginUser(req, res) {
        if (req.body['email'] == null | !req.body['email'] | req.body['password'] == null) res.status(400).send("Email ou mot de passe manquant");

        let password = req.body['password'];

        let query = await model.find({email: req.body['email']})

        if (!query[0] | query == []) {res.status(401).send("L'email ou le mot de passe sont incorrects"); return;}
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

                    res.status(200).send({
                        userId: query[0]['_id'],
                        token: token,
                        level: query[0]['level'],
                        message: 'Connection réussie'
                    })
                }
                else res.status(403).send('Le mot de passe est incorrect')
            });
        }
    }

    async getUsers(req, res) {
        try {
            let query = await model.find().select(['-password']);
            res.status(200).send(query)
        } catch(e) {
            res.status(400).send(e)
        }
    }

    async updateUser(req, res) {
        if (!req.body['_id'] || req.body['_id'] == null) {res.status(400).send('Identifiant manquant'); return}

        try {
            await model.findOneAndUpdate({'_id': req.body['_id']}, req.body)
            res.status(200).send('Utilisateur mis à jour avec succès')
        } catch(e) {
            res.status(400).send(e)
        }
    }

    async deleteUser(req, res) {
        if (!req.body['_id'] || req.body['_id'] == null) {res.status(400).send('Identifiant manquant'); return}

        try {
            await model.findOneAndDelete({'_id': req.body['_id']})
            res.status(200).send('Utilisateur supprimé avec succès');
        } catch(e) {
            res.status(400).send(e)
        }
    }

}

module.exports = usersController;