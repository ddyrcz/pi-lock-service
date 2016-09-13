var app = require('express')(),
    auth = require('./routers/auth'),
    cupboards = require('./routers/cupboards');


app.use('api/', auth);
app.use('api/', cupboards);

app.listen(8000);