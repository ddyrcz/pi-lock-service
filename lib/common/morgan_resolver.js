var morgan = require('morgan');

var env = process.env.NODE_ENV || 'development';



module.exports = function () {
    if (env == 'test') {
        return function (req, res, next) {
            next();
        }
    }

    if (env == 'production') {
        return morgan('combined');
    }
    return morgan('dev');
}