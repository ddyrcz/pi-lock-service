var User = require('../models/user');
var response = require('../common/responses')

module.exports = new class CupboardBusiness {
    constructor() {

    }

    isOccupied(login, cupboardOwner) {
        return cupboardOwner.login != login;
    }

    occupy(login, cupboardCode, res) {
        User.update({ login: login }, { $set: { cupboardCode: cupboardCode } })
            .then((user) => {
                response.open(res);
            })
            .catch(err => {
                response.serverError(err, res);
            })
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
        User.findOne({ cupboardCode: req.params.code })
            .then(user => {
                this.tryOpen(req, res, user);
            })
            .catch(err => {
                response.serverError(err, res);
            })
    }

    release(req, res) {
        User.findOne({ login: req.login })
            .then(user => {
                user.cupboardCode = undefined;
                user.save();
                response.release(res);
            })
            .catch(err => {
                response.serverError(err, res);
            })
    }
} 