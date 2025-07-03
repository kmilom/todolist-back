const jwt = require('jsonwebtoken');
const config = require('../../../config');

const secret = config.jwt.secret;

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).send('Acceso denegado. No se proporcionó token.');
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).send('Token inválido.');
        }

        req.user = user;
        next(); 
    });
}

module.exports = authenticateToken;
