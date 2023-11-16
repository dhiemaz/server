'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port =  process.env.PORT || 3000;
const apiRoute = require('./routes/profile.api.route');
const indexRoute = require('./routes/profile.dashboard.route')


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

// routes
app.use("/", indexRoute);
app.use("/api", apiRoute);

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);

module.exports = {app, server};
