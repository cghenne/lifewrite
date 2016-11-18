require('isomorphic-fetch');

require('es6-promise').polyfill();

const express = require('express');
const app = express();
const api = require('./api/');
const fs = require('fs');
const Utils = require('./utils/Utils');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/test', (req, res) => {

    api.test.test()
    .then((results) => {
        res.json(results);
    })
    .catch(console.error);
});



app.listen(4000, () => {
    console.log('Node server listening on http://localhost:4000');
});
