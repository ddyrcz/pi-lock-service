var auth = require('express').Router(),
    token = require('express').Router(),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    tokenError = require('../responses/token_error');

auth.post('login', (req, res) => {
    // login to the application
    // return token
    res.end();
});

token.use((req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
        validateToken(token);
    }else{
        tokenError(res);
    }
});

var validateToken = function(token){
    
}

auth.use('/api', token);

module.exports = router; 