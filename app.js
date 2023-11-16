'use strict';

const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const {dashboardRouter} = require('./routes/router');
const {apiRouter} = require('./routes/profile.api.route');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(
    express.urlencoded({
        extended: true,
    })
);

// routes
app.use('/', dashboardRouter);
app.use('/api', apiRouter)

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);

module.exports = {app, server};
