const express = require('express');
const controller = require('./users.controller');
const middleware = require('../common/jwt.middleware');

const UsersRoutes = express.Router();
const control = new controller();
const middle = new middleware();


UsersRoutes.route('/')
    .get([middle.allowCors, middle.verifyJWT, middle.checkPermissions(2), control.getUsers])
    .post([middle.allowCors, control.createUser])
    .patch([middle.allowCors, middle.verifyJWT, middle.checkPermissions(3), control.updateUser])
    .delete([middle.allowCors, middle.verifyJWT, middle.checkPermissions(3), control.deleteUser])

UsersRoutes.route('/login')
    .post([middle.allowCors, control.loginUser])

module.exports = UsersRoutes;


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour gérer les Users
 * /users:
 *   get:
 *     summary: Récupère la liste des users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Liste des users récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 * 
 * /users/{id}:
 *   patch:
 *     summary: Permet de modifier un user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'identifiant du user à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *       responses:
 *       '200':
 *         description: Changements effectués avec succès
 *       '400':
 *         description: Requête invalide, l'identifiant du user est manquant
 * 
 */