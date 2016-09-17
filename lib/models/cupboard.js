var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Cupboard', new Schema({
    code: String,
    user : {
        login : String
    }
}));