const mongoose = require('mongoose');
const express = require('express');
const swaggerOption = require('./docs/swagger')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
var cors = require('cors');

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJSDoc(swaggerOption )
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('dotenv').config()

mongoose.connect(process.env.MONGO_CONNEXION_STRING)
.then(() => {
    console.log('Connexion à la BDD Réussie');
}).catch((err)=>{
    console.log(err);
})

const {Glob} = require('glob')

const g3 = new Glob('./src/*/*.routes.js', { withFileTypes: true })
g3.stream().on('data', path => {
  const route = require(path.fullpath())

  let routeName = path.fullpath().split('\\');
  routeName = routeName[routeName.length-2];

  app.use("/api/"+routeName, route);
})

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.listen(process.env.APP_PORT, () => {
    console.log(`Serveur en écoute sur le port ${process.env.APP_PORT}`)
})