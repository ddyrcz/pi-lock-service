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

module.exports = {
    notFound,
    token,
    tokenError
}
