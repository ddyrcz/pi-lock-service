var auth = require('express').Router(),
    token = require('express').Router(),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    User = require('../models/user'),
    response = require('../common/responses');

auth.post('/login', (req, res) => {
    User.findOne({ login: req.body.login, password: req.body.password }, (err, user) => {
        if (err) throw err;
        if (user) {
            var token = jwt.sign(user, config.secret);
            response.token(res, token);
        } else {
            response.notFound(res);
        }
    });
});

auth.post('/signin', (req, res) => {

    var credentials = {
        login: req.body.login,
        password: req.body.password
    }

    User.findOne(credentials, (err, user) => {
        if (err) throw err;
        if (user) {
            response.conflict(res);
        } else {
            var user = new User(credentials);
            user.save((err) => {
                if (err) throw err;
                res.json({
                    valid: "true",
                    message: "The user has been registered"
                });
            });
        }
    });
});

token.use((req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        validateToken(token, res, next);
    } else {
        response.tokenError(res);
    }
});

var validateToken = function (token, res, next) {
    jwt.verity(token, config.secret, (err, decoded) => {
        if (err) {
            response.tokenError(res);
        } else {
            next();
        }
    });
}

if (config.util.getEnv('NODE_ENV') === 'production') {
    auth.use('/api', token);
}

module.exports = auth; 