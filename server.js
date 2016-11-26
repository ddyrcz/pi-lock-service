var app = require('express')(),
    bodyParser = require('body-parser'),
    auth = require('./lib/routers/auth'),
    mongoose = require('mongoose'),
    config = require('config'),
    cupboards = require('./lib/routers/cupboard'),
    morgan = require('./lib/common/morgan_resolver'),
    response = require('./lib/common/responses');

var port = process.env.PORT || '8000'

mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(morgan());

app.use('/', auth);
app.use('/api/cupboards', cupboards);

app.use((err, req, res, next) => {
    response.serverError(err, res);
})

app.listen(port, () => {
    console.log('Magic happen on the port: ' + port);
});

module.exports = app;