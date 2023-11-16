'use strict';

const express = require('express');
const mongoose = require('mongoose');
const {MongoMemoryServer}=require('mongodb-memory-server');
const {json} = require("express");
const apiRouter = express.Router();

const profiles = [
    {
        "id": 1,
        "name": "A Martinez",
        "description": "Adolph Larrue Martinez III.",
        "mbti": "ISFJ",
        "enneagram": "9w3",
        "variant": "sp/so",
        "tritype": 725,
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "https://soulverse.boo.world/images/1.png",
    }
];

apiRouter.use(express.json());
apiRouter.get('/api/profile', function(req, res, next) {
    res.json(profiles);
});

apiRouter.post('/api/profile', function(req, res, next) {
    console.log(req.body);
    res.send('POST accepted.');
});

module.exports = apiRouter;

