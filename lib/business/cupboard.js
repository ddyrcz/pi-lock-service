var Cupboard = require('../models/cupboard');
var response = require('../common/responses')

module.exports = new class CupboardBusiness {
    constructor() {

    }

    isInUse(cupboard) {
        return true;
    }

    notAssigned(cupboard) {
        return false;
    }

    assign(cupboard) {
        // assign cupboard to the logged user
    }

    open(res, cupboard) {
        console.log(cupboard.code);
        response.open(res);
    }

    tryOpen(res, cupboard) {
        if (this.isInUse(cupboard)) {
            response.occupied(res);
            return;
        } else if (this.notAssigned(cupboard)) {
            this.assign(cupboard);
        }

        this.open(res, cupboard);
    }

    open(req, res) {
        Cupboard.findOne({ code: req.params.code }, (err, cupboard) => {
            if (err) throw err;
            if (cupboard) {
                this.tryOpen(res, cupboard);
            } else {
                response.notFound(res);
            }
        });

        // check is the cupborad available
        // 200 if so
        // 423 else    
    }
} 