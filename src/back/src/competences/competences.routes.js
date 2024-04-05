const express = require('express');
const controller = require('./competences.controller');
const middleware = require('../common/jwt.middleware');

const CompetencesRoutes = express.Router();
const control = new controller();
const middle = new middleware();


CompetencesRoutes.route('')
    .get([middle.allowCors, middle.verifyJWT, middle.checkPermissions(1), control.getCompetences])
    .post([middle.allowCors, middle.verifyJWT, middle.checkPermissions(2), control.createCompetence])
    .patch([middle.allowCors, middle.verifyJWT, middle.checkPermissions(2), control.updateCompetence])
    .delete([middle.allowCors, middle.verifyJWT, middle.checkPermissions(2), control.deleteCompetences])

module.exports = CompetencesRoutes;

/**
 * @swagger
 * tags:
 *   name: Competences
 *   description: API pour gérer les compétences
 * /competences:
 *   get:
 *     summary: Récupère la liste des compétences
 *     tags: [Competences]
 *     responses:
 *       200:
 *         description: La liste des compétences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Competences'
 * /competences/create : 
 *   post:
 *     summary: Crée une nouvelle compétence
 *     tags: [Competences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Competences'
 *     responses:
 *       201:
 *         description: Compétence créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competences'
 *       400:
 *         description: Requête invalide, certains champs sont manquants
* /competences/modif/{id}:
 *   patch:
 *     summary: Met à jour une compétence existante
 *     tags: [Competences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Competences'
 *     responses:
 *       200:
 *         description: Changements effectués avec succès
 *       400:
 *         description: Requête invalide, l'identifiant de la compétence est manquant
 
 */