function notFound(res) {
    res.statusCode = 404;
    res.json({ valid: 'False', message: "The resource wasn't found" });
};

function token(res, token) {
    res.statusCode = 200;
    res.json({ valid: 'True', token: token });
};


function tokenError(res) {
    res.statusCode = 401;
    res.json({ valid: 'False', message: "You are unauthorized!" });
}

function conflict(res) {
    res.statusCode = 409;
    res.json({ valid: 'False', message: "The resources already exists" });
}

function open(res) {
    res.statusCode = 200;
    res.json({
        valid: true,
        message: "The cupboard successful opened"
    });
}

function occupied(res) {
    res.statusCode = 423;
    res.json({
        valid: false,
        message: "The cupboard is occupied"
    });
}

module.exports = {
    notFound,
    token,
    tokenError,
    conflict,
    open,
    occupied
}