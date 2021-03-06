var env = process.env.NODE_ENV || 'development'

module.exports = {
    notFound(res) {
        res.statusCode = 404;
        res.json({ valid: false, message: "The resource wasn't found" });
    },

    token(res, token) {
        res.statusCode = 200;
        res.json({ valid: true, token: token });
    },


    unauthorized(res) {
        res.statusCode = 401;
        res.json({ valid: false, message: "You are unauthorized!" });
    },

    conflict(res) {
        res.statusCode = 409;
        res.json({ valid: false, message: "The resources already exists" });
    },

    open(res) {
        res.statusCode = 200;
        res.json({
            valid: true,
            message: "The cupboard successful opened"
        });
    },

    occupied(res) {
        res.statusCode = 423;
        res.json({
            valid: false,
            message: "The cupboard is occupied"
        });
    },

    release(res) {
        res.statusCode = 200;
        res.json({
            valid: true,
            message: "The cupboard has been released"
        });
    },

    serverError(err, res) {

        switch (env) {
            case 'development':
                res.json(500, {
                    message: err.message,
                    stack: err.stack
                })
                break;
            default:
                res.json(500, {
                    valid: false,
                    message: "An error occured on the server"
                })
        }
    }
}
