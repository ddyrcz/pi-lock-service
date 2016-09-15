var auth = require('express').Router(),
    token = require('express').Router(),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    User = require('../models/user'),
    responses = require('../common/responses');

auth.post('login', (req, res) => {
    User.findOne({ login: req.body.login, password: req.body.password }, (err, user) => {
        if (err) throw err;
        if (user) {
            var token = jwt.sign(user, config.secret);
            responses.token(res, token);
        } else {
            responses.notFound(res);
        }
    });
    res.end();
});

token.use((req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        validateToken(token, res, next);
    } else {
        responses.tokenError(res);
    }
});

var validateToken = function (token, res, next) {
    jwt.verity(token, config.secret, (err, decoded) => {
        if (err) {
            responses.tokenError(res);
        } else {
            next();
        }
    });
}

auth.use('/api', token);

module.exports = router; 