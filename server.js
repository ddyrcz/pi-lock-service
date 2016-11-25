var app = require('express')(),
    bodyParser = require('body-parser'),
    auth = require('./lib/routers/auth'),
    mongoose = require('mongoose'),
    config = require('config'),
    cupboards = require('./lib/routers/cupboard'),
    morgan = require('./lib/common/morgan_resolver');

var port = process.env.PORT || '8000'

mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(morgan());

app.use('/', auth);
app.use('/api/cupboards', cupboards);

app.listen(port);

module.exports = app;