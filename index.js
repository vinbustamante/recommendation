const express = require('express');
const app = express();
const config = require('./config');
const cors = require('cors');
const apiProxy = require('./src/lib/apiProxy');

//controllers
const search = require('./src/api/search');

// cors enabled
app.use(cors(config.cors));

//route
app.get('/people-like-you', apiProxy.action(search.recommend));

var server = app.listen(config.server.port, () => {
    var address = server.address();
    var host = address.address;
    var port = address.port;
    console.log('app listening at http://%s:%s', host, port);
});