'use strict';

const express = require('express');
const router = express.Router();
const {
    createUser,
    findUser
} = require('../controllers/user.controller')

router.use(express.json());

router.post('/user', createUser);
router.get('/user/:id', findUser);

module.exports = router;

