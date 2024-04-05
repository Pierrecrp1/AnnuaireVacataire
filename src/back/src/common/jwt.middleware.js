const jwt = require('jsonwebtoken');
require('dotenv').config()

class middleware {
    verifyJWT(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.TOKEN_GEN_SEED);

            req.level = decodedToken.level;

            next();
        } 
        catch(error) {
            res.status(401).send('Token invalide');
        }
    };

    checkPermissions(requiredLevel = 0) {
        return function(req, res, next) {
            if (requiredLevel > req.level) {
                res.status(403).send("Vous n'avez pas les permissions nécessaires");
                return;
            }
            next();
        }
    }

    allowCors(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    }
}

 module.exports = middleware;