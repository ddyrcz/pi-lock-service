var User = require('../models/user');
var response = require('../common/responses')

module.exports = new class CupboardBusiness {
    constructor() {

    }

    isOccupied(login, cupboardOwner) {
        return cupboardOwner.login != login;
    }

    occupy(login, cupboardCode, res) {
        User.update({ login: login }, { $set: { cupboardCode: cupboardCode } }, (err) => {
            if (err) throw err;
            response.open(res);
        });
    }

    tryOpen(req, res, cupboardOwner) {
        if (!cupboardOwner) {
            this.occupy(req.login, req.params.code, res);
        } else {
            this.openIfNotOccupied(req, res, cupboardOwner);
        }
    }

    openIfNotOccupied(req, res, cupboardOwner) {
        if (this.isOccupied(req.login, cupboardOwner)) {
            response.occupied(res);
        } else {
            response.open(res);
        }
    }

    open(req, res) {
        User.findOne({ cupboardCode: req.params.code }, (err, user) => {            
            this.tryOpen(req, res, user);
        });
    }

    release(req, res) {
        User.findOne({ login: req.login }, (err, user) => {
            if (err) throw err;
            user.cupboardCode = undefined;
            user.save();
            response.release(res);
        })
    }
} 