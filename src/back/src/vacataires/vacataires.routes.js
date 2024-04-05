const express = require('express');
const controller = require('./vacataires.controller');
const middleware = require('../common/jwt.middleware');

const VacatairesRoutes = express.Router();
const control = new controller();
const middle = new middleware();


VacatairesRoutes.route('')
    .get([middle.allowCors, middle.verifyJWT, middle.checkPermissions(1), control.getVacataires])
    .post([middle.allowCors, control.createVacataire])
    .patch([middle.allowCors, middle.verifyJWT, middle.checkPermissions(2), control.updateVacataire])
    .delete([middle.allowCors, middle.verifyJWT, middle.checkPermissions(2), control.deleteVacataire])

VacatairesRoutes.route('/login')
    .post([middle.allowCors, control.loginVacataire])


module.exports = VacatairesRoutes;

/**
 * @swagger
 * tags:
 *   name: Vacataires
 *   description: API pour gérer les vacataires
 * /vacataires:
 *   get:
 *     summary: Récupère la liste des vacataires
 *     tags: [Vacataires]
 *     responses:
 *       '200':
 *         description: Liste des vacataires récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacataires'
 * 
 * /vacataires/modif/{id}:
 *   patch:
 *     summary: Permet de modifier une fiche vacataire
 *     tags: [Vacataires]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'identifiant du vacataire à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vacataires'
 *     responses:
 *       '200':
 *         description: Changements effectués avec succès
 *       '400':
 *         description: Requête invalide, l'identifiant du vacataire est manquant
 * 
 * /vacataires/delete/{id}:
 *   delete:
 *     summary: Permet de supprimer une fiche vacataire
 *     tags: [Vacataires]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'identifiant du vacataire à supprimer
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vacataires'
 *     responses:
 *       '200':
 *         description: Vacataire supprimé avec succès
 *       '400':
 *         description: Requête invalide, l'identifiant du vacataire est manquant
 * 
 * /vacataires/{id}:
 *   get:
 *     summary: Récupère les détails d'un vacataire par son identifiant
 *     tags: [Vacataires]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'identifiant du vacataire à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Détails du vacataire récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacataires'
 *       '404':
 *         description: Vacataire non trouvé
 * 
 * /validations/vacataires:
 *   get:
 *     summary: Récupère la liste des vacataires à valider
 *     tags: [Vacataires]
 *     responses:
 *       '200':
 *         description: Liste des vacataires à valider récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacataires'
 * 
 * /vacataires/validations/{id}:
 *   get:
 *     summary: Récupère la fiche d'un vacataire pour l'accepter ou le refuser
 *     tags: [Vacataires]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'identifiant du vacataire à valider
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Fiche du vacataire récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacataires'
 *       '404':
 *         description: Vacataire non trouvé
 *       '400':
 *         description: Requête invalide, l'identifiant du vacataire est manquant
 * 
 */