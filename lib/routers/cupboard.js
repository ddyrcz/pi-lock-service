var router = require('express').Router(),
    response = require('../common/responses'),
    Cupboard = require('../models/cupboard');

function tryOpen(res, cupboard) {
    if (inUse(cupboard)) {
        response.occupied(res);
        return;
    } else if (notAssigned(cupboard)) {
        assign(cupboard);
    }

    open(res, cupboard);
}

function inUse(cupboard){
    return true;
}

function open(res, cupboard) {
    console.log(cupboard.code);
    response.open(res);
}

function notAssigned(cupboard){
    return false;
}

function assign(cupboard) {
    // assign cupboard to the logged user
}

router.patch('/cupboards/:code/open', (req, res) => {

    Cupboard.findOne({ code: req.params.code }, (err, cupboard) => {
        if (err) throw err;
        if (cupboard) {
            tryOpen(res, cupboard);
        } else {
            response.notFound(res);
        }
    });

    // check is the cupborad available
    // 200 if so
    // 423 else    
});

module.exports = router; 