'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const profileRoute = require('./routes/profile.route');
const commentRoute = require('./routes/comment.route');
const userRoute = require('./routes/user.route');
const dbHandler = require('./database/mongo.database')

// database connection start
dbHandler.connectDB();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/", profileRoute, commentRoute, userRoute);

module.exports = app;
