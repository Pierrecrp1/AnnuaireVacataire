const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Annuaire Vacataire',
        description: 'L\'application vise à simplifier la gestion des vacataires, offrant une plateforme  pour la création, la mise à jour et la visualisation des informations des vacataires. Construite avec Express.js et MongoDB coté Back et VueJs pour le front, elle propose une API RESTful documentée avec Swagger pour une utilisation efficace. L\'application intègre des fonctionnalités de sécurité, assurant un accès sécurisé aux données des vacataires.',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://127.0.0.1:5173',
        },
      ],
      components: {
        schemas: {
          Competences: {
            type: 'object',
            properties: {
              nom: {
                type: 'string',
                description: 'Nom de la compétence',
                example: 'Postgres',
                required: true,
              },
              color: {
                type: 'string',
                description: 'Couleur associée à la compétence',
                example: 'Gris',
                required: true,
              },
              text: {
                type: 'string',
                description: 'Texte décrivant la compétence',
                example: 'Postgres est une compétence importante',
                required: true,
              },
            },
          },
          Vacataires: {
            type: 'object',
            properties: {
              nom: {
                type: 'string',
                description: 'Nom du vacataire',
                example: 'John',
                required: true,
              },
              prenom: {
                type: 'string',
                description: 'Prénom du vacataire',
                example: 'Doe',
                required: true,
              },
              email: {
                type: 'string',
                description: 'Adresse e-mail du vacataire',
                example: 'john.doe@example.com',
                unique: true,
                required: true,
              },
              telephone: {
                type: 'number',
                description: 'Numéro de téléphone du vacataire',
                example: 123456789,
                unique: true,
                required: true,
              },
              password: {
                type: 'string',
                description: 'Mot de passe du vacataire',
                example: 'MotDePasse123',
                required: true,
              },
              verifie: {
                type: 'boolean',
                description: 'Statut de vérification du vacataire',
                example: false,
                required: true,
                default: false,
              },
              niveau_etude: {
                type: 'string',
                description: 'Niveau d\'études du vacataire',
                example: 'Licence',
                default: '',
              },
              nb_annees_exp: {
                type: 'number',
                description: 'Nombre d\'années d\'expérience du vacataire',
                example: 3,
                default: 0,
              },
              entreprise_actuelle: {
                type: 'string',
                description: 'Entreprise actuelle du vacataire',
                example: 'ABC Company',
                default: '',
              },
              competences: {
                type: 'array',
                description: 'Liste des compétences du vacataire',
                example: ['Compétence A', 'Compétence B'],
                default: [],
              },
              historique_vacation: {
                type: 'array',
                description: 'Historique des vacations du vacataire',
                example: [{ date: '2023-01-01', heures: 8 }, { date: '2023-02-01', heures: 6 }],
                default: [],
              },
            },
          },
          Users: {
            type: 'object',
            properties: {
              nom: {
                type: 'string',
                description: 'Nom de l\'utilisateur',
                example: 'John',
                required: true,
              },
              prenom: {
                type: 'string',
                description: 'Prénom de l\'utilisateur',
                example: 'Doe',
                required: true,
              },
              email: {
                type: 'string',
                description: 'Adresse e-mail de l\'utilisateur',
                example: 'john.doe@example.com',
                unique: true,
                required: true,
              },
              password: {
                type: 'string',
                description: 'Mot de passe de l\'utilisateur',
                example: 'MotDePasse123',
                required: true,
              },
              level: {
                type: 'number',
                description: 'Niveau d\'accès de l\'utilisateur',
                example: 0,
                required: true,
                default: 0,
              },
            },
          },
        },
      },
    },
    apis: ['./src/*/*.routes.js'],
  };

  module.exports = options;